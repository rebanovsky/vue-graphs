<template>
  <div class="graph-wrapper flex flex-col">
    <div
      class="graph-title gridlines w-[100%] px-[12px] py-[8px] text-[12px] font-medium dark:text-slate-400 text-slate-600"
    >
      {{ title }}
    </div>
    <div
      class="graph-legend w-[100%] px-[10px] h-[16px] text-[10px] font-medium dark:text-slate-400 text-slate-600"
    ></div>
    <div
      ref="graphContainer"
      class="graph-container gridlines rounded-[8px]"
    ></div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import * as d3 from "d3";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 400,
  },
  title: {
    type: String,
    default: "EPS",
  },
});

const graphContainer = ref(null);

watchEffect(() => {
  if (!graphContainer.value || !props.data.length) {
    return;
  }

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  // Clear previous SVG
  d3.select(graphContainer.value).selectAll("*").remove();

  // Calculate y-axis range
  const epsValues = props.data.flatMap((d) => [d.EPS.Actual, d.EPS.Estimate]);
  const maxEps = d3.max(epsValues);
  const minEps = d3.min(epsValues);
  const padding = (maxEps - minEps) * 0.5;

  // Create SVG container
  const svg = d3
    .select(graphContainer.value)
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create scales
  const xScale = d3
    .scaleBand()
    .domain(props.data.map((d) => d.Quarter))
    .range([0, width])
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([minEps - padding, maxEps + padding])
    .range([height, 0]);

  // Add horizontal gridlines
  svg
    .selectAll(".grid")
    .data(yScale.ticks(3).filter((tick) => tick !== 0))
    .enter()
    .append("line")
    .attr("class", "grid")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", (d) => yScale(d))
    .attr("y2", (d) => yScale(d))
    .attr("class", "stroke-slate-400 dark:stroke-slate-700")
    .attr("stroke-dasharray", "3,3");

  // Draw dots for Actual EPS
  svg
    .selectAll(".dot-actual")
    .data(props.data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Quarter) + xScale.bandwidth() / 2)
    .attr("cy", (d) => yScale(d.EPS.Actual))
    .attr("r", 5)
    .attr("class", "dark:fill-harlequin-200 fill-harlequin-300");

  // Draw dots for Estimate EPS
  svg
    .selectAll(".dot-estimate")
    .data(props.data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.Quarter) + xScale.bandwidth() / 2)
    .attr("cy", (d) => yScale(d.EPS.Estimate))
    .attr("r", 5)
    .attr("stroke-dasharray", "3,3")
    .attr("class", "stroke-slate-500 fill-transparent");

  // Add X axis
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale).tickSize(0))
    .call((g) =>
      g
        .selectAll(".domain")
        .attr("class", "stroke-slate-400 dark:stroke-slate-500")
    )
    .selectAll(".tick text")
    .attr("dy", "1.25em")
    .attr("fill", "#666");

  // Add Y axis
  svg
    .append("g")
    .call(d3.axisLeft(yScale).ticks(4).tickSize(0))
    .call((g) => g.select(".domain").remove())
    .selectAll(".tick text")
    .attr("dx", "-0.5em")
    .attr("fill", "#666"); // Remove the y-axis line;
});
</script>

<style scoped>
.graph-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

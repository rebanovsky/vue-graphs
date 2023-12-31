<template>
  <div ref="chart"></div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import * as d3 from "d3";

const props = defineProps({
  data: Array,
  height: Number,
  width: Number,
  legend: Boolean,
  labels: Boolean,
  animations: {
    type: Boolean,
  },
});

const chart = ref(null);

const customColors = [
  "#003f5c", // Yellow
  "#58508d", // Orange
  "#bc5090", // Green
  "#ff6361", // Blue
  "#ffa600", // Purple
];

const renderChart = () => {
  d3.select(chart.value).select("svg").remove();

  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height);

  const radius = Math.min(props.width, props.height) / 2;

  const arc = d3
    .arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const pie = d3
    .pie()
    .sort(null)
    .value((d) => d.value);

  const g = svg
    .append("g")
    .attr("transform", `translate(${props.width / 2}, ${props.height / 2})`);

  const sectors = pie(props.data);

  const paths = g
    .selectAll(".arc")
    .data(sectors)
    .enter()
    .append("path")
    .attr("fill", (d, i) => customColors[i % customColors.length]);

  if (props.animations) {
    paths
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });
  } else {
    paths.attr("d", arc);
  }

  if (props.labels) {
    g.selectAll(".arc")
      .data(sectors)
      .enter()
      .append("text")
      .attr("class", "dark:fill-slate-200 fill-slate-100")
      .attr("transform", function (d) {
        const c = arc.centroid(d);
        return "translate(" + c[0] + "," + c[1] + ")";
      })
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text(function (d) {
        return d.value;
      });
  }

  if (props.legend) {
    const legend = svg
      .append("g")
      .attr("class", "legend bg-slate-200")
      .attr("transform", `translate(${props.width - 120}, ${30})`);


    props.data.forEach((d, i) => {
      const legendRow = legend
        .append("g")
        .attr("transform", `translate(0, ${i * 20})`);

      legendRow
        .append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("rx", 2)
        .attr("fill", customColors[i % customColors.length]);

      legendRow
        .append("text")
        .attr("class", "dark:fill-slate-300 text-xs")
        .attr("x", 20)
        .attr("y", 10)
        .text(d.label);
    });
  }
};

onMounted(renderChart);

watchEffect(renderChart);
</script>

<style scoped></style>

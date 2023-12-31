<template>
  <div id="treemap"></div>
  <div
    id="tooltip"
    class="absolute opacity-0 bg-slate-100 border-[1px] border-slate-300 p-[6px] rounded cursor-pointer"
    style="pointer-events: none"
  ></div>
</template>

<script setup>
import { watchEffect, onMounted, ref } from "vue";
import * as d3 from "d3";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const data = ref(props.data);

console.log("data: ", props.data);
const drawChart = () => {
  d3.select("#treemap").selectAll("*").remove();

  const width = 400;
  const height = 180;
  const root = d3.hierarchy(data.value).sum((d) => d.value);
  d3.treemap().size([width, height]).padding(2)(root);

  const svg = d3
    .select("#treemap")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const colors = ["#57E2E5", "#FEC3A6", "#FFAC81", "#FF928B"];
  const colorScale = d3
    .scaleOrdinal()
    .domain(root.children.map((d, i) => i))
    .range(colors);

  const tooltip = d3.select("#tooltip");

  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .style("fill", (d) => colorScale(d.parent.data.name))
    .on("mouseover", (event, d) => {
      tooltip.style("opacity", 1).html(d.data.value);
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY - 16 - tooltip.node().offsetHeight + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0);
    });

  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => d.x0 + 5)
    .attr("y", (d) => d.y0 + 20)
    .text((d) => d.data.name);
};

onMounted(drawChart);

watchEffect(drawChart);
</script>

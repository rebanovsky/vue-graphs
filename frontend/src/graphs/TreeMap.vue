<template>
  <div id="treemap"></div>
  <div
    id="tooltip"
    class="absolute opacity-0 p-[12px] text-slate-700 border-[1px] border-300 shadow-boxshlight dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300 shadow-boxsh z-[10] bg-slate-100 dark:bg-slate-900 dark:shadow dark:border-slate-700 rounded"
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
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  palette: {
    type: Array,
  },
});

const data = ref(props.data);

const drawChart = () => {
  d3.select("#treemap").selectAll("*").remove();

  const root = d3.hierarchy(data.value).sum((d) => d.value);
  d3.treemap().size([props.width, props.height]).padding(2)(root);

  const svg = d3
    .select("#treemap")
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height);

  const colorScale = d3
    .scaleOrdinal()
    .domain(root.children.map((d, i) => i))
    .range(props.palette);

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
      tooltip
        .style("opacity", 1)
        .html(
          `<strong>${d.parent.data.name}</strong><br/>${d.data.name}: ${d.data.value}`
        );
    })
    .on("mousemove", (event) => {
      tooltip
        .style("left", event.pageX + 16 + "px")
        .style("top", event.pageY - tooltip.node().offsetHeight + "px");
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

<template>
  <div ref="chart"></div>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import * as d3 from "d3";

export default {
  name: "MultiLine",
  props: {
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
  },
  setup(props) {
    const chart = ref(null);

    const drawChart = () => {
      if (!chart.value) return;

      // Clear the SVG if it exists
      d3.select(chart.value).selectAll("*").remove();

      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height);

      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.x)),
          d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.x)),
        ])
        .range([0, props.width]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.y)),
          d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.y)),
        ])
        .range([props.height, 0]);

      const line = d3
        .line()
        .x((d) => xScale(d.x))
        .y((d) => yScale(d.y));

      props.data.forEach((d) => {
        svg
          .append("path")
          .data([d.values])
          .attr("class", "line")
          .attr("d", line)
          .attr("stroke", d.color)
          .attr("fill", "none");
      });
    };

    onMounted(drawChart);

    watch(props.data, drawChart);

    return {
      chart,
    };
  },
};
</script>

<style scoped>
.line {
  stroke-width: 2px;
}
</style>

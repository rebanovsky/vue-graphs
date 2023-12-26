<template>
  <div ref="chart" class="chart-border"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

export default {
  name: "DoughnutChart",
  props: {
    data: Array,
    height: Number,
    width: Number,
  },
  setup(props) {
    const chart = ref(null);

    const customColors = [
      "#003f5c", // Yellow
      "#58508d", // Orange
      "#bc5090", // Green
      "#ff6361", // Blue
      "#ffa600", // Purple
    ];

    onMounted(() => {
      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height);

      const radius = Math.min(props.width, props.height) / 2;

      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(radius / 2); // Half of the radius for the inner circle

      const pie = d3
        .pie()
        .sort(null)
        .value((d) => d.value);

      const g = svg
        .append("g")
        .attr(
          "transform",
          `translate(${props.width / 2}, ${props.height / 2})`
        );

      const sectors = pie(props.data);

      g.selectAll(".arc")
        .data(sectors)
        .enter()
        .append("path")
        .attr("d", arc)
        .style("fill", (d, i) => customColors[i % customColors.length]);
    });

    return {
      chart,
    };
  },
};
</script>

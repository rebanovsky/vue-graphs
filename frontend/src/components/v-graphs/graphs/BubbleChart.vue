<template>
  <div ref="chartContainer" class="bubble-chart"></div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import * as d3 from "d3";

export default {
  props: {
    chartData: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const chartContainer = ref(null);

    const createBubbleChart = () => {
      const data = props.chartData;
      const width = 600; // Set the width of the chart
      const height = 400; // Set the height of the chart

      // Clear any existing SVG
      d3.select(chartContainer.value).selectAll("*").remove();

      // Create SVG element
      const svg = d3
        .select(chartContainer.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Set up a scale for the bubbles
      const scale = d3
        .scaleLinear()
        .domain([d3.min(data, (d) => d.value), d3.max(data, (d) => d.value)])
        .range([10, 50]); // Size of bubbles

      // Create bubbles
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * 60 + 50) // Positioning bubbles
        .attr("cy", height / 2)
        .attr("r", (d) => scale(d.value))
        .attr("fill", "steelblue"); // Color of bubbles
    };

    // Watch for changes in chartData prop and re-render the chart
    watch(
      () => props.chartData,
      () => {
        createBubbleChart();
      },
      { immediate: true }
    );

    onMounted(createBubbleChart);

    return {
      chartContainer,
    };
  },
};
</script>

<style>
.bubble-chart {
  /* Styles for your chart container */
}
</style>

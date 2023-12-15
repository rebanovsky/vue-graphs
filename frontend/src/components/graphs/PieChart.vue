<template>
  <div ref="chart"></div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import * as d3 from "d3";

export default {
  name: "PieChart",
  props: {
    data: Array,
    height: Number,
    width: Number,
    legend: {
      type: Boolean,
    },
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

      // Append text elements
      g.selectAll(".arc")
        .data(sectors)
        .enter()
        .append("text")
        .attr("class", "dark:fill-slate-200 fill-slate-100")
        .attr("transform", function (d) {
          // Calculate the centroid of each sector
          const c = arc.centroid(d);
          return "translate(" + c[0] + "," + c[1] + ")";
        })
        .attr("text-anchor", "middle") // Center the text horizontally
        .attr("dy", "0.35em") // Center the text vertically
        .text(function (d) {
          return d.value;
        });

      // Create legend
      if (props.legend) {
        const legend = svg
          .append("g")
          .attr("class", "legend bg-slate-200")
          .attr("transform", `translate(${props.width - 120}, ${30})`); // Adjust these values as needed

        // Add legend items
        props.data.forEach((d, i) => {
          const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`); // Space out legend items

          // Draw color boxes
          legendRow
            .append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", customColors[i % customColors.length]);

          // Add text labels
          legendRow
            .append("text")
            .attr("class", "dark:fill-slate-300 text-xs")
            .attr("x", 20) // Distance from the color box
            .attr("y", 10) // Vertically align text with box
            .text(d.label); // Assuming each data element has a label
        });
      }
    };

    // onMounted(renderChart);

    watchEffect(renderChart);

    return {
      chart,
    };
  },
};
</script>

<style scoped></style>

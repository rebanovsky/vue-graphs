<template>
  <div class="graph-wrapper flex flex-col">
    <div
      class="graph-title gridlines w-[100%] px-[12px] py-[8px] text-[12px] font-medium dark:text-slate-400 text-slate-600"
    >
      {{ title }}
    </div>
    <div
      class="graph-legend w-[100%] px-[10px] h-[16px] text-[10px] font-medium dark:text-slate-400 text-slate-600"
    >
    </div>
    <svg
      ref="svgRef"
      :width="width + margin.left + margin.right"
      :height="height + margin.top + margin.bottom"
      class="rounded-[8px] chart-border"
    >
      <g :transform="'translate(' + margin.left + ',' + margin.top + ')'"></g>
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { ref, watchEffect } from "vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 400,
    },
    margin: {
      type: Object,
      default: () => ({ top: 20, right: 30, bottom: 30, left: 30 }),
    },
    title: {
      type: String,
    }
  },
  setup(props) {
    const svgRef = ref(null);

    const drawChart = () => {
      const svg = d3.select(svgRef.value).select("g");
      svg.selectAll("*").remove(); // Clear svg content before redrawing

      const data = props.data.map((d) => ({
        ...d,
        Date: new Date(d.Date),
        Open: +d.Open,
        High: +d.High,
        Low: +d.Low,
        Close: +d.Close,
      }));

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.Date))
        .range([0, props.width])
        .padding(0.1);

      const priceRange =
        d3.max(data, (d) => d.High) - d3.min(data, (d) => d.Low);
      const padding = priceRange * 0.2; // 5% padding

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(data, (d) => d.Low) - padding, // Lower the bottom of the scale
          d3.max(data, (d) => d.High) + padding, // Raise the top of the scale
        ])
        .range([props.height, 0]);

      // Select three dates from your data for the x-axis ticks
      const tickValues =
        data.length > 2
          ? [
              data[0].Date,
              data[Math.floor(data.length / 2)].Date,
              data[data.length - 1].Date,
            ]
          : data.map((d) => d.Date);

      svg
        .append("g")
        .attr("transform", `translate(0, ${props.height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickValues(tickValues)
            .tickFormat(d3.timeFormat("%m-%d"))
            .tickSize(0)
        )
        .call((g) =>
          g
            .selectAll(".domain")
            .attr("class", "stroke-slate-400 dark:stroke-slate-700")
        )
        .selectAll(".tick text")
        .attr("dy", "1.25em")
        .attr("fill", "#666")
        .style("text-anchor", "middle");

      // Remove the y-axis line
      svg
        .append("g")
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(0) // No tick marks
            .ticks(2) // Number of ticks you want on the y-axis
        )
        .call((g) => g.select(".domain").remove()) // Remove the y-axis line
        .selectAll(".tick text")
        .attr("dx", "-0.5em")
        .attr("fill", "#666");

      // Add horizontal grid lines
      svg
        .append("g")
        .attr("class", "grid")
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-props.width) // Extend the tick lines across the chart area
            .tickFormat("") // No text for these ticks.ticks(2)
            .ticks(2)
        )
        .call((g) => g.select(".domain").remove()) // Remove the axis line
        .call((g) =>
          g
            .selectAll(".tick line")
            .attr("stroke-opacity", 0.3)
            .attr("stroke-dasharray", "2,2")
        ); // Style the grid lines

      data.forEach((d) => {
        svg
          .append("rect")
          .attr("x", xScale(d.Date))
          .attr("y", yScale(Math.max(d.Open, d.Close)))
          .attr("width", xScale.bandwidth())
          .attr("height", Math.abs(yScale(d.Open) - yScale(d.Close)) || 1)
          .attr("rx", 1)
          .attr("fill", d.Open > d.Close ? "red" : "green");

        svg
          .append("line")
          .attr("class", "stem")
          .attr("x1", xScale(d.Date) + xScale.bandwidth() / 2)
          .attr("x2", xScale(d.Date) + xScale.bandwidth() / 2)
          .attr("y1", yScale(d.High))
          .attr("y2", yScale(d.Low))
          .attr("stroke", d.Open > d.Close ? "red" : "green");
      });
    };

    watchEffect(drawChart);

    return { svgRef };
  },
};
</script>

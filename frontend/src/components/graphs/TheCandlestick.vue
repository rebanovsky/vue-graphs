<template>
  <div class="graph-wrapper flex flex-col gridlines">
    <svg
      ref="svgRef"
      :width="width + margin.left + margin.right"
      :height="height + margin.top + margin.bottom"
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
    },
  },
  setup(props) {
    const svgRef = ref(null);

    const drawChart = () => {
      const svg = d3.select(svgRef.value).select("g");
      svg.selectAll("*").remove();

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
          d3.min(data, (d) => d.Low) - padding,
          d3.max(data, (d) => d.High) + padding,
        ])
        .range([props.height, 0]);

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
        .call(d3.axisLeft(yScale).tickSize(0).ticks(2))
        .call((g) => g.select(".domain").remove())
        .selectAll(".tick text")
        .attr("dx", "-0.5em")
        .attr("fill", "#666");

      //
      // Gridlines
      //

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
        .call((g) => g.select(".domain").remove())
        .call((g) =>
          g
            .selectAll(".tick line")
            .attr("stroke-opacity", 0.3)
            .attr("stroke-dasharray", "2,2")
        );

      data.forEach((d) => {
        svg
          .append("rect")
          .attr("x", xScale(d.Date))
          .attr("y", yScale(Math.max(d.Open, d.Close)))
          .attr("width", xScale.bandwidth())
          .attr("height", Math.abs(yScale(d.Open) - yScale(d.Close)) || 1)
          .attr("rx", 1)
          .attr("fill", d.Open > d.Close ? "#ff1612" : "#63ce21");

        svg
          .append("line")
          .attr("class", "stem")
          .attr("x1", xScale(d.Date) + xScale.bandwidth() / 2)
          .attr("x2", xScale(d.Date) + xScale.bandwidth() / 2)
          .attr("y1", yScale(d.High))
          .attr("y2", yScale(d.Low))
          .attr("stroke", d.Open > d.Close ? "#ff1612" : "#63ce21");
      });
    };

    watchEffect(drawChart);

    return { svgRef };
  },
};
</script>

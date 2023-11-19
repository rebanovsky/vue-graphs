<template>
  <div ref="resizeRef" class="pie-container">
    <svg
      ref="svgRef"
      id="piechart"
      class="stroke-[2.5px] rounded-[10px] stroke-expbox dark:stroke-darkexpbox transition ease"
    ></svg>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import useResizeObserver from "@/composables/useResizeObserver";
import { select } from "d3-selection";
import { scaleOrdinal } from "d3-scale";
import * as shape from "d3-shape";

export default {
  props: ["data", "dark"],
  setup(props) {
    const svgRef = ref(null);

    const { resizeRef, resizeState } = useResizeObserver();

    onMounted(() => {
      const svg = select(svgRef.value);

      // watchEffect(() => {
      const { width, height } = resizeState.dimensions;

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      const radius = Math.min(width, height) / 2;

      let color;

      // set the color scale
      if (props.dark) {
        if (props.data.transaction == "BUY") {
          color = scaleOrdinal()
            .domain(Object.keys(props.data))
            .range(["rgb(0 186 66)", "#2b365c"]);
        } else if (props.data.transaction == "SELL") {
          color = scaleOrdinal()
            .domain(Object.keys(props.data))
            .range(["#ff004b", "#2b365c"]);
        }
      } else {
        if (props.data.transaction == "BUY") {
          color = scaleOrdinal()
            .domain(Object.keys(props.data))
            .range(["rgb(0 186 66)", "#b8cee6"]);
        } else if (props.data.transaction == "SELL") {
          color = scaleOrdinal()
            .domain(Object.keys(props.data))
            .range(["#ff004b", "#b8cee6"]);
        }
      }

      // dark stroke: #2b365c, light: #b8cee6

      // RED: #e3594f , GREEN: #40c256

      // Compute the position of each group on the pie:
      const pie = shape
        .pie()
        // .startAngle(-0.5 * Math.PI)
        // .endAngle(0.5 * Math.PI)
        .sort(null) // Do not sort group by size
        .value((d) => d[1]);

      const data_ready = pie(Object.entries(props.data));

      // The arc generator
      const arc = shape
        .arc()
        .innerRadius(radius * 0.7) // This is the size of the donut hole
        .outerRadius(radius * 0.9)
        .cornerRadius(2);

      // Another arc that won't be drawn. Just for labels positioning
      // const outerArc = shape
      //   .arc()
      //   .innerRadius(radius * 0.9)
      //   .outerRadius(radius * 0.9);

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll(".slices")
        .data(data_ready)
        .join("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data[0]))
        .attr("transform", "translate(" + radius + "," + radius + ")");

      //   // Add the polylines between chart and labels:
      //   svg
      //     .selectAll("allPolylines")
      //     .data(data_ready)
      //     .join("polyline")
      //     .attr("stroke", "white")
      //     .style("fill", "none")
      //     .attr("stroke-width", 0.5)
      //     .attr("points", function (d) {
      //       const posA = arc.centroid(d); // line insertion in the slice
      //       const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
      //       const posC = outerArc.centroid(d); // Label position = almost the same as posB
      //       const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
      //       posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
      //       return [posA, posB, posC];
      //     });

      //   // Add the polylines between chart and labels:
      //   svg
      //     .selectAll("allLabels")
      //     .data(data_ready)
      //     .join("text")
      //     .text((d) => d.data[0])
      //     .attr("transform", function (d) {
      //       const pos = outerArc.centroid(d);
      //       const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      //       pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      //       return `translate(${pos})`;
      //     })
      //     .style("text-anchor", function (d) {
      //       const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      //       return midangle < Math.PI ? "start" : "end";
      // });
    });

    return { svgRef, resizeRef };
  },
};
</script>

<style>
svg#piechart {
  width: 88px;
  height: 88px;
}
</style>

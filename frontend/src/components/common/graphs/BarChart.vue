<template>
  <div ref="resizeRef" class="bar-insiders-container w-[840px] h-[280px]">
    <svg ref="svgRef" class="canvas">
      <g
        stroke="0.5px"
        class="grid-lines dark:stroke-darkgridline stroke-slate-300"
      />
      <g class="x-axis-topins" />
      <g class="y-axis-topins" />
    </svg>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import useResizeObserver from "@/composables/useResizeObserver";
import { select } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { format } from "d3-format";

export default {
  props: ["data"],
  setup(props) {
    const svgRef = ref(null);
    const { resizeRef, resizeState } = useResizeObserver();

    onMounted(() => {
      const svg = select(svgRef.value);
      const { width, height } = resizeState.dimensions;

      const xScale = scaleBand()
        .range([0, width])
        .domain(props.data.map((d) => d.x))
        .padding(0.5);

      const yScale = scaleLinear()
        .domain([
          0,
          1.3 *
            max(props.data, function (d) {
              return d.y;
            }),
        ])
        .range([height, 0]);

      svg
        .selectAll("rect")
        .data(props.data)
        .join("rect")
        .attr("class", "transition ease fill-[#ee7298] translate-x-[-0.5px]")
        .attr("y", (d) => yScale(d.y))
        .attr("height", (d) => height - yScale(d.y))
        .attr("x", (d) => xScale(d.x))
        .attr("width", xScale.bandwidth())
        .attr("rx", 1)
        .lower();

      // Animations //
      svg
        .selectAll("rect")
        .transition()
        .duration(650)
        .attr("y", (d) => yScale(d.y))
        .attr("height", (d) => height - yScale(d.y));

      const yGridLines = (g) =>
        g
          .attr(
            "class",
            "grid-lines dark:stroke-darkgridline stroke-[0.5px] stroke-boxborderlight transition ease"
          )
          .selectAll("line")
          .data(yScale.ticks(2))
          .join("line")
          .attr("y1", (d) => yScale(d))
          .attr("y2", (d) => yScale(d))
          .attr("x1", 0)
          .attr("x2", width);

      svg.select(".grid-lines").call(yGridLines).lower();

      const xAxis = axisBottom(xScale);
      const yAxis = axisLeft(yScale);

      svg
        .selectAll(".label")
        .data(props.data)
        .join("text")
        .attr(
          "class",
          "label text-[10px] fill-aitext dark:fill-slate-300 transition duration-800 ease cursor-default"
        )
        .attr("x", (d) => xScale(d.x) + xScale.bandwidth() / 2)
        .attr("y", (d) => yScale(d.y) - 12) //vertically centers the label
        .attr("dy", ".35em") // Adjusts the vertical alignment based on the font size, '.35em' is approximately the vertical center for many fonts.
        .attr("text-anchor", "middle") // horizontally centers the text
        .text(function (d) {
          return (
            "$" +
            Intl.NumberFormat("en", {
              notation: "compact",
            }).format(d.y)
          );
        });

      svg
        .select(".y-axis-topins")
        .attr("transform", `translate(0,0)`)
        .call(yAxis.tickSize(0).ticks(2))
        .style("font-size", "10px")
        .style("font-family", "poppins")
        .style("font-weight", "400")
        .style("stroke-width", "0")
        .style("cursor", "default")
        .selectAll(".tick text")
        .attr("x", "-5")
        .raise();

      svg
        .select(".x-axis-topins")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis.tickSize(0))
        .style("font-size", "10px")
        .style("font-family", "poppins")
        .style("font-weight", "400")
        .style("stroke-width", "0.5")
        .style("cursor", "default");
    });

    return { svgRef, resizeRef };
  },
};
</script>

<style>
.bar-insiders-container {
  padding: 10px 0 20px 40px;
  border-radius: 5px;
}

.x-axis-topins > path.domain {
  color: transparent;
}

.y-axis-topins {
  z-index: 999;
}

.y-axis-topins > path.domain {
  color: #c3d1e4;
}
</style>

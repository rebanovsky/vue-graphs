<template>
  <div class="relative">
    <div
      class="bubbles-container chart-border"
      :style="{ width: width + 'px', height: height + 'px' }"
    >
      <svg ref="svgRef" class="canvas">
        <g class="x-axis-bubble" />
        <g class="y-axis-bubble" />
        <g class="grid-lines" />
      </svg>
    </div>
    <div id="bubble-tooltip"></div>
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { select } from "d3-selection";
import { scaleLinear, scaleOrdinal } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { max, min } from "d3-array";

export default {
  props: ["data", "width", "height"], // Add width and height as props
  setup(props) {
    const svgRef = ref(null);

    onMounted(() => {
      const svg = select(svgRef.value);

      // Use the width and height props
      const { width, height } = { width: props.width, height: props.height };

      const x = scaleLinear()
        .domain([
          min(props.data, function (d) {
            return d.performancePercentage;
          }) -
            Math.abs(
              0.25 *
                min(props.data, function (d) {
                  return d.performancePercentage;
                })
            ),
          max(props.data, function (d) {
            return d.performancePercentage;
          }) * 1.25,
        ])
        .range([0, width]);

      const y = scaleLinear()
        .domain([
          -0.3 *
            max(props.data, function (d) {
              return d.ownership;
            }),
          max(props.data, function (d) {
            return d.ownership;
          }) * 1.25,
        ])
        .range([height, 0]);

      const z = scaleLinear()
        .domain([
          min(props.data, function (d) {
            return d.weight;
          }),
          max(props.data, function (d) {
            return d.weight;
          }),
        ])
        .range([4, 40]);

      const colors = [
        "#fe4d66", // Bright pink
        "#ffa338", // Orange peel
        "#1da1ec", // Celestial blue
        "#AC54DF", // Amethyst (purple)
        "#771EAE", // Grape (dark purple)
        "#FF784F", // Coral (orange)
        "#37C754", // Dark pastel green
        "#2240D3", // Palatinate blue (darker blue)
        "#009BA3", // Dark cyan
        "#5ce6a8", // Aquamarine
      ];

      const myColor = scaleOrdinal()
        .domain([
          undefined,
          "Energy",
          "Materials",
          "Industrials",
          "Consumer Staples",
          "Consumer Discretionary",
          "Health Care",
          "Financials",
          "Information Technology",
          "Communication Services",
          "Utilities",
          "Real Estate",
        ])
        .range(colors);

      svg
        .select(".x-axis-bubble")
        .attr("transform", `translate(0, ${y(0)})`)
        .call(
          axisBottom(x)
            .ticks(5)
            .tickSize(0)
            .tickFormat((d) => d === 0 ? "" : d + "%")
        );

      // Add Y axis
      svg
        .select(".y-axis-bubble")
        .attr("transform", `translate(${x(0)}, 0)`)
        .call(
          axisLeft(y)
            .ticks(3)
            .tickSize(0)
            .tickFormat((d) => d === 0 ? "" : d + "%")
        );

      // -1- Create a tooltip div that is hidden by default:
      let tooltip = select("#bubble-tooltip")
        .style("opacity", 0)
        .attr(
          "class",
          "bg-slate-200 text-slate-700 border-[1px] rounded border-boxborderlight shadow-boxshlight dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"
        );

      const svgNode = svgRef.value; // Get the actual DOM node

      // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
      const showTooltip = (event, d) => {
        select(event.currentTarget).transition().duration(0);
        tooltip
          .style("opacity", 1)
          .style("display", "block")
          .attr('class', 'shadow-boxsh bg-slate-100 dark:bg-slate-900 dark:shadow dark:border-slate-700 chart-border rounded')
          .html(
            `<em class="text-[14px] font-normal">` +
              `${d.securityName}` +
              `</em>` +
              `<br />` +
              `<br />` +
              "performance:&nbsp;&nbsp;" +
              `<em class="font-semibold">` +
              `
              ${d.performancePercentage.toFixed(2)}%` +
              `</em>` +
              `<br />` +
              "ownership:&nbsp;&nbsp;" +
              `<em class="font-semibold">` +
              `
              ${d.ownership.toFixed(2)}%` +
              `<br />` +
              `</em>` +
              "portfolio weight:&nbsp;&nbsp;" +
              `<em class="font-semibold">` +
              `
              ${d.weight.toFixed(2)}%` +
              `<br/>` +
              `</em>` +
              "sector:&nbsp;&nbsp;" +
              `<em class="font-semibold">` +
              `
              ${d.sector}` +
              `</em>`
          );
        moveTooltip(event);
      };

      const moveTooltip = function (event) {
        let tooltip = select("#bubble-tooltip");

        // Get the bounding rectangle of the SVG
        let svgRect = svgNode.getBoundingClientRect();

        // Adjust these values based on the size of the tooltip, bubble, and SVG position
        let offsetX = 20;
        let offsetY = -30;

        // Adjust the position based on the SVG position
        tooltip
          .style("left", `${event.pageX - svgRect.left + offsetX}px`)
          .style("top", `${event.pageY - svgRect.top + offsetY}px`);
      };

      const hideTooltip = (event, d) => {
        let tooltip = select("#bubble-tooltip");
        tooltip.style("display", "none");
      };

      // // Add the y-axis title
      // svg
      //   .append("text")
      //   .attr(
      //     "class",
      //     "absolute bg-slate-200 text-slate-700 border-[1px] border-slate-400 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300"
      //   )
      //   .attr("x", width / 2)
      //   .attr("y", height + 40)
      //   .html("X axis title");

      let dots = svg
        .selectAll(".dot")
        .data(props.data)
        .join("circle")
        .attr(
          "class",
          "bubbles stroke-[0.75px] cursor-pointer stroke-slate-300 dark:stroke-slate-700 hover:stroke-slate-700 dark:hover:stroke-slate-300"
        )
        .attr("cx", (d) => x(d.performancePercentage))
        .attr("cy", (d) => y(d.ownership))
        .attr("r", (d) => z(d.weight))
        .style("fill", (d) => myColor(d.sector))
        // -3- Trigger the functions
        .on("mouseover", showTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip);

      dots.on("click", (event, d) => {
        select(event.currentTarget);
        document.location.href = "../../../company/" + d.symbol;
      });
    });

    return { svgRef };
  },
};
</script>

<style>
#bubble-tooltip {
  position: absolute;
  padding: 14px;
  pointer-events: none;
  font-size: 12px;
  line-height: 24px;
  white-space: nowrap;
}

.bubbles-container {
  width: auto;
  height: 300px;
  border-radius: 5px;
}

.y-axis-bubble > path.domain,
.x-axis-bubble > path.domain {
  color: rgb(188, 188, 188);
}

.x-axis-bubble > g.tick > text {
  transform: translateY(2px);
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins;
}

.y-axis-bubble > g.tick > text {
  transform: translateX(-4px);
  font-family: Poppins;
  font-size: 12px;
}
</style>

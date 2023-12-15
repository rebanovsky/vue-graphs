<template>
  <div ref="chart" class="gridlines"></div>
</template>

<script>
import { ref, onMounted, watchEffect, watch } from "vue";
import * as d3 from "d3";

export default {
  name: "SingleLine",
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 200,
    },
    dateFormat: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "Title",
    },
    dotColor: {
      type: String,
      default: "#05D9FF",
    },
    lineColor: {
      type: String,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    gridlines: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: Boolean,
    },
    xAxis: {
      type: Boolean,
    },
  },
  setup(props) {
    const chart = ref(null);
    const parseDate = props.dateFormat ? d3.timeParse(props.dateFormat) : null;

    const drawChart = () => {
      if (!chart.value) return;

      d3.select(chart.value).selectAll("*").remove();

      const svg = d3
        .select(chart.value)
        .append("svg")
        .attr("width", props.width)
        .attr("height", props.height);

      let xDomain;
      if (props.dateFormat) {
        xDomain = [
          d3.min(props.data, (d) => d3.min(d.values, (pt) => parseDate(pt.x))),
          d3.max(props.data, (d) => d3.max(d.values, (pt) => parseDate(pt.x))),
        ];
      } else {
        xDomain = [
          d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.x)),
          d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.x)),
        ];
      }

      const xScale = props.dateFormat
        ? d3.scaleTime().domain(xDomain).range([0, props.width])
        : d3.scaleLinear().domain(xDomain).range([0, props.width]);

      // Calculate the base min and max values for y
      let yMin = d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.y));
      let yMax = d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.y));

      // Add padding to y-scale (for example, 5% of the range)
      let yPadding = (yMax - yMin) * 0.25;
      yMin -= yPadding;
      yMax += yPadding;

      const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([props.height, 0]);

      function make_y_gridlines() {
        return d3
          .axisLeft(yScale)
          .ticks(2)
          .tickSize(-props.width)
          .tickFormat("");
      }

      if (props.gridlines) {
        svg
          .append("g")
          .call(make_y_gridlines().tickSize(-props.width).tickFormat(""))
          .attr("class", "text-slate-200 dark:text-slate-800");
      }

      const line = d3
        .line()
        .x((d) => xScale(props.dateFormat ? parseDate(d.x) : d.x))
        .y((d) => yScale(d.y));

      props.data.forEach((d) => {
        const path = svg
          .append("path")
          .data([d.values])
          .attr("class", "line")
          .attr("d", line)
          .attr("style", `stroke: ${props.lineColor} !important;`)
          .attr("fill", "none");

        if (props.animation) {
          path.each(function () {
            const totalLength = this.getTotalLength();
            d3.select(this)
              .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
              .attr("stroke-dashoffset", totalLength)
              .transition()
              .duration(600) // Animation duration
              .ease(d3.easeCubicInOut)
              .attr("stroke-dashoffset", 0);
          });
        }
      });

      if (props.dateFormat) {
        const xAxis = svg
          .append("g")
          .attr("class", "axis")
          .attr("transform", `translate(0,${props.height})`)
          .call(
            d3
              .axisBottom(xScale)
              .ticks(d3.timeDay.every(1))
              .tickFormat(d3.timeFormat(props.dateFormat))
          );

        xAxis
          .select(".domain")
          .style("stroke", "rgb(210, 220, 231)")
          .style("stroke-width", "1px");
      } else {
        const xAxis = svg
          .append("g")
          .attr("class", "axis")
          .attr("transform", `translate(0,${props.height})`)
          .call(d3.axisBottom(xScale));

        xAxis
          .select(".domain")
          .style("stroke", "rgb(173, 181, 189)")
          .style("stroke-width", "1px");
      }

      if (!props.xAxis) {
        svg.select(".domain").remove();
      }

      if (props.tooltip) {
        const hoverVerticalLineGroup = svg
          .append("g")
          .attr("class", "hover-vertical-line");

        // Then, create the hover circles group
        const hoverCirclesGroup = svg
          .append("g")
          .attr("class", "hover-circles");

        svg.on("mousemove", (event) => {
          const [mx] = d3.pointer(event); // Get mouse x-coordinate relative to SVG
          const mouseXValue = xScale.invert(mx); // Convert to data value

          // Clear existing hover elements before drawing new ones.
          hoverCirclesGroup.selectAll("circle").remove();
          hoverCirclesGroup.selectAll("text").remove(); // Remove existing labels

          props.data.forEach((series) => {
            let closestPt;
            let closestDistance = Infinity;

            series.values.forEach((pt) => {
              const dataXValue = props.dateFormat ? parseDate(pt.x) : pt.x;
              const distance = Math.abs(dataXValue - mouseXValue);

              if (distance < closestDistance) {
                closestDistance = distance;
                closestPt = pt;
              }
            });

            if (closestPt) {
              const cx = xScale(
                props.dateFormat ? parseDate(closestPt.x) : closestPt.x
              );
              // Append the primary hover circle (existing)

              // Append the new larger, semi-transparent black hover circle
              hoverCirclesGroup
                .append("circle")
                .attr(
                  "cx",
                  xScale(
                    props.dateFormat ? parseDate(closestPt.x) : closestPt.x
                  )
                )
                .attr("cy", yScale(closestPt.y))
                .attr("r", 32) // The size of the larger circle
                .attr("fill", "rgba(61, 151, 255, 0.1)"); // Semi-transparent black

              hoverCirclesGroup
                .append("circle")
                .attr(
                  "cx",
                  xScale(
                    props.dateFormat ? parseDate(closestPt.x) : closestPt.x
                  )
                )
                .attr("cy", yScale(closestPt.y))
                .attr("r", 4) // The size of the smaller circle
                .attr("class", `fill-[#3d97ff] dark:fill-[#49B7F7]`);

              // Append text label for the y value
              hoverCirclesGroup
                .append("text")
                .attr("x", mx) // Position aligned with the mouse x on the vertical line
                .attr("y", 0) // Position at the top of the SVG drawing area
                .text(d3.format(".2f")(closestPt.y)) // Format the y value to 2 decimal places
                .attr("class", "fill-slate-500 text-[1em] gridlines") // Text color
                .attr("text-anchor", "left") // Text alignment to the left of the x position
                .attr("alignment-baseline", "hanging") // Text alignment to hang from the y position
                .attr("dx", "5px") // Offset from the vertical line to avoid overlap
                .attr("dy", "5px"); // Offset from the top to be clearly visible
            }
          });

          // Draw the vertical hover line.
          hoverVerticalLineGroup.selectAll("line").remove();
          hoverVerticalLineGroup
            .append("line")
            .attr("x1", mx)
            .attr("x2", mx)
            .attr("y1", 0)
            .attr("y2", props.height)
            .attr("class", "stroke-slate-400 dark:stroke-slate-600")
            .attr("stroke-dasharray", "3,3");
        });

        // Hide the circles and line when the mouse is not over the chart.
        svg.on("mouseleave", () => {
          hoverCirclesGroup.selectAll("circle").remove();
          hoverCirclesGroup.selectAll("text").remove();
          hoverVerticalLineGroup.selectAll("line").remove();
        });
      }
    };

    onMounted(drawChart);

    const animateLine = () => {
      const paths = d3.select(chart.value).selectAll(".line");
      paths.each(function () {
        const totalLength = this.getTotalLength();
        d3.select(this)
          .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(420)
          .ease(d3.easeCubicInOut)
          .attr("stroke-dashoffset", 0);
      });
    };

    // Watch for changes in the animation prop
    watch(
      () => props.animation,
      (newVal) => {
        if (newVal) {
          animateLine();
        }
      }
    );

    // Reactive effect for redrawing the chart on data change
    watchEffect(() => {
      drawChart();
    });

    return {
      chart,
      animateLine,
    };
  },
};
</script>

<style scoped>
.line {
  stroke-width: 2px;
}
</style>

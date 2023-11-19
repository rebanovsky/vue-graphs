<template>
  <div
    ref="chart"
    class="border-[1px] border-slate-300 rounded-[4px]"
  ></div>
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
      default: 400,
    },
    height: {
      type: Number,
      default: 180,
    },
    dateFormat: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const chart = ref(null);
    const parseDate = props.dateFormat ? d3.timeParse(props.dateFormat) : null; // Conditional parsing based on dateFormat

    console.log("data: ", props.data);

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

      const line = d3
        .line()
        .x((d) => xScale(props.dateFormat ? parseDate(d.x) : d.x))
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
          .style("stroke-width", "0px");
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

      const hoverVerticalLineGroup = svg
        .append("g")
        .attr("class", "hover-vertical-line");

      // Then, create the hover circles group
      const hoverCirclesGroup = svg.append("g").attr("class", "hover-circles");

      // Then, after drawing your lines:
      svg.on("mousemove", (event) => {
        const [mx] = d3.pointer(event); // Get mouse x-coordinate relative to SVG
        const mouseXValue = xScale.invert(mx); // Convert to data value

        // Clear the existing hover circles before drawing the new ones.
        hoverCirclesGroup.selectAll("circle").remove();

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
            hoverCirclesGroup
              .append("circle")
              .attr(
                "cx",
                xScale(props.dateFormat ? parseDate(closestPt.x) : closestPt.x)
              )
              .attr("cy", yScale(closestPt.y))
              .attr("r", 5) // You can adjust the size as needed.
              .attr("fill", series.color);
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
          .attr("stroke", "grey")
          .attr("stroke-dasharray", "3,3");
      });

      // Hide the circles and line when the mouse is not over the chart.
      svg.on("mouseleave", () => {
        hoverCirclesGroup.selectAll("circle").remove();
        hoverVerticalLineGroup.selectAll("line").remove();
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

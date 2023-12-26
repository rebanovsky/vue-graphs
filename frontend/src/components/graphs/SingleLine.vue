<template>
  <div ref="chart" class="gridlines"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect, watch } from "vue";
import * as d3 from "d3";

const props = defineProps({
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
  gradient: {
    type: Boolean,
  },
});
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

  //
  // X-axis
  //

  const isDate =
    props.dateFormat && !isNaN(Date.parse(props.data[0].values[0].x));
  const isNumber = typeof props.data[0].values[0].x === "number";

  let xScale;
  if (isDate) {
    const xDomain = [
      d3.min(props.data, (d) => d3.min(d.values, (pt) => parseDate(pt.x))),
      d3.max(props.data, (d) => d3.max(d.values, (pt) => parseDate(pt.x))),
    ];
    xScale = d3.scaleTime().domain(xDomain).range([0, props.width]);
  } else if (isNumber) {
    const xDomain = [
      d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.x)),
      d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.x)),
    ];
    xScale = d3.scaleLinear().domain(xDomain).range([0, props.width]);
  } else {
    // For string values
    xScale = d3
      .scalePoint()
      .domain(props.data[0].values.map((d) => d.x))
      .range([0, props.width])
      .padding(0.5);
  }

  let yMin = d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.y));
  let yMax = d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.y));

  //
  // Y-axis
  //

  let yPadding = (yMax - yMin) * 0.25;
  yMin -= yPadding;
  yMax += yPadding;

  const yScale = d3.scaleLinear().domain([yMin, yMax]).range([props.height, 0]);

  //
  // Gridlines
  //

  function make_y_gridlines() {
    return d3.axisLeft(yScale).ticks(2).tickSize(-props.width).tickFormat("");
  }

  if (props.gridlines) {
    svg
      .append("g")
      .call(make_y_gridlines().tickSize(-props.width).tickFormat(""))
      .attr("class", "text-slate-200 dark:text-slate-800");
  }

  //
  // Line operations
  //

  const line = d3
    .line()
    .x((d) => xScale(isDate ? parseDate(d.x) : d.x))
    .y((d) => yScale(d.y))
    // .curve(d3.curveMonotoneX) // !!! PROP !!! make curved an option
    .defined((d) => !isNaN(d.y)); // Handle missing data

  //
  // Gradient
  //

  if (props.gradient) {
    const firstItemYValue = yScale(props.data[0].values[0].y);

    const area = d3
      .area()
      .x((d) => xScale(props.dateFormat ? parseDate(d.x) : d.x))
      .y0(firstItemYValue)
      .y1((d) => yScale(d.y))
      .curve(d3.curveMonotoneX);

    const gradientId = `gradient-area-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const gradient = svg
      .append("linearGradient")
      .attr("id", gradientId)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr(
        "y1",
        yScale(d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.y)))
      )
      .attr(
        "y2",
        yScale(d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.y)))
      );

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "rgb(204,0,0)")
      .attr("stop-opacity", 0.4);

    gradient
      .append("stop")
      .attr("offset", "40%")
      .attr("stop-color", "rgb(255, 0, 106)")
      .attr("stop-opacity", 0.05);

    gradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#f1f5f900");

    gradient
      .append("stop")
      .attr("offset", "60%")
      .attr("stop-color", "rgb(0, 128, 0)")
      .attr("stop-opacity", 0.05);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(0, 128, 0)")
      .attr("stop-opacity", 0.4);

    const colorScaleRed = d3
      .scaleLinear()
      .domain([
        d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.y)),
        firstItemYValue,
      ])
      .range(["darkred", "red"]);

    const colorScaleGreen = d3
      .scaleLinear()
      .domain([
        firstItemYValue,
        d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.y)),
      ])
      .range(["green", "lightgreen"]);

    props.data.forEach((d) => {
      svg
        .append("path")
        .data([d.values])
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", `url(#${gradientId})`);
      const lineGradientId = `line-gradient-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      const lineGradient = svg
        .append("linearGradient")
        .attr("id", lineGradientId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", xScale.range()[0])
        .attr("x2", xScale.range()[1]);

      d.values.forEach((point) => {
        const color =
          point.y < firstItemYValue
            ? colorScaleRed(point.y)
            : colorScaleGreen(point.y);
        const offset =
          (xScale(props.dateFormat ? parseDate(point.x) : point.x) -
            xScale.range()[0]) /
          (xScale.range()[1] - xScale.range()[0]);
        lineGradient
          .append("stop")
          .attr("offset", `${offset * 100}%`)
          .attr("stop-color", color);
      });

      svg
        .append("path")
        .data([d.values])
        .attr("class", "line")
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", `url(#${lineGradientId})`);
    });
  }

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
          .duration(600)
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

    const hoverCirclesGroup = svg.append("g").attr("class", "hover-circles");

    svg.on("mousemove", (event) => {
      const [mx] = d3.pointer(event);

      let closestPt = null;
      let closestDistance = Infinity;

      if (!isDate && !isNumber) {
        // For string-based x-axis
        props.data.forEach((series) => {
          series.values.forEach((pt) => {
            const xPosition = xScale(pt.x);
            const distance = Math.abs(mx - xPosition);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestPt = pt;
            }
          });
        });
      } else {
        // For continuous scales (date or number)
        const mouseXValue = xScale.invert(mx);
        props.data.forEach((series) => {
          series.values.forEach((pt) => {
            const ptXValue = isDate ? parseDate(pt.x) : pt.x;
            const distance = Math.abs(ptXValue - mouseXValue);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestPt = pt;
            }
          });
        });
      }

      hoverCirclesGroup.selectAll("*").remove();
      hoverVerticalLineGroup.selectAll("*").remove();

      if (closestPt) {
        const cx = xScale(closestPt.x);

        // Large circle
        hoverCirclesGroup
          .append("circle")
          .attr("cx", cx)
          .attr("cy", yScale(closestPt.y))
          .attr("r", 36)
          .attr("fill", "rgba(61, 151, 255, 0.1)");

        // Small circle
        hoverCirclesGroup
          .append("circle")
          .attr("cx", cx)
          .attr("cy", yScale(closestPt.y))
          .attr("r", 4)
          .attr("class", "fill-[#0072ff] dark:fill-[#49B7F7]");

        // Append text label for the y value
        hoverCirclesGroup
          .append("text")
          .attr("x", cx)
          .attr("y", 0)
          .text(d3.format(".2f")(closestPt.y))
          .attr("class", "fill-slate-500 text-[1em] gridlines")
          .attr("text-anchor", "left")
          .attr("alignment-baseline", "hanging")
          .attr("dx", "5px")
          .attr("dy", "5px");

        // Vertical line
        hoverVerticalLineGroup
          .append("line")
          .attr("x1", cx)
          .attr("x2", cx)
          .attr("y1", 0)
          .attr("y2", props.height)
          .attr("class", "stroke-slate-400 dark:stroke-slate-600")
          .attr("stroke-dasharray", "3,3");
      }
    });

    svg.on("mouseleave", () => {
      hoverCirclesGroup.selectAll("*").remove();
      hoverVerticalLineGroup.selectAll("*").remove();
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

watch(
  () => props.animation,
  (newVal) => {
    if (newVal) {
      animateLine();
    }
  }
);

watchEffect(() => {
  drawChart();
});
</script>

<style scoped>
.line {
  stroke-width: 1px;
}
</style>

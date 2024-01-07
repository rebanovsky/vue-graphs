<template>
  <div ref="chart" class="gridlines"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
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
  dateParse: {
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
  animations: {
    type: Boolean,
  },
  xAxis: {
    type: Boolean,
  },
  yAxis: {
    type: Boolean,
    default: true,
  },
  gradient: {
    type: Boolean,
  },
  smooth: {
    type: Boolean,
  },
});
const chart = ref(null);
const parseDate = d3.timeParse(props.dateParse);
const formatDate = d3.timeFormat(props.dateFormat);

const margin = { top: 20, right: 40, bottom: 30, left: 40 };

const adjustedWidth = props.width - margin.left - margin.right;
const adjustedHeight = props.height - margin.top - margin.bottom;

const drawChart = () => {
  if (!chart.value) return;

  d3.select(chart.value).selectAll("*").remove();

  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("width", props.width)
    .attr("height", props.height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

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
    xScale = d3.scaleTime().domain(xDomain).range([0, adjustedWidth]);
  } else if (isNumber) {
    const xDomain = [
      d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.x)),
      d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.x)),
    ];
    xScale = d3.scaleLinear().domain(xDomain).range([0, adjustedWidth]);
  } else {
    xScale = d3
      .scalePoint()
      .domain(props.data[0].values.map((d) => d.x))
      .range([0, adjustedWidth]);
  }

  let yMin = d3.min(props.data, (d) => d3.min(d.values, (pt) => pt.y));
  let yMax = d3.max(props.data, (d) => d3.max(d.values, (pt) => pt.y));

  //
  // Y-axis
  //

  let yPadding = (yMax - yMin) * 0.25;
  yMin -= yPadding;
  yMax += yPadding;

  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([adjustedHeight, 0]);

  if (props.yAxis) {
    const yAxis = svg
      .append("g")
      .attr("class", "y axis translate-x-[-8px] text-[12px]")
      .call(d3.axisLeft(yScale).ticks(2).tickSize(0));

    yAxis.select(".domain").remove();
  }

  //
  // Gridlines
  //

  function make_y_gridlines() {
    return d3.axisLeft(yScale).ticks(2).tickSize(-adjustedWidth).tickFormat("");
  }

  if (props.gridlines) {
    const yAxis = svg
      .append("g")
      .call(make_y_gridlines().tickSize(-adjustedWidth).tickFormat(""))
      .attr("class", "text-slate-200 dark:text-slate-800");
    // Remove the domain line
    yAxis.select(".domain").remove();
  }

  //
  // Line operations
  //

  const line = d3
    .line()
    .x((d) => xScale(isDate ? parseDate(d.x) : d.x))
    .y((d) => yScale(d.y))
    .defined((d) => !isNaN(d.y)); // Handle missing data

  if (props.smooth) {
    line.curve(d3.curveMonotoneX);
  }

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
      .attr("stop-opacity", 0.3);

    gradient
      .append("stop")
      .attr("offset", "40%")
      .attr("stop-color", "rgb(255, 0, 106)")
      .attr("stop-opacity", 0.005);

    gradient
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#f1f5f900");

    gradient
      .append("stop")
      .attr("offset", "60%")
      .attr("stop-color", "rgb(0, 128, 0)")
      .attr("stop-opacity", 0.005);

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "rgb(0, 128, 0)")
      .attr("stop-opacity", 0.3);

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

    if (props.animations) {
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

  let xAxis;
  if (props.dateFormat) {
    xAxis = svg
      .append("g")
      .attr("class", "x axis text-[12px]")
      .attr("transform", `translate(0,${adjustedHeight})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeDay.every(90))
          .tickFormat((d) => formatDate(d))
      );
  } else {
    xAxis = svg
      .append("g")
      .attr("class", "axis text-[12px]")
      .attr("transform", `translate(0,${adjustedHeight})`)
      .call(d3.axisBottom(xScale));
  }

  xAxis
    .select(".domain")
    .style("stroke", "rgba(100, 100, 100, 1)")
    .style("stroke-width", "1px");

  xAxis
    .selectAll("line")
    .style("stroke", "rgba(100, 100, 100, 1)")
    .style("stroke-width", "1px");

  xAxis.selectAll("text").attr("transform", `translate(0,4)`);

  if (!props.xAxis) {
    svg.select(".x.axis").remove();
  }

  if (props.tooltip) {
    const hoverArea = svg
      .append("rect")
      .attr("width", adjustedWidth)
      .attr("height", adjustedHeight)
      .style("fill", "none")
      .style("pointer-events", "all");

    const hoverVerticalLineGroup = svg
      .append("g")
      .attr("width", adjustedWidth)
      .attr("height", adjustedHeight)
      .attr("class", "hover-vertical-line");

    const hoverCirclesGroup = svg
      .append("g")
      .attr("width", props.width)
      .attr("height", props.height)
      .attr("class", "hover-circles");

    let hoverCircle = hoverCirclesGroup
      .append("circle")
      .attr("r", 4)
      .attr("class", "fill-[#000000] dark:fill-[#ffffff]")
      .style("visibility", "hidden");

    let hoverText = hoverCirclesGroup
      .append("text")
      .attr("class", "fill-slate-500 text-[1em] gridlines")
      .attr("text-anchor", "left")
      .attr("alignment-baseline", "hanging")
      .style("visibility", "hidden");

    let hoverLine = hoverVerticalLineGroup
      .append("line")
      .attr("class", "stroke-slate-400 dark:stroke-slate-600")
      .attr("stroke-dasharray", "3,3")
      .style("visibility", "hidden");

    hoverArea.on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      let closestPt = null;

      if (isDate || isNumber) {
        // For continuous scales (dates or numbers)
        const x0 = xScale.invert(mx);
        const bisector = d3.bisector((d) =>
          isDate ? parseDate(d.x) : d.x
        ).left;
        props.data.forEach((series) => {
          const idx = bisector(series.values, x0, 1);
          const pt0 = series.values[idx - 1];
          const pt1 = series.values[idx];
          if (!pt0 || !pt1) return;
          closestPt =
            x0 - (isDate ? parseDate(pt0.x) : pt0.x) >
            (isDate ? parseDate(pt1.x) : pt1.x) - x0
              ? pt1
              : pt0;
        });
      } else {
        // For discrete scales (strings or categories)
        let closestDistance = Infinity;
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
      }

      hoverCirclesGroup.selectAll("*").remove();
      hoverVerticalLineGroup.selectAll("*").remove();

      if (closestPt) {
        const cx = xScale(isDate ? parseDate(closestPt.x) : closestPt.x);
        const cy = yScale(closestPt.y);

        hoverCircle
          .attr("cx", cx)
          .attr("cy", cy)
          .style("visibility", "visible");

        hoverText
          .attr("x", cx)
          .attr("y", cy)
          .text(d3.format(".2f")(closestPt.y))
          .attr("dx", "5px")
          .attr("dy", "5px")
          .style("visibility", "visible");

        hoverLine
          .attr("x1", cx)
          .attr("x2", cx)
          .attr("y1", 0)
          .attr("y2", adjustedHeight)
          .style("visibility", "visible");

        // Large circle
        // hoverCirclesGroup
        //   .append("circle")
        //   .attr("cx", cx)
        //   .attr("cy", cy)
        //   .attr("r", 20)
        //   .attr("fill", "rgba(61, 151, 255, 0.1)");

        // Small circle
        hoverCirclesGroup
          .append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", 4)
          .attr("class", "fill-[#000000] dark:fill-[#ffffff]");

        // Text/data
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
          .attr("y2", adjustedHeight)
          .attr("class", "stroke-slate-400 dark:stroke-slate-600")
          .attr("stroke-dasharray", "3,3");
      }
    });

    hoverArea.on("mouseleave", () => {
      hoverCircle.selectAll("*").remove();
      hoverText.selectAll("*").remove();
      hoverLine.selectAll("*").remove();
    });
    svg.on("mouseleave", () => {
      hoverCirclesGroup.selectAll("*").remove();
      hoverVerticalLineGroup.selectAll("*").remove();
    });
  }
};

onMounted(drawChart);

watchEffect(() => {
  drawChart();
});
</script>

<style scoped></style>

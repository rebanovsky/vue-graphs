<template>
  <div ref="resizeRef" class="line-container-transition mr-[40px]">
    <svg ref="svgRef" class="canvas">
      <defs>
        <linearGradient id="greenGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="rgba(52, 211, 153, 0)" />
          <stop offset="30%" stop-color="rgba(52, 211, 153, 0.01)" />
          <stop offset="70%" stop-color="rgba(52, 211, 153, 0.1)" />
          <stop offset="100%" stop-color="rgba(52, 211, 153, 0.24)" />
        </linearGradient>
        <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1 ">
          <stop offset="0%" stop-color="rgba(245, 158, 158, 0)" />
          <stop offset="70%" stop-color="rgba(245, 158, 158, 0.1)" />
          <stop offset="100%" stop-color="rgba(245, 158, 158, 0.2)" />
        </linearGradient>
      </defs>
      <g class="x-axis-line text-slate-700 dark:text-slate-400" />
      <g class="y-axis-line text-slate-700 dark:text-slate-400" />
      <g class="grid-lines" />
      <text class="y3 fill-slate-900 dark:fill-slate-300"></text>
      <text
        class="line-label fill-slate-500 text-[11px] font-medium dark:fill-slate-400"
      ></text>
    </svg>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import {
  select,
  line,
  scaleLinear,
  scaleTime,
  min,
  max,
  extent,
  axisLeft,
  timeParse,
  pointer,
  bisector,
  format,
  axisTop,
  area,
} from "d3";
import useResizeObserver from "@/composables/useResizeObserver";

export default {
  components: {},
  props: ["chartData", "ticker"],
  setup(props) {
    const svgRef = ref(null);
    const { resizeRef, resizeState } = useResizeObserver(); // create another ref to observe resizing, since observing SVGs doesn't work!

    let formatNumber = format(".2f");

    onMounted(() => {
      const svg = select(svgRef.value);

      watchEffect(() => {
        svg.selectAll("path").remove(); // clear the previous content of the SVG

        const { width, height } = resizeState.dimensions;

        const openingP = props.chartData[props.chartData.length - 1].c;
        // Get the last data point for the label position
        const closingP = props.chartData[props.chartData.length - 1].c;

        props.chartData.sort((a, b) => {
          return new Date(a.t) - new Date(b.t);
        });

        const xScale = scaleTime()
          .domain(
            extent(props.chartData, function (d) {
              return new Date(d.t);
            })
          )
          .range([0, width]);

        const yScale = scaleLinear()
          .domain([
            min(props.chartData, function (d) {
              return d.c;
            }) * 0.999,
            max(props.chartData, function (d) {
              return d.c;
            }) * 1.001,
          ])
          .range([height, 0]);

        // Y axis gridlines
        const yGrid = (g) =>
          g
            .selectAll("line")
            .data(yScale.ticks(1))
            .join("line")
            .attr("class", "stroke-slate-400 dark:stroke-slate-500")
            .style("stroke-dasharray", "3,2")
            .attr("stroke-width", 0.75)
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", (d) => yScale(d))
            .attr("y2", (d) => yScale(d));

        // Add the Y gridlines
        svg.select(".grid-lines").call(yGrid);

        const lineGen = line()
          // .curve(curveBasis)
          .x((d) => {
            return xScale(new Date(d.t));
          })
          .y((d) => {
            return yScale(d.c);
          });

        //Green gradient
        svg
          .append("linearGradient")
          .attr("id", "green-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .selectAll("stop")
          .data([
            { offset: "0%", color: "red" },
            { offset: "100%", color: "green" },
          ])
          .enter()
          .append("stop")
          .attr("offset", function (d) {
            return d.offset;
          })
          .attr("stop-color", function (d) {
            return d.color;
          });

        //Red gradient
        svg
          .append("linearGradient")
          .attr("id", "red-gradient")
          .attr("gradientUnits", "userSpaceOnUse")
          .selectAll("stop")
          .data([
            { offset: "0%", color: "green" },
            { offset: "100%", color: "red" },
          ])
          .enter()
          .append("stop")
          .attr("offset", function (d) {
            return d.offset;
          })
          .attr("stop-color", function (d) {
            return d.color;
          });

        let segments = [];
        let segmentStartIndex = 1;

        for (let i = 1; i < props.chartData.length; i++) {
          if (
            (props.chartData[i].c - props.chartData[segmentStartIndex].c) *
              (props.chartData[i - 1].c - props.chartData[segmentStartIndex].c) <
            0
          ) {
            let segmentEndIndex = i;
            // Extend the segment by one data point on both ends
            if (segmentStartIndex > 0) {
              segmentStartIndex--;
            }
            if (segmentEndIndex < props.chartData.length - 1) {
              segmentEndIndex++;
            }
            segments.push(props.chartData.slice(segmentStartIndex, segmentEndIndex));
            segmentStartIndex = i;
          }
        }
        segments.push(props.chartData.slice(segmentStartIndex));

        segments.forEach((segment) => {
          svg
            .append("path")
            .datum(segment)
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("d", lineGen)
            .attr(
              "class",
              segment[0].c < segment[segment.length - 1].c
                ? "stroke-green-50"
                : "stroke-red-50"
            )
            .style("opacity", 0) // start from completely transparent
            .transition()
            .duration(800) // duration of the transition in milliseconds
            .style("opacity", 1); // end at fully opaque
        });

        // Append a text element for the label
        const label = svg
          .select(".line-label")
          .join("text")
          .attr(
            "x",
            xScale(parseDate(props.chartData[props.chartData.length - 1].date)) + 5
          ) // Add a small margin to avoid overlapping with the line
          .attr("y", yScale(closingP))
          .attr("dy", ".4em") // Vertically center align the text
          .text(`$${formatNumber(closingP)}`); // Replace with the desired label text

        const xAxis = axisTop(xScale);

        svg
          .select(".x-axis-line")
          .attr("stroke-width", 0)
          .style("transform", `translateY(${height + 16}px)`)
          .call(xAxis.ticks(2).tickSize(0))
          .style("cursor", "default")
          .style("font-family", "poppins")
          .style("font-weight", "500")
          .select(".domain")
          .attr("class", "stroke-boxborder dark:stroke-slate-700")
          .raise();

        const yAxis = axisLeft(yScale);

        svg
          .select(".y-axis-line")
          .call(
            yAxis
              .tickFormat((d) => "$" + d)
              .ticks(1)
              .tickSize(0)
          )
          .style("cursor", "default")
          .style("font-family", "poppins")
          .style("font-weight", "400");

        const focus = svg.append("g").style("display", "none");
        // parse the float / date
        // const formatFloat = format("," + ".2f");

        const stats = svg.select(".y3");

        const bisectDate = bisector(function (d) {
          return new Date(d.t);
        }).left;

        // append the circle at the intersection
        focus
          .append("circle")
          .attr("class", "y fill-slate-900 dark:fill-slate-300")
          .attr("r", 3);

        focus
          .append("text")
          .attr("class", "y2 dark:fill-slate-300 fill-slate-900 cursor-default")
          .style("font-size", "12px")
          .style("font-weight", "400");

        function mousemove() {
          var x0 = xScale.invert(pointer(event, this)[0]),
            i = bisectDate(props.chartData, x0, 1),
            d0 = props.chartData[i - 1],
            d1 = props.chartData[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

          focus
            .select("circle.y")
            .attr(
              "transform",
              "translate(" +
                xScale(new Date(d.t)) +
                "," +
                yScale(d.c) +
                ")"
            );

          focus
            .select("text.y2")
            .style("text-anchor", "middle")
            .attr("x", xScale(new Date(d.t)))
            .attr("y", yScale(d.c) - 10)
            .text(`$` + formatNumber(d.c));

          focus
            .select(".x")
            .attr(
              "transform",
              "translate(" +
                xScale(new Date(d.t)) +
                "," +
                yScale(d.c) +
                ")"
            )
            .attr("y2", height - yScale(d.c));
        }

        // Append the rectangle to capture mouse
        svg
          .join("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("pointer-events", "all")
          .on("mouseover", function () {
            focus.style("display", null);
            stats.style("display", "none");
          })
          .on("mouseout", function () {
            focus.style("display", "none");
            stats.style("display", null);
          })
          .on("mousemove", mousemove);

        // Define area generators
        const areaAboveFirst = area()
          .x((d) => xScale(new Date(d.t)))
          .y0(yScale(openingP))
          .y1((d) => yScale(Math.max(openingP, d.c)));

        const areaBelowFirst = area()
          .x((d) => xScale(new Date(d.t)))
          .y0(yScale(openingP))
          .y1((d) => yScale(Math.min(openingP, d.c)));

        // Add the area paths
        svg
          .append("path")
          .datum(props.chartData)
          .attr("fill", "url(#greenGradient)")
          .attr("d", areaAboveFirst);

        svg
          .append("path")
          .datum(props.chartData)
          .attr("fill", "url(#redGradient)")
          .attr("d", areaBelowFirst);
      });
    });
    return { svgRef, resizeRef };
  },
};
</script>

<style>
.line-container-transition {
  margin: 0 0 0 12px;
  width: 200px;
  height: 40px;
}
</style>

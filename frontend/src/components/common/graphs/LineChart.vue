<template>
  <div
    ref="resizeRef"
    class="line-container mr-[40px]"
    :style="{ height: chartHeight, width: chartWidth }"
  >
    <svg ref="svgRef" class="canvas">
      <defs>
        <linearGradient id="gradientGreen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop
            offset="0%"
            style="stop-color: rgb(0, 128, 0); stop-opacity: 0.2"
          />
          <stop
            offset="100%"
            style="stop-color: rgb(0, 128, 0); stop-opacity: 0"
          />
        </linearGradient>
        <linearGradient id="gradientRed" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop
            offset="0%"
            style="stop-color: rgb(255, 0, 106); stop-opacity: 0.2"
          />
          <stop
            offset="100%"
            style="stop-color: rgb(255, 0, 106); stop-opacity: 0"
          />
        </linearGradient>
      </defs>
      <g class="x-axis-line text-slate-700 dark:text-slate-400" />
      <g class="y-axis-line text-slate-700 dark:text-slate-400" />
      <g class="grid-lines" />
      <text class="y3 fill-slate-900 dark:fill-slate-300"></text>
      <text
        class="line-label fill-slate-700 text-[10px] font-normal dark:fill-slate-400"
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
  curveBasis,
  min,
  max,
  extent,
  axisLeft,
  timeParse,
  pointer,
  bisector,
  format,
  axisBottom,
} from "d3";
import useResizeObserver from "@/composables/useResizeObserver";

export default {
  name: "LineChart",
  components: {},
  props: { 
    chartData: Array,
    ticker: String,
    chartHeight: String,
    chartWidth: {
      type: String,
      default: '180px'
    },
    isDot: {
      type: Boolean,
      default: false,
    },
    isXAxis: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const svgRef = ref(null);
    const { resizeRef, resizeState } = useResizeObserver();

    let parseDate = timeParse("%c");
    let formatNumber = format(".2f");

    onMounted(() => {
      const svg = select(svgRef.value);

      watchEffect(() => {
        const { width, height } = resizeState.dimensions;

        props.chartData.sort((a, b) => {
          return new Date(a.t) - new Date(b.t);
        });

        const xScale = scaleTime()
          .domain(
            extent(props.chartData, function (d) {
              return new Date(d.x);
            })
          )
          .range([0, width]);

        const yScale = scaleLinear()
          .domain([
            min(props.chartData, function (d) {
              return d.y;
            }),
            max(props.chartData, function (d) {
              return d.y;
            }),
          ])
          .range([height, 0]);

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

        svg.select(".grid-lines").call(yGrid);

        const lastDataPoint = props.chartData[props.chartData.length - 1];

        // const lineGen = line()
        //   .curve(curveBasis)
        //   .x((d) => {
        //     return xScale(new Date(d.x));
        //   })
        //   .y((d) => {
        //     return yScale(d.y);
        //   });

        // Assuming openingPrice is the opening price value.
        const openingPrice = props.chartData[0].c;
        const openingPriceY = yScale(openingPrice);

        // Create paths representing the areas above and below the opening price line
        let areaPathAbove =
          "M" + xScale(new Date(props.chartData[0].t)) + "," + openingPriceY;
        let areaPathBelow =
          "M" + xScale(new Date(props.chartData[0].t)) + "," + openingPriceY;

        props.chartData.forEach((d) => {
          const currentY = yScale(d.y);
          if (currentY <= openingPriceY) {
            areaPathAbove += " L" + xScale(new Date(d.x)) + "," + currentY;
          } else {
            areaPathBelow += " L" + xScale(new Date(d.x)) + "," + currentY;
          }
        });

        areaPathAbove +=
          " L" +
          xScale(new Date(props.chartData[props.chartData.length - 1].t)) +
          "," +
          openingPriceY;
        areaPathBelow +=
          " L" +
          xScale(new Date(props.chartData[props.chartData.length - 1].t)) +
          "," +
          openingPriceY;

        // Append the paths to the SVG and apply the gradients
        svg
          .append("path")
          .attr("d", areaPathAbove)
          .attr("fill", "url(#gradientGreen)");

        svg
          .append("path")
          .attr("d", areaPathBelow)
          .attr("fill", "url(#gradientRed)");

        // Loop over the data points and create line segments with appropriate stroke colors.
        props.chartData.forEach((d, i) => {
          if (i < props.chartData.length - 1) {
            const nextD = props.chartData[i + 1];
            const strokeColor = d.y > openingPrice ? "green" : "tomato";

            svg
              .append("line")
              .attr("x1", xScale(new Date(d.x)))
              .attr("y1", yScale(d.y))
              .attr("x2", xScale(new Date(nextD.x)))
              .attr("y2", yScale(nextD.y))
              .attr("stroke", strokeColor)
              .attr("stroke-width", 1);
          }
        });

        // svg
        //   .append("path")
        //   .datum(props.chartData)
        //   .attr("fill", "none")
        //   .attr("stroke-width", 1)
        //   .attr("d", lineGen)
        //   .attr("class", "stroke-blue-50");

        const label = svg
          .select(".line-label")
          .join("text")
          .attr("x", xScale(new Date(lastDataPoint.t)) + 5)
          .attr("y", yScale(lastDataPoint.c))
          .attr("dy", ".4em")
          .text(`${formatNumber(lastDataPoint.c)}`);

        const xAxis = axisBottom(xScale);

        svg
          .select(".x-axis-line")
          .attr("stroke-width", props.isXAxis ? 1 : 0)
          .style("transform", `translateY(${height - 0}px)`)
          .call(xAxis.ticks(2).tickSize(0))
          .style("cursor", "default")
          .style("font-family", "poppins")
          .style("font-weight", "500")
          .select(".domain")
          .attr("class", "stroke-slate-300 dark:stroke-slate-700")
          .raise();

        svg
          .select(".x-axis-line")
          .select(".tick")
          .select("text")
          .attr("class", "translate-y-[3px]");

        const yAxis = axisLeft(yScale);

        svg
          .select(".y-axis-line")
          .call(
            yAxis
              .tickFormat((d) => format("~s")(d).replace("G", "B"))
              .ticks(1)
              .tickSize(0)
          )
          .style("cursor", "default")
          .style("font-family", "poppins")
          .style("font-weight", "400");

        const focus = svg.append("g").style("display", "none");

        const stats = svg.select(".y3");

        const bisectDate = bisector(function (d) {
          return new Date(d.x);
        }).left;

        focus
          .append("circle")
          .attr("class", "y fill-slate-900 dark:fill-slate-300")
          .attr("r", 3);

        focus
          .append("text")
          .attr("class", "y2 dark:fill-slate-300 fill-slate-800")
          .style("font-size", "12px")
          .style("font-weight", "400");

        focus
          .append("line")
          .attr("class", "focus-line stroke-slate-500")
          .attr("stroke-width", 1)
          .attr("y1", 0)
          .attr("y2", height)
          .lower();

        function mousemove() {
          var x0 = xScale.invert(pointer(event, this)[0]),
            i = bisectDate(props.chartData, x0, 1),
            d0 = props.chartData[i - 1],
            d1 = props.chartData[i],
            d = x0 - d0.t > d1.t - x0 ? d1 : d0;

          focus
            .select("circle.y")
            .attr(
              "transform",
              "translate(" + xScale(new Date(d.x)) + "," + yScale(d.y) + ")"
            );

          focus
            .select("text.y2")
            .attr("x", xScale(new Date(d.x)) + 4)
            .attr("y", 10)
            .text(formatNumber(d.y))
            .raise();

          focus
            .select(".x")
            .attr(
              "transform",
              "translate(" - xScale(new Date(d.x)) + "," + yScale(d.y) + ")"
            )
            .attr("y2", height - yScale(d.y));

          focus
            .select(".focus-line")
            .attr("transform", `translate(${xScale(new Date(d.x))}, 0)`)
            .style("stroke-dasharray", "3,2");
        }

        if (props.isDot) {
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
        }
      });
    });
    return { svgRef, resizeRef };
  },
};
</script>

<style scoped>
.line-container {
  margin: 0 0 0 28px;

}

.y-axis-line > g.tick > text {
  transform: translateX(-4px);
  font-size: 10px;
}

.y-axis-line > g.tick > line {
  transform: translateX(-4px);
  font-size: 10px;
}

.x-axis-line > g.tick > text {
  font-size: 10px;
  font-weight: 400;
}
</style>

<template>
  <div class="graph-wrapper flex flex-col">
    <div
      class="graph-title w-[100%] px-[12px] gridlines py-[6px] text-[12px] font-medium dark:text-slate-400 text-slate-600"
    >
      {{ title }}
    </div>
    <div
      class="graph-legend w-[100%] px-[10px] h-[16px] text-[10px] font-medium dark:text-slate-400 text-slate-600"
    >
      <div class="colors flex gap-[16px]">
        <div class="color1 flex gap-[6px] items-center">
          <div class="border-[1px] w-[6px] h-[6px] rounded-[2px] border-[#77cfff] bg-[#77cfff]"></div>
          <div class="h-[16px] text-slate-500">Revenue</div>
        </div>
        <div class="color1 flex gap-[6px] items-center">
          <div class="c border-[1px] w-[6px] h-[6px] rounded-[2px] border-[#5179ff] bg-[#5179ff]"></div>
          <div class="h-[16px] text-slate-500">Net income</div>
        </div>
      </div>
    </div>
    <div ref="barChart" class="rounded-[8px]"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import { ref, onMounted, watchEffect } from "vue";

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
    },
  },
  setup(props) {
    const barChart = ref(null);

    function formatHelper(value, divisor, suffix) {
      let number = (value / divisor).toFixed(1);
      if (number.endsWith(".0")) {
        number = number.substring(0, number.length - 2);
      }
      return number + suffix;
    }

    function formatNumber(d) {
      if (d >= 1e9) {
        return formatHelper(d, 1e9, "B");
      }
      if (d >= 1e6) {
        return formatHelper(d, 1e6, "M");
      }
      if (d >= 1e3) {
        return formatHelper(d, 1e3, "K");
      }
      return d.toString();
    }

    function roundedRect(x, y, width, height, radius) {
      return `M${x + radius},${y}
          h${width - 2 * radius}
          a${radius},${radius} 0 0 1 ${radius},${radius}
          v${height - radius}
          h${-width}
          v${-height + radius}
          a${radius},${radius} 0 0 1 ${radius},${-radius}
          z`;
    }

    const drawBarChart = () => {
      d3.select(barChart.value).selectAll("*").remove();

      const margin = { top: 10, right: 20, bottom: 30, left: 40 };
      const width = props.width - margin.left - margin.right;
      const height = props.height - margin.top - margin.bottom;

      const svg = d3
        .select(barChart.value)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Subgroups: TotalRevenue and NetIncome
      const subgroups = ["TotalRevenue", "NetIncome"];

      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(props.data.map((d) => d.Quarter))
        .padding(0.25);

      // Add Y axis with padding at the top
      const maxVal = d3.max(props.data, (d) =>
        Math.max(d.Earnings.TotalRevenue, d.Earnings.NetIncome)
      );
      const yPaddingTop = maxVal * 0.2;
      const y = d3
        .scaleLinear()
        .domain([0, maxVal + yPaddingTop])
        .range([height, 0]);

      svg
        .append("g")
        .call(d3.axisLeft(y).tickFormat(formatNumber).tickSize(0).ticks(3))
        .call((g) => g.select(".domain").remove()) // Remove the y-axis line
        .selectAll(".tick text")
        .attr("dx", "-0.5em")
        .attr("fill", "#666");

      // Add horizontal gridlines
      svg
        .selectAll(".grid")
        .data(y.ticks(3).filter((tick) => tick !== 0))
        .enter()
        .append("line")
        .attr("class", "grid")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("class", "stroke-slate-400 dark:stroke-slate-700")
        .attr("stroke-dasharray", "3,3");

      // Add a scale for the subgroups
      const xSubgroup = d3
        .scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding(0.2);

      // Add bars
      svg
        .append("g")
        .selectAll("g")
        .data(props.data)
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${x(d.Quarter)}, 0)`)
        .selectAll("path")
        .data((d) => subgroups.map((key) => ({ key, value: d.Earnings[key] })))
        .enter()
        .append("path")
        .attr("d", (d) =>
          roundedRect(
            xSubgroup(d.key),
            y(d.value),
            xSubgroup.bandwidth(),
            height - y(d.value),
            1
          )
        )
        .attr("class", (d) =>
          d.key === "TotalRevenue" ? "fill-[#77cfff]" : "fill-[#5179ff]"
        );

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .call((g) =>
          g
            .selectAll(".domain")
            .attr("class", "stroke-slate-400 dark:stroke-slate-500")
        )
        .selectAll(".tick text")
        .attr("dy", "1.25em")
        .attr("fill", "#666");
    };

    watchEffect(() => {
      if (props.data && props.data.length) {
        drawBarChart();
      }
    });

    onMounted(() => {
      if (props.data && props.data.length) {
        drawBarChart();
      }
    });

    return { barChart };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>

<template>
  <div ref="chart" class="chart-border"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const props = defineProps({
  data: Array,
  width: String,
  height: String,
});

const chart = ref(null);

onMounted(() => {
  if (props.data && props.data.length) {
    drawChart();
  }
});

function roundedRect(x, y, width, height, radius) {
  return `  
            M${x + radius},${y}
            h${width - 2 * radius}
            a${radius},${radius} 0 0 1 ${radius},${radius}
            v${height - radius}
            h${-width}
            v${-height + radius}
            a${radius},${radius} 0 0 1 ${radius},${-radius}
            z
          `;
}

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

const customColors = [
  "#00CCFF",
  "#FF0088", // Indigo
];

//ANIMATION DURATION AND DELAY CONSTANTS
const barAnimationDuration = 800;
const textAnimationDuration = 200;
const textAnimationDelay = barAnimationDuration;

const drawChart = () => {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = props.width - margin.left - margin.right;
  const height = props.height - margin.top - margin.bottom;

  function handleMouseover(event, d) {
    const group = d;
    console.log('event: ', event)
    console.log("Mouseover on group:", group); // Debugging statement
    svg.selectAll(`[data-group='${group}']`).style("opacity", 1);
  }

  function handleMouseout(event, d) {
    const group = d.x;
    console.log("Mouseout on group:", group); // Debugging statement
    svg.selectAll(`[data-group='${group}']`).style("opacity", 0);
  }

  // Create SVG
  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Process data
  const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.3);

  const x1 = d3.scaleBand().padding(0.1);

  const y = d3.scaleLinear().rangeRound([height, 0]);

  const xAxis = d3.axisBottom(x0).tickSize(0);
  const yAxis = d3.axisLeft(y).ticks(3, "s").tickSize(0);

  const entities = props.data.map((d) => d.entity);
  const groups = props.data[0].data.map((d) => d.x);

  x0.domain(groups);
  x1.domain(entities).rangeRound([0, x0.bandwidth()]);

  // Calculate the max value from the data and add some padding
  const maxValue = d3.max(props.data, (d) => d3.max(d.data, (dd) => dd.y));
  const paddedMaxValue = maxValue * 1.2;
  y.domain([0, paddedMaxValue]);

  const entityIndex = (d) => entities.indexOf(d.entity);

  svg
    .append("g")
    .selectAll("g")
    .data(groups)
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${x0(d)},0)`)
    .selectAll("path")
    .data((d) =>
      props.data.map((entity) => {
        const dataPoint = entity.data.find((dd) => dd.x === d);
        return {
          entity: entity.entity,
          value: dataPoint ? dataPoint.y : 0,
        };
      })
    )
    .enter()
    .append("path")
    .attr("d", (d) => roundedRect(x1(d.entity), height, x1.bandwidth(), 0, 2))
    .attr("fill", (d) => customColors[entityIndex(d) % customColors.length])
    .transition()
    .duration(barAnimationDuration)
    .attr("d", (d) =>
      roundedRect(
        x1(d.entity),
        y(d.value),
        x1.bandwidth(),
        height - y(d.value),
        2
      )
    );

  // Add text labels
  svg
    .selectAll("g")
    .selectAll("text")
    .data((d) =>
      props.data.map((entity) => {
        const dataPoint = entity.data.find((dd) => dd.x === d);
        return {
          entity: entity.entity,
          value: dataPoint ? dataPoint.y : "", // Same check here
        };
      })
    )
    .enter()
    .append("text")
    .text((d) => formatNumber(d.value))
    .attr("x", (d) => x1(d.entity) + x1.bandwidth() / 2)
    .attr("y", (d) => y(d.value) - 5) // position slightly above the bar
    .attr("text-anchor", "middle")
    .attr("fill", "#666")
    .attr("class", "text-xs")
    .style("opacity", 0); // Start with opacity 0
  // .transition()
  // .delay(textAnimationDelay) // Delay to wait for bar animation
  // .duration(textAnimationDuration) // Duration of text animation
  // .style("opacity", 1); // Animate to opacity 1;

  // Append Axes
  svg
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .call((g) =>
      g
        .selectAll(".domain")
        .attr("class", "stroke-slate-400 dark:stroke-slate-500")
    )
    .selectAll(".tick text")
    .attr("dy", "1.25em")
    .attr("fill", "#666");

  svg
    .append("g")
    .attr("class", "axis axis--y")
    .call(yAxis)
    .call((g) => g.select(".domain").remove())
    .selectAll(".tick text")
    .attr("dx", "-0.5em")
    .attr("fill", "#666");

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
    .attr("class", "stroke-slate-300 dark:stroke-slate-700")
    .attr("stroke-dasharray", "3,3")
    .lower();

  // Applying handlers to bars
  svg
    .selectAll("path")
    .on("mouseover", handleMouseover)
    .on("mouseout", handleMouseout);

  // Applying handlers to text labels
  svg
    .selectAll("text")
    .on("mouseover", handleMouseover)
    .on("mouseout", handleMouseout);
};
</script>

<style></style>

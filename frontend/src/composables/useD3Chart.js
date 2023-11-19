// useD3Chart.js
import { onMounted, ref } from "vue";
import * as d3 from "d3";

export default function useD3Chart() {
  const chartElement = ref(null);

  const createBarChart = (data) => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(chartElement.value)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map((d, i) => i));
    y.domain([0, d3.max(data, (d) => d)]);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => x(i))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d))
      .attr("height", (d) => height - y(d));
  };

  onMounted(() => {
    if (chartElement.value) {
      createBarChart([10, 20, 30, 40, 50]); // placeholder data for now
    }
  });

  return {
    chartElement,
    createBarChart, // export the function so it can be used elsewhere
  };
}

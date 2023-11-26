<template>
  <div id="treemap"></div>
  <div
    id="tooltip"
    class="absolute opacity-0 bg-slate-100 border-[1px] border-slate-300 p-[6px] rounded cursor-pointer"
    style="pointer-events: none"
  ></div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as d3 from "d3";

export default {
  name: "Treemap",
  props: {
    inputData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const data = ref(props.inputData);

    onMounted(() => {
      const width = 400;
      const height = 180;

      const svg = d3
        .select("#treemap")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      const root = d3.hierarchy(data.value).sum((d) => d.value);
      d3.treemap().size([width, height]).padding(2)(root);

      // Create a color scale for root children
      const colors = ["#57E2E5", "#FEC3A6", "#FFAC81", "#FF928B"]; // Change these colors to your preference
      const colorScale = d3
        .scaleOrdinal()
        .domain(root.children.map((d, i) => i)) // Assigning each root child an index
        .range(colors);

      const tooltip = d3.select("#tooltip"); // Select the tooltip

      svg
        .selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .attr("height", (d) => d.y1 - d.y0)
        .style("fill", (d) => colorScale(d.parent.data.name)) // Use parent's name as the color domain
        .on("mouseover", (event, d) => {
          // Display the tooltip on mouseover
          tooltip.style("opacity", 1).html(d.data.value); // Display the value
        })
        .on("mousemove", (event) => {
          // Update tooltip position on mouse move
          tooltip
            .style("left", event.pageX + "px")
            .style(
              "top",
              event.pageY - 10 - tooltip.node().offsetHeight + "px"
            ); // Positioned right above the cursor
        })
        .on("mouseout", () => {
          // Hide the tooltip on mouseout
          tooltip.style("opacity", 0);
        });

      svg
        .selectAll("text")
        .data(root.leaves())
        .enter()
        .append("text")
        .attr("x", (d) => d.x0 + 5)
        .attr("y", (d) => d.y0 + 20)
        .text((d) => d.data.name);
    });

    return {};
  },
};
</script>

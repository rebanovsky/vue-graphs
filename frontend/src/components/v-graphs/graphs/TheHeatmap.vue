<template>
  <div class="county-name h-[40px]">{{ hoveredCountryName }}</div>
  <div
    ref="mapContainer"
    class="chart-border flex items-center justify-center"
  ></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import * as d3 from "d3";

export default {
  name: "TheHeatmap",
  props: {
    geoJsonData: Object,
  },
  setup(props) {
    const mapContainer = ref(null);
    const hoveredCountryName = ref("");

    const drawMap = () => {
      const width = 600;
      const height = 400;
      const projection = d3
        .geoAlbersUsa()
        .fitSize([width, height], props.geoJsonData);
      const path = d3.geoPath().projection(projection);

      // Define a color scale for the heatmap
      const colorScale = d3.scaleQuantize([1, 10], d3.schemeBlues[9]);


      // Clear previous SVG if any
      d3.select(mapContainer.value).selectAll("*").remove();

      const svg = d3
        .select(mapContainer.value)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      svg
        .selectAll("path")
        .data(props.geoJsonData.features)
        .enter()
        .append("path")
        .attr("d", path)
        // Apply the color scale based on the value
        .attr("fill", d => colorScale(d.properties.value))
        .attr("class", "stroke-slate-500 cursor-pointer")
        .style("stroke-dasharray", "1,1")
        .on("mouseover", function (event, d) {
          // Optional: Change style on hover
          d3.select(this).style("fill-opacity", 0.8);
          hoveredCountryName.value = d.properties.name;
        })
        .on("mouseout", function () {
          d3.select(this).style("fill-opacity", 1);
          hoveredCountryName.value = "";
        });
    };

    watch(() => props.geoJsonData, drawMap, { immediate: true });
    onMounted(drawMap);

    return { mapContainer, hoveredCountryName };
  },
};
</script>


<style scoped>
/* Add your styles here if needed */
</style>

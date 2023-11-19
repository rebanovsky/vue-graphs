<template>
  <div class="county-name h-[40px]">{{ hoveredCountryName }}</div>
  <div ref="mapContainer" class="border-[1px] flex items-center justify-center boder-slate-300"></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import * as d3 from "d3";

export default {
  name: "CountryMap",
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
        .geoMercator()
        .fitSize([width, height], props.geoJsonData);
      const path = d3.geoPath().projection(projection);

      // Clear previous SVG if any
      d3.select(mapContainer.value).selectAll("*").remove();

      const svg = d3
        .select(mapContainer.value)
        .append("svg")
        .attr('class', 'border-[1px]')
        .attr("width", width)
        .attr("height", height);

      svg
        .selectAll("path")
        .data(props.geoJsonData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "transparent")
        .attr("class", "stroke-slate-500 cursor-pointer")
        .style("stroke-dasharray", "1,1")
        .on("mouseover", function (event, d) {
          d3.select(this).attr("fill", "#efefef");
          hoveredCountryName.value = d.properties.name;
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "transparent");
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

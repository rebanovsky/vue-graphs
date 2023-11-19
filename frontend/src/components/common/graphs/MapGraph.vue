<template>
  <div
    ref="resizeRef"
    class="w-[500px] h-[300px] mr-[40px]"

  >
  <div class="region-info h-[24px]"></div>
    <svg ref="svgRef" class="canvas"></svg>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import {
  select,
  geoAlbersUsa,
  geoPath,
  // area,
} from "d3";
import useResizeObserver from "@/composables/useResizeObserver";
import { events } from "@/data/mapMappings"

export default {
  name: "LineChart",
  components: {},
  props: {
    chartData: Array,
    region: String,
    chartHeight: String,
  },
  setup(props) {
    const svgRef = ref(null);
    const { resizeRef, resizeState } = useResizeObserver();
    console.log("chartData: ", props.chartData);
    onMounted(() => {
      const svg = select(svgRef.value);

      watchEffect(() => {
        const { width, height } = resizeState.dimensions;

        // Aesthetics
        let stateColor = "rgba(170,170,170,255)";

        let dims = events.find(country => country.region === props.region);

        let projection = geoAlbersUsa().scale(dims.scale).translate([dims.translateX, dims.translateY]);

        let geoGenerator = geoPath().projection(projection);

        function handleMouseover(e, d) {
          select(".region-info").text(d.properties.name).style("opacity", 1);
          select(e.currentTarget).style("opacity", 1).style("fill", "black");
        }

        function handleMouseout(e, d) {
          select(e.currentTarget).style("fill", stateColor);
          select("#content .info").text(d.properties.name).style("opacity", 0);
        }

        function update() {
          let u = svg.selectAll("path").data(props.chartData.features);

          // Update existing paths
          u.attr("d", geoGenerator);

          // Handle new paths
          u.enter()
            .append("path")
            .attr("d", geoGenerator)
            .attr("fill", stateColor)
            .on("mouseover", handleMouseover)
            .on("mouseout", handleMouseout);

          // Remove old paths
          u.exit().remove();
        }

        update();
      });
    });

    return { svgRef, resizeRef };
  },
};
</script>

<style scoped>
.line-container {
  margin: 8px 0 0 28px;
  width: 500px;
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

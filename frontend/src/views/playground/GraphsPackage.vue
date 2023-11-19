<template>
  <div
    class="playground-component w-[100%] flex justify-between rounded-[14px]"
    style="height: calc(100vh - 122px)"
  >
    <div class="main-content w-full overflow-y-auto flex gap-[8px]">
      <div class="sidenav overflow-y-auto gridlines rounded-[8px]">
        <ScrollableMenu
          :title="title"
          :items="sidenavItems"
          :base-path="basePath"
        />
      </div>
      <TheContent
        :sidenavItems="sidenavItems"
      />
    </div>
  </div>
</template>

<script setup>
import ScrollableMenu from "@/components/common/navigation/ScrollableMenu.vue";
import { ref } from "vue";
import TheContent from "@/components/v-graphs/TheContent.vue";

const basePath = "/playground/graph-items";
const title = ref("Vue Graphs");

const sidenavItems = ref([
  { title: "Line Chart", name: "line-chart" },
  { title: "Bar Chart", name: "bar-chart" },
  { title: "Pie Chart", name: "pie-chart" },
  { title: "Scatter Plot", name: "scatter-plot" },
  { title: "Area Chart", name: "area-chart" },
  { title: "Histogram", name: "histogram" },
  { title: "Box Plot", name: "box-plot" },
  { title: "Heat Map", name: "heat-map" },
  { title: "Radar Chart", name: "radar-chart" },
  { title: "Bubble Chart", name: "bubble-chart" },
  { title: "Treemap", name: "treemap" },
  { title: "Waterfall Chart", name: "waterfall-chart" },
  { title: "Gantt Chart", name: "gantt-chart" },
  { title: "Funnel Chart", name: "funnel-chart" },
  { title: "Doughnut Chart", name: "doughnut-chart" },
  { title: "Polar Area Chart", name: "polar-area-chart" },
]);
</script>

<style lang="scss" scoped></style>

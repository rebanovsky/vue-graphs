<template>
  <div
    class="playground-component flex justify-center w-[100vw] rounded-[14px]"
    style="height: calc(100vh - 50px)"
  >
    <div class="main-content flex justify-center gap-[8px] h-[100%]">
      <!-- Flex Container -->
      <!-- <div class="flex-container absolute flex mt-[120px] justify-center w-[auto]">
        <div class="sidenav overflow-y-auto rounded-[8px] translate-x-[-780px] z-[9999999] bg-slate-100 shadow-boxshlight dark:shadow-darkboxshlight border-slate-200 dark:border-slate-800 border-[1px]  dark:bg-slate-900">
          <ScrollableMenu
            :title="title"
            :items="sidenavItems"
            :base-path="basePath"
            :current-section="currentSection"
          />
        </div>
      </div> -->

      <TheContent :sidenavItems="sidenavItems" />
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
  { title: "Heat Map", name: "heat-map" },
  { title: "Line Chart", name: "line-chart" },
  { title: "Bar Chart", name: "bar-chart" },
  { title: "Pie Chart", name: "pie-chart" },
  { title: "Dot Plot", name: "dot-plot" },
  { title: "Bubble Chart", name: "bubble-chart" },
  { title: "Treemap", name: "treemap" },
  // { title: "Scatter Plot", name: "scatter-plot" },
  // { title: "Area Chart", name: "area-chart" },
  // { title: "Box Plot", name: "box-plot" },
  // { title: "Radar Chart", name: "radar-chart" },
  // { title: "Waterfall Chart", name: "waterfall-chart" },
  // { title: "Gantt Chart", name: "gantt-chart" },
  // { title: "Funnel Chart", name: "funnel-chart" },
  // { title: "Polar Area Chart", name: "polar-area-chart" },
]);
</script>

<style lang="scss" scoped></style>

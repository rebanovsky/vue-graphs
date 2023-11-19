<template>
  <div
    class="gridlines rounded-[8px] flex-1 items-center w-[100%] overflow-y-auto py-[10px]"
  >
    <div
      v-for="item in sidenavItems"
      :key="item.name"
      :id="item.name"
      class="min-h-[360px] p-[20px] my-[20px] dark:shadow mx-[20px] rounded-[8px] flex justify-between"
    >
      <div
        class="graph-wrapper h-[100%] p-[20px] gridlines rounded-[8px] w-[100%] flex gap-[12px] flex-col flex-1"
      >
        <h2>{{ item.title }}</h2>
        <div class="graph-content h-[100%]">
          <div
            class="item-content w-[400px] flex gap-[20px] flex-1 flex-col justify-center"
          >
            <div
              class="flex flex-col gap-[80px]"
              v-if="selectGraph(item.name) === 'line'"
            >
              <LineCharts />
            </div>
            <div
              class="flex flex-col gap-[80px]"
              v-if="selectGraph(item.name) === 'bar-chart'"
            >
              <BarCharts />
            </div>
            <div
              class="flex flex-col gap-[80px]"
              v-if="selectGraph(item.name) === 'pie-chart'"
            >
              <PieCharts />
            </div>
            <div
              class="flex flex-col gap-[80px]"
              v-if="selectGraph(item.name) === 'dot-plot'"
            >
              <DotGraphs />
            </div>
            <div
              class="flex flex-col gap-[80px]"
              v-if="selectGraph(item.name) === 'bubble-chart'"
            >
              <BubbleCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import LineCharts from "@/components/v-graphs/sections/LineCharts.vue";
import BarCharts from "@/components/v-graphs/sections/BarCharts.vue";
import PieCharts from "@/components/v-graphs/sections/PieCharts.vue";
import DotGraphs from "@/components/v-graphs/sections/DotGraphs.vue";
import BubbleCharts from "@/components/v-graphs/sections/BubbleCharts.vue";

const props = defineProps({
  sidenavItems: Array,
});

const selectGraph = (itemName) => {
  switch (itemName) {
    case "line-chart":
      return "line";
    case "bar-chart":
      return "bar-chart";
    case "pie-chart":
      return "pie-chart";
    case "dot-plot":
      return "dot-plot";
    case "bubble-chart":
      return "bubble-chart";
    case "treemap":
      return "treemap";
    default:
      return null;
  }
};

// TREEMAP DATA
const treeData = ref({
  name: "root",
  children: [
    {
      name: "A",
      children: [
        { name: "A1", value: 5 },
        { name: "A2", value: 3 },
        { name: "A3", value: 2 },
      ],
    },
    {
      name: "B",
      children: [
        { name: "B1", value: 7 },
        { name: "B2", value: 5 },
        { name: "B3", value: 8 },
      ],
    },
    {
      name: "C",
      children: [
        { name: "C1", value: 6 },
        { name: "C2", value: 4 },
        { name: "C3", value: 5 },
      ],
    },
    {
      name: "D",
      children: [
        { name: "D1", value: 9 },
        { name: "D2", value: 6 },
        { name: "D3", value: 5 },
      ],
    },
  ],
});
</script>

<style>
.custom-select select.select-multiple {
  width: 100%; /* Adjust width as needed */
  height: auto; /* Adjust height as needed */
  border: 1px solid #ccc; /* Border styling */
  background-color: white; /* Background color */
  cursor: pointer;
}

.custom-select option {
  padding: 5px 10px; /* Padding for options */
}
</style>

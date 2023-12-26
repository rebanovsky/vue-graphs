<template>
  <div class="flex flex-col">
    <TheNavigation />
    <div class="main-content mt-[50px] flex w-[100%] relative">
      <div
        class="sidenav overflow-y-auto flex flex-1 border-r-[1px] border-200 fixed top-[50px] left-[0px] transition ease"
      >
        <SideMenu :items="sidenavItems" base-path="" />
      </div>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>

<script setup>
import SideMenu from "@/components/navigation/SideMenu.vue";
import TheNavigation from "@/components/navigation/TheNavigation.vue";

const sidenavItems = [
  {
    title: "",
    name: "",
    items: [{ name: "", title: "Home" }],
  },
  {
    title: "Line Charts",
    name: "line",
    items: [
      { name: "linechart", title: "Line chart" },
      // { name: "multiline", title: "Multi line" },
      { name: "candlestick", title: "Candlestick" },
    ],
  },
  {
    title: "Bar Charts",
    name: "bar",
    items: [{ name: "barchart", title: "Bar chart" }],
  },
  {
    title: "Pie Charts",
    name: "pie",
    items: [
      { name: "piechart", title: "Pie chart" },
      { name: "doughnut", title: "Doughnut chart" },
    ],
  },
  {
    title: "Dot Plots",
    name: "dot",
    items: [{ name: "dotplot", title: "Dot chart" }],
  },
  {
    title: "Bubble Charts",
    name: "bubble",
    items: [{ name: "bubblechart", title: "Bubble chart" }],
  },
  {
    title: "Heat Maps",
    name: "map",
    items: [{ name: "heatmap", title: "Heatmap" }],
  },
  {
    title: "Treemaps",
    name: "tree",
    items: [{ name: "treemap", title: "treemap" }],
  },
];
</script>

<style></style>

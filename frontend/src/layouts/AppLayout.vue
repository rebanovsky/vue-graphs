<template>
  <div class="flex flex-col">
    <TheNavigation />
    <div class="main-content mt-[50px] flex w-[100%] relative">
      <div
        class="sidenav overflow-y-auto flex flex-1 border-r-[1px] border-200 fixed top-[50px] left-[0px] transition ease"
      >
        <SideMenu :items="sidenavItems" />
      </div>
      <router-view v-slot="{ Component }">
        <div class="ml-[220px] flex justify-center w-[100%]">
          <component :is="Component" />
        </div>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import SideMenu from "@/components/navigation/SideMenu.vue";
import TheNavigation from "@/components/navigation/TheNavigation.vue";

const sidenavItems = [
  { title: "Home", name: "home" },
  { title: "Line Chart", name: "linechart" },
  { title: "Candlestick", name: "candlestick" },
  { title: "Bar Chart", name: "barchart" },
  { title: "Pie Chart", name: "piechart" },
  { title: "Dot Plot", name: "dotplot" },
  { title: "Bubble Chart", name: "bubblechart" },
  { title: "Heat Map", name: "heatmap" },
  { title: "Tree Map", name: "treemap" },
];
</script>

<style></style>

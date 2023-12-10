<template>
  <SubView title="" :sidenav-items="sidenavItems" base-path="" />
</template>

<script setup>
import SubView from "@/layouts/SubView.vue";

const sidenavItems = [
  { title: "Home", name: "" },
  {
    title: "Line Charts",
    name: "line",
    submenu: [
      { name: "linechart", title: "linechart" },
      { name: "multiline", title: "multiline" },
      { name: "candlestick", title: "candlestick" },
    ],
  },
  { title: "Bar Charts", name: "bar" },
  { title: "Pie Charts", name: "pie" },
  { title: "Dot Plots", name: "dot" },
  { title: "Bubble Charts", name: "bubble" },
  { title: "Heat Maps", name: "heatmap" },
  { title: "Treemaps", name: "tree" },
];
</script>

<style lang="scss" scoped></style>

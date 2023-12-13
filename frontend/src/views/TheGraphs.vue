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
    items: [
      { name: "linechart", title: "linechart" },
      { name: "multiline", title: "multiline" },
      { name: "candlestick", title: "candlestick" },
    ],
  },
  {
    title: "Bar Charts",
    name: "bar",
    items: [
      { name: "barchart", title: "barchart" },
      { name: "verbar", title: "verbar" },
    ],
  },
  {
    title: "Pie Charts",
    name: "pie",
    items: [
      { name: "piechart", title: "piechart" },
      { name: "doughnut", title: "doughnut" },
    ],
  },
  {
    title: "Dot Plots",
    name: "dot",
    items: [{ name: "dotplot", title: "dotplot" }],
  },
  {
    title: "Bubble Charts",
    name: "bubble",
    items: [{ name: "bubblechart", title: "bubblechart" }],
  },
  {
    title: "Heat Maps",
    name: "map",
    items: [{ name: "heatmap", title: "heatmap" }],
  },
  {
    title: "Treemaps",
    name: "tree",
    items: [{ name: "treemap", title: "treemap" }],
  },
];
</script>

<style lang="scss" scoped></style>

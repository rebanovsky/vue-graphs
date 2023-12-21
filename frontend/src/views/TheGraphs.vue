<template>
  <SubView title="" :sidenav-items="sidenavItems" base-path="" />
</template>

<script setup>
import SubView from "@/layouts/SubView.vue";

const sidenavItems = [
  {
    title: "",
    name: "",
    items: [
      { name: "", title: "Home" },
    ],
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
    items: [
      { name: "barchart", title: "Bar chart" },
    ],
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

<style lang="scss" scoped></style>

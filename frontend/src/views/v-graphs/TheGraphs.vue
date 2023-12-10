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
      { name: "barchart", title: "linechart" },
      { name: "verbar", title: "verbar" },
    ],
  },
  {
    title: "Pie Charts",
    name: "pie",
    items: [
      { name: "piechart", title: "piechart" },
      { name: "doughnut chart", title: "doughnut" },
    ],
  },
  {
    title: "Dot Plots",
    name: "dot",
    items: [{ name: "dotplots", title: "dotplots" }],
  },
  {
    title: "Bubble Charts",
    name: "bubble",
    items: [{ name: "bubble chart", title: "bubble chart" }],
  },
  {
    title: "Heat Maps",
    name: "heatmap",
    items: [{ name: "heatmaps", title: "heatmaps" }],
  },
  {
    title: "Treemaps",
    name: "tree",
    items: [{ name: "treemap", title: "treemap" }],
  },
];
</script>

<style lang="scss" scoped></style>

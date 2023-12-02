<template>
  <SubView title="" :sidenav-items="sidenavItems" base-path="/graphs" />
</template>

<script setup>
import SubView from "@/layouts/SubView.vue";

const sidenavItems = [
  { title: "Home", name: "home" },
  { title: "Line Charts", name: "line" },
  { title: "Bar Charts", name: "bar" },
  { title: "Pie Charts", name: "pie" },
  { title: "Dot Plots", name: "dot" },
  { title: "Bubble Charts", name: "bubble" },
  { title: "Heat Maps", name: "heatmap" },
  { title: "Treemaps", name: "tree" },
];
</script>

<style lang="scss" scoped></style>

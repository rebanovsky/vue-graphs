<template>
  <div class="flex flex-col">
    <TheNavigation />
    <div class="main-content mt-[50px]">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import TheNavigation from "@/components/navigation/TheNavigation.vue";
</script>

<style></style>

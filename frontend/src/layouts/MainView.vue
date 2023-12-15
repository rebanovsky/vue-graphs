<template>
  <div class="flex flex-col gap-[0px] h-screen overflow-hidden">
    <TheNavigation />
    <router-view />
    <slot class="flex-1 overflow-y-auto"></slot>
  </div>
</template>

<script setup>
import TheNavigation from "@/components/common/navigation/TheNavigation.vue";
</script>

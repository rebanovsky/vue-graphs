<template>
  <div class="flex flex-col gap-[8px] h-screen overflow-hidden">
    <!-- <div class="view-heading px-[18px] font-medium text-[24px] rounded-[8px] gridlines">{{ getCurrentHeading() }}</div> -->
    <TheNavigation
      class="flex-shrink-0"
    />
    <router-view />
    <slot class="flex-1 overflow-y-auto"></slot>
  </div>
</template>

<script setup>
import TheNavigation from "@/components/common/navigation/TheNavigation.vue";
</script>

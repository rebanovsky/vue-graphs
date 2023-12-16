<template>
  <div class="flex flex-col gap-[0px] h-screen items-center">
    <TheNavigation />
    <router-view />
  </div>
</template>

<script setup>
import TheNavigation from "@/components/common/navigation/TheNavigation.vue";
</script>

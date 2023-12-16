<template>
  <div class="subview w-full flex justify-center">
    <div class="flex gap-5">
      <!-- Fixed Side Menu -->
      <div class="sidenav fixed overflow-y-auto w-48 gridlines top-[141px]">
        <SideMenu :title="title" :items="sidenavItems" :base-path="basePath" />
      </div>

      <!-- Main Content Area -->
      <div class="main-content flex-grow ml-48">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenu from "@/components/common/navigation/SideMenu.vue";
defineProps({
  sidenavItems: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>

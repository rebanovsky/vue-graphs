<template>
  <div class="subview w-full flex h-[auto]">
    <div class="flex w-[100%] relative">
      <!-- Fixed Side Menu -->
      <div class="sidenav overflow-y-auto border-r-[1px] h-[100%] border-slate-200 dark:border-slate-800 fixed top-[50px] left-[0px]">
        <SideMenu :title="title" :items="sidenavItems" :base-path="basePath" />
      </div>
      <!-- Main Content Area -->
      <div class="main-content flex-grow justify-center w-[100%] flex-1 ml-[240px] overflow-y-auto">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideMenu from "@/components/navigation/SideMenu.vue";
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

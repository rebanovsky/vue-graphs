<template>
  <div
    class="playground-component w-[100%] flex justify-between px-[12px] rounded-[14px]"
    style="height: calc(100vh - 73px)"
  >
    <div class="main-content w-full overflow-y-auto flex justify-center">
      <div class="sidenav overflow-y-auto gridlines rounded-[12px]" style="height: calc(100vh - 90px)">
        <SideMenu :title="title" :items="sidenavItems" :base-path="basePath" />
      </div>
      <div class="flex w-[100%] flex-1 justify-center overflow-y-auto">
        <router-view v-slot="{ Component }">
          <!-- <transition name="fade" mode="out-in"> -->
            <component :is="Component" />
          <!-- </transition> -->
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

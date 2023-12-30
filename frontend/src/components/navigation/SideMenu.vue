<template>
  <div
    class="side-menu overflow-y-auto flex flex-col justify-between bg-100 transition ease"
    style="height: calc(100vh - 49px)"
  >
    <div class="w-[220px] flex flex-col gap-[20px] py-[20px]">
      <div
        v-for="item in items"
        :key="item.title"
        class="menu-item flex flex-col gap-[8px]"
      >
        <div
          :class="{
            'border-harlequin-500 text-harlequin-500 hover:!border-harlequin-500 transition ease': isActive(item.name),
            'border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400 transition ease': !isActive(item.name)
          }"
          class="text-[14px] border-l-[4px] py-[8px] px-[24px] transition ease hover:bg-slate-50 hover:border-slate-50 dark:hover:bg-slate-800 dark:hover:border-slate-800 cursor-pointer"
          @click="navigateTo(item.name)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  items: Array,
});

const router = useRouter();
const route = useRoute();

const navigateTo = (itemName) => {
  router.push(`/${itemName}`);
};

const isActive = (itemName) => {
  return route.path === `/${itemName}`;
};
</script>



<style scoped>
.active-class {
  background-color: blue;
  color: blue;
}
</style>

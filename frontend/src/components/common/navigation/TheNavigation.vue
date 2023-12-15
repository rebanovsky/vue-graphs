<template>
  <div class="p-[12px]">
    <div
      class="content-navigation  dark:bg-slate-800 gridlines rounded-[12px] border-slate-200 px-[32px] text-[0.8em] gap-[20px] w-[100%] h-[50px] overflow-x-auto flex items-center justify-between"
    >
      <div class="left-side flex items-center">
        <div
          class="comp-name cursor-pointer p-[4px] hover:text-slate-700 w-[160px]"
        >
          Vue graphs
        </div>
      </div>
      <div class="right-side flex items-center gap-[8px]">
        <a href="https://github.com/rebanovsky/vue-graphs" target="_blank">
          <font-awesome-icon
            class="h-[22px] text-slate-400 cursor-pointer p-[4px] rounded-[2px] hover:text-slate-600 dark:hover:text-slate-400 dark:text-slate-600 transition"
            :icon="['fab', 'github']"
          />
        </a>
        <theme-toggler />
      </div>
    </div>
  </div>
</template>

<script setup>
import ThemeToggler from "@/components/widgets/ThemeToggler.vue";

const props = defineProps({
  isSettings: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>

<template>
  <div class="p-[12px]">
    <div
      class="content-navigation gridlines rounded-[12px] border-slate-200 px-[32px] text-[0.8em] gap-[20px] w-[100%] h-[50px] overflow-x-auto flex items-center justify-between"
    >
      <div class="left-side flex items-center">
        <div
          class="comp-name cursor-pointer p-[4px] hover:text-slate-700 w-[160px]"
        >
          Vue graphs
        </div>
        <div class="search ml-[32px]"><TheSearch /></div>
      </div>
      <div class="right-side flex items-center gap-[8px]">
        <font-awesome-icon
          class="h-[22px] text-slate-400 cursor-pointer p-[4px] rounded-[2px] hover:text-slate-600 dark:hover:text-slate-400 dark:text-slate-600 transition"
          :icon="['fab', 'github']"
        />
        <theme-toggler />
      </div>
    </div>
  </div>
</template>

<script>
import TheSearch from "@/components/navigation/TheSearch.vue";
import ThemeToggler from "@/components/widgets/ThemeToggler.vue";

export default {
  components: { ThemeToggler, TheSearch },
  props: {
    isSettings: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
};
</script>

<style scoped></style>

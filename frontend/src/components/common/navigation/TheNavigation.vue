<template>
  <div
    class="content-navigation border-b-[1px] border-b-slate-200 px-[32px] dark:border-b-slate-800 flex text-[12px] gap-[20px] w-[100%] h-[50px] overflow-x-auto flex items-center"
  >
    <div class="comp-name cursor-pointer p-[4px] hover:text-slate-700">Vue graphs</div>
    <div class="search"><TheSearch /></div>
    <div class="theme-toggler side-object flex mx-[8px] items-center">
      <ThemeToggler />
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

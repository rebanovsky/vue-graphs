<template>
  <div
    class="gap-[16px] flex text-[12px] justify-between items-center cursor-pointer"
    @click="toggle"
  >
    <div class="toggle-title dark:text-slate-300 text-slate-700">{{ title }}</div>
    <div :class="toggleClasses">
      <span :class="spanClasses" aria-hidden="true"></span>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";
import { ref, computed } from "vue";

const isDark = useDark();
const isToggled = ref(true);

defineProps({
  title: {
    type: String,
    default: "Title",
  },
});

const toggle = () => {
  isToggled.value = !isToggled.value;
};

const toggleClasses = computed(() => {
  if (isToggled.value) {
    return [
      "bg-blue-400",
      "relative inline-flex h-[14px] w-[28px] shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75",
    ];
  } else {
    return [
      isDark.value ? "bg-slate-800" : "bg-slate-200",
      "relative inline-flex h-[14px] w-[28px] shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75",
    ];
  }
});

const spanClasses = computed(() => {
  if (isToggled.value) {
    return [
      "translate-x-[0px] bg-slate-100",
      "pointer-events-none translate-y-[0px] inline-block h-[10px] w-[10px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
    ];
  } else {
    return [
      "translate-x-[14px]",
      isDark.value ? "bg-slate-600" : "bg-slate-100",
      "pointer-events-none translate-y-[0px] inline-block h-[10px] w-[10px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
    ];
  }
});
</script>

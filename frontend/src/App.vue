<template>
  <div
    class="app-wrapper background dark:bg-slate-900 w-[100vw] text-slate-900 dark:text-slate-400 bg-slate-100 transition ease"
  >
    <router-view />
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";
import { watch, onMounted, onUnmounted } from "vue";

const isDark = useDark();

const updateBodyClass = (dark) => {
  document.body.classList.toggle("bg-slate-900", dark);
  document.body.classList.toggle("bg-slate-100", !dark);
};

// Watch for changes in isDark
watch(
  isDark,
  (newValue) => {
    updateBodyClass(newValue);
  },
  { immediate: true }
);

onMounted(() => {
  updateBodyClass(isDark.value);
});

onUnmounted(() => {
  // Remove classes when component is destroyed
  document.body.classList.remove("bg-slate-900", "bg-slate-100");
});
</script>

<style>
body {
  background-color: transparent;
  overflow: hidden;
}

p {
  padding: 0;
}

input:focus {
  outline: none;
}

select {
  text-align: right;
}

a:hover {
  text-decoration: none;
  text-underline-offset: 2px;
}

html.dark {
  transition: all 0.2s ease;
}

#app {
  font-family: Works Sans, Inter;
}

a {
  text-decoration: none;
  font-weight: 400;
}
</style>

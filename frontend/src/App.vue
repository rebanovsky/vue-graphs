<template>
  <div
    class="app-wrapper background dark:bg-slate-900 w-[100vw] text-slate-700 dark:text-slate-300 bg-slate-100 transition ease"
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
  document.body.classList.remove("bg-slate-900", "bg-slate-100");
});
</script>

<style>
body {
  background-color: transparent;
}

h1 {
  font-weight: 500 !important;
  font-size: 24px !important;
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

/*
Transitions
*/

/*
FADE
*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/*
SLIDE UP
*/
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(4px);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

/*
SLIDE LEFT
*/
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(4px);
  opacity: 0;
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>

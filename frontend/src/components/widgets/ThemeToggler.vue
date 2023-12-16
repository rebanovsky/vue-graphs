<template>
  <div class="w-[100%] flex items-center">
    <div
      class="py-2 gap-[8px] flex text-[10px] items-center justify-between cursor-pointer"
      @click="toggleDark"
    >
      <div class="theme-icon">
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="19"
          height="14"
          viewBox="0 0 512 512"
          style="enable-background: new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <path
              d="M256,384c-70.7,0-128-57.3-128-128s57.3-128,128-128s128,57.3,128,128S326.7,384,256,384z M256,0
c14.1,0,25.6,11.5,25.6,25.6v51.2c0,14.1-11.5,25.6-25.6,25.6c-14.1,0-25.6-11.5-25.6-25.6V25.6C230.4,11.5,241.9,0,256,0z
M256,409.6c14.1,0,25.6,11.5,25.6,25.6v51.2c0,14.1-11.5,25.6-25.6,25.6c-14.1,0-25.6-11.5-25.6-25.6v-51.2
C230.4,421.1,241.9,409.6,256,409.6z M25.6,230.4h51.2c14.1,0,25.6,11.5,25.6,25.6c0,14.1-11.5,25.6-25.6,25.6H25.6
C11.5,281.6,0,270.1,0,256C0,241.9,11.5,230.4,25.6,230.4z M435.2,230.4h51.2c14.1,0,25.6,11.5,25.6,25.6
c0,14.1-11.5,25.6-25.6,25.6h-51.2c-14.1,0-25.6-11.5-25.6-25.6C409.6,241.9,421.1,230.4,435.2,230.4z M437,75
c10,10,10,26.2,0,36.2l-36.2,36.2c-9.8,10.2-26,10.4-36.2,0.6c-10.2-9.8-10.5-26-0.6-36.2l0.6-0.6L400.8,75C410.8,65,427,65,437,75
z M147.4,364.6c10,10,10,26.2,0,36.2L111.2,437c-9.8,10.2-26,10.5-36.2,0.6c-10.2-9.8-10.5-26-0.6-36.2l0.6-0.6l36.2-36.2
C121.2,354.6,137.4,354.6,147.4,364.6z M111.2,75l36.2,36.2c9.8,10.2,9.6,26.4-0.6,36.2c-9.9,9.6-25.7,9.6-35.6,0L75,111.2
C65.2,101,65.5,84.8,75.6,75C85.6,65.4,101.3,65.4,111.2,75L111.2,75z M400.8,364.6l36.2,36.2c9.8,10.2,9.5,26.4-0.6,36.2
c-9.9,9.6-25.7,9.6-35.6,0l-36.2-36.2c-10.2-9.8-10.5-26-0.6-36.2c9.8-10.2,26-10.5,36.2-0.6L400.8,364.6z"
            class="dark:fill-slate-500"
            />
          </g>
        </svg>
      </div>
      <div
        :class="[
          isDark ? 'bg-slate-800' : 'bg-slate-300',
          'relative inline-flex h-[18px] w-[36px] shrink-0  rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75',
        ]"
      >
        <span
          :class="[
            isDark
              ? 'translate-x-[19px] bg-slate-600'
              : 'translate-x-[1px] bg-slate-100',
            'pointer-events-none translate-y-[1px] inline-block h-[12px] w-[12px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
          ]"
          aria-hidden="true"
        ></span>
      </div>
      <div class="theme-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          width="19"
          height="14"
        >
          <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
          class="dark:fill-slate-100 fill-slate-300"
            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();

const toggleDark = () => {
  isDark.value = !isDark.value;
};
</script>

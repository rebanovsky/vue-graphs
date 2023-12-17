<template>
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
</template>

<script setup></script>

<style lang="scss" scoped></style>

<template>
  <div class="chart-container flex flex-col gap-[16px]">
    <div class="chart-title w-[200px] gridlines py-[4px]">
      <div
        class="h-[100%] rounded-[8px] text-[12px] font-medium text-slate-500 flex"
      >
        <slot name="title"></slot>
      </div>
    </div>
    <div class="flex gap-[20px] gridlines">
      <div class="flex flex-col gap-[8px]">
        <slot></slot>
      </div>

      <div class="graph-config rounded-[8px]">
        <div class="flex flex-col gap-[12px] w-[200px]">
          <slot name="config"></slot>
        </div>
      </div>
      <div class="w-[200px]">
        <slot name="code-block"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>

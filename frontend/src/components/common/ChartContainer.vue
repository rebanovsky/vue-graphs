<template>
  <div
    class="chart-container flex w-[auto] flex-col gridlines gap-[20px] p-[32px] rounded-[12px]"
  >
    <div class="chart-title w-[200px] py-[4px]">
      <div class="h-[100%] rounded-[8px] text-[14px] text-slate-500 flex"></div>
    </div>

    <div class="flex flex-col gap-[8px]">
      <div
        class="header-row w-[100%] flex gap-[32px] items-end text-slate-700 dark:text-slate-300 text-[12px]"
      >
        <div class="header-graph w-[400px] text-slate-500">
          <slot name="title"></slot>
        </div>
        <div class="header-config w-[192px] text-slate-500">configuration</div>
        <div class="header-config w-[200px] text-slate-500">snippet</div>
      </div>
      <div class="flex gap-[28px]">
        <div class="flex flex-col gap-[8px]">
          <slot></slot>
        </div>

        <div class="graph-config rounded-[8px] chart-border p-[8px]">
          <div class="flex flex-col gap-[12px] w-[180px] h-[180px] overflow-y-auto">
            <slot name="config"></slot>
          </div>
        </div>
        <div class="w-[200px] chart-border">
          <slot name="code-block"></slot>
        </div>
      </div>
    </div>
    <div class="second-row flex gap-[28px]">
      <div class="data-wrapper w-[400px] flex flex-col gap-[8px]">
        <div class="props-title text-[12px] text-slate-500">{{ dataFile }}</div>
        <div
          class="chart-properties text-[12px] w-[auto] h-[200px] chart-border p-[12px] rounded-[8px]"
        >
          <slot name="data"></slot>
        </div>
      </div>
      <div class="props-wrapper w-[428px] flex flex-col gap-[8px]">
        <div class="props-title text-[12px] text-slate-500">props</div>
        <div
          class="chart-properties text-[12px] w-[auto] h-[200px] chart-border p-[12px] rounded-[8px]"
        >
          <slot name="props"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  dataFile: {
    type: String,
    default: ".json",
  },
});
</script>

<style lang="scss" scoped></style>

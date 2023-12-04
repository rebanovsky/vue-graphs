<template>
  <div
    class="chart-container flex w-[auto] flex-col gap-[20px] p-[32px] rounded-[12px]"
  >
    <div class="chart-title w-[200px] py-[4px]">
      <div class="h-[100%] rounded-[8px] text-[14px] text-slate-500 flex"></div>
    </div>

    <div class="flex flex-col gap-[8px]">
      <div
        class="header-row w-[100%] flex gap-[32px] justify-center items-end text-slate-700 dark:text-slate-300 text-[12px]"
      >
        <div class="header-graph w-[480px] text-slate-500">
          <slot name="title"></slot>
        </div>
      </div>
      <div class="flex flex-col gap-[40px]">
        <div class="flex gap-[32px] justify-center">
          <div class="config-header flex text-[14px]">
            <div
              class="flex flex-col gap-[12px] chart-border w-[200px] p-[12px] h-[300px] overflow-y-auto"
            >
              <slot name="config"></slot>
            </div>
          </div>

          <slot></slot>

          <div class="config-header flex text-[14px]">
            <div
              class="flex flex-col gap-[12px] chart-border w-[200px] p-[12px] h-[180px] overflow-y-auto"
            >
              <slot name="code-block"></slot>
            </div>
          </div>

        </div>
        <div class="second-row flex gap-[28px] justify-center">
          <div class="props-wrapper w-[560px] gridlines flex flex-col gap-[8px]">
            <div class="props-title text-[12px] text-slate-500">props</div>
            <div
              class="chart-properties text-[14px] w-[auto] h-[400px] p-[12px] rounded-[8px]"
            >
              <div class="props-table flex flex-col gap-[8px]">
                <div
                  class="props-header flex gap-[12px] border-b-[1px] border-slate-400 dark:border-slate-600"
                >
                  <div class="props-title w-[64px]">Prop</div>
                  <div class="props-title w-[64px]">Type</div>
                  <div class="props-title w-[64px]">Default</div>
                  <div class="props-title w-[302px]">Description</div>
                </div>
                <div
                  class="props-data flex flex-col gap-[0px] dark:text-slate-300"
                >
                  <div
                    class="props-row flex gap-[12px] py-[16px] text-slate-600 dark:text-slate-400 border-b-[1px] border-slate-200 dark:border-slate-800"
                  >
                    <div class="props-cell w-[64px]">Aaa</div>
                    <div class="props-cell w-[64px]">Bbb</div>
                    <div class="props-cell w-[64px]">Ccc</div>
                    <div class="props-cell gridlines w-[302px]">Dddd Eeee.</div>
                  </div>
                  <div
                    class="props-row flex gap-[12px] text-slate-600 dark:text-slate-400 py-[10px] border-b-[1px] border-slate-200 dark:border-slate-800"
                  >
                    <div class="props-cell w-[64px]">Aaa</div>
                    <div class="props-cell w-[64px]">Bbb</div>
                    <div class="props-cell w-[64px]">Ccc</div>
                    <div class="props-cell w-[302px]">Dddd Eeee.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

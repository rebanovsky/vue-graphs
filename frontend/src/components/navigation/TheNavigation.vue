<template>
  <div class="fixed w-[100%] z-[100] top-[0]">
    <div
      class="content-navigation bg-slate-100 transition ease dark:bg-slate-900 border-b-[1px] border-slate-200 dark:border-slate-800 px-[20px] text-[0.8em] gap-[20px] w-[100%] h-[50px] overflow-x-auto flex items-center justify-between"
    >
      <div class="left-side flex items-center gap-[12px]">
        <div class="vue-graphs-icon w-[20px] h-[20px]">
          <svg
            version="1.1"
            viewBox="0 0 261.76 226.69"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)">
              <g transform="translate(178.06 235.01)">
                <path
                  d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z"
                  fill="#41b883"
                />
              </g>
              <g transform="translate(178.06 235.01)">
                <path
                  d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z"
                  fill="#34495e"
                />
              </g>
            </g>
          </svg>
        </div>
        <div
          class="comp-name cursor-pointer p-[4px] hover:text-slate-700 dark:hover:text-slate-400"
        >
          VueGraphs
        </div>
      </div>
      <div class="right-side flex items-center gap-[20px]">
        <div class="version-name cursor-pointer hover:text-slate-700">version 26-Dec-23</div>
        <!-- Version History -->
        <!-- <div
          class="version-history w-[180px] gridlines dark:bg-slate-800 rounded-[12px] p-[12px]"
        >
          <div class="versions-wrapper flex flex-col gap-[8px]">
            <div class="version-header">Version history</div>
            <div class="versions">
              <div class="version text-[12px] py-[4px] flex flex-col gap-[4px]">
                <div class="version-no">version 21.12.23</div>
                <div
                  class="version-notes text-slate-500 flex flex-col gap-[2px] text-[11px]"
                >
                  <div class="note">- UI/UX bug fixes</div>
                  <div class="note">- Added 4 new graphs</div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="datapoints gridlines w-[200px] h-[28px]"></div>
        <a
          href="https://github.com/rebanovsky/vue-graphs"
          class="flex"
          target="_blank"
        >
          <font-awesome-icon
            class="h-[22px] text-slate-400 cursor-pointer p-[4px] rounded-[2px] hover:text-slate-600 dark:hover:text-slate-400 dark:text-slate-600 transition"
            :icon="['fab', 'github']"
          />
        </a>
        <ThemeToggler />
      </div>
    </div>
  </div>
</template>

<script setup>
import ThemeToggler from "@/components/widgets/ThemeToggler.vue";

const props = defineProps({
  isSettings: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>

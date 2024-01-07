<template>
  <div class="fixed w-[100%] z-[100] top-[0]">
    <div
      class="content-navigation bg-100 border-b-[1px] border-200 px-[20px] text-[0.85em] gap-[20px] w-[100%] h-[50px] overflow-x-auto flex items-center justify-between"
    >
      <div class="left-side flex items-center gap-[12px]">
        <div class="vue-graphs-icon w-[24px] h-[24px]">
          <!-- <svg
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
          </svg> -->
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256.08 242"
          >

            <polygon
              class="cls-1 fill-[#34485e]"
              points="38.46 74.83 96.19 175.31 160.13 64.05 218.93 166.37 256.08 166.37 160.48 0 95.76 112.61 73.67 74.83 38.46 74.83"
            />
            <polygon
              class="cls-2 fill-[#40b883]"
              points="0 74.83 96.19 242 160.48 128.34 182.26 166.37 218.93 166.37 160.13 64.05 96.19 175.31 38.46 74.83 0 74.83"
            />
          </svg>
        </div>
        <div
          class="comp-name p-[4px] hover:text-slate-700 font-medium dark:hover:text-slate-400"
        >
          VueGraphs
        </div>
      </div>
      <div class="right-side flex items-center gap-[24px]">
        <div class="beta-tag rounded text-red-500 bg-red-100 dark:text-red-100 dark:bg-red-900 leading-5 px-[6px]">Beta</div>
        <div class="version-name font-medium text-500">version 07-Jan-24</div>
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
        <!-- <div class="datapoints gridlines w-[200px] h-[28px]"></div> -->
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

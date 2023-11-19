<template>
  <div
    class="sidenav-content flex flex-col gap-[32px] p-[32px] flex-1 gridlines max-w-[1000px] rounded-[8px]"
  >
    <div
      class="rounded-[8px] h-[40px] flex gap-[28px] items-center justify-between text-slate-500 gridlines w-[100%] p-[12px]"
    >
      <div
        class="view-mode-wrapper flex h-[100%] items-center gap-[10px] gridlines"
      >
        <div class="view-mode-name font-medium text-[12px]">View mode:</div>
        <div class="view-mode-value font-medium text-[12px] cursor-pointer">
          <SvgIcon name="feed" height="18px" width="18px" />
        </div>
        <div class="view-mode-value font-medium text-[12px] cursor-pointer">
          <SvgIcon name="table" height="18px" width="18px" />
        </div>
        <div class="view-mode-value font-medium text-[12px] cursor-pointer">
          <SvgIcon name="grid" height="18px" width="18px" />
        </div>
      </div>
      <div class="graph-search-wrapper w-[200px] flex items-center ">
        <font-awesome-icon
          class="h-[12px] text-slate-400 dark:text-slate-600 transition translate-x-[22px]"
          :icon="['fas', 'magnifying-glass']"
        />
        <input
          type="text"
          class="bg-transparent focus:bg-slate-25 focus:shadow-searchsh border-[1px] border-slate-300 dark:border-slate-700 w-[200px] pl-[28px] py-[4px] rounded-[12px]"
          placeholder="Search company"
        />
      </div>
    </div>
    <div
      class="entity-graph-wrapper h-[480px] shadow-boxshlight dark:shadow rounded-[8px] border-slate-300 dark:border-slate-700 border-[1px] w-[100%] p-[20px]"
    >
      <div
        class="entity-graph-content rounded-[4px] w-[100%] h-[100%] flex flex-col gap-[12px]"
      >
        <div class="entity-header w-[100%] flex justify-between gridlines">
          <div class="quote-wrapper flex gap-[16px]">
            <div
              class="quote-logo w-[40px] h-[40px] rounded-[8px] gridlines text-[12px] flex items-center justify-center"
            >
              <img
                class="rounded-[8px]"
                src="https://i.pinimg.com/564x/db/fe/75/dbfe75990174020a7ebf8799999212d8.jpg"
              />
            </div>
            <div
              class="quote-text-wrapper flex flex-col text-[14px] h-[40px] font-medium gridlines"
            >
              <div class="quote-symbol h-[20px]">AAPL</div>
              <div
                class="quote-name text-[11px] h-[20px] text-slate-400 dark:text-slate-600"
              >
                Apple Inc.
              </div>
            </div>
            <div
              class="quote-values-wrapper flex flex-col gap-[4px] h-[40px] text-[12px] font-medium items-end gridlines"
            >
              <div class="quote-value h-[20px]">$123.45</div>
              <div
                class="quote-percentage h-[20px] text-green-400 dark:text-green-300"
              >
                2.15%
              </div>
            </div>
          </div>
          <div
            class="quote-actions flex gap-[16px] items-center text-[12px] text-slate-400 dark:text-slate-600"
          >
            <div
              class="watchlist-wrapper gridlines items-center rounded-[8px] px-[4px] flex gap-[8px] cursor-pointer"
            >
              <div
                class="watchlist-icon rounded-[4px] h-[16px] w-[16px] gridlines flex items-center justify-center"
              >
                <SvgIcon name="eye" height="18px" width="18px" />
              </div>
              <div class="watchlist-text">WATCHLIST</div>
            </div>
            <div
              class="alert-wrapper gridlines items-center rounded-[8px] flex gap-[8px] px-[4px] cursor-pointer"
            >
              <div class="alert-icon rounded-[4px] h-[16px] w-[16px] gridlines">
                <SvgIcon name="bell" height="15px" width="15px" />
              </div>
              <div class="alert-text">ALERT</div>
            </div>
          </div>
        </div>
        <div
          class="entity-main-content h-[240px] gridlines flex items-center justify-between w-[100%]"
        >
          <div
            class="graph-item w-[260px] h-[190px] gridlines flex items-center justify-center rounded-[8px]"
            v-if="line1"
          >
            <CandlestickChart
              :data="line1"
              title="Stock price"
              :width="200"
              :height="90"
            />
          </div>
          <div
            class="graph-item w-[260px] h-[190px] gridlines flex items-center justify-center rounded-[8px]"
            v-if="earnings"
          >
            <BarChart
              :data="earnings"
              title="Earnings"
              :width="260"
              :height="140"
            />
          </div>
          <div
            class="graph-item w-[260px] h-[188px] gridlines flex items-center justify-center rounded-[8px]"
            v-if="earnings"
          >
            <DotGraph :data="earnings" :width="260" :height="134" />
          </div>
        </div>
        <div class="entity-footer h-[130px] gridlines">FOOTER</div>
      </div>
    </div>
  </div>
</template>

<script>
import { line1 } from "@/data/dummyMultiLine";
import { earnings1 } from "@/data/earningsDummy";
import CandlestickChart from "@/components/playground/CandlestickChart.vue";
import BarChart from "@/components/playground/BarChart.vue";
import DotGraph from "@/components/playground/DotGraph.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";

export default {
  components: { CandlestickChart, BarChart, DotGraph, SvgIcon },
  setup() {
    const first50Items = line1.slice(0, 50);

    return { line1: first50Items, earnings: earnings1.AppleEarningsData };
  },
};
</script>

<style lang="scss" scoped></style>

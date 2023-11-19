<template>
  <div
    class="playground-component w-[100%] flex justify-between rounded-[14px] gridlines"
    style="height: calc(100vh - 162px)"
  >
    <div class="playground w-full overflow-y-auto">
      <div class="boxes flex gap-[40px] flex-wrap p-[32px]">
        <div
          class="box-test h-[auto] w-[400px] shadow-boxshlight rounded-[12px] gridlines flex flex-col gap-[4px] p-[12px]"
          v-for="(i, index) in subjects"
          :key="index"
        >
          <div class="box-title text-[14px] font-medium">{{ i.title }}</div>
          <div
            class="box-content gridlines p-[12px] rounded h-[100%] flex flex-col text-[12px] gap-[16px]"
          >
            <div class="description text-slate-400">{{ i.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    const subjects = ref([
      {
        title: "Commodity Prices",
        description:
          "Real-time prices and daily changes for a range of key commodities.",
      },
      {
        title: "Commodity News",
        description:
          "The latest developments and analysis affecting commodity markets.",
      },
      {
        title: "Supply and Demand Reports",
        description:
          "Detailed supply and demand data that could influence commodity prices.",
      },
      {
        title: "Commodity Indices",
        description: "Updates on the performance of major commodity indices.",
      },
      {
        title: "Futures and Options",
        description:
          "Current data on futures and options for commodities, including market sentiment.",
      },
      {
        title: "Commodity ETFs and Mutual Funds",
        description:
          "Performance tracking and news for commodity-based ETFs and mutual funds.",
      },
      {
        title: "Seasonal Trends",
        description:
          "Insights into historical seasonal trends in commodity pricing.",
      },
      {
        title: "Storage and Inventory Levels",
        description:
          "Reports on current storage and inventory levels for commodities like oil and grains.",
      },
      {
        title: "Regulatory and Geopolitical Updates",
        description:
          "How global events and policy changes are likely to impact commodities.",
      },
      {
        title: "Technical Analysis and Charts",
        description:
          "Charting tools and technical analysis for commodities trading.",
      },
      {
        title: "Educational Resources",
        description: "Learning materials for those new to commodities markets.",
      },
    ]);

    return { subjects };
  },
};
</script>

<style lang="scss" scoped></style>

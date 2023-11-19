<template>
  <div
    class="playground-component w-[100%] flex justify-between gridlines rounded-[14px]"
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
        title: "Market Trends",
        description:
          "Analysis of the latest trends in real estate markets, including price movements, supply and demand metrics, and regional or global market differences.",
      },
      {
        title: "REITs Performance",
        description:
          "Overview and performance metrics of REITs, segmented by type (e.g., residential, commercial, healthcare, retail).",
      },
      {
        title: "Investment Opportunities",
        description:
          "Curated listings of promising real estate investment opportunities and emerging markets.",
      },
      {
        title: "Mortgage Rates",
        description:
          "Current mortgage rates by region, including analysis on rate trends and forecasts.",
      },
      {
        title: "Construction and Development",
        description:
          "Data on new developments, construction projects, and their impact on local markets.",
      },
      {
        title: "Regulatory Changes",
        description:
          "Information on new regulations or changes in real estate law that could affect market dynamics.",
      },
      {
        title: "Tax Implications",
        description:
          "Guidance on tax considerations for real estate investments, including deductions and credits available to investors.",
      },
      {
        title: "Market Analysis Reports",
        description:
          "In-depth reports on different real estate markets, providing insights into valuations, investment potential, and risk factors.",
      },
      {
        title: "Historical Data and Projections",
        description:
          "Access to historical real estate data and future market projections to help investors make informed decisions.",
      },
      {
        title: "Educational Resources",
        description:
          "Articles, tutorials, and webinars focused on educating investors about real estate investing basics and advanced strategies.",
      },
    ]);

    return { subjects };
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="playground-wrapper w-[100%] flex justify-between rounded-[14px]"
    style="height: calc(100vh - 162px)"
  >
    <div class="playground w-full overflow-y-auto flex gap-[8px]">
      <div class="sidenav-etf overflow-y-auto gridlines rounded-[8px]">
        <div class="w-[240px]"></div>
      </div>
      <div
        class="boxes flex gap-[20px] rounded-[8px] gridlines overflow-y-auto flex-wrap flex-1 p-[32px]"
      >
        <div
          class="etf h-[120px] w-[210px] flex flex-col gap-[8px] p-[8px] rounded-[8px]"
          v-for="etf in etfs"
          :key="etf.name"
        >
          <div class="etf-header text-[14px] flex items-center gap-[8px]">
            <div class="etf-title">{{ etf.ticker }}</div>
            <div
              class="dot bg-slate-900 h-[2px] w-[2px] rounded-[2px] mx-[2px]"
            ></div>
            <div class="etf-industry text-[10px] text-slate-500">
              {{ etf.industry }}
            </div>
          </div>
          <div class="etf-graph gridlines h-[100%]"></div>
        </div>
      </div>
      <div class="right-sider w-[320px] flex gridlines rounded-[8px]"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    const etfs = ref([
      {
        name: "iShares Global Clean Energy ETF",
        industry: "Clean Energy",
        ticker: "ICLN",
        NAV: 22.45,
        YTD: "3.8%",
        expenseRatio: "0.46%",
      },
      {
        name: "First Trust NASDAQ Cybersecurity ETF",
        industry: "Cybersecurity",
        ticker: "CIBR",
        NAV: 35.1,
        YTD: "-1.2%",
        expenseRatio: "0.60%",
      },
      {
        name: "Vanguard Total Stock Market ETF",
        industry: "Broad Market",
        ticker: "VTI",
        NAV: 150.0,
        YTD: "5.0%",
        expenseRatio: "0.03%",
      },
      {
        name: "iShares U.S. Pharmaceuticals ETF",
        industry: "Healthcare",
        ticker: "IHE",
        NAV: 165.25,
        YTD: "-2.7%",
        expenseRatio: "0.43%",
      },
      {
        name: "VanEck Vectors Gold Miners ETF",
        industry: "Precious Metals & Mining",
        ticker: "GDX",
        NAV: 31.1,
        YTD: "8.5%",
        expenseRatio: "0.53%",
      },
      {
        name: "Vanguard FTSE Emerging Markets ETF",
        industry: "International Equity",
        ticker: "VWO",
        NAV: 45.65,
        YTD: "-4.1%",
        expenseRatio: "0.10%",
      },
      {
        name: "Vanguard Dividend Appreciation ETF",
        industry: "Dividend Stocks",
        ticker: "VIG",
        NAV: 120.75,
        YTD: "3.6%",
        expenseRatio: "0.06%",
      },
      {
        name: "Technology Select Sector SPDR Fund",
        industry: "Technology",
        ticker: "XLK",
        NAV: 102.47,
        YTD: "6.2%",
        expenseRatio: "0.12%",
      },
      {
        name: "Vanguard Real Estate ETF",
        industry: "Real Estate",
        ticker: "VNQ",
        NAV: 85.6,
        YTD: "-0.5%",
        expenseRatio: "0.12%",
      },
      {
        name: "Consumer Staples Select Sector SPDR Fund",
        industry: "Consumer Goods",
        ticker: "XLP",
        NAV: 65.32,
        YTD: "2.4%",
        expenseRatio: "0.13%",
      },
      {
        name: "ARK Autonomous Technology & Robotics ETF",
        industry: "Automotive",
        ticker: "ARKQ",
        NAV: 55.76,
        YTD: "-7.2%",
        expenseRatio: "0.75%",
      },
      {
        name: "Global X Social Media ETF",
        industry: "Technology/Media",
        ticker: "SOCL",
        NAV: 47.85,
        YTD: "1.9%",
        expenseRatio: "0.65%",
      },
      {
        name: "iShares Nasdaq Biotechnology ETF",
        industry: "Biotechnology",
        ticker: "IBB",
        NAV: 135.22,
        YTD: "-3.3%",
        expenseRatio: "0.47%",
      },
      {
        name: "Amplify Transformational Data Sharing ETF",
        industry: "Blockchain Technology",
        ticker: "BLOK",
        NAV: 41.47,
        YTD: "12.5%",
        expenseRatio: "0.71%",
      },
      {
        name: "iShares iBoxx $ High Yield Corporate Bond ETF",
        industry: "Corporate Bonds",
        ticker: "HYG",
        NAV: 86.12,
        YTD: "-2.3%",
        expenseRatio: "0.49%",
      },
      {
        name: "iShares U.S. Aerospace & Defense ETF",
        industry: "Aerospace & Defense",
        ticker: "ITA",
        NAV: 97.54,
        YTD: "4.8%",
        expenseRatio: "0.42%",
      },
      {
        name: "Invesco Water Resources ETF",
        industry: "Utilities & Natural Resources",
        ticker: "PHO",
        NAV: 33.45,
        YTD: "1.2%",
        expenseRatio: "0.61%",
      },
      {
        name: "iShares Global Infrastructure ETF",
        industry: "Global Infrastructure",
        ticker: "IGF",
        NAV: 43.96,
        YTD: "2.8%",
        expenseRatio: "0.46%",
      },
      {
        name: "SPDR S&P Retail ETF",
        industry: "Retail",
        ticker: "XRT",
        NAV: 61.37,
        YTD: "5.2%",
        expenseRatio: "0.35%",
      },
      {
        name: "Global X Cloud Computing ETF",
        industry: "Cloud Computing",
        ticker: "CLOU",
        NAV: 18.23,
        YTD: "8.1%",
        expenseRatio: "0.68%",
      },
    ]);

    return { etfs };
  },
};
</script>

<style lang="scss" scoped></style>

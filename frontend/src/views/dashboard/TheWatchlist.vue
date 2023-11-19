<template>
  <div class="flex flex-col gap-[8px]">
    <div class="h-[40px] gridlines rounded-[8px]">

    </div>
    <div
      class="w-[100%] flex gap-[8px]"
    >
      <div
        class="left-side w-[260px] flex flex-col rounded-[8px] gridlines"
        style="height: calc(100vh - 172px)"
      >
        <div class="watchlists-wrapper flex flex-col gap-[8px] text-[12px] h-[100%] overflow-y-auto">
          <div class="watchlists-title p-[6px] border-b-[1px] border-slate-300 font-medium text-[14px]">
            Watchlists
          </div>
          <div class="hover:bg-slate-50 p-[8px] cursor-pointer" v-for="w in watchlists">
            {{ w.name }}
          </div>
        </div>
      </div>
      <div class="main-content flex w-[100%] flex-1 justify-center">
        <TheWatchlist
          :columns="columns"
          :rows="watchlist"
          table-height-adjust="310px"
          table-title="Watchlist"
        />
      </div>
      <div
        class="right-side w-[260px] gridlines flex flex-col"
      ></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import TheWatchlist from "@/components/common/tables/TheWatchlist.vue";

export default {
  components: { TheWatchlist },
  setup() {
    const columns = ref([
      {
        key: "symbol",
        label: "Symbol",
        format: "text",
        width: "100px",
        alignment: "flex-start",
      },
      {
        key: "company_name",
        label: "Company Name",
        format: "text",
        width: "280px",
        alignment: "flex-start",
      },
      {
        key: "current_price",
        label: "Current Price",
        format: "currency",
        width: "140px",
        alignment: "flex-end",
      },
      {
        key: "daily_high",
        label: "Daily High",
        format: "currency",
        width: "140px",
        alignment: "flex-end",
      },
      {
        key: "daily_low",
        label: "Daily Low",
        format: "currency",
        width: "140px",
        alignment: "flex-end",
      },
      {
        key: "percent_change",
        label: "% Change",
        format: "percent",
        width: "100px",
        alignment: "flex-end",
      },
      {
        key: "volume",
        label: "Volume",
        format: "number",
        width: "150px",
        alignment: "flex-end",
      },
    ]);

    const watchlist = ref([
      {
        symbol: "AAPL",
        company_name: "Apple Inc.",
        current_price: 154.68,
        daily_high: 155.45,
        daily_low: 153.23,
        percent_change: -0.32,
        volume: 74251800,
      },
      {
        symbol: "GOOGL",
        company_name: "Alphabet Inc.",
        current_price: 2732.42,
        daily_high: 2755.0,
        daily_low: 2710.67,
        percent_change: 1.1,
        volume: 1563200,
      },
      {
        symbol: "AMZN",
        company_name: "Amazon.com, Inc.",
        current_price: 140.38,
        daily_high: 141.5,
        daily_low: 138.35,
        percent_change: -0.56,
        volume: 5124200,
      },
      {
        symbol: "TSLA",
        company_name: "Tesla, Inc.",
        current_price: 995.67,
        daily_high: 1001.43,
        daily_low: 982.1,
        percent_change: 2.23,
        volume: 24722000,
      },
      {
        symbol: "MSFT",
        company_name: "Microsoft Corporation",
        current_price: 289.67,
        daily_high: 292.15,
        daily_low: 287.36,
        percent_change: -0.78,
        volume: 22319000,
      },
      {
        symbol: "NFLX",
        company_name: "Netflix, Inc.",
        current_price: 241.15,
        daily_high: 243.71,
        daily_low: 238.2,
        percent_change: 1.05,
        volume: 3589200,
      },
      {
        symbol: "NVDA",
        company_name: "NVIDIA Corporation",
        current_price: 289.6,
        daily_high: 293.8,
        daily_low: 287.45,
        percent_change: -0.67,
        volume: 3710400,
      },
      {
        symbol: "INTC",
        company_name: "Intel Corporation",
        current_price: 48.3,
        daily_high: 49.1,
        daily_low: 47.95,
        percent_change: -0.82,
        volume: 21470000,
      },
      {
        symbol: "BRK.A",
        company_name: "Berkshire Hathaway Inc.",
        current_price: 439150.0,
        daily_high: 440255.0,
        daily_low: 436000.0,
        percent_change: 0.45,
        volume: 324,
      },
      {
        symbol: "V",
        company_name: "Visa Inc.",
        current_price: 212.77,
        daily_high: 214.25,
        daily_low: 211.75,
        percent_change: 0.23,
        volume: 4892300,
      },
      {
        symbol: "JNJ",
        company_name: "Johnson & Johnson",
        current_price: 165.22,
        daily_high: 166.0,
        daily_low: 164.5,
        percent_change: -0.27,
        volume: 6435700,
      },
      {
        symbol: "WMT",
        company_name: "Walmart Inc.",
        current_price: 142.9,
        daily_high: 143.66,
        daily_low: 141.77,
        percent_change: -0.35,
        volume: 6218300,
      },
      {
        symbol: "PG",
        company_name: "Procter & Gamble Company",
        current_price: 145.95,
        daily_high: 146.5,
        daily_low: 144.29,
        percent_change: -0.2,
        volume: 7422900,
      },
      {
        symbol: "BAC",
        company_name: "Bank of America Corporation",
        current_price: 37.76,
        daily_high: 38.22,
        daily_low: 37.5,
        percent_change: -1.11,
        volume: 48107600,
      },
      {
        symbol: "PFE",
        company_name: "Pfizer Inc.",
        current_price: 49.85,
        daily_high: 50.1,
        daily_low: 49.5,
        percent_change: -0.4,
        volume: 21356800,
      },
      {
        symbol: "KO",
        company_name: "The Coca-Cola Company",
        current_price: 61.5,
        daily_high: 61.94,
        daily_low: 61.22,
        percent_change: 0.32,
        volume: 12643700,
      },
      {
        symbol: "ORCL",
        company_name: "Oracle Corporation",
        current_price: 80.15,
        daily_high: 81.36,
        daily_low: 79.9,
        percent_change: -0.62,
        volume: 11521400,
      },
      {
        symbol: "CSCO",
        company_name: "Cisco Systems, Inc.",
        current_price: 45.77,
        daily_high: 46.12,
        daily_low: 45.5,
        percent_change: 0.22,
        volume: 21294700,
      },
      {
        symbol: "IBM",
        company_name: "International Business Machines Corporation",
        current_price: 134.5,
        daily_high: 135.88,
        daily_low: 133.55,
        percent_change: -0.33,
        volume: 4892300,
      },
      {
        symbol: "MCD",
        company_name: "McDonald's Corporation",
        current_price: 245.2,
        daily_high: 246.69,
        daily_low: 243.58,
        percent_change: 0.45,
        volume: 1858300,
      },
      {
        symbol: "DIS",
        company_name: "The Walt Disney Company",
        current_price: 105.67,
        daily_high: 106.56,
        daily_low: 104.73,
        percent_change: -0.59,
        volume: 8754200,
      },
      {
        symbol: "PEP",
        company_name: "PepsiCo, Inc.",
        current_price: 168.94,
        daily_high: 169.4,
        daily_low: 167.22,
        percent_change: 0.23,
        volume: 4115700,
      },
      {
        symbol: "MA",
        company_name: "Mastercard Incorporated",
        current_price: 347.66,
        daily_high: 349.88,
        daily_low: 345.33,
        percent_change: 0.48,
        volume: 2514900,
      },
      {
        symbol: "ABT",
        company_name: "Abbott Laboratories",
        current_price: 109.3,
        daily_high: 110.0,
        daily_low: 108.25,
        percent_change: -0.72,
        volume: 5142600,
      },
      {
        symbol: "XOM",
        company_name: "Exxon Mobil Corporation",
        current_price: 90.12,
        daily_high: 90.99,
        daily_low: 89.5,
        percent_change: -0.47,
        volume: 18765900,
      },
      {
        symbol: "VZ",
        company_name: "Verizon Communications Inc.",
        current_price: 51.87,
        daily_high: 52.1,
        daily_low: 51.45,
        percent_change: 0.17,
        volume: 18476200,
      },
      {
        symbol: "CVX",
        company_name: "Chevron Corporation",
        current_price: 151.48,
        daily_high: 152.89,
        daily_low: 150.88,
        percent_change: 0.29,
        volume: 11750000,
      },
    ]);

    const watchlists = ref([
      { id: "wl_001", name: "Tech Innovators" },
      { id: "wl_002", name: "Energy Sector" },
      { id: "wl_003", name: "Healthcare Leaders" },
      { id: "wl_004", name: "Financial Firms" },
      { id: "wl_005", name: "Consumer Goods" },
      { id: "wl_006", name: "Real Estate Investments" },
      { id: "wl_007", name: "Industrial Giants" },
      { id: "wl_008", name: "Utilities Index" },
      { id: "wl_009", name: "Communications" },
      { id: "wl_010", name: "Biotech Pioneers" },
      { id: "wl_011", name: "Automotive Innovations" },
      { id: "wl_012", name: "Luxury Brands" },
      { id: "wl_013", name: "Retail Chains" },
      { id: "wl_014", name: "Entertainment and Media" },
      { id: "wl_015", name: "Global Agriculture" },
      { id: "wl_016", name: "Cybersecurity" },
      { id: "wl_017", name: "Pharmaceuticals" },
      { id: "wl_018", name: "Aerospace and Defense" },
      { id: "wl_019", name: "Green Energy" },
      { id: "wl_020", name: "Artificial Intelligence" },
    ]);

    return { columns, watchlist, watchlists };
  },
};
</script>

<style lang="scss" scoped></style>

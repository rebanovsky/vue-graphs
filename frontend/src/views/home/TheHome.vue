<template>
  <MainView :items="navItems" />
</template>

<script>
import { ref, defineComponent } from "vue";
import MainView from "@/layouts/MainView.vue";

export default defineComponent({
  components: { MainView },
  setup() {
    const navItems = ref([
      { name: "OVERVIEW", path: "/home/overview" },
      { name: "MARKETS", path: "/home/markets" },
      { name: "STOCKS", path: "/home/stocks" },
      { name: "OPTIONS", path: "/home/options" },
      { name: "NEWS", path: "/home/news" },
      { name: "EARNINGS", path: "/home/earnings" },
      { name: "REAL ESTATE", path: "/home/real-estate" },
      { name: "COMMODITIES", path: "/home/commodities" },
      { name: "CURRENCIES", path: "/home/currencies" },
      { name: "ETF", path: "/home/etf" },
      { name: "BONDS", path: "/home/bonds" },
      { name: "CALENDAR", path: "/home/calendar" },
      { name: "FILINGS & REPORTS", path: "/home/filings-reports" },
    ]);

    return { navItems };
  },
});
</script>

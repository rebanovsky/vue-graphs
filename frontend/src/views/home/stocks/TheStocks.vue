<template>
  <SubView title="Stocks" :sidenav-items="sidenavItems" base-path="/home/stocks" />
</template>

<script>
import SubView from "@/layouts/SubView.vue";
import { ref } from "vue";

export default {
  components: { SubView },
  setup() {
    const subjects = ref([
      {
        title: "Stock Quotes",
        description:
          "Real-time stock prices, volume, and historical chart analysis.",
      },
      {
        title: "Market Movers",
        description:
          "Insights into the top gainers, losers, and most active stocks in the market.",
      },
      {
        title: "Stock Analysis",
        description:
          "Tools and insights for both fundamental and technical analysis of stocks.",
      },
      {
        title: "Stock News",
        description:
          "Latest news articles, press releases, and corporate announcements.",
      },
      {
        title: "Dividend Information",
        description:
          "Current dividend yields, historical payouts, and upcoming dividend dates.",
      },
      {
        title: "Earnings Calendar",
        description:
          "Schedule of earnings reports from publicly traded companies.",
      },
      {
        title: "Analyst Ratings",
        description:
          "Compilation of stock ratings, analyst opinions, and price targets.",
      },
      {
        title: "IPO Calendar",
        description:
          "Upcoming IPOs with details on company offerings and performance of recent IPOs.",
      },
      {
        title: "Sector and Industry Analysis",
        description:
          "Performance metrics and news for different sectors and industries.",
      },
      {
        title: "Stock Screeners",
        description:
          "Customizable tools to filter stocks by various metrics like P/E ratio, market cap, and dividend yield.",
      },
      {
        title: "Watchlist and Portfolio Integration",
        description:
          "Functions to manage personal watchlists and portfolios, including setting up custom alerts.",
      },
      {
        title: "Insider Trading Activity",
        description:
          "Reports on stock purchases and sales by company insiders.",
      },
      {
        title: "Regulatory Filings",
        description:
          "Direct access to SEC filings, including annual and quarterly reports.",
      },
      {
        title: "Corporate Governance",
        description:
          "Information on a company's board, executive compensation, and shareholder meetings.",
      },
    ]);

    const sidenavItems = ref([
      {
        title: "Stock Quotes",
        name: "stock-quotes",
      },
      {
        title: "Market Movers",
        name: "market-movers",
      },
      {
        title: "Stock Analysis",
        name: "stock-analysis",
      },
      {
        title: "Dividend Information",
        name: "dividend-information",
      },
      {
        title: "Earnings Calendar",
        name: "earnings-calendar",
      },
      {
        title: "Analyst Ratings",
        name: "analyst-ratings",
      },
      {
        title: "IPO Calendar",
        name: "ipo-calendar",
      },
      {
        title: "Sector and Industry Analysis",
        name: "sector-and-industry-analysis",
      },
      {
        title: "Stock Screeners",
        name: "stock-screeners",
      },
      {
        title: "Watchlist and Portfolio Integration",
        name: "watchlist-and-portfolio-integration",
      },
      {
        title: "Insider Trading Activity",
        name: "insider-trading-activity",
      },
      {
        title: "Regulatory Filings",
        name: "regulatory-filings",
      },
      {
        title: "Corporate Governance",
        name: "corporate-governance",
      },
    ]);

    return { subjects, sidenavItems };
  },
};
</script>

<style lang="scss" scoped></style>

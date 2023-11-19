<template>
  <div
    class="main-content-wrapper w-[100%] flex justify-between rounded-[14px]"
    style="height: calc(100vh - 162px)"
  >
    <div class="main-content w-full overflow-y-auto flex gap-[8px]">
      <div
        class="sidenav overflow-y-auto rounded-[8px]"
      >
        <SideMenu
          :title="'Filing Reports'"
          :items="sidenavItems"
          :basePath="'/home/filings-reports'"
        />
      </div>
      <div
        class="boxes flex justify-center gap-[20px] rounded-[8px] overflow-y-auto flex-wrap flex-1"
      >
        <CompanyFilings />
      </div>
      <div
        class="right-sider w-[320px] flex rounded-[8px]"
      ></div>
    </div>
  </div>
</template>

<script>
import CompanyFilings from "@/components/feeds/CompanyFilings.vue";
import SideMenu from "@/components/common/navigation/SideMenu.vue";
import { ref } from "vue";

export default {
  components: { CompanyFilings, SideMenu },
  setup() {
    const sidenavItems = ref([
      {
        title: "Company Filings",
        items: ["8-K", "10-K", "10-Q", "13F", "Proxy Statements", "S-1", "S-4"],
      },
      {
        title: "Economic Data",
        items: [
          "GDP Reports",
          "Unemployment Rates",
          "Inflation Data",
          "Consumer Price Index (CPI)",
          "Producer Price Index (PPI)",
          "Retail Sales",
          "Manufacturing Data",
          "Trade Balance",
          "Interest Rate Decisions",
          "Monetary Policy Reports",
        ],
      },
      {
        title: "Market Data",
        items: [
          "Stock Indices",
          "Commodity Prices",
          "Treasury Yields",
          "Foreign Exchange Rates",
          "ETF Information",
          "Mutual Fund Performance",
        ],
      },
      {
        title: "Investment Reports",
        items: [
          "Analyst Recommendations",
          "Earnings Estimates",
          "Dividend Reports",
          "IPO Filings",
          "Mergers and Acquisitions",
        ],
      },
      {
        title: "Sector and Industry Reports",
        items: [
          "Technology Sector",
          "Healthcare Sector",
          "Financial Sector",
          "Consumer Goods Sector",
          "Energy Sector",
          "Utilities Sector",
          "Real Estate Sector",
        ],
      },
      {
        title: "International Data",
        items: [
          "International Market Indices",
          "Global Economic Outlook",
          "Emerging Markets Reports",
          "Cross-Border Investments",
          "International Trade Agreements",
        ],
      },
      {
        title: "Regulatory Reports",
        items: [
          "Compliance Updates",
          "Regulatory Filings",
          "Sanctions Lists",
          "Legal Proceedings",
          "Policy Changes",
        ],
      },
      {
        title: "Environmental, Social, and Governance (ESG)",
        items: [
          "ESG Ratings",
          "Sustainability Reports",
          "Corporate Social Responsibility",
          "Environmental Impact Assessments",
          "Social Impact Reports",
        ],
      },
      {
        title: "Research & Analysis",
        items: [
          "Market Research Reports",
          "Industry Analysis",
          "Thematic Research",
          "Risk Analysis",
          "Portfolio Management Insights",
        ],
      },
      {
        title: "Educational Resources",
        items: [
          "Investing Basics",
          "Financial Planning Guides",
          "Taxation Guidelines",
          "Retirement Planning",
          "Educational Webinars",
        ],
      },
    ]);

    return {
      sidenavItems,
    };
  },
};
</script>

<style lang="scss" scoped></style>

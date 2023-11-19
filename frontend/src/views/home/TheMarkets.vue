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
          <div class="box-title text-[14px] font-medium ">{{ i.title }}</div>
          <div
            class="box-content gridlines p-[12px] rounded h-[100%] flex flex-col text-[12px] gap-[16px]"
          >
            <div
              v-for="(p, index) in i.content"
              :key="index"
              class="flex flex-col gap-[4px]"
            >
              <div class="point font-medium">{{ p.point }}</div>
              <div class="description text-slate-400">{{ p.description }}</div>
            </div>
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
        title: "Equities",
        content: [
          {
            point: "Major Indices",
            description:
              "Overview of major global indices (e.g., S&P 500, Dow Jones, NASDAQ, FTSE 100, Nikkei 225).",
          },
          {
            point: "Top Movers",
            description:
              "Stocks that have gained or lost the most in the past trading session or over various timeframes.",
          },
        ],
      },
      {
        title: "Fixed income",
        content: [
          {
            point: "Government Bonds",
            description:
              "Overview of major government bond yields (e.g., US Treasuries, UK Gilts, German Bunds).",
          },
          {
            point: "Corporate Bonds",
            description:
              "Information about the corporate bond market, perhaps divided by credit quality (e.g., investment grade, high yield).",
          },
          {
            point: "Bond Indices",
            description:
              "Major bond indices that track the overall bond market or specific sectors.",
          },
        ],
      },
      {
        title: "Commodities",
        content: [
          {
            point: "Precious Metals",
            description: "Overview of gold, silver, platinum prices.",
          },
          {
            point: "Energy",
            description: "Prices and news about oil, natural gas, coal.",
          },
          {
            point: "Agriculture",
            description:
              "Information on major agricultural commodities like wheat, corn, soybeans.",
          },
        ],
      },
      {
        title: "Foreign Exchange",
        content: [
          {
            point: "Major Pairs",
            description:
              "Overview of major currency pairs (e.g., EUR/USD, GBP/USD, USD/JPY).",
          },
          {
            point: "Emerging Market Currencies",
            description:
              "Highlighting important developing country currencies and their performance.",
          },
        ],
      },
      {
        title: "Cryptocurrencies",
        content: [
          {
            point: "Major Cryptos",
            description:
              "Overview of top cryptocurrencies by market cap (e.g., Bitcoin, Ethereum, Binance Coin).",
          },
          {
            point: "Market Sentiment",
            description:
              "Information on the overall sentiment in the crypto market, perhaps based on social media analysis or other indicators.",
          },
        ],
      },
      {
        title: "Real Estate Investment Trusts (REITs)",
        content: [
          {
            description: "Overview of major REIT indices.",
          },
          {
            description:
              "Performance of sectors within REITs (e.g., residential, commercial, retail).",
          },
        ],
      },
      {
        title: "Emerging & Frontier Markets",
        content: [
          {
            description:
              "Overview of markets that are less developed than the mainstream emerging markets.",
          },
          { description: "News, insights, and performance metrics." },
        ],
      },
      {
        title: "Thematic & Sector Focus",
        content: [
          {
            description:
              "Coverage of hot sectors or themes in the market, such as sustainable energy, biotech innovations, or artificial intelligence.",
          },
        ],
      },
      {
        title: "Market News & Analysis",
        content: [
          {
            description:
              "Updates on major market events, geopolitical news impacting markets, monetary policy decisions, etc.",
          },
          {
            description:
              "Expert analysis or commentary on current market conditions.",
          },
        ],
      },
      {
        title: "Economic Indicators",
        content: [
          {
            description:
              "Key economic data points, such as unemployment rate, inflation rate, GDP growth, etc. from major economies.",
          },
          {
            description:
              "A calendar of upcoming major economic announcements or events.",
          },
        ],
      },
    ]);

    return { subjects };
  },
};
</script>

<style lang="scss" scoped></style>

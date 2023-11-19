<template>
  <div
    class="configuration-wrapper"
  >
    <div class="h-[40px] flex gap-[8px]">
      <div
        class="right-configs gridlines w-[240px] rounded-[8px]"
      ></div>
      <div
        class="main-configs flex gap-[8px] px-[12px] flex-grow rounded-[8px] gridlines"
      >
        <div class="feed-settings-wrapper h-[100%] flex items-center">
          <div
            class="feed-settings text-[12px] rounded text-slate-600 hover:text-slate-900 font-normal cursor-pointer hover:bg-slate-50 p-[4px]"
            @click="toggleModal"
          >
          <img :src="config" class="h-[20px] w-[20px] cursor-pointer" />
          </div>
        </div>
      </div>
      <div
        class="left-configs gridlines w-[380px] rounded-[8px] "
      ></div>
    </div>
  </div>
  <div
    class="playground-component w-[100%] flex gap-[8px]"
    style="height: calc(100vh - 215px)"
  >
    <div
      class="sidenav-news-wrapper overflow-y-auto gridlines rounded-[8px]"
    >
      <SideFeed :items="news" />
    </div>
    <div
      class="playground w-[100%] flex flex-1 justify-center p-[12px] gridlines rounded-[8px]"
    >
    </div>
    <div
      class="right-sider w-[380px] gridlines rounded-[8px]"
    >
      <TheList :items="stocks" />
    </div>
  </div>
  <TheModal
    :show-modal="isModalVisible"
    modal-title="Feed settings"
    @update:showModal="updateModalVisibility"
  />
</template>

<script>
import TheList from "@/components/common/tables/TheList.vue";
import TheHeader from "@/components/home/TheHeader.vue";
import settings from "@/assets/icons/settings_noun_project.svg";
import widget from "@/assets/icons/widget_noun_project.svg";
import SideFeed from "@/components/common/SideFeed.vue";
import MainFeed from "@/components/home/feed/MainFeed.vue";
import TheModal from "@/components/common/modals/TheModal.vue";
import { ref } from "vue";
import config from "@/assets/icons/config_noun_project.svg"

export default {
  components: { TheHeader, TheList, SideFeed, MainFeed, TheModal },
  setup() {
    const stocks = [
      {
        name: "Apple Inc.",
        ticker: "AAPL",
        price: "135.30",
        logo: "https://i.pinimg.com/564x/db/fe/75/dbfe75990174020a7ebf8799999212d8.jpg",
        industry: "Technology",
        revenueEst: "273.9B",
        revenue: "280B",
        epsEst: "3.28",
        eps: "3.35",
      },
      {
        name: "Johnson & Johnson",
        ticker: "JNJ",
        price: "148.45",
        logo: "https://pbs.twimg.com/profile_images/1702325597014564864/bKLXlpBk_400x400.png",
        industry: "Healthcare",
        revenueEst: "82.6B",
        revenue: "85B",
        eps: "5.12",
        epsEst: "5.30",
      },
      {
        name: "Ford Motor Company",
        ticker: "F",
        price: "12.80",
        logo: "https://pbs.twimg.com/profile_images/1390283337055490048/Dt5ZJBL6_400x400.png",
        industry: "Automobile",
        revenue: "155.9B",
        revenueEst: "160B",
        eps: "1.12",
        epsEst: "1.20",
      },
      {
        name: "Exxon Mobil Corporation",
        ticker: "XOM",
        price: "45.20",
        logo: "https://pbs.twimg.com/profile_images/902558084064616448/YTOCYYnn_400x400.jpg",
        industry: "Energy",
        revenue: "264.5B",
        revenueEst: "270B",
        eps: "2.75",
        epsEst: "2.60",
      },
      {
        name: "The Coca-Cola Company",
        ticker: "KO",
        price: "53.90",
        logo: "https://pbs.twimg.com/profile_images/1612856997052923904/_fjraj44_400x400.jpg",
        industry: "Beverage",
        revenue: "39.3B",
        revenueEst: "38B",
        eps: "2.61",
        epsEst: "2.55",
      },
      {
        name: "Delta Air Lines, Inc.",
        ticker: "DAL",
        price: "39.15",
        logo: "https://s3-symbol-logo.tradingview.com/delta-air-lines--600.png",
        industry: "Aviation",
        revenue: "47.4B",
        revenueEst: "45B",
        eps: "3.15",
        epsEst: "3.20",
      },
      {
        name: "JPMorgan Chase & Co.",
        ticker: "JPM",
        price: "110.50",
        logo: "https://media2.vault.com/14343503/210909_jp-morgan_logo.jpg",
        industry: "Banking",
        revenue: "118.7B",
        revenueEst: "120B",
        eps: "10.65",
        epsEst: "10.75",
      },
      {
        name: "Netflix, Inc.",
        ticker: "NFLX",
        price: "490.45",
        logo: "https://pbs.twimg.com/profile_images/1671510098169180161/xdQUtnOJ_400x400.jpg",
        industry: "Entertainment",
        revenue: "25B",
        revenueEst: "26B",
        eps: "4.55",
        epsEst: "4.60",
      },
      {
        name: "Nike, Inc.",
        ticker: "NKE",
        price: "129.20",
        logo: "https://pbs.twimg.com/profile_images/1532044350019907585/Oo1-e1N2_400x400.jpg",
        industry: "Retail",
        revenue: "39.5B",
        revenueEst: "40B",
        eps: "3.05",
        epsEst: "3.10",
      },
      {
        name: "Walmart Inc.",
        ticker: "WMT",
        price: "137.85",
        logo: "https://pbs.twimg.com/profile_images/1676621508892819457/5aJVJDlL_400x400.jpg",
        industry: "Retail",
        revenue: "524B",
        revenueEst: "530B",
        eps: "5.29",
        epsEst: "5.25",
      },
      {
        name: "Microsoft Corporation",
        ticker: "MSFT",
        price: "210.95",
        logo: "https://i.pinimg.com/originals/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.png",
        industry: "Technology",
        revenue: "143B",
        revenueEst: "135B",
        eps: "6.70",
        epsEst: "6.80",
      },
      {
        name: "Disney",
        ticker: "DIS",
        price: "155.30",
        logo: "https://i.pinimg.com/736x/d7/18/3f/d7183f72078df410f83279c1b7bbc191.jpg",
        industry: "Entertainment",
        revenue: "69.6B",
        revenueEst: "70B",
        eps: "3.41",
        epsEst: "3.45",
      },
      {
        name: "AT&T Inc.",
        ticker: "T",
        price: "30.55",
        logo: "https://pbs.twimg.com/profile_images/1416820139857567747/tPlI2eyP_400x400.jpg",
        industry: "Telecommunications",
        revenue: "181B",
        revenueEst: "183B",
        eps: "2.35",
        epsEst: "2.30",
      },
      {
        name: "Amazon.com, Inc.",
        ticker: "AMZN",
        price: "3155.25",
        logo: "https://i.pinimg.com/564x/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg",
        industry: "E-commerce",
        revenue: "396B",
        revenueEst: "390B",
        eps: "34.60",
        epsEst: "34.50",
      },
      {
        name: "Starbucks Corporation",
        ticker: "SBUX",
        price: "88.00",
        logo: "https://pbs.twimg.com/profile_images/1712861300840370176/-8LTi8Uh_400x400.jpg",
        industry: "Food and Beverage",
        revenue: "23.5B",
        revenueEst: "24B",
        eps: "2.92",
        epsEst: "3.00",
      },
      {
        name: "General Electric Company",
        ticker: "GE",
        price: "12.40",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt49F5NWSaBNN4VxiMphJuBtzfqJBujAslE0KJ3EoumaUB_XI47jNXCHni6C_BvM0uRfo&usqp=CAU",
        industry: "Manufacturing",
        revenue: "82.6B",
        revenueEst: "80B",
        eps: "0.73",
        epsEst: "0.70",
      },
      {
        name: "Boeing Co.",
        ticker: "BA",
        price: "175.65",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSejdMAP0Ww07fFb_G3QGCQJH5bU2hN32uaSj_PGKSq2oK-PauSJbibWWuekiFadsJBwM0&usqp=CAU",
        industry: "Aerospace",
        revenue: "77.5B",
        revenueEst: "77B",
        eps: "4.32",
        epsEst: "4.30",
      },
      {
        name: "Tesla, Inc.",
        ticker: "TSLA",
        price: "680.90",
        logo: "https://i.pinimg.com/564x/3b/7e/fd/3b7efd5b4ce5321ef262d303e7a556a6.jpg",
        industry: "Automobile",
        revenue: "31.5B",
        revenueEst: "35B",
        eps: "1.95",
        epsEst: "2.10",
      },
      {
        name: "Alphabet Inc.",
        ticker: "GOOGL",
        price: "2022.35",
        logo: "https://i.pinimg.com/1200x/10/4d/91/104d91f71da1b56e29231059d85a1e93.jpg",
        industry: "Technology",
        revenue: "182.5B",
        revenueEst: "180B",
        eps: "34.11",
        epsEst: "33.50",
      },
    ];
    const news = [
      {
        title: "Tech Stocks Rally Ahead of Q4 Earnings",
        publisher: "WSJ",
        text: "In anticipation of robust fourth-quarter earnings reports, technology stocks led a significant rally on Wall Street today. Major companies are expected to announce their quarterly results later this week, setting the stage for potential market shifts. Analysts are closely watching the semiconductor sector, which has shown strong growth in recent months.",
      },
      {
        title: "Central Bank Raises Interest Rates Unexpectedly",
        publisher: "Bloomberg",
        text: "In a surprise move, the central bank announced an unexpected hike in interest rates by 25 basis points. Citing concerns over inflation and a heated property market, the decision was seen as a preemptive measure. Markets reacted with initial shock, but soon steadied as investors digested the implications.",
      },
      {
        title: "European Markets Navigate Uncertain Waters Amid Brexit Talks",
        publisher: "Financial Times",
        text: "Europe's financial markets navigated a day of uncertainty, as Brexit trade negotiations continue to cast a shadow over the continent's economic landscape. While the FTSE 100 showed moderate gains, other European indices experienced volatility. Investors remain wary of potential disruptions to cross-border trade and supply chains.",
      },
      {
        title: "Oil Prices Surge Amid Middle East Tensions",
        publisher: "Barrons",
        text: "Crude oil prices shot up today following reports of rising tensions in the Middle East. Analysts warn that prolonged conflict could result in disruptions to global supply chains.",
      },
      {
        title: "Tech Giant Acquires Startup in Multi-Billion Dollar Deal",
        publisher: "WSJ",
        text: "In a surprising move, a leading tech company announced the acquisition of a rising startup in the AI space. The deal, valued at $5 billion, signals the tech giant's aggressive push into next-generation technologies.",
      },
      {
        title: "Asian Markets Stabilize Following Week of Declines",
        publisher: "Bloomberg",
        text: "Asian markets seemed to find their footing after a tumultuous week of trading. Key indices across the region showed green, buoyed by positive export data and easing trade tensions.",
      },
      {
        title: "Central European Bank Maintains Steady Rate",
        publisher: "Financial Times",
        text: "Despite external pressures and a fluctuating currency, the Central European Bank decided to maintain its benchmark interest rate. The move was largely anticipated by market experts.",
      },
      {
        title: "Emerging Markets Show Promise Amid Global Slowdown",
        publisher: "Barrons",
        text: "As major economies grapple with slowdowns, several emerging markets are demonstrating resilience and potential for growth. Experts cite diversifying economies and young demographics as key drivers.",
      },
      {
        title: "E-commerce Platform's Q3 Profits Exceed Expectations",
        publisher: "WSJ",
        text: "In its Q3 financial results, a prominent e-commerce platform reported profits that significantly surpassed analyst expectations. Shares jumped in after-hours trading.",
      },
      {
        title: "Housing Market Sees Uptick in Mortgage Approvals",
        publisher: "Bloomberg",
        text: "The housing market received a boost as data revealed an increase in mortgage approvals. This comes after a series of regulatory changes intended to stimulate the property sector.",
      },
      {
        title: "Auto Industry Faces Challenges Amid Chip Shortage",
        publisher: "Financial Times",
        text: "Global car manufacturers are contending with production delays due to an ongoing semiconductor shortage. Industry leaders call for diversification of supply chains to prevent future disruptions.",
      },
      {
        title: "Renewable Energy Investments Set New Record",
        publisher: "Barrons",
        text: "Investments in renewable energy projects surged to a new high last month, reflecting growing commitment to sustainability among institutional investors.",
      },
      {
        title: "Pharmaceutical Giant Expands into Biotech",
        publisher: "WSJ",
        text: "A leading pharmaceutical company announced its plans to acquire a biotech firm specializing in gene therapies. The move represents a strategic shift to innovative treatment modalities.",
      },
      {
        title: "Currency Markets React to Policy Announcements",
        publisher: "Bloomberg",
        text: "Major currency pairs experienced volatility following policy announcements from central banks of the G7 nations. Analysts forecast further fluctuations in the coming weeks.",
      },
      {
        title: "Retail Sector Prepares for Holiday Shopping Season",
        publisher: "Financial Times",
        text: "With the holiday season approaching, retailers are gearing up for what they hope will be a strong finish to the year. E-commerce sales are projected to dominate, but brick-and-mortar stores anticipate steady foot traffic.",
      },
      {
        title: "Tech IPOs Gain Momentum in Second Half of Year",
        publisher: "Barrons",
        text: "Several tech startups have gone public in recent months, receiving warm receptions from investors. This trend indicates robust market appetite for innovative companies.",
      },
      {
        title: "Insurance Firms Adapt to Changing Climate Risks",
        publisher: "WSJ",
        text: "As climate-related disasters become more frequent, insurance companies are recalibrating their risk models. Some are leveraging advanced analytics to better predict and mitigate potential liabilities.",
      },
      {
        title: "Banks Report Mixed Results in Stress Tests",
        publisher: "Bloomberg",
        text: "Annual stress tests yielded mixed results for global banks. While many demonstrated resilience against economic downturn scenarios, a few are expected to revise their capital plans.",
      },
      {
        title: "Trade Talks Resume, Markets Watch Closely",
        publisher: "Financial Times",
        text: "Trade representatives from two major economies resumed discussions this week. Markets around the world are closely monitoring the talks, anticipating potential impacts on global commerce.",
      },
      {
        title: "Agricultural Sector Faces Supply Chain Disruptions",
        publisher: "Barrons",
        text: "Unprecedented weather patterns and transportation bottlenecks are challenging the agricultural sector. Producers are seeking alternative routes and storage solutions to ensure timely deliveries.",
      },
    ];

    const isModalVisible = ref(false);

    function toggleModal() {
      isModalVisible.value = !isModalVisible.value;
    }

    function updateModalVisibility(value) {
      isModalVisible.value = value;
    }

    return {
      settings,
      config,
      widget,
      stocks,
      news,
      isModalVisible,
      toggleModal,
      updateModalVisibility,
    };
  },
};
</script>

<style lang="scss" scoped></style>

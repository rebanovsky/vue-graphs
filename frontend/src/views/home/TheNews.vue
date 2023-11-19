<template>
  <div class="configuration-wrapper">
    <div class="h-[40px] flex gap-[8px]">
      <div class="right-configs w-[240px] rounded-[8px] gridlines"></div>
      <TheHeader>
        <ViewMode />
        <div
          class="feed-settings text-[12px] rounded text-slate-600 hover:text-slate-900 font-normal cursor-pointer hover:bg-slate-50 p-[4px]"
          @click="toggleModal"
        >
          <SvgIcon name="config" height="18px" width="18px" />
        </div>
      </TheHeader>
    </div>
  </div>
  <div
    class="playground-component w-[100%] flex fllex-1 gap-[8px]"
    style="height: calc(100vh - 172px)"
  >
    <div class="flex gap-[8px]">
      <div class="comp-sidenav overflow-y-auto flex gridlines rounded-[8px]">
        <div class="w-[240px]"></div>
      </div>
      <div class="news-content flex flex-col gap-[8px]">
        <div
          class="news-flow gridlines rounded-[8px] h-[40px]"
          style="width: calc(100vw - 347px)"
        >
          <div
            class="flex gap-[12px] text-[12px] items-center h-[100%] px-[6px]"
          >
            <div
              class="news-theme px-2 border border-slate-300 py-[2px] rounded-lg cursor-pointer whitespace-nowrap"
            >
              watchlist
            </div>
            <div
              class="flex gap-[12px] h-full items-center px-1 overflow-x-auto"
            >
              <div
                class="news-theme px-2 border border-slate-300 py-[2px] rounded-lg cursor-pointer whitespace-nowrap"
                v-for="subject in subjects"
              >
                {{ subject.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="news-content flex flex-1 gridlines h-[100%] w-[100%] rounded-[8px]"
          style="width: calc(100vw - 347px)"
        >
          <div
            class="main-feed p-[20px] overflow-y-auto z-[11] flex items-center"
            style="height: calc(100vh - 212px)"
          >
            <div
              class="absolute transition ease w-[100%] h-[20px] top-[46px] border-[0px] shadow-scrollshtopmain z-10 dark:shadow-scrollshtopdark"
            ></div>
            <div
              class="feed-item-wrapper w-full h-full flex flex-wrap gap-[40px]"
              v-if="items && items.length > 0"
            >
              <div
                class="feed-item-title min-w-[290px] p-[16px] flex flex-1 max-w-[600px] flex-col gap-[12px] shadow-boxshlight rounded-[8px] border-[1px] border-slate-200 h-auto"
                v-for="(i, index) in items"
                :key="`item-${index}`"
              >
                <div
                  class="item-source border-slate-200 font-medium text-[10px]"
                >
                  {{ i.source.author }}
                </div>
                <div
                  class="image-container rounded relative min-w-[260px] max-w-[570px] h-[160px] overflow-hidden"
                >
                  <img
                    :src="i.illustration"
                    alt=""
                    class="cursor-pointer absolute inset-0 min-w-[360px] max-w-[570px] h-full object-cover hover:scale-[1.025] transition ease-in-out duration-[400ms] transform"
                  />
                </div>
                <div
                  class="feed-title border-b-[0px] border-slate-200 dark:border-slate-700 py-[4px] leading-6 font-medium text-[12px]"
                >
                  {{ i.title }}
                </div>
              </div>
            </div>
            <div
              class="absolute transition ease w-[100%] h-[80px] bottom-[20px] shadow-scrollshbot z-10 dark:shadow-scrollshbotdark"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TheModal
    :show-modal="isModalVisible"
    modal-title="News settings"
    @update:showModal="updateModalVisibility"
  />
</template>

<script setup>
import config from "@/assets/icons/config_noun_project.svg";
import TheModal from "@/components/common/modals/TheModal.vue";
import TheHeader from "@/components/common/TheHeader.vue";
import useFetch from "@/composables/useFetch";
import { computed, ref, watchEffect } from "vue";
import ViewMode from "@/components/widgets/ViewMode.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";

// Reactive state
const isModalVisible = ref(false);

// Methods
function toggleModal() {
  isModalVisible.value = !isModalVisible.value;
}

function updateModalVisibility(value) {
  isModalVisible.value = value;
}

// NEWS FEED ITEMS

const subjects = [
  { name: "Rate Hike", sector: "Monetary Policy" },
  { name: "Tech Profits", sector: "Technology" },
  { name: "Crypto Regulation", sector: "Cryptocurrency" },
  { name: "Auto Merger", sector: "Automobile" },
  { name: "Renewables", sector: "Energy" },
  { name: "Inflation", sector: "Economic Policy" },
  { name: "Tech IPOs", sector: "Stock Market" },
  { name: "Oil Prices", sector: "Commodities" },
  { name: "FinTech", sector: "Venture Capital" },
  { name: "Green Bonds", sector: "Sustainable Finance" },
  { name: "Market Volatility", sector: "Stock Market" },
  { name: "Blockchain", sector: "Technology" },
  { name: "Earnings Reports", sector: "Corporate" },
  { name: "Currency Fluctuations", sector: "Forex" },
  { name: "Trade Agreements", sector: "International Trade" },
  { name: "Retail Growth", sector: "Retail" },
  { name: "Interest Rates", sector: "Banking" },
  { name: "Real Estate Trends", sector: "Real Estate" },
  { name: "Startup Funding", sector: "Venture Capital" },
  { name: "ESG Investing", sector: "Sustainable Finance" },
];

const multiItems = [
  { name: "Bloomberg", value: "bloomberg" },
  { name: "Barrons", value: "barrons" },
  { name: "Fincancial Times", value: "ft" },
  { name: "WSJ", value: "wsj" },
];

const endpoint = ref("/api/news");
const { data: news } = useFetch(endpoint);

const selectedSources = ref([]);

watchEffect(() => {
  if (selectedSources.value.length) {
    console.log("endpoint.value: ", endpoint.value);
    endpoint.value = `/api/news?sourceName=${selectedSources.value.join(",")}`;
  } else {
    endpoint.value = `/api/news`;
  }
});

const items = computed(() => {
  if (news.value && Array.isArray(news.value)) {
    return news.value
      .filter((singleNews) => singleNews.image !== null)
      .map((singleNews) => ({
        illustration: singleNews.image,
        title: singleNews.title,
        info: singleNews.text,
        source: {
          author: singleNews.source?.title,
        },
      }));
  }
  return [];
});
</script>

<style lang="scss" scoped>
/* Example for smaller screens */
@media (max-width: 600px) {
  .feed-item-title {
    min-width: 100%; /* Full width on small screens */
    max-width: 100%;
  }
}

/* Example for larger screens */
@media (min-width: 1200px) {
  .feed-item-title {
    min-width: 290px;
    max-width: 400px; /* Larger max width for larger screens */
  }
}
</style>

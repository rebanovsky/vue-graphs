<template>
    <div class="container flex flex-col gap-[4px]">
      <div class="company-earnings flex gap-[28px] overflow-x-auto p-[12px]">
        <div
          class="company-announcement shadow-boxsh-100 border-[0px] border-slate-200 dark:border-slate-700 rounded-[20px] p-[14px] w-[auto] flex flex-col"
          v-for="company in earnings"
          :key="company.timestamp"
        >
          <div
            class="company-title flex items-baseline gap-[8px] border-b-[1px] border-slate-300 dark:border-slate-700 pb-[4px]"
          >
            <div
              class="company-logo text-[10px] border-[0px] rounded-[2px] h-[16px] translate-y-[2px]"
            >
              <img :src="company.logo" class="rounded-[2px] h-[16px]" />
            </div>
            <div class="company-data flex gap-[12px] text-[12px] items-baseline">
              <div class="company-name cursor-pointer">{{ company.name }}</div>
              <div class="company-price font-medium">{{ company.price }}</div>
              <div
                class="company-price-chg text-[11px] text-harlequin-300 font-medium"
              >
                {{ company.priceChange }}
              </div>
            </div>
          </div>
          <div
            class="company-earnings text-[11px] flex gap-[22px] justify-between pt-[4px] h-[60px]"
          >
            <div
              class="index-graph flex flex-col border-[0px] border-slate-300 justify-center"
            >
              <Transition name="fade" mode="out-in">
                <TheGraph
                  :is-graph="'line'"
                  height="80px"
                  width="259px"
                  :data="spy"
                  :chart-height="'32px'"
                />
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import useFetch from "@/composables/useFetch";
  import { ref } from "vue";
  import TheGraph from "../common/graphs/TheGraph.vue";
  
  export default {
    components: { TheGraph },
    setup() {
      const earnings = [
        {
          name: "S&P 500",
          ticker: "SPY",
          logo: "https://flagpedia.net/data/flags/w1160/us.webp",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
        {
          name: "Euronext 100",
          ticker: "EU",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/2560px-Flag_of_Europe.svg.png",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
        {
          name: "Shanghai Composite",
          ticker: "TSLA",
          logo: "https://flagpedia.net/data/flags/w1160/cn.webp",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
        {
          name: "Nikkei",
          ticker: "",
          logo: "https://flagpedia.net/data/flags/w1160/jp.webp",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
        {
          name: "DAX",
          ticker: "MSFT",
          logo: "https://flagpedia.net/data/flags/w1160/de.webp",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
        {
          name: "Bovespa",
          ticker: "",
          logo: "https://flagpedia.net/data/flags/w1160/br.webp",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
        {
          name: "FTSE 100",
          ticker: "MSFT",
          logo: "https://flagpedia.net/data/flags/w1160/gb.webp",
          timestamp: "12.03.20",
          price: "178.43$",
          priceChange: "3.89%",
        },
      ];
  
      const stockEndpoint = ref("/api/stock-price");
      const { data: spy } = useFetch(stockEndpoint);
      return { earnings, spy };
    },
  };
  </script>
  
  <style scoped>
  .company-earnings::-webkit-scrollbar {
    display: none;
  }
  
  .company-earnings {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  </style>
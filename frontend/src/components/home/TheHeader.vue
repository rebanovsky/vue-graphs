<template>
  <div class="relevant flex gap-[28px] overflow-x-auto p-[12px]">
    <div
      class="relevant-item border-slate-300 border-[1px] p-[4px] rounded-[6px] h-[140px] w-[80px]"
      v-for="(i, index) in 16"
      :key="index"
    >
      <div
        class="graph-area flex px-[8px] items-center rounded-[2px] text-slate-500 border-[0px] border-slate-400 text-[12px] font-normal"
      >
        #hashtag
      </div>
      <div
        class="graph-area flex justify-center items-center h-[100px] rounded-[2px] text-slate-500 border-[1px] border-slate-300"
      >
        Img
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

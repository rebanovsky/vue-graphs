<template>
  <div class="fund-holdings-wrapper">
    <div
      class="w-[540px] h-[100px] gridlines rounded"
    ></div>
    <div class="holdings-toggler h-[20px] flex justify-end mt-[12px]">
      <font-awesome-icon
        @click="isHoldings = 'table'"
        icon="fa-solid fa-table"
        class="mx-[8px] text-[13px] text-slate-700 hover:bg-slate-300 transition ease duration-75 p-[3px] rounded cursor-pointer"
      />
      <div
        @click="isHoldings = 'bubbles'"
        class="bubble-selector hover:bg-slate-300 transition ease duration-75 p-[3px] rounded cursor-pointer"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 200 210"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="149" cy="66" r="44" class="fill-slate-700" />
          <circle cx="69" cy="110" r="31" class="fill-slate-700" />
          <circle cx="131" cy="148" r="18" class="fill-slate-700" />
          <mask id="path-4-inside-1_1_13" fill="white">
            <path
              d="M0 38C0 22.536 12.536 10 28 10H200V182C200 197.464 187.464 210 172 210H28C12.536 210 0 197.464 0 182V38Z"
            />
          </mask>
          <path
            d="M0 10H200H0ZM200 182C200 214.033 174.033 240 142 240H28C-4.03252 240 -30 214.033 -30 182L30 180H172C187.464 180 200 180 200 180V182ZM28 240C-4.03252 240 -30 214.033 -30 182V68C-30 35.9675 -4.03252 10 28 10H30C30 10 30 22.536 30 38V180L28 240ZM200 10V210V10Z"
            class="fill-slate-700"
            mask="url(#path-4-inside-1_1_13)"
          />
        </svg>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <div class="holdings-table-wrapper" v-if="isHoldings == 'table'">
        <div class="comp-tertiary h-[24px] flex mt-[12px]">
          <div class="tert-item w-[250px] text-slate-500 px-[8px]">
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Name</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
          <div
            class="tert-item w-[90px] text-slate-500 flex justify-end px-[8px]"
          >
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Weight</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
          <div
            class="tert-item w-[100px] text-slate-500 px-[8px] flex justify-end"
          >
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Market value</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
          <div
            class="tert-item w-[100px] text-slate-500 flex justify-end px-[8px]"
          >
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">&Delta; shares</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
        </div>
        <div
          :class="{ '!w-[100vw]': isMobileDevice }"
          class="holdings-table text-[11px] border-t-[1px] border-slate-400 dark:border-darkboxborder transition ease"
        >
          <template v-if="loading" div="loading-animation">
            <MainSpinner />
          </template>
          <template v-else>
            <div
              class="table-data-row hover:bg-slate-300 dark:hover:bg-slate-700 border-b-[1.1px] dark:border-darkbboxborder border-bboxborder"
              v-for="(h, index) in holdings"
              :key="index"
            >
              <div class="shrinked-row" @click="h.showRow = !h.showRow">
                <div class="cell w-[250px]">
                  <a
                  target="_blank"
                    @click.stop="showRow"
                    :href="'/company/' + h.symbol"
                    class="ticker text-slate-900 dark:text-slate-300 transition ease"
                  >
                    {{ h.securityName }}
                  </a>
                </div>
                <div class="cell w-[90px] flex justify-end">
                  {{ h.weight.toFixed(1) }}%
                </div>
                <div class="cell w-[100px] flex justify-end">
                  ${{
                    Intl.NumberFormat("en", {
                      notation: "compact",
                    }).format(h.marketValue)
                  }}
                </div>
                <div
                  class="cell w-[100px] flex justify-end"
                  v-if="h.changeInSharesNumberPercentage != 0"
                >
                  {{ h.changeInSharesNumberPercentage.toFixed(1) }}%
                </div>
                <div class="cell w-[100px] flex justify-end" v-else>-</div>
              </div>
              <Transition name="slide" mode="out-in">
                <div
                  class="expanded-row w-[560px] bg-expbox dark:bg-darkexpbox shadow-expboxsh"
                  v-if="h.showRow"
                >
                  <div class="insider-box">
                    <div class="industry-cell cell">{{ h.industryTitle }}</div>
                    <div class="calbox-d">Historical ownership</div>
                  </div>
                </div>
              </Transition>
            </div>
          </template>
        </div>
      </div>
      <div class="holdings-bubbles" v-else-if="isHoldings == 'bubbles'">
        <div class="bubblechart-section flex">
          <div class="bubbles-wrapper">
            <template v-if="loading">
              <MainSpinner />
            </template>
            <template v-else>
              <div class="funds-bubbles">
                <BubbleGraph :data="fundBubbles" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import axios from "axios";
import { ref, watchEffect } from "vue";
import keys from "@/assets/keys/keys";
import MainSpinner from "@/components/widgets/MainSpinner.vue";
import BubbleGraph from "@/components/graphs/BubbleGraph.vue";

export default {
  props: ["cik"],
  components: { MainSpinner, BubbleGraph },
  setup(props) {
    let loading = ref(true);
    let holdings = ref("");
    let key = keys[0].value;
    let showRow = ref(false); // to expand/shrink calendar row
    let showInfo = ref(false); // show/hide info bubble
    let isHoldings = ref("table");
    let fundBubbles = ref([]);

    watchEffect(() => {
      axios("").then((response) => {
        let data = response.data;

        data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        let nyOptions = {
          timeZone: "America/Sao_Paulo",
        };

        let nyDate = new Date().toLocaleString("en-US", nyOptions);

        nyDate = new Date(nyDate).getTime();

        data.forEach((d) => {
          d.date = new Date(d.date).getTime();

          d.date = Math.round((nyDate - d.date) / 86400000) + "d";
        });

        holdings.value = data;

        loading.value = false;
      });

      axios("").then((response) => {
        let data = response.data;

        data.forEach(async (d) => {
          d.sector = await axios(
            `/api/security?symbol=${d.symbol}`
          ).then((r) => {
            let data = r.data.data.securities[0];

            return data.sector;
          });
        });

        fundBubbles.value = data;
      });
    });

    // const formClass = (item) => {
    //   if (item.form_type === "4") {
    //     return "bg-[#0055F7]";
    //   } else if (item.form_type === "8-K") {
    //     return "bg-[#F30303]";
    //   } else {
    //     return "bg-[#1F9100]";
    //   }
    // };

    return { loading, holdings, showRow, showInfo, isHoldings, fundBubbles };
  },
};
</script>

<style>
.holdings-table {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 321px);
  width: 540px;
}
</style>

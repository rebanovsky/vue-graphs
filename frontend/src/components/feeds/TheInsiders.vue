<template>
  <div class="page-wrapper">
    <div class="table">
      <TransitionGroup tag="div" name="item-transition">
        <div
          class="table-data-row transition ease"
          v-for="(s, index) in socketItems"
          :key="index"
          :class="{
            '!w-[100vw]': isMobileDevice,
          }"
        >
          <div class="flex items-center">
            <div
              v-if="!isMobileDevice"
              class="new-item-tag w-[40px] text-highlight dark:text-highlightdark"
            >
              new
            </div>
            <div
              class="shrinked-row bg-slate-100 dark:bg-slate-900 border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-700"
              @click="s.showRow = !s.showRow"
              :class="{ '!w-[100vw] px-[4px]': isMobileDevice }"
            >
              <div
                class="w-[60px] lg-cell"
                :class="{
                  '!w-[16vw]': isMobileDevice == true,
                }"
              >
                {{ timeSince(s.filingDate) }}
              </div>
              <div
                class="w-[70px] lg-cell"
                :class="{
                  '!w-[14vw]': isMobileDevice == true,
                }"
              >
                {{ s.symbol }}
              </div>
              <div
                class="w-[280px] lg-cell"
                :class="{
                  '!w-[45vw]': isMobileDevice == true,
                }"
              >
                {{ s.companyName }}
              </div>
              <div
                class="w-[90px] lg-cell flex justify-center"
                :class="{
                  '!w-[10vw]': isMobileDevice == true,
                }"
              >
                <div
                  class="flex items-center font-medium text-[10px]"
                  :class="[
                    s.transactionType == 'BUY'
                      ? 'text-green-50'
                      : 'text-red-60',
                  ]"
                >
                  <div
                    :class="[
                      s.transactionType == 'BUY' ? 'bg-green-50' : 'bg-red-60',
                    ]"
                    v-if="!isMobileDevice"
                    class="transaction-square rounded-[2px] mr-[6px] w-[6px] h-[6px] border-[1px]"
                  ></div>
                  <div class="sell-buy">{{ s.transactionType }}</div>
                </div>
              </div>
              <div
                class="w-[100px] flex justify-end lg-cell"
                :class="{
                  '!w-[15vw]': isMobileDevice == true,
                }"
              >
                ${{
                  Intl.NumberFormat("en", { notation: "compact" }).format(
                    s.volume.toFixed(0)
                  )
                }}
              </div>
            </div>
            <div class="dummy w-[40px]" v-if="!isMobileDevice"></div>
          </div>
          <Transition name="slide" mode="out-in">
            <div
              class="expanded-data-box flex justify-center !w-[680px]"
              v-if="s.showRow && !isMobileDevice"
            >
              <div
                class="expanded-row w-[600px] bg-expbox dark:bg-darkexpbox shadow-expboxsh transition ease"
              >
                <div class="insider-box flex justify-between overflow-hidden">
                  <div
                    class="insider-box-l py-[5px] mr-[8px] flex flex-col justify-between"
                  >
                    <div
                      class="insider-info flex flex-col h-[100%] justify-between"
                    >
                      <div class="insider-info-upper">
                        <div class="flex mb-[0px]">
                          <div
                            class="expbox-value w-[160px] text-slate-700 dark:text-slate-400 capitalize truncate"
                          >
                            {{ s.typeOfOwner }}
                          </div>
                        </div>
                        <div class="flex mb-[0px]">
                          <div
                            class="exbox-value w-[160px] capitalize font-medium truncate"
                          >
                            {{ s.reportingName }}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          class="ib-box-title text-slate-700 dark:text-slate-400"
                        >
                          Original documents
                        </div>
                        <div class="ib-box-value font-medium">
                          <a
                            target="_blank"
                            :href="s.link"
                            class="insider-info-down font-medium"
                            >FORM 4</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="insider-box-r py-[5px] h-[100%] w-[100%] flex justify-end ml-[8px]"
                    v-if="s.transactionType == 'BUY'"
                  >
                    <div
                      class="insider-box-values w-[280px] flex flex-col justify-between mr-[16px]"
                    >
                      <div class="top-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Transaction date
                          </div>
                          <div class="ib-box-value font-medium">
                            {{ s.transactionDate }}
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Volume
                          </div>
                          <div class="ib-box-value font-medium">
                            ${{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(s.volume)
                            }}
                          </div>
                        </div>
                      </div>
                      <div class="below-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Bought
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(s.securitiesTransacted)
                            }}
                            shares
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            After transaction
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(s.securitiesOwned)
                            }}
                            shares
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="insiderbox-viz w-[76px] flex justify-end">
                      <div
                        class="stacked-buys flex justify-start items-center"
                        v-if="s.buys"
                      >
                        <PieInsider :data="s.buys" class="translate-x-[100%]" />
                        <div
                          class="insiderpie-value w-[88px] h-[88px] text-[14px] text-green-50 dark:text-green-60 font-medium flex justify-center items-center"
                        >
                          +{{ ((s.buys.b / s.buys.a) * 100).toFixed(1) }}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="insider-box-r py-[5px] h-[100%] w-[100%] flex justify-end ml-[8px]"
                    v-if="s.transactionType == 'SELL'"
                  >
                    <div
                      class="insider-box-values w-[280px] flex flex-col justify-between mr-[16px]"
                    >
                      <div class="top-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Transaction date
                          </div>
                          <div class="ib-box-value font-medium">
                            {{ s.transactionDate }}
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Volume
                          </div>
                          <div class="ib-box-value font-medium">
                            ${{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(s.volume)
                            }}
                          </div>
                        </div>
                      </div>
                      <div class="below-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Sold
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(s.securitiesOwned)
                            }}
                            shares
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            After transaction
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(s.securitiesOwned)
                            }}
                            shares
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="indsiderbox-viz w-[76px] flex justify-end">
                      <div
                        class="stacked-sell flex justify-start items-center"
                        v-if="s.sells"
                      >
                        <PieInsider
                          :data="s.sells"
                          :dark="dark"
                          class="translate-x-[100%]"
                        />
                        <div
                          class="insiderpie-value w-[88px] h-[88px] text-[14px] text-red-60 font-medium flex justify-center items-center"
                        >
                          -{{
                            (
                              (s.sells.b / (s.sells.a + s.sells.b)) *
                              100
                            ).toFixed(1)
                          }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </TransitionGroup>
      <template v-if="isLoading" div="loading-animation">
        <Transition name="fade" mode="out-in">
          <MainSpinner />
        </Transition>
      </template>
      <template v-else>
        <div
          class="table-data-row transition ease "
          v-for="(i, index) in insiders"
          :key="index"
        >
          <div class="flex items-center">
            <div class="dummy w-[40px]"></div>
            <div
              class="shrinked-row border-b-[1px] bg-slate-100 dark:bg-slate-900 transition ease dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-800"
              @click="i.showRow = !i.showRow"
            >
              <div class="w-[60px] lg-cell">
                {{ timeSince(i.filingDate) }}
              </div>
              <div class="w-[70px] lg-cell">
                {{ i.symbol }}
              </div>
              <div class="w-[280px] lg-cell">
                {{ i.companyName }}
              </div>
              <div class="w-[90px] lg-cell flex justify-center">
                <div
                  class="flex items-center font-medium text-[11px]"
                  :class="[
                    i.transactionType == 'BUY'
                      ? 'text-green-50 dark:text-green-60'
                      : 'text-red-60',
                  ]"
                >
                  <div
                    :class="[
                      i.transactionType == 'BUY'
                        ? 'bg-green-50 dark:bg-green-60'
                        : 'bg-red-60',
                    ]"
                    class="transaction-square rounded-[2px] mr-[6px] w-[7px] h-[7px] border-[1px]"
                  ></div>
                  <div class="sell-buy">{{ i.transactionType }}</div>
                </div>
              </div>
              <div class="w-[100px] flex justify-end lg-cell">
                ${{
                  Intl.NumberFormat("en", { notation: "compact" }).format(
                    i.volume.toFixed(0)
                  )
                }}
              </div>
            </div>
            <div class="dummy w-[40px]"></div>
          </div>
          <Transition name="slide" mode="out-in">
            <div
              class="expanded-data-box text-[12px] flex justify-center !w-[680px]"
              v-if="i.showRow"
            >
              <div
                class="expanded-row w-[600px] bg-expbox dark:bg-darkexpbox shadow-expboxsh transition ease"
              >
                <div class="insider-box flex justify-between overflow-hidden">
                  <div
                    class="insider-box-l py-[5px] mr-[8px] flex flex-col justify-between"
                  >
                    <div
                      class="insider-info flex flex-col h-[100%] justify-between"
                    >
                      <div class="insider-info-upper">
                        <div class="flex mb-[0px]">
                          <div
                            class="expbox-value w-[160px] text-slate-700 dark:text-slate-400 capitalize truncate"
                          >
                            {{ i.typeOfOwner }}
                          </div>
                        </div>
                        <div class="flex mb-[0px]">
                          <div
                            class="exbox-value w-[160px] capitalize font-medium truncate"
                          >
                            {{ i.reportingName }}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          class="ib-box-title text-slate-700 dark:text-slate-400"
                        >
                          Original documents
                        </div>
                        <div class="ib-box-value font-medium">
                          <a
                            target="_blank"
                            :href="i.link"
                            class="insider-info-down font-medium"
                            >FORM 4</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="insider-box-r py-[5px] h-[100%] w-[100%] flex justify-end ml-[8px]"
                    v-if="i.transactionType == 'BUY'"
                  >
                    <div
                      class="insider-box-values w-[280px] flex flex-col justify-between mr-[16px]"
                    >
                      <div class="top-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Transaction date
                          </div>
                          <div class="ib-box-value font-medium">
                            {{ i.transactionDate }}
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Volume
                          </div>
                          <div class="ib-box-value font-medium">
                            ${{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(i.volume)
                            }}
                          </div>
                        </div>
                      </div>
                      <div class="below-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Bought
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(i.securitiesTransacted)
                            }}
                            shares
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            After transaction
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(i.securitiesOwned)
                            }}
                            shares
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="insiderbox-viz w-[76px] flex justify-end">
                      <div
                        class="stacked-buys flex justify-start items-center"
                        v-if="i.buys"
                      >
                        <PieInsider
                          :data="i.buys[0]"
                          :dark="dark"
                          class="translate-x-[100%]"
                        />
                        <div
                          class="insiderpie-value w-[88px] h-[88px] text-[14px] text-green-50 dark:text-green-60 font-medium flex justify-center items-center"
                        >
                          <div v-if="i.buys[0].b / i.buys[0].a > 1">
                            +{{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format((i.buys[0].b / i.buys[0].a) * 100)
                            }}%
                          </div>
                          <div v-else>
                            +{{
                              ((i.buys[0].b / i.buys[0].a) * 100).toFixed(1)
                            }}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="insider-box-r py-[5px] h-[100%] w-[100%] flex justify-end ml-[8px]"
                    v-if="i.transactionType == 'SELL'"
                  >
                    <div
                      class="insider-box-values w-[280px] flex flex-col justify-between mr-[16px]"
                    >
                      <div class="top-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Transaction date
                          </div>
                          <div class="ib-box-value font-medium">
                            {{ i.transactionDate }}
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Volume
                          </div>
                          <div class="ib-box-value font-medium">
                            $
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(i.volume)
                            }}
                          </div>
                        </div>
                      </div>
                      <div class="below-values h-[36px] flex justify-between">
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            Sold
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(i.securitiesTransacted)
                            }}
                            shares
                          </div>
                        </div>
                        <div class="ib-box w-[120px]">
                          <div
                            class="ib-box-title text-slate-700 dark:text-slate-400"
                          >
                            After transaction
                          </div>
                          <div class="ib-box-value font-medium">
                            {{
                              Intl.NumberFormat("en", {
                                notation: "compact",
                              }).format(i.securitiesOwned)
                            }}
                            shares
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="indsiderbox-viz w-[76px] flex justify-end">
                      <div
                        class="stacked-sell flex justify-start items-center"
                        v-if="i.sells"
                      >
                        <PieInsider
                          :data="i.sells[0]"
                          :dark="dark"
                          class="translate-x-[100%]"
                        />
                        <div
                          class="insiderpie-value w-[88px] h-[88px] text-[14px] text-red-60 font-medium flex justify-center items-center"
                        >
                          -{{
                            (
                              (i.sells[0].b / (i.sells[0].a + i.sells[0].b)) *
                              100
                            ).toFixed(1)
                          }}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  ref,
  watchEffect,
  computed,
  onMounted,
  onUnmounted,
  reactive,
} from "vue";
import MainSpinner from "@/components/widgets/MainSpinner.vue";
import SmallSpinner from "@/components/widgets/SmallSpinner.vue";
import { useScreenObserver } from "@/composables/useScreenObserver";
import io from "socket.io-client";
import PieInsider from "@/components/common/graphs/PieInsider.vue";

export default {
  components: {
    MainSpinner,
    SmallSpinner,
    PieInsider,
  },
  props: {
    dark: "dark",
    page: {
      type: Number,
      default: 1,
    },
  },
  setup(props, context) {
    const { isLargeScreen, isMobileDevice } = useScreenObserver();

    // Conditionals //

    let isHovered = ref(false);
    let showRow = ref(false); // to expand/shrink calendar row
    let showInfo = ref(false);
    let showFilters = ref(false);
    let isTimePeriod = ref("day");

    let isDark = ref("");

    isDark.value = props.dark;

    // Timepassed function to calculate time elapsed //

    const currentTime = ref(new Date());

    function adjustedCurrentTime() {
      // Create a new Date object that is 4 hours earlier
      return new Date(currentTime.value.getTime() - 4 * 60 * 60 * 1000);
    }

    const timeSince = computed(() => (date) => {
      const dateItem = new Date(date);
      const diffInSeconds = Math.floor(
        (adjustedCurrentTime() - dateItem) / 1000
      );
      const days = Math.floor(diffInSeconds / 86400);
      const hours = Math.floor((diffInSeconds % 86400) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);

      if (days > 0) {
        return `${days}d`;
      } else if (hours > 0) {
        return `${hours}h`;
      } else {
        return `${minutes} min`;
      }
    });

    let timer;

    // WS functions //

    const socketItems = ref([]);

    const socket = io("");

    const addItem = (item) => {
      socketItems.value.unshift(item);
    };

    // Lifecycle hooks //

    onMounted(() => {
      socket.on("newInsiderItem", addItem);

      timer = setInterval(() => {
        currentTime.value = new Date();
      }, 60000); // Update every minute (60,000 ms).
    });

    onUnmounted(() => {
      socket.off("newInsiderItem", addItem);
      socket.disconnect();

      clearInterval(timer);
    });

    // Data fetching //

    const insiders = ref([]);
    const isLoading = ref(true);
    const currentPage = computed(() => props.page);
    const stockPrices = ref([]);
    const dailyChg = ref("");

    const fetchInsiders = async () => {
      // Fetch data from API based on the 'page' prop
      let response = await fetch(
        `/api/insiders?page=${currentPage.value}`
      );

      let data = await response.json();

      data = data.data.insiders;

      // Add isLoadingSpinner property to each stock
      const processedData = data.map((stock) => {
        return { ...stock, isLoadingSpinner: true };
      });

      insiders.value = [...insiders.value, ...processedData];

      isLoading.value = false;

      // Emit 'fetchMore' event when fetching is done
      context.emit("fetchMore");
    };

    const loadingStates = reactive({});

    const isLoadingSpinner = (index) => {
      return loadingStates[index];
    };

    const fetchAllData = async () => {
      await fetchInsiders();
    };

    watchEffect(() => {
      fetchAllData();
    });

    return {
      showRow,
      isHovered,
      showInfo,
      insiders,
      isLoading,
      isTimePeriod,
      socketItems,
      showFilters,
      isDark,
      isMobileDevice,
      timeSince,
      stockPrices,
      isLoadingSpinner,
    };
  },
};
</script>

<style>
.slideside-enter-active {
  transition: all 0.2s ease;
}

.slideside-leave-active {
  transition: all 0.2s ease;
}

.slideside-enter-to,
.slide-leave-from {
  width: 150px;
  overflow: hidden;
}

.slideside-enter-from,
.slide-leave-to {
  overflow: hidden;
  width: 0;
}

.checkbox-name {
  width: 80px;
}

.rss-box {
  display: flex;
  width: auto;
  height: 100px;
  padding: 10px;
  overflow-y: auto;
}

.tert-wrapper {
  display: flex;
  align-items: center;
  width: auto;
  border-radius: 6px;
  cursor: default;
}

.filter-toggle {
  margin: 0 0 0 4px;
  font-size: 6px;
}

.rss-name {
  width: 190px !important;
  display: flex;
  justify-content: flex-start !important;
}

.tert-item.filed-at {
  width: 55px;
  display: flex;
  justify-content: flex-start;
  padding: 0 2px;
}

.tert-item.rss-ticker {
  width: 65px;
  display: flex;
  justify-content: flex-start;
}

.tert-item.form-type {
  width: 60px;
  display: flex;
  justify-content: flex-end;
}

.rss-table {
  height: calc(100vh - 215px);
  width: 680px;
}

.rss-mobile {
  height: calc(100vh - 189px) !important;
}

.rss-ticker {
  width: 65px;
}

.form-bg {
  width: auto;
  height: 15px;
  border-radius: 2px;
  padding: 0 5px;
  font-weight: 500;
}

.form-row {
  width: 60px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>

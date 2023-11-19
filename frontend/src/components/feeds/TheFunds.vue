<template>
  <div class="table-wrapper flex">
    <div :class="[isMobileDevice ? 'table-mobile' : 'table']">
      <div
        class="rss-table text-[11px] transition ease"
        :class="{
          '!w-[100vw] overflow-x-hidden rss-mobile': isMobileDevice == true,
        }"
      >
        <TransitionGroup tag="div" name="item-transition">
          <div
            class="table-data-row bg-slate-100 dark:bg-slate-900 transition ease"
            v-for="s in socketItems.slice().reverse()"
            :key="s._id"
            :class="{
              '!w-[100vw] px-[4px]': isMobileDevice,
            }"
          >
            <div class="flex items-center">
              <div
                class="new-item-tag w-[40px] text-highlight dark:text-highlightdark"
              >
                new
              </div>
              <div
                class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-800"
                @click="s.showRow = !s.showRow"
                :class="{ '!w-[100vw]': isMobileDevice }"
              >
                <div
                  class="w-[60px] lg-cell"
                  :class="{
                    '!w-[15vw]': isMobileDevice == true,
                  }"
                >
                  {{ timeSince(s.acceptedDate) }}
                </div>
                <div class="w-[60px] lg-cell" v-if="!isMobileDevice">
                  {{ s.period }}
                </div>
                <div
                  class="w-[240px] lg-cell"
                  :class="{
                    '!w-[50vw]': isMobileDevice == true,
                  }"
                >
                  {{ s.investorName }}
                </div>
                <div
                  class="w-[90px] lg-cell flex justify-end"
                  :class="{
                    '!w-[20vw]': isMobileDevice == true,
                  }"
                >
                  ${{
                    Intl.NumberFormat("en", { notation: "compact" }).format(
                      s.marketValue.toFixed(0)
                    )
                  }}
                </div>
                <div
                  class="w-[150px] flex justify-end lg-cell"
                  :class="{
                    '!w-[20vw]': isMobileDevice == true,
                  }"
                >
                  {{ s.performancePercentage1year.toFixed(0) }}%
                </div>
              </div>
              <div class="dummy w-[40px]"></div>
            </div>
          </div>
        </TransitionGroup>
        <template v-if="isLoading" div="loading-animation">
          <MainSpinner />
        </template>
        <template v-else>
          <div
            class="table-data-row bg-slate-100 dark:bg-slate-900 transition ease"
            v-for="f in funds"
            :key="f.id"
            :class="{
              '!w-[100vw]': isMobileDevice,
            }"
          >
            <div class="flex items-center">
              <div class="dummy w-[40px]"></div>
              <div
                class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-800"
                @click="
                  (f.showRow = !f.showRow),
                    fetchDetails(f.cik, f.date.slice(0, 10)),
                    fetchHist(f, f.cik, f.acceptedDate)
                "
                :class="{ '!w-[100vw]  px-[4px]': isMobileDevice }"
              >
                <div
                  class="w-[60px] lg-cell"
                  :class="{
                    '!w-[17vw]': isMobileDevice == true,
                  }"
                >
                  {{ timeSince(f.acceptedDate) }}
                </div>
                <div class="w-[60px] lg-cell" v-if="!isMobileDevice">
                  {{ f.period }}
                </div>
                <div
                  class="w-[230px] lg-cell"
                  :class="{
                    '!w-[55vw]': isMobileDevice == true,
                  }"
                >
                  {{ f.investorName }}
                </div>
                <div
                  class="w-[100px] lg-cell flex justify-end"
                  :class="{
                    '!w-[28vw]': isMobileDevice == true,
                  }"
                >
                  ${{
                    Intl.NumberFormat("en", { notation: "compact" }).format(
                      f.marketValue.toFixed(0)
                    )
                  }}
                </div>
                <div
                  class="w-[150px] flex justify-end lg-cell"
                  v-if="!isMobileDevice"
                >
                  {{ f.performancePercentage1year.toFixed(0) }}%
                </div>
              </div>
              <div class="dummy w-[40px]" v-if="!isMobileDevice"></div>
            </div>
            <Transition name="slidemedium" mode="out-in">
              <div
                class="expanded-data-box flex justify-center !w-[680px]"
                v-if="f.showRow && !isMobileDevice"
              >
                <div
                  class="expanded-row w-[600px] bg-expbox dark:bg-darkexpbox shadow-expboxsh transition ease"
                >
                  <div class="funds-box overflow-hidden flex justify-between">
                    <div class="flex flex-col justify-between">
                      <div
                        class="funds-overview-data w-[100%] h-[40px] flex justify-between items-center"
                      >
                        <div class="report-top-overview flex">
                          <div class="top-item-wrapper flex flex-col mr-[20px]">
                            <div class="top-overview-item dark:text-slate-400">
                              Portfolio size
                            </div>
                            <div
                              class="top-item-value mt-[2px] font-medium text-[12px]"
                            >
                              {{ f.portfolioSize }}
                            </div>
                          </div>
                          <div class="top-item-wrapper flex flex-col mx-[20px]">
                            <div class="top-overview-wrapper flex">
                              <div
                                class="top-overview-item mr-[2px] dark:text-slate-400"
                              >
                                Added
                              </div>
                              <div>
                                <font-awesome-icon
                                  class="text-[10px] ml-[4px] text-green-50"
                                  :icon="['fas', 'plus']"
                                />
                              </div>
                            </div>
                            <div
                              class="top-item-value mt-[2px] font-medium text-[12px]"
                            >
                              {{ f.securitiesAdded }} shares
                            </div>
                          </div>
                          <div class="top-item-wrapper flex flex-col mx-[20px]">
                            <div class="top-overview-wrapper flex">
                              <div
                                class="top-overview-item mr-[4px] dark:text-slate-400"
                              >
                                Removed
                              </div>
                              <div>
                                <font-awesome-icon
                                  class="text-[10px] ml-[4px] text-red-50"
                                  :icon="['fas', 'minus']"
                                />
                              </div>
                            </div>
                            <div
                              class="top-item-value mt-[2px] font-medium text-[12px]"
                            >
                              {{ f.securitiesRemoved }} shares
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="details-btn flex items-start dark:text-slate-400"
                      >
                        <div
                          class="holdings-details-btn flex items-center cursor-pointer text-slate-500 dark:hover:text-slate-100 hover:text-slate-900 px-[6px] py-[1px] rounded-[4px] transition ease duration-75"
                          @click="f.showPopup = !f.showPopup"
                        >
                          <div class="details-name font-normal text-[12px]">
                            HOLDINGS
                          </div>
                          <div class="files-icon">
                            <font-awesome-icon
                              class="text-[12px] ml-[8px]"
                              :icon="['fas', 'file-lines']"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Transition name="fade" mode="out-in">
                      <div
                        class="funds-performance h-[68px] w-[250px] mt-[2px]"
                        v-if="f.hist"
                      >
                        <div
                          class="font-medium flex items-center tracking-wide text-slate-700 dark:text-slate-400 ml-[12px] text-[10px]"
                        >
                          <div>PERFORMANCE</div>

                          <div
                            class="ml-[8px] text-[8px] border-[1px] border-slate-500 w-[11px] h-[11px] flex items-center justify-center rounded-[11px] cursor-pointer"
                          >
                            <div class="mt-[1px]">i</div>
                          </div>
                        </div>
                        <div v-if="f.hist.historical" class="mt-[16px]">
                          <LineChart :data="f.hist.historical" />
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </Transition>
            <transition name="fade">
              <div
                v-if="f.showPopup"
                class="popup-overlay"
                @click.self="f.showPopup = !f.showPopup"
              >
                <div
                  class="popup bg-slate-100 flex flex-col justify-between dark:bg-darkpopup w-[600px] h-[480px] p-[20px] shadow-popupsh dark:shadow-noshadow"
                >
                  <div class="popup-header flex justify-between items-center">
                    <div class="popup-header-left flex text-[16px]">
                      <div class="font-medium mr-[8px]">
                        {{ f.investorName }}
                      </div>
                    </div>
                    <div class="popup-close">
                      <font-awesome-icon
                        @click="f.showPopup = !f.showPopup"
                        icon="fa-solid fa-xmark"
                        class="text-[20px] cursor-pointer hover:text-slate-500 transition ease duration-75"
                      />
                    </div>
                  </div>
                  <div
                    class="pop-up-description mb-[20px] mt-[4px] text-[12px] font-medium text-slate-700 dark:text-slate-400"
                  >
                    HOLDINGS AT {{ f.date.slice(0, 10) }}
                  </div>
                  <div class="popup-content w-[100%] h-[100%]">
                    <div class="popup-holdings w-[100%]">
                      <div class="flex flex justify-start">
                        <div class="fund-holdings">
                          <div
                            class="top-content-heading flex text-[11px] border-b-[1px] border-slate-400"
                          >
                            <div class="holding-title mx-[4px] w-[300px]">
                              COMPANY
                            </div>
                            <div
                              class="holding-title mx-[12px] w-[96px] justify-end flex"
                            >
                              VALUE
                            </div>
                            <div
                              class="holding-title mx-[12px] w-[96px] justify-end flex"
                            >
                              SHARES
                            </div>
                          </div>
                          <div
                            class="popup-row-wrapper h-[320px] overflow-y-auto text-[12px]"
                          >
                            <div
                              class="popup-row flex items-center justify-between border-b-[1px] border-slate-300 dark:border-slate-800 py-[8px]"
                              v-for="(d, index) in details"
                              :key="index"
                            >
                              <div
                                class="top-name w-[300px] mx-[4px] flex items-center"
                              >
                                <div>{{ d.nameOfIssuer }}</div>
                                <div
                                  class="ml-[8px] text-[10px] font-medium text-blue-50"
                                  v-if="d.isAdded"
                                >
                                  NEW
                                </div>
                                <div
                                  class="ml-[8px] text-[10px] font-medium text-red-50"
                                  v-if="d.isRemoved"
                                >
                                  REMOVED
                                </div>
                              </div>
                              <div
                                class="value-wrapper flex items-center mx-[4px]"
                              >
                                <div
                                  class="top-value w-[40px] mx-[2px] flex justify-end"
                                >
                                  ${{
                                    Intl.NumberFormat("en", {
                                      notation: "compact",
                                    }).format(d.value_curr)
                                  }}
                                </div>
                                <div
                                  class="top-value w-[40px] text-[11px] rounded mx-[4px] flex justify-end"
                                >
                                  <div
                                  class="w-[auto] px-[4px] rounded"
                                    :class="[
                                      {
                                        'text-darkpos bg-pos dark:text-posdm dark:bg-darkposdm':
                                          d.value_diff > 0,
                                      },
                                      {
                                        'text-darkneg bg-neg dark:text-negdm dark:bg-darknegdm':
                                          d.value_diff < 0,
                                      },
                                    ]"
                                  >
                                    {{
                                      Intl.NumberFormat("en", {
                                        notation: "compact",
                                      }).format(d.value_diff)
                                    }}$
                                  </div>
                                </div>
                              </div>
                              <div
                                class="shares-wrapper flex items-center mx-[4px]"
                              >
                                <div
                                  class="top-value w-[40px] mx-[2px] flex justify-end"
                                >
                                  {{
                                    Intl.NumberFormat("en", {
                                      notation: "compact",
                                    }).format(d.shares_curr)
                                  }}
                                </div>
                                <div
                                  class="top-value w-[40px] text-[11px] mx-[4px] rounded-[4px] px-[4px] flex justify-end"
                                  :class="[
                                    {
                                      'text-darkpos bg-pos dark:text-pos dark:bg-darkpos':
                                        d.shares_diff > 0,
                                    },
                                    {
                                      'text-darkneg bg-neg dark:text-neg dark:bg-darkneg':
                                        d.shares_diff < 0,
                                    },
                                  ]"
                                >
                                  {{
                                    Intl.NumberFormat("en", {
                                      notation: "compact",
                                    }).format(d.shares_diff)
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
            <Transition name="slidemobilesmall" mode="out-in">
              <div
                class="expanded-row-mobile w-[100vw] bg-expbox dark:bg-darkexpbox shadow-expboxsh"
                v-if="f.showRow && isMobileDevice"
              >
                <div class="w-[100vw] h-[128px] p-[16px] overflow-y-auto"></div>
              </div>
            </Transition>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watchEffect } from "vue";
import { computed } from "@vue/reactivity";
import MainSpinner from "@/components/widgets/MainSpinner.vue";
import PieInsider from "@/components/common/graphs/PieInsider.vue";
import LineChart from "@/components/common/graphs/LineChart.vue";
import { useScreenObserver } from "@/composables/useScreenObserver";
import io from "socket.io-client";

export default {
  components: { MainSpinner, PieInsider, LineChart },
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  setup(props, context) {
    // Screen observers //
    const { isLargeScreen, isMobileDevice } = useScreenObserver();

    // Conditionals //

    let loading = ref(true);
    let isHovered = ref(false);
    let showRow = ref(false);
    let showPopup = ref(false);

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
      socket.on("newItem", addItem);

      timer = setInterval(() => {
        currentTime.value = new Date();
      }, 60000); // Update every minute (60,000 ms).
    });

    onUnmounted(() => {
      socket.off("newItem", addItem);
      socket.disconnect();

      clearInterval(timer);
    });

    const funds = ref([]);
    const details = ref("");
    const isLoading = ref(true);
    const currentPage = computed(() => props.page);

    const fetchData = async () => {
      // Fetch data from API based on the 'page' prop
      let response = await fetch(
        `/api/funds-feed?page=${currentPage.value}`
      );

      let data = await response.json();

      data = data.data.funds;

      funds.value = [...funds.value, ...data];

      isLoading.value = false;

      // Emit 'fetchMore' event when fetching is done
      context.emit("fetchMore");
    };

    const fetchDetails = async (cik, date) => {
      let response = await fetch(
        `/api/thirteen-detail?cik=${cik}&date=${date}`
      );

      let data = await response.json();

      data = data.data.holdings;

      details.value = data;
    };

    const fetchHist = async (fund, cik, date) => {
      let response = await fetch(
        `/api/funds-historical?cik=${cik}&acceptedDate=${date}`
      );

      let data = await response.json();

      data = data.data.fundsHist;

      fund.hist = data[0];
    };

    watchEffect(() => {
      fetchData();
    });

    return {
      loading,
      showPopup,
      showRow,
      isHovered,
      // isLargeScreen,
      isMobileDevice,
      fetchDetails,
      fetchHist,
      details,
      funds,
      socketItems,
      isLoading,
      timeSince,
    };
  },
};
</script>

<style>
.top-item {
  margin: 4px 0;
}
.home-comp {
  margin: 10px 0;
  border-radius: 4px;
  padding: 10px;
}
</style>

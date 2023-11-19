<template>
  <div class="tenk-wrapper flex">
    <div class="table-wrapper flex">
      <div class="table">
        <div class="rss-table text-[11px] transition ease">
          <template v-if="isLoading" div="loading-animation">
            <MainSpinner />
          </template>
          <template v-else>
            <div clas="flex">
              <div
                class="table-data-row bg-slate-100 dark:bg-slate-900 transition ease"
                v-for="k in tenK"
                :key="tenK.id"
              >
                <div class="flex items-center">
                  <div class="dummy w-[40px]"></div>
                  <div
                    class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-expbox dark:hover:bg-slate-800 trasnition ease duration-75"
                    @click="(k.showPopup = !k.showPopup), selectCompany(k)"
                  >
                    <div class="w-[60px] lg-cell">
                      {{ timeSince(k.filedAt).slice(0, -4) }}
                    </div>
                    <div class="w-[70px] lg-cell">
                      {{ k.periodOfReport.slice(0, 4) }}
                    </div>
                    <div class="w-[70px] lg-cell">
                      {{ k.ticker }}
                    </div>
                    <div class="w-[300px] flex justify-start lg-cell">
                      {{ k.companyName }}
                    </div>
                    <div class="lg-cell flex justify-center w-[100px]">
                      <div
                        v-if="k.mcap > 0"
                        class="flex w-[100%] items-center justify-center"
                      >
                        <div class="mcap-cat text-[10px] flex justify-start">
                          <div
                            v-if="k.mcap < 300000000"
                            class="text-highlighter-dark turquoise dark:text-highlighter-turquoise bg-highlighter-turquoise dark:bg-highlighter-darkturquoise px-[8px] py-[2px] rounded-[12px]"
                          >
                            MICRO CAP
                          </div>
                          <div
                            v-else-if="k.mcap < 2000000000"
                            class="text-highlighter-darklightblue bg-highlighter-lightblue dark:text-highlighter-lightblue dark:bg-highlighter-darklightblue px-[8px] py-[2px] rounded-[12px]"
                          >
                            SMALL CAP
                          </div>
                          <div
                            v-else-if="k.mcap < 10000000000"
                            class="text-highlighter-darkpink bg-highlighter-pink dark:text-highlighter-pink dark:bg-highlighter-darkpink px-[8px] py-[2px] rounded-[12px]"
                          >
                            MID CAP
                          </div>
                          <div
                            v-else-if="k.mcap < 200000000000"
                            class="text-highlighter-darkred bg-highlighter-red dark:text-highlighter-red dark:bg-highlighter-darkred px-[8px] py-[2px] rounded-[12px]"
                          >
                            LARGE CAP
                          </div>
                          <div
                            v-else
                            class="bg-highlighter-bgred text-highlighter-red dark:bg-highlighter-red dark:text-highlighter-bgred px-[8px] py-[2px] rounded-[12px]"
                          >
                            MEGA CAP
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="font-medium tracking-wide text-[11px] text-slate-400 dark:text-slate-500 flex w-[100%] items-center justify-center"
                      >
                        NO DATA
                      </div>
                    </div>
                  </div>
                </div>
                <Transition name="slide" mode="out-in">
                  <div
                    class="expanded-data-box flex justify-center !w-[680px]"
                    v-if="k.showPopup"
                  >
                    <div
                      class="expanded-row w-[600px] bg-expbox dark:bg-darkexpbox shadow-expboxsh transition ease"
                    >
                      <div
                        class="insider-box flex justify-between overflow-hidden"
                      >
                        <div
                          class="eight-k-wrapper flex flex-col justify-between"
                        >
                          <div class="eightk-doc-wrapper">
                            <div
                              class="eightk-doc-title text-[12px] font-medium mb-[4px]"
                            >
                              Documents and exhibits
                            </div>
                            <div
                              class="eightk-documents flex overflow-x-auto w-[560px]"
                            >
                              <div
                                class="eightk-document text-[12px]"
                                v-for="(d, index) in k.documentFormatFiles"
                                :key="index"
                              >
                                <a
                                  target="_blank"
                                  v-if="d.type !== 'GRAPHIC'"
                                  class="py-[1px] px-[4px] !w-[auto] whitespace-nowrap rounded mx-[8px] flex hover:no-underline hover:bg-[#7777a432] transition ease"
                                  :href="d.documentUrl"
                                >
                                  {{ d.type }}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div
                            class="eightk-graphics-wrapper"
                            v-if="
                              k.documentFormatFiles.some(
                                (item) => item.type === 'GRAPHIC'
                              )
                            "
                          >
                            <div
                              class="eightk-graphics-title text-[12px] font-medium mb-[4px]"
                            >
                              Graphics
                            </div>
                            <div
                              class="eightk-documents flex overflow-x-auto w-[560px]"
                            >
                              <div
                                class="eightk-document w-[auto] text-[12px]"
                                v-for="(d, index) in k.documentFormatFiles"
                                :key="index"
                              >
                                <a
                                  target="_blank"
                                  v-if="d.type == 'GRAPHIC'"
                                  class="py-[1px] px-[4px] rounded mx-[8px] flex hover:no-underline hover:bg-[#7777a432] transition ease"
                                  :href="d.documentUrl"
                                >
                                  <div>{{ d.type }}</div>
                                  &nbsp;
                                  <div>{{ index + 1 }}</div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, watchEffect } from "vue";
import MainSpinner from "@/components/widgets/MainSpinner.vue";
import { useScreenObserver } from "@/composables/useScreenObserver";
import BarChart from "@/components/common/graphs/BarChart.vue";
import useInfiniteFetch from "@/composables/useInfiniteFetch";
import { useTimePassed } from "@/composables/useTimePassed";
import TheDots from "@/components/widgets/TheDots.vue";

export default {
  components: { MainSpinner, BarChart, TheDots },
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  setup(props, context) {
    // COMPOSABLES //
    const { isLargeScreen } = useScreenObserver();

    const arr = ref([]);
    const url = "/api/ten-k";
    const queryParams = { formType: "10-K" }; // Add more query parameters as needed
    const {
      data: tenK,
      isLoading,
      fetchData,
    } = useInfiniteFetch(props, context, arr, url, queryParams);

    const timeSince = useTimePassed();

    // Conditionals / Refs //

    let loading = ref(false);
    let isHovered = ref(false);
    let showPopup = ref(false);
    let reportSelector = ref("pnl");
    let reportItem = ref("summary");

    const selectedCompany = ref(null);
    const details = ref("");

    // Functions //

    function selectCompany(company) {
      selectedCompany.value = company;
    }

    const fetchDetails = async (id) => {
      loading.value = true;
      // Fetch data2 from API using the keyValue
      let response = await fetch("");
      let data = await response.json();
      details.value = data.data.tenkDetails[0];

      loading.value = false;
    };

    // Lifecycle hooks //

    watchEffect(() => {
      // The 'then' block ensures that company info box is loaded when mounted
      fetchData().then(() => {
        if (tenK.value.length > 0) {
          selectedCompany.value = tenK.value[0];
        }
      });
    });

    return {
      loading,
      timeSince,
      showPopup,
      isHovered,
      reportItem,
      reportSelector,
      tenK,
      details,
      fetchDetails,
      isLoading,
      timeSince,
      selectCompany,
      selectedCompany,
    };
  },
};
</script>

<style>
.report-data-row {
  padding: 2px 0;
}

.popup-contennt {
  font-family: poppins !important;
}

.fadeslide-enter-active,
.fadeslide-leave-active {
  transition: all 0.2s ease;
}

.fadeslide-enter-from,
.fadeslide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

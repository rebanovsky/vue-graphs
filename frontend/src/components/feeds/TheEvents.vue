<template>
  <div class="table-wrapper flex">
    <div :class="[isMobileDevice ? 'table-mobile' : 'table']">
      <div
        class="rss-table text-[11px] transition ease"
        :class="{
          '!w-[100vw] overflow-x-hidden rss-mobile': isMobileDevice == true,
        }"
      >
        <transition-group tag="div" name="item-transition">
          <div
            class="socket-table bg-slate-100 dark:bg-slate-900 transition ease"
            v-for="(s, index) in socketItems"
            :key="index"
            :class="{
              '!w-[100vw] px-[4px]': isMobileDevice,
            }"
          >
            <div class="flex items-center">
              <div
                class="new-item-tag w-[40px] z-[1000] text-highlight dark:text-highlightdark"
                v-if="!isMobileDevice"
              >
                new
              </div>
              <div
                class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-700"
                @click="s.showPopup = !s.showPopup"
                :class="{ '!w-[100vw]': isMobileDevice }"
              >
                <div
                  class="w-[60px] lg-cell"
                  :class="{
                    '!w-[17vw]': isMobileDevice == true,
                  }"
                >
                  {{ timeSince(s.filedAt) }}
                </div>
                <div class="w-[70px] lg-cell" v-if="!isMobileDevice">
                  <!-- <router-link :to="'/company/' + s.ticker"> -->
                  {{ s.ticker }}
                  <!-- </router-link> -->
                </div>
                <div
                  class="w-[350px] flex justify-start lg-cell"
                  :class="{
                    '!w-[60vw]': isMobileDevice == true,
                  }"
                >
                  <!-- <router-link :to="'/company/' + s.ticker"> -->
                  {{ s.companyName }}
                  <!-- </router-link> -->
                </div>
                <div
                  class="w-[120px] font-normal flex flex-col items-start lg-cell tracking-wide text-[11px]"
                  :class="{
                    '!w-[23vw]': isMobileDevice == true,
                  }"
                >
                  <div
                    v-if="s.itemsSimple == 'FINANCIALS'"
                    class="text-[#0300ff] dark:text-[#00a3ff]"
                  >
                    Financials
                  </div>
                  <div v-else class="text-slate-600 dark:text-slate-400">
                    Other items
                  </div>
                </div>
              </div>
              <div class="dummy w-[40px]" v-if="!isMobileDevice"></div>
            </div>
            <Transition name="slide" mode="out-in">
              <div
                class="expanded-data-box flex justify-center !w-[680px]"
                v-if="s.showPopup && !isMobileDevice"
              >
                <div
                  class="expanded-row w-[600px] bg-expbox dark:bg-darkexpbox shadow-expboxsh transition ease"
                >
                  <div class="insider-box flex justify-between overflow-hidden">
                    <div class="eight-k-wrapper flex flex-col justify-between">
                      <div class="eightk-doc-wrapper">
                        <div
                          class="eightk-doc-title text-[12px] font-medium mb-[4px]"
                        >
                          Documents and exhibits
                        </div>
                        <div
                          class="eightk-documents flex w-[560px] overflow-x-auto"
                        >
                          <div
                            class="eightk-document w-[auto] text-[12px]"
                            v-for="(d, index) in s.documentFormatFiles"
                            :key="index"
                          >
                            <a
                              target="_blank"
                              v-if="d.type !== 'GRAPHIC'"
                              class="py-[1px] px-[4px] rounded mx-[8px] hover:no-underline hover:bg-[#7777a432] transition ease"
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
                          s.documentFormatFiles.some(
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
                            v-for="(d, index) in s.documentFormatFiles"
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
            <Transition name="slidemobilesmall" mode="out-in">
              <div
                class="expanded-row-mobile w-[100vw] bg-expbox dark:bg-darkexpbox shadow-expboxsh"
                v-if="s.showPopup && isMobileDevice"
              >
                <div class="w-[100vw] h-[128px] p-[16px] overflow-y-auto">
                  <div
                    class="eight-k-wrapper flex h-[100%] flex-col justify-between"
                  >
                    <div class="eightk-doc-wrapper">
                      <div
                        class="eightk-doc-title text-[12px] font-medium mb-[4px]"
                      >
                        Documents and exhibits
                      </div>
                      <div class="documents-mobile flex overflow-x-auto">
                        <div
                          class="eightk-document w-[auto] text-[12px]"
                          v-for="(d, index) in s.documentFormatFiles"
                          :key="index"
                        >
                          <a
                            target="_blank"
                            v-if="d.type !== 'GRAPHIC'"
                            class="py-[1px] px-[4px] whitespace-nowrap rounded mx-[8px] border-[1px] border-slate-300 dark:border-slate-700 hover:no-underline hover:bg-[#7777a432] transition ease"
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
                        s.documentFormatFiles.some(
                          (item) => item.type === 'GRAPHIC'
                        )
                      "
                    >
                      <div
                        class="eightk-graphics-title text-[12px] font-medium mb-[4px]"
                      >
                        Graphics
                      </div>
                      <div class="documents-mobile flex overflow-x-auto">
                        <div
                          class="eightk-document w-[auto] text-[12px]"
                          v-for="(d, index) in s.documentFormatFiles"
                          :key="index"
                        >
                          <a
                            target="_blank"
                            v-if="d.type == 'GRAPHIC'"
                            class="py-[1px] px-[4px] rounded mx-[8px] border-[1px] border-slate-300 dark:border-slate-700 flex hover:no-underline hover:bg-[#7777a432] transition ease"
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
            </Transition>
          </div>
        </transition-group>
        <template v-if="isLoading" div="loading-animation">
          <MainSpinner />
        </template>
        <template v-else>
          <div
            class="table-data-row bg-slate-100 dark:bg-slate-900 transition ease"
            v-for="(e, index) in eightK"
            :key="index"
            :class="{
              '!w-[100vw]': isMobileDevice,
            }"
          >
            <div class="flex items-center">
              <div class="dummy w-[40px]" v-if="!isMobileDevice"></div>
              <div
                class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-800"
                @click="e.showPopup = !e.showPopup"
                :class="{ '!w-[100vw] px-[4px]': isMobileDevice }"
              >
                <div
                  class="w-[60px] lg-cell"
                  :class="{
                    '!w-[17vw]': isMobileDevice == true,
                  }"
                >
                  {{ timeSince(e.filedAt) }}
                </div>
                <div class="w-[70px] lg-cell" v-if="!isMobileDevice">
                  {{ e.ticker }}
                </div>
                <div
                  class="w-[350px] flex justify-start lg-cell"
                  :class="{
                    '!w-[60vw]': isMobileDevice == true,
                  }"
                >
                  {{ e.companyName }}
                </div>
                <div
                  class="w-[120px] font-normal flex flex-col items-start lg-cell tracking-wide text-[11px]"
                  :class="{
                    '!w-[23vw]': isMobileDevice == true,
                  }"
                >
                  <div
                    v-if="e.hasFinancials"
                    class="text-highlighter-darkblue bg-highlighter-blue dark:text-highlighter-blue dark:bg-highlighter-darkblue px-[6px] py-[1px] rounded-[12px]"
                  >
                    Financials
                  </div>
                  <div v-else class="text-slate-600 dark:text-slate-400">
                    Other items
                  </div>
                </div>
              </div>
              <div class="dummy w-[40px]" v-if="!isMobileDevice"></div>
            </div>
            <Transition name="slide" mode="out-in">
              <div
                class="expanded-data-box flex justify-center !w-[680px]"
                v-if="e.showPopup && !isMobileDevice"
              >
                <div
                  class="expanded-row w-[600px] bg-expbox dark:bg-darkexpbox shadow-expboxsh transition ease"
                >
                  <div class="insider-box flex justify-between overflow-hidden">
                    <div class="eight-k-wrapper flex flex-col justify-between">
                      <div class="eightk-doc-wrapper">
                        <div
                          class="eightk-doc-title text-[12px] font-medium mb-[4px]"
                        >
                          Documents and exhibits
                        </div>
                        <div
                          class="eightk-documents flex w-[560px] overflow-x-auto"
                        >
                          <div
                            class="eightk-document w-[auto] text-[12px]"
                            v-for="(d, index) in e.documentFormatFiles"
                            :key="index"
                          >
                            <a
                              target="_blank"
                              v-if="d.type !== 'GRAPHIC'"
                              class="py-[1px] px-[4px] whitespace-nowrap rounded mx-[8px] hover:no-underline hover:bg-[#7777a432] transition ease"
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
                          e.documentFormatFiles.some(
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
                            v-for="(d, index) in e.documentFormatFiles"
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
            <Transition name="slidemobilesmall" mode="out-in">
              <div
                class="expanded-row-mobile w-[100vw] bg-expbox dark:bg-darkexpbox shadow-expboxsh"
                v-if="e.showPopup && isMobileDevice"
              >
                <div class="w-[100vw] h-[128px] p-[16px] overflow-y-auto">
                  <div
                    class="eight-k-wrapper flex h-[100%] flex-col justify-between"
                  >
                    <div class="eightk-doc-wrapper">
                      <div
                        class="eightk-doc-title text-[12px] font-medium mb-[4px]"
                      >
                        Documents and exhibits
                      </div>
                      <div class="documents-mobile flex overflow-x-auto">
                        <div
                          class="eightk-document w-[auto] text-[12px]"
                          v-for="(d, index) in e.documentFormatFiles"
                          :key="index"
                        >
                          <a
                            target="_blank"
                            v-if="d.type !== 'GRAPHIC'"
                            class="py-[1px] px-[4px] whitespace-nowrap rounded mx-[8px] border-[1px] border-slate-300 dark:border-slate-700 hover:no-underline hover:bg-[#7777a432] transition ease"
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
                        e.documentFormatFiles.some(
                          (item) => item.type === 'GRAPHIC'
                        )
                      "
                    >
                      <div
                        class="eightk-graphics-title text-[12px] font-medium mb-[4px]"
                      >
                        Graphics
                      </div>
                      <div class="documents-mobile flex overflow-x-auto">
                        <div
                          class="eightk-document w-[auto] text-[12px]"
                          v-for="(d, index) in e.documentFormatFiles"
                          :key="index"
                        >
                          <a
                            target="_blank"
                            v-if="d.type == 'GRAPHIC'"
                            class="py-[1px] px-[4px] rounded mx-[8px] border-[1px] border-slate-300 dark:border-slate-700 flex hover:no-underline hover:bg-[#7777a432] transition ease"
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
import { useScreenObserver } from "@/composables/useScreenObserver";
import io from "socket.io-client";

export default {
  components: { MainSpinner },
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

    let loading = ref(false);
    let isHovered = ref(false);
    let reportItem = ref("summary");

    // Timepassed function to calculate time elapsed //

    const currentTime = ref(new Date());

    function adjustedCurrentTime() {
      // Create a new Date object that is 4 hours earlier
      return new Date(currentTime.value.getTime() - 0 * 60 * 60 * 1000);
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
      } else if (minutes > 0) {
        return `${minutes} min`;
      } else {
        return `${diffInSeconds} s`;
      }
    });

    let timer;

    // WS functions //

    const socketItems = ref([]);

    const socket = io("");

    const addItem = (item) => {
      socketItems.value.unshift(item);
    };

    const eightK = ref([]);
    const details = ref("");
    const isLoading = ref(true);
    const currentPage = computed(() => props.page);

    const fetchData = async () => {
      // Fetch data from API based on the 'page' prop
      let response = await fetch(
        `/api/eight-k?page=${currentPage.value}`
      );

      let data = await response.json();

      data = data.data.eightks;

      // Add isLoadingSpinner property to each stock
      const processedData = data.map((stock) => {
        return { ...stock, isLoadingSpinner: true };
      });

      eightK.value = [...eightK.value, ...processedData];

      isLoading.value = false;

      // Emit 'fetchMore' event when fetching is done
      context.emit("fetchMore");
    };

    // const fetchDetails = async (id) => {
    //   loading.value = true;
    //   // Fetch data2 from API using the keyValue
    //   let response = await fetch(
    //     `http://localhost:8080/api/eight-k-detail?linkToHtml=${id}`
    //   );
    //   let data = await response.json();
    //   details.value = data.data.eightkDetails[0];

    //   loading.value = false;
    // };

    const scrollToTable = (tableId) => {
      const tableElement = document.getElementById(tableId);

      if (tableElement) {
        tableElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error(`Table with ID '${tableId}' not found.`);
      }
    };

    // pop-up

    const showPopup = ref(false);

    // Lifecycle hooks //

    onMounted(() => {
      socket.on("newEightKItem", addItem);
      timer = setInterval(() => {
        currentTime.value = new Date();
      }, 60000); // Update every minute (60,000 ms).
    });

    onUnmounted(() => {
      socket.off("newEightKItem", addItem);
      socket.disconnect();
      clearInterval(timer);
    });

    watchEffect(() => {
      fetchData();
    });

    return {
      loading,
      isHovered,
      isMobileDevice,
      reportItem,
      socketItems,
      eightK,
      scrollToTable,
      details,
      isLoading,
      timeSince,
      showPopup,
    };
  },
};
</script>

<style>
p,
.html-text > div {
  font-size: 12px !important;
  line-height: 20px !important;
  padding: 10px 0 !important;
}
</style>

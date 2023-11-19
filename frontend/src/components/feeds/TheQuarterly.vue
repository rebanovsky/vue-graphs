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
            class="table-data-row bg-slate-100 dark:bg-slate-900 transition ease"
            v-for="(s, index) in socketItems"
            :key="index"
            :class="{
              '!w-[100vw]': isMobileDevice,
            }"
          >
            <div class="flex items-center">
              <div
                class="new-item-tag w-[40px] text-highlight dark:text-highlightdark"
                v-if="!isMobileDevice"
              >
                new
              </div>
              <div
                class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-800"
                @click="s.showRow = !s.showRow"
                :class="{ '!w-[100vw] px-[4px]': isMobileDevice }"
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
                  {{ s.qtr }}
                </div>
                <div v-if="!isMobileDevice" class="w-[70px] lg-cell">
                  {{ s.ticker }}
                </div>
                <div
                  class="w-[300px] flex justify-start lg-cell"
                  :class="{
                    '!w-[55vw]': isMobileDevice == true,
                  }"
                >
                  {{ s.companyName }}
                </div>
                <div
                  class="lg-cell flex justify-end"
                  :class="[isMobileDevice ? '!w-[28vw]' : 'w-[100px]']"
                >
                  <div
                    v-if="s.mcap > 0"
                    class="flex w-[100%] items-center justify-center"
                  >
                    <div class="mcap-cat text-[10px] flex justify-start">
                      <div
                        v-if="s.mcap < 300000000"
                        class="text-highlighter-dark turquoise dark:text-highlighter-turquoise bg-highlighter-turquoise dark:bg-highlighter-darkturquoise px-[8px] py-[2px] rounded-[12px]"
                      >
                        MICRO CAP
                      </div>
                      <div
                        v-else-if="s.mcap < 2000000000"
                        class="text-highlighter-darklightblue bg-highlighter-lightblue dark:text-highlighter-lightblue dark:bg-highlighter-darklightblue px-[8px] py-[2px] rounded-[12px]"
                      >
                        SMALL CAP
                      </div>
                      <div
                        v-else-if="s.mcap < 10000000000"
                        class="text-highlighter-darkpink bg-highlighter-pink dark:text-highlighter-pink dark:bg-highlighter-darkpink px-[8px] py-[2px] rounded-[12px]"
                      >
                        MID CAP
                      </div>
                      <div
                        v-else-if="s.mcap < 200000000000"
                        class="text-highlighter-darkred bg-highlighter-red dark:text-highlighter-red dark:bg-highlighter-darkred px-[8px] py-[2px] rounded-[12px]"
                      >
                        LARGE CAP
                      </div>
                      <div
                        v-else
                        class="bg-highlighter-wine text-highlighter-darkwine dark:bg-highlighter-darkwine dark:text-highlighter-wine px-[8px] py-[2px] rounded-[12px]"
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
                v-if="s.showRow && !isMobileDevice"
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
                v-if="s.showRow && isMobileDevice"
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
          <div clas="flex">
            <div
              class="table-data-row bg-slate-100 dark:bg-slate-900 transition ease"
              v-for="q in tenQ"
              :key="tenQ.id"
              :class="{
                '!w-[100vw]': isMobileDevice,
              }"
            >
              <div class="flex items-center">
                <div class="dummy w-[40px]" v-if="!isMobileDevice"></div>
                <div
                  class="shrinked-row border-b-[1px] dark:border-darkbboxborder border-boxborderlight hover:bg-slate-300 dark:hover:bg-slate-800"
                  @click="q.showRow = !q.showRow"
                  :class="{ '!w-[100vw] px-[4px]': isMobileDevice }"
                >
                  <div
                    class="w-[60px] lg-cell"
                    :class="{
                      '!w-[17vw]': isMobileDevice == true,
                    }"
                  >
                    {{ timeSince(q.filedAt) }}
                  </div>
                  <div class="w-[70px] lg-cell" v-if="!isMobileDevice">
                    {{ q.qtr }}
                  </div>
                  <div v-if="!isMobileDevice" class="w-[70px] lg-cell">
                    {{ q.ticker }}
                  </div>
                  <div
                    class="w-[300px] flex justify-start lg-cell"
                    :class="{
                      '!w-[55vw]': isMobileDevice == true,
                    }"
                  >
                    {{ q.companyName }}
                  </div>
                  <div
                    class="lg-cell flex justify-end"
                    :class="[isMobileDevice ? '!w-[28vw]' : 'w-[100px]']"
                  >
                    <div
                      v-if="q.mcap > 0"
                      class="flex w-[100%] items-center justify-center"
                    >
                      <div class="mcap-cat text-[10px] flex justify-start">
                        <div
                          v-if="q.mcap < 300000000"
                          class="text-highlighter-dark turquoise dark:text-highlighter-turquoise bg-highlighter-turquoise dark:bg-highlighter-darkturquoise px-[8px] py-[2px] rounded-[12px]"
                        >
                          MICRO CAP
                        </div>
                        <div
                          v-else-if="q.mcap < 2000000000"
                          class="text-highlighter-darklightblue bg-highlighter-lightblue dark:text-highlighter-lightblue dark:bg-highlighter-darklightblue px-[8px] py-[2px] rounded-[12px]"
                        >
                          SMALL CAP
                        </div>
                        <div
                          v-else-if="q.mcap < 10000000000"
                          class="text-highlighter-darkpink bg-highlighter-pink dark:text-highlighter-pink dark:bg-highlighter-darkpink px-[8px] py-[2px] rounded-[12px]"
                        >
                          MID CAP
                        </div>
                        <div
                          v-else-if="q.mcap < 200000000000"
                          class="text-highlighter-darkred bg-highlighter-red dark:text-highlighter-red dark:bg-highlighter-darkred px-[8px] py-[2px] rounded-[12px]"
                        >
                          LARGE CAP
                        </div>
                        <div
                          v-else
                          class="bg-highlighter-wine text-highlighter-darkwine dark:bg-highlighter-darkwine dark:text-highlighter-wine px-[8px] py-[2px] rounded-[12px]"
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
                  v-if="q.showRow && !isMobileDevice"
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
                            class="eightk-documents flex w-[560px] overflow-x-auto"
                          >
                            <div
                              class="eightk-document w-[auto] text-[12px]"
                              v-for="(d, index) in q.documentFormatFiles"
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
                            q.documentFormatFiles.some(
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
                              v-for="(d, index) in q.documentFormatFiles"
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
                  v-if="q.showRow && isMobileDevice"
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
                            v-for="(d, index) in q.documentFormatFiles"
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
                          q.documentFormatFiles.some(
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
                            v-for="(d, index) in q.documentFormatFiles"
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

    let loading = ref(true);
    let isHovered = ref(false);
    let showRow = ref(false);

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
      } else {
        return `${minutes} min`;
      }
    });

    let timer;

    // WS functions

    const socketItems = ref([]);

    const socket = io("");

    const addItem = (item) => {
      socketItems.value.unshift(item);
    };

    // Lifecycle hooks //

    onMounted(() => {
      socket.on("newTenqItem", addItem);
      timer = setInterval(() => {
        currentTime.value = new Date();
      }, 60000); // Update every minute (60,000 ms).
    });

    onUnmounted(() => {
      socket.off("newTenqItem", addItem);
      socket.disconnect();
      clearInterval(timer);
    });

    const tenQ = ref([]);
    const isLoading = ref(true);
    const currentPage = computed(() => props.page);

    const fetchData = async () => {
      // Fetch data from API based on the 'page' prop
      let response = await fetch(
        `/api/ten-q?page=${currentPage.value}`
      );

      let data = await response.json();

      data = data.data.tenqs;

      // Add isLoadingSpinner property to each stock
      const processedData = data.map((stock) => {
        return { ...stock, isLoadingSpinner: true };
      });

      tenQ.value = [...tenQ.value, ...processedData];

      isLoading.value = false;

      // Emit 'fetchMore' event when fetching is done
      context.emit("fetchMore");
    };

    watchEffect(() => {
      fetchData();
    });

    return {
      loading,
      showRow,
      isHovered,
      isMobileDevice,
      socketItems,
      tenQ,
      isLoading,
      timeSince,
    };
  },
};
</script>

<style></style>

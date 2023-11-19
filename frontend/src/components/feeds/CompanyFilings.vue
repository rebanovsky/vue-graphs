<template>
  <div class="table-wrapper">
    <div class="table-props flex w-[100%]">
      <div class="table-upper-comps w-[680px] flex flex-col items-center">
        <div
          class="form-headers-wrapper flex w-[600px] justify-between mb-[28px]"
        >
          <div class="h-[58px] flex items-end" v-if="selectedTable">
            <div class="title-row flex items-center mt-[8px]">
              <div class="flex font-medium items-center">
                <div
                  class="table-title-leftie font-medium flex items-center"
                  @mouseover="isTitleHover = true"
                  @mouseleave="isTitleHover = false"
                >
                  <div
                    class="comp-name cursor-default text-slate-800 dark:text-slate-300 px-[4px] text-[20px] mr-[2px] font-medium"
                  >
                    {{ selectedTable.title }}
                  </div>
                  <div class="comp-icon-wrapper mx-[6px]">
                    <div
                      class="comp-icon border-[1px] text-[9px] flex items-center justify-center font-normal dark:border-darkbboxborder border-slate-400 text-slate-400 dark:text-darkbboxborder hover:text-slate-600 hover:border-slate-600 hover:dark:text-slate-500 dark:hover:border-slate-500 transition ease duration-150"
                      @click="showInfo = !showInfo"
                      @mouseleave="showInfo = false"
                    >
                      i
                    </div>
                    <Transition name="info" mode="out-in">
                      <div class="expanded-info" v-if="showInfo">
                        <div
                          class="comp-description-l dark:border-[1px] z-50 shadow-boxshlight bg-slate-100 dark:bg-darkbox dark:border-darkbboxborder border-boxborderlight text-slate-600 dark:text-slate-400"
                        >
                          {{ selectedTable.description }}
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="table-options flex items-end w-[220px] justify-between font-medium text-[12px] border-b-[2px] border-b-slate-300"
          >
            <div
              v-for="table in secTables"
              :key="table.id"
              class="table-option-wrapper flex flex-col items-center justify-between"
            >
              <div
                class="table-option relative mt-[36px] w-[36px] translate-y-[2px] flex justify-center tracking-wider cursor-pointer border-b-[2px] px-[4px] transition ease duration-200"
                @click="(page = 1), (selectedFeed = table.id)"
                :class="
                  selectedFeed == table.id
                    ? 'border-slate-900 dark:border-slate-300 text-slate-900 dark:text-slate-100'
                    : 'dark:text-slate-500 text-slate-400 border-slate-300 dark:border-slate-800 hover:border-slate-600 dark:hover:text-slate-400 dark:hover:border-slate-400 hover:text-slate-600'
                "
                @mouseover="isTitle = table.id"
                @mouseleave="isTitle = ''"
              >
                {{ table.title }}
                <div class="arrow-wrapper tracking-wide flex justify-center">
                  <Transition name="title" mode="out-in">
                    <div
                      class="arrowed-tooltip rounded-[4px] shadow-arrowboxsh text-[11px] text-slate-900 dark:text-slate-100"
                      v-if="isTitle == table.id"
                    >
                      {{ table.subTitle }}
                    </div>
                  </Transition>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="table-headers-wrapper">
          <div class="table-headers flex">
            <div
              class="comp-tertiary w-[600px] text-[11px] pb-[6px] flex justify-center text-slate-600 dark:text-slate-400"
            >
              <div
                v-for="header in selectedHeaders"
                :key="header.id"
                class="tert-item px-[8px]"
                :style="{ width: header.width }"
              >
                <div class="tert-wrapper transition ease duration-75">
                  <div class="tert-name">{{ header.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-content relative flex justify-center">
      <div
        class="flex overflow-y-auto bg-slate-100 dark:bg-slate-900 table-container border-[1px] border-slate-300 rounded-[8px] flex flex-col items-center overflow-x-hidden w-[600px]"
        ref="tableContainer"
        @scroll="handleScrollShadow"
      >
        <Transition name="fade" mode="out-in">
          <div class="home-feed flex">
            <component
              :is="selectedComponent"
              :page="page"
              @fetchMore="handleFetchMore"
            />
          </div>
        </Transition>
      </div>
      <Transition name="spinner">
        <div
          class="bottom-spinner transition ease z-10 mb-[12px]"
          v-if="isFetching"
        >
          <div class="w-[680px] flex justify-center">
            <div
              class="fetching-feed w-[140px] h-[28px] flex justify-center rounded"
            >
              <SmallHexagon />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import TheFunds from "@/components/feeds/TheFunds.vue";
import TheEvents from "@/components/feeds/TheEvents.vue";
import TheAnnual from "@/components/feeds/TheAnnual.vue";
import TheQuarterly from "@/components/feeds/TheQuarterly.vue";
import TheInsiders from "@/components/feeds/TheInsiders.vue";
import SmallHexagon from "@/components/widgets/SmallHexagon.vue";
import TheSearch from "@/components/navigation/TheSearch.vue";
import useScroll from "@/composables/useScroll";
import useFetch from "@/composables/useFetch";
import {
  secTables,
  secHeaders,
  secFeedComponents,
} from "@/data/componentData.js";

export default {
  components: {
    TheInsiders,
    TheFunds,
    TheEvents,
    TheAnnual,
    TheQuarterly,
    SmallHexagon,
    TheSearch,
  },
  props: ["dark"],
  setup() {
    // DATA //
    let selectedTable = computed(() =>
      secTables.find((header) => header.id === selectedFeed.value)
    );
    let selectedHeaders = computed(() => secHeaders[selectedFeed.value]);
    let selectedComponent = computed(
      () => secFeedComponents[selectedFeed.value]
    );

    // COMPOSABLES //
    const {
      tableContainer,
      isScrolledTop,
      isScrolledBottom,
      handleScrollShadow,
      handleFetchMore,
      isFetching,
      page,
    } = useScroll();

    const { data: daily } = useFetch("/api/insider-sum", {
      date: "2023-05-05",
    });

    // CONDITIONALS //
    let selectedFeed = ref("tenk");
    let isTitleHover = ref(false);
    let showInfo = ref(false);
    let isTitle = ref("");
    let showFilter = ref(false);

    return {
      selectedFeed,
      isTitleHover,
      isTitle,
      showInfo,
      showFilter,
      page,
      handleFetchMore,
      tableContainer,
      handleScrollShadow,
      isFetching,
      isScrolledTop,
      isScrolledBottom,
      daily,
      secTables,
      selectedTable,
      selectedHeaders,
      selectedComponent,
    };
  },
};
</script>

<style scoped>

.filter-toggler:hover {
  background: #7777a432;
}

.table-container {
  height: calc(100vh - 346px);
}

.table-container-mobile {
  height: calc(100vh - 209px);
  width: 100vw;
}

.shadow-top,
.shadow-bottom {
  position: absolute;
  height: 100px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  width: 600px;
}

.bottom-spinner {
  position: absolute;
  height: 40px;
  opacity: 1;
  transition: opacity 0.3s;
  pointer-events: none;
  width: 680px;
  left: 0;
  bottom: 0;
}

.shadow-top {
  top: 0px;
  left: 0;
}

.shadow-bottom {
  bottom: 0;
  left: 0;
}

.visible {
  opacity: 1;
}

.rss-section {
  border-radius: 3px;
  font-size: 10px;
  margin: 0 10px 0 0;
}

.watchlist-section {
  overflow-y: auto;
  height: 220px;
  width: auto;
  border-radius: 3px;
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}

.arrowed-tooltip {
  position: absolute;
  color: rgb(0, 0, 0);
  padding: 2px 6px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 100;
  left: 50%;
  transform: translate(-50%, -24px);
}

.arrow {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}
</style>

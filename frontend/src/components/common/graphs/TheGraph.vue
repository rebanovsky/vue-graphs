<template>
  <div
    class="container rounded-[12px] border-[0px] p-[2px]"
    :style="{ width: width, height: height }"
  >
    <div class="card-wrapper rounded-[8px] flex flex-col h-[100%] w-[100%]">
      <!-- <div
        class="card-header w-[100%] flex justify-between"
        :class="headerClass"
        v-if="isGraph == 'line'"
      >
        <div class="left-header flex">
          <div class="card-title font-medium flex">
            <div
              class="graph-selectors flex text-[10px]"
              v-for="(graph, index) in graphItems"
              :key="index"
            >
              <div
                class="graph-selector mx-[6px] cursor-pointer flex items-center"
                :class="getGraphClass(graph.value)"
                @click="toggleGraphSelection(graph.value)"
              >
                <div
                  class="graph-toggle mr-[4px] border-[1px] rounded w-[10px] h-[10px] leading-3 flex items-center justify-center"
                  :class="[isSelected(graph.value) ? [graph.style] : '']"
                ></div>
                <div class="graph-name">{{ graph.name }}</div>
              </div>
            </div>
            <div class="card-title text-[11px] pl-[32px] pb-[16px]">S&P 500</div>
          </div>
        </div> -->
        <!-- <div class="card-chart-nav-wrapper flex justify-end">
          <div
            class="card-chart-navs flex text-[9px] rounded-[12px] border-[1px] dark:border-slate-800 border-slate-300 h-auto"
          >
            <div
              class="card-chart-nav rounded-[4px] border-b-slate-400 text-slate-400 px-[6px] cursor-pointer"
              v-for="(i, index) in chartOptions"
              :key="index"
            >
              {{ i.timeframe }}
            </div>
          </div>
        </div>
      </div> -->
      <div
        class="card-content flex-grow h-[100%] overflow-auto w-[100%]"
      >
        <div
          class="card-chart p-[4px] h-[100%]"
          v-if="data"
        >
          <LineChart
            :chart-data="data"
            :chart-height="chartHeight"
            :chart-width="chartWidth"
            v-if="isGraph === 'line'"
          />
          <MapGraph
            :chart-data="data"
            :chart-height="chartHeight"
            :region="region"
            v-if="isGraph === 'map'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import LineChart from "@/components/common/graphs/LineChart.vue";
import MapGraph from "@/components/common/graphs/MapGraph.vue";

export default {
  props: {
    height: {
      type: String,
      default: "200px",
    },
    width: {
      type: String,
      default: "200px",
    },
    titleText: {
      type: String,
    },
    option: {
      type: String,
      default: "OPTION",
    },
    isFeed: {
      type: Boolean,
      default: false,
    },
    isGraph: {
      type: String,
      default: "",
    },
    feedItems: {
      type: Array,
    },
    data: {
      type: Array,
    },
    graphItems: {
      type: Array,
    },
    region: String,
    chartHeight: String,
    chartWidth: String,
  },
  components: { LineChart, MapGraph },
  setup(props) {
    const isScrolled = ref(false);

    const handleScroll = (event) => {
      if (event.target.scrollTop > 0 && !isScrolled.value) {
        isScrolled.value = true;
      } else if (event.target.scrollTop === 0 && isScrolled.value) {
        isScrolled.value = false;
      }
    };

    const headerClass = computed(() => {
      return isScrolled.value ? "scrolled" : "";
    });

    const chartOptions = [
      { timeframe: "1D" },
      { timeframe: "1W" },
      { timeframe: "1M" },
      { timeframe: "1Y" },
      { timeframe: "5Y" },
    ];

    const selectedGraph = props.graphItems
      ? ref(props.graphItems[0].value)
      : ref("");

    const selectedGraphs = ref(props.graphItems ? [props.graphItems[0]?.value] : '');

    const toggleGraphSelection = (graphValue) => {
      const index = selectedGraphs.value.indexOf(graphValue);
      if (index === -1) {
        selectedGraphs.value.push(graphValue);
      } else {
        selectedGraphs.value.splice(index, 1);
      }
    };

    const isSelected = (graphValue) => {
      return selectedGraphs.value.includes(graphValue);
    };

    const getGraphClass = (graphValue) => {
      return selectedGraphs.value.includes(graphValue)
        ? "text-slate-900"
        : "text-slate-400";
    };

    return {
      isScrolled,
      handleScroll,
      headerClass,
      chartOptions,
      selectedGraph,
      toggleGraphSelection,
      getGraphClass,
      isSelected,
    };
  },
};
</script>

<style scoped>
.container {
  border-radius: 16px;
}
.card-header {
  height: 20px;
  padding: 0 0 2px 0;
  font-size: 14px; /* Assuming this is the default size. */
  transition: font-size 0.2s ease, height 0.2s ease;
}

.card-header.scrolled {
  font-size: 11px;
  height: 24px;
}

.card-wrapper,
.card-content {
  box-sizing: border-box;
}

.card-content {
  overflow-y: auto;
}

.card-option {
  transition: all 0.2s ease;
}

.card-header.scrolled .card-option {
  font-size: 8px;
  padding: 1px 4px;
}

.news-title {
  width: 152px; /* Fixed width */
  white-space: nowrap; /* Prevent wrapping of text */
  overflow: hidden; /* Hide the overflow */
  text-overflow: ellipsis; /* Show ellipsis for overflowed content */
  /* ...other styles... */
}
</style>

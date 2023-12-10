<template>
  <!-- CandlestickChart.vue -->
  <ChartContainer>
    <template #title>CandlestickChart.vue</template>
    <CandlestickChart
      :data="candleStickData"
      title="Stock price"
      :width="340"
      :height="120"
    />
    <template #config>
      <RadioButton
        :title="barTooltip.title"
        :options="barTooltip.config"
        v-model="barTooltipState"
        name="bar-tooltip"
      />
      <RadioButton
        v-model="barVisualizationState"
        :title="barAnimations.title"
        :options="barAnimations.config"
        name="bar-animations"
      />
      <RadioButton
        v-model="barVisualizationState"
        :title="barAnimations.title"
        :options="barAnimations.config"
        name="bar-animations"
      />
      <MultiSelect
        v-model="selectedStocks"
        :title="stockOptions.title"
        :options="stockOptions.configs"
      />
    </template>
    <template #code-block>
      <div
        class="codeblock h-[100%] text-[12px] flex flex-col gap-[8px] w-[100%] gridlines font-mono rounded-[8px] p-[8px]"
      >
        <div class="copy-code">copy</div>
        <div class="flex flex-col relative">
          <div class="top flex">
            {{ "<" }}
            <div class="component-name text-[#e85700] dark:text-[#f8d339]">
              CandlestickChart
            </div>
          </div>
          <transition-group name="list" tag="div" class="flex flex-col">
            <div
              class="props pl-[16px] flex"
              v-for="prop in singleLineProps"
              :key="prop.name"
            >
              :
              <div class="props-name text-[#000cd4] dark:text-[#f765f0]">
                {{ prop.name }}
              </div>
              =
              <div
                class="props-value text-[#c330ba] dark:text-[#ffb648] truncate"
              >
                {{ prop.value }}
              </div>
            </div>
            <div class="bottom">{{ "/>" }}</div>
          </transition-group>
        </div>
      </div>
    </template>
  </ChartContainer>
</template>

<script setup>
import { ref, reactive, watch, computed } from "vue";
import { line1, line2 } from "@/data/dummyMultiLine";
import CandlestickChart from "@/components/playground/CandlestickChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/common/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";

// LINECHART DATA
const formattedLineData = line1.map((item) => ({
  x: item.Date,
  y: item.Close,
}));

const lineData = ref([
  {
    color: "#061826",
    values: formattedLineData,
  },
]);

// PROPS
const props = [
  {
    name: "data",
    type: "Array",
    default: "null",
    description:
      "The dataset for the line chart, consisting of an array of data points.",
  },
  {
    name: "width",
    type: "Number",
    default: "400",
    description: "Specifies the width of the chart in pixels.",
  },
  {
    name: "height",
    type: "Number",
    default: "200",
    description: "Specifies the height of the chart in pixels.",
  },
  {
    name: "dateFormat",
    type: "String",
    default: "null",
    description:
      "Defines the format for date values in the dataset. If null, no formatting is applied.",
  },
  {
    name: "title",
    type: "String",
    default: '"Title"',
    description: "The title of the line chart.",
  },
  {
    name: "dotColor",
    type: "String",
    default: '"#05D9FF"',
    description: "The color of the dots on the line chart.",
  },
  {
    name: "lineColor",
    type: "String",
    default: "null",
    description:
      "The color of the line in the chart. If not specified, a default color is used.",
  },
  {
    name: "tooltip",
    type: "Boolean",
    default: "false",
    description: "Determines whether tooltips are shown on hover.",
  },
  {
    name: "gridlines",
    type: "Boolean",
    default: "false",
    description: "Controls the visibility of gridlines in the chart.",
  },
  {
    name: "animation",
    type: "Boolean",
    default: "false",
    description: "Controls whether animation is used on load.",
  },
  {
    name: "xAxis",
    type: "Boolean",
    default: "null",
    description:
      "Controls the visibility of the X-axis. If not specified, default behavior is applied.",
  },
];

//Visualizations
const barVisualizationState = ref("off");
const radioConfigs = {
  animations: {
    title: "Animations",
    config: [
      { id: "animationsOn", label: "On", value: "on" },
      { id: "animationsOff", label: "Off", value: "off" },
    ],
  },
  gridlines: {
    title: "Gridlines",
    config: [
      { id: "gridlineOn", label: "On", value: "on" },
      { id: "gridlineOff", label: "Off", value: "off" },
    ],
  },
  tooltip: {
    title: "Tooltip",
    config: [
      { id: "tooltipOn", label: "On", value: "on" },
      { id: "tooltipOff", label: "Off", value: "off" },
    ],
  },
};

// Adding/removing stocks
const selectedStocks = ref([]);
const stockOptions = {
  title: "Add/remove Bars",
  configs: [
    { label: "AAPL", value: "AAPL" },
    { label: "MSFT", value: "MSFT" },
    { label: "NVDA", value: "NVDA" },
  ],
};

//Line color
const colorOptions = ref([
  { id: "color1", label: "Blue", value: "#0000FF" },
  { id: "color2", label: "Red", value: "#FF0000" },
]);

// Function to map barTooltipState value for display and filter
const mapDisplayValue = (key, value) => {
  if (key === "tooltip") {
    return value === true ? true : null;
  }
  return JSON.stringify(value);
};

const singleLineProps = computed(() => {
  return Object.entries(config)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null);
});

const config = reactive({
  lineData: [],
  tooltip: false,
  animations: false,
  selectedStocks: [],
  lineColor: "#fff",
  gridlines: false,
});

//MULTILINE
const transformLineData = (lineData) => {
  return lineData.map((dataPoint) => ({
    x: dataPoint.Date,
    y: dataPoint.Normalized_Close,
  }));
};

const chartData = ref([
  {
    color: "#061826",
    values: transformLineData(line1),
  },
  {
    color: "#F7567C",
    values: transformLineData(line2),
  },
]);

// Candlestick
const candleStickData = line1.slice(0, 50);
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(4px);
}

.list-leave-active {
  position: absolute;
}
</style>

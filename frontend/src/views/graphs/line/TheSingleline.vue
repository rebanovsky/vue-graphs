<template>
  <!-- SingleLine.vue -->
  <ChartContainer title="SingleLine.vue" :props="props">
    <SingleLine
      :width="560"
      :height="280"
      :data="lineData"
      dateFormat="%Y-%m-%d"
      :line-color="config.lineColor"
      :tooltip="tooltipBoolean"
      :gridlines="gridlinesBoolean"
      :animations="animationsBoolean"
    />
    <template #config>
      <ColorPicker
        v-model="config.lineColor"
        :options="colorOptions"
        title="Line Color"
      />
      <RadioButton
        v-model="config.tooltip"
        :options="radioConfigs.tooltip.config"
        title="Tooltip"
        name="tooltip"
      />
      <RadioButton
        v-model="config.gridlines"
        :options="radioConfigs.gridlines.config"
        title="Gridlines"
        name="gridlines"
      />
      <RadioButton
        v-model="config.animations"
        :options="radioConfigs.animations.config"
        title="Animations"
        name="animations"
      />
      <MultiSelect
        v-model="config.selectedStocks"
        :title="stockOptions.title"
        :options="stockOptions.configs"
      />
    </template>
    <template #code-block>
      <div
        class="codeblock h-[100%] text-[12px] transition ease duration-100 flex flex-col gap-[8px] w-[100%] font-mono"
      >
        <div
          class="copy-code w-[100%] flex justify-end border-b-[1px] border-b-slate-300 dark:border-b-slate-800 pb-[8px]"
        >
          <SvgIcon
            name="copy"
            dynamicClass="hover:fill-slate-900 cursor-pointer p-[2px] dark:hover:!fill-slate-200"
          />
        </div>
        <div class="flex gridlines h-[100%] items-center justify-center">
          <div class="flex flex-col relative" v-if="chartProps.length > 0">
            <div class="top flex">
              {{ "<" }}
              <div class="component-name text-[#e85700] dark:text-[#f8d339]">
                SingleLine
              </div>
            </div>
            <transition-group name="list" tag="div">
              <div
                class="props pl-[16px] flex max-w-[180px]"
                v-for="prop in chartProps"
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
            </transition-group>
            <div class="bottom">{{ "/>" }}</div>
          </div>
        </div>
      </div>
    </template>
  </ChartContainer>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { line1 } from "@/data/dummyMultiLine";
import SingleLine from "@/components/graphs/SingleLine.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/common/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";

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

//Radio configs
const radioConfigs = {
  animations: {
    title: "Animations",
    config: [
      { id: nanoid(10), label: "On", value: "on" },
      { id: nanoid(10), label: "Off", value: "off" },
    ],
  },
  gridlines: {
    title: "Gridlines",
    config: [
      { id: nanoid(10), label: "On", value: "on" },
      { id: nanoid(10), label: "Off", value: "off" },
    ],
  },
  tooltip: {
    title: "Tooltip",
    config: [
      { id: nanoid(10), label: "On", value: "on" },
      { id: nanoid(10), label: "Off", value: "off" },
    ],
  },
};

const tooltipBoolean = computed(() => config.tooltip === "on");
const gridlinesBoolean = computed(() => config.gridlines === "on");
const animationsBoolean = computed(() => config.animations === "on");

// Adding/removing stocks
const stockOptions = {
  title: "Add/remove Bars",
  configs: [
    { label: "AAPL", value: "AAPL" },
    { label: "MSFT", value: "MSFT" },
    { label: "NVDA", value: "NVDA" },
  ],
};

const colorOptions = ref([{ id: "color1", label: "Blue", value: "#0000FF" }]);

const mapDisplayValue = (key, value) => {
  if (key === "tooltip" || key === "gridlines" || key === "animations") {
    return value === "on" ? "on" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  lineData: [],
  selectedStocks: [],
  lineColor: "#fff",
  tooltip: "off",
  gridlines: "off",
  animations: "off",
});

const chartProps = computed(() => {
  return Object.entries(config)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null);
});

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
  transform: translateY(-6px);
}

.list-leave-active {
  position: absolute;
}
</style>

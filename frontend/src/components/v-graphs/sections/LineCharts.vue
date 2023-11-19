<template>
  <div class="flex gap-[20px]">
    <SingleLine :data="lineData" dateFormat="%Y-%m-%d" />
    <div class="graph-config rounded-[8px]">
      <div class="flex flex-col gap-[12px] w-[240px]">
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
      </div>
    </div>
  </div>
  <div class="flex gap-[20px]">
    <MultiLine :data="chartData" date-format="%Y-%m-%d" />
    <div class="graph-config rounded-[8px]">
      <div class="flex flex-col gap-[12px] w-[240px]">
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
      </div>
    </div>
  </div>
  <div class="flex gap-[20px]">
    <CandlestickChart
      :data="candleStickData"
      title="Stock price"
      :width="340"
      :height="150"
    />
    <div class="graph-config rounded-[8px]">
      <div class="flex flex-col gap-[12px] w-[240px]">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { line1, line2 } from "@/data/dummyMultiLine";
import SingleLine from "@/components/v-graphs/graphs/SingleLine.vue";
import MultiLine from "@/components/playground/MultiLine.vue";
import CandlestickChart from "@/components/playground/CandlestickChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";

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

const barTooltipState = ref("off");
const barTooltip = {
  title: "Tooltip",
  config: [
    { id: "barTooltipOn", label: "On", value: "on" },
    { id: "barTooltipOff", label: "Off", value: "off" },
  ],
};

//Visualizations
const barVisualizationState = ref("off");
const barAnimations = {
  title: "Animations",
  config: [
    { id: "barAnimationsOn", label: "On", value: "on" },
    { id: "barAnimationsOff", label: "Off", value: "off" },
  ],
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

//MULTILINE

const transformLineData = (lineData) => {
  return lineData.map((dataPoint) => ({
    x: dataPoint.Date,
    y: dataPoint.Normalized_Close, // Assuming you want the Close value || Close || Open
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

<style lang="scss" scoped></style>

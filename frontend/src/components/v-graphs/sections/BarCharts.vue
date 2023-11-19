<template>
  <div class="flex gap-[20px]">
    <div class="graph-item">
      <BarChart
        :data="earnings"
        :tooltip="true"
        :animations="true"
        height="200"
        width="400"
      />
    </div>
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
    <div class="div">
      <div
        class="graph-code-wrapper w-[240px] h-[228px] flex flex-col text-[14px]"
      >
        <div class="copy-wrapper w-[100%] h-[28px] flex justify-end bg-slate-300 dark:bg-slate-700">
          <div
            class="copy w-[auto] px-[4px] h-[20px] text-[12px] hover:bg-slate-50 flex justify-center items-center rounded-[2px] cursor-pointer transition ease duration-100"
            @click="copyToClipboard"
          >
            copy code
          </div>
        </div>
        <div
          class="graph-code w-[100%] h-[200px] flex items-center justify-center text-[14px]"
        >
          <div class="component">{{ barChartText }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-[20px]">
    <div class="graph-item">
      <VerBar :data="earnings" height="200" width="400" />
    </div>
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
import { ref, computed } from "vue";
import BarChart from "@/components/v-graphs/graphs/BarChart.vue";
import VerBar from "@/components/v-graphs/graphs/VerBar.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";

// BARCHART DATA
const earnings = [
  {
    entity: "AAPL",
    data: [
      { x: "Q1 2023", y: 90000000 },
      { x: "Q2 2023", y: 110000000 },
      { x: "Q3 2023", y: 105000000 },
      { x: "Q4 2023", y: 120000000 },
    ],
  },
  {
    entity: "MSFT",
    data: [
      { x: "Q1 2023", y: 100000000 },
      { x: "Q2 2023", y: 120000000 },
      { x: "Q3 2023", y: 100000000 },
      { x: "Q4 2023", y: 100000000 },
    ],
  },
];

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

//CODE EDITOR
const barChartText = ref(
  '<BarChart\n  :data="earnings"\n  :tooltip="true"\n  :animations="true"\n  height="200"\n  width="400">'
);

//COPY function
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(barChartText.value);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
</script>

<style lang="scss" scoped>
.copy-wrapper {
 border-radius: 8px 8px 0 0;
 padding: 4px;
}
.graph-code {
  background-color: #282c34; /* Dark background like many code editors */
  color: #abb2bf; /* Light text color for readability */
  font-family: "Source Code Pro", monospace; /* Monospaced font for code */
  padding: 16px;
  border-radius: 0 0 8px 8px;
  white-space: pre-wrap; /* Preserve whitespaces and line breaks */
  overflow-x: auto; /* Enable horizontal scrolling if needed */
  line-height: 1.7;
}
.component {
  color: #e6c07b; /* Example color */
  /* Additional styling if needed */
}
</style>

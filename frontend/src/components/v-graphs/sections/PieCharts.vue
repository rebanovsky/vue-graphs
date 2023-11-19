<template>
  <div class="flex gap-[20px]">
    <div class="graph-item">
      <PieChart :data="sectors" height="200" width="400" />
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
    <div class="graph-code">CODE</div>
  </div>
  <div class="flex gap-[20px]">
    <div class="graph-item">
      <PieChart :data="sectors" height="200" width="400" />
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
    <div class="graph-code">CODE</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import PieChart from "@/components/v-graphs/graphs/PieChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";

// BARCHART DATA
const sectors = [
  { label: 'Others', value: 10 },
  { label: 'Energy', value: 15 },
  { label: 'Finance', value: 25 },
  { label: 'Technology', value: 30 },
  { label: 'Healthcare', value: 20 }
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
</script>

<style lang="scss" scoped></style>

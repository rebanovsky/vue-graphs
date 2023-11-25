<template>
  <!-- BubbleChart.vue -->
  <ChartContainer>
    <template #title>BubbleChart.vue</template>
    <BubbleChart :data="bubbleData" width="480" height="240" />
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
              BubbleChart
            </div>
          </div>
          <transition-group name="list" tag="div" class="flex flex-col">
            <div
              class="props px-[16px] flex"
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
import { ref } from "vue";
import BubbleChart from "@/components/v-graphs/graphs/BubbleChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ChartContainer from "@/components/common/ChartContainer.vue";

// BARCHART DATA
const bubbleData = ref([
  {
    performancePercentage: 10.5,
    ownership: 10.3,
    weight: 15.2,
    sector: "Energy",
    securityName: "Company A",
    symbol: "COMPA",
  },
  {
    performancePercentage: 5.7,
    ownership: 25.1,
    weight: 10.0,
    sector: "Materials",
    securityName: "Company B",
    symbol: "COMPB",
  },
  {
    performancePercentage: 15.2,
    ownership: 20.5,
    weight: 20.3,
    sector: "Industrials",
    securityName: "Company C",
    symbol: "COMPC",
  },
  {
    performancePercentage: -15.2,
    ownership: 0.5,
    weight: 10.3,
    sector: "Technology",
    securityName: "Company D",
    symbol: "COMPD",
  },
  // ... other objects
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
</script>

<style lang="scss" scoped></style>

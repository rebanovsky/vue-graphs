<template>
  <div class="flex gap-[20px]">
    <div class="graph-item">
      <DotGraph
        :data="earnings1.AppleEarningsData"
        :width="480"
        :height="240"
      />
    </div>
    <div class="graph-config rounded-[8px]">
      <div class="flex flex-col gap-[12px] w-[200px]">
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
    <div class="code-block w-[220px] flex justify-center">
      <div
        class="codeblock h-[100%] text-[12px] flex flex-col gap-[8px] w-[100%] gridlines font-mono rounded-[8px] p-[8px]"
      >
        <div class="copy-code">copy</div>
        <div class="flex flex-col relative">
          <div class="top flex">
            {{ "<" }}
            <div class="component-name text-[#e85700] dark:text-[#f8d339]">
              DotPlot
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
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { earnings1 } from "@/data/earningsDummy";
import DotGraph from "@/components/v-graphs/graphs/DotGraph.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";

// BARCHART DATA
const sectors = [
  { label: "Others", value: 10 },
  { label: "Energy", value: 15 },
  { label: "Finance", value: 25 },
  { label: "Technology", value: 30 },
  { label: "Healthcare", value: 20 },
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

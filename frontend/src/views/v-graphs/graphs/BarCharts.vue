<template>
  <!-- BarChart.vue -->
  <ChartContainer>
    <template #title>BarChart.vue</template>
    <BarChart
      :data="earnings"
      :tooltip="true"
      :animations="true"
      height="240"
      width="480"
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
        <div class="flex flex-col">
          <div class="top flex">
            {{ "<" }}
            <div class="component-name text-[#e85700] dark:text-[#f8d339]">
              BarChart
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

  <!-- VerBar.vue -->
  <ChartContainer>
    <template #title>VerBar.vue</template>
    <VerBar :data="earnings" height="240" width="480" />
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
        <div class="flex flex-col">
          <div class="top flex">
            {{ "<" }}
            <div class="component-name text-[#e85700] dark:text-[#f8d339]">
              VerBar
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
import { ref, computed, reactive } from "vue";
import BarChart from "@/components/v-graphs/graphs/BarChart.vue";
import VerBar from "@/components/v-graphs/graphs/VerBar.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ChartContainer from "@/components/common/ChartContainer.vue";


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
const chartConfig = reactive({
  lineData: [], // Initialize with default or empty data
  tooltip: false,
  selectedStocks: [],
  colorSchema: "",
  // Add other configurations as needed
});

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

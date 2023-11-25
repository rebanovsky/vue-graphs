<template>
  <!-- SingleLine.vue -->
  <ChartContainer>
    <template #title>SingleLine.vue</template>
    <SingleLine
      :width="480"
      :height="240"
      :data="lineData"
      dateFormat="%Y-%m-%d"
      :line-color="chartConfig.lineColor"
      :tooltip="chartConfig.tooltip"
    />
    <template #config>
      <RadioButton
        :title="barTooltip.title"
        :options="barTooltip.config"
        v-model="chartConfig.tooltip"
        name="tooltip"
      />
      <MultiSelect
        v-model="chartConfig.selectedStocks"
        :title="stockOptions.title"
        :options="stockOptions.configs"
      />
      <ColorPicker
        v-model="chartConfig.lineColor"
        :options="colorOptions"
        title="Line Color"
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
              SingleLine
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

  <!-- MultiLine.vue -->
  <ChartContainer>
    <template #title>MultiLine.vue</template>
    <MultiLine
      :data="chartData"
      date-format="%Y-%m-%d"
      :width="480"
      :height="240"
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
              MultiLine
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

  <!-- CandlestickChart.vue -->
  <ChartContainer>
    <template #title>CandlestickChart.vue</template>
    <CandlestickChart
      :data="candleStickData"
      title="Stock price"
      :width="420"
      :height="180"
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
import { ref, reactive, watch, computed } from "vue";
import { line1, line2 } from "@/data/dummyMultiLine";
import SingleLine from "@/components/v-graphs/graphs/SingleLine.vue";
import MultiLine from "@/components/v-graphs/graphs/MultiLine.vue";
import CandlestickChart from "@/components/playground/CandlestickChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/common/ChartContainer.vue";

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
    { id: "lineTooltipOn", label: "On", value: true },
    { id: "lineTooltipOff", label: "Off", value: false },
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

//Line color
const colorOptions = ref([
  { id: "color1", label: "Blue", value: "#0000FF" },
  { id: "color2", label: "Red", value: "#FF0000" },
  // Add more colors as needed
]);

//PROPS
//SingleLine
// const singleLineProps = ref([
//   {
//     name: "toolbar",
//     value: "true",
//     type: "prop",
//   },
//   {
//     name: "animation",
//     value: "true",
//     type: "prop",
//   },
//   {
//     name: "line-color",
//     value: "#eff",
//     type: "prop",
//   },
// ]);

// Function to map barTooltipState value for display and filter
const mapDisplayValue = (key, value) => {
  if (key === "tooltip") {
    return value === true ? true : null; // Return null for 'off'
  }
  return JSON.stringify(value);
};

// Computed property to transform chartConfig into array format for the template
const singleLineProps = computed(() => {
  return Object.entries(chartConfig)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null); // Filter out entries with null value
});

const chartConfig = reactive({
  lineData: [], // Initialize with default or empty data
  tooltip: false,
  selectedStocks: [],
  lineColor: "#fff",
  // Add other configurations as needed
});

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

<style lang="scss" scoped>
/* Enter and leave transitions */
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(4px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>

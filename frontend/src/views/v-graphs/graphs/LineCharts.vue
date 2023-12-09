<template>
  <div class="flex w-[100%]">
    <div
      class="flex flex-col gap-[80px] flex-1 rounded-[8px] px-[12px] overflow-y-auto"
    >
      <!-- SingleLine.vue -->
      <ChartContainer>
        <template #title>SingleLine.vue</template>
        <SingleLine
          :width="560"
          :height="280"
          :data="lineData"
          dateFormat="%Y-%m-%d"
          :line-color="singleLineConfig.lineColor"
          :tooltip="singleLineConfig.tooltip"
          :gridlines="singleLineConfig.gridlines"
          :animations="singleLineConfig.animations"
        />
        <template #config>
          <RadioButton
            :title="radioConfigs.tooltip.title"
            :options="radioConfigs.tooltip.config"
            v-model="singleLineConfig.tooltip"
            name="tooltip"
          />
          <RadioButton
            :title="radioConfigs.gridlines.title"
            :options="radioConfigs.gridlines.config"
            v-model="singleLineConfig.gridlines"
            name="gridlines"
          />
          <RadioButton
            :title="radioConfigs.animations.title"
            :options="radioConfigs.animations.config"
            v-model="singleLineConfig.animations"
            name="animations"
          />
          <MultiSelect
            v-model="singleLineConfig.selectedStocks"
            :title="stockOptions.title"
            :options="stockOptions.configs"
          />
          <ColorPicker
            v-model="singleLineConfig.lineColor"
            :options="colorOptions"
            title="Line Color"
          />
        </template>
        <template #code-block>
          <div
            class="codeblock h-[100%] text-[12px] transition ease duration-100 flex flex-col gap-[8px] w-[100%] font-mono"
          >
            <div class="copy-code w-[100%] flex">copy</div>
            <div class="flex flex-col relative">
              <div class="top flex">
                {{ "<" }}
                <div class="component-name text-[#e85700] dark:text-[#f8d339]">
                  SingleLine
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

      <!-- MultiLine.vue -->
      <!-- <ChartContainer>
        <template #title>MultiLine.vue</template>
        <MultiLine
          :data="chartData"
          date-format="%Y-%m-%d"
          :width="400"
          :height="200"
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
      </ChartContainer> -->

      <!-- CandlestickChart.vue -->
      <!-- <ChartContainer>
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
      </ChartContainer> -->
    </div>
    <div class="dummy w-[200px] gridlines rounded-[12px] p-[12px]"></div>
  </div>
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
    return value === true ? true : null;
  }
  return JSON.stringify(value);
};

const singleLineProps = computed(() => {
  return Object.entries(singleLineConfig)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null);
});

const singleLineConfig = reactive({
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

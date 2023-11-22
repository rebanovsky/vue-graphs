<template>
  <div class="flex flex-col gap-[16px]">
    <div class="code-block w-[200px] gridlines py-[4px]">
      <div
        class="codeblock h-[100%] rounded-[8px] text-[12px] font-medium text-slate-500 flex"
      >
        Single line
      </div>
    </div>

    <div class="flex gap-[20px] gridlines">
      <div class="flex flex-col gap-[8px]">
        <div class="single-line-header">
          <div class="single-line-title">Title</div>
        </div>
        <SingleLine :data="lineData" dateFormat="%Y-%m-%d" />
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
      <div class="code-block w-[200px]">
        <div
          class="codeblock h-[100%] text-[12px] w-[auto] border font-mono rounded-[8px] p-[8px] "
        >
        <div class="copy-code">copy</div>
          <div class="top flex">
            {{ "<" }}
            <div class="component-name text-[#f8d339]">SingleLine</div>
          </div>
          <div
            class="props px-[16px] flex"
            v-for="prop in singleLineProps"
            :key="prop.name"
          >
            :
            <div class="props-name text-[#f765f0]">
              {{ prop.name }}
            </div>
            =
            <div class="props-value  text-[#ffb648]">
              {{ prop.value }}
            </div>
          </div>
          <div class="bottom">{{ "/>" }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-[20px]">
    <MultiLine
      :data="chartData"
      date-format="%Y-%m-%d"
      width="400"
      height="200"
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
import MultiLine from "@/components/v-graphs/graphs/MultiLine.vue";
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

//PROPS
//SingleLine
const singleLineProps = ref([
  {
    name: "toolbar",
    value: "true",
    type: "prop",
  },
  {
    name: "animation",
    value: "true",
    type: "prop",
  },
  {
    name: "line-color",
    value: "#eff",
    type: "prop",
  },
]);

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

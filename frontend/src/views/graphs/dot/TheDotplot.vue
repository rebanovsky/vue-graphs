<template>
  <!-- BarChart.vue -->
  <ChartContainer
    title="Dot plot"
    chart-title="DotGraph.vue"
    :code="code"
    :component-props="dotplotProps"
    :chart-props="chartProps"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <DotGraph :data="earnings.AppleEarningsData" :width="480" :height="240" />
    <template #config>
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
  </ChartContainer>
</template>

<script setup>
import { ref, computed, reactive } from "vue";

import DotGraph from "@/components/graphs/DotGraph.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";
//Data imports
import { earnings } from "@/data/earningsDummy";
import { dotplotProps } from "@/data/props";

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

const texts = {
  intro: `<div>The Dot Plot is a versatile and engaging visualization tool that presents data in a clear, concise format, ideal for comparing multiple variables or tracking changes over time. In this particular implementation, using Vue 3 and D3.js, the Dot Plot focuses on presenting EPS (Earnings Per Share) data, although its application can be extended to various other types of data.</div>
          <ul>
            <li class="my-[20px]">
              <strong>Dynamic Data Handling:</strong> The component is designed to handle an array of data, making it adaptable to different datasets. The primary focus is on displaying EPS data, both Actual and Estimate values, across different quarters.
            </li>
            <li class="my-[20px]">
              <strong>Customizable Dimensions:</strong> The plot's width and height can be adjusted via props, allowing for seamless integration into various layouts and design frameworks.
            </li>
            <li class="my-[20px]">
              <strong>Interactivity and Aesthetics:</strong> The use of D3.js brings the data to life with smooth transitions and interactive elements, enhancing the user experience. The design is further enriched with a harmonious color scheme that highlights key data points and trends.
            </li>
            <li class="my-[20px]">
              <strong>Axis and Gridlines:</strong> The X and Y axes are clearly defined, with the X-axis representing quarters and the Y-axis showing EPS values. Gridlines are added for better readability and precision in data interpretation.
            </li>
            <li class="my-[20px]">
              <strong>Responsive and Scalable:</strong> Built with responsiveness in mind, the plot adjusts to different screen sizes and resolutions, ensuring a consistent user experience across devices.
            </li>
          </ul>`,
};

// Code block
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const code = computed(() =>
  `</template>

<script setup>
import { ref } from 'vue';
import { DotPlot } from 'vue-graphs';

const dotplotData = ref([
    {
      Quarter: "Q1 23",
      Earnings: {
        TotalRevenue: 100000000000,
        NetIncome: 20000000000,
      },
      EPS: {
        Actual: 1.2,
        Estimate: 1.15,
      },
    },
    {
      Quarter: "Q2 23",
      Earnings: {
        TotalRevenue: 105000000000,
        NetIncome: 21000000000,
      },
      EPS: {
        Actual: 1.25,
        Estimate: 1.2,
      },
    },
    {
      Quarter: "Q3 23",
      Earnings: {
        TotalRevenue: 110000000000,
        NetIncome: 22000000000,
      },
      EPS: {
        Actual: 1.3,
        Estimate: 1.25,
      },
    },
    {
      Quarter: "Q4 23",
      Earnings: {
        TotalRevenue: 115000000000,
        NetIncome: 23000000000,
      },
      EPS: {
        Actual: 1.35,
        Estimate: 1.3,
      },
    },
  ]);

</${placeholder}>`.replace(new RegExp(placeholder, "g"), "script")
);
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

<template>
  <!-- TheBubblechart.vue -->
  <ChartContainer
    title="Bubble chart"
    chart-title="BubbleChart.vue"
    :code="code"
    :component-props="bubblechartProps"
    :chart-props="chartProps"
    :preview-data="linePreview"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <BubbleChart :data="bubbleData" :width="560" :height="280" />
    <template #config> </template>
  </ChartContainer>
</template>

<script setup>
import { computed, reactive } from "vue";
import BubbleChart from "@/components/graphs/BubbleChart.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import { nanoid } from "nanoid";
//Data imports
import { bubbleData } from "@/data/dummyBubble";
import { bubblechartProps } from "@/data/props";
import { linePreview } from "@/data/previewData";

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

const mapDisplayValue = (key, value) => {
  if (key === "tooltip" || key === "gridlines" || key === "animations") {
    return value === "on" ? "on" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  bubbleData: [],
});

const chartProps = computed(() => {
  return Object.entries(config)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null);
});

//Texts

const texts = {
  intro: `<div>
  The Bubble Chart is an effective visualization tool for representing complex datasets with multiple dimensions. In this Vue 3 and D3.js implementation, the chart is particularly adept at showcasing data points with variables like performance, ownership, and weight across different sectors.
</div>
<ul>
  <li class="my-[20px]">
    <strong>Dynamic Data Representation:</strong> Capable of displaying diverse datasets, this chart can visualize various data aspects like performance percentages, ownership, and weight, offering a multi-dimensional view of the data.
  </li>
  <li class="my-[20px]">
    <strong>Customizable Scales and Colors:</strong> The chart's axes are fully scalable to accommodate different ranges of data, and it features a customizable color scheme to differentiate between data categories effectively.
  </li>
  <li class="my-[20px]">
    <strong>Interactive Elements:</strong> Enhanced user engagement through interactive tooltips that provide additional information about each data point, offering a more detailed understanding of the underlying data.
  </li>
  <li class="my-[20px]">
    <strong>Responsive Design:</strong> The chart is built to be responsive, ensuring it adapts to various screen sizes and resolutions, making it suitable for a wide range of devices.
  </li>
  <li class="my-[20px]">
    <strong>Configurable Layout:</strong> With adjustable width and height, the bubble chart can be seamlessly integrated into different layouts, providing flexibility in its usage across various user interfaces.
  </li>
</ul>`,
};

// Code block
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const code = computed(() =>
  `</template>

<script setup>
import { ref } from 'vue';
import { BubbleChart } from 'vue-graphs';

const bubbleData = [
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
];


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

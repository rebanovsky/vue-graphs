<template>
  <!-- BarChart.vue -->
  <ChartContainer
    title="Bar Chart"
    chart-title="BarChart"
    :code="code"
    :chart-props="chartProps"
    :component-props="barProps"
    :preview-data="barPreview"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <BarChart
      :data="barData"
      :width="560"
      :height="280"
      :tooltip="tooltipBoolean"
      :gridlines="gridlinesBoolean"
      :animations="animationsBoolean"
      :legend="legendBoolean"
    />
    <template #config>
      <RadioButton
        v-model="config.tooltip"
        :options="radioConfigs.tooltip.config"
        :title="radioConfigs.tooltip.title"
        name="tooltip"
      />
      <RadioButton
        v-model="config.gridlines"
        :options="radioConfigs.gridlines.config"
        :title="radioConfigs.gridlines.title"
        name="gridlines"
      />
      <RadioButton
        v-model="config.animations"
        :options="radioConfigs.animations.config"
        :title="radioConfigs.animations.title"
        name="animations"
      />
      <RadioButton
        v-model="config.legend"
        :options="radioConfigs.legend.config"
        :title="radioConfigs.legend.title"
        name="legend"
      />
    </template>
  </ChartContainer>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import BarChart from "@/graphs/BarChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import { nanoid } from "nanoid";
// data imports
import { barProps } from "@/data/props";
import { barPreview } from "@/data/previewData";

// DATA
const barData = [
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

//Radio configs
const radioConfigs = {
  gridlines: {
    title: "Gridlines",
    config: [
      { id: nanoid(10), label: "On", value: "true" },
      { id: nanoid(10), label: "Off", value: "false" },
    ],
  },
  animations: {
    title: "Animations",
    config: [
      { id: nanoid(10), label: "On", value: "true" },
      { id: nanoid(10), label: "Off", value: "false" },
    ],
  },
  tooltip: {
    title: "Tooltip",
    config: [
      { id: nanoid(10), label: "On", value: "true" },
      { id: nanoid(10), label: "Off", value: "false" },
    ],
  },
  legend: {
    title: "Legend",
    config: [
      { id: nanoid(10), label: "On", value: "true" },
      { id: nanoid(10), label: "Off", value: "false" },
    ],
  },
};

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
  if (
    key === "tooltip" ||
    key === "gridlines" ||
    key === "animations" ||
    key === "legend"
  ) {
    return value === "true" ? "true" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  data: "barData",
  lineColor: "#fff",
  tooltip: "true",
  gridlines: "true",
  animations: "false",
  legend: "false",
});

const tooltipBoolean = computed(() => config.tooltip === "true");
const gridlinesBoolean = computed(() => config.gridlines === "true");
const animationsBoolean = computed(() => config.animations === "true");
const legendBoolean = computed(() => config.legend === "true");

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
  intro: `<div> To use the Bar Chart component, simply import it into your Vue file, pass the required props, and place it within your template. The component handles the rest, rendering a fully interactive and responsive bar chart based on your data.</div>
          <ol>
            <li class=my-[20px]>
              <strong>Customize Dimensions:</strong> Adjust the width and height of the chart to fit the design of your application.
            </li>
            <li class=my-[20px]>
              <strong>Data Visualization:</strong> Represent a wide range of data effectively, ideal for displaying comparisons between categories.
            </li>
            <li class=my-[20px]>
              <strong>Dynamic Styling:</strong> Choose between light and dark color schemes, or implement your own custom color palette.
            </li>
            <li class=my-[20px]>
              <strong>Interactive Features:</strong> Enable tooltips for a more informative user experience and add animations for a dynamic presentation.
            </li>
            <li class=my-[20px]>
              <strong>Gridlines & Labels:</strong>  Enhance readability with optional gridlines and value labels.
            </li>
          </ol>`,
};

// Code block
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const code = computed(() =>
  `</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-graphs';

const barData = ref([
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

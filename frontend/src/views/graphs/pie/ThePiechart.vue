<template>
  <!-- PieChart.vue -->
  <ChartContainer
    title="Pie Chart"
    chart-title="PieChart.vue"
    :code="code"
    :chart-props="chartProps"
    :component-props="piechartProps"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <PieChart
      :data="sectors"
      :height="280"
      :width="560"
      :legend="legendBoolean"
      :labels="labelsBoolean"
      :animations="animationsBoolean"
    />
    <template #config>
      <RadioButton
        v-model="config.labels"
        :options="radioConfigs.labels.config"
        title="Labels"
        name="labels"
      />
      <RadioButton
        v-model="config.legend"
        :options="radioConfigs.legend.config"
        title="Legend"
        name="legend"
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
import { ref, computed, reactive, watch } from "vue";
import PieChart from "@/components/graphs/PieChart.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";
// Data imports
import { piechartProps } from "@/data/props";

// PIECHART DATA
const sectors = [
  { label: "Others", value: 10 },
  { label: "Energy", value: 15 },
  { label: "Finance", value: 25 },
  { label: "Technology", value: 30 },
  { label: "Healthcare", value: 20 },
];

//Radio configs
const radioConfigs = {
  animations: {
    title: "Animations",
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
  labels: {
    title: "Labels",
    config: [
      { id: nanoid(10), label: "On", value: "true" },
      { id: nanoid(10), label: "Off", value: "false" },
    ],
  },
};

const animationsBoolean = computed(() => config.animations === "true");
const legendBoolean = computed(() => config.legend === "true");
const labelsBoolean = computed(() => config.labels === "true");

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
  if (key === "labels" || key === "legend" || key === "animations") {
    return value === "true" ? "true" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  lineData: [],
  selectedStocks: [],
  lineColor: "#fff",
  labels: "true",
  legend: "true",
  animations: "false",
});

const chartProps = computed(() => {
  return Object.entries(config)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null);
});

// Code block
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const code = computed(() =>
  `</template>

<script setup>
import { ref } from 'vue';
import { LineChart } from 'vue-graphs';
import { data } from "@/data";

const formattedLineData = data.map((item) => ({
  x: item.Date,
  y: item.Close,
}));

const lineData = ref([
  {
    color: "#fffff",
    values: formattedLineData,
  },
]);

</${placeholder}>`.replace(new RegExp(placeholder, "g"), "script")
);

// Texts
const texts = {
  intro: `<div>  Pie Chart component, designed for Vue 3 applications, is a versatile and visually appealing way to display data in a circular graph format. This component is built with Vue 3's Composition API and D3.js, ensuring a smooth and interactive user experience.</div>
          <ol>
            <li class=my-[20px]>
              <strong>Customizable Dimensions:</strong> Set the width and height to fit the pie chart perfectly within your UI.
            </li>
            <li class=my-[20px]>
              <strong>Data Representation:</strong> Ideal for showcasing proportional data, with each slice representing a part of the whole.
            </li>
            <li class=my-[20px]>
              <strong>Color Customization:</strong> Use a predefined set of colors or implement your custom color scheme for the pie slices.
            </li>
            <li class=my-[20px]>
              <strong>Interactive Legends and Labels:</strong> Optionally add legends and labels to make the chart more informative and user-friendly.
            </li>
            <li class=my-[20px]>
              <strong>Responsive and Reactive:</strong> Adapts to different screen sizes and dynamically updates when data changes.
            </li>
          </ol>`,
};
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

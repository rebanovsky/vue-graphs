<template>
  <!-- TheTreemap.vue -->
  <ChartContainer
    title="Tree Map"
    chart-title="TreeMap"
    :code="code"
    :chart-props="chartProps"
    :component-props="treemapProps"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <TreeMap
      :data="sampleTreeData"
      :width="560"
      :height="280"
      :palette="colorPalette"
    />
    <template #config> </template>
  </ChartContainer>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import TreeMap from "@/graphs/TreeMap.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import { nanoid } from "nanoid";
//Data imports
import { treemapProps } from "@/data/props";

// Treemap data
const sampleTreeData = ref({
  name: "Global Industries",
  children: [
    {
      name: "Technology",
      children: [
        {
          name: "AAPL",
          value: 300,
        },
        {
          name: "MSFT",
          value: 280,
        },
        {
          name: "GOOG",
          value: 270,
        },
        {
          name: "AMZN",
          value: 260,
        },
      ],
    },
    {
      name: "Automotive",
      children: [
        {
          name: "TSLA",
          value: 200,
        },
        {
          name: "TYO",
          value: 180,
        },
        {
          name: "F",
          value: 160,
        },
        {
          name: "VW",
          value: 140,
        },
      ],
    },
    {
      name: "Finance",
      children: [
        {
          name: "JPM",
          value: 220,
        },
        {
          name: "GS",
          value: 210,
        },
        {
          name: "MS",
          value: 205,
        },
        {
          name: "BAC",
          value: 200,
        },
      ],
    },
    {
      name: "Telecommunications",
      children: [
        {
          name: "VZ",
          value: 150,
        },
        {
          name: "T",
          value: 145,
        },
        {
          name: "TMUS",
          value: 140,
        },
      ],
    },
  ],
});

// Palette
const colorPalette = ["#57E2E5", "#FEC3A6", "#FFAC81", "#FF928B"];

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

const colorOptions = ref([{ id: "color1", label: "Blue", value: "#0000FF" }]);

const mapDisplayValue = (key, value) => {
  if (key === "tooltip" || key === "gridlines" || key === "animations") {
    return value === "on" ? "on" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  data: "treeMapData",
  width: "560",
  height: "280",
  palette: "colorPalette",
});

const chartProps = computed(() => {
  return Object.entries(config)
    .map(([key, value]) => ({
      name: key,
      value: mapDisplayValue(key, value),
    }))
    .filter((prop) => prop.value !== null);
});

// Texts
const texts = {
  intro: `<div>
  The Treemap component offers a unique and intuitive way to visualize hierarchical data using nested rectangles. Each branch of the tree is represented as a rectangle, with its size and color representing some metric, making it easy to compare different categories and subcategories at a glance.
</div>
<ol>
  <li class="my-[20px]">
    <strong>Efficient Data Representation:</strong> Efficiently display large amounts of hierarchical data in a compact space, highlighting important patterns and trends.
  </li>
  <li class="my-[20px]">
    <strong>Customizable Color Scheme:</strong> Utilize a range of colors to differentiate between various levels of the hierarchy, enhancing the visual appeal and readability.
  </li>
  <li class="my-[20px]">
    <strong>Interactive Tooltip:</strong> Feature tooltips that provide additional information when users hover over individual rectangles, offering a deeper insight into the data.
  </li>
  <li class="my-[20px]">
    <strong>Dynamic Sizing:</strong> The rectangles' sizes are dynamically scaled according to the data values they represent, allowing for a quick assessment of relative metrics.
  </li>
  <li class="my-[20px]">
    <strong>Flexible Data Input:</strong> The component is designed to accept a wide range of hierarchical data structures, making it versatile for various applications.
  </li>
</ol>`,
};

// Code block
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const code = computed(() =>
  `</template>

<script setup>
import { ref } from 'vue';
import { TreeMap } from 'vue-graphs';

const treeMapData = ref({
  name: "Global Industries",
  children: [
    {
      name: "Technology",
      children: [
        {
          name: "AAPL",
          value: 300,
        },
        {
          name: "MSFT",
          value: 280,
        },
        {
          name: "GOOG",
          value: 270,
        },
        {
          name: "AMZN",
          value: 260,
        },
      ],
    },
    {
      name: "Automotive",
      children: [
        {
          name: "TSLA",
          value: 200,
        },
        {
          name: "TYO",
          value: 180,
        },
        {
          name: "F",
          value: 160,
        },
        {
          name: "VW",
          value: 140,
        },
      ],
    },
    {
      name: "Finance",
      children: [
        {
          name: "JPM",
          value: 220,
        },
        {
          name: "GS",
          value: 210,
        },
        {
          name: "MS",
          value: 205,
        },
        {
          name: "BAC",
          value: 200,
        },
      ],
    },
    {
      name: "Telecommunications",
      children: [
        {
          name: "VZ",
          value: 150,
        },
        {
          name: "T",
          value: 145,
        },
        {
          name: "TMUS",
          value: 140,
        },
      ],
    },
  ],
});

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

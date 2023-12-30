<template>
  <!-- TheTreemap.vue -->
  <ChartContainer
    title="Tree Map"
    chart-title="TreeMap.vue"
    :code="code"
    :chart-props="chartProps"
    :component-props="treemapProps"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <TheTreemap :data="sampleTreeData" />
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
    </template>
  </ChartContainer>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import TheTreemap from "@/components/graphs/TheTreemap.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";
//Data imports
import { treemapProps } from "@/data/props";

// Treemap data
const sampleTreeData = ref({
  name: "Root",
  children: [
    {
      name: "Category 1",
      children: [
        { name: "Leaf A", value: 10 },
        { name: "Leaf B", value: 20 },
      ],
    },
    {
      name: "Category 2",
      children: [{ name: "Leaf C", value: 30 }],
    },
  ],
});

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
  name: "Root",
  children: [
    {
      name: "Category 1",
      children: [
        { name: "Leaf A", value: 10 },
        { name: "Leaf B", value: 20 },
      ],
    },
    {
      name: "Category 2",
      children: [{ name: "Leaf C", value: 30 }],
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

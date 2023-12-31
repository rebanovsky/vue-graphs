<template>
  <!-- TheHeatmap.vue -->
  <ChartContainer title="Heat Map" chart-title="HeatMap" :code="code" :component-props="heatmapProps" :chart-props="chartProps">
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <TheHeatmap :geo-json-data="geoJson"/>
    <template #config>
    </template>
  </ChartContainer>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { geoJson } from "@/data/geoJson";
import TheHeatmap from "@/graphs/TheHeatmap.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import { nanoid } from "nanoid";
// Data imports
import { heatmapProps } from "@/data/props";

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
  geoJsonData: 'geoJson',
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

// Texts for Heatmap Component

const texts = {
  intro: `<div> The Heatmap component, integrating Vue and D3.js, is a dynamic tool for visualizing geographical data. It's perfect for applications requiring a visual representation of data variations across different regions. Easy to integrate and interact with, this component enhances the user's data interpretation experience.</div>
          <ol>
            <li class="my-[20px]">
              <strong>Dynamic Data Visualization:</strong> Effortlessly handle and visualize geographical data, ideal for representing regional variations.
            </li>
            <li class="my-[20px]">
              <strong>Customizable Mapping:</strong> Adapt the component to various geographical representations, including countries or custom geoJSON data.
            </li>
            <li class="my-[20px]">
              <strong>Interactive User Experience:</strong> Engage users with interactive features like hover effects to display detailed data about each region.
            </li>
            <li class="my-[20px]">
              <strong>Aesthetic and Customizable Design:</strong> Customize the color scale to match your data set or design preferences, enhancing the aesthetic appeal.
            </li>
            <li class="my-[20px]">
              <strong>Responsive and Scalable:</strong> Ensure a consistent user experience across various devices with responsive and scalable design.
            </li>
          </ol>`,
};

// Code block
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const code = computed(() =>
  `</template>

<script setup>
import { ref } from 'vue';
import { HeatMap } from 'vue-graphs';
import { geoJson } from '@/data'

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

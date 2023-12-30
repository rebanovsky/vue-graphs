<template>
  <!-- TheCandlestick.vue -->
  <ChartContainer
    title="Candlestick"
    chart-title="TheCandlestick.vue"
    :code="code"
    :chart-props="chartProps"
    :component-props="candlestickProps"
    :preview-data="linePreview"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <TheCandlestick
      :data="candleStickData"
      :width="500"
      :height="230"
      :tooltip="tooltipBoolean"
      :gridlines="gridlinesBoolean"
      :animations="animationsBoolean"
    />
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
import { ref, reactive, computed } from "vue";
import { line1, line2 } from "@/data/dummyMultiLine";
import TheCandlestick from "@/components/graphs/TheCandlestick.vue";
import MultiSelect from "@/components/common/MultiSelect.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";
//data imports
import { candlestickProps } from "@/data/props";
import { linePreview } from "@/data/previewData";

// Candlestick data
const candleStickData = line1.slice(0, 50);

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

const tooltipBoolean = computed(() => config.tooltip === "true");
const gridlinesBoolean = computed(() => config.gridlines === "true");
const animationsBoolean = computed(() => config.animations === "true");

const colorOptions = ref([{ id: "color1", label: "Blue", value: "#0000FF" }]);

const mapDisplayValue = (key, value) => {
  if (key === "tooltip" || key === "gridlines" || key === "animations") {
    return value === "true" ? "true" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  data: "lineData",
  lineColor: "#fff",
  tooltip: "false",
  gridlines: "false",
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

// TEXTS
const texts = {
  intro: `<ul>
    <li class=my-[20px]>
      <strong>Data Structure:</strong> Each data point in the candlestick chart is represented by an object with <em>Date</em>, <em>Open</em>, <em>High</em>, <em>Low</em>, and <em>Close</em> properties. These properties correspond to the key aspects of financial data for a given time period.
    </li>
    <li class=my-[20px]>
      <strong>Component Usage:</strong> The example uses a custom <em>CandlestickChart</em> component that leverages D3.js for rendering. This component accepts props like <em>data</em>, <em>width</em>, <em>height</em>, and <em>margin</em>, offering customization for the chart's layout and dimensions.
    </li>
    <li class=my-[20px]>
      <strong>Interactive Features:</strong> The chart includes interactive elements such as hover effects and tooltips to provide a detailed view of the data points.
    </li>
    <li class=my-[20px]>
      <strong>Customization:</strong> The chart's appearance, including colors and styles, can be customized based on whether the opening price is higher or lower than the closing price, indicated by different colors.
    </li>
  </ul>`,
};

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

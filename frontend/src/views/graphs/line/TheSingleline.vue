<template>
  <!-- SingleLine.vue -->
  <ChartContainer
    title="Line Chart"
    chart-title="SingleLine.vue"
    :code="code"
    :chart-props="chartProps"
    :component-props="lineProps"
    :preview-data="linePreview"
  >
    <template #intro>
      <div v-html="texts.intro"></div>
    </template>
    <SingleLine
      :width="560"
      :height="280"
      :data="lineData"
      dateFormat="%Y-%m-%d"
      :line-color="lineColor"
      :tooltip="tooltipBoolean"
      :gridlines="gridlinesBoolean"
      :animations="animationsBoolean"
    />
    <template #config>
      <ColorPicker
        v-model="config.lineColor"
        :options="colorOptions"
        title="Line Color"
        @colorChange="handleValue"
      />
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
    <template #code-block>
      <div
        class="codeblock h-[100%] text-[12px] transition ease duration-100 flex flex-col gap-[8px] w-[100%]"
      >
        <div
          class="copy-code w-[100%] flex gap-[8px] h-[40px] justify-end border-b-[1px] border-b-slate-300 dark:border-b-slate-800 pb-[8px]"
        >
          <Transition name="slide-up">
            <SvgIcon
              name="copy"
              dynamicClass="hover:fill-slate-900 cursor-pointer p-[2px] dark:hover:!fill-slate-200"
            />
          </Transition>
        </div>
      </div>
    </template>
  </ChartContainer>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import SingleLine from "@/components/graphs/SingleLine.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import RadioToggle from "@/components/common/RadioToggle.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";
// data imports
import { line1 } from "@/data/dummyMultiLine";
import { lineProps } from "@/data/props";
import { linePreview } from "@/data/previewData";

// line color
const lineColor = ref("#FF5733");

const handleValue = (val) => {
  lineColor.value = val;
};

watch(lineColor, (newVal) => {
  config.lineColor = newVal;
});

// data manipulations
const formattedLineData = line1.map((item) => ({
  x: item.Date,
  y: item.Close,
}));

const lineData = ref([
  {
    color: "#fffff",
    values: formattedLineData,
  },
]);

// radio configs
const radioConfigs = {
  animations: {
    title: "Animations",
    config: [
      { id: nanoid(10), label: "On", value: "true" },
      { id: nanoid(10), label: "Off", value: "false" },
    ],
  },
  gridlines: {
    title: "Gridlines",
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

// Texts
const texts = {
  intro: `<ol>
            <li class=my-[20px]>
              <strong>Data Structure:</strong> It is crucial to format your data correctly for the line chart. Each data point in the series should be an object with <em>x</em> and <em>y</em> properties, where <em>x</em> represents the label (in this case, the month) and <em>y</em> is the corresponding value (monthly sales figures).
            </li>
            <li class=my-[20px]>
              <strong>Component Usage:</strong> The <em>SingleLine</em> component from our chart library is used to render the line chart. This component accepts props like <em>data</em>, <em>width</em>, <em>height</em>, <em>dotColor</em>, <em>lineColor</em>, and more, allowing for extensive customization of the chart's appearance.
            </li>
            <li class=my-[20px]>
              <strong>Responsive and Interactive:</strong> The chart is designed to be responsive and interactive, with features like tooltips and gridlines enabled for a better user experience.
            </li>
          </ol>`,
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

<style lang="scss" scoped></style>

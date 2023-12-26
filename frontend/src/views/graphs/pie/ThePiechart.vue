<template>
  <!-- PieChart.vue -->
  <ChartContainer title="ThePiechart.vue" :component-props="piechartProps">
    <PieChart
      :data="sectors"
      :height="280"
      :width="560"
      :legend="legendBoolean"
      :labels="labelsBoolean"
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
      <ColorPicker
        v-model="config.lineColor"
        :options="colorOptions"
        title="Line Color"
      />
    </template>
    <template #code-block>
      <div
        class="codeblock h-[100%] text-[12px] transition ease duration-100 flex flex-col gap-[8px] w-[100%] font-mono"
      >
        <div
          class="copy-code w-[100%] flex justify-end border-b-[1px] border-b-slate-300 dark:border-b-slate-800 pb-[8px]"
        >
          <SvgIcon
            name="copy"
            dynamicClass="hover:fill-slate-900 cursor-pointer p-[2px] dark:hover:!fill-slate-200"
          />
        </div>
        <div class="flex gridlines h-[100%] items-center justify-center">
          <div class="flex flex-col relative" v-if="chartProps.length > 0">
            <div class="top flex">
              {{ "<" }}
              <div class="component-name text-[#e85700] dark:text-[#f8d339]">
                ThePiechart
              </div>
            </div>
            <transition-group name="list" tag="div">
              <div
                class="props pl-[16px] flex max-w-[180px]"
                v-for="prop in chartProps"
                :key="prop.name"
              >
                :
                <div class="props-name text-[#000cd4] dark:text-[#f765f0]">
                  {{ prop.name }}
                </div>
                =
                <div
                  class="props-value text-[#c330ba] dark:text-[#ffb648] truncate"
                >
                  {{ prop.value }}
                </div>
              </div>
            </transition-group>
            <div class="bottom">{{ "/>" }}</div>
          </div>
        </div>
      </div>
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
      { id: nanoid(10), label: "On", value: "on" },
      { id: nanoid(10), label: "Off", value: "off" },
    ],
  },
  legend: {
    title: "Legend",
    config: [
      { id: nanoid(10), label: "On", value: "on" },
      { id: nanoid(10), label: "Off", value: "off" },
    ],
  },
  labels: {
    title: "Labels",
    config: [
      { id: nanoid(10), label: "On", value: "on" },
      { id: nanoid(10), label: "Off", value: "off" },
    ],
  },
};

const animationsBoolean = computed(() => config.animations === "on");
const legendBoolean = computed(() => config.legend === "on");
const labelsBoolean = computed(() => config.labels === "on");

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
    return value === "on" ? "on" : null;
  }
  return JSON.stringify(value);
};

const config = reactive({
  lineData: [],
  selectedStocks: [],
  lineColor: "#fff",
  labels: "on",
  legend: "off",
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

<template>
  <!-- SingleLine.vue -->
  <ChartContainer
    title="SingleLine.vue"
    :component-props="lineProps"
    :preview-data="linePreview"
  >
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
      <RadioToggle title="Tooltip" />
      <RadioToggle title="Gridlines" />
      <RadioToggle title="Animations" />
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
        @mouseover="isHovered = true"
        @mouseleave="isHovered = false"
      >
        <div
          class="copy-code w-[100%] flex gap-[8px] h-[40px] justify-end border-b-[1px] border-b-slate-300 dark:border-b-slate-800 pb-[8px]"
        >
          <Transition name="slide-up">
            <SvgIcon
              v-if="isHovered"
              name="copy"
              dynamicClass="hover:fill-slate-900 cursor-pointer p-[2px] dark:hover:!fill-slate-200"
            />
          </Transition>
        </div>
        <div
          class="flex gridlines font-mono h-[100%] items-center justify-center"
        >
          <div class="flex flex-col relative" v-if="chartProps.length > 0">
            <div class="top flex">
              {{ "<" }}
              <div class="component-name text-[#e85700] dark:text-[#f8d339]">
                SingleLine
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
import { ref, reactive, computed, watch, onMounted } from "vue";
import SingleLine from "@/components/graphs/SingleLine.vue";
import RadioButton from "@/components/common/RadioButton.vue";
import RadioToggle from "@/components/common/RadioToggle.vue";
import ColorPicker from "@/components/common/ColorPicker.vue";
import ChartContainer from "@/components/common/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
import { nanoid } from "nanoid";
// data imports
import { line1 } from "@/data/dummyMultiLine";
import { lineProps } from "@/data/props";
import { linePreview } from "@/data/previewData";

onMounted(() => {
  console.log("lineProps: ", lineProps);
});
// utils
const isHovered = ref(false);

// line color
const lineColor = ref("#ffffff");

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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(4px);
  opacity: 0;
}

.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>

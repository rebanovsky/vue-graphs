<template>
  <!-- TheBubblechart.vue -->
  <ChartContainer
    title="Bubble chart"
    chart-title="BubbleChart.vue"
    :component-props="bubblechartProps"
    :preview-data="linePreview"
  >
    <template #intro>
      <!-- <div v-html="texts.intro"></div> -->
    </template>
    <BubbleChart :data="bubbleData" :width="560" :height="280" />

    <template #config>
      <RadioToggle title="Tooltip" />
      <RadioToggle title="Gridlines" />
      <RadioToggle title="Animations" />
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
                Bubblechart
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
import { computed, reactive } from "vue";
import BubbleChart from "@/components/graphs/BubbleChart.vue";
import RadioToggle from "@/components/common/RadioToggle.vue";
import ChartContainer from "@/components/templates/ChartContainer.vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";
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

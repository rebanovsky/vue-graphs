<template>
  <div class="flex flex-col gap-[40px]">
    <CodeBlock :code="lineCode" />
    <SingleLine
      :data="lineData"
      :width="480"
      :height="200"
      dotColor="#05D9FF"
      lineColor="#FF5733"
      tooltip
      gridlines
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CodeBlock from "@/components/common/CodeBlock.vue";
import SingleLine from "@/components/graphs/SingleLine.vue";

const monthlySales = [
  { month: "January", value: 62 },
  { month: "February", value: 69 },
  { month: "March", value: 99 },
  { month: "April", value: 136 },
  { month: "May", value: 144 },
  { month: "June", value: 177 },
  { month: "July", value: 199 },
  { month: "August", value: 178 },
  { month: "September", value: 240 },
  { month: "October", value: 287 },
  { month: "November", value: 297 },
  { month: "December", value: 321 },
];

const formattedLineData = monthlySales.map((item) => ({
  x: item.month,
  y: item.value,
}));

const lineData = ref([
  {
    color: "#fffff",
    values: formattedLineData,
  },
]);

const lineCode = ref(`<template>
  <div>
    <SingleLine
      :data="lineData"
      :width="400"
      :height="200"
      dotColor="#05D9FF"
      lineColor="#FF5733"
      tooltip
      gridlines
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import SingleLine from "vue-graphs";

const monthlySales = [
  { month: "January", value: 262 },
  { month: "February", value: 369 },
  { month: "March", value: 259 },
  { month: "April", value: 286 },
  { month: "May", value: 414 },
  { month: "June", value: 297 },
  { month: "July", value: 119 },
  { month: "August", value: 368 },
  { month: "September", value: 157 },
  { month: "October", value: 387 },
  { month: "November", value: 347 },
  { month: "December", value: 221 },
];

const formattedLineData = monthlySales.map((item) => ({
  x: item.month,
  y: item.value,
}));

const lineData = ref([
  {
    color: "#fffff",
    values: formattedLineData,
  },
]);`);
</script>

<style lang="scss" scoped></style>

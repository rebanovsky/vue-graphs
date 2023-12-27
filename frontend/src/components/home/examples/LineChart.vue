<template>
  <div class="flex flex-col gap-[40px]">
    <CodeBlock :code="lineCode" />
    <SingleLine
      :data="lineData"
      :width="480"
      :height="200"
      dot-color="#05D9FF"
      line-color="#FF5733"
      tooltip
      gridlines
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
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

const placeholder = 'SCRIPT_TAG_PLACEHOLDER';

const lineCode = computed(() => `<template>
  <SingleLine
    :data="lineData"
    :width="400"
    :height="200"
    dotColor="#05D9FF"
    lineColor="#FF5733"
    tooltip
    gridlines
  />
</template>

<script setup>
import { ref } from "vue";
import SingleLine from "vue-graphs";

const monthlySales = [
  { month: "January", sales: 262 },
  { month: "February", sales: 369 },
  { month: "March", sales: 259 },
  { month: "April", sales: 286 },
  { month: "May", sales: 414 },
  { month: "June", sales: 297 },
  { month: "July", sales: 119 },
  { month: "August", sales: 368 },
  { month: "September", sales: 157 },
  { month: "October", sales: 387 },
  { month: "November", sales: 347 },
  { month: "December", sales: 221 },
];

const formattedLineData = monthlySales.map((item) => ({
  x: item.month,
  y: item.sales,
}));

const lineData = ref([
  {
    color: "#fffff",
    values: formattedLineData,
  },
]);
</${placeholder}>`.replace(new RegExp(placeholder, 'g'), 'script'));

</script>

<style lang="scss" scoped></style>

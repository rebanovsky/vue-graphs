<template>
  <div class="the-mainfeed w-[100%]">
    <div class="feed-items w-[100%] flex flex-col gap-[64px]">
      <div class="feed-item flex gap-[8px] w-[100%]" v-for="i in 6">
        <div class="item-time border-[0px] w-[100%] flex justify-end px-[4px] text-[10px] text-slate-600">07.20 pm</div>
        <div class="item-content w-[400px] flex gap-[8px] flex-1 flex-col justify-center">
          <div class="name font-medium text-[14px]">Title</div>
          <div class="sample-graph flex flex-col gap-[4px] flex items-center" v-if="chartData">
            <SingleLine
              :data="chartData"
              dateFormat="%Y-%m-%d"
            />
          </div>
        </div>
        <div class="item-source border-[0px] w-[100%] px-[4px] text-[10px] text-slate-600">SOURCE</div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLine from "@/components/v-graphs/graphs/SingleLine.vue";
import { line1 } from "@/data/dummyMultiLine";

import { ref } from "vue";

export default {
  components: { SingleLine },
  setup() {
    const formattedData = line1.map((item) => ({
      x: item.Date,
      y: item.Close,
    }));

    const chartData = ref([
      {
        color: "#061826",
        values: formattedData,
      },
    ]);

    return { chartData };
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="content-wrapper flex flex-col rounded-[12px] gridlines"
  >
    <div class="main-content">
      <FinancialTable :columns="columns" :data="events" />
    </div>
  </div>
</template>

<script>
import FinancialTable from "@/components/common/FinancialTable.vue";
import { events } from "@/data/dummyData";

export default {
  components: { FinancialTable },
  setup() {
    const columns = [
      { name: "Date", width: "68px", justify: 'flex-start' },
      { name: "Country", width: "68px", justify: 'center' },
      { name: "Event", width: "280px", justify: 'flex-start' },
      { name: "Previous", width: "80px", justify: 'flex-end' },
      { name: "Estimate", width: "80px", justify: 'flex-end' },
      { name: "Actual", width: "80px", justify: 'flex-end' },
      { name: "Change", width: "80px", justify: 'flex-end' },
      { name: "Impact", width: "88px", justify: 'flex-end' },
    ];

    return { events, columns };
  },
};
</script>

<style lang="scss" scoped></style>

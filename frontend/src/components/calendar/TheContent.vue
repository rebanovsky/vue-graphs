<template>
  <div class="the-content flex h-[100%] justify-end">
    <div class="content-leftie w-[258px] p-[4px]">
      <Calendar
        title-position="left"
        borderless
        class="monthly-calendar bg-slate-100"
        style="font-family: Poppins"
        :attributes="attrs"
      />
      <div class="divider border-t-[1px] border-t-slate-300"></div>
      <div class="text-slate-400 p-[4px]">CALENDAR<br />OPTIONS</div>
    </div>
    <div class="main-calendar rounded gridlines h-[100%] w-[100%] p-[4px]">
      <FinancialTable :columns="columns" :data="events" width="800px" />
    </div>
  </div>
</template>

<script>
import { Calendar, DatePicker } from "v-calendar";
import { ref } from "vue";
import FinancialTable from "@/components/common/FinancialTable.vue";
import { events } from "@/data/dummyData";
import "v-calendar/style.css";

export default {
  components: {
    Calendar,
    DatePicker,
    FinancialTable,
  },
  setup() {
    const attrs = ref([
      {
        highlight: true,
        dates: new Date(),
      },
    ]);

    const columns = [
      { name: "Date", width: "60px" },
      { name: "Country", width: "60px" },
      { name: "Event", width: "240px" },
      // { name: 'Currency', width: '40px' },
      { name: "Previous", width: "72px" },
      { name: "Estimate", width: "72px" },
      { name: "Actual", width: "72px" },
      { name: "Change", width: "72px" },
      { name: "Impact", width: "80px" },
      // { name: 'ChangePercentage', width: '0px' },
    ];
    return { attrs, events, columns };
  },
};
</script>

<style lang="scss" scoped>
.vc-header .vc-title {
  font-weight: 200 !important;
}
</style>

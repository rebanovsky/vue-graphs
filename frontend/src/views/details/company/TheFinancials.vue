<template>
  <div class="company-content flex flex-1 gap-[12px] w-[100%] overflow-hidden">
    <div
      class="content-side w-[240px] gridlines rounded-[8px] p-[12px]"
    >
      <div class="side-view-wrapper flex flex-col gap-[16px] text-[12px] py-[96px]">
        <div class="side-view" v-for="view in views">
          <div class="side-label cursor-pointer hover:text-slate-600 w-auto">{{ view.label }}</div>
        </div>
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <div
        class="main-content border-[0px] flex flex-col gap-[28px] gridlines rounded-[8px] p-[12px]"
        v-if="incomeStatement && incomeStatement.length > 0"
      >
        <div class="table-config-wrapper">
          <div
            class="tables text-[11px] font-normal flex items-center gap-[12px] text-slate-400"
          >
            <div
              v-for="tab in financialTabs"
              :key="tab.id"
              class="cursor-pointer"
              :class="
                isFinancial === tab.id
                  ? 'text-slate-900 dark:text-slate-100 border-b-[1px] border-slate-900 dark:border-slate-100'
                  : ''
              "
            >
              {{ tab.label }}
            </div>
            <div class="dot bg-slate-500 h-[2px] w-[2px] rounded-[2px] mx-[4px]"></div>
            <div class="table-configs text-[14px] hover:bg-slate-50 cursor-pointer rounded px-[6px] py-[2px]">
              <FontAwesomeIcon :icon="['fas', 'file-excel']" class="" />
            </div>
          </div>
        </div>
        <div class="table-head text-[14px] font-medium">
          <div class="flex font-medium text-[12px]">
            <div class="w-[320px]"></div>
            <div
              v-for="year in availableYears"
              :key="year"
              class="flex justify-end w-[100px]"
            >
              {{ year }}
            </div>
          </div>
        </div>
        <div
          class="table-body flex flex-col gap-[12px] overflow-y-auto text-[12px] hide-scrollbar"
        >
          <div
            class="flex border-b-[1px] border-slate-200 dark:border-slate-800"
            v-for="item in pnl"
            :key="item.name"
            :class="[item.style]"
          >
            <div class="w-[320px]">{{ item.name }}</div>
            <div
              v-for="year in availableYears"
              :key="year"
              class="flex justify-end w-[100px]"
            >
              {{
                Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(item[year])
              }}
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import useIncomeStatement from "@/composables/useIncomeStatement";
import useFetch from "@/composables/useFetch";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  setup() {
    const route = useRoute();
    const selectedYear = ref(new Date().getFullYear());
    const availableYears = ref([]);
    const isFinancial = ref("is");
    const { keyMapping, rows } = useIncomeStatement();
    const numOfYears = ref(5);
    const financialTabs = ref([
      { id: "is", label: "Income statement" },
      { id: "bs", label: "Balance sheet" },
      { id: "cf", label: "Cash flow" },
    ]);
    const views = ref([{ id: "", label: "Analysis" },{ id: "", label: "Financial statements" },{ id: "", label: "Options" }]);
    const stockEndpoint = ref(`/api/income-statements/${route.params.ticker}`);
    const { data: incomeStatement } = useFetch(stockEndpoint);
    const pnl = computed(() => {
      rows.forEach((row) => {
        const key = keyMapping[row.name];
        availableYears.value.forEach((year) => {
          const dataForYear = incomeStatement.value?.find(
            (is) => is.calendarYear === year
          );
          if (dataForYear && key in dataForYear) {
            row[year] = dataForYear[key];
          }
        });
      });
      return rows;
    });
    const year = computed(() => {
      if (!incomeStatement.value) return [];
      return incomeStatement.value.calendarYear;
    });
    watchEffect(() => {
      if (incomeStatement.value) {
        const yearsWithData = incomeStatement.value
          .map((is) => is.calendarYear)
          .slice(0, numOfYears.value)
          .sort((a, b) => b - a);
        availableYears.value = yearsWithData;
      }
    });
    return {
      pnl,
      isFinancial,
      year,
      selectedYear,
      availableYears,
      incomeStatement,
      keyMapping,
      rows,
      views,
      numOfYears,
      financialTabs,
    };
  },
  components: { FontAwesomeIcon },
};
</script>

<style lang="scss" scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

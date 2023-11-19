<template>
  <div class="border-[1px] border-slate-200 rounded-[12px]">
    <div
      class="table-header flex justify-between items-center p-[6px] h-[60px] gridlines rounded-[12px]"
    >
      <div class="card-title text-[16px] font-medium">
        {{ tableTitle }}
      </div>
      <div
        class="download-wrapper flex text-[12px] leading-4 items-center gap-[8px]"
      >
        <div class="dwnld-data">Download</div>
        <div
          class="download-type cursor-pointer flex leading-5 px-[4px] border-slate-300 hover:bg-slate-50 items-center text-slate-600 hover:text-slate-900 border-[1px] rounded"
          @click="exportToExcel"
        >
          xlsx
        </div>
        <div
          class="download-type cursor-pointer flex leading-5 px-[4px] border-slate-300 hover:bg-slate-50 items-center text-slate-600 hover:text-slate-900 border-[1px] rounded"
        >
          csv
        </div>
      </div>
    </div>
    <div class="table-wrapper flex h-full">
      <div
        class="flex-1 flex flex-col border-[0px] border-slate-200 dark:border-slate-800 text-[12px] rounded overflow-hidden"
      >
        <div class="header flex">
          <div
            v-for="column in columns"
            :key="column.key"
            class="header-cell flex font-medium p-[6px] border-b-[1px] border-slate-400 dark:border-slate-700"
            :style="{ width: column.width, justifyContent: column.alignment }"
            @click="toggleSort(column.key)"
          >
            <div class="cursor-pointer">
              {{ column.label }}
              <span v-if="sortBy === column.key && sortOrder === 1">⬆</span>
              <span v-if="sortBy === column.key && sortOrder === -1">⬇</span>
            </div>
          </div>
        </div>
        <div
          class="table-rows flex-0 overflow-y-auto"
          :style="{ height: `calc(100vh - ${tableHeightAdjust})` }"
        >
          <div
            v-for="row in rows"
            :key="row.id"
            class="row flex flex-col transition ease duration-75"
          >
            <div
              class="flex cursor-pointer hover:bg-slate-50  py-[8px] dark:hover:bg-slate-800 border-b-[1px] border-slate-200 dark:border-slate-800"
              @click="() => toggleRow(row.id)"
            >
              <div
                v-for="column in columns"
                :key="column.key"
                class="cell border-[0px] border-slate-200 hover:z-10"
                :style="{
                  width: column.width,
                  justifyContent: column.alignment,
                }"
              >
                {{ formatData(row[column.key], column.format) }}
              </div>
            </div>
            <div
              v-if="row.expanded"
              class="h-[100px] p-[8px] border-b-[1px] border-slate-200 dark:border-slate-800"
            >
              <div
                class="detail-content border-[1px] border-slate-300 h-[100%]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs, computed } from "vue";
import excelIcon from "@/assets/icons/excel_noun.svg";
import TheCard from "@/components/common/cards/TheCard.vue";
import * as XLSX from "xlsx";

export default {
  name: "TheTable",
  components: { TheCard },
  props: {
    tableTitle: {
      type: String,
      default: "Table",
    },
    columns: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
    tableHeightAdjust: {
      type: String,
    },
  },
  setup(props) {
    const { columns } = toRefs(props);

    function formatData(data, format) {
      const formattedNumber =
        typeof data === "number" ? Number(data).toLocaleString("en-US") : data;

      switch (format) {
        case "currency":
          return `$${formattedNumber}`;
        case "percentage":
          return `${Number(data).toFixed(2)}%`;
        default:
          return formattedNumber;
      }
    }

    // Sorting state
    const sortBy = ref(null);
    const sortOrder = ref(0);

    const processedRows = computed(() => {
      // Add the expanded state
      const withExpanded = props.rows.map((row) => ({
        ...row,
        expanded: false,
      }));

      // Return early if there's no sorting
      if (sortOrder.value === 0) return withExpanded;

      return withExpanded.sort((a, b) => {
        const valueA = a[sortBy.value];
        const valueB = b[sortBy.value];

        if (valueA < valueB) return -1 * sortOrder.value;
        if (valueA > valueB) return 1 * sortOrder.value;
        return 0;
      });
    });

    function exportToExcel() {
      // Assuming your data is in a format that can be consumed by XLSX.utils.json_to_sheet
      const worksheet = XLSX.utils.json_to_sheet(props.rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Write the workbook to a file
      XLSX.writeFile(workbook, `${props.tableTitle}.xlsx`);
    }

    const toggleSort = (columnKey) => {
      if (sortBy.value !== columnKey || sortOrder.value === -1) {
        sortBy.value = columnKey;
        sortOrder.value = 1;
      } else {
        sortOrder.value = -1;
      }
    };

    const toggleRow = (rowId) => {
      const row = processedRows.value.find((r) => r.id === rowId);
      if (row) {
        row.expanded = !row.expanded;
      }
    };

    return {
      columns,
      rows: processedRows,
      sortOrder,
      sortBy,
      toggleSort,
      formatData,
      excelIcon,
      toggleRow,
      exportToExcel,
    };
  },
};
</script>

<style scoped>
/* Style your table here */
</style>

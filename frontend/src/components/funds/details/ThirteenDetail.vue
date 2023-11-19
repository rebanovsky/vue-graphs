<template>
  <div class="component">
    <div class="selected-date">
      {{ yrAndQtr(selectedDate) }}
    </div>
    <div class="fund-13f">
      <div class="dates-13f">
        <div
          class="dates-row dark:hover:bg-darkupperribbon hover:bg-boxborder"
          v-for="(d, index) in dates"
          :key="index"
          @click="emitDate(d)"
        >
          {{ yrAndQtr(d) }}
        </div>
      </div>
      <div class="table-13f">
        <div
          class="comp-tertiary h-[24px] flex mt-[12px] border-b-[1px] border-slate-300 dark:border-slate-600"
        >
          <div class="tert-item w-[60px] text-slate-500 px-[8px]">
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Ticker</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
          <div
            class="tert-item w-[60px] text-slate-500 flex justify-end px-[8px]"
          >
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Shares</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
          <div
            class="tert-item w-[80px] text-slate-500 px-[8px] flex justify-end"
          >
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Value</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
          <div
            class="tert-item w-[160px] text-slate-500 flex justify-end px-[8px]"
          >
            <div
              class="text-[11px] flex items-center transition ease duration-75"
            >
              <div class="tert-name">Security type</div>
              <!-- <font-awesome-icon icon="fa-solid fa-filter" class="filter-toggle" /> -->
            </div>
          </div>
        </div>
        <div class="table-rows-13f">
          <div
            class="row-13f border-b-[1px] border-slate-700"
            v-for="f in thirteen"
            :key="f"
          >
            <div class="ticker-row w-[60px] cell">
              <a
              target="_blank"
                @click.stop="showRow"
                :href="'/company/' + f.tickercusip"
                class="ticker text-slate-900 dark:text-slate-300 transition ease"
              >
                {{ f.tickercusip }}
              </a>
            </div>
            <div class="transaction-row cell w-[60px] flex justify-end">
              {{
                Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(f.shares)
              }}
            </div>
            <div class="securities-row w-[80px] flex justify-end cell">
              ${{
                Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(f.value)
              }}
            </div>
            <div class="w-[160px] flex justify-end cell">
              {{ f.titleOfClass }}
            </div>
            <div class="w-[40px] flex justify-end cell">
              <div class="" v-if="f.link">
                <a target="_blank" :href="f.link">link</a>
              </div>
              <div class="" v-else></div>
            </div>
          </div>
        </div>
        <!-- <div class="page-btns dark:text-slate-400 text-slate-600">
          <div class="page-btn" @click="previousPage">Previous</div>
          <div class="page-btn" @click="nextPage">Next</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, watchEffect } from "vue";
import keys from "@/assets/keys/keys";
import { computed } from "@vue/reactivity";

export default {
  props: ["cik"],
  setup(props) {
    let key = keys[0].value;
    let dates = ref("");
    let selectedDate = ref("");
    let thirteen = ref("");
    let holdings = ref("");

    let emitDate = (date) => {
      selectedDate.value = date;
    };

    function yrAndQtr(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth();
      const quarter = Math.floor((month + 3) / 3);

      return `${year} Q${quarter}`;
    }

    const itemsPerPage = 10;
    const currentPage = ref(1);
    const paginatedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      return thirteen.value.slice(startIndex, startIndex + itemsPerPage);
    });

    function nextPage() {
      if (currentPage.value < 10) {
        currentPage.value++;
      }
    }

    function previousPage() {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    }

    axios("").then((response) => {
      selectedDate.value = response.data[0];

      return selectedDate.value;
    });

    watchEffect(() => {
      axios("").then((response) => {
        dates.value = response.data;

        return dates.value;
      });

      axios("").then((response) => {
        thirteen.value = response.data;

        return thirteen.value;
      });

      axios("").then((response) => {
        holdings.value = response.data;


        return holdings.value;
      });
    });

    return {
      dates,
      selectedDate,
      emitDate,
      yrAndQtr,
      itemsPerPage,
      currentPage,
      thirteen,
      paginatedItems,
      nextPage,
      previousPage,
    };
  },
};
</script>

<style>
.table-rows-13f {
  height: calc(100vh - 238px);
  overflow-y: auto;
}
.row-13f {
  display: flex;
  font-size: 10px;
}

.fund-13f {
  margin: 10px 0;
  display: flex;
}

.table-13f {
  width: 400px;
  margin: 0 10px;
}

.dates-13f {
  width: 65px;
  height: 200px;
  overflow-y: auto;
  padding: 2px;
}

.dates-row {
  font-size: 10px;
  cursor: pointer;
  padding: 2px 5px;
}

.page-btns {
  display: flex;
  font-size: 10px;
  font-weight: 500;
  width: 80px;
  justify-content: space-between;
  height: 24px;
  align-items: center;
  margin: 0 10px;
}
</style>

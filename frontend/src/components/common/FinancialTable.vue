<template>
  <div
    class="container t-wrapper border-[1px] dark:border-[0px] rounded-[12px] border-slate-300"
    :style="{ width: width, height: height }"
  >
    <div
      class="t-headings flex items-end h-[28px] w-[100%] border-b-[1px] border-b-slate-300 dark:border-slate-800 text-[11px]"
    >
      <div
        class="t-heading px-[4px]"
        v-for="column in columns"
        :key="column.name"
        :style="{ width: column.width }"
      >
        {{ column.name }}
      </div>
    </div>
    <div
      class="t-content overflow-y-auto text-[11px]"
      :style="{ height: `calc(${height} - 75px)` }"
    >
      <div v-for="(row, rowIndex) in groupedData" :key="rowIndex">
        <div
          class="sticky-date absolute p-[6px] text-[12px] text-slate-600 dark:text-slate-400 border-b-[1px] border-slate-200 dark:border-slate-500 sticky z-10 top-0"
        >
          {{ formatDate(row.date) }}
        </div>
        <div
          v-for="(event, eventIndex) in row.events"
          :key="eventIndex"
          class="hover:bg-slate-50"
        >
          <div
            class="t-row flex cursor-pointer"
            @click="toggleRow(rowIndex * 1000 + eventIndex)"
          >
            <div
              class="t-data px-[4px] flex items-center py-[8px] border-b-[1px] dark:border-slate-800 border-b-slate-300"
              v-for="column in columns"
              :key="column.name"
              :style="{ width: column.width, justifyContent: column.justify }"
            >
              <div class="shrinked-row flex items-center">
                <template v-if="column.name === 'Country'">
                  <div class="flex items-center justify-center ml-[12px]">
                    <img
                      :src="getCountryFlagUrl(event.country)"
                      alt="Country Flag"
                      class="h-[12px] rounded-[2px]"
                    />
                  </div>
                </template>
                <template v-else-if="column.name === 'Date'">
                  {{ formatTime(event.date) }}
                </template>
                <template v-else>
                  {{ event[column.name.toLowerCase()] }}
                </template>
              </div>
            </div>
          </div>
          <Transition name="slidemedium" mode="out-in">
            <div
              class="expanded-row border-b-[1px] bg-slate-200 border-boxborderlight"
              v-if="shownRows.includes(rowIndex * 1000 + eventIndex)"
            >
              <div class="h-[128px] p-[8px] flex">
                <div class="data text-[14px] text-slate-500 w-[200px]">
                  DATA
                </div>
                <div
                  class="divider border-r-[1px] border-slate-300 mx-[8px]"
                ></div>
                <div
                  class="table-detail-graph w-[100%] border-[1px] border-slate-300 rounded-[16px] p-[8px] text-[14px] text-slate-500"
                >
                  GRAPH
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
      default: "400px",
    },
    height: {
      type: String,
      default: "600px",
    },
  },
  setup(props) {
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString();
    };

    const formatTime = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const getCountryFlagUrl = (iso2) => {
      if (typeof iso2 !== "string") {
        console.error("iso2 is not a string:", iso2);
        return "";
      }
      return `https://raw.githubusercontent.com/hampusborgos/country-flags/main/png250px/${iso2.toLowerCase()}.png`;
    };

    const groupedData = computed(() => {
      const groups = [];
      props.data.forEach((event) => {
        const date = new Date(event.date).toDateString();
        const existingGroup = groups.find(
          (group) => new Date(group.date).toDateString() === date
        );
        if (existingGroup) {
          existingGroup.events.push(event);
        } else {
          groups.push({ date: event.date, events: [event] });
        }
      });
      return groups;
    });

    const shownRows = ref([]);

    const toggleRow = (uniqueIndex) => {
      const index = shownRows.value.indexOf(uniqueIndex);
      if (index !== -1) {
        shownRows.value.splice(index, 1);
      } else {
        shownRows.value.push(uniqueIndex);
      }
    };

    return {
      formatDate,
      formatTime,
      getCountryFlagUrl,
      groupedData,
      toggleRow,
      shownRows,
    };
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div
    class="container text-[12px] absolute top-0 h-[40px] border-[0px] z-[10] w-[80%] bg-slate-200 dark:bg-slate-900 flex justify-center items-center gap-[40px]"
  >
    <div
      v-for="filter in filterItems"
      :key="filter.name"
      class="filter-container cursor-pointer rounded-[20px] border-[0px] border-boxborderlight flex flex-col gap-[8px] items-center"
    >
      <div
        class="filter-wrapper flex items-center gap-[8px]"
        @click="toggleFilter(filter, 'filter-wrapper-' + filter.name)"
        :id="'filter-wrapper-' + filter.name"
      >
        <div class="filter-name">{{ filter.name }}</div>
        <font-awesome-icon
          icon="fa-solid fa-caret-down"
          :class="
            filter.clicked
              ? 'rotate-m180 transition-transform ease-in-out duration-200'
              : 'rotate-0 transition-transform ease-in-out duration-200'
          "
        />
      </div>
      <Transition name="search" mode="out-in">
        <div class="filter-content border-[1px] rounded-[8px] border-slate-300 bg-slate-200 truncate mt-[16px] shadow-boxshlight" v-if="filter.clicked">
          <div class="p-[8px] text-[11px] hover:bg-slate-300" v-for="item in filter.filters">
            {{ item.name }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    const filterItems = ref([
      {
        name: "Sort",
        filters: [
          { name: "Date", value: "date" },
          { name: "Relevance", value: "relevance" },
        ],
      },
      {
        name: "Sources",
        filters: [
          { name: "Barrons", value: "barrons" },
          { name: "Bloomberg", value: "bloomberg" },
          { name: "Financial Times", value: "financialTimes" },
          { name: "Bloomberg", value: "bloomberg" },
        ],
      },
      {
        name: "Topics",
        filters: [
          { name: "Finance", value: "finance" },
          { name: "Economics", value: "economics" },
          { name: "Politics", value: "politics" },
        ],
      },
    ]);

    const currentClickedFilterId = ref(null);

    const toggleFilter = (filter, id) => {
  // First, if another filter is clicked, close all others
  if (currentClickedFilterId.value && currentClickedFilterId.value !== id) {
    filterItems.value.forEach(f => f.clicked = false);
  }

  filter.clicked = !filter.clicked;
  currentClickedFilterId.value = filter.clicked ? id : null;
};


    const handleClickOutside = (event) => {
      if (currentClickedFilterId.value && !document.getElementById(currentClickedFilterId.value).contains(event.target)) {
        filterItems.value.forEach(f => f.clicked = false);
        currentClickedFilterId.value = null;
      }
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
    });

    return { filterItems, toggleFilter };
  },
};
</script>

<style lang="scss" scoped>
.filter-container {
  position: relative;
}

.filter-content {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}
</style>

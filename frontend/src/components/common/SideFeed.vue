<template>
  <div
    class="sidenav-feed flex flex-col w-[240px]  gap-[20px] overflow-hidden"
  >
    <!-- <div
      class="sidenav-feed-config border-b-[1px] flex items-center gap-[16px] border-slate-200 p-[12px]"
    >
      <input
        type="text"
        placeholder="search"
        class="py-[8px] px-[12px] text-[14px] w-full border-[1px] border-slate-200 bg-slate-100 focus:border-slate-400 rounded-[12px]"
      />
      <div
        class="config-button w-[20px] h-[20px] flex items-center justify-center"
      >
        <img :src="settings" class="cursor-pointer" />
      </div>
    </div> -->
    <div
      class="feed-items-wrapper p-[16px] flex flex-col gap-[12px] overflow-y-auto flex-grow"
    >
      <div
        class="news-item border-[1px] flex flex-col gap-[4px] text-[12px] border-slate-200 dark:border-slate-800 rounded-[8px] p-[8px] w-full h-[100px]"
        v-for="n in items"
        :key="n"
      >
        <div class="news-publisher text-[10px] text-slate-600">
          {{ n.publisher }}
        </div>
        <div class="news-title-scoped font-medium">{{ n.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from "@/assets/icons/settings_noun_project.svg";
export default {
  props: {
    items: {
      type: Array,
    },
  },
  setup() {
    return { settings };
  },
};
</script>

<style lang="scss" scoped>
.news-item {
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  height: auto; /* Let the card's height be determined by its content */
  transition: background-color 0.3s, transform 0.2s;
  cursor: pointer; /* If it's supposed to be clickable */
}

.news-item:hover {
  transform: translateY(-2px); /* Lift the card a bit on hover */
}

.news-title-scoped {
  font-weight: medium;
  font-size: 1em;
  margin-bottom: 2px; /* Add some space below the title */
}

.news-text {
  font-size: 0.95em;
  color: gray; /* Make the text slightly gray to differentiate from the title */
}
</style>

<template>
  <div class="news-view-wrapper flex w-[100%]">
    <div
      class="news-sidepanel border-[1px] m-[10px] rounded-[10px] p-[8px] border-slate-200"
    >
      <div class="news-sidepanel-title w-[200px] px-[8px]">News</div>
      <div
        class="sidenav-items rounded-[4px] p-[8px] flex flex-col gap-[4px]"
        style="overflow-y: auto"
      >
        <div class="flex flex-col gap-[8px]">
          <div
            class="item border-[1px] h-[20px] border-slate-300 rounded"
            v-for="item in 20"
            :key="item"
          ></div>
        </div>
      </div>
    </div>
    <div
      class="main-feed-wrapper flex flex-col gap-[8px] h-[100%] flex-grow items-center"
    >
      <div class="flex w-[500px] gap-[12px] px-[20px] w-[100%]">
        <DropdownMulti
          :items="multiItems"
          name="broadcast"
          isIcon
          :img="settingsIcon"
          v-model="selectedSources"
        />
      </div>
      <div class="filters absolute border-[1px] left-[0px] h-[90%]">FILTER</div>
      <div
        class="main-feed gridlines h-[100%] p-[20px] flex flex-1 overflow-y-auto z-[11] flex items-center"
      >
        <div
          class="absolute transition ease w-[100%] h-[20px] top-[46px] border-[0px] shadow-scrollshtopmain z-10 dark:shadow-scrollshtopdark"
        ></div>
        <div
          class="feed-item-wrapper w-full h-full flex flex-wrap gap-[20px]"
          v-if="items && items.length > 0"
        >
          <div
            class="feed-item-title w-[300px] gridlines p-[16px] flex flex-col gap-[12px] rounded-[8px] h-auto "
            v-for="(i, index) in items"
            :key="`item-${index}`"
          >
            <div class="item-source border-slate-200 font-medium text-[10px]">
              {{ i.source.author }}
            </div>
            <div
              class="image-container rounded relative w-[280px] h-[160px] overflow-hidden"
            >
              <img
                :src="i.illustration"
                alt=""
                class="cursor-pointer absolute inset-0 w-[280px] h-full object-cover hover:scale-[1.025] transition ease-in-out duration-[400ms] transform"
              />
            </div>
            <div
              class="feed-title border-b-[0px] border-slate-200 dark:border-slate-700 py-[4px] font-medium text-[12px]"
            >
              {{ i.title }}
            </div>
          </div>
        </div>
        <div
          class="absolute transition ease w-[100%] h-[80px] bottom-[20px] border-[0px] shadow-scrollshbot z-10 dark:shadow-scrollshbotdark"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import TheDropdown from "@/components/common/TheDropdown.vue";
import DropdownMulti from "@/components/common/DropdownMulti.vue";
import { computed, ref, watchEffect } from "vue";
import broadcastIcon from "@/assets/icons/broadcast_noun.svg";
import settingsIcon from "@/assets/icons/settings_noun_project.svg";
import useFetch from "@/composables/useFetch";

export default {
  components: { DropdownMulti, TheDropdown },
  props: {},
  setup() {
    const settings = ["item 1", "item 2", "item 3"];

    // watchEffect(() => {
    //   if (props.feedItems) {
    //     console.log("props.feedItems: ", props.feedItems);
    //   }
    // });

    const multiItems = [
      { name: "Bloomberg", value: "bloomberg" },
      { name: "Barrons", value: "barrons" },
      { name: "Fincancial Times", value: "ft" },
      { name: "WSJ", value: "wsj" },
    ];

    const endpoint = ref("/api/news");
    const { data: news } = useFetch(endpoint);

    const selectedSources = ref([]); // Holds selected sources e.g. ["bloomberg.com", "reuters.com"]

    watchEffect(() => {
      if (selectedSources.value.length) {
        console.log("endpoint.value: ", endpoint.value);
        endpoint.value = `/api/news?sourceName=${selectedSources.value.join(
          ","
        )}`;
      } else {
        endpoint.value = `/api/news`;
      }
    });

    const items = computed(() => {
      if (news.value && Array.isArray(news.value)) {
        return news.value.map((singleNews) => ({
          illustration: singleNews.image,
          title: singleNews.title,
          info: singleNews.text,
          source: {
            author: singleNews.source?.title,
          },
        }));
      }
      return [];
    });

    return {
      settings,
      multiItems,
      broadcastIcon,
      settingsIcon,
      items,
      selectedSources,
    };
  },
};
</script>

<style lang="scss" scoped>
.filters {
  left: calc(100vw - 50px); /* position it 50px to the left of the main-feed */
}
</style>

<template>
  <div class="news-content flex flex-col w-[100%] overflow-y-auto">
    <Transition name="fade" mode="out-in">
        <div
          class="content-wrapper flex flex-col gap-[100px] p-[12px]"
          v-if="news"
        >
          <div
            class="news-main-pic rounded-[28px] shadow-boxshlight border-slate-300 dark:border-slate-800 w-[420px] p-[8px]"
            v-for="(n, index) in news"
            :key="index"
          >
            <div
              class="image-container relative w-full h-[240px] overflow-hidden rounded-[20px]"
            >
              <img
                :src="n.image"
                alt=""
                class="rounded cursor-pointer absolute inset-0 w-full h-full object-cover hover:scale-[1.025] transition ease-in-out duration-[400ms] transform"
              />
            </div>
            <div
              class="main-news-title text-[11px] text-slate-600 p-[12px] flex justify-between"
            >
              <div class="news-source">
                {{ n.source.title }}
              </div>
              <div class="news-trending-score flex items-center">
                <font-awesome-icon
                  :icon="[
                    'fas',
                    n.sentiment > 0 ? 'arrow-trend-up' : 'arrow-trend-down',
                  ]"
                />
                <div class="mx-[6px]">{{ n.sentiment.toFixed(1) }}</div>
              </div>
            </div>
            <div class="main-news-title p-[12px] ">{{ n.title }}</div>
          </div>
        </div>
      </Transition>
  </div>
</template>

<script>
import useFetch from "@/composables/useFetch";
import { ref } from "vue";

export default {
  setup() {
    const endpoint = ref("/api/news");
    const { data: news } = useFetch(endpoint);
    console.log(news);

    return { news };
  },
};
</script>

<style lang="scss" scoped></style>

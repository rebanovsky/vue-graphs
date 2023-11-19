<template>
  <Transition name="fall-left">
    <div class="w-[100%] flex flex-col items-center" v-if="showBoxes">
      <div class="news-main-feed-wrapper">
        <div
          class="news-main w-[250px] flex"
          v-for="(n, index) in news"
          :key="index"
        >
          <div
            class="w-[auto] border-b-[1px] border-slate-300 dark:border-darkupperribbon py-[16px]"
            v-if="n.image"
          >
            <div class="meta-wrapper text-[10px] flex items-center">
              <div>{{ timeSince(n.dateTimePub) }}</div>
              <div class="bullet mx-[8px] mt-[1px] font-light cursor-default">
                &#x2022;
              </div>
              <div class="main-news-title">
                {{ n.source.title }}
              </div>
            </div>
            <div
              class="cursor-pointer my-[6px]"
            >
              <div class="flex h-[100%]">
                <a
                  class="image-container rounded overflow-hidden h-[100%]"
                  :href="n.url"
                  target="_blank"
                  @mouseover="n.isHovered = true"
                  @mouseleave="n.isHovered = false"
                >
                  <img
                    class="news-img object-cover !w-[120px] h-[64px] rounded transition ease-in-out duration-500"
                    :src="n.image"
                    :class="[n.isHovered ? 'scale-[1.025]' : '']"
                  />
                  <!-- <div class="image-overlay rounded"></div> -->
                </a>
                <div
                  class="w-[200px] h-[70px] ml-[10px] flex flex-col justify-between text-[11px] text-slate-700 dark:text-slate-300 font-medium"
                >
                  <div class="news-title w-[100%]">
                    {{ n.title }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="main-news-stats text-[10px] flex items-center text-slate-700 w-[100%] font-medium dark:text-slate-400"
            >
              <div class="main-news-stat flex justify-between">
                <div
                  class="news-sentiment-wrapper flex h-[100%]"
                  v-if="n.sentiment"
                >
                  <div
                    class="news-sentiment-name text-green-70"
                    v-if="n.sentiment > 0.5"
                  >
                    VERY POSITIVE
                  </div>
                  <div
                    class="news-sentiment-name text-green-50"
                    v-else-if="n.sentiment > 0.1"
                  >
                    POSITIVE
                  </div>
                  <div
                    class="news-sentiment-name text-slate-500"
                    v-else-if="n.sentiment > -0.1"
                  >
                    NEUTRAL
                  </div>
                  <div
                    class="news-sentiment-name text-red-50"
                    v-else-if="n.sentiment > -0.5"
                  >
                    NEGATIVE
                  </div>
                  <div class="news-sentiment-name text-red-70" v-else>
                    VERY NEGATIVE
                  </div>
                </div>
              </div>
              <div
                class="news-relevance-wrapper flex justify-between text-[10px] ml-[8px]"
                v-if="n.relevance"
              >
                <div class="flex">
                  <div class="news-relevance-icon">
                    <font-awesome-icon
                      class="text-[8px] ml-[2px]"
                      :icon="['fas', 'star']"
                    />
                    <font-awesome-icon
                      class="text-[8px] ml-[2px]"
                      :icon="['fas', 'star']"
                      v-if="n.relevance > 20"
                    />
                    <font-awesome-icon
                      class="text-[8px] ml-[2px]"
                      :icon="['fas', 'star']"
                      v-if="n.relevance > 50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import useInfiniteFetch from "@/composables/useInfiniteFetch";
import { onMounted, ref, watchEffect } from "vue";
import { useTimePassed } from "@/composables/useTimePassed";

export default {
  setup(props, context) {
    // REFS & COMPOSABLES //
    // News feed //
    const arr = ref([]);
    const url = "/api/news";
    const {
      data: news,
      isLoading,
      fetchData,
    } = useInfiniteFetch(props, context, arr, url);

    const timeSince = useTimePassed();

    // LIFECYCLE HOOKS //

    watchEffect(() => {
      fetchData();
    });


    const showBoxes = ref(false);

    onMounted(() => {
      setTimeout(() => {
        showBoxes.value = true;
      }, 0);
    });

    return {
      news,
      isLoading,
      timeSince,
      showBoxes
    };
  },
};
</script>

<style></style>

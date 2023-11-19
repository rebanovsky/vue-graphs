<template>
  <div
    class="main-feed-wrapper flex flex-col gap-[8px] h-[100%] flex-grow items-center"
  >
    <div class="flex w-[500px] gap-[12px] px-[20px]">
      <TheDropdown :items="items" name="broadcast" isIcon :img="settingsIcon" />
      <DropdownMulti
        :items="multiItems"
        name="broadcast"
        isIcon
        :img="broadcastIcon"
      />
    </div>
    <div
      class="main-feed h-[100%] p-[12px] overflow-y-auto gridlines w-[100%] flex flex-col items-center gap-[12px]"
    >
      <div class="feed-item-wrapper w-[480px] h-[100%]" v-if="feedItems">
        <div
          class="feed-item-title gridlines p-[16px] shadow-boxshlight flex flex-col gap-[16px] rounded-[24px] h-[400px] mb-[120px]"
          v-for="(i, index) in feedItems"
          :key="index"
        >
          <div class="item-source border-slate-200 font-medium text-[10px]">
            {{ i.source.author }}
          </div>
          <div
            class="image-container relative w-full h-[200px] overflow-hidden"
          >
            <img
              :src="i.illustration"
              alt=""
              class="cursor-pointer absolute inset-0 w-full h-full object-cover hover:scale-[1.025] transition ease-in-out duration-[400ms] transform"
            />
          </div>
          <div
            class="feed-title font-normal border-y-[1px] border-slate-200 py-[12px] text-[12px]"
          >
            {{ i.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheDropdown from "@/components/common/TheDropdown.vue";
import DropdownMulti from "@/components/common/DropdownMulti.vue";
import { watchEffect } from "vue";
import broadcastIcon from "@/assets/icons/broadcast_noun.svg";
import settingsIcon from "@/assets/icons/settings_noun_project.svg";

export default {
  components: { DropdownMulti, TheDropdown },
  props: {
    feedItems: {
      type: Array,
    },
    feedItems: {
      type: Object,
    },
  },
  setup(props) {
    const items = ["item 1", "item 2", "item 3"];

    watchEffect(() => {
      if (props.feedItems) {
        console.log("props.feedItems: ", props.feedItems);
      }
    });

    const multiItems = [
      { name: "Bloomberg", value: "bloomberg.com" },
      { name: "Barrons", value: "barrons.com" },
      { name: "Reuters", value: "reuters.com" },
    ];

    return { items, multiItems, broadcastIcon, settingsIcon };
  },
};
</script>

<style lang="scss" scoped></style>

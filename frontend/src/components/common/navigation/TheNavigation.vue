<template>
  <div
    class="content-navigation gridlines flex text-[12px] px-[8px] w-[100%] h-[32px] overflow-x-auto flex items-center rounded"
  >
    <div class="setting-wrapper">
      <font-awesome-icon
        v-if="isSettings"
        icon="fa-solid fa-gear"
        class="mx-[8px] text-[12px] text-slate-700 hover:bg-slate-300 transition ease duration-75 p-[6px] rounded cursor-pointer"
      />
    </div>
    <div class="nav-items flex gap-[8px] p-[2px]">
      <router-link
        v-for="(i, index) in items"
        :key="index"
        :to="i.path"
        :class="[
          'comp-nav',
          'cursor-pointer',
          'flex',
          'items-center',
          'justify-center',
          'text-slate-400',
          'font-medium',
          'w-auto',
          'border-slate-200',
          'dark:border-slate-800',
          'mx-[8px]',
          'py-[2px]',
          'hover:text-slate-500',
          'rounded-[16px]',
          currentRoute.path === i.path
            ? '!text-slate-900 dark:!text-slate-300 '
            : '',
        ]"
      >
        {{ i.name }}
      </router-link>
    </div>
    <div class="dummy"></div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    isSettings: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const currentRoute = useRoute();

    return { currentRoute };
  },
};
</script>

<style scoped></style>

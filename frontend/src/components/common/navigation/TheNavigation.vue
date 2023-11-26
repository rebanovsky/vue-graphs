<template>
  <div
    class="content-navigation border-b-[1px] border-b-slate-200 dark:border-b-slate-800 flex text-[12px] px-[8px] w-[100%] h-[50px] overflow-x-auto flex items-center justify-center"
  >
    <div class="theme-toggler side-object flex mx-[8px] items-center">
      <ThemeToggler />
    </div>
    <div class="nav-items flex gap-[12px] p-[2px] w-[910px]">
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
import ThemeToggler from "@/components/widgets/ThemeToggler.vue";
import { useRoute } from "vue-router";


export default {
  components: { ThemeToggler },
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

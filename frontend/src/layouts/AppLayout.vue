<template>
  <div
    class="app-wrapper background dark:bg-slate-900 w-[100vw] text-slate-900 dark:text-slate-300 bg-slate-100 overflow-hidden transition ease"
  >
    <div class="ih-app w-[100%]">
      <div
        class="content flex-1 flex-col w-[100%] border-[0px]"
      >
        <!-- <TheNavbar /> -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component
              :is="Component"
              class="h-[100%]"
            />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/navigation/TheNavbar.vue";

export default {
  components: { TheNavbar },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

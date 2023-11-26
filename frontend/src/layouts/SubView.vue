<template>
  <div
    class="playground-component w-[100%] flex justify-between rounded-[14px]"
    style="height: calc(100vh - 50px)"
  >
    <div class="main-content w-full overflow-y-auto flex gap-[8px]">
      <div
        class="sidenav overflow-y-auto rounded-[8px]"
      >
        <ScrollableMenu :title="title" :items="sidenavItems" :base-path="basePath" />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import ScrollableMenu from "@/components/common/navigation/ScrollableMenu.vue";

export default {
  components: { ScrollableMenu },
  props: {
    sidenavItems: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

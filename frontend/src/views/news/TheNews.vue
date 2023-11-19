<template>
  <div
    style="height: calc(100vh - 44px)"
    class="home-components relative flex flex-col p-[12px] items-center border-[0px]"
  >
    <router-view class="flex-1 overflow-y-auto" />
  </div>
</template>

<script>

export default {
  components: {  },
  setup() {
    const items = [{ name: "FEED", path: "/news/feed" }];
    return { items };
  },
};
</script>

<style></style>

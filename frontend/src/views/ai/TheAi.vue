<template>
  <MainView :items="items" />
</template>

<script>
import MainView from "@/layouts/MainView.vue";

export default {
  components: { MainView },
  setup() {
    const items = [
      { name: "CHAT", path: "/ai/chat" },
      { name: "HISTORICAL", path: "/ai/historical" },
    ];

    return { items };
  },
};
</script>

<style></style>

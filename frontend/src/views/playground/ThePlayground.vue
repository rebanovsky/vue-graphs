<template>
  <MainView :items="navItems" />
</template>

<script>
import { ref, defineComponent } from "vue";
import MainView from "@/layouts/MainView.vue";

export default defineComponent({
  components: { MainView },
  setup() {
    const navItems = ref([
      { name: "HOME", path: "/playground/graphs" },
      { name: "GRAPHS", path: "/playground/graphs-package" },
    ]);

    return { navItems };
  },
});
</script>

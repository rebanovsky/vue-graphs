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
      { name: "HOME", path: "/home" },
      { name: "GRAPHS", path: "/graphs" },
    ]);

    return { navItems };
  },
});
</script>

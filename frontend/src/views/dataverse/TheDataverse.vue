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
      { name: "PROVIDERS", path: "/dataverse/providers" },
      { name: "SCREENER", path: "/dataverse/screener" },
      { name: "GRAPHS", path: "/dataverse/graphs" },
      { name: "VISUALIZATIONS", path: "/dataverse/visualizations" },
      { name: "ANALYSES", path: "/dataverse/analyses" },
    ]);

    console.log("navItems: ", navItems);

    return { navItems };
  },
});
</script>

<style lang="scss" scoped></style>

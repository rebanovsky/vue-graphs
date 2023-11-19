<template>
  <div
    class="component-wrapper p-[12px]"
  >
    <!-- <TheNavigation :items="items" /> -->
    <TheContent />
  </div>
</template>

<script>
import TheContent from "@/components/calendar/TheContent.vue";

import "v-calendar/style.css";
export default {
  components: {
    TheContent,
  },
  setup() {
    // const items = [
    //   { name: "ECONOMIC INDICATORS", active: true },
    //   { name: "EARNINGS" },
    //   { name: "RATINGS" },
    //   { name: "FILINGS" },
    // ];
    return {  };
  },
};
</script>

<style lang="scss" scoped></style>

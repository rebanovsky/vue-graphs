<template>
  <div
    style="height: calc(100vh - 48px); width: calc(100vw - 180px)"
    class="home-components flex flex-col p-[12px]"
  >
    <TheNavigation :items="items"  />
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from "@/components/common/navigation/TheNavigation.vue";

export default {
  components: { TheNavigation },
  setup() {
    const items = [
      { name: "STOCKS", path: "/markets/stocks" },
      { name: "REGIONS", path: "/markets/regions" },
      // { name: "COMMODITIES", path: "/markets/commodities" },
      // { name: "ENERGY", path: "/markets/energy" },
      // { name: "CURRENCIES", path: "/markets/currencies" },
    ];
    return { items };
  },
};
</script>

<style>
.fixed-navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 180px);
  z-index: 1000; /* Ensure it stays above other content */
}

</style>

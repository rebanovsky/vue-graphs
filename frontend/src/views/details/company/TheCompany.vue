<template>
  <div
    class="component-wrapper h-screen flex flex-col gap-[8px] overflow-hidden"
    v-if="company && company.image"
  >
    <div class="header-wrapper rounded-[8px] gridlines">
      <TheHeader
        :entity="company"
        :image="company.image"
        :line-chart-data="spy"
        type="company"
      />
    </div>
    <div class="navigation-wrapper rounded-[8px] gridlines">
      <TheNavigation :items="items" />
    </div>
    <router-view />
  </div>
</template>

<script>
import TheNavigation from "@/components/common/navigation/TheNavigation.vue";
import { useRoute } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import TheHeader from "@/components/common/details/TheHeader.vue";
import useFetch from "@/composables/useFetch";

export default {
  components: { TheNavigation, TheHeader },
  setup() {
    const route = useRoute();
    console.log("route.params: ", route.params);
    const items = computed(() => [
      { name: "OVERVIEW", path: `/company/${route.params.ticker}/overview` },
      {
        name: "FINANCIALS",
        path: `/company/${route.params.ticker}/financials`,
      },
    ]);

    const params = ref({ symbol: route.params.ticker });
    const endpoint = ref("/api/company");
    const { data: company } = useFetch(endpoint, params);

    console.log("company: ", company);

    watchEffect(() => {
      params.value.symbol = route.params.ticker;
      console.log("params.value.symbol: ", params.value.symbol);
    });

    const stockEndpoint = ref("/api/stock-price");
    const { data: spy } = useFetch(stockEndpoint);

    return { company, items, spy };
  },
};
</script>

<style></style>

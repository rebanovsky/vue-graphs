<template>
  <div class="component-wrapper flex flex-col gap-[12px]">
    <TheHeader
      :image="countryFlagUrl"
      :entity="country"
    />
    <TheNavigation :items="items" />
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

    const items = computed(() => [
      { name: "OVERVIEW", path: `/regions/${route.params.region}/overview` },
      { name: "GDP", path: `/regions/${route.params.region}/gdp` },
      { name: "TRADE", path: `/regions/${route.params.region}/trade` },
      {
        name: "DEMOGRAPHICS",
        path: `/regions/${route.params.region}/demographics`,
      },
      { name: "GEOGRAPHY", path: `/regions/${route.params.region}/geography` },
    ]);

    const countryFlagUrl = computed(() => {
      if (route.params.region) {
        return `https://flagpedia.net/data/flags/w1160/${route.params.region.toLowerCase()}.webp`;
      }
      return null;
    });

    const params = ref({ iso2: route.params.region });
    const endpoint = ref("/api/countries");
    const { data: country } = useFetch(endpoint, params);

    watchEffect(() => {
      params.value.iso2 = route.params.region;
    });

    console.log('country: ', country)

    const stockEndpoint = ref("/api/stock-price");
    const { data: spy } = useFetch(stockEndpoint);

    return { countryFlagUrl, country, items, spy };
  },
};
</script>

<style></style>

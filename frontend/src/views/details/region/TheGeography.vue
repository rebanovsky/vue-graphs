<template>
  <div
    class="content-center w-[100%] flex gridlines p-[4px] text-slate-400"
    style="height: calc(100vh - 212px)"
  >
    <div
      class="content-leftie w-[280px] h-[100%] gridlines p-[12px]  overflow-y-auto"
    >
      <div
        class="h-[60px] w-[100%] p-[4px] border-[1px] border-slate-300 my-[12px] rounded-[8px]"
        v-for="(dataset, index) in datasetSelector"
        :key="index"
      >
        {{ dataset.title }}
      </div>
    </div>
    <div
      class="content-rightie w-[100%] gridlines"
    >
      <div
        class="content-map gridlines p-[12px]"
        v-if="country && country.geoJson"
      >
        <CountryMap :geoJsonData="country.geoJson" />
      </div>
    </div>
  </div>
</template>

<script>
import TheGraph from "@/components/common/graphs/TheGraph.vue";
import useFetch from "@/composables/useFetch";
import { ref } from "vue";
import { useRoute } from "vue-router";
import CountryMap from "@/components/common/graphs/CountryMap.vue"

export default {
  components: { TheGraph, CountryMap },
  setup() {
    const route = useRoute();

    console.log('geo route: ', route.params.region)

    const endpoint = ref(`/api/countries?iso2=${route.params.region}`);
    const { data: country } = useFetch(endpoint);
    country.geoJson // this is where a particular country's geoJson lies


    const datasetSelector = [];

    for (let i = 0; i < 40; i++) {
      datasetSelector.push({
        title: "Dataset title",
        date: "Date",
      });
    }

    return { country, datasetSelector };
  },
};
</script>

<style lang="scss" scoped></style>

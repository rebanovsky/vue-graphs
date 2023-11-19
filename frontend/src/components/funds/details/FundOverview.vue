<template>
  <div
    class="funds-transactions flex w-[480px] h-[160px] text-[14px] font-medium justify-between"
  >
    <div class="fund-buys w-[220px] gridlines">Buys</div>
    <div class="fund-sells w-[220px] gridlines">Sells</div>
  </div>
  <div class="comp-name font-medium">
    Funds holdings by company, size and sector
  </div>
  <div class="bubblechart-section flex">
    <div class="bubbles-wrapper">
      <template v-if="loading">
        <MainSpinner />
      </template>
      <template v-else>
        <div class="funds-bubbles">
          <BubbleGraph :data="fundBubbles" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import VerBar from "@/components/graphs/VerBar.vue";
import axios from "axios";
import keys from "@/assets/keys/keys";
import BubbleGraph from "@/components/graphs/BubbleGraph.vue";
import MainSpinner from "@/components/widgets/MainSpinner.vue";

export default {
  components: { VerBar, BubbleGraph, MainSpinner },
  props: ["cik"],
  setup(props) {
    let selectedSection = ref("summary");
    let loading = ref(true);

    let key = keys[0].value;

    let fundBubbles = ref([]);

    watchEffect(() => {
      axios("").then((response) => {
        let data = response.data;

        data.forEach(async (d) => {
          d.sector = await axios(
            `/api/security?symbol=${d.symbol}`
          ).then((r) => {
            let data = r.data.data.securities[0];

            return data.sector;
          });
        });

        fundBubbles.value = data;
      });
    });

    setTimeout(() => {
      loading.value = false;
    }, 2000);

    return { fundBubbles, loading };
  },
};
</script>

<style>
.fund-title {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 8px;
}
.fund-mv-name {
  font-size: 11px;
  font-weight: 400;
  margin: 0 0 5px 30px;
}

.fund-right {
  margin: 5px 0 0 20px;
  height: auto;
  width: 430px;
  border: 1px dashed black;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.bubbles-wrapper {
  width: 700px !important;
  height: 300px !important;
}

.fund-row {
  display: flex;
}

.sector-weights {
  font-size: 10px;
}

.sector-weight {
  margin: 7px 0;
  display: flex;
  width: 200px;
  align-items: center;
  justify-content: space-between;
}
</style>

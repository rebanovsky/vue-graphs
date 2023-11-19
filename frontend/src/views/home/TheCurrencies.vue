<template>
  <div class="main-content-wrapper gridlines rounded-[8px] p-[12px] h-[100%]">
    <CurrencyPairs />
  </div>
</template>

<script>
import CurrencyPairs from "@/components/home/currencies/CurrencyPairs.vue";
export default {
  components: { CurrencyPairs },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

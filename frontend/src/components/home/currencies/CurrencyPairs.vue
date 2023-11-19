<template>
  <div class="currency-matrix-wrapper flex flex-col gap-[8px]">
    <div class="currency-matrix-title text-[14px] font-medium">Currency matrix</div>
    <div class="currency-matrix text-xs">
      <div class="flex">
        <div class="p-2 w-12 border border-slate-300 rounded-tl-lg"></div>
        <div
          class="p-2 w-12 border border-l-0 border-slate-300 flex justify-end"
          v-for="(header, index) in currencies"
          :key="header"
          :class="{ 'rounded-tr-lg': index === currencies.length - 1 }"
        >
          {{ header }}
        </div>
      </div>
      <div
        class="flex flex-wrap"
        v-for="(currency, index) in currencyMatrix"
        :key="currency.name"
      >
        <div
          class="p-2 w-12 border border-t-0 border-slate-300"
          :class="{ 'rounded-bl-lg': index === currencyMatrix.length - 1 }"
        >
          {{ currency.name }}
        </div>
        <div
          class="p-2 w-12 border flex justify-end border-t-0 border-l-0 border-slate-300"
          v-for="(rate, rateIndex) in currency.rates"
          :key="rate.currency"
          :class="{
            'rounded-br-lg':
              index === currencyMatrix.length - 1 &&
              rateIndex === currency.rates.length - 1,
          }"
        >
          {{ rate.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";

export default defineComponent({
  name: "CurrencyPairMatrix",
  setup() {
    const currencies = [
      "EUR",
      "USD",
      "JPY",
      "GBP",
      "CAD",
      "AUD",
      "CHF",
      "NZD",
      "CNY",
      "SEK",
    ];
    const currencyMatrix = ref(
      currencies.map((base) => {
        return {
          name: base,
          rates: currencies.map((other) => {
            return {
              currency: other,
              value: base === other ? 1 : (Math.random() + 0.5).toFixed(2), // Dummy exchange rate
            };
          }),
        };
      })
    );

    return {
      currencies,
      currencyMatrix,
    };
  },
});
</script>

<style></style>

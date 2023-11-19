<template>
  <div class="container flex flex-col gap-[4px]">
    <div class="earnings-title text-[12px] font-medium">Earnings</div>
    <div class="company-earnings flex gap-[22px] overflow-x-auto">
      <div
        class="company-announcement border-[1px] border-slate-300 dark:border-slate-700 rounded-[12px] p-[9px] w-[auto] flex flex-col"
        v-for="company in earnings"
        :key="company.timestamp"
      >
        <div
          class="company-title flex items-baseline gap-[8px] border-b-[1px] border-slate-300 dark:border-slate-700 pb-[4px]"
        >
          <div
            class="company-logo text-[10px] border-[0px] rounded-[18px] w-[18px] h-[18px] translate-y-[2px]"
          >
            <img :src="company.logo" class="rounded-[16px] w-[18px] h-[18px]" />
          </div>
          <div class="company-data flex gap-[12px] text-[12px] items-baseline">
            <div class="company-name cursor-pointer">{{ company.name }}</div>
            <div class="company-price font-medium">{{ company.price }}</div>
            <div
              class="company-price-chg text-[11px] text-harlequin-400 font-medium"
            >
              {{ company.priceChange }}
            </div>
          </div>
        </div>
        <div
          class="company-earnings text-[11px] flex gap-[22px] justify-between pt-[4px]"
        >
          <div class="company-earnings-left  flex flex-col justify-center">
            <div class="company-revenue w-[100px] flex justify-between">
              <div class="revenue-name">Revenue</div>
              <div class="revenue-value font-medium">$89.4B</div>
            </div>
            <div class="company-earnings w-[100%] flex justify-between">
              <div class="earnings-name">Earnings</div>
              <div class="earnings-value font-medium">$9.2B</div>
            </div>
          </div>
          <div class="company-earnings-right flex flex-col justify-center">
            <div class="company-revenue w-[80px] flex justify-between">
              <div class="revenue-name">EPS</div>
              <div class="revenue-value font-medium">$8.41</div>
            </div>
            <div class="company-earnings w-[100%] flex justify-between">
              <div class="earnings-name flex gap-[2px]">EPS <div class="translate-y-[2px] text-[10px]">est</div></div>
              <div class="earnings-value font-medium">$9.20</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  setup() {
    const earnings = [
      {
        name: "Apple Inc.",
        ticker: "AAPL",
        logo: "https://i.pinimg.com/564x/db/fe/75/dbfe75990174020a7ebf8799999212d8.jpg",
        timestamp: "12.03.20",
        price: "178.43$",
        priceChange: "3.89%",
      },
      {
        name: "Amazon Inc.",
        ticker: "AMZN",
        logo: "https://i.pinimg.com/564x/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg",
        timestamp: "12.03.20",
        price: "178.43$",
        priceChange: "3.89%",
      },
      {
        name: "Tesla Inc.",
        ticker: "TSLA",
        logo: "https://i.pinimg.com/564x/3b/7e/fd/3b7efd5b4ce5321ef262d303e7a556a6.jpg",
        timestamp: "12.03.20",
        price: "178.43$",
        priceChange: "3.89%",
      },
      {
        name: "Nvidia Inc.",
        ticker: "NVDA",
        logo: "https://yt3.googleusercontent.com/ytc/AOPolaRi8uNwmHT5AnQ7maBH5SOmEoyvYfNYdYQz1kX1tcM=s900-c-k-c0x00ffffff-no-rj",
        timestamp: "12.03.20",
        price: "178.43$",
        priceChange: "3.89%",
      },
      {
        name: "Google Inc.",
        ticker: "GOOGL",
        logo: "https://i.pinimg.com/1200x/10/4d/91/104d91f71da1b56e29231059d85a1e93.jpg",
        timestamp: "12.03.20",
        price: "178.43$",
        priceChange: "3.89%",
      },
      {
        name: "Microsoft",
        ticker: "MSFT",
        logo: "https://i.pinimg.com/originals/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.png",
        timestamp: "12.03.20",
        price: "178.43$",
        priceChange: "3.89%",
      },
    ];
    return { earnings };
  },
};
</script>

<style scoped></style>

<template>
  <div class="main-watchlist p-[4px]">
    <div class="main-title flex justify-between items-center p-[12px]">
      <div
        class="cursor-pointer w-[100%] flex justify-between hover:text-slate-600"
        @click="toggleOpen"
      >
        <div class="feed-title text-[14px]">Watchlist</div>
        <div class="">
          <font-awesome-icon
            :class="isOpen ? '' : 'rotate-m180'"
            class="text-[14px] transition ease"
            :icon="['fas', 'chevron-down']"
          />
        </div>
      </div>
    </div>
    <div
      class="w-[280px] border-[1px] border-slate-300 dark:border-slate-700 dark:border-slate-700 rounded-[20px] flex flex-col"
    >
      <div
        class="watch-item hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer flex flex-col items-center text-[12px]"
        v-for="(i, index) in watchlistItems"
        :key="index"
        :class="{
          'rounded-t-[19px] hover:bg-slate-200': index === 0,
        }"
      >
        <div
          class="flex gap-[8px] h-[40px] items-center w-[100%] px-[10px] border-b-[1px] border-slate-200 dark:border-slate-800"
        >
          <div
            class="stock-abbr w-[8px] h-[8px] rounded-[8px] bg-red-60 px-[4px]"
          ></div>
          <div class="stock-price">
            <img class="h-[20px] w-[20px] rounded-[24px]" :src="i.img" />
          </div>
          <div
            class="stock-abbr w-[52px] px-[4px]"
            @click="goToCompany(i.abbr)"
          >
            {{ i.abbr }}
          </div>
          <div class="stock-price w-[60px] flex justify-end">{{ i.price }}</div>
          <div class="stock-price-change wrapper w-[48px] flex justify-end">
            <div
              class="w-[auto] px-[8px] rounded-[12px]"
              :class="
                i.priceChange > 0
                  ? 'text-harlequin-300 dark:text-harlequin-100'
                  : 'text-red-50 dark:text-red-10'
              "
            >
              {{ i.priceChangeText }}
            </div>
          </div>
          <div class="stock-notification"></div>
        </div>
      </div>
      <div
        class="add-more-wrapper p-[8px] flex w-[100%] items-center justify-center"
      >
        <div
          class="add-more w-[100%] flex justify-center h-[28px] w-[28px] text-slate-500 rounded-[10px] hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer flex justify-center items-center border-[1px] border-slate-300 dark:border-slate-700"
        >
          <font-awesome-icon icon="fa-solid fa-plus " />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goToCompany = (ticker) => {
      router.push({ name: "company-details", params: { ticker } });
    };
    const watchlistItems = [
      {
        img: "https://i.pinimg.com/564x/db/fe/75/dbfe75990174020a7ebf8799999212d8.jpg",
        abbr: "AAPL",
        price: "178.85$",
        priceChangeText: "1.6%",
        priceChange: 1.6,
      },
      {
        img: "https://i.pinimg.com/564x/01/ca/da/01cada77a0a7d326d85b7969fe26a728.jpg",
        abbr: "AMZN",
        price: "350.44$",
        priceChangeText: "1.3%",
        priceChange: 1.3,
      },
      {
        img: "https://i.pinimg.com/564x/3b/7e/fd/3b7efd5b4ce5321ef262d303e7a556a6.jpg",
        abbr: "TSLA",
        price: "350.44$",
        priceChangeText: "-0.3%",
        priceChange: -0.3,
      },
      {
        img: "https://i.pinimg.com/1200x/10/4d/91/104d91f71da1b56e29231059d85a1e93.jpg",
        abbr: "GOOG",
        price: "560.44$",
        priceChangeText: "3.5%",
        priceChange: 3.5,
      },
      {
        img: "https://i.pinimg.com/originals/91/92/1c/91921cec4f8a8cbe3d09e596e0659d81.png",
        abbr: "MSFT",
        price: "250.44$",
        priceChangeText: "-3.4%",
        priceChange: -3.4,
      },
      {
        img: "https://yt3.googleusercontent.com/ytc/AOPolaRi8uNwmHT5AnQ7maBH5SOmEoyvYfNYdYQz1kX1tcM=s900-c-k-c0x00ffffff-no-rj",
        abbr: "NVDA",
        price: "750.64$",
        priceChangeText: "-2.3%",
        priceChange: -2.3,
      },
    ];

    const isOpen = ref(true);

    const toggleOpen = () => {
      return (isOpen.value = !isOpen.value);
    };

    return { watchlistItems, isOpen, toggleOpen, goToCompany };
  },
};
</script>

<style lang="scss" scoped></style>

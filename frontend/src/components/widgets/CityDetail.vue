<template>
  <div class="city-wrapper px-[8px]">
    <div class="time-wrapper flex  text-[10px] px-[4px] items-center">
      <div class="timezone">{{ date }}</div>
    </div>
    <div class="time-wrapper flex mt-[6px] text-[10px] px-[4px] items-center">
      <div class="timezone cursor-pointer hover:underline underline-offset-2">
        New York
      </div>
      <div class="city-weather-wrapper flex ml-[12px] items-center">
        <div class="city-temp">25°C</div>
        <div class="city-wrapper mx-[4px]">
          <img :src="iconPath" class="icon" alt="weather-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    let iconPath = require("@/assets/icons/wi-day-sunny.svg");

    let today = new Date();
    let date = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return { iconPath, date };
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 16px;
  height: 16px;
}
</style>

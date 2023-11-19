<template>
  <div>
    <div class="data-arrows flex justify-between items-center">
      <div class="data-arrow flex items-center cursor-pointer">
        <div class="arrow-icon flex items-center w-[20px]">
          <font-awesome-icon
            icon="fa-solid fa-angle-right"
            class="nav-chevron"
          />
        </div>
        <div class="arrow-name">back</div>
      </div>
      <div class="data-arrow flex items-center cursor-pointer">
        <div class="arrow-name">next</div>
        <div class="arrow-icon flex items-center w-[20px]">
          <font-awesome-icon
            icon="fa-solid fa-angle-left"
            class="nav-chevron"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style></style>

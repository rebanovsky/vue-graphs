<template>
  <div class="flex flex-col gap-[8px]">
    <div
      class="h-[40px] gridlines rounded-[8px]"
    ></div>
    <div
      class="w-[100%] flex gap-[8px]"
    >
      <div
        class="left-side w-[260px] flex flex-col rounded-[8px] gridlines"
        style="height: calc(100vh - 172px)"
      ></div>
      <div class="main-content flex w-[100%] flex-1 justify-center"></div>
      <div
        class="right-side w-[260px] flex flex-col gridlines"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>

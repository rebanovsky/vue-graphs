<template>
  <div
    class="view-mode-wrapper flex h-[100%] items-center gap-[10px] gridlines"
  >
    <div class="view-mode-name font-medium text-[12px]">View mode:</div>
    <div class="view-mode-value font-medium text-[12px] cursor-pointer">
      <SvgIcon name="feed" height="18px" width="18px" />
    </div>
    <div class="view-mode-value font-medium text-[12px] cursor-pointer">
      <SvgIcon name="table" height="18px" width="18px" />
    </div>
    <div class="view-mode-value font-medium text-[12px] cursor-pointer">
      <SvgIcon name="grid" height="18px" width="18px" />
    </div>
  </div>
</template>

<script setup>
import SvgIcon from "@/components/utils/SvgIcon.vue";
</script>

<style lang="scss" scoped></style>

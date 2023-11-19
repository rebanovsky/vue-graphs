<template>
  <div class="error-page text-slate-700 dark:text-slate-400">
    <font-awesome-icon class="text-[32px] mr-[24px]" :icon="['fas', 'xmark']" />
    <div class="text-[22px] font-normal">No insiders here...</div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style>
.error-page {
  width: calc(100vw - 160px);
  position: absolute;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}
</style>

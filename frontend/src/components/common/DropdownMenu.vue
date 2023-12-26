<template>
  <div class="dropdown-title cursor-pointer hover:text-slate-700">
    {{ title }}
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
  },
});
</script>

<style lang="scss" scoped></style>

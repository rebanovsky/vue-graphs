<template>
  <div class="card-wrapper">
    <div class="card-header">
      <div class="card-title px-[12px] pt-[12px] text-[16px] font-medium">
        {{ headerName }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TheCard",
  props: {
    headerName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    return {};
  },
};
</script>

<style lang="scss" scoped>
/* Your styles for the card */
</style>

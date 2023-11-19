<template>
  <div
    class="content-navigation h-[32px] overflow-x-auto rounded-[12px] gridlines my-[4px] flex items-center"
  >
    <div
      v-for="(i, index) in items"
      :key="index"
      class="comp-nav cursor-pointer flex items-center justify-center text-[10px] px-[2px] font-medium w-auto h-[20px] gridlines rounded-[8px] mx-[4px]"
    >
      {{ i.name }}
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const items = [
      { name: "OVERVIEW" },
      { name: "EARNINGS" },
      { name: "FEEDS" },
      { name: "GRAPHS" },
      { name: "EVENTS" },
      { name: "NAV" },
      { name: "NAV" },
    ];
    return { items };
  },
};
</script>

<style lang="scss" scoped></style>

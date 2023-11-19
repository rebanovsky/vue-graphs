<template>
  <div class="relevant flex gap-[16px] overflow-x-auto p-[12px]">
    <div
      class="relevant-item border-slate-300 border-[1px] p-[4px] rounded-[6px] h-[140px] w-[80px]"
      v-for="(i, index) in 16"
      :key="index"
    >
      <div
        class="graph-area flex px-[8px] items-center rounded-[2px] text-slate-500 border-[0px] border-slate-400 text-[12px] font-normal"
      >
        #hashtag
      </div>
      <div
        class="graph-area flex justify-center items-center h-[100px] rounded-[2px] text-slate-500 border-[1px] border-slate-300"
      >
        Img
      </div>
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

<style scoped>
.company-earnings::-webkit-scrollbar {
  display: none;
}

.company-earnings {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

<template>
  <div class="flex flex-col text-[11px]">
    <div class="config-title">
      {{ title }}
    </div>
    <div
      class="color-group border-[1px] border-slate-200 hover:border-slate-300 transition ease hover:shadow-boxshlight rounded p-[2px] flex gap-[4px] items-center"
    >
      <input
        type="color"
        class="cursor-pointer border-[0px] rounded"
        @input="updateColor"
      />
      <div class="">
        <input
          type="text"
          class="bg-slate-100 placeholder:font-light text-[14px] placeholder:text-[14px] placeholder:text-slate-900 dark:placeholder:text-slate-100 w-[140px]"
          :placeholder="color"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(['colorChange'])

const color = ref("#ffffff")

const updateColor = (e) => {
  color.value = e.target.value
  emit('colorChange', color.value)
}
</script>

<style scoped>
.color-dot {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.color-group {
  margin-top: 8px;
}
</style>

<template>
  <div class="flex flex-col text-[11px]">
    <div class="config-title">
      {{ title }}
    </div>
    <div
      class="color-group border-[1px] px-[4px] w-[auto] border-slate-200 dark:border-slate-800 hover:border-blue-400 transition ease rounded p-[2px] flex gap-[4px] items-center"
    >
      <input
        type="color"
        class="cursor-pointer flex w-[14px] h-[14px] bg-transparent"
        @input="updateColor"
      />
      <div class="">
        <input
          type="text"
          class="bg-slate-100 dark:bg-slate-900 px-[2px] transition ease flex placeholder:font-light text-[14px] placeholder:text-[14px] w-[140px] placeholder:tracking-wider"
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

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 8px;
}
</style>

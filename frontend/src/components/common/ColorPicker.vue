<template>
  <div class="flex justify-between text-[12px] w-[176px] items-center">
    <div class="config-title flex w-[100px] flex-1 whitespace-nowrap">
      {{ title }}
    </div>
    <div
      class="color-group border-[1px] px-[4px] flex-1 h-[24px] border-slate-200 dark:border-slate-800 hover:border-blue-400 transition ease rounded p-[2px] flex gap-[4px] items-center"
    >
      <input
        type="color"
        class="cursor-pointer flex w-[14px] h-[14px] bg-transparent"
        @input="updateColor"
      />
      <input
        type="text"
        class="bg-slate-100 dark:bg-slate-900 w-[60px] px-[2px] transition ease flex placeholder:font-light text-[14px] placeholder:text-[14px] w-[140px] placeholder:tracking-wider"
        :placeholder="color"
      />
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

const emit = defineEmits(["colorChange"]);

const color = ref("#ffffff");

const updateColor = (e) => {
  color.value = e.target.value;
  emit("colorChange", color.value);
};
</script>

<style scoped>
.color-dot {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 8px;
}
</style>

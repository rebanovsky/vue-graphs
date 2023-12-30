<template>
  <div class="flex flex-col text-[12px] gap-[4px]">
    <div class="config-title flex w-[100px] flex-1 whitespace-nowrap">
      {{ title }}
    </div>
    <div
      class="color-group px-[4px] flex-1 h-[24px] transition ease rounded p-[2px] flex gap-[4px] items-center"
    >
      <input
        type="color"
        class="cursor-pointer flex w-[14px] h-[14px] bg-transparent"
        @input="updateColor"
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

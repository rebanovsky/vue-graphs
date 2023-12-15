<template>
  <div class="flex flex-col text-[11px]">
    <div class="config-title">
      {{ title }}
    </div>
    <div class="color-group border-[1px] border-slate-200 hover:border-slate-300 transition ease hover:shadow-boxshlight rounded p-[2px] flex gap-[4px] items-center">
      <div
        class="border-[1px] border-slate-100 dark:border-slate-900 rounded-[8px]"
        v-for="option in options"
        :key="option.id"
      >
        <div
          :class="[
            'color-dot border-[6px] border-slate-100 dark:border-slate-900 rounded-full transition ease duration-75',
            {
              '': option.value === modelValue,
            },
          ]"
          @click="() => updateModelValue(option.value)"
          :style="{ backgroundColor: option.value }"
        ></div>
      </div>
      <div class="">
        <input type="text" class="bg-slate-100 placeholder:font-light text-[14px] placeholder:text-[14px] w-[140px]" :placeholder="'#ffffff'" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateModelValue = (newValue) => {
  emit("update:modelValue", newValue);
};
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

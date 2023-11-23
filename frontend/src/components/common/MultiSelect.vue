<template>
  <div class="gridlines flex flex-col gap-[4px]">
    <div class="config-title text-[11px]">
      {{ title }}
    </div>
    <div class="flex gap-[4px] text-[11px] custom-select">
      <div
        v-for="option in options"
        :key="option.value"
        class="multi-select-option border-[1px] text-slate-500 border-slate-300 dark:border-slate-700"
        :class="{ '!text-blue-900 !border-blue-900 bg-blue-50 dark:bg-slate-900 dark:border-blue-00 dark:text-slate-200 dark:border-slate-200': isSelected(option) }"
        @click="toggleSelection(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  options: Array,
  modelValue: Array,
  title: String,
});

const emit = defineEmits(["update:modelValue"]);

const selectedOptions = ref([...props.modelValue]);

const isSelected = (option) => selectedOptions.value.includes(option.value);

const toggleSelection = (option) => {
  if (isSelected(option)) {
    selectedOptions.value = selectedOptions.value.filter(
      (val) => val !== option.value
    );
  } else {
    selectedOptions.value.push(option.value);
  }
};

watch(
  selectedOptions,
  (newVal) => {
    emit("update:modelValue", newVal); // Emit the update event
  },
  { deep: true }
);
</script>

<style scoped>

.multi-select-option {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px; /* Rounded corners */
  transition: all 0.025s ease; /* Consistent transition with RadioButton */
}

.multi-select-option.selected {
  color: #fff;
  background-color: #007bff; /* Light background color for selected state */
  border-color: #007bff; /* Highlighted border color for selected state */
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2); /* Subtle shadow for selected state */
}
</style>

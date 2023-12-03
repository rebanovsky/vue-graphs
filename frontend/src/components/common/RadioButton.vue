<template>
  <div class="flex flex-col text-[11px] gap-[4px]">
    <div class="config-title">
      {{ title }}
    </div>
    <div class="radio-group flex gap-[8px] items-center">
      <div
        v-for="option in options"
        :key="option.id"
        :class="[
          'radio-option rounded-[4px] border-[1px] text-slate-500 border-slate-300 dark:border-slate-700 transition ease duration-75',
          {
            '!text-blue-900 !border-blue-900 bg-blue-50 dark:bg-slate-900 dark:border-blue-00 dark:text-slate-200 dark:border-slate-200':
              option.value === modelValue,
          },
        ]"
        @click="() => updateModelValue(option.value)"
        class="px-[3px] py-[1px]"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="option.value === modelValue"
          :id="option.id"
          :name="name"
          :disabled="disabled"
          class="hidden-radio"
        />
        <label :for="option.id">{{ option.label }}</label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: Array,
  modelValue: [String, Number],
  name: String,
  disabled: Boolean,
  title: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateModelValue = (newValue) => {
  if (!props.disabled && newValue !== props.modelValue) {
    emit("update:modelValue", newValue);
  }
};
</script>

<style scoped>
.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-option label {
  cursor: pointer;
}
</style>

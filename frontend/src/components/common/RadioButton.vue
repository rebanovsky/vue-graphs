<template>
  <div class="flex flex-col text-[11px] gap-[4px]">
    <div class="config-title">
      {{ title }}
    </div>
    <div class="radio-group flex items-center">
      <div
        v-for="(option, index) in options"
        :key="option.id"
        :class="[
          'radio-option text-slate-500 dark:text-slate-200 transition ease duration-75',
          roundedClass(index, options.length),
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
  modelValue: [String, Number, Boolean],
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

const roundedClass = (index, length) => {
  if (length === 1) return "rounded-[4px]";
  if (index === 0) return "rounded-l-[4px]";
  if (index === length - 1) return "rounded-r-[4px]";
  return "";
};
</script>

<style scoped>
.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* Add left border only to the first radio button */
.radio-option:first-child {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

/* Add right border only to the last radio button */
.radio-option:last-child {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

</style>


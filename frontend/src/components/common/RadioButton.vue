<template>
  <div class="flex flex-col text-[12px] gap-[4px]">
    <div class="config-title dark:text-slate-300 text-slate-700 cursor-default">
      {{ title }}
    </div>
    <div class="radio-group flex items-center w-[auto]">
      <div class="w-[auto] flex">
        <div
          v-for="(option, index) in options"
          :key="option.id"
          :class="[
            'radio-option text-300  cursor-pointer  border-b-[2px] border-200 transition ease duration-75',
            {
              '!text-harlequin-500 !border-harlequin-500 z-[2]':
                option.value === modelValue,
            },
          ]"
          @click="() => updateModelValue(option.value)"
          class="px-[12px] py-[1px] font-medium"
          :style="index !== 0 ? 'transform: translateX(-1px);' : ''"
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
          <label :for="option.id" class="cursor-pointer">{{
            option.label
          }}</label>
        </div>
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
</script>

<style scoped>
.hidden-radio {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>

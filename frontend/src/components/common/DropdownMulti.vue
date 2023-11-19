<template>
  <div
    class="dropdown-wrapper z-[12] relative flex flex-col items-start"
    ref="dropdownRef"
  >
    <button
      class="dropdown-button rounded-[12px] px-[8px] py-[2px] hover:text-slate-600"
      :class="[isBorder ? 'border-[1px] border-slate-100' : 'none']"
      @click="isDropdown = !isDropdown"
      :style="{ fontSize: nameFont }"
      v-if="!isIcon"
    >
      {{ name }}
    </button>
    <div
      class="w-[26px] h-[26px] rounded-[4px] hover:bg-slate-50 p-[5px] cursor-pointer border-[0px] transition ease duration-100 fill-slate-900 border-slate-300"
      v-if="isIcon"
      @click="isDropdown = !isDropdown"
    >
      <img :src="img" class="rounded-[16px] w-[18px] h-[18px]" />
    </div>
    <Transition name="search" mode="out-in">
      <div
        v-if="isDropdown"
        class="dropdown-content bg-slate-100 shadow-boxshlight border-[1px] border-slate-200 rounded-[8px] overflow-auto absolute transform mt-[32px]"
        :style="{ height: height, width: width, fontSize: itemFont }"
      >
        <label
          v-for="(item, index) in items"
          :key="index"
          class="custom-checkbox w-[100%] flex gap-[12px] items-center py-[10px] !px-[12px] cursor-pointer hover:bg-slate-50"
        >
          <input
            type="checkbox"
            class="hidden-checkbox"
            v-model="selectedItems"
            :value="item.value"
            @change="updateSelection"
          />
          <div class="checbkox-wrapper border-[1px] rounded-[2px] border-slate-300 flex items-center justify-center w-[16px] h-[16px]">
            <img
              v-if="selectedItems.includes(item.value)"
              :src="checkbox"
              class="h-[12px] w-[12px]"
            />
          </div>
          {{ item.name }}
        </label>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, watchEffect, watch } from "vue";
import { useClickOutside } from "@/composables/useClickOutside";
import checkbox from "@/assets/icons/check_noun.svg";

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: "auto",
    },
    width: {
      type: String,
      default: "160px",
    },
    items: {
      type: Array,
      required: true,
    },
    itemFont: {
      type: String,
      default: "12px",
    },
    nameFont: {
      type: String,
      default: "12px",
    },
    isBorder: {
      type: Boolean,
      default: false,
    },
    isIcon: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const isDropdown = ref(false);
    const dropdownRef = ref(null);
    const isOutside = useClickOutside(dropdownRef);

    watchEffect(() => {
      if (isOutside.value) isDropdown.value = false;
    });

    const selectedItems = ref([...props.modelValue]);

    watch(selectedItems, (newVal) => {
      emit("update:modelValue", newVal);
    });

    function updateSelection() {
      // Handle changes to the selected items
      console.log(selectedItems.value);
    }

    return {
      isDropdown,
      dropdownRef,
      selectedItems,
      updateSelection,
      checkbox,
    };
  },
};
</script>

<style>
.hidden-checkbox {
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  z-index: -1;
}
</style>

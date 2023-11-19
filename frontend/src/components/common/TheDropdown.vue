<template>
  <div
    class="dropdown-wrapper relative flex flex-col items-start"
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
        <p
          v-for="(item, index) in items"
          :key="index"
          class="w-[100%] !px-[8px] cursor-pointer hover:bg-slate-50"
        >
          {{ item }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useClickOutside } from "@/composables/useClickOutside";

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
      default: "120px",
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
  },
  setup(props) {
    const isDropdown = ref(false);
    const dropdownRef = ref(null);
    const isOutside = useClickOutside(dropdownRef);

    watchEffect(() => {
      if (isOutside.value) isDropdown.value = false;
    });

    return {
      isDropdown,
      dropdownRef,
    };
  },
};
</script>

<style scoped>
.dropdown-button {
  cursor: pointer;
}

.dropdown-content {
  display: block;
  position: absolute;
  min-width: 160px;
  z-index: 1;
}

.dropdown-content p {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.search-enter-active,
.search-leave-active {
  transition: all 0.15s ease;
}

.search-enter-to,
.search-leave-from {
  height: auto;
}

.search-enter-from,
.search-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

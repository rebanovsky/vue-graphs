<template>
  <div class="side-menu overflow-y-auto rounded-[8px] py-[12px]">
    <div class="side-menu-title font-medium px-[16px] py-[12px]">
      {{ title }}
    </div>
    <div class="w-[240px] flex flex-col py-[12px]">
      <div
        v-for="item in items"
        :key="item.name"
        class="accordion-item flex items-center px-[20px]"
        :class="[
          'accordion-title hover:scale-[1.005] hover:text-slate-800 hover:dark:text-slate-300 transition ease text-[12px] px-[40px] text-slate-500',
          isActive(item.name) ? 'scale-[1.005] text-slate-900 dark:text-slate-100' : '',
          item.name === currentSection ? 'text-slate-900' : ''
        ]"
        @click.stop="() => toggleAccordion(item.name)"
      >
        <div
          class="dot h-[5px] w-[5px] rounded-[5px]"
          :class="[
            isActive(item.name)
              ? 'bg-slate-900 dark:bg-slate-100'
              : 'bg-slate-100 dark:bg-slate-900',
          ]"
        ></div>
        <div>
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

/// Define props
const props = defineProps({
  title: String,
  items: Array,
  currentSection: String,
});

const openName = ref(null);

const toggleAccordion = (name) => {
  if (props.items.find((item) => item.name === name).hasOwnProperty("items")) {
    openName.value = openName.value === name ? null : name;
  } else {
    navigateTo(name);
  }
};

const isActive = (name) => {
  return openName.value === name;
};

const navigateTo = (name) => {
  const section = document.getElementById(name);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style lang="scss" scoped>
.accordion-title {
  cursor: pointer;
  padding: 10px;
}

.accordion-content {
  overflow: hidden;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}
</style>

<template>
  <div class="side-menu overflow-y-auto rounded-[8px]">
    <div class="side-menu-title font-medium px-[26px] py-[12px]">
      {{ title }}
    </div>
    <div class="w-[200px] flex flex-col p-[4px] gap-[12px]">
      <div v-for="item in items" :key="item.name">
        <div
          class="accordion-item w-[auto] flex items-center px-[20px] border-b-[1px] border-slate-100 rounded-[0px] gap-[8px]"
          :class="[
            'accordion-title hover:border-slate-300 transition ease duration-100 text-[12px] px-[20px] text-slate-500',
            isActive(item.name)
              ? 'text-slate-900 dark:text-slate-100 border-b-[1px] border-slate-300'
              : '',
          ]"
          @click="() => toggleAccordion(item.name)"
        >
          {{ item.title }}
        </div>
        <transition
          name="accordion"
          @before-enter="beforeEnter"
          @enter="enter"
          @before-leave="beforeLeave"
          @leave="leave"
        >
          <div
            v-if="isActive(item.name) && item.items && item.items.length"
            class="accordion-content shadow-expboxsh"
          >
            <ul>
              <li
                v-for="(subItem, subIndex) in item.items"
                :key="`item-${subIndex}`"
                class="text-[11px] py-[8px] px-[16px] hover:bg-slate-50 cursor-pointer border-b-[0px] border-slate-200"
                @click="navigateTo(item, subItem)"
              >
                {{ subItem }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

// Define props
const props = defineProps({
  title: String,
  items: Array,
  basePath: String,
});

const router = useRouter();
const route = useRoute();
const openName = ref(null);

watchEffect(() => {
  openName.value = route.name;
});

const toggleAccordion = (name) => {
  if (props.items.find((item) => item.name === name).hasOwnProperty("items")) {
    openName.value = openName.value === name ? null : name;
  } else {
    navigateTo(props.items.find((item) => item.name === name));
  }
};

const isActive = (name) => {
  return openName.value === name;
};

const navigateTo = (item, subItem) => {
  let path;
  if (subItem) {
    path = `${props.basePath}/${item.name}/${subItem
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  } else {
    path = `${props.basePath}/${item.name}`;
  }
  router.push(path);
};

const beforeEnter = (el) => {
  el.style.height = "0";
};

const enter = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const beforeLeave = (el) => {
  el.style.height = el.scrollHeight + "px";
};

const leave = (el) => {
  el.style.height = "0";
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

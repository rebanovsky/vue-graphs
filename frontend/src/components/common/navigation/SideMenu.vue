<template>
  <div class="side-menu overflow-y-auto rounded-[8px]">
    <div class="side-menu-title font-medium px-[26px] py-[12px]">
      {{ title }}
    </div>
    <div class="w-[240px] flex flex-col">
      <div
        v-for="item in items"
        :key="item.name"
        class="accordion-item flex items-center px-[20px] gridlines"
        :class="[
          'accordion-title hover:scale-[1.0025] hover:text-slate-800 hover:dark:text-slate-300 transition ease text-[12px] px-[40px] text-slate-500',
          isActive(item.name)
            ? 'scale-[1.0025] text-slate-900 dark:text-slate-100'
            : '',
        ]"
        @click="() => toggleAccordion(item.name)"
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

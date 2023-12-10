<template>
  <div
    class="side-menu overflow-y-auto rounded-[8px] py-[8px] h-[100%] flex flex-col justify-between"
  >
    <div
      class="w-[200px] flex items-center flex-col h-[100%] p-[4px] gap-[8px]"
    >
      <div v-for="item in items" :key="item.name">
        <div
          class="flex flex-col justify-center w-[170px] py-[4px] hover:text-slate-500 cursor-pointer border-[1px] border-slate-100 dark:border-slate-900 dark:hover:border-slate-800 rounded-[8px] px-[4px]"
          @click="() => toggleAccordion(item.name)"
          :class="[
            isActive(item.name)
              ? 'border-slate-300 bg-slate-50 dark:bg-slate-800 dark:!border-slate-800'
              : 'hover:border-slate-200',
          ]"
        >
          <div
            class="accordion-item w-[auto] flex items-center px-[12px] rounded-[0px] gap-[8px]"
            :class="[
              'accordion-title text-[0.8em] px-[12px] text-slate-500',
              isActive(item.name) ? 'text-slate-900 dark:text-slate-100' : '',
            ]"
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
            <div v-if="isActive(item.name) && item.submenu">
              <ul class="px-[20px] text-[12px] gap-[8px] flex flex-col">
                <li
                  v-for="subItem in item.submenu"
                  :key="subItem.name"
                  @click="navigateTo(item, subItem)"
                >
                  {{ subItem.title }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="gridlines mx-[12px] text-[10px] text-slate-500">
      created by <em class="font-medium">Mark Andreas Rebane</em>
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

const isActive = (name) => {
  return openName.value === name;
};

const toggleAccordion = (name) => {
  const item = props.items.find((i) => i.name === name);
  if (item && item.submenu) {
    openName.value = openName.value === name ? null : name;
  } else {
    navigateTo(item);
  }
};

const navigateTo = (item, subItem) => {
  let path;
  if (subItem) {
    path = `${props.basePath}/${item.name}/${subItem.name}`;
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

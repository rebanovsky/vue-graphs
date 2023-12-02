<template>
  <div class="side-menu overflow-y-auto rounded-[8px]">
    <div class="side-menu-title font-medium px-[26px] py-[12px]">
      {{ title }}
    </div>
    <div class="w-[190px] flex flex-col p-[4px] gap-[8px]">
      <div v-for="item in items" :key="item.name">
        <div
          class="flex items-center w-[180px] hover:text-slate-500 cursor-pointer border-[1px] border-slate-100 hover:border-slate-200 rounded-[8px] px-[8px]"
          @click="() => toggleAccordion(item.name)"
          :class="[
            isActive(item.name) ? 'border-slate-200' : '',
          ]"
        >
          <!-- <div
            class="dot w-[4px] h-[4px] rounded-[4px]"
            :class="[
              isActive(item.name)
                ? 'bg-slate-900 dark:bg-slate-100'
                : 'bg-slate-100 dark:bg-slate-900',
            ]"
          ></div> -->
          <div
            class="accordion-item w-[auto] flex items-center px-[20px] rounded-[0px] gap-[8px]"
            :class="[
              'accordion-title text-[12px] px-[20px] text-slate-500',
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

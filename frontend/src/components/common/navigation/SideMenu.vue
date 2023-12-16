<template>
  <div class="side-menu overflow-y-auto flex flex-col justify-between h-[100%]">
    <div>
      <div class="w-[200px] flex flex-col">
        <div v-for="(item, index) in items" :key="index" class="accordion-item">
          <div
            class="accordion-title hover:bg-slate-50 dark:hover:bg-slate-800 border-b-[1px] border-slate-200 dark:border-slate-800 text-[12px] px-[16px]"
            @click="toggleAccordion(item, index)"
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
              v-if="isActive(index) && item.items && item.items.length"
              class="accordion-content shadow-expboxsh"
            >
              <ul>
                <li
                  v-for="(subItem, subIndex) in item.items"
                  :key="`item-${subIndex}`"
                  class="text-[12px] py-[12px] px-[16px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer border-b-[1px] border-slate-200 dark:border-slate-800"
                  @click="navigateTo(item.name, subItem.name)"
                >
                  {{ subItem.title }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  props: {
    title: String,
    items: Array,
    basePath: String,
  },
  setup(props) {
    const router = useRouter();
    const openIndex = ref(null);

    const toggleAccordion = (item, index) => {
      if (item.items && item.items.length) {
        openIndex.value = openIndex.value === index ? null : index;
      } else {
        navigateTo(item.name);
      }
    };

    const isActive = (index) => {
      return openIndex.value === index;
    };

    const navigateTo = (itemName, subItemName = "") => {
      let path = `${props.basePath}/${itemName}`;
      if (subItemName) {
        path += `/${subItemName}`;
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

    return {
      toggleAccordion,
      isActive,
      navigateTo,
      beforeEnter,
      enter,
      beforeLeave,
      leave,
    };
  },
};
</script>

<style scoped>
.accordion-title {
  cursor: pointer;
  padding: 10px;
}

.accordion-content {
  padding: 0px;
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

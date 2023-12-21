<template>
  <div
    class="side-menu overflow-y-auto flex flex-col justify-between h-[100%]"
  >
    <div class="w-[240px] flex flex-col gap-[32px] py-[20px]">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="accordion-item flex flex-col gap-[8px]"
      >
        <div
          class="accordion-title font-semibold text-[14px] px-[16px] text-slate-700 dark:text-slate-300"
          @click="toggleAccordion(item, index)"
        >
          {{ item.title }}
        </div>
        <div class="accordion-content">
          <ul>
            <li
              v-for="(subItem, subIndex) in item.items"
              :key="`item-${subIndex}`"
              :class="{
                'border-harlequin-500 text-harlequin-500':
                  isSubItemActive(item.name, subItem.name),
                'border-slate-100 dark:border-slate-900 text-slate-600 dark:text-slate-400': !isSubItemActive(
                  item.name,
                  subItem.name
                ),
              }"
              class="text-[14px] border-l-[4px] py-[8px] px-[24px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              @click="navigateTo(item.name, subItem.name)"
            >
              {{ subItem.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps({
  title: String,
  items: Array,
  basePath: String,
});
const router = useRouter();
const route = useRoute();
const openIndex = ref(null);

const toggleAccordion = (item, index) => {
  if (item.items && item.items.length) {
    openIndex.value = openIndex.value === index ? null : index;
  } else {
    navigateTo(item.name);
  }
};

const isSubItemActive = (itemName, subItemName) => {
  // For top-level items (e.g., home)
  if (!subItemName && route.path === `${props.basePath}/${itemName}`) {
    return true;
  }

  // For nested routes (e.g., linechart under line)
  if (subItemName) {
    return route.path.includes(`${props.basePath}/${itemName}/${subItemName}`);
  }

  return false;
};

const navigateTo = (itemName, subItemName = "") => {
  let path = `${props.basePath}/${itemName}`;
  if (subItemName) {
    path += `/${subItemName}`;
  }
  router.push(path);
};
</script>

<style scoped>
.accordion-content {
  padding: 0px;
  overflow: hidden;
}
</style>

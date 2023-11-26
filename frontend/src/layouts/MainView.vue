<template>
  <div class="flex flex-col gap-[8px] h-screen overflow-hidden">
    <!-- <div class="view-heading px-[18px] font-medium text-[24px] rounded-[8px] gridlines">{{ getCurrentHeading() }}</div> -->
    <TheNavigation
      :items="items"
      class="flex-shrink-0 rounded-[8px]"
    />
    <router-view />
    <slot class="flex-1 overflow-y-auto"></slot>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import TheNavigation from "@/components/common/navigation/TheNavigation.vue";
import { ref, watchEffect } from "vue";

// Define props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const route = useRoute();

// Reactive property
const items = ref(props.items);

// Watch for changes in props
watchEffect(() => {
  items.value = props.items;
});

// Function to get the current route name
const getCurrentHeading = () => {
  // Find the matching navItem for the current path
  const currentItem = items.value.find((item) => item.path === route.path);
  return currentItem ? currentItem.name : "No Heading";
};
</script>

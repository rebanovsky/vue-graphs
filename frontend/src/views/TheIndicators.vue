<template>
  <div
    class="view-components flex flex-col p-[12px] border-[1px]"
  >
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheHeader from "@/components/indicators/TheHeader.vue";
import TheContent from "@/components/indicators/TheContent.vue";

export default {
  components: { TheHeader, TheContent },
  setup() {
    return {};
  },
};
</script>

<style></style>

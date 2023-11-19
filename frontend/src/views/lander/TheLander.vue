<template>
  <LanderDesktop v-if="!isMobileDevice" />
  <LanderMobile v-if="isMobileDevice" />
</template>

<script>
import LanderDesktop from "@/views/lander/LanderDesktop.vue";
import LanderMobile from "@/views/lander/LanderMobile.vue";
import { useScreenObserver } from "@/composables/useScreenObserver";

export default {
  components: { LanderDesktop, LanderMobile },
  setup() {
    const { isMobileDevice } = useScreenObserver();

    return { isMobileDevice };
  },
};
</script>

<style></style>

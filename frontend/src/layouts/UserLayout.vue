<template>
  <div
    class="h-[100vh] w-[100vw] flex flex-col gap-[120px] items-center p-[64px]"
  >
    <div class="flex w-[600px] justify-end">
      <font-awesome-icon
        @click="goToLander"
        class="text-[24px] ml-[4px] cursor-pointer hover:text-slate-700"
        :icon="['fas', 'xmark']"
      />
    </div>
    <slot />
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const goToLander = () => {
      router.push({ name: "lander" });
    };

    return { goToLander };
  },
};
</script>

<style lang="scss" scoped></style>

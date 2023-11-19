<template>
  <div class="absolute bg-slate-100">
    <div
      class="lander-top-row h-[60px] w-[100vw] flex items-center justify-center z-[2]"
    >
      <div
        class="flex justify-between px-[28px] items-center w-[1200px] h-[100%]"
      >
        <div class="ih-logo">
          <img
            :src="logo"
            alt="Logo"
            class="fill-harlequin-300 transition ease"
          />
          <div class="ih-name ml-[10px] text-[18px] cursor-default">
            InsiderHive
          </div>
        </div>
        <div class="ih-nav flex gap-[20px]">
          <div class="navs flex text-[12px] items-center justify-center">
            <div class="nav-wrapper mx-[8px]">
              <TheDropdown
                :name="'Data'"
                :is-border="true"
                :items="itemsA"
                width="80px"
              />
            </div>
            <div class="nav-wrapper mx-[8px]">
              <TheDropdown :name="'Pricing'" :isBorder="true" :items="itemsA" />
            </div>
            <div class="nav-wrapper mx-[8px]">
              <TheDropdown :name="'About'" :isBorder="true" :items="itemsA" />
            </div>
          </div>
          <div class="login-signup flex gap-[8px] items-center">
            <div
              class="nav-wrapper mx-[8px] text-[12px] cursor-pointer"
              @click="login"
            >
              Log in
            </div>
            <div
              class="nav-wrapper mx-[8px] text-[12px] cursor-pointer"
              @click="signup"
            >
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import TheDropdown from "@/components/common/TheDropdown.vue";
import logo from "@/assets/icons/ihLogo.svg";

export default {
  components: { TheDropdown },
  setup() {
    const router = useRouter();

    const itemsA = ["API", "Excel add-on", "item c", "item d"];

    function login() {
      router.push({ name: "login" });
    }

    function signup() {
      router.push({ name: "signup" });
    }

    return { logo, itemsA, login, signup };
  },
};
</script>

<style lang="scss" scoped>
</style>

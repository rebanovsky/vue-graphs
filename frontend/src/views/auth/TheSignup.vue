<template>
  <UserLayout>
    <div
      class="flex flex-col border-[0px] gap-[64px] w-[340px] shadow-boxshlight font-medium border-slate-300 p-[40px] rounded-[16px]"
    >
      <div class="signup-header flex flex-col gap-[4px]">
        <h2 class="text-[24px]">Create an account</h2>
        <h3 class="text-[12px] font-normal text-slate-500">
          Let's get started with your 30 day free trial
        </h3>
      </div>
      <form class="flex flex-col gap-[48px]" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-[20px] text-normal">
          <input
            type="text"
            class="bg-transparent border-b-[1px] border-slate-300 px-[4px] py-[4px] rounded-[0px]"
            placeholder="Username"
            v-model="username"
            required
          />
          <input
            type="email"
            class="bg-transparent border-b-[1px] border-slate-300 px-[4px] py-[4px] rounded-[0px]"
            placeholder="Email"
            v-model="email"
            required
          />
          <input
            type="password"
            class="bg-transparent border-b-[1px] border-slate-300 px-[4px] py-[4px] rounded-[0px]"
            placeholder="Password"
            v-model="password"
            required
          />
          <input
            type="password"
            class="bg-transparent border-b-[1px] border-slate-300 px-[4px] py-[4px] rounded-[0px]"
            placeholder="Confirm  password"
            v-model="passwordConfirm"
            required
          />
        </div>
        <div class="flex flex-col gap-[10px] text-[14px]">
          <button
            type="submit"
            class="rounded-[28px] bg-slate-900 text-slate-100 py-[10px]"
          >
            Create account
          </button>
          <button
            type="submit"
            class="rounded-[28px] flex justify-center border-[1px] gap-[8px] border-slate-900 py-[10px]"
          >
            <div class="google-logo">
              <img class="h-[20px]" :src="googleLogo" />
            </div>
            <div class="google-text">Sign up with Google</div>
          </button>
        </div>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </UserLayout>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import UserLayout from "@/layouts/UserLayout.vue";
import googleLogo from "@/assets/icons/google_24_24.svg";

export default {
  components: { UserLayout },
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const passwordConfirm = ref("");
    const error = ref(null);

    const handleSubmit = async () => {
      try {
        await axios.post("/api/users/signup", {
          username: username.value,
          email: email.value,
          password: password.value,
          passwordConfirm: passwordConfirm.value,
        });

        // Handle successful signup, e.g., redirect to login page
      } catch (err) {
        error.value = err.response?.data.message || "An error occurred";
      }
    };

    return {
      googleLogo,
      username,
      email,
      password,
      passwordConfirm,
      error,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
input {
  font-size: 12px;
  font-weight: 400;
}
</style>

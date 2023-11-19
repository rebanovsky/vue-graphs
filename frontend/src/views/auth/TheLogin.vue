<template>
  <UserLayout>
    <div
      class="flex flex-col border-[0px] gap-[64px] w-[340px] shadow-boxshlight font-medium border-slate-300 p-[40px] rounded-[16px]"
    >
      <div class="signup-header flex flex-col gap-[4px]">
        <h2 class="text-[24px]">Log in</h2>
        <h3 class="text-[12px] font-normal text-slate-500">Welcome back!</h3>
      </div>
      <form class="flex flex-col gap-[48px]" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-[20px]">
          <input
            type="text"
            class="bg-transparent border-b-[1px] border-slate-300 px-[4px] py-[4px] rounded-[0px]"
            placeholder="Username or Email"
            v-model="usernameOrEmail"
            required
          />
          <input
            type="password"
            class="bg-transparent border-b-[1px] border-slate-300 px-[4px] py-[4px] rounded-[0px]"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>
        <div class="flex flex-col gap-[10px] text-[14px]">
          <button
            type="submit"
            class="rounded-[28px] bg-slate-900 text-slate-100 py-[10px]"
          >
            Log in
          </button>
          <button
            type="submit"
            class="rounded-[28px] flex justify-center border-[1px] gap-[8px] border-slate-900 py-[10px]"
          >
            <div class="google-logo">
              <img class="h-[20px]" :src="googleLogo" />
            </div>
            <div class="google-text">Log in with Google</div>
          </button>
        </div>
        <p v-if="error">{{ error }}</p>
      </form>
    </div>
  </UserLayout>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import UserLayout from "@/layouts/UserLayout.vue";
import { useStore } from "vuex";
import googleLogo from "@/assets/icons/google_24_24.svg";

export default {
  components: { UserLayout },
  setup() {
    const usernameOrEmail = ref("");
    const password = ref("");
    const error = ref(null);
    const router = useRouter();
    const store = useStore();

    const handleSubmit = async () => {
      try {
        const isEmail = usernameOrEmail.value.includes("@");
        const response = await axios.post("/api/users/login", {
          ...(isEmail
            ? { email: usernameOrEmail.value }
            : { username: usernameOrEmail.value }),
          password: password.value,
        });
        console.log("Component login succeeded:", response.data);

        await store.dispatch("login", {
          token: response.data.token,
          user: response.data.data.user,
        });

        console.log("Dispatched Vuex login");

        router.push("/home/overview");
        console.log("Tried to redirect to /home/overview");
        console.log("Is authenticated:", store.state.auth.isAuthenticated);
      } catch (err) {
        error.value = err.response?.data.message || "An error occurred";
      }
    };

    return { googleLogo, usernameOrEmail, password, error, handleSubmit };
  },
};
</script>

<style>
input {
  font-weight: 300;
}
</style>

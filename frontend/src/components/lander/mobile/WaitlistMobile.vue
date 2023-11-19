<template>
  <div v-if="!isMobileDevice">
    <div class="flex items-center mt-[28px]">
      <input
        v-model="email"
        type="email"
        placeholder="Email address"
        class="h-[36px] rounded-[28px] focus:shadow-searchsh w-[200px] text-[12px] px-[12px] bg-slate-100 border-[1px] border-slate-50 mr-[12px]"
      />
      <div v-if="emailError">{{ emailError }}</div>
      <div
        @click="joinWaitlist"
        class="get-started-wrapper shadow-btn cursor-pointer w-[152px] h-[36px] bg-[#06FEBB] rounded-[28px] flex items-center justify-between px-[16px]"
      >
        <div class="get-started-text leading-6 text-[14px]">JOIN WAITLIST</div>
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4283 1.42529L15.9997 5.99901L11.4283 10.5716M1.14258 6.00015H15.9997"
            stroke="#111319"
            stroke-width="1.14286"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div class="h-[48px] pt-[8px]">
      <Transition name="waitlist" mode="out-in">
        <div
          class="text-[12px] font-medium text-slate-700 px-[12px] cursor-default"
          v-if="submitted"
        >
          Successfully joined the waitlist!
        </div>
      </Transition>
    </div>
  </div>
  <div v-else>
    <div class="mt-[20px]">
      <input
        v-model="email"
        type="email"
        placeholder="Email address"
        class="h-[36px] rounded-[28px] focus:shadow-searchsh w-[200px] text-[12px] px-[12px] bg-slate-100 border-[1px] border-slate-400 mr-[12px]"
      />
      <div v-if="emailError">{{ emailError }}</div>
      <div
        @click="joinWaitlist"
        class="get-started-wrapper shadow-btn cursor-pointer w-[152px] h-[36px] bg-[#06FEBB] rounded-[28px] flex items-center justify-between px-[16px]"
      >
        <div class="get-started-text leading-6 text-[14px]">JOIN WAITLIST</div>
        <svg
          width="17"
          height="12"
          viewBox="0 0 17 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.4283 1.42529L15.9997 5.99901L11.4283 10.5716M1.14258 6.00015H15.9997"
            stroke="#111319"
            stroke-width="1.14286"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div class="h-[48px] pt-[8px]">
      <Transition name="waitlist" mode="out-in">
        <div
          class="text-[12px] font-medium text-slate-700 px-[12px] cursor-default"
          v-if="submitted"
        >
          Successfully joined the waitlist!
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, computed } from "vue";
import { useScreenObserver } from "@/composables/useScreenObserver";

export default {
  setup() {
    const { isMobileDevice } = useScreenObserver();

    const email = ref("");
    const emailError = ref("");
    const submitted = ref(false);

    const isValidEmail = computed(() => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email.value);
    });

    const joinWaitlist = async () => {
      if (!email.value) {
        emailError.value = "Email is required";
        return;
      }

      if (!isValidEmail.value) {
        emailError.value = "Invalid email format";
        return;
      }

      emailError.value = ""; // Reset error before API call

      const response = await axios.post(
        "/api/join-waitlist",
        { email: email.value }
      );

      if (response.data.success) {
        submitted.value = true;
        email.value = "";
      } else {
        emailError.value = "Failed to join the waitlist.";
      }
    };

    return {
      email,
      joinWaitlist,
      emailError,
      submitted,
      isMobileDevice,
    };
  },
};
</script>

<style>
.waitlist-enter-active,
.waitlist-leave-active {
  transition: all 0.15s;
}

.waitlist-enter-from {
  transform: translateY(-6px);
  opacity: 0;
}

.waitlist-leave-to {
  transform: translateY(6px);
  opacity: 0;
}

.waitlist-enter-to,
.waitlist-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>

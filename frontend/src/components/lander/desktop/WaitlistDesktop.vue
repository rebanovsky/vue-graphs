<template>
  <div class="h-[80px]">
    <div class="flex items-center mt-[48px]">
      <input
        v-model="email"
        type="email"
        placeholder="Email address"
        class="h-[36px] rounded-[28px] focus:shadow-searchsh w-[216px] text-[12px] px-[12px] bg-slate-100 border-[1px] border-slate-300 mr-[28px]"
      />
      <div
        @click="joinWaitlist"
        class="get-started-wrapper shadow-btn cursor-pointer h-[36px] bg-harlequin-200 rounded-[28px] flex items-center justify-between px-[16px]"
      >
        <div class="get-started-text leading-6 text-[14px] font-medium">JOIN WAITLIST</div>
        <!-- <img
          :src="arrow"
          alt="Arrow"
          class="dark:fill-slate-300 fill-slate-900 transition ease"
        /> -->
      </div>
    </div>
    <div v-if="emailError" class="ml-[14px] mt-[4px] text-[10px] text-error">
      {{ emailError }}
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
import arrow from "@/assets/icons/landerArrow.svg";
import axios from "axios";
import { ref, computed } from "vue";

export default {
  setup() {
    const email = ref("");
    const emailError = ref("");
    const submitted = ref(false);

    const isValidEmail = computed(() => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email.value);
    });

    const joinWaitlist = async () => {
      if (!email.value) {
        emailError.value = "Please enter a valid email address";
        return;
      }

      if (!isValidEmail.value) {
        emailError.value = "Invalid email format";
        return;
      }

      emailError.value = "";

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
      arrow,
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

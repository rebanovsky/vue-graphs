<template>
  <div class="upper-ribbon-objects h-[64px] w-[100%]">
    <div
      class="navbar-wrapper h-[64px] w-[100%] flex justify-between items-center"
    >
      <div
        class="items-center mr-[8px] px-[10px] flex rounded-[8px] py-[4px] text-[14px] text-slate-500"
      >
      </div>
      <TheSearch />
      <div class="right side-object flex w-[240px] gap-[8px] items-center">
        <ThemeToggler />
      </div>
    </div>
  </div>
</template>

<script>
import TheSearch from "@/components/navigation/TheSearch.vue";
import ThemeToggler from "../widgets/ThemeToggler.vue";
import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import TheDropdown from "../common/TheDropdown.vue";

export default {
  components: { TheSearch, ThemeToggler, TheDropdown },
  setup() {
    const store = useStore();
    const router = useRouter();

    const signOut = async () => {
      try {
        await axios.post('/api/users/logout');
        store.dispatch('logout');
        router.push("/");
      } catch (error) {
        console.error('Error during sign out:', error);
      }
    };

    const accountItems = ["API", "Excel add-on", "item c", "item d"]

    return { signOut, accountItems };
  },
};
</script>

<style>
.navbar-wrapper {
  z-index: 99999;
}
</style>

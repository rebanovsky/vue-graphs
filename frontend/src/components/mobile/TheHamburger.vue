<template>
  <div
    v-if="isMobileDevice && isHamburger"
    class="hamburger-content border-r-[1px] border-slate-400 p-[10px] shadow-sidersh dark:shadow-sidershdark bg-slate-300 dark:bg-slate-800"
  >
    <div class="hamburger-items w-[60vw]">
      <div class="hamburger-item flex">
        <div class="ih-logo">
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24.5"
            height="25.95"
            viewBox="0 0 18.25 19.95"
          >
            <path
              d="M17.41,4.35,10.06.23a1.86,1.86,0,0,0-1.8,0L.92,4.35A1.71,1.71,0,0,0,0,5.85v8.24a1.73,1.73,0,0,0,.9,1.51l7.34,4.12a1.84,1.84,0,0,0,1.79,0L17.4,15.6a1.69,1.69,0,0,0,.89-1.5V5.86A1.71,1.71,0,0,0,17.41,4.35Zm-1.74,8.28a1.71,1.71,0,0,1-.9,1.5L10,16.78a1.86,1.86,0,0,1-1.8,0L3.51,14.13a1.69,1.69,0,0,1-.89-1.5V7.8l4.2,2.34a2.17,2.17,0,0,0,.68,1.42,2.39,2.39,0,0,0,3.29,0,2.21,2.21,0,0,0,0-3.19,2.34,2.34,0,0,0-1.65-.67,2.29,2.29,0,0,0-1,.23L4,5.58,8.26,3.17a1.86,1.86,0,0,1,1.8,0l4.73,2.65a1.71,1.71,0,0,1,.9,1.5Z"
              transform="translate(-0.04 0)"
              class="dark:fill-slate-300 fill-slate-900 transition ease"
            />
          </svg>
        </div>
        <div class="ih-name ml-[10px] !text-[20px]">InsiderHive</div>
      </div>
      <div
        class="hamburger-market-time my-[8px] text-[14px] font-medium text-slate-700 dark:text-slate-400 mx-[10px]"
      >
        <div class="closed-market">
          New York - <em>{{ nycTime }}</em>
        </div>
        <div class="open-market">U.S. market closed</div>
      </div>
      <div
        class="hamburger-menu-items font-medium p-[10px] mt-[16px] flex flex-col justify-between text-[18px] font-medium"
      >
        <div class="hamburger-top h-[200px] text-slate-800 dark:text-slate-300">
          <div
            class="hamburger-menu-item mb-[8px] flex"
            @click="goToMobileHome"
          >
            <div class="hamburger-home-icon w-[44px]">
              <font-awesome-icon class="h-[20px]" :icon="['fas', 'house']" />
            </div>
            <div class="hamburger-home-name">Home</div>
          </div>
          <div class="hamburger-menu-item mb-[18px] mt-[36px] flex">
            <div class="hamburger-home-icon w-[44px]">
              <font-awesome-icon class="h-[20px]" :icon="['fas', 'user-tie']" />
            </div>
            <div class="hamburger-home-name">Insiders</div>
          </div>
          <div class="hamburger-menu-item my-[18px] flex">
            <div class="hamburger-home-icon w-[44px]">
              <font-awesome-icon
                class="h-[20px]"
                :icon="['fas', 'briefcase']"
              />
            </div>
            <div class="hamburger-home-name">Funds</div>
          </div>
          <div class="hamburger-menu-item my-[18px] flex">
            <div class="hamburger-home-icon w-[44px]">
              <font-awesome-icon
                class="h-[20px]"
                :icon="['fas', 'landmark-dome']"
              />
            </div>
            <div class="hamburger-home-name">Congress</div>
          </div>
          <div class="hamburger-menu-item my-[18px] flex">
            <div class="hamburger-home-icon w-[44px]">
              <font-awesome-icon class="h-[20px]" :icon="['fas', 'users']" />
            </div>
            <div class="hamburger-home-name">Social</div>
          </div>
          <div class="hamburger-menu-item mt-[36px] flex">
            <div class="hamburger-home-icon w-[44px]">
              <font-awesome-icon
                class="h-[20px]"
                :icon="['fas', 'book-bookmark']"
              />
            </div>
            <div class="hamburger-home-name">Glossary</div>
          </div>
        </div>
        <div class="hamburger-bottom h-[260px] flex flex-col justify-end">
          <div class="social-media text-slate-700 dark:text-slate-400">
            <div class="follow-us-hamburger text-[20px] my-[4px]">
              Follow us
            </div>
            <div class="social-media-links flex w-[100%] justify-between">
              <div
                class="social-media h-[36px] w-[36px] my-[8px] border-[1.5px] border-slate-500 rounded-[6px] p-[5px]"
              >
                <a href="https://twitter.com/realinsiderhive">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="h-[24px] w-[24px] flex justify-center items-center dark:fill-slate-300 fill-slate-700 dark:hover:fill-slate-500 hover:fill-slate-500 transition ease duration-75"
                  >
                    <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                    />
                  </svg>
                </a>
              </div>
              <div
                class="social-media my-[8px] h-[36px] w-[36px] border-[1.5px] border-slate-500 rounded-[6px] p-[5px]"
              >
                <a href="https://www.instagram.com/insiderhive/"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="w-[24px] h-[24px] dark:fill-slate-300 fill-slate-700 dark:hover:fill-slate-500 hover:fill-slate-500 transition ease duration-75"
                  >
                    <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                    /></svg
                ></a>
              </div>
              <div
                class="social-media my-[8px] h-[36px] w-[36px] border-[1.5px] border-slate-500 rounded-[6px] p-[5px]"
              >
                <a href="https://www.tiktok.com/@insiderhive?lang=en"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    class="h-[24px] w-[24px] dark:fill-slate-300 fill-slate-700 dark:hover:fill-slate-500 hover:fill-slate-500 transition ease duration-75"
                  >
                    <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                      d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
                    /></svg
                ></a>
              </div>
              <div
                class="social-media my-[8px] h-[36px] w-[36px] border-[1.5px] border-slate-500 rounded-[6px] p-[5px]"
              >
                <a
                  href="https://www.facebook.com/profile.php?id=100090162300654"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    class="h-[24px] w-[24px] dark:fill-slate-300 fill-slate-700 dark:hover:fill-slate-500 hover:fill-slate-500 transition ease duration-75"
                  >
                    <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                      d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "./components/navigation/TheNavbar.vue";
import { useRouter, useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import TheSearch from "@/components/navigation/TheSearch.vue";
import TheFooter from "@/components/navigation/TheFooter.vue";
import TheSidenav from "@/components/navigation/TheSidenav.vue";
import { useScreenObserver } from "@/composables/useScreenObserver";

export default {
  setup() {
    const { isLargeScreen, isMobileDevice } = useScreenObserver();

    let isDashboards = ref(false);

    const router = useRouter();

    return {};
  },
};
</script>

<style></style>

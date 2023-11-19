<template>
  <div
    style="height: calc(100vh-30px)"
    class="border-[1px] w-[100vw] h-[100vh] overflow-y-hidden"
  >
    <div class="lander-hero bg-[#F1F4F6]">
      <div class="hero-content">
        <div class="hero-top-row flex justify-between">
          <div class="ih-logo">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="18.25"
              height="19.95"
              viewBox="0 0 18.25 19.95"
            >
              <path
                d="M17.41,4.35,10.06.23a1.86,1.86,0,0,0-1.8,0L.92,4.35A1.71,1.71,0,0,0,0,5.85v8.24a1.73,1.73,0,0,0,.9,1.51l7.34,4.12a1.84,1.84,0,0,0,1.79,0L17.4,15.6a1.69,1.69,0,0,0,.89-1.5V5.86A1.71,1.71,0,0,0,17.41,4.35Zm-1.74,8.28a1.71,1.71,0,0,1-.9,1.5L10,16.78a1.86,1.86,0,0,1-1.8,0L3.51,14.13a1.69,1.69,0,0,1-.89-1.5V7.8l4.2,2.34a2.17,2.17,0,0,0,.68,1.42,2.39,2.39,0,0,0,3.29,0,2.21,2.21,0,0,0,0-3.19,2.34,2.34,0,0,0-1.65-.67,2.29,2.29,0,0,0-1,.23L4,5.58,8.26,3.17a1.86,1.86,0,0,1,1.8,0l4.73,2.65a1.71,1.71,0,0,1,.9,1.5Z"
                transform="translate(-0.04 0)"
                class="dark:fill-slate-300 fill-slate-900 transition ease"
              />
            </svg>
            <div class="ih-name ml-[10px] text-[18px] cursor-default">
              InsiderHive
            </div>
          </div>
        </div>
        <div class="hero-wrapper flex pt-[80px] ml-[20px] items-center">
          <div class="hero-text-wrapper w-[100vw]">
            <div class="hero-main text-[32px] leading-tight cursor-default">
              AI-powered <br />
              Financial Analysis for <br />
              Empowered Investments
            </div>
            <div class="hero-submain mt-[20px] cursor-default text-[14px]">
              InsiderHive leverages AI for in-depth financial analysis, offering
              intuitive data visualization and convenient download for further
              analysis or modeling.
            </div>
            <div>
              <WaitlistMobile />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WaitlistMobile from "@/components/lander/mobile/WaitlistMobile.vue";
import FloatingNodes from "@/components/lander/FloatingNodes.vue";
import TheChatbot from "@/components/lander/TheChatbot.vue";

export default {
  components: { WaitlistMobile, FloatingNodes, TheChatbot },
  setup() {

    return { };
  },
};
</script>

<style></style>

<template>
  <div
    class="rotator-wrapper w-[100%] h-[100%] flex flex-col items-center justify-center"
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="18"
      viewbox="0 0 15.588457268119894 18"
      class="rotator"
    >
      <path
        class="fill-slate-600 dark:fill-slate-300 transition ease"
        d="M6.928203230275509 0.49999999999999994Q7.794228634059947 0 8.660254037844386 0.5L14.722431864335455 4Q15.588457268119894 4.5 15.588457268119894 5.5L15.588457268119894 12.5Q15.588457268119894 13.5 14.722431864335455 14L8.660254037844386 17.5Q7.794228634059947 18 6.928203230275509 17.5L0.8660254037844386 14Q0 13.5 0 12.5L0 5.5Q0 4.5 0.8660254037844387 4Z"
      ></path>
    </svg>
    <div
      class="loading-text relative text-[10px] mt-[14px] text-slate-600 dark:text-slate-400 font-medium tracking-wider"
    >
      FETCHING
      <span class="loading-dot">.</span>
      <span class="loading-dot">.</span>
      <span class="loading-dot">.</span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style>
.rotator-main {
  -webkit-animation: rotator 1.4s ease-in-out infinite both;
  animation: rotator 1.4s ease-in-out infinite both;
  -webkit-transform-origin: 8.660254037844385px 10px;
  transform-origin: 8.660254037844385px 10px;
}
</style>

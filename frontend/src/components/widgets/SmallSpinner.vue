<template>
  <div
    class="rotator-wrapper w-[100%] h-[100%] flex items-center justify-center"
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      viewbox="0 0 17.32050807568877 20"
      class="rotator"
    >
      <path
      class="fill-slate-600 dark:fill-slate-300 transition ease"
        d="M7.794228634059947 0.49999999999999994Q8.660254037844386 0 9.526279441628825 0.5L16.454482671904334 4.5Q17.32050807568877 5 17.32050807568877 6L17.32050807568877 14Q17.32050807568877 15 16.454482671904334 15.5L9.526279441628825 19.5Q8.660254037844386 20 7.794228634059947 19.5L0.8660254037844386 15.5Q0 15 0 14L0 6Q0 5 0.8660254037844387 4.5Z"
      ></path>
    </svg>
    <div
      class="loading-text relative text-[8px] ml-[12px] text-slate-600 dark:text-slate-400 font-semibold tracking-widest"
    ></div>
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
.loader {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  border-right: 2px solid transparent;
  box-sizing: border-box;
  animation: rotation 0.7s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div
    class="rotator-wrapper w-[100%] h-[100%] flex items-center justify-center bg-slate-100 dark:bg-slate-800 shadow-boxshextralight rounded"
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
        class="fill-slate-600 dark:fill-slate-400 transition ease"
        d="M6.928203230275509 0.49999999999999994Q7.794228634059947 0 8.660254037844386 0.5L14.722431864335455 4Q15.588457268119894 4.5 15.588457268119894 5.5L15.588457268119894 12.5Q15.588457268119894 13.5 14.722431864335455 14L8.660254037844386 17.5Q7.794228634059947 18 6.928203230275509 17.5L0.8660254037844386 14Q0 13.5 0 12.5L0 5.5Q0 4.5 0.8660254037844387 4Z"
      ></path>
    </svg>
    <div
      class="loading-text relative text-[10px] ml-[12px] text-slate-600 dark:text-slate-400 font-medium tracking-wider"
    >
      LOADING MORE
      <!-- <span class="loading-dot">.</span>
        <span class="loading-dot">.</span>
        <span class="loading-dot">.</span> -->
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
.rotator {
  -webkit-animation: rotator 1.4s ease-in-out infinite both;
  animation: rotator 1.4s ease-in-out infinite both;
  -webkit-transform-origin: 7.794228634059947px 9px;
  transform-origin: 7.794228634059947px 9px;
}

@-webkit-keyframes rotator {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotator {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.loading-dot {
  animation: loading-text 1.5s infinite;
  display: inline;
  opacity: 0;
}

.loading-dot:nth-child(1) {
  animation-delay: 0s;
}
.loading-dot:nth-child(2) {
  animation-delay: 0.5s;
}
.loading-dot:nth-child(3) {
  animation-delay: 1s;
}

@keyframes loading-text {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

<template>
  <div class="number-counter-wrapper" :style="{ width: width }">
    <div class="h-[auto] text-[28px] font-semibold" :class="titleColor">
      {{ formatNumber(Math.floor(tweened)) }}
    </div>
    <div class="number-counter-title text-[12px]" :class="textColor">
      {{ title }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: 'auto'
    },
    startNumber: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 1,
    },
    textColor: {
      type: String,
      default: 'text-slate-100'
    },
    titleColor: {
      type: String,
      default: 'text-slate-100'
    }
  },
  setup(props) {
    const tweened = ref(props.startNumber);

    onMounted(() => {
      gsap.to(tweened, { duration: props.duration, value: props.number });
    });


    function formatNumber(num) {
      let formattedNum;

      if(num >= 1e9) {
        formattedNum = (num / 1e9).toFixed(1) + 'B';
      } else if(num >= 1e6) {
        formattedNum = (num / 1e6).toFixed(1) + 'M';
      } else if(num >= 1e3) {
        formattedNum = (num / 1e3).toFixed(1) + 'K';
      } else {
        return num.toString();
      }

      return formattedNum.indexOf('.0') !== -1 ? formattedNum.replace('.0', '') : formattedNum;
    }


    return { tweened, formatNumber };
  },
};
</script>

<style scoped></style>

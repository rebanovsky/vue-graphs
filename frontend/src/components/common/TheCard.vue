<template>
  <div
    class="card-wrapper flex flex-col justify-between rounded-[12px] bg-slate-200 dark:bg-slate-900 overflow-hidden"
    :style="{ height: height, width: width }"
    v-if="shouldRender"
  >
    <div
      class="card-wrapper-title pt-[12px] pb-[6px] border-b-[1px] text-[14px] border-slate-200 font-normal flex items-center"
    >
      <div class="card-title">{{ title }}</div>
      <!-- <div
        class="card-icon mx-[8px] w-[28px] h-[28px] bg-slate-200 dark:bg-slate-700 rounded-[8px] flex items-center justify-center text-[10px] font-normal text-slate-500"
      >
        {{ icon }}
      </div> -->
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: "200px",
    },
    width: {
      type: String,
      default: "200px",
    },
    title: {
      type: String,
      default: "Title",
    },
    icon: {
      type: String,
      default: "icon",
    },
    option: {
      type: String,
      default: "OPTION",
    },
    shouldRender: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style>
.card-header {
  height: 36px;
  padding: 0 0 2px 0;
  font-size: 14px;
  transition: font-size 0.2s ease, height 0.2s ease;
}

.card-header.scrolled {
  font-size: 11px;
  height: 24px;
}

.card-wrapper,
.card-content {
  box-sizing: border-box;
}

.card-content {
  overflow-y: auto;
}

.card-option {
  transition: all 0.1s ease;
}

.news-title {
  width: 152px; /* Fixed width */
  white-space: nowrap; /* Prevent wrapping of text */
  overflow: hidden; /* Hide the overflow */
  text-overflow: ellipsis; /* Show ellipsis for overflowed content */
  /* ...other styles... */
}
</style>

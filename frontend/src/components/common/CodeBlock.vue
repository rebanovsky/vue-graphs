<template>
  <div class="code-line rounded w-[100%] gridlines">
    <div
      class="code-header w-[100%] flex items-center px-[12px] justify-between"
    >
      <div
        ref="codeContent"
        class="code-content flex p-[12px] rounded-b font-mono"
      >
        <!-- <slot></slot> -->
        <pre v-if="freeform"><code >{{ code }}</code></pre>
        <pre v-else><code ref="codeBlock" class="language-javascript">{{ code }}</code></pre>
      </div>
      <div class="flex">
        <Transition name="slide-left">
          <div class="copy mx-[4px] font-normal text-[12px]" v-if="svgHovered">
            <Transition name="fade" mode="out-in">
              <div :key="copied ? 'copied' : 'copy'">
                {{ copied ? "Copied" : "Copy" }}
              </div>
            </Transition>
          </div>
        </Transition>
        <SvgIcon
          name="copy"
          dynamicClass="hover:fill-slate-800 cursor-pointer p-[2px] dark:hover:!fill-slate-200"
          @mouseover="handleMouseOver"
          @mouseleave="handleMouseLeave"
          @click="copyToClipboard"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import SvgIcon from "@/components/utils/SvgIcon.vue";
import Prism from 'prismjs';
// import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism.-dark.css';

const props = defineProps({
  code: String,
  freeform: Boolean
});

const codeBlock = ref(null);

const highlight = () => {
  requestAnimationFrame(() => {
    if (codeBlock.value) {
      Prism.highlightElement(codeBlock.value);
    }
  });
};

onMounted(highlight);

watch(() => props.code, highlight);

const svgHovered = ref(false);
const copied = ref(false);
const codeContent = ref(null);

const copyToClipboard = async () => {
  if (codeContent.value) {
    try {
      await navigator.clipboard.writeText(codeContent.value.textContent);
      copied.value = true;
      setTimeout(() => {
        svgHovered.value = false;
      }, 1800);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
};

const handleMouseLeave = () => {
  copied.value = false;
  svgHovered.value = false;
};

const handleMouseOver = () => {
  if (!copied.value) {
    svgHovered.value = true;
  }
};
</script>

<style></style>

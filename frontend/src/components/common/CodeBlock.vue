<template>
  <div
    class="code-line rounded-[8px] w-[100%] bg-slate-25 dark:bg-slate-800 chart-border w-[480px]"
  >
    <div class="code-header w-[100%] flex px-[12px] relative">
      <div
        ref="codeContent"
        class="code-content flex p-[12px] rounded-b font-mono"
      >
        <pre
          v-if="freeform"
          v-highlightjs
        ><code class="bash w-[100%]" >{{ code }}</code></pre>
        <pre
          v-else
          v-highlightjs
        ><code class="javascript">{{ code }}</code></pre>
      </div>
      <div class="flex mt-[16px] absolute right-[12px] items-center">
        <Transition name="slide-left">
          <div
            class="copy mx-[4px] font-normal text-[12px] h-[20px] flex items-center"
            v-if="svgHovered"
          >
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
import { ref } from "vue";
import SvgIcon from "@/components/utils/SvgIcon.vue";

const props = defineProps({
  code: String,
  freeform: Boolean,
});

// onMounted(highlight);

// watch(() => props.code, highlight);

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

<style>
pre code.hljs {
  display: block;
  overflow-x: auto;
  font-size: 0.9em;
}
code.hljs {
  padding: 1px 3px;
  line-height: 1.5em !important;
}
/*

XCode style (c) Angel Garcia <angelgarcia.mail@gmail.com>

*/
.hljs {
  color: rgb(0, 0, 0);
}
/* Gray DOCTYPE selectors like WebKit */
.xml .hljs-meta {
  color: #c0c0c0;
}
.hljs-comment,
.hljs-quote {
  color: #007400;
}
.hljs-tag,
.hljs-attribute,
.hljs-keyword,
.hljs-selector-tag,
.hljs-literal,
.hljs-name {
  color: #d900a6;
}
.hljs-variable,
.hljs-template-variable {
  color: #3f6e74;
}
.hljs-code,
.hljs-string,
.hljs-meta .hljs-string {
  color: #ee0019;
}
.hljs-regexp,
.hljs-link {
  color: #0e0eff;
}
.hljs-title,
.hljs-symbol,
.hljs-bullet,
.hljs-number {
  color: #1c00cf;
}
.hljs-section,
.hljs-meta {
  color: #643820;
}
.hljs-title.class_,
.hljs-class .hljs-title,
.hljs-type,
.hljs-built_in,
.hljs-params {
  color: #ac00ff;
}
.hljs-attr {
  color: #008f88;
}
.hljs-subst {
  color: #000;
}
.hljs-formula {
  background-color: #eee;
  font-style: italic;
}
.hljs-addition {
  background-color: #baeeba;
}
.hljs-deletion {
  background-color: #ffc8bd;
}
.hljs-selector-id,
.hljs-selector-class {
  color: #9b703f;
}
.hljs-doctag,
.hljs-strong {
  font-weight: bold;
}
.hljs-emphasis {
  font-style: italic;
}
</style>

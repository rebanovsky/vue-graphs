<template>
  <div
    class="chart-container flex w-[100%] items-center mb-[20px] flex-col gap-[20px] py-[32px] pl-[32px] rounded-[12px] overflow-y-auto"
  >
    <div class="chart-title flex py-[4px]">
      <div class="h-[100%] text-[14px] text-slate-500 flex">
        {{ title }}
      </div>
    </div>
    <div class="flex flex-col gap-[16px]">
      <div class="flex flex-col gap-[40px]">
        <div class="flex gap-[32px]">
          <div class="flex flex-col gap-[20px]">
            <slot></slot>
            <div
              class="props-wrapper w-[560px] gridlines flex flex-col gap-[8px]"
            >
              <div
                class="props-data-header flex gap-[12px] px-[12px] text-[12px] text-slate-500"
              >
                <RadioButton
                  :options="options"
                  v-model="appendix"
                  name="name"
                />
              </div>

              <div
                class="chart-properties text-[12px] w-[auto] p-[12px] rounded-[8px]"
                v-if="appendix == 'props'"
              >
                <div class="props-table flex flex-col">
                  <div
                    class="props-header flex gap-[12px] text-slate-700 py-[12px] dark:text-slate-300 border-b-[1px] font-medium border-slate-300 dark:border-slate-700"
                  >
                    <div class="props-title w-[64px]">Prop</div>
                    <div class="props-title w-[64px]">Type</div>
                    <div class="props-title w-[64px]">Default</div>
                    <div class="props-title w-[302px]">Description</div>
                  </div>
                  <div
                    class="props-data flex flex-col gap-[0px] dark:text-slate-300"
                  >
                    <div
                      class="props-row flex gap-[12px] py-[16px] h-[100%] flex items-center text-slate-600 dark:text-slate-400 border-b-[1px] border-slate-200 dark:border-slate-800"
                      v-for="prop in componentProps"
                    >
                      <div class="props-cell w-[64px]">{{ prop.name }}</div>
                      <div class="props-cell w-[64px]">{{ prop.type }}</div>
                      <div class="props-cell w-[64px]">{{ prop.default }}</div>
                      <div class="props-cell w-[302px]">
                        {{ prop.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="preview-data-wrapper p-[12px]"
                v-if="appendix == 'data'"
              >
                <div
                  class="preview-data-title text-slate-700 py-[12px] dark:text-slate-300 py-[12px] text-[12px] font-medium flex gap-[12px] border-b-[1px] border-slate-300 dark:border-slate-700"
                >
                  <div class="">
                    {{ previewData.title }}
                  </div>
                  <div class="text-slate-500">
                    Array({{ previewData.arrLength }})
                  </div>
                </div>
                <div
                  class="preview-data-content m-[20px] text-[12px] text-slate-500 font-mono font-light"
                >
                  [
                  <div class="key-values-wrapper px-[16px]">
                    <div
                      class="key-values"
                      v-for="object in previewData.json"
                      :key="index"
                    >
                      {
                      <div
                        class="mx-[16px] text-harlequin-500 flex gap-[8px]"
                        v-for="kv in object.keyValues"
                      >
                        <div class="">"{{ kv.key }}":</div>
                        <div
                          class="text-blue-400"
                          v-if="getType(kv.value) === 'number'"
                        >
                          {{ kv.value }}
                        </div>
                        <div
                          class="text-harlequin-500"
                          v-else-if="getType(kv.value) === 'string'"
                        >
                          "{{ kv.value }}"
                        </div>
                      </div>
                      },
                    </div>
                    ...
                  </div>
                  ]
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-[20px]">
            <div class="config flex flex-col gap-[4px] text-[14px]">
              <div class="config-search flex text-[14px]">
                <div class="gridlines w-[100%]">
                  <div class="ticker-searcher flex items-center px-[8px]">
                    <font-awesome-icon
                      class="h-[12px] text-slate-400 dark:text-slate-600 transition"
                      :icon="['fas', 'magnifying-glass']"
                    />
                    <input
                      ref="searchRef"
                      class="dark:placeholder-slate-500 font-light text-[12px] h-[32px] px-[6px] w-[140px] mx-[5px] bg-transparent placeholder-slate-400 transition ease"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
              <div
                class="flex flex-col gap-[12px] gridlines w-[200px] p-[12px] h-[243px] overflow-y-auto"
              >
                <div class="w-[112px] flex flex-col gap-[16px]">
                  <slot name="config"></slot>
                </div>
              </div>
            </div>
            <div class="code-block flex text-[14px]">
              <div
                class="flex flex-col gap-[12px] gridlines w-[200px] p-[12px] h-[auto] overflow-y-auto overflow-x-hidden"
              >
                <slot name="code-block"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nanoid } from "nanoid";
import { onMounted, ref } from "vue";
import RadioButton from "./RadioButton.vue";

const props = defineProps({
  dataFile: {
    type: String,
    default: ".json",
  },
  title: {
    type: String,
    default: "Chart title",
  },
  componentProps: {
    type: Array,
  },
  previewData: {
    type: Object,
  },
});

const appendix = ref("data");

const options = [
  {
    id: nanoid(10),
    value: "props",
    label: "Props",
  },
  {
    id: nanoid(10),
    value: "data",
    label: "Data",
  },
];

// data type check
function getType(value) {
  if (Array.isArray(value)) {
    return "array";
  }
  return typeof value;
}
</script>

<style lang="scss" scoped></style>

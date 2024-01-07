<template>
  <div
    class="chart-container flex w-[100%] items-center mb-[20px] flex-col gap-[20px] p-[32px] overflow-y-auto"
  >
    <div class="flex flex-col gap-[32px] w-[800px]">
      <div class="chart-title flex py-[4px]">
        <h1>
          {{ title }}
        </h1>
      </div>
      <div class="chart-intro w-[560px] gridlines mb-[60px]">
        <slot name="intro"></slot>
      </div>
      <div class="chart-title w-[560px] gridlines text-600">
        {{ chartTitle }}
      </div>
      <div class="flex flex-col gap-[40px]">
        <div class="flex gap-[32px]">
          <div class="flex flex-col gap-[40px]">
            <slot></slot>
            <div
              class="props-wrapper w-[560px] gridlines flex flex-col gap-[8px]"
            >
              <div
                class="props-data-header flex gap-[12px] px-[40px] text-[12px] text-slate-500"
              >
                <RadioButton
                  :options="options"
                  v-model="appendix"
                  name="name"
                />
              </div>
              <div
                class="w-[100%] flex justify-center mt-[28px]"
                v-if="appendix == 'code'"
              >
                <CodeBlock :code="code">
                  <template #custom-code v-if="chartProps.length > 0">
                    <slot name="custom-code">
                      <div
                        class="flex font-mono h-[100%] items-center"
                      >
                        <div class="flex flex-col relative text-[0.9em] leading-5">
                          <div class="top flex flex-col">
                            <div class="dummy-template-tag text-[#007ee4] dark:text-[#61afee]">
                              {{ "<template>" }}
                            </div>
                            <div class="chart-title-wrapper flex text-[gray] ml-[16px]">
                              {{ "<" }}
                              <div
                                class="component-name text-[#dfaa00] dark:text-[#e5c07b]"
                              >
                                {{ chartTitle }}
                              </div>
                            </div> 
                          </div>
                          <transition-group name="list" tag="div">
                            <div
                              class="props ml-[32px] flex"
                              v-for="prop in chartProps"
                              :key="prop.name"
                            >

                              <div
                                class="props-name text-[#d70011] dark:text-[#df6c75]"
                              >
                              :{{ prop.name }}
                              </div>
                              =
                              <div
                                class="props-value text-[#4bb300] dark:text-[#98c379] truncate"
                              >
                                {{ prop.value }}
                              </div>
                            </div>
                          </transition-group>
                          <div class="bottom text-[gray] ml-[16px]">{{ "/>" }}</div>
                        </div>
                      </div>
                    </slot>
                  </template>
                </CodeBlock>
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
              <!-- <div
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
                  <div class="key-values-wrapper px-[16px] leading-5">
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
              </div> -->
            </div>
          </div>
          <div class="flex flex-col gap-[20px]">
            <div class="config flex flex-col gap-[4px] text-[14px]">
              <!-- <div class="config-search flex text-[14px]">
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
              </div> -->
              <div
                class="flex flex-col gap-[12px] gridlines w-[200px] p-[12px] h-[600px] overflow-y-auto"
              >
                <div class="w-[100%] flex flex-col gap-[28px]">
                  <slot name="config"></slot>
                </div>
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
import { ref } from "vue";
import RadioButton from "@/components/common/RadioButton.vue";
import CodeBlock from "@/components/common/CodeBlock.vue";

const props = defineProps({
  dataFile: {
    type: String,
    default: ".json",
  },
  title: {
    type: String,
    default: "Title",
  },
  chartTitle: {
    type: String,
    default: "Chart title",
  },
  componentProps: {
    type: Array,
  },
  previewData: {
    type: Object,
  },
  code: {
    type: String,
  },
  chartProps: {
    type: Array,
    default: [],
  },
});

const appendix = ref("code");

const options = [
  {
    id: nanoid(10),
    value: "code",
    label: "Code",
  },
  {
    id: nanoid(10),
    value: "props",
    label: "Props",
  },
  // {
  //   id: nanoid(10),
  //   value: "data",
  //   label: "Data",
  // },
];

function getType(value) {
  if (Array.isArray(value)) {
    return "array";
  }
  return typeof value;
}
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.list-leave-active {
  position: absolute;
}
</style>

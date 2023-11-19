<template>
  <div class="w-[400px]">
    <div
      class="absolute transition ease w-[360px] h-[100px] top-[147px] shadow-scrollshtopmain z-10 dark:shadow-scrollshtopdark"
    ></div>
    <div>
      <Transition name="fadeslide" mode="out-in" appear>
        <div
          v-if="dummyQuestion"
          class="user-prompt-wrapper flex my-[8px] pr-[12px] pl-[2px] ml-[10px] py-[4px] mt-[32px]"
        >
          <div
            class="chat-dot bg-slate-50 h-[8px] w-[10px] rounded-[8px] translate-y-[10px] translate-x-[-25px]"
          ></div>
          <div>
            <div
              class="user-icon w-[28px] h-[28px] bg-slate-100 shadow-boxshlight rounded-[10px] flex items-center justify-center"
            >
              <font-awesome-icon class="text-[10px]" :icon="['fas', 'user']" />
            </div>
          </div>
          <div
            class="user-prompt-text w-[100%] ml-[16px] leading-8 cursor-default"
          >
            What's Apple's outlook for 2023?
          </div>
        </div>
      </Transition>
    </div>
    <div>
      <Transition name="fadeslide" mode="out-in" appear>
        <div
          v-if="dummyAnswer"
          class="ai-answer-wrapper shadow-boxshlight flex mt-[8px] pr-[12px] pl-[2px] ml-[10px] rounded-[12px] py-[8px] text-aitext dark:text-darkaitext bg-slate-100 dark:bg-darkaianswer"
        >
          <div
            class="chat-dot bg-slate-50 h-[8px] w-[10px] rounded-[8px] translate-y-[10px] translate-x-[-25px]"
          ></div>
          <div>
            <div
              class="ai-icon text-[12px] cursor-default shadow-boxshlight font-medium w-[28px] h-[28px] rounded-[10px] flex items-center justify-center"
            >
              AI
            </div>
          </div>
          <div class="ai-answer-text w-[100%] ml-[32px] leading-8">
            <div class="example-chart cursor-default">
              Apple's outlook going into 2023 is positive, as the company has
              seen increases in net sales across all categories in 2022 compared
              to 2021.
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div>
      <Transition name="fadeslide" mode="out-in" appear>
        <div
          v-if="dummyQuestion2"
          class="user-prompt-wrapper flex my-[8px] pr-[12px] pl-[2px] ml-[10px] py-[4px] mt-[32px]"
        >
          <div
            class="chat-dot bg-slate-50 h-[8px] w-[10px] rounded-[8px] translate-y-[10px] translate-x-[-25px]"
          ></div>
          <div>
            <div
              class="user-icon w-[28px] h-[28px] bg-slate-100 shadow-boxshlight rounded-[10px] flex items-center justify-center"
            >
              <font-awesome-icon class="text-[10px]" :icon="['fas', 'user']" />
            </div>
          </div>
          <div
            class="user-prompt-text w-[100%] ml-[16px] leading-8 cursor-default"
          >
            List Apple's products by revenue
          </div>
        </div>
      </Transition>
    </div>
    <div>
      <Transition name="fadeslide" mode="out-in" appear>
        <div
          v-if="dummyAnswer2"
          class="ai-answer-wrapper flex mt-[8px] pr-[12px] pl-[2px] ml-[10px] shadow-boxshlight rounded-[12px] pt-[8px] pb-[36px] bg-slate-100 text-aitext dark:text-darkaitext"
        >
          <div
            class="chat-dot bg-slate-50 h-[8px] w-[10px] rounded-[8px] translate-y-[10px] translate-x-[-25px]"
          ></div>
          <div>
            <div
              class="ai-icon text-[12px] cursor-default shadow-boxshlight font-medium w-[28px] h-[28px] rounded-[10px] flex items-center justify-center"
            >
              AI
            </div>
          </div>
          <div class="ai-answer-text w-[100%] ml-[16px] leading-8">
            <div class="example-chart">
              <div
                class="example-data-name text-[11px] pl-[60px] cursor-default"
              >
                Revenue by products
              </div>
              <BarChart :data="data" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div>
      <Transition name="fadeslide" mode="out-in" appear>
        <div
          v-if="dummyQuestion3"
          class="user-prompt-wrapper flex my-[8px] pr-[12px] pl-[2px] ml-[10px] py-[4px] mt-[32px]"
        >
          <div
            class="chat-dot bg-slate-50 h-[8px] w-[10px] rounded-[8px] translate-y-[10px] translate-x-[-25px]"
          ></div>
          <div>
            <div
              class="user-icon w-[28px] h-[28px] bg-slate-100 shadow-boxshlight rounded-[10px] flex items-center justify-center"
            >
              <font-awesome-icon class="text-[10px]" :icon="['fas', 'user']" />
            </div>
          </div>
          <div
            class="user-prompt-text w-[100%] ml-[16px] leading-8 cursor-default"
          >
            List Apple's top competitors
          </div>
        </div>
      </Transition>
    </div>
    <div>
      <Transition name="fadeslide" mode="out-in" appear>
        <div
          v-if="dummyAnswer3"
          class="ai-answer-wrapper flex mt-[8px] pr-[12px] pl-[2px] ml-[10px] shadow-boxshlight rounded-[12px] py-[8px] bg-slate-100 text-aitext dark:text-darkaitext"
        >
          <div
            class="chat-dot bg-slate-50 h-[8px] w-[10px] rounded-[8px] translate-y-[10px] translate-x-[-25px]"
          ></div>
          <div>
            <div
              class="ai-icon text-[12px] cursor-default shadow-boxshlight font-medium w-[28px] h-[28px] rounded-[10px] flex items-center justify-center"
            >
              AI
            </div>
          </div>
          <div class="ai-answer-text w-[100%] ml-[16px] leading-8">
            <div class="example-chart">
              <div
                class="example-data-name text-[14px] cursor-default"
              >
                Apple's top competitors
              </div>
              <div class="text-[12px]">
                <div>1. Samsung</div>
                <div>2. Microsoft</div>
                <div>3. Google</div>
                <div>4. Huawei</div>
                <div>5. Motorola</div>
                <div>6. Sony</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="absolute">
      <Transition name="fade" mode="out-in">
        <div
          class="text-[12px] mb-[6px] px-[12px] cursor-default font-medium text-slate-400 mt-[4px]"
          v-if="!dummyAnswer && dummyQuestion"
        >
          WRITING &nbsp;<TheDots />
        </div>
      </Transition>
      <Transition name="fade" mode="out-in">
        <div
          class="text-[12px] mb-[6px] px-[12px] cursor-default font-medium text-slate-400 mt-[4px]"
          v-if="!dummyAnswer2 && dummyQuestion2"
        >
          GENERATING &nbsp;<TheDots />
        </div>
      </Transition>
      <Transition name="fade" mode="out-in">
        <div
          class="text-[12px] mb-[6px] px-[12px] cursor-default font-medium text-slate-400 mt-[4px]"
          v-if="!dummyAnswer3 && dummyQuestion3"
        >
          WRITING &nbsp;<TheDots />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import BarChart from "@/components/common/graphs/BarChart.vue";
import TheDots from "../widgets/TheDots.vue";

export default {
  components: { BarChart, TheDots },
  setup() {
    // DUMMY DATA FOR BAR CHART & OTHER MARKETING STUFF
    let data = [
      { name: "iPhone", unit: 169658000000 },
      { name: "Services", unit: 95118000000 },
      { name: "Wearables & other", unit: 74200000000 },
      { name: "iPad", unit: 29375000000 },
      { name: "Mac", unit: 25977000000 },
    ];

    const dummyQuestion = ref("");
    const dummyAnswer = ref("");
    const dummyQuestion2 = ref("");
    const dummyAnswer2 = ref("");
    const dummyQuestion3 = ref("");
    const dummyAnswer3 = ref("");

    setTimeout(() => {
      dummyQuestion.value = true;
    }, 2000); // appear 2s later
    setTimeout(() => {
      dummyAnswer.value = true;
    }, 7000); // appear 7s later
    setTimeout(() => {
      dummyQuestion2.value = true;
    }, 12000); // appear 12s later
    setTimeout(() => {
      dummyAnswer2.value = true;
    }, 17000); // appear 17s later
    setTimeout(() => {
      dummyQuestion3.value = true;
    }, 22000); // appear 22s later
    setTimeout(() => {
      dummyAnswer3.value = true;
    }, 27000); // appear 27s later

    return {
      data,
      dummyQuestion,
      dummyAnswer,
      dummyQuestion2,
      dummyAnswer2,
      dummyQuestion3,
      dummyAnswer3,
    };
  },
};
</script>

<style></style>

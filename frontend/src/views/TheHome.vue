<template>
  <div class="flex justify-between w-[100%] px-[12px] gap-[12px]">
    <div
      class="playground-component p-[12px] text-[14px] flex flex-1 gap-[40px] justify-center w-[100%] gridlines rounded-[14px]"
    >
      <!-- Introduction Section -->
      <div
        class="container w-[800px] overflow-y-auto p-[20px] rounded-[12px] gridlines flex flex-col gap-[20px]"
      >
        <header>
          <h1 class="text-[20px] font-medium">Vue-Graphs</h1>
        </header>

        <section class="introduction leading-6 font-normal text-slate-500">
          <!-- <p>
            A practical and efficient package for Vue 3, designed to enhance
            your experience with D3.js. It simplifies the process of creating
            interactive data visualizations, making it more accessible and less
            time-consuming for developers.
          </p> -->
        </section>

        <section class="installation my-[20px]">
          <div class="steps flex justify-around">
            <div
              class="step flex items-center justify-around w-[400px]"
              v-for="(step, index) in steps"
              :key="index"
            >
              <div class="flex flex-col gap-[12px] items-center">
                <div class="step-header flex gap-[8px] items-center">
                  <div
                    class="step-nr border-[1px] border-harlequin-300 rounded-[20px] h-[24px] w-[24px] flex items-center justify-center"
                  >
                    {{ step.stepNr }}
                  </div>
                  <div class="step-title">{{ step.stepTitle }}</div>
                </div>
                <div
                  class="step-content text-[12px] border-[1px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-100 dark:border-slate-900 p-[8px] rounded"
                >
                  {{ step.content }}
                </div>
              </div>
              <div class="w-[14px]">
                <div
                  v-if="index < steps.length - 1"
                  class="arrow text-[24px] tracking-7 text-slate-400"
                >
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="graphs-wrapper flex justify-center my-[40px]">
          <div class="flex flex-wrap gap-[32px] w-[600px]">
            <div
              class="graphs-container"
              v-for="(graph, index) in graphs"
              :key="index"
            >
              <div
                class="graph-box hover:bg-harlequin-50 flex flex-col gap-[2px] dark:hover:bg-harlequin-900 rounded-[8px] hover:border-harlequin-300 hover:text-harlequin-500 dark:hover:text-harlequin-300 border-[1.25px] border-slate-300 dark:border-slate-700 dark:hover:border-harlequin-300 transition ease duration-75 cursor-pointer w-[120px] h-[120px] p-[8px] text-[12px]"
                @mouseover="isAnimate = true"
                @mouseleave="isAnimate = false"
              >
                {{ graph.name }}
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Linechart'"
                >
                  <SingleLine
                    :animation="isAnimate"
                    :width="100"
                    :height="60"
                    :data="lineData"
                    dateFormat="%Y-%m-%d"
                    :line-color="''"
                  />
                </div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Barchart'"
                >
                  <TheBarchart
                    :data="earnings"
                    :height="60"
                    :width="100"
                  />
                </div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Piechart'"
                ></div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Area chart'"
                ></div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Scatterplot'"
                ></div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Heatmap'"
                ></div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Bubblechart'"
                ></div>
                <div
                  class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                  v-if="graph.name == 'Treemap'"
                ></div>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <p>Vue-Graphs: Streamlining Data Visualization in Vue.</p>
        </footer>
      </div>
    </div>
    <!-- Version History -->
    <div class="version-history w-[200px] gridlines dark:bg-slate-800 rounded-[12px] p-[12px]">
      <div class="versions-wrapper flex flex-col gap-[8px]">
        <div class="version-header">Version history</div>
        <div class="versions">
          <div class="version text-[12px] py-[4px] flex flex-col gap-[4px]">
            <div class="version-no">V 0.99</div>
            <div
              class="version-notes text-slate-500 flex flex-col gap-[2px] text-[11px]"
            >
              <div class="note">- UI/UX bug fixes</div>
              <div class="note">- Added 4 new graphs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SingleLine from "@/components/graphs/SingleLine.vue";
import TheBarchart from "@/components/graphs/TheBarchart.vue";
import { line1 } from "@/data/dummyMultiLine";
import { ref } from "vue";

// LINECHART DATA
const formattedLineData = line1.map((item) => ({
  x: item.Date,
  y: item.Close,
}));

const lineData = ref([
  {
    color: "#061826",
    values: formattedLineData,
  },
]);

// animation check

const isAnimate = ref(false);

// List of graphs
const graphs = [
  {
    name: "Linechart",
  },
  {
    name: "Barchart",
  },
  {
    name: "Piechart",
  },
  {
    name: "Area chart",
  },
  {
    name: "Scatterplot",
  },
  {
    name: "Heatmap",
  },
  {
    name: "Bubblechart",
  },
  {
    name: "Treemap",
  },
];

const steps = [
  {
    stepNr: "1",
    stepTitle: "Installation",
    content: "npm i vue-graphs",
  },
  {
    stepNr: "2",
    stepTitle: "Customize graph",
    content: "docs",
  },
  {
    stepNr: "3",
    stepTitle: "Bind data",
    content: ':data="array"',
  },
];

// BARCHART DATA
const earnings = [
  {
    entity: "AAPL",
    data: [
      { x: "Q1 2023", y: 90000000 },
      { x: "Q2 2023", y: 110000000 },
      { x: "Q3 2023", y: 105000000 },
      { x: "Q4 2023", y: 120000000 },
    ],
  },
  {
    entity: "MSFT",
    data: [
      { x: "Q1 2023", y: 100000000 },
      { x: "Q2 2023", y: 120000000 },
      { x: "Q3 2023", y: 100000000 },
      { x: "Q4 2023", y: 100000000 },
    ],
  },
];
</script>

<style lang="scss" scoped></style>

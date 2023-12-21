<template>
  <div class="flex justify-center w-[100%] pl-[25px] gap-[25px] py-[32px]">
    <!-- Introduction Section -->
    <div class="home-section-wrapper flex flex-col gap-[64px]">
      <div
        class="home-section w-[800px] gridlines flex gap-[12px]"
        v-for="section in sections"
        :key="section.id"
      >
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">{{ section.title }}</h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
            v-html="section.content"
          ></div>
          <div
            class="code-line rounded w-[100%] h-[100px] bg-slate-25 dark:bg-slate-800"
            v-if="section.id == '2'"
          ></div>
        </div>
      </div>
    </div>
    <!-- GRAPHS SECTION
            <section class="graphs-wrapper flex justify-center my-[40px]">
        <div class="flex flex-wrap gap-[20px] w-[600px]">
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
                <TheBarchart :data="earnings" :height="60" :width="100" />
              </div>
              <div
                class="w-[100%] h-[100%] flex items-center justify-center gridlines"
                v-if="graph.name == 'Piechart'"
              >
                <PieChart :data="sectors" :width="100" :height="60" />
              </div>
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
     -->
  </div>
</template>

<script setup>
// import PieChart from "@/components/graphs/PieChart.vue";
// import SingleLine from "@/components/graphs/SingleLine.vue";
// import TheBarchart from "@/components/graphs/TheBarchart.vue";
import { line1 } from "@/data/dummyMultiLine";
import { ref } from "vue";

const sections = [
  {
    id: 1,
    title: "About",
    content: `
      This is a reusable graphs library for 
      <a class="text-harlequin-500" href="https://vuejs.org/guide/introduction.html" target="_blank">Vue3</a>, 
      utilizing 
      <a class="text-harlequin-500" href="https://d3js.org/" target="_blank">D3.js</a> 
      for its underlying data visualization capabilities. It is aimed at developers who need to integrate data visualizations into their Vue3 applications. The library offers a bridge between the reactivity of Vue3 and the graphical strengths of D3.js, providing a straightforward solution for incorporating complex charts and graphs.
    `,
  },
  {
    id: 2,
    title: "Installation",
    content: `
    Quickly integrate our Vue3 Graphs Library into your project with a simple npm install vue-graphs command.`,
  },
];

//

//

// Data for graphs

//

//

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
];

//PIECHART DATA
const sectors = [
  { label: "Others", value: 10 },
  { label: "Energy", value: 15 },
  { label: "Finance", value: 25 },
  { label: "Technology", value: 30 },
  { label: "Healthcare", value: 20 },
];
</script>

<style lang="scss" scoped></style>

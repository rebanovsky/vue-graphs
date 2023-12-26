<template>
  <div class="gap-[25px] py-[32px]">
    <div class="home-section-wrapper flex flex-col gap-[64px]">
      <!-- About -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1>
            {{ sections.about.title }}
          </h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
            v-html="sections.about.content"
          ></div>
        </div>
      </section>

      <!-- Installation -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">
            {{ sections.installation.title }}
          </h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
          >
            {{ sections.installation.content }}
          </div>
          <div class="w-[100%] flex justify-center">
            <CodeBlock :code="npmInstall" freeform />
          </div>
        </div>
      </section>

      <!-- Examples -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">
            {{ sections.examples.title }}
          </h1>
          <div class="home-paragraph text-slate-800 dark:text-slate-300 flex flex-col gap-[40px]">
            <div
              class="intro"
              v-html="sections.examples.charts.line.intro"
            ></div>
            <div class="chart-wrapper w-[100%] flex justify-center">
              <!-- LINECHART EXAMPLE -->
              <LineChart />
            </div>
            {{ sections.examples.content }}
          </div>
        </div>
      </section>

      <!-- API reference -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">
            {{ sections.apiReference.title }}
          </h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
          >
            {{ sections.apiReference.content }}
          </div>
        </div>
      </section>

      <!-- Configuration options -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">
            {{ sections.configOption.title }}
          </h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
          >
            {{ sections.configOption.content }}
          </div>
        </div>
      </section>

      <!-- Contact & support -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">
            {{ sections.contactAndSupport.title }}
          </h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
          >
            {{ sections.contactAndSupport.content }}
          </div>
        </div>
      </section>

      <!-- License -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-center">
          <div
            class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
          >
            #
          </div>
        </div>
        <div class="flex flex-col gap-[20px] w-[600px]">
          <h1 class="font-medium text-[24px]">
            {{ sections.license.title }}
          </h1>
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 font-light text-[14px] leading-7"
          >
            {{ sections.license.content }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import CodeBlock from "@/components/common/CodeBlock.vue";
import { line1 } from "@/data/dummyMultiLine";
import { ref } from "vue";
//Examples
import LineChart from "@/components/examples/LineChart.vue";

const sections = {
  about: {
    id: 1,
    title: "About",
    content: `This is a reusable graphs library for
      <a class="text-harlequin-500" href="https://vuejs.org/guide/introduction.html" target="_blank">Vue3</a>,
        utilizing
        <a class="text-harlequin-500" href="https://d3js.org/" target="_blank">D3.js</a>
        for its underlying data visualization capabilities. It is aimed at developers who need to integrate data visualizations into their Vue3 applications. The library offers a bridge between the reactivity of Vue3 and the graphical strengths of D3.js, providing a straightforward solution for incorporating complex charts and graphs.`,
  },
  installation: {
    id: 2,
    title: "Installation",
    content: `Quickly integrate our Vue3 Graphs Library into your project with a simple npm install vue-graphs command.`,
  },
  examples: {
    id: 3,
    title: "Examples",
    charts: {
      line: {
        intro: `<p>This example demonstrates how to create an interactive line chart using Vue 3's Composition API and D3.js. The chart showcases monthly sales data across a year. For more details, visit <a class="text-harlequin-500" href="line/linechart">line/linechart</a>.</p>`,
      },
    },
  },
  apiReference: {
    id: 4,
    title: "API reference",
    content:
      "A comprehensive list of all components, props, events, and slots. Description of each item along with type information and default values.",
  },
  configOption: {
    id: 5,
    title: "Configuration options",
    content:
      "Explain how to configure the graphs (e.g., themes, data formats). Provide code examples for common configurations.",
  },
  contactAndSupport: {
    id: 6,
    title: "Contact & support",
    content:
      "Provide information on how users can get support, report bugs, or reach out for help.",
  },
  license: {
    id: 7,
    title: "License",
    content: "State the type of license the library is released under.",
  },
};
// CODE

// npm install
const npmInstall = `npm install vue-graphs`;

//

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

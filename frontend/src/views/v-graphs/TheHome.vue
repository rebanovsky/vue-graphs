<template>
  <div
    class="playground-component w-[100%] p-[12px] text-[14px] flex justify-center gridlines rounded-[14px]"
    style="height: calc(100vh - 124px)"
  >
    <!-- Introduction Section -->
    <div
      class="container w-[800px] gridlines p-[20px] rounded-[8px] shadow-boxshlight dark:shadow flex flex-col gap-[28px]"
    >
      <header>
        <h1 class="text-[20px] font-medium">Vue-Graphs</h1>
      </header>

      <section class="introduction leading-6 font-normal text-slate-500">
        <p>
          A practical and efficient package for Vue 3, designed to enhance your
          experience with D3.js. It simplifies the process of creating
          interactive data visualizations, making it more accessible and less
          time-consuming for developers.
        </p>
      </section>

      <section class="installation">
        <div class="steps flex gap-[20px] justify-around">
          <div
            class="step flex flex-col items-center gap-[20px]"
            v-for="(step, index) in steps"
            :key="index"
          >
            <div class="step-header flex gap-[8px] items-center">
              <div
                class="step-nr border-[1px] border-harlequin-300 rounded-[20px] h-[24px] w-[24px] flex items-center justify-center"
              >
                {{ step.stepNr }}
              </div>
              <div class="step-title">{{ step.stepTitle }}</div>
            </div>
            <div class="step-content text-[12px] border-[1px] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 border-slate-300 dark:border-slate-700 p-[8px] rounded">
              {{ step.content }}
            </div>
          </div>
        </div>
      </section>

      <section
        class="graphs-wrapper flex flex-wrap justify-center gap-[32px] w-[100%] my-[40px]"
      >
        <div
          class="graphs-container"
          v-for="(graph, index) in graphs"
          :key="index"
        >
          <div
            class="graph-box hover:bg-harlequin-50 dark:hover:bg-harlequin-900 rounded-[8px] hover:border-harlequin-300 hover:text-harlequin-400 dark:hover:text-harlequin-300 border-[1.25px] border-slate-300 dark:border-slate-700 dark:hover:border-harlequin-300 transition ease duration-75 cursor-pointer w-[160px] h-[120px] p-[8px] text-[12px]"
          >
            {{ graph.name }}
          </div>
        </div>
      </section>

      <footer>
        <p>Vue-Graphs: Streamlining Data Visualization in Vue.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
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
    stepTitle: "Select and customize graph",
    content: "docs",
  },
  {
    stepNr: "3",
    stepTitle: "Bind your data",
    content: ':data="yourData"',
  },
];
</script>

<style lang="scss" scoped></style>

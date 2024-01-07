<template>
  <div class="gap-[25px] py-[32px]">
    <div class="home-section-wrapper flex flex-col gap-[64px]">
      <!-- About -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-start">
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
      <TheInstallation />

      <!-- Examples -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-start">
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
          <div
            class="home-paragraph text-slate-800 dark:text-slate-300 flex flex-col gap-[40px]"
          >
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

      <!-- Contact & support -->
      <TheSupport />

      <!-- License -->
      <section class="home-section w-[800px] gridlines flex gap-[12px]">
        <div class="h-[36px] flex items-start">
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
//Sections
import TheInstallation from "@/components/home/TheInstallation.vue";
import TheSupport from "@/components/home/TheSupport.vue";
//Examples
import LineChart from "@/components/home/examples/LineChart.vue";

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
  examples: {
    id: 3,
    title: "Examples",
    charts: {
      line: {
        intro: `<p>This example demonstrates how to create an interactive line chart using Vue 3's Composition API and D3.js. The chart showcases monthly sales data across a year. For more details, visit <a class="text-harlequin-500" href="linechart">linechart</a>.</p>`,
      },
    },
  },
  contactAndSupport: {
    id: 4,
    title: "Contact & support",
    content:
      "Provide information on how users can get support, report bugs, or reach out for help.",
  },
  license: {
    id: 5,
    title: "License",
    content: "This project is licensed under the MIT License.",
  },
};
</script>

<style lang="scss" scoped></style>

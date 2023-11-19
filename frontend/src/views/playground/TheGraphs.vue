<template>
  <div
    class="playground-component w-[100%] p-[12px] text-[12px] flex justify-center gridlines rounded-[14px]"
    style="height: calc(100vh - 172px)"
  >
    <!-- Introduction Section -->
    <div class="w-[800px] gridlines">
      <h1>Introducing <strong>Vue Graphs</strong>: Reusable Vue3 Components Powered by D3.js</h1>
      <p>Dive into the world of interactive data visualization with [Your Package Name], a cutting-edge NPM package that seamlessly integrates the power of D3.js with the flexibility of Vue3. Our package offers a curated collection of ready-to-use graph components, meticulously designed for developers who seek to bring their data to life.</p>
      
      <h2>Why Choose [Your Package Name]?</h2>
      <ul>
        <li><strong>Effortless Integration</strong>: Enjoy the simplicity of Vue3 combined with the robust capabilities of D3.js. Our components are tailor-made for easy integration into your Vue3 projects, ensuring a smooth development experience.</li>
        <li><strong>Highly Customizable</strong>: Each graph is built with customization in mind. Whether you need to tweak the aesthetics or adjust the data presentation, our components offer extensive options to match your unique requirements.</li>
        <li><strong>Performance Optimized</strong>: Experience the speed and efficiency of Vue3, enhanced with the precision of D3.js. Our components are optimized for performance, ensuring your visualizations are not just visually appealing but also lightning fast.</li>
        <li><strong>Responsive and Interactive</strong>: Engage your audience with interactive graphs that adapt to different screen sizes. Our responsive design ensures that your data looks great on any device.</li>
        <li><strong>Comprehensive Documentation</strong>: Jumpstart your project with our detailed documentation and examples. Whether you're a novice or a seasoned developer, our guides will help you harness the full potential of our components.</li>
      </ul>
      
      <h2>Get Started Today!</h2>
      <p>Elevate your data visualization game with [Your Package Name]. Whether it's for dashboards, reports, or analytics, our Vue3 and D3.js components are the perfect tools to transform your data into compelling stories. Install our package now and begin your journey into the realm of beautiful, interactive data visualization!</p>
    </div>
  </div>
</template>

<script>
import settings from "@/assets/icons/settings_noun_project.svg";
import widget from "@/assets/icons/widget_noun_project.svg";
import { ref } from "vue";
import MultiLine from "@/components/playground/MultiLine.vue";
import TheTreemap from "@/components/playground/TheTreemap.vue";
import { line1, line2 } from "@/data/dummyMultiLine";

export default {
  components: { MultiLine, TheTreemap },
  setup() {
    const transformLineData = (lineData) => {
      return lineData.map((dataPoint) => ({
        x: dataPoint.Date,
        y: dataPoint.Normalized_Close, // Assuming you want the Close value || Close || Open
      }));
    };

    const chartData = ref([
      {
        color: "#061826",
        values: transformLineData(line1),
      },
      {
        color: "#F7567C",
        values: transformLineData(line2),
      },
    ]);

    const treeData = ref({
      name: "root",
      children: [
        {
          name: "A",
          children: [
            { name: "A1", value: 5 },
            { name: "A2", value: 3 },
            { name: "A3", value: 2 },
          ],
        },
        {
          name: "B",
          children: [
            { name: "B1", value: 7 },
            { name: "B2", value: 5 },
            { name: "B3", value: 8 },
          ],
        },
        {
          name: "C",
          children: [
            { name: "C1", value: 6 },
            { name: "C2", value: 4 },
            { name: "C3", value: 5 },
          ],
        },
        {
          name: "D",
          children: [
            { name: "D1", value: 9 },
            { name: "D2", value: 6 },
            { name: "D3", value: 5 },
          ],
        },
      ],
    });

    return { settings, widget, chartData, treeData };
  },
};
</script>

<style lang="scss" scoped></style>

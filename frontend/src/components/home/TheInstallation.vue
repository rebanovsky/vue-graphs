<template>
  <section class="home-section w-[800px] gridlines flex gap-[12px]">
    <div class="h-[36px] flex items-start">
      <div
        class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
      >
        #
      </div>
    </div>
    <div class="flex flex-col gap-[40px] w-[600px]">
      <h1>
        {{ installing.title }}
      </h1>

      <!-- Installing -->
      <div class="subsection">
        <h2>
          {{ installing.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ installing.content }}
        </div>
        <div class="w-[100%] flex justify-center">
          <CodeBlock :code="npmInstall" freeform />
        </div>
      </div>

      <!-- Importing -->
      <div class="subsection">
        <h2>
          {{ importing.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ importing.content }}
        </div>
        <div class="w-[100%] flex justify-center">
          <CodeBlock :code="vgImport" />
        </div>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ importing.content2 }}
        </div>
      </div>

      <!-- Usage -->
      <div class="subsection">
        <h2>
          {{ usage.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ usage.content }}
        </div>
        <div class="w-[100%] flex justify-center">
          <CodeBlock :code="vgUsage" />
        </div>
      </div>

      <!-- Customization -->
      <div class="subsection">
        <h2>
          {{ customization.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ customization.content }}
        </div>
        <div class="w-[100%] flex justify-center">
          <CodeBlock :code="vgCustomization" />
        </div>
      </div>

      <!-- Responsiveness -->
      <div class="subsection">
        <h2>
          {{ responsiveness.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ responsiveness.content }}
        </div>
      </div>

      <!-- Interactivity -->
      <div class="subsection">
        <h2>
          {{ interactivity.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ interactivity.content }}
        </div>
      </div>

      <!-- Updating -->
      <div class="subsection">
        <h2>
          {{ updating.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ updating.content }}
        </div>
      </div>

      <!-- Documentation -->
      <div class="subsection">
        <h2>
          {{ docs.subtitle }}
        </h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          {{ docs.content }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import CodeBlock from "@/components/common/CodeBlock.vue";

// Texts
const installing = {
  id: 1,
  title: "Setup and Installation",
  subtitle: "Installing the Library",
  content: `Quickly integrate the VueGraphs Library into your project with a simple npm install vue-graphs command.`,
};

const importing = {
  subtitle: "Importing Components",
  content:
    "After installation, you can import individual chart components into your Vue components. For example, to use a line chart, import the LineChart component like this:",
  content2:
    "You can do the same for other types of charts (e.g., BarChart, PieChart, DoughnutChart) provided by the library.",
};

const usage = {
  subtitle: "Using Components in Your Templates",
  content:
    "Once imported, you can use these components in your template. Here’s an example of how to include a line chart:",
  content2:
    "You can do the same for other types of charts (e.g., BarChart, PieChart, DoughnutChart) provided by the library.",
};

const customization = {
  subtitle: "Customizing Charts",
  content:
    "Each chart component comes with its own set of props for customization. You can control aspects like dimensions, colors, data points, legends, tooltips, and more. Here’s an example of customizing a bar chart:",
  content2:
    "You can do the same for other types of charts (e.g., BarChart, PieChart, DoughnutChart) provided by the library.",
};

const responsiveness = {
  subtitle: "Responsive Design",
  content:
    "The charts are designed to be responsive. However, you can further control their responsiveness through props or by using CSS to manage the chart's container dimensions.",
};

const interactivity = {
  subtitle: "Interactivity Features",
  content:
    "VueGraphs support interactive features like tooltips and clickable elements, enhancing the data visualization experience. The exact interactivity options depend on the chart type.",
};

const updating = {
  subtitle: "Updating Data",
  content:
    "To update a chart, simply change its data prop. The chart will automatically react to the new data and update accordingly.",
};

const docs = {
  subtitle: "Documentation",
  content:
    "For detailed documentation on each chart type, their props, and customization options, please refer to the specific documentation section for each chart type in the library.",
};

// Codeblocks
const placeholder = "SCRIPT_TAG_PLACEHOLDER"; // helper

const npmInstall = `npm install vue-graphs`;
const vgImport = `import { LineChart } from 'vue-graphs';`;
const vgUsage = computed(() =>
  `<template>
  <LineChart :data="chartData" />
</template>

<script setup>
import { ref } from 'vue';
import { LineChart } from 'vue-graphs';

const chartData = ref();
</${placeholder}>`.replace(new RegExp(placeholder, "g"), "script")
);

const vgCustomization = computed(() =>
  `<template>
  <BarChart 
    :data="barData" 
    :width="500" 
    :height="300" 
  />
</template>

<script setup>
import { ref } from 'vue';
import { BarChart } from 'vue-graphs';

const barData = ref([
  {
    entity: "AAPL",
    data: [
      { x: "Q1 2023", y: 9000 },
      { x: "Q2 2023", y: 11000 },
      { x: "Q3 2023", y: 10500 },
      { x: "Q4 2023", y: 12000 },
    ],
  },
]);
</${placeholder}>`.replace(new RegExp(placeholder, "g"), "script")
);
</script>

<style lang="scss" scoped>
.subsection {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

<template>
  <section class="contact-support-section w-[800px] flex gap-[12px] gridlines">
    <div class="h-[36px] flex items-start">
      <div
        class="hash text-harlequin-500 text-[24px] cursor-pointer flex items-center justify-center h-[24px] opacity-0 hover:opacity-[1] transition ease"
      >
        #
      </div>
    </div>
    <div class="flex flex-col gap-[40px] w-[600px]">
      <h1>Contact & Support</h1>

      <!-- Reporting Bugs -->
      <div class="subsection">
        <h2>Bugs Reporting</h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          Report bugs or issues on a
          <a href="https://github.com/rebanovsky/vue-graphs/issues" target="_blank"
            >GitHub Issues page</a
          >.
        </div>
      </div>

      <!-- Feature Suggestions -->
      <div class="subsection">
        <h2>Feature Suggestions</h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          Share your suggestions in the
          <a
            href="https://github.com/rebanovsky/vue-graphs/discussions/1"
            target="_blank"
            >GitHub Discussions</a
          >.
        </div>
      </div>

      <!-- Contributing -->
      <div class="subsection">
        <h2>Contributing to the Project</h2>
        <div class="home-paragraph text-800 font-light text-[14px] leading-7">
          Contribute via
          <a href="https://github.com/rebanovsky/vue-graphs/pulls" target="_blank"
            >Pull Requests on GitHub</a
          >. 
          <!-- Read contribution guidelines first. -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import any necessary components or libraries
import CodeBlock from "@/components/common/CodeBlock.vue";

// Define text content as variables or use computed properties
const contactInfo = `For any queries, reach out to us at support@[yourdomain].com`;
const bugReportInfo = `Report bugs on a <a href="https://github.com/vuegraphs/issues">GitHub Issues</a>`;
const featureSuggestionInfo = `Send suggestions to feedback@[yourdomain].com or discuss on <a href="https://github.com/vuegraphs/discussions">GitHub Discussions</a>`;
const contributionInfo = `Contribute via <a href="https://github.com/vuegraphs/pulls">Pull Requests on GitHub</a>. Ensure to read the contribution guidelines.`;
</script>

<style>
.subsection {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

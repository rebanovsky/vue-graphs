<template>
  <div class="w-[100vw] bg-slate-100">
    <div class="lander-wrapper">
      <TheNavbar />
      <div class="lander-content overflow-y-auto h-[100vh]">
        <div class="view-1 hero-wrapper flex justify-center py-[60px]">
          <div
            class="hero-content flex flex-col h-[auto] max-w-[1200px] gridlines rounded-[20px] p-[28px]"
          >
            <div class="rounded-[20px] relative pt-[40px]">
              <div
                class="flex border-[0px] gap-[60px] w-[100%] h-[100%] p-[40px] h-[600px] rounded-b-[24px] rounded-tr-[24px]"
              >
                <div
                  class="hero-text-wrapper w-[520px] flex flex-col gap-[12px]"
                >
                  <div class="main-hero-text">
                    <div
                      class="hero-main text-[36px] leading-snug cursor-default"
                    >
                      AI-powered <br />
                      Financial Analysis for <br />
                      Empowered Investments
                    </div>
                    <div
                      class="hero-submain mt-[12px] cursor-default leading-relaxed text-[14px]"
                    >
                      InsiderHive leverages AI for in-depth financial analysis,
                      offering intuitive data visualization and convenient
                      download for further analysis or modeling.
                    </div>
                  </div>
                  <div class="main-cta flex flex-start">
                    <div
                      class="cta-text border-[1px] border-dashed border-harlequin-300 rounded-[20px] p-[8px] text-[14px] font-medium cursor-pointer"
                      @click="signup"
                    >
                      Become an insider
                    </div>
                  </div>
                </div>
                <div
                  class="hero-animation w-[420px] h-[320px] gridlines text-slate-500 rounded-[24px] flex items-center justify-center"
                >
                  HERO ANIMATION/IMAGE
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="view-2 h-[auto] flex justify-center py-[60px]">
          <div
            class="lander-bulletpoints p-[28px] flex max-w-[1200px] flex-col items-center gap-[200px] bottom-[20px] w-[100%]"
          >
            <div
              v-for="pointWrapper in pointWrappers"
              :key="pointWrapper.id"
              class="point-wrapper flex gap-[100px]"
            >
              <div
                v-for="pointBox in pointWrapper.boxes"
                :key="pointBox.title"
                :class="`point-box w-[${pointBox.width}] p-[${pointBox.padding}] h-[auto] gridlines flex gap-[32px] flex-col rounded-[20px]`"
              >
                <div v-if="pointBox.title" class="box-title text-[28px]">
                  {{ pointBox.title }}
                </div>
                <div
                  v-if="pointBox.texts"
                  class="box-text flex flex-col gap-[28px] text-[14px]"
                >
                  <div
                    v-for="text in pointBox.texts"
                    :key="text.header"
                    class="flex flex-col gap-[12px]"
                  >
                    <div class="font-medium">{{ text.header }}</div>
                    <div>{{ text.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="view-3 bg-slate-200 h-[1000px]">
          <ThePlans />
        </div>
        <div
          class="footer flex font-light justify-center p-[40px] bg-slate-900 text-slate-200 h-[310px]"
        >
          <TheFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import TheChatbot from "@/components/lander/TheChatbot.vue";
import TheFooter from "@/views/lander/TheFooter.vue";
import TheNavbar from "@/views/lander/TheNavbar.vue";
import ThePlans from "@/views/lander/ThePlans.vue";

export default {
  components: {
    TheFooter,
    TheNavbar,
    ThePlans,
  },

  setup() {
    const pointWrappers = [
      {
        id: 1,
        boxes: [
          {
            width: "480px",
            padding: "40px",
            title: "AI-Driven Investment Ideas",
            texts: [
              {
                header: "Tailored Recommendations:",
                description:
                  "Receive personalized investment ideas aligning with the prevailing economic and financial conditions of a country or a company.",
              },
              {
                header: "Strategic Insights:",
                description:
                  "Leverage AI-powered insights to identify lucrative investment opportunities and optimize your portfolio for maximum returns.",
              },
            ],
          },
          {
            width: "320px",
            padding: "20px",
            bg: "bg-slate-900",
          },
        ],
      },
      {
        id: 2,
        boxes: [
          {
            width: "320px",
            padding: "20px",
          },
          {
            width: "480px",
            padding: "20px",
            title: "Customizable Data Export",
            texts: [
              {
                header: "User-Centric Design:",
                description:
                  "Generate CSV, XLSX or JSON files based on your specific needs, whether it’s detailed data about a company or time-series data for a country.",
              },
              {
                header: "Efficient Data Retrieval:",
                description:
                  "Obtain the precise information you desire swiftly and efficiently, enabling you to make informed decisions promptly.",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        boxes: [
          {
            width: "480px",
            padding: "20px",
            title: "Personalized Feeds",
            texts: [
              {
                header: "Curated Content:",
                description:
                  "Receive a feed of financial news, analyses, and insights personalized to your interests and investment preferences.",
              },
              {
                header: "Stay Informed:",
                description:
                  "Keep abreast of the latest market trends, economic developments, and investment opportunities with regularly updated content.",
              },
            ],
          },
          {
            width: "320px",
            padding: "20px",
          },
        ],
      },
      {
        id: 4,
        boxes: [
          {
            width: "320px",
            padding: "20px",
          },
          {
            width: "480px",
            padding: "20px",
            title: "Intuitive Data Visualization",
            texts: [
              {
                header: "Insightful Graphs:",
                description:
                  "Understand complex financial data effortlessly with clear and concise visual representations.",
              },
              {
                header: "In-Depth Analysis:",
                description:
                  "Dive deep into the financial metrics with interactive charts and graphs, enabling you to analyze data at a granular level.",
              },
            ],
          },
        ],
      },
    ];

    return { pointWrappers };
  },
};
</script>

<style scoped>
.lander-content {
  overflow-y: scroll;
}

.graph-box {
  height: 200px;
  width: 200px;
  border-radius: 12px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0; /* Make boxes invisible by default */
}
</style>

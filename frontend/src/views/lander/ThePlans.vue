<template>
  <div
    class="the-plans flex flex-col gap-[40px] w-[100vw] justify-center items-center h-[100%]"
  >
    <div class="monthly-annual-toggle flex gap-[8px] text-[12px]">
      <div class="monthly-toggler border-[1px] border-slate-500 px-[8px] py-[2px] cursor-pointer hover:bg-slate-500 hover:text-slate-100  rounded">Monthly</div>
      <div class="annual-toggler border-[1px] border-slate-500 px-[8px] py-[2px] cursor-pointer hover:bg-slate-500 hover:text-slate-100  rounded">Annual</div>
    </div>
    <div class="flex gap-[32px]">
      <div
        class="the-plan border-[1px] cursor-pointer bg-slate-100 border-slate-300 h-[auto] transition ease hover:shadow-boxsh hover:scale-[1.0125] w-[360px] p-[20px] flex flex-col gap-[32px] text-[12px] rounded-[12px]"
        v-for="(plan, index) in plans"
        :key="index"
      >
        <div class="plan-title text-[18px] font-medium">{{ plan.name }}</div>
        <div class="flex flex-col gap-[16px]">
          <div v-for="point in plan.points" class="flex flex-col gap-[6px]">
            <div class="point-title font-medium">{{ point.title }}</div>
            <div class="point-text">{{ point.text }}</div>
          </div>
          <div
            class="divider pt-[20px] border-b-[0px] border-slate-400 flex-1 plan-title text-[16px] font-normal"
          ></div>
          <div class="plan-price-wrapper w-[100%] flex justify-end">
            <div class="plan-price text-[28px] font-medium">{{ plan.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const plans = [
      {
        name: "Explorer",
        points: [
          {
            title: "Core Financial Data",
            text: "Explore limited financial data to kickstart your investment journey.",
          },
          {
            title: "Create Watchlists",
            text: "Organize your investment interests and monitor them effortlessly.",
          },
          {
            title: "5 AI Prompts/Month",
            text: "Get a taste of intelligent investing with limited AI-driven prompts.",
          },
          {
            title: "Personalized Feeds",
            text: "Stay informed with news and insights tailored to your interests.",
          },
          {
            title: "Community Support",
            text: "Join discussions, ask questions, and share your knowledge with other investors.",
          },
        ],
        price: "Free"
      },
      {
        name: "Strategist",
        points: [
          {
            title: "All Explorer Benefits",
            text: "Enjoy all the features and benefits available in the Explorer plan.",
          },
          {
            title: "Advanced Data Export",
            text: "Download data in CSV, XLSX, or JSON formats for deeper analysis.",
          },
          {
            title: "Generate Custom Datasets",
            text: "Tailor datasets to your specific needs and research focus.",
          },
          {
            title: "100 AI Prompts/Month",
            text: "Dive deeper into intelligent investing with an increased number of AI prompts.",
          },
          {
            title: "Priority Support",
            text: "Get your queries and issues resolved swiftly by our dedicated support team.",
          },
        ],
        price: "29$"
      },
      {
        name: "Visionary",
        points: [
          {
            title: "All Strategist Benefits",
            text: "Leverage all the features and benefits available in the Strategist plan.",
          },
          {
            title: "Unlimited AI Prompts",
            text: "Unlock the full potential of AI with unlimited prompts for nuanced financial insights.",
          },
          {
            title: "Excel Add-On",
            text: "Integrate seamlessly with Excel for efficient data analysis and decision-making.",
          },
          {
            title: "API Access",
            text: "Connect to our powerful API for automated data retrieval and advanced integrations.",
          },
          {
            title: "Early Access to New Features",
            text: "Be the first to explore and benefit from our latest innovations.",
          },
        ],
        price: "59$"
      },
    ];

    return { plans };
  },
};
</script>

<style lang="scss" scoped></style>

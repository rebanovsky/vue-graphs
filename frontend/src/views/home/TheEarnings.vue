<template>
  <div
    class="playground-component w-[100%] flex justify-between gridlines rounded-[14px] gridlines"
    style="height: calc(100vh - 162px)"
  >
    <div class="playground w-full overflow-y-auto">
      <div class="boxes flex gap-[40px] flex-wrap p-[32px]">
        <div
          class="box-test h-[auto] w-[400px] shadow-boxshlight gridlines rounded-[12px] flex flex-col gap-[4px] p-[12px]"
          v-for="(i, index) in subjects"
          :key="index"
        >
          <div class="box-title text-[14px] font-medium">{{ i.title }}</div>
          <div
            class="box-content gridlines p-[12px] rounded h-[100%] flex flex-col text-[12px] gap-[16px]"
          >
            <div
              v-for="(p, index) in i.content"
              :key="index"
              class="flex flex-col gap-[4px]"
            >
              <div class="point font-medium">{{ p.point }}</div>
              <div class="description text-slate-400">{{ p.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    const subjects = ref([
      {
        title: "Earnings Calendar",
        content: [
          {
            description:
              "A calendar of upcoming earnings reports, which can be filtered by date, sector, or market cap.",
          },
          {
            description:
              "Ability to set reminders for the earnings release of companies that users follow.",
          },
        ],
      },
      {
        title: "Earnings Reports",
        content: [
          {
            description:
              "Summaries of the latest earnings reports from companies, highlighting key metrics like EPS (Earnings Per Share), revenue, profit/loss, and guidance.",
          },
          {
            description:
              "Year-over-Year (YoY) and Quarter-over-Quarter (QoQ) comparisons.",
          },
        ],
      },
      {
        title: "Earnings Calls",
        content: [
          {
            description:
              "Schedule of upcoming earnings calls with access to live streams or recordings.",
          },
          {
            description: "Transcripts of earnings calls for investors to read.",
          },
        ],
      },
      {
        title: "Earnings Analysis",
        content: [
          {
            description:
              "Expert analysis and investor opinion pieces on earnings results.",
          },
          {
            description: "Performance of stocks post-earnings release.",
          },
        ],
      },
      {
        title: "Historical Earnings Data",
        content: [
          {
            description:
              "Historical earnings performance of companies for trend analysis.",
          },
          {
            description: "Graphs showing historical EPS beats or misses.",
          },
        ],
      },
      {
        title: "Consensus Estimates",
        content: [
          {
            description:
              "Analyst estimates for upcoming earnings to compare with actual earnings results.",
          },
          {
            description:
              "The degree of surprise when companies beat or miss these estimates.",
          },
        ],
      },
      {
        title: "Guidance and Forward-Looking Statements",
        content: [
          {
            description:
              "Companies' financial guidance for future quarters or years.",
          },
          {
            description:
              "Analysis of how realistic the guidance is based on market conditions.",
          },
        ],
      },
      {
        title: "Dividend Information",
        content: [
          {
            description:
              "Announcements of dividend payouts and changes to dividend policies.",
          },
          {
            description: "Historical dividend yield data.",
          },
        ],
      },
      {
        title: "Sector & Industry Performance",
        content: [
          {
            description:
              "Earnings trends within specific sectors or industries.",
          },
          {
            description:
              "Comparisons of company earnings against industry averages.",
          },
        ],
      },
      {
        title: "Earnings Quality",
        content: [
          {
            description:
              "Analysis of the quality of earnings, including non-GAAP vs. GAAP comparisons, one-time items, and accounting irregularities.",
          },
        ],
      },
    ]);

    return { subjects };
  },
};
</script>

<style lang="scss" scoped></style>

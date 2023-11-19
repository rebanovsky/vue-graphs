<template>
  <div
    class="w-[100%] flex rounded"
    style="height: calc(100vh - 220px)"
  >
    <Transition name="fade" mode="out-in">
      <div class="region-overview w-[100%] h-[100%] flex flex-col gap-[8px]">
        <div class="region-overview flex flex-1 gap-[8px] h-[100%]">
          <div
            class="region-content-main gridlines h-[100%] flex-grow p-[8px]"
          >
            <div
              class="overview-gdp border-[1px] flex border-slate-300 rounded-[20px] h-[420px] items-center justify-center"
            >
              <BarChart :data="randomData" />
            </div>
          </div>
          <div
            class="region-content-right h-[100%] text-[12px] flex flex-col gap-[12px] overflow-y-auto w-[400px] gridlines p-[8px] text-[14px]"
          >
            <div v-for="group in indicators" :key="group.category">
              <h3 class="my-2 border-b-[1px] border-slate-300">
                {{ group.category }}
              </h3>
              <div
                class="cursor-pointer hover:bg-slate-50 p-[12px] rounded-[2px]"
                v-for="i in group.items"
                :key="i.name"
              >
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import TheCard from "@/components/common/TheCard.vue";
import TheGraph from "@/components/common/graphs/TheGraph.vue";
import TheHeader from "@/components/common/details/TheHeader.vue";
import BarChart from "@/components/common/graphs/BarChart.vue";

export default {
  components: { TheCard, TheGraph, TheHeader, BarChart },
  setup() {
    const randomData = [
      { x: 2000, y: 1203 },
      { x: 2001, y: 1302 },
      { x: 2002, y: 1505 },
      { x: 2003, y: 1687 },
      { x: 2004, y: 1850 },
      { x: 2005, y: 2100 },
      { x: 2006, y: 2305 },
      { x: 2007, y: 2487 },
      { x: 2008, y: 2700 },
      { x: 2009, y: 2905 },
      { x: 2010, y: 3120 },
      { x: 2011, y: 3300 },
      { x: 2012, y: 3525 },
      { x: 2013, y: 3720 },
      { x: 2014, y: 3905 },
      { x: 2015, y: 4120 },
      { x: 2016, y: 4300 },
      { x: 2017, y: 4505 },
      { x: 2018, y: 4750 },
      { x: 2019, y: 4950 },
      { x: 2020, y: 5120 },
      { x: 2021, y: 5350 },
      { x: 2022, y: 5505 },
      { x: 2023, y: 5720 },
    ];

    const indicators = [
      {
        category: "Economic",
        items: [
          { name: "Gross Domestic Product (GDP)" },
          { name: "Unemployment Rate" },
          { name: "Inflation Rate" },
          { name: "Ease of Doing Business Rank" },
          { name: "Total External Debt" },
          { name: "Foreign Direct Investment (FDI) Inflow" },
          { name: "Trade Balance" },
          { name: "Average Wage" },
          { name: "Average Cost of Living" },
          { name: "Research & Development (R&D) Expenditure as % of GDP" },
          { name: "Military Expenditure as % of GDP" },
        ],
      },
      {
        category: "Demographic",
        items: [
          { name: "Population" },
          { name: "Life Expectancy" },
          { name: "Infant Mortality Rate" },
          { name: "Net Primary School Enrollment Rate" },
          { name: "Languages Spoken" },
          { name: "Major Religions" },
        ],
      },
      {
        category: "Social",
        items: [
          { name: "Literacy Rate" },
          { name: "Internet Penetration Rate" },
          { name: "Mobile Phone Subscriptions per 100 people" },
          { name: "Healthcare Expenditure as % of GDP" },
          { name: "Poverty Rate" },
          { name: "Gender Equality Index" },
          { name: "Income Inequality (e.g., Gini Coefficient)" },
          { name: "Number of Hospitals per 100,000 people" },
          { name: "Tourist Arrivals" },
          { name: "Cultural Heritage Sites (e.g., UNESCO sites)" },
        ],
      },
      {
        category: "Environmental",
        items: [
          { name: "Renewable Energy Consumption %" },
          { name: "Carbon Dioxide Emissions per Capita" },
          { name: "Number of Endemic Species" },
          { name: "Forest Cover as % of Land Area" },
          { name: "Natural Disaster Risk Index" },
        ],
      },
      {
        category: "Political",
        items: [
          { name: "Corruption Perceptions Index" },
          { name: "Human Development Index (HDI)" },
          { name: "Press Freedom Index" },
          { name: "Political Stability Index" },
          { name: "Crime Rate" },
        ],
      },
    ];

    return { randomData, indicators };
  },
};
</script>

<style lang="scss" scoped></style>

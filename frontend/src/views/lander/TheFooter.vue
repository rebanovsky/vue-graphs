<template>
  <div class="row flex gap-[200px]">
    <div
      v-for="section in footerSections"
      :key="section.title"
      class="col-md-4 flex flex-col gap-[16px]"
    >
      <h5>{{ section.title }}</h5>
      <ul class="list-unstyled text-[12px] flex flex-col gap-[8px]">
        <li v-for="item in section.items" :key="item.name">
          <a :href="item.path">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const footerSections = [
      {
        title: "Indicators",
        items: [
          { name: "Homepage", path: "" },
          { name: "Countries", path: "" },
          { name: "Indicators", path: "" },
          { name: "Calendar", path: "" },
          { name: "Forecasts", path: "" },
          { name: "Ratings", path: "" },
        ],
      },
      {
        title: "Solutions",
        items: [
          { name: "Data Subscriptions", path: "" },
          { name: "API Access", path: "" },
          { name: "Excel Add-In", path: "" },
          { name: "Developer Account", path: "" },
          { name: "Documentation", path: "" },
          { name: "Pricing", path: "" },
        ],
      },
      {
        title: "About Us",
        items: [
          { name: "Customers", path: "" },
          { name: "Careers", path: "" },
          { name: "Investors", path: "" },
          { name: "Advertisers", path: "" },
          { name: "About us", path: "" },
          { name: "Privacy", path: "" },
        ],
      },
    ];
    return { footerSections };
  },
};
</script>

<style lang="scss" scoped>
a:hover {
  text-decoration: underline;
}
</style>

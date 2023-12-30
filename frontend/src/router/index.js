import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/TheHome.vue"),
        props: true,
      },
      {
        path: "linechart",
        name: "linechart",
        props: true,
        component: () => import("@/views/graphs/line/LineChart.vue"),
      },
      {
        path: "multiline",
        name: "multiline",
        component: () => import("@/views/graphs/line/TheMultiline.vue"),
      },
      {
        path: "candlestick",
        name: "candlestick",
        component: () => import("@/views/graphs/line/TheCandlestick.vue"),
      },
      {
        path: "barchart",
        name: "barchart",
        component: () => import("@/views/graphs/bar/TheBarchart.vue"),
      },
      {
        path: "piechart",
        name: "piechart",
        component: () => import("@/views/graphs/pie/ThePiechart.vue"),
      },
      {
        path: "doughnut",
        name: "doughnut",
        component: () => import("@/views/graphs/pie/TheDoughnut.vue"),
      },
      {
        path: "dotplot",
        name: "dotplot",
        component: () => import("@/views/graphs/dot/TheDotplot.vue"),
      },
      {
        path: "bubblechart",
        name: "bubblechart",
        component: () => import("@/views/graphs/bubble/TheBubblechart.vue"),
      },
      {
        path: "heatmap",
        name: "heatmap",
        component: () => import("@/views/graphs/map/TheHeatmap.vue"),
      },
      {
        path: "treemap",
        name: "treemap",
        component: () => import("@/views/graphs/tree/TheTreemap.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: "active transition duration-200 ease",
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "base",
        component: () => import("@/views/TheBase.vue"),
        children: [
          {
            path: "",
            name: "graphs",
            component: () => import("@/views/v-graphs/TheGraphs.vue"),
            children: [
              {
                path: "/",
                name: "home",
                component: () => import("@/views/v-graphs/TheHome.vue"),
              },
              {
                path: "line",
                name: "line",
                children: [
                  {
                    path: "linechart",
                    name: "linechart",
                    component: () =>
                      import("@/views/v-graphs/graphs/line/TheSingleline.vue"),
                  },
                  {
                    path: "multiline",
                    name: "multiline",
                    component: () =>
                      import("@/views/v-graphs/graphs/line/TheMultiline.vue"),
                  },
                  {
                    path: "candlestick",
                    name: "candlestick",
                    component: () =>
                      import("@/views/v-graphs/graphs/line/TheCandlestick.vue"),
                  },
                ],
              },
              {
                path: "bar",
                name: "bar",
                children: [
                  {
                    path: "barchart",
                    name: "barchart",
                    component: () =>
                      import("@/views/v-graphs/graphs/bar/TheBarchart.vue"),
                  },
                ],
              },
              {
                path: "pie",
                name: "pie",
                component: () =>
                  import("@/views/v-graphs/graphs/PieCharts.vue"),
              },
              {
                path: "dot",
                name: "dot",
                component: () =>
                  import("@/views/v-graphs/graphs/DotGraphs.vue"),
              },
              {
                path: "bubble",
                name: "bubble",
                component: () =>
                  import("@/views/v-graphs/graphs/BubbleCharts.vue"),
              },
              {
                path: "heatmap",
                name: "heatmap",
                component: () =>
                  import("@/views/v-graphs/graphs/TheHeatmaps.vue"),
              },
              {
                path: "tree",
                name: "tree",
                component: () =>
                  import("@/views/v-graphs/graphs/TheTreemaps.vue"),
              },
            ],
          },
        ],
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

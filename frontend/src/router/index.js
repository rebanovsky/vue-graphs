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
            component: () => import("@/views/TheGraphs.vue"),
            children: [
              {
                path: "/",
                name: "home",
                component: () => import("@/views/TheHome.vue"),
              },
              {
                path: "line",
                name: "line",
                children: [
                  {
                    path: "linechart",
                    name: "linechart",
                    component: () =>
                      import("@/views/graphs/line/TheSingleline.vue"),
                  },
                  {
                    path: "multiline",
                    name: "multiline",
                    component: () =>
                      import("@/views/graphs/line/TheMultiline.vue"),
                  },
                  {
                    path: "candlestick",
                    name: "candlestick",
                    component: () =>
                      import("@/views/graphs/line/TheCandlestick.vue"),
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
                      import("@/views/graphs/bar/TheBarchart.vue"),
                  },
                ],
              },
              {
                path: "pie",
                name: "pie",
                component: () =>
                  import("@/views/graphs/PieCharts.vue"),
              },
              {
                path: "dot",
                name: "dot",
                component: () =>
                  import("@/views/graphs/DotGraphs.vue"),
              },
              {
                path: "bubble",
                name: "bubble",
                component: () =>
                  import("@/views/graphs/BubbleCharts.vue"),
              },
              {
                path: "heatmap",
                name: "heatmap",
                component: () =>
                  import("@/views/graphs/TheHeatmaps.vue"),
              },
              {
                path: "tree",
                name: "tree",
                component: () =>
                  import("@/views/graphs/TheTreemaps.vue"),
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

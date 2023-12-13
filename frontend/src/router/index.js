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
                  {
                    path: "verbar",
                    name: "verbar",
                    component: () =>
                      import("@/views/graphs/bar/FlippedBar.vue"),
                  },
                ],
              },
              {
                path: "pie",
                name: "pie",
                children: [
                  {
                    path: "piechart",
                    name: "piechart",
                    component: () =>
                      import("@/views/graphs/pie/ThePiechart.vue"),
                  },
                  {
                    path: "doughnut",
                    name: "doughnut",
                    component: () =>
                      import("@/views/graphs/pie/TheDoughnut.vue"),
                  },
                ],
              },
              {
                path: "dot",
                name: "dot",
                children: [
                  {
                    path: "dotplot",
                    name: "dotplot",
                    component: () =>
                      import("@/views/graphs/dot/TheDotplot.vue"),
                  },
                ],
              },
              {
                path: "bubble",
                name: "bubble",
                children: [
                  {
                    path: "bubblechart",
                    name: "bubblechart",
                    component: () =>
                      import("@/views/graphs/bubble/TheBubblechart.vue"),
                  },
                ],
              },
              {
                path: "map",
                name: "map",
                children: [
                  {
                    path: "heatmap",
                    name: "heatmap",
                    component: () =>
                      import("@/views/graphs/map/TheHeatmap.vue"),
                  },
                ],
              },
              {
                path: "tree",
                name: "tree",
                children: [
                  {
                    path: "treemap",
                    name: "treemap",
                    component: () =>
                      import("@/views/graphs/tree/TheTreemap.vue"),
                  },
                ],
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

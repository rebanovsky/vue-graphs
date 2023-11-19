import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [{
        path: "/",
        name: "base",
        component: () => import("@/views/v-graphs/TheBase.vue"),
        children: [
          {
            path: "graphs",
            name: "graphs",
            component: () => import("@/views/v-graphs/TheGraphs.vue"),
          },
          {
            path: "home",
            name: "home",
            component: () => import("@/views/v-graphs/TheHome.vue"),
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

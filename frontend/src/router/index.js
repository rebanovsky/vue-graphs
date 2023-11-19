import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import countries from "@/data/countries";

const routes = [
  {
    path: "/",
    name: "lander",
    component: () => import("@/views/lander/TheLander.vue"),
    meta: { public: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/auth/TheLogin.vue"),
    meta: { public: true },
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/auth/TheSignup.vue"),
    meta: { public: true },
  },
  {
    path: "/app",
    component: () => import("@/layouts/AppLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/TheHome.vue"),
        children: [
          {
            path: "overview",
            name: "home-overview",
            component: () => import("@/views/home/TheOverview.vue"),
          },
          {
            path: "stocks",
            name: "home-stocks",
            component: () => import("@/views/home/stocks/TheStocks.vue"),
            children: [
              {
                path: "stock-quotes",
                name: "stock-quotes",
                component: () => import("@/views/home/stocks/StockQuotes.vue"),
              },
            ],
          },
          {
            path: "options",
            name: "home-options",
            component: () => import("@/views/home/TheOptions.vue"),
          },
          {
            path: "markets",
            name: "home-markets",
            component: () => import("@/views/home/TheMarkets.vue"),
          },
          {
            path: "news",
            name: "home-news",
            component: () => import("@/views/home/TheNews.vue"),
          },
          {
            path: "earnings",
            name: "home-earnings",
            component: () => import("@/views/home/TheEarnings.vue"),
          },
          {
            path: "real-estate",
            name: "home-real-estate",
            component: () => import("@/views/home/TheRealEstate.vue"),
          },
          {
            path: "commodities",
            name: "home-commodities",
            component: () => import("@/views/home/TheCommodities.vue"),
          },
          {
            path: "currencies",
            name: "home-currencies",
            component: () => import("@/views/home/TheCurrencies.vue"),
          },
          {
            path: "etf",
            name: "home-etf",
            component: () => import("@/views/home/TheEtf.vue"),
          },
          {
            path: "bonds",
            name: "home-bonds",
            component: () => import("@/views/home/TheBonds.vue"),
          },
          {
            path: "calendar",
            name: "home-calendar",
            component: () => import("@/views/home/TheCalendar.vue"),
          },
          {
            path: "filings-reports",
            name: "home-reports",
            component: () => import("@/views/home/TheReports.vue"),
          },
        ],
      },
      {
        path: "/dataverse",
        name: "dataverse",
        component: () => import("@/views/dataverse/TheDataverse.vue"),
        children: [
          {
            path: "screener",
            name: "screener",
            component: () => import("@/views/dataverse/TheScreener.vue"),
          },
        ],
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/TheDashboard.vue"),
        children: [
          {
            path: "portfolio",
            name: "portfolio",
            component: () => import("@/views/dashboard/ThePortfolio.vue"),
          },
          {
            path: "watchlist",
            name: "watchlist",
            component: () => import("@/views/dashboard/TheWatchlist.vue"),
          },
        ],
      },
      {
        path: "/playground",
        name: "playground",
        component: () => import("@/views/playground/ThePlayground.vue"),
        children: [
          {
            path: "graphs",
            name: "playground-graphs",
            component: () => import("@/views/playground/TheGraphs.vue"),
          },
          {
            path: "graphs-package",
            name: "playground-graphs-package",
            component: () => import("@/views/playground/GraphsPackage.vue"),
          },
        ],
      },
      {
        path: "/ai",
        name: "ai",
        component: () => import("@/views/ai/TheAi.vue"),
        children: [
          {
            path: "chat",
            name: "ai-chat",
            component: () => import("@/views/ai/TheChat.vue"),
          },
        ],
      },
      {
        path: "/news",
        name: "news",
        component: () => import("@/views/news/TheNews.vue"),
        children: [
          {
            path: "feed",
            name: "news-feed",
            component: () => import("@/views/news/NewsFeed.vue"),
          },
        ],
      },
      {
        path: "/markets",
        name: "markets",
        component: () => import("@/views/TheMarkets.vue"),
        children: [
          {
            path: "stocks",
            name: "stocks",
            component: () => import("@/views/TheStocks.vue"),
          },
          {
            path: "regions",
            name: "regions",
            component: () => import("@/views/TheRegions.vue"),
          },
        ],
      },
      {
        path: "/regions/:region",
        name: "regions-detail",
        component: () => import("@/views/details/region/TheRegion.vue"),
        props: true,
        beforeEnter: (to, from, next) => {
          if (countries.includes(to.params.region)) {
            next();
          } else {
            next("/404");
          }
        },
        children: [
          {
            path: "overview",
            name: "region-overview",
            component: () => import("@/views/details/region/TheOverview.vue"),
          },
          {
            path: "gdp",
            name: "region-gdp",
            component: () => import("@/views/details/region/TheGdp.vue"),
          },
          {
            path: "trade",
            name: "region-trade",
            component: () => import("@/views/details/region/TheTrade.vue"),
          },
          {
            path: "demographics",
            name: "region-demographics",
            component: () =>
              import("@/views/details/region/TheDemographics.vue"),
          },
          {
            path: "geography",
            name: "regiongeography",
            component: () => import("@/views/details/region/TheGeography.vue"),
          },
        ],
      },
      {
        path: "/funds",
        name: "funds",
        component: () => import("@/views/TheFunds.vue"),
        props: true,
      },
      {
        path: "/calendar",
        name: "calendar",
        component: () => import("@/views/TheCalendar.vue"),
      },
      {
        path: "/indicators",
        name: "indicators",
        component: () => import("@/views/TheIndicators.vue"),
      },
      {
        path: "/account",
        name: "account",
        component: () => import("@/views/TheAccount.vue"),
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/TheSettings.vue"),
      },
      {
        path: "/company",
        name: "company-home",
        component: () => import("@/views/TheCompany.vue"),
      },
      {
        path: "/company/:ticker",
        name: "company-details",
        component: () => import("@/views/details/company/TheCompany.vue"),
        props: true,
        children: [
          {
            path: "overview",
            name: "overview",
            component: () => import("@/views/details/company/TheOverview.vue"),
          },
          {
            path: "financials",
            name: "financials",
            component: () =>
              import("@/views/details/company/TheFinancials.vue"),
          },
        ],
      },
      {
        path: "/fund",
        name: "fund-home",
        component: () => import("@/views/TheFund.vue"),
      },
      {
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("@/views/misc/PageNotFound.vue"),
      },
      {
        path: "/toc",
        name: "toc",
        component: () => import("@/views/legal/TheTerms.vue"),
      },
      {
        path: "/disclaimer",
        name: "disclaimer",
        component: () => import("@/views/legal/TheDisclaimer.vue"),
      },
      {
        path: "/privacy-policy",
        name: "privacy-policy",
        component: () => import("@/views/legal/PrivacyPolicy.vue"),
      },
      {
        path: "/glossary",
        name: "glossary",
        component: () => import("@/views/data/GlossaryView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: "active transition duration-200 ease",
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isPublic = to.matched.some((record) => record.meta.public);
  const isLoggedIn = store.state.auth.isAuthenticated;

  if (requiresAuth && !isLoggedIn) {
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }

  if (isLoggedIn && (to.path === "/login" || to.path === "/")) {
    return next({ path: "/app/home" });
  }

  if (isPublic || !requiresAuth) {
    return next();
  }

  next();
});

export default router;

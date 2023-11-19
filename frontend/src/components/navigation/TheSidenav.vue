<template>
  <div
    class="sidenav-wrapper border-[0px] border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 transition ease w-[52px] flex flex-col justify-center items-center"
  >
    <div class="sidenav-navs-wrapper w-[100%] flex flex-col justify-between">
      <div
        class="side-nav-items-wrapper border-[0px] py-[12px] border-slate-300 dark:border-slate-800 rounded-[40px] overflow-y-auto flex flex-col gap-[32px] justify-center"
      >
        <div
          class="sidenav-nav-wrapper w-[100%] h-[36px] justify-center font-normal text-slate-400 dark:text-slate-400 text-[16px]"
          v-for="(item, index) in userSidenavItems"
          :key="index"
        >
          <div
            class="translate-x-[3px] h-[36px] absolute flex items-center border-slate-100"
          >
            <div
              class="flex items-center justify-center transition ease duration-150 mx-[4px] rounded-[12px]"
            >
              <div
                class="sidenav-nav-icon z-[101] text-[16px] cursor-pointer h-[40px] hover:text-slate-700 dark:hover:text-slate-300 w-[40px] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[12px] flex justify-center items-center"
                @click="navigateTo(item.route, item)"
                @mouseover="() => (activeItem.value = item)"
                @mouseleave="() => (activeItem.value = null)"
                :class="{
                  '!text-slate-900 dark:!text-slate-100 bg-slate-50 dark:bg-slate-800':
                    isActiveRoute(item.route),
                }"
              >
                <SvgIcon :name="item.icon" :isActive="isActiveRoute(item.route)" />
              </div>
              <Transition name="fade-left" mode="out-in">
                <div
                  class="sidenav-nav z-[100] text-[12px] font-medium flex w-[100%] items-start text-slate-800 dark:!text-slate-300 absolute translate-x-[62px] cursor-default"
                  v-if="activeItem.value === item"
                >
                  <div
                    class="w-[100px]  tracking-wider flex bg-slate-100 dark:bg-slate-800 shadow-boxsh border-[1px] border-slate-50 w-[auto] rounded-[6px] justify-start py-[6px] px-[10px]"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="divider w-[100%] border-b-[1px] border-slate-300 w-[40px] my-[8px]"
    ></div>
    <div class="sidenav-navs-wrapper w-[100%] flex flex-col justify-between">
      <div
        class="side-nav-items-wrapper border-[0px] py-[12px] border-slate-300 dark:border-slate-800 rounded-[40px] overflow-y-auto flex flex-col gap-[32px] justify-center"
      >
        <div
          class="sidenav-nav-wrapper w-[100%] h-[36px] justify-center font-normal text-slate-400 dark:text-slate-400 text-[16px]"
          v-for="(item, index) in mainSidenavItems"
          :key="index"
        >
          <div
            class="translate-x-[3px] h-[36px] absolute flex items-center border-slate-100"
          >
            <div
              class="flex  items-center justify-center transition ease duration-150 mx-[4px] rounded-[12px]"
            >
              <div
                class="sidenav-nav-icon z-[101] text-[16px] cursor-pointer h-[40px] hover:text-slate-700 dark:hover:text-slate-300 w-[40px] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[12px] flex justify-center items-center"
                @click="navigateTo(item.route, item)"
                @mouseover="() => (activeItem.value = item)"
                @mouseleave="() => (activeItem.value = null)"
                :class="{
                  '!text-slate-900 dark:!text-slate-100 bg-slate-50 dark:bg-slate-800':
                    isActiveRoute(item.route),
                }"
              >
                <SvgIcon :name="item.icon" :isActive="isActiveRoute(item.route)" />
              </div>
              <Transition name="fade-left" mode="out-in">
                <div
                  class="sidenav-nav  text-[12px] font-medium flex w-[100%] items-start text-slate-800 dark:!text-slate-300 absolute translate-x-[62px] cursor-default"
                  v-if="activeItem.value === item"
                >
                  <div
                    class="w-[100px] flex bg-slate-100 tracking-wider dark:bg-slate-800 shadow-boxsh border-[1px] border-slate-50 w-[auto] rounded-[6px] justify-start py-[6px] px-[10px]"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- DELETE IN PRODUCTION -->
    <div
      class="divider w-[100%] border-b-[1px] border-slate-300 w-[40px] my-[8px]"
    ></div>
    <div class="sidenav-navs-wrapper w-[100%] flex flex-col justify-between">
      <div
        class="side-nav-items-wrapper border-[0px] py-[12px] border-slate-300 dark:border-slate-800 rounded-[40px] overflow-y-auto flex flex-col gap-[32px] justify-center"
      >
        <div
          class="sidenav-nav-wrapper w-[100%] h-[36px] justify-center font-normal text-slate-400 dark:text-slate-400 text-[16px]"
          v-for="(item, index) in playgroundSidenavItems"
          :key="index"
        >
          <div
            class="translate-x-[3px] h-[36px] absolute flex items-center border-slate-100"
          >
            <div
              class="flex items-center justify-center transition ease duration-150 mx-[4px] rounded-[12px]"
            >
              <div
                class="sidenav-nav-icon z-[101] text-[16px] cursor-pointer h-[40px] hover:text-slate-700 dark:hover:text-slate-300 w-[40px] hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[12px] flex justify-center items-center"
                @click="navigateTo(item.route, item)"
                @mouseover="() => (activeItem.value = item)"
                @mouseleave="() => (activeItem.value = null)"
                :class="{
                  '!text-slate-900 dark:!text-slate-100 bg-slate-50 dark:bg-slate-800':
                    isActiveRoute(item.route),
                }"
              >
                <SvgIcon :name="item.icon" :isActive="isActiveRoute(item.route)" />
              </div>
              <Transition name="fade-left" mode="out-in">
                <div
                  class="sidenav-nav z-[100] text-[12px] font-medium flex w-[100%] items-start text-slate-800 dark:!text-slate-300 absolute translate-x-[62px] cursor-default"
                  v-if="activeItem.value === item"
                >
                  <div
                    class="w-[100px] flex  tracking-wider bg-slate-100 dark:bg-slate-800 shadow-boxsh border-[1px] border-slate-50 w-[auto] rounded-[6px] justify-start py-[6px] px-[10px]"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import SvgIcon from "@/components/utils/SvgIcon.vue";

const userSidenavItems = reactive([
  { icon: "dashboard", name: "DASHBOARD", route: "/dashboard" },
]);

const mainSidenavItems = reactive([
  { icon: "markets", name: "MARKETS", route: "/home/overview" },
  { icon: "data", name: "DATA", route: "/dataverse/screener" },
  { icon: "ai", name: "AI", route: "/ai/chat" },
  { icon: "calendar", name: "CALENDAR", route: "/calendar" },
]);

const playgroundSidenavItems = reactive([
  { icon: "puzzle", name: "PLAYGROUND", route: "/playground" },
]);

const activeItem = reactive({ value: null });

const router = useRouter();
const currentRoute = useRoute();

const navigateTo = (route) => {
  router.push(route);
};

const isActiveRoute = (route) => {
  const currentParentRoute = currentRoute.path.split("/")[1];
  const itemParentRoute = route.split("/")[1];
  return currentParentRoute === itemParentRoute;
};
</script>

<style scoped>
.submenu {
  list-style: none;
  height: 60px;
}

.slide-item-enter-active {
  transition: all 0.2s ease;
}

.slide-item-leave-active {
  transition: all 0.2s ease;
}

.slide-item-enter-to,
.slide-item-leave-from {
  height: 60px;
  overflow: hidden;
}

.slide-item-enter-from,
.slide-item-leave-to {
  overflow: hidden;
  height: 0;
}

.sidenav-logo {
  padding: 0 8px 0 0;
}

.sidenav-name-group {
  display: flex;
}

.super-nav {
  margin: 0 16px;
}

.dummy-row {
  height: 14px;
}

.nav {
  font-weight: 500;
}

.nav-item-group {
  padding: 4px;
}

.nav-item-title {
  font-size: 12px;
  font-weight: 600;
  cursor: default;
  padding: 5px;
}

.nav-title {
  display: flex;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
}

.expanded-navs {
  position: absolute;
  z-index: 10;
}

.navs-list {
  border-radius: 4px;
  font-size: 10px;
  padding: 8px 2px;
}

.sign-up {
  padding: 0 4px;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
}

.log-in {
  cursor: pointer;
  margin: 0 5px;
}

.navbar-link.active {
  transition: all 150ms ease;
}

.navbar-link {
  width: auto;
  height: auto;
  text-decoration: none;
  font-weight: 500;
  transition: all 60ms ease;
  display: flex;
  justify-content: center;
  font-size: 12px;
  margin: 0 16px;
}

.navbar {
  display: flex;
  justify-content: center;
}

.main-sb-items {
  display: flex;
  align-items: center;
}

.navs-enter-active,
.navs-leave-active {
  transition: all 0.15s ease;
}

.navs-enter-to,
.navs-leave-from {
  height: 52px;
}

.navs-enter-from,
.navs-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.sidenav-nav-wrapper {
  z-index: 9999;
}
</style>

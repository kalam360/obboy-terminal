import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';
import { TABS_ROUTES } from '../mutation-types';

// Don't need to appear in the routing TAB
const whiteList = ['Redirect', 'login'];

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  name: string;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // TAB
};

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes) {
      // The initialization TAB
      this.tabsList = routes;
    },
    addTabs(route): boolean {
      // Add a TAB
      if (whiteList.includes(route.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(route) {
      // Shut down the left side of the
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(0, index);
    },
    closeRightTabs(route) {
      // Shut down the right side of the
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index + 1);
    },
    closeOtherTabs(route) {
      // Close the other
      this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath);
    },
    closeCurrentTab(route) {
      // Close the current page
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // Close all
      this.tabsList = [];
      localStorage.removeItem(TABS_ROUTES);
    },
  },
});

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import RouterGuard from './guard/index';
import allRoutes from './route/index';
import whiteListRoutes from './whiteListRoutes';

const router = createRouter({
  routes: allRoutes as RouteRecordRaw[],
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }), // 刷新时，还原滚动条位置
});

function setup(app: App<Element>) {
  app.use(router);
  RouterGuard.setup(router);
}

function isWhiteList(path: string): boolean {
  return whiteListRoutes.includes(path);
}

const RouterService = {
  router,
  setup,
  isWhiteList,
};

export { router };
export default RouterService;

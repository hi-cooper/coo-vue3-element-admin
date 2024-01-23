import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import allRoutes from './route/index';

const router = createRouter({
  routes: allRoutes as RouteRecordRaw[],
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }), // 刷新时，还原滚动条位置
});

function setup(app: App<Element>) {
  app.use(router);
}

const RouterService = {
  router,
  setup,
};

export { router };
export default RouterService;

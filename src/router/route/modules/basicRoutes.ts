import type { RouteRecordRaw } from 'vue-router';

const DEFAULT_LAYOUT = () => import('@/layouts/default/index.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DEFAULT_LAYOUT,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: DEFAULT_LAYOUT,
    redirect: '/about/index',
    children: [
      {
        path: '/about/index',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
      },
    ],
  },
  {
    path: '/testing',
    component: DEFAULT_LAYOUT,
    redirect: '/testing/index',
    children: [
      {
        path: '/testing/index',
        name: 'testing',
        component: () => import('@/views/testing/index.vue'),
      },
    ],
  },
];
export default routes;

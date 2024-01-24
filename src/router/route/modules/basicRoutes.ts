import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';
import { RoutePathEnum } from '@/router/RoutePathEnum';

const routes: RouteRecordRaw[] = [
  {
    path: RoutePathEnum.LOGIN,
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: DEFAULT_LAYOUT,
    redirect: RoutePathEnum.HOME,
    children: [
      {
        path: RoutePathEnum.HOME,
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
  {
    path: '/_virtual/testing',
    component: DEFAULT_LAYOUT,
    redirect: '/testing',
    children: [
      {
        path: '/testing',
        name: 'testing',
        component: () => import('@/views/testing/index.vue'),
      },
    ],
  },
];
export default routes;

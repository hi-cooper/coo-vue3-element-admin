import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';
import { RoutePathEnum } from '@/router/RoutePathEnum';

const routes: RouteRecordRaw[] = [
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

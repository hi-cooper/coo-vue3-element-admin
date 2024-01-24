import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';

const desensitiveRoutes: RouteRecordRaw[] = [
  {
    path: '/_virtual/component/desensitive/cootext',
    component: DEFAULT_LAYOUT,
    redirect: '/component/desensitive/cootext',
    children: [
      {
        path: '/component/desensitive/cootext',
        component: () => import('@/views/component/desensitive/cootext.vue'),
      },
    ],
  },
  {
    path: '/_virtual/component/desensitive/cooinput',
    component: DEFAULT_LAYOUT,
    redirect: '/component/desensitive/cooinput',
    children: [
      {
        path: '/component/desensitive/cooinput',
        component: () => import('@/views/component/desensitive/cooinput.vue'),
      },
    ],
  },
];

const coodockRoutes: RouteRecordRaw[] = [
  {
    path: '/_virtual/component/coodock',
    component: DEFAULT_LAYOUT,
    redirect: '/component/coodock',
    children: [
      {
        path: '/component/coodock',
        component: () => import('@/views/component/coodock/index.vue'),
      },
    ],
  },
];

const routes: RouteRecordRaw[] = [...desensitiveRoutes, ...coodockRoutes];
export default routes;

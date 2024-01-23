/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RouteRecordRaw } from 'vue-router';
import { router } from '../../RouterService';
import { DEFAULT_LAYOUT } from '../../variables';

const LinkView = import('@/views/demo/link.vue');

// 示例：Route与Menu层级结构完全不同
const routeLinkWithDiffStructRoutes: RouteRecordRaw[] = [
  {
    path: '/demo/routelink/openInBrowserNewTab',
    component: () => LinkView,
    props: {
      message: '内链(Route): 【浏览器】新标签页打开',
    },
  },
  {
    path: '/demo/routelink/openInBrowserCurrentTab',
    component: () => LinkView,
    props: {
      message: '内链(Route): 【浏览器】当前标签页打开',
    },
  },
  {
    path: '/_virtual/demo/routelink/openInSystemNewTab',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/routelink/openInSystemNewTab',
    props: {
      message: '内链(Route): 【系统】新标签页打开',
    },
    children: [
      {
        path: '/demo/routelink/openInSystemNewTab',
        component: () => LinkView,
        props: {
          message: '内链(Route): 【系统】新标签页打开',
        },
      },
    ],
  },
  {
    path: '/_virtual/demo/routelink/openInSystemCurrentTab',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/routelink/openInSystemCurrentTab',
    children: [
      {
        path: '/demo/routelink/openInSystemCurrentTab',
        component: () => LinkView,
        props: {
          message: '内链(Route): 【系统】当前标签页打开',
        },
      },
    ],
  },
];

// 示例：Route与Menu层级结构相同
const externalLinkWithdSameStructRoutesRoutes: RouteRecordRaw[] = [
  {
    path: '/_virtual/demo',
    children: [
      {
        path: '/_virtual/demo/externallink',
        children: [
          {
            path: '/_virtual/demo/externallink',
            children: [
              {
                path: '/demo/externallink/openInBrowserNewTab',
                beforeEnter(to, from, next) {
                  window.open('https://www.bing.com', '_blank');
                },
                component: () => { },
              },
              {
                path: '/demo/externallink/openInBrowserCurrentTab1',
                beforeEnter(to, from, next) {
                  window.open('https://www.bing.com', '_self');
                },
                component: () => { },
              },
              {
                path: '/demo/externallink/openInBrowserCurrentTab2',
                beforeEnter(to, from, next) {
                  window.location.href = 'https://www.bing.com';
                },
                component: () => { },
              },
              {
                path: '/demo/externallink/openInBrowserCurrentTab3',
                beforeEnter(to, from, next) {
                  window.location.replace('https://www.bing.com');
                },
                component: () => { },
              },
            ],
          },
        ],
      },
    ],
  },
];

const tabviewRoute: RouteRecordRaw[] = [
  {
    path: '/_virtual/demo/link/tabviewroute',
    component: DEFAULT_LAYOUT,
    redirect: '/demo/link/tabviewroute',
    children: [
      {
        path: '/demo/link/tabviewroute',
        component: () => LinkView,
        props: {
          message: '标签页内Route',
        },
      },
      {
        path: '/demo/routelink/openInBrowserNewTab2',
        component: () => LinkView,
        props: {
          message: '内链(Route): 【浏览器】新标签页打开',
        },
        beforeEnter(to, from, next) {
          window.open(router.resolve(to).href, '_blank');
        },
      },
    ],
  },
];

const routes: RouteRecordRaw[] = [...routeLinkWithDiffStructRoutes, ...externalLinkWithdSameStructRoutesRoutes, ...tabviewRoute
];
export default routes;

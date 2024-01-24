import { IBreadcrumbMode, type IBreadcrumbRaw } from '@/types/RouterMeta/IBreadcrumb';
import type { RouteRecordRaw } from 'vue-router';
import { DEFAULT_LAYOUT } from '../../variables';

const breadcrumbNodes: IBreadcrumbRaw = {
  id: '21026387389591553',
  title: '节点1',
  child: {
    id: '21026387389591554',
    title: '节点1-1',
    child: {
      id: '21026387389591555',
      title: '节点1-1-1',
    },
  },
};

const breadcrumbRoutes: RouteRecordRaw[] = [
  {
    // RoutemMode
    path: '/_virtual/advancedemo/breadcrumb/routeMode',
    component: DEFAULT_LAYOUT,
    redirect: '/_virtual/advancedemo/breadcrumb/routeMode/1',
    meta: {
      breadcrumb: {
        title: '一级菜单',
      },
    },
    children: [
      {
        path: '/_virtual/advancedemo/breadcrumb/routeMode/1',
        redirect: '/_virtual/advancedemo/breadcrumb/routeMode/1/1',
        meta: {
          breadcrumb: {
            title: '二级菜单',
          },
        },
        children: [
          {
            path: '/_virtual/advancedemo/breadcrumb/routeMode/1/1',
            meta: {
              // 不设置breadcrumb，表示不在Breadcrumb路径上显示
            },
            children: [
              {
                path: '/advancedemo/breadcrumb/routeMode',
                component: () => import('@/views/advancedemo/breadcrumb/RouteMode.vue'),
                meta: {
                  breadcrumb: {
                    mode: IBreadcrumbMode.RouteMode,
                    title: '自定义Breadcrumb：RouteMode',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    // MenuItemMode
    path: '/_virtual/advancedemo/breadcrumb/menuItemMode',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/breadcrumb/menuItemMode',
    children: [
      {
        path: '/advancedemo/breadcrumb/menuItemMode',
        component: () => import('@/views/advancedemo/breadcrumb/MenuItemMode.vue'),
        meta: {
          breadcrumb: {
            mode: IBreadcrumbMode.MenuItemMode,
            title: '自定义Breadcrumb：MenuItemMode',
            menuPath: '/advancedemo/breadcrumb',
            parents: breadcrumbNodes,
          },
        },
      },
    ],
  },
  {
    // FreeMode
    path: '/_virtual/advancedemo/freeMode',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/breadcrumb/freeMode',
    children: [
      {
        path: '/advancedemo/breadcrumb/freeMode',
        component: () => import('@/views/advancedemo/breadcrumb/FreeMode.vue'),
        meta: {
          breadcrumb: {
            mode: IBreadcrumbMode.FreeMode,
            title: '自定义Breadcrumb：FreeMode',
            parents: breadcrumbNodes,
          },
        },
      },
    ],
  },
];

const breadcrumbMenuRoutes: RouteRecordRaw[] = [
  {
    path: '/_virtual/advancedemo/CustomBreadcrumb',
    component: DEFAULT_LAYOUT,
    redirect: '/advancedemo/breadcrumb',
    meta: {
      title: '自定义Breadcrumb',
    },
    children: [
      {
        path: '/advancedemo/breadcrumb',
        component: () => import('@/views/advancedemo/breadcrumb/index.vue'),
      },
    ],
  },
]

const routes: RouteRecordRaw[] = [...breadcrumbRoutes, ...breadcrumbMenuRoutes];

export default routes;

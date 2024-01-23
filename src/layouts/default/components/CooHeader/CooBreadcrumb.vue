<template>
  <ElBreadcrumb>
    <TransitionGroup name="breadcrumb">
      <ElBreadcrumbItem v-for="item in breadcrumbs" :key="item.id">
        <CooLink v-if="item.path" :to="item.path">{{ item.title }}</CooLink>
        <template v-else>
          {{ item.title }}
        </template>
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
import type { IMenuItem } from '../CooSidebar/types';
import CooLink from '@/components/CooLink/index.vue';
import RouterService from '@/router/RouterService';
import menuStore from '@/stores/modules/menuStore';
import { IBreadcrumbMode, type IBreadcrumbMenuItemMode, type IBreadcrumbRaw } from '@/types/RouterMeta/IBreadcrumb';
import { ref, watch, onMounted } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const breadcrumbs = ref<IBreadcrumbRaw[]>([]);

watch(
  () => [RouterService.router.currentRoute.value.path, menuStore.menus],
  (newValue) => {
    breadcrumbs.value = getBreadcrumbs(newValue[0] as string, newValue[1] as IMenuItem[]);
  },
);

onMounted(() => {
  const path = RouterService.router.currentRoute.value.path;
  breadcrumbs.value = getBreadcrumbs(path, menuStore.menus);
});

function getBreadcrumbs(path: string, menus: IMenuItem[]): IBreadcrumbRaw[] {
  const router = RouterService.router.currentRoute.value;
  const meta = router.meta;

  // 未设置自定义Breadcrumb
  if (!meta || !meta.breadcrumb) {
    return buildFromMenu(path, menus);
  }

  let breadcrumbs: IBreadcrumbRaw[] = [];
  switch (meta.breadcrumb.mode) {
    case IBreadcrumbMode.MenuItemMode:
      breadcrumbs = buildFromMenuItemMode(router, meta.breadcrumb.menuPath, menus);
      break;
    case IBreadcrumbMode.RouteMode:
      breadcrumbs = buildFromRouteMode(router);
      break;
    case IBreadcrumbMode.FreeMode:
      breadcrumbs = buildFromFreeMode(router);
      break;
  }
  return breadcrumbs;
}

/**
 * 获取基于menus的Breadcrumbs
 *
 * @param path
 * @param items
 * @returns null-未匹配到；非null-匹配到的Breadcrumb路径
 */
function buildFromMenu(path: string, menus: IMenuItem[]): IBreadcrumbRaw[] {
  for (const item of menus) {
    const matched: IBreadcrumbRaw[] = getMatchedMenuPath(path, item, []);
    if (matched.length > 0) {
      return matched.reverse();
    }
  }
  return [];
}

/**
 * 获取基于Route的Breadcrumbs
 * @param router
 */
function buildFromRouteMode(router: RouteLocationNormalizedLoaded): IBreadcrumbRaw[] {
  const items: IBreadcrumbRaw[] = [];
  router.matched.forEach((item) => {
    if (item.meta && item.meta.breadcrumb && item.meta.breadcrumb.title) {
      items.push({
        id: item.path,
        title: item.meta.breadcrumb.title,
        path: item.path,
      });
    }
  });
  return items;
}

function getMatchedMenuPath(path: string, item: IMenuItem, matchedTree: IBreadcrumbRaw[]): IBreadcrumbRaw[] {
  if (item.path && item.path === path) {
    matchedTree.push({
      id: item.id,
      title: item.title,
      path: item.path,
    });
    return matchedTree;
  }

  if (item.children) {
    for (const it of item.children) {
      const matched = getMatchedMenuPath(path, it, matchedTree);
      if (matched.length > 0) {
        matchedTree.push({
          id: item.id,
          title: item.title,
          path: item.path,
        });
        return matched;
      }
    }
  }

  return [];
}

function buildFromMenuItemMode(router: RouteLocationNormalizedLoaded, menuPath: string, menus: IMenuItem[]): IBreadcrumbRaw[] {
  if (!menuPath) {
    return [];
  }

  let breadcrumbs: IBreadcrumbRaw[] = buildFromMenu(menuPath, menus);
  if (!router.meta || !router.meta.breadcrumb) {
    return breadcrumbs;
  }

  breadcrumbs.push(...buildFromFreeMode(router));
  return breadcrumbs;
}

function buildFromFreeMode(router: RouteLocationNormalizedLoaded): IBreadcrumbRaw[] {
  let breadcrumbs: IBreadcrumbRaw[] = [];
  if (!router.meta || !router.meta.breadcrumb) {
    return breadcrumbs;
  }

  const parents = (router.meta.breadcrumb as IBreadcrumbMenuItemMode).parents;
  breadcrumbs.push(...getParentsNode([], parents));

  if (router.meta.breadcrumb.title) {
    breadcrumbs.push({
      id: router.path,
      title: router.meta.breadcrumb.title,
    });
  }
  return breadcrumbs;
}

function getParentsNode(matchedTree: IBreadcrumbRaw[], item?: IBreadcrumbRaw): IBreadcrumbRaw[] {
  if (!item) {
    return matchedTree;
  }

  matchedTree.push(item);
  return getParentsNode(matchedTree, item.child);
}
</script>

<style lang="scss">
.el-breadcrumb {
  display: flex;
  text-align: center;

  .el-breadcrumb__inner,
  .el-breadcrumb__separator {
    color: var(--el-text-color-placeholder) !important;
  }
}
</style>

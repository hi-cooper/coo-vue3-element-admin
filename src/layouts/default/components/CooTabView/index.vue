<template>
  <div :class="$style.root">
    <ElTabs v-model="tabViewStore.activeTab" type="card" :class="$style['main-tab']" @tab-click="handleClick" @tab-remove="handleRemove">
      <ElTabPane v-for="item in tabViewStore.allTabs" :key="item.path" :name="item.path" :label="item.title" :closable="item.closable"> </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { RoutePathEnum } from '@/router/RoutePathEnum';
import type { IMenuItem } from '../CooSidebar/types';
import type { ITabView } from './types';
import RouterService from '@/router/RouterService';
import menuStore from '@/stores/modules/menuStore';
import tabViewStore from '@/stores/modules/tabViewStore';
import { watch } from 'vue';

watch(
  () => menuStore.menus,
  () => {
    initTabView();
  },
);

function handleClick(tab: TabsPaneContext) {
  tabViewStore.setActiveTab(tab.paneName as string);
}

function handleRemove(name: TabPaneName) {
  tabViewStore.removeTab(name as String);
}

function initTabView(): void {
  const curPath = RouterService.router.currentRoute.value.path;
  const matched = tabViewStore.allTabs.filter((item) => {
    return curPath === item.path;
  });

  if (matched.length > 0) {
    return;
  }

  if (tabViewStore.allTabs.length === 0) {
    const homeTab: ITabView = {
      title: '首页',
      path: RoutePathEnum.HOME,
      closable: false,
    };
    tabViewStore.addTab(homeTab);
  }

  const menu = getMenu(curPath);
  if (null != menu) {
    const currTab = {
      title: menu.title,
      path: menu.path as string,
      closable: menu.tabClosable ?? true,
    };
    tabViewStore.addTab(currTab);
  }
}

function getMenu(path: string): IMenuItem | null {
  let matched = null;
  for (const menu of menuStore.menus) {
    matched = getPathInMenu(path, menu);
    if (null != matched) {
      return matched;
    }
  }

  return null;
}

function getPathInMenu(path: string, menu: IMenuItem): IMenuItem | null {
  if (menu.path && menu.path === path) {
    return menu;
  }

  if (menu.children) {
    let matched = null;
    for (const item of menu.children) {
      matched = getPathInMenu(path, item);
      if (null != matched) {
        return matched;
      }
    }
  }

  return null;
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 2px;
}
.main-tab {
  --el-tabs-header-height: 24px;

  > :global(.el-tabs__header) {
    margin: 0 !important;
    border: 0 none;

    :global(.el-tabs__nav-next),
    :global(.el-tabs__nav-prev) {
      line-height: 30px;
      color: var(--el-text-color-primary);
    }
  }

  :global(.el-tabs__item) {
    border-radius: 6px 6px 0 0;

    &:global(.is-active) {
      color: #ffffff;
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }
}
</style>

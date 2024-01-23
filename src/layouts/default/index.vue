<template>
  <div class="app-wrapper">
    <div v-if="isSmallScreenWidth && isSidebarOpened" id="drawer-bg" class="drawer-bg" @click="appStore.toggleSidebar"></div>

    <div
      id="sidebar-wrapper"
      class="sidebar-wrapper"
      :class="{
        'sidebar-wrapper-opened': !isSmallScreenWidth && isSidebarOpened,
        'sidebar-wrapper-closed': !isSmallScreenWidth && !isSidebarOpened,
        'sidebar-wrapper-small-show': isSmallScreenWidth && isSidebarOpened,
        'full-content-sidebar-wrapper': !isSmallScreenWidth && isFullContent,
      }"
    >
      <CooSidebar :items="menuStore.menus" />
    </div>
    <div class="main-wrapper">
      <div id="header-wrapper" class="header-wrapper" :class="{ 'full-content-header-wrapper': !isSmallScreenWidth && isFullContent }">
        <CooHeader />
      </div>
      <div id="content-wrapper" class="content-wrapper" :class="{ 'full-content-content-wrapper': !isSmallScreenWidth && isFullContent }">
        <CooAppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CooSidebar from './components/CooSidebar/index.vue';
import type { IMenuItem } from './components/CooSidebar/types';
import CooHeader from './components/CooHeader/index.vue';
import CooAppMain from './components/CooAppMain/index.vue';
import { useWindowSize } from '@vueuse/core';
import appStore from '@/stores/modules/appStore';
import menuStore from '@/stores/modules/menuStore';
import { ScreenWidthType } from '@/types';
import { computed, onMounted, watchEffect } from 'vue';

const isSidebarOpened = computed(() => appStore.sidebar.opened);
const isSmallScreenWidth = computed(() => appStore.screen.widthType === ScreenWidthType.Small);
const isFullContent = computed(() => appStore.isFullContent);

onMounted(() => {
  menuStore.setMenus(menus);
});

watchEffect(() => {
  const smallMaxWidth = 768; // px
  const middleMaxWidth = 1200; // px
  const { width } = useWindowSize();

  if (width.value > middleMaxWidth) {
    appStore.setScreenWidthType(ScreenWidthType.Big);
  } else if (width.value <= smallMaxWidth) {
    appStore.setScreenWidthType(ScreenWidthType.Small);
  } else {
    appStore.setScreenWidthType(ScreenWidthType.Middle);
  }
});
</script>

<script lang="ts">
const menus: IMenuItem[] = [
  {
    id: '16598651166273538',
    title: '首页',
    path: '/dashboard',
    icon: 'menu-language',
    tabClosable: false,
  },
  {
    id: '16598651166273539',
    title: '测试',
    path: '/testing',
    icon: 'menu-language',
  },
  {
    id: '16598651166273540',
    title: '一级菜单A',
    icon: 'menu-dict',
    children: [
      {
        id: '16598651166273541',
        title: '二级菜单A',
        icon: 'menu-dict',
        children: [
          {
            id: '16598651166273542',
            title: '三级菜单A',
            icon: 'menu-dict',
            children: [
              {
                id: '16598651166273543',
                title: '四级菜单A',
                path: '#',
                icon: 'menu-dict',
                browser: true,
                newTab: true,
              },
              {
                id: '16598651166273544',
                title: '四级菜单B',
                path: '#',
                icon: 'menu-dict',
                browser: true,
                newTab: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
html,
body,
.app-wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-wrapper {
  display: flex;

  .sidebar-wrapper {
    overflow: hidden;
    background-color: $layout__sidebar__backgrount_color;
  }

  .main-wrapper {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header-wrapper {
      flex: 0 0 $layout__header_height;
      overflow: hidden;
    }

    .content-wrapper {
      flex: 1 1 auto;
      height: calc(100% - $layout__header_height);
      overflow: hidden;
    }
  }
}
</style>

<style lang="scss" scoped>
/* 大屏 & 中屏（>768px） */
@media (min-width: $screen_width__small) {
  .sidebar-wrapper {
    display: block;
    transition: flex $layout__sidebar__transition_duration;

    &-closed {
      flex: 0 0 $layout__sidebar_width__closed !important;
    }

    &-opened {
      flex: 0 0 $layout__sidebar_width__opened !important;
    }
  }

  .main-wrapper {
    transition: flex $layout__sidebar__transition_duration;
  }

  .full-content {
    &-sidebar-wrapper {
      display: none !important;
    }

    &-header-wrapper {
      display: none !important;
    }

    &-content-wrapper {
      height: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
/* 大屏（>=1200px） */
@media (min-width: $screen_width__big) {
  .sidebar-wrapper {
    flex: 0 0 $layout__sidebar_width__opened;
  }
}
</style>

<style lang="scss" scoped>
/* 中屏（>768px && < 1200px） */
@media (max-width: $screen_width__big) and (min-width: $screen_width__small) {
  .sidebar-wrapper {
    flex: 0 0 $layout__sidebar_width__closed;
  }
}
</style>

<style lang="scss" scoped>
/* 小屏（<768px） */
@media (max-width: $screen_width__small) {
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    max-width: 0;
    transition: max-width $layout__sidebar__transition_duration;

    &-small-show {
      max-width: 80% !important;
    }
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.3;
    display: block;
  }
}
</style>

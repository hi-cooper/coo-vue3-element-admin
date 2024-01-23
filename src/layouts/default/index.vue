<template>
  <div class="app-wrapper">
    <!-- 手机设备侧边栏打开遮罩层 -->
    <div id="drawer-bg" class="drawer-bg" @click="toggleSidebar"></div>

    <div id="sidebar-wrapper" class="sidebar-wrapper">
      <CooSidebar :items="menus" />
    </div>
    <div class="main-wrapper">
      <div id="header-wrapper" class="header-wrapper">
        <div>
          <button v-if="appStore.screen.widthType !== ScreenWidthType.Small && appStore.sidebar.opened" @click="toggleSidebar">&lt;&lt;</button>
          <button v-else @click="toggle">&gt;&gt;</button>
        </div>
        <button @click="toggle">全屏</button>
        &nbsp;&nbsp;&nbsp;&nbsp;头像
      </div>
      <div id="content-wrapper" class="content-wrapper">
        <CooAppMain />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMenuItem } from './components/CooSidebar/types';
import CooSidebar from './components/CooSidebar/index.vue';
import appStore from '@/stores/modules/appStore';
import { ScreenWidthType } from '@/types';
import CooAppMain from './components/CooAppMain/index.vue';
import { useFullscreen } from '@vueuse/core';

const smallMaxWidth = 768; // px
const middleMaxWidth = 1200; // px
const sidebarShortWidth = 54; // px
const { toggle } = useFullscreen();

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-big-hide');
  } else if (width <= smallMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.toggle('sidebar-wrapper-small-show');
    drawerBg?.classList.toggle('drawer-bg-small-show');
  } else {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-middle-show');
  }

  appStore.toggleSidebar();
}

window.addEventListener('resize', () => {
  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Big);
    appStore.openSidebar();
  } else if (width <= smallMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Small);
    appStore.closeSidebar();
  } else {
    appStore.changeScreenWidthType(ScreenWidthType.Middle);
    appStore.closeSidebar();
  }

  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  sidebar?.classList.remove('sidebar-wrapper-big-hide');
  sidebar?.classList.remove('sidebar-wrapper-small-show');
  sidebar?.classList.remove('sidebar-wrapper-middle-show');
  drawerBg?.classList.remove('drawer-bg-small-show');
});
</script>

<script lang="ts">
const menus: IMenuItem[] = [
  {
    id: '16598651166273538',
    title: '首页',
    path: '/',
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

<style scoped>
/* @media (min-width: 768px)
        @media (min-width: 992px)
        @media (min-width: 1200px)
        @media (max-width: 767px) */
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-wrapper {
  display: flex;
  height: 100%;
}

.sidebar-wrapper {
  flex: 0 0 210px;
  display: block;
  overflow: auto;
  background: lightblue;
}

.main-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

.header-wrapper {
  flex: 0 0 50px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  background: lightgreen;
}

.content-wrapper {
  flex: 1 1 auto;
  height: calc(100% - 50px);
  background: lightpink;
  overflow: auto;
}
</style>

<style scoped>
/* 大屏 & 中屏（>768px） */
@media (min-width: 768px) {
  .sidebar-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .header-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .content-wrapper-full-content {
    height: 100%;
  }
}
</style>

<style scoped>
/* all: 大屏（>=1200px） */
@media (min-width: 1200px) {
  .sidebar-wrapper-big-hide {
    /*display: none;*/
    flex: 0 0 54px;
    display: block;
  }
}
</style>

<style scoped>
/* 中屏（>768px && < 1200px） */
@media (max-width: 1200px) and (min-width: 768px) {
  .sidebar-wrapper {
    flex: 0 0 54px;
    display: block;
    overflow: hidden;
  }

  .sidebar-wrapper-middle-show {
    flex: 0 0 210px;
    display: block;
  }
}
</style>

<style scoped>
/* all: 小屏（<768px） */
@media (max-width: 768px) {
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    display: none;
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    display: none;
  }

  #sidebar-wrapper.sidebar-wrapper-small-show,
  #drawer-bg.drawer-bg-small-show {
    display: block;
  }
}
</style>

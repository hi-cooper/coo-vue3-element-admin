<template>
  <div :class="$style.root">
    <div :class="$style['header-title']">
      <div :class="$style['hamburger-wrapper']" @click="appStore.toggleSidebar">
        <CooSvgIcon name="layouts-hamburger" :size="svgSize" :class="[{ [$style['is-active']]: appStore.sidebar.opened }, $style['hamburger']]" />
      </div>
      <CooBreadcrumb v-if="appStore.screen.widthType !== ScreenWidthType.Small" />
    </div>
    <div :class="$style['header-action']">
      <span @click="toggle">
        <CooSvgIcon v-if="isFullscreen" name="layouts-fullscreen_disable" :size="svgSize" />
        <CooSvgIcon v-else name="layouts-fullscreen_enable" :size="svgSize" />
      </span>
      <span>
        <ElDropdown @command="handleCommand" style="display: flex; justify-content: left">
          <span style="display: flex; align-items: center">
            <CooSvgIcon name="layouts-user" :size="svgSize" />
            <span style="padding-left: 3px">
              Hello, Cooper<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
          </span>
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem command="a">个人中心</ElDropdownItem>
              <ElDropdownItem command="cmdLogout" divided>注销</ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </span>
      <span> <CooSvgIcon name="layouts-settings" size="1em" /> </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import CooBreadcrumb from './CooBreadcrumb.vue';
import appStore from '@/stores/modules/appStore';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';
import { ScreenWidthType } from '@/types';

const { isFullscreen, toggle } = useFullscreen();

const svgSize = '1.2em';
const handleCommand = (command: string | number | object) => {
  switch (command) {
    case 'cmdLogout':
      logout();
      break;
  }
};

function logout() {
  // userStore.logout();
  // RouterService.router.push(RoutePathEnum.LOGIN);
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eeeeee;

  .header-title {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    height: 100%;

    .hamburger-wrapper {
      display: flex;
      align-items: center;
      padding: 1px 10px 0;
      height: 100%;
      cursor: pointer;

      &:hover {
        background-color: $hover-background-color;
      }

      .hamburger {
        width: 20px;
        height: 20px;
        vertical-align: -4px;

        &.is-active {
          transform: rotate(180deg);
        }
      }
    }
  }

  .header-action {
    flex: 0 0 fit-content;
    display: flex;
    align-items: center;
    justify-content: right;
    height: 100%;

    > span {
      padding: 0px 10px;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background-color: $hover-background-color;
      }

      .el-dropdown {
        height: 100%;

        *:focus-visible {
          outline: none;
        }
      }
    }
  }
}
</style>

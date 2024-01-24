<template>
  <ElLink class="coo-link" :type="type" :underline="underline" :disabled="disabled" @click="handleClick">
    <slot />
  </ElLink>
</template>

<script lang="ts" setup>
import type { ITabView } from '@/layouts/default/components/CooTabView/types';
import RouterService from '@/router/RouterService';
import appStore from '@/stores/modules/appStore';
import tabViewStore from '@/stores/modules/tabViewStore';
import { ScreenWidthType } from '@/types';
import DomUtil from '@/utils/basic/DomUtil';

const props = defineProps({
  type: {
    type: String,
    required: false,
    values: ['primary', 'success', 'warning', 'info', 'danger', 'default'],
    default: 'primary',
  },
  to: {
    type: String,
    required: true,
  },

  browser: {
    type: Boolean,
    required: false,
    default: false,
  },

  newTab: {
    type: Boolean,
    required: false,
    default: true,
  },

  tabTitle: {
    type: String,
    required: false,
  },

  tabClosable: {
    type: Boolean,
    required: false,
    default: true,
  },

  underline: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

function handleClick() {
  if (DomUtil.isExternal(props.to)) {
    if (props.newTab) {
      externalLinkHandler.openInBrowserNewTab();
    } else {
      externalLinkHandler.openInBrowserCurrentTab();
    }
  } else {
    if (props.browser) {
      if (props.newTab) {
        routeLinkHandler.openInBrowserNewTab();
      } else {
        routeLinkHandler.openInBrowserCurrentTab();
      }
    } else {
      if (props.newTab) {
        routeLinkHandler.openInSystemNewTab();
      } else {
        routeLinkHandler.openInSystemCurrentTab();
      }
    }
  }

  if (appStore.screen.widthType === ScreenWidthType.Small) {
    appStore.closeSidebar();
  }
}

const externalLinkHandler = {
  openInBrowserNewTab: () => {
    window.open(props.to, '_blank');
  },

  openInBrowserCurrentTab: () => {
    window.open(props.to, '_self');
  },
  // // 不支持
  // openInSystemNewTab: () => {},
  // // 不支持
  // openInSystemCurrentTab: () => {},
};

const routeLinkHandler = {
  openInBrowserNewTab: () => {
    window.open(RouterService.router.resolve(props.to).href, '_blank');
  },

  openInBrowserCurrentTab: () => {
    window.open(RouterService.router.resolve(props.to).href, '_self');
  },

  openInSystemNewTab: () => {
    const tab: ITabView = {
      title: props.tabTitle ?? props.to,
      path: props.to,
      closable: props.tabClosable,
    };
    tabViewStore.addTab(tab);
  },

  openInSystemCurrentTab: () => {
    const tab: ITabView = {
      title: props.tabTitle ?? props.to,
      path: props.to,
      closable: props.tabClosable,
    };
    tabViewStore.openInCurrentTab(tab);
  },
};
</script>

<style lang="scss" scoped></style>

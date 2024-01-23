<template>
  <ElScrollbar>
    <ElMenu :default-active="currRoute.path" :unique-opened="false" :collapse="!appStore.sidebar.opened" mode="vertical">
      <CooSidebarItem v-for="item in items" :key="item.id" :item="item" />
    </ElMenu>
  </ElScrollbar>
</template>

<script setup lang="ts">
import CooSidebarItem from './CooSidebarItem.vue';
import appStore from '@/stores/modules/appStore';
import { ref, type PropType } from 'vue';
import type { IMenuItem } from './types';
import RouterService from '@/router/RouterService';

defineProps({
  items: {
    type: Object as PropType<IMenuItem[]>,
    required: true,
  },
});

const currRoute = ref(RouterService.router.currentRoute);
</script>

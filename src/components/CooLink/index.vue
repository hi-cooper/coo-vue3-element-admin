<template>
  <a v-if="DomUtil.isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import type { ITabView } from '@/layouts/default/components/CooTabView/types';
import tabViewStore from '@/stores/modules/tabViewStore';
import DomUtil from '@/utils/basic/DomUtil';
import { useRouter } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },

  tabTitle: {
    type: String,
    required: false,
  },
});

const router = useRouter();
function push() {
  const tab: ITabView = {
    title: props.tabTitle ?? props.to,
    path: props.to,
    closable: true,
  };
  tabViewStore.addTab(tab);
}
</script>

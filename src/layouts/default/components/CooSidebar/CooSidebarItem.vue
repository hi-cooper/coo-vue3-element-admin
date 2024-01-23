<template>
  <template v-if="!hasChild(item)">
    <CooLink v-if="item.visiable ?? true" :to="item.path ?? '#'">
      <ElMenuItem :index="item.path" :disabled="item.disabled ?? false">
        <CooSvgIcon v-if="item.icon" :name="item.icon" :color="sidebarTextcolor" />
        <template #title>
          {{ item.title }}
        </template>
      </ElMenuItem>
    </CooLink>
  </template>

  <ElSubMenu v-else :index="item.id" teleported :disabled="item.disabled ?? false">
    <template #title>
      <CooSvgIcon v-if="item.icon" :name="item.icon" :color="sidebarTextcolor" />
      <span v-if="item.title">{{ item.title }}</span>
    </template>

    <CooSidebarItem v-for="child in item.children" :key="child.id" :item="child" />
  </ElSubMenu>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IMenuItem } from './types';
import CooLink from '@/components/CooLink/index.vue';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    required: true,
  },
});

const sidebarTextcolor = '#b7bdc3';

/**
 * 判断当前菜单是否包含可显示的子菜单
 *
 * @param item 当前菜单
 */
function hasChild(item: IMenuItem) {
  const effectives = item.children?.filter((item: any) => {
    return item.visiable ?? true;
  });

  if (null == effectives || effectives.length === 0) {
    return false;
  }

  return true;
}
</script>

<style scoped>
.coo-svg-icon {
  margin-right: 8px;
}

.coo-link {
  display: block;
}

.coo-link :deep(.el-link__inner) {
  display: block !important;
}
</style>

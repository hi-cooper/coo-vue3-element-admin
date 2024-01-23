<template>
  <template v-if="!hasChild(item)">
    <CooLink
      v-if="item.visiable ?? true"
      :to="item.path ?? '#'"
      :browser="item.browser ?? false"
      :new-tab="item.newTab ?? true"
      :tab-title="item.title"
      :tab-closable="item.tabClosable ?? true"
      :disabled="item.disabled ?? false"
    >
      <ElMenuItem :index="item.path" :disabled="item.disabled ?? false">
        <CooSvgIcon v-if="item.icon" :name="item.icon" :color="scss.sidebarTextcolor" />
        <template #title>
          {{ item.title }}
        </template>
      </ElMenuItem>
    </CooLink>
  </template>

  <ElSubMenu v-else :index="item.id" teleported :disabled="item.disabled ?? false">
    <template #title>
      <CooSvgIcon v-if="item.icon" :name="item.icon" :color="scss.sidebarTextcolor" />
      <span v-if="item.title">{{ item.title }}</span>
    </template>

    <CooSidebarItem v-for="child in item.children" :key="child.id" :item="child" />
  </ElSubMenu>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IMenuItem } from './types';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';
import CooLink from '@/components/CooLink/index.vue';
import scss from '@/layouts/scss/variables.module.scss';

defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    required: true,
  },
});

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

<style lang="scss" scoped>
.coo-svg-icon {
  margin-right: 8px;
}

.coo-link {
  display: block;

  :deep(.el-link__inner) {
    display: block !important;
  }
}
</style>

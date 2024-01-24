<template>
  <div :class="$style.root">
    <div :class="$style['tabview-wrapper']">
      <div :class="$style['tabview-title']">
        <CooTabView :class="$style['tabview-content']" />
      </div>
      <div :class="$style['tabview-action']">
        <div v-if="appStore.screen.widthType !== ScreenWidthType.Small" @click="appStore.toggleFullContent">
          <CooSvgIcon v-if="isFullContent" name="layouts-fullcontent_enable" />
          <CooSvgIcon v-if="!isFullContent" name="layouts-fullcontent_disable" />
        </div>
      </div>
    </div>
    <div :class="$style['view-container']">
      <ElScrollbar>
        <RouterView v-slot="{ Component, route }">
          <KeepAlive :include="tabViewStore.allTabs.map((i) => i.path)">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </RouterView>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import CooTabView from '@/layouts/default/components/CooTabView/index.vue';
import appStore from '@/stores/modules/appStore';
import tabViewStore from '@/stores/modules/tabViewStore';
import { computed } from 'vue';
import { ScreenWidthType } from '@/types';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

const isFullContent = computed(() => appStore.isFullContent);
</script>

<style lang="scss" scoped></style>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .tabview-wrapper {
    flex: 0 0 auto;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-between;

    .tabview-title {
      flex: 1 1 auto;
      overflow: hidden;
    }

    .tabview-action {
      flex: 0 0 fit-content;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;

      div {
        padding: 0px 10px;
        border-left: 1px solid #eeeeee;

        &:hover {
          background-color: $hover-background-color;
        }
      }
    }
  }

  .view-container {
    flex: 1 1 auto;
    background-color: $layout__maincontent__backgrount_color;
    overflow: hidden;

    > :global(.el-scrollbar) {
      > :global(.el-scrollbar__wrap) {
        > :global(.el-scrollbar__view) {
          margin: 10px;
          padding: 6px;
          background-color: $content__backgrount_color;
        }
      }
    }
  }
}
</style>

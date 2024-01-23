<template>
  <div :class="$style.root">
    <div :class="$style['tabview-wrapper']">
      <div :class="$style['tabview-title']">
        <CooTabView :class="$style['tabview-content']" />
      </div>
      <div :class="$style['tabview-action']"><button @click="toggleFullContent">全屏</button><br /></div>
    </div>
    <div :class="$style['view-container']">
      <ElScrollbar>
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="tabViewStore.allTabs.map((i) => i.path)">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import CooTabView from '@/layouts/default/components/CooTabView/index.vue';
import tabViewStore from '@/stores/modules/tabViewStore';

function toggleFullContent() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var header = document.getElementById('header-wrapper');
  var content = document.getElementById('content-wrapper');
  sidebar?.classList.toggle('sidebar-wrapper-full-content');
  header?.classList.toggle('header-wrapper-full-content');
  content?.classList.toggle('content-wrapper-full-content');
}
</script>

<style scoped></style>

<style module>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.root .tabview-wrapper {
  flex: 0 0 auto;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

.root .tabview-wrapper .tabview-title {
  flex: 1 1 auto;
  overflow: hidden;
}

.root .tabview-wrapper .tabview-action {
  flex: 0 0 fit-content;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.root .tabview-wrapper .tabview-action div {
  padding: 0px 10px;
  border-left: 1px solid #eeeeee;
}

.root .tabview-wrapper .tabview-action div:hover {
  background-color: #f6f6f6;
}

.root .view-container {
  flex: 1 1 auto;
  background-color: #f2f3f5;
  overflow: hidden;
}

.root .view-container > :global(.el-scrollbar) > :global(.el-scrollbar__wrap) > :global(.el-scrollbar__view) {
  margin: 10px;
  padding: 6px;
  background-color: #ffffff;
}
</style>

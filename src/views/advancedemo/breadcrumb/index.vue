<template>
  <h1>Breadcrumb生成方式</h1>
  <ul>
    <li>（默认）由Sidebar Menu生成</li>
    <li>RouteMode：由Route结构生成</li>
    <li>MenuItemMode：基于Sidebar Menu叶子节点生成</li>
    <li>FreeMode：全自定义生成</li>
  </ul>

  <fieldset>
    <legend>（默认）由Sidebar Menu生成</legend>
    说明：不需要额外配置，请点击Sidebar Menu查看
  </fieldset>

  <fieldset>
    <legend>RouteMode：由Route结构生成</legend>
    说明：由Route的层级结构生成
    <CooLink to="/advancedemo/breadcrumb/routeMode" tab-title="自定义Breadcrumb：RouteMode">打开示例</CooLink>
  </fieldset>

  <fieldset>
    <legend>MenuItemMode：基于Sidebar Menu叶子节点生成</legend>
    说明：<br />
    1、类似FreeMode，可以自定义层级结构；<br />
    2、区别在于，该模型会把层级结构挂载到某一MenuItem叶子节点下，而FreeMode不会；
    <CooLink to="/advancedemo/breadcrumb/menuItemMode" tab-title="自定义Breadcrumb：MenuItemMode">打开示例</CooLink>
  </fieldset>

  <fieldset>
    <legend>FreeMode：全自定义生成</legend>
    说明：完全自定义层级结构
    <CooLink to="/advancedemo/breadcrumb/freeMode" tab-title="自定义Breadcrumb：FreeMode"> 打开示例 </CooLink>
  </fieldset>
</template>

<script setup lang="ts">
import CooLink from '@/components/CooLink/index.vue';
</script>

<style lang="scss" scoped>
.coo-link {
  margin: 8px;
}

legend {
  font-weight: bold;
}

fieldset {
  margin: 20px 0;
}
</style>

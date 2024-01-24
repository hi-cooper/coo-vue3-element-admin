<template>
  <h1>{{ message }}</h1>

  <fieldset>
    <legend>内链(Route)：浏览器标签页</legend>
    <CooLink to="/demo/routelink/openInBrowserNewTab" :browser="true" :new-tab="true">新标签页打开</CooLink>
    <CooLink to="/demo/routelink/openInBrowserCurrentTab" :browser="true" :new-tab="false">当前标签页打开</CooLink>

    <RouterLink to="/demo/routelink/openInBrowserNewTab2">新标签页打开2</RouterLink>
    <RouterLink to="/demo/routelink/openInBrowserCurrentTab">当前标签页打开2</RouterLink>
  </fieldset>

  <fieldset>
    <legend>内链(Route)：系统标签页</legend>
    <CooLink to="/demo/routelink/openInSystemNewTab" :new-tab="true" tab-title="新标签页打开">新标签页打开</CooLink>
    <CooLink to="/demo/routelink/openInSystemCurrentTab" :new-tab="false" tab-title="当前标签页打开">当前标签页打开</CooLink>
  </fieldset>

  <fieldset>
    <legend>外链：浏览器标签页</legend>
    <CooLink to="https://www.bing.com" :browser="true" :new-tab="true">新标签页打开</CooLink>
    <CooLink to="https://www.baidu.com" :browser="true" :new-tab="false">当前标签页打开</CooLink>

    <a href="https://www.bing.com" target="_blank">新标签页打开2</a>
    <a href="https://www.baidu.com" target="_self">当前标签页打开2</a>
  </fieldset>

  <fieldset>
    <legend>外链：系统标签页(不支持)</legend>
    <h3 style="color: red">不支持</h3>
  </fieldset>

  <fieldset>
    <legend>外链：内链(Route)实现-浏览器标签页</legend>
    <CooLink to="/demo/externallink/openInBrowserNewTab" :browser="true" :new-tab="true">新标签页打开</CooLink>
    <RouterLink to="/demo/externallink/openInBrowserNewTab">新标签页打开2</RouterLink>
    <CooLink to="/demo/externallink/openInBrowserCurrentTab1" :browser="true" :new-tab="false">当前标签页打开1</CooLink>
    <CooLink to="/demo/externallink/openInBrowserCurrentTab2" :browser="true" :new-tab="false">当前标签页打开2</CooLink>
    <CooLink to="/demo/externallink/openInBrowserCurrentTab3" :browser="true" :new-tab="false">当前标签页打开3</CooLink>
    <RouterLink to="/demo/externallink/openInBrowserCurrentTab1" :browser="true" :new-tab="false">当前标签页打开4</RouterLink>
    <RouterLink to="/demo/externallink/openInBrowserCurrentTab2" :browser="true" :new-tab="false">当前标签页打开5</RouterLink>
    <RouterLink to="/demo/externallink/openInBrowserCurrentTab3" :browser="true" :new-tab="false">当前标签页打开6</RouterLink>
  </fieldset>

  <fieldset>
    <legend>外链：内链(Route)实现-系统标签页(不支持)</legend>
    <h3 style="color: red">不支持</h3>
  </fieldset>
</template>

<script setup lang="ts">
import CooLink from '@/components/CooLink/index.vue';

defineProps({
  message: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
fieldset {
  margin: 8px 0;

  legend {
    font-weight: bold;
  }

  .coo-link,
  a {
    margin: 8px !important;
  }
}
</style>

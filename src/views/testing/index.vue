<template>
  <button @click="testStoreHandler">Test Store</button>
  <button @click="testHttpApi">Test HttpApi</button>
  <CooSvgIcon name="logo" color="#FF0000" />
  <CooSvgIcon name="menu-dict" color="#FF0000" />
  <CooSvgIcon name="menu-language" color="#FF0000" size="32px" /><!-- 使用logo.svg重命名为language.svg -->
  <CooSvgIcon name="basic-language" color="#FF0000" width="40px" height="64px" />
  <div id="idScss">SCSS</div>
</template>
<script setup lang="ts">
import testStore from './store.vue';
import HttpApi from '@/api/HttpApi';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

function testStoreHandler() {
  testStore();
}

function testHttpApi() {
  HttpApi.test
    .create({
      testId: 1234,
      name: 'Tom',
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<style lang="scss" scoped>
#idScss {
  width: 100%;
  height: 50px;
  background-color: $background-color;
  color: $text-color;
}
</style>

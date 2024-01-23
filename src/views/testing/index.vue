<template>
  <button @click="testStoreHandler">Test Store</button>
  <button @click="testHttpApi">Test HttpApi</button>
</template>
<script setup lang="ts">
import testStore from './store.vue';
import HttpApi from '@/api/HttpApi';

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

<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<script setup lang="ts">
// 关闭浏览器时进行安全登出，但刷新等操作时，也会执行该操作
// window.addEventListener('beforeunload', function () {
//   userStore.logout();
// });
</script>

<style scoped></style>

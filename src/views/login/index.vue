<template>
  <div :class="$style.root">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from './LoginForm.vue';
</script>

<style lang="scss" scoped>
.login-form {
  width: 328px;
  box-shadow: #666 0px 0px 10px;
  border-radius: 18px;
  padding: 20px;
}
</style>

<style lang="scss" module>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $light_backgrount_color_primary;
}
</style>

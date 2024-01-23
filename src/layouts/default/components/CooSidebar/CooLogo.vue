<template>
  <div :class="$style.root">
    <CooSvgIcon name="logo" size="32px" />
    <span v-if="!collapse">Coo Admin</span>
  </div>
</template>

<script setup lang="ts">
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
span {
  font-size: 1.2em;
  margin-left: 4px;
  font-weight: bold;
  color: $layout__sidebar__active_color;
}
</style>

<style lang="scss" module>
.root {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $layout__header_height;
}
</style>

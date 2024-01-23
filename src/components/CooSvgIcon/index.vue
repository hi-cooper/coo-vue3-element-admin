<template>
  <!--优先采用width和height。如果width/height未定义，则采用size-->
  <svg aria-hidden="true" class="coo-svg-icon" :style="'width:' + (width ?? size) + ';height:' + (height ?? size)">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
    default: '#333',
  },
  size: {
    type: String,
    required: false,
    default: '1em',
  },
  width: {
    type: String,
    required: false,
  },
  height: {
    type: String,
    required: false,
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>

<style scoped>
.coo-svg-icon {
  overflow: hidden;
  fill: currentColor;
}
</style>

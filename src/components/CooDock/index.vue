<template>
  <div class="coo-dock" :class="$style.root">
    <div class="coo-dock__title" :class="$style.title">
      <div v-if="showContent" class="title__content">
        <slot name="title" />
      </div>
      <span :class="[$style.title__action, { [$style['title__action_show']]: showContent }, { [$style['title__action_hide']]: !showContent }]" @click="toggleShowContent">
        <el-icon :color="scss.sidebarTextcolor">
          <ArrowDownBold v-if="!showContent" />
          <ArrowUpBold v-else />
        </el-icon>
      </span>
    </div>

    <div class="coo-dock__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import scss from '@/layouts/scss/variables.module.scss';

const showContent = ref(false);

function toggleShowContent(): void {
  showContent.value = !showContent.value;
}
</script>

<style lang="scss" scoped></style>

<style lang="scss" module>
.root {
  .title {
    position: relative;

    .title__action {
      z-index: 1000;
      width: 60px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $layout__maincontent__backgrount_color;
      box-shadow: $dark_backgrount_color_secondary 0px 0px 2px;
      border-radius: 8px;
      position: absolute;
      left: 50%;
      margin-left: -30px;
      cursor: pointer;
    }

    .title__action_show {
      bottom: -8px;
    }

    .title__action_hide {
      top: -12px;
    }
  }
}
</style>

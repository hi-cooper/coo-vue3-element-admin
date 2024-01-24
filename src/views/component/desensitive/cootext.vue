<template>
  <ElForm :model="formObj" label-width="100px">
    <ElDivider content-position="left">示例</ElDivider>
    <ElFormItem label="脱敏前" prop="demoRawData">
      <ElInput type="textarea" v-model="formObj.rawData" :row="4" maxlength="50" show-word-limit />
    </ElFormItem>

    <ElFormItem label="脱敏后">
      <CooText
        :raw="formObj.rawData"
        :replace="formObj.replace"
        :display-mode="formObj.displayMode"
        :display-length="formObj.displayLength"
        :type="formObj.type"
        :mode="formObj.mode"
        :start="formObj.start"
        :end="formObj.end"
        :disabled="!formObj.enabled"
      >
        <template v-slot:prefix>
          <CooSvgIcon v-if="formObj.enabledPrefix" name="menu-dict" />
        </template>
      </CooText>
    </ElFormItem>

    <ElDivider content-position="left">设置</ElDivider>
    <ElFormItem label="启用状态" required>
      <ElSwitch v-model="formObj.enabled" />
    </ElFormItem>
    <ElFormItem label="启用图标" required>
      <ElSwitch v-model="formObj.enabledPrefix" />
    </ElFormItem>

    <template v-if="formObj.enabled">
      <ElFormItem label="替换字符" required>
        <ElInput v-model="formObj.replace" maxlength="1" minlength="1" />
      </ElFormItem>

      <ElFormItem label="显示模式" prop="displayMode" required>
        <ElRadioGroup v-model="formObj.displayMode">
          <ElRadio label="follow-content">跟随内容长度</ElRadio>
          <ElRadio label="fix-length">固定长度</ElRadio>
        </ElRadioGroup>
        <template v-if="formObj.displayMode === 'fix-length'"> <ElInputNumber v-model="formObj.displayLength" :min="1" :max="100" style="margin-left: 8px" />位</template>
      </ElFormItem>

      <ElFormItem label="脱敏类型" prop="type" required>
        <ElRadioGroup v-model="formObj.type">
          <ElRadio label="all">全部脱敏</ElRadio>
          <ElRadio label="part">部分脱敏</ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <ElFormItem v-if="formObj.type === 'part'" label="脱敏模式" prop="mode" required>
        <ElRadioGroup v-model="formObj.mode">
          <ElRadio label="start-end">start-end （隐藏首尾字符。显示中间字符）</ElRadio>
          <ElRadio label="middle">middle（隐藏中间字符，显示首尾字符）</ElRadio>
        </ElRadioGroup>
      </ElFormItem>

      <ElFormItem label="长度" v-if="formObj.type === 'part'">
        <span>start:</span>
        <ElInputNumber v-model="formObj.start" :min="0" :max="100" />位
        <span style="margin-left: 40px">end</span>
        <ElInputNumber v-model="formObj.end" :min="0" :max="100" />位
      </ElFormItem>
    </template>
  </ElForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CooText from '@/components/CooText/index.vue';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

//初始表单数据
let formObj = reactive({
  rawData: '', // 示例：脱敏前

  replace: '*',
  displayMode: 'follow-content',
  displayLength: 10,

  type: 'all',
  mode: 'start-end',
  start: 2,
  end: 2,
  enabled: true,
  enabledPrefix: true,
});
</script>

<style lang="scss" scoped></style>

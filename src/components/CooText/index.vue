<template>
  <span class="coo-text">
    <slot v-if="displayValue.length > 0" name="prefix" />
    <span>{{ displayValue }}</span>
    <CooSvgIcon v-if="!props.disabled && displayValue.length > 0" :name="showRaw ? 'basic-eye_open' : 'basic-eye_close'" @click="toggleEnable" />
  </span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { DisplayMode, DesensitiveType, DesensitiveMode } from './types';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

const props = defineProps({
  /**
   * 原始文本（脱敏前）
   */
  raw: {
    type: String,
    required: true,
  },

  /**
   * 替换字符。
   *
   * 默认值："*"
   */
  replace: {
    type: String,
    required: false,
    default: '*',
  },

  /**
   * 显示模式。可选值["fix-length", "follow-content"]。
   *
   * 默认值："follow-content"
   */
  displayMode: {
    type: String,
    required: false,
    default: DisplayMode.followContent,
    validator(value: string) {
      switch (value) {
        case DisplayMode.fixLength:
        case DisplayMode.followContent:
          return true;
      }
      return false;
    },
  },

  /**
   * 显示长度
   *
   * 当displayMode="fix-length"，需要设置
   */
  displayLength: {
    type: [String, Number],
    required: false,
    default: 10,
  },

  /**
   * 脱敏类型。可选值["all", "part"]。
   *
   * 默认值："all"
   */
  type: {
    type: String,
    required: false,
    default: DesensitiveType.all,
    validator(value: string) {
      switch (value) {
        case DesensitiveType.all:
        case DesensitiveType.part:
          return true;
      }
      return false;
    },
  },

  /**
   * 脱敏模式。可选值["start-end", "middle"]。
   *
   * 默认值："start-end"
   */
  mode: {
    type: String,
    required: false,
    default: DesensitiveMode.startEnd,
    validator(value: string) {
      switch (value) {
        case DesensitiveMode.startEnd:
        case DesensitiveMode.middle:
          return true;
      }
      return false;
    },
  },

  /**
   * 长度（首部）
   *
   * 默认值："2"
   */
  start: {
    type: [String, Number],
    required: false,
    default: 2,
  },

  /**
   * 长度（尾部）
   *
   * 默认值："2"
   */
  end: {
    type: [String, Number],
    required: false,
    default: 2,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const displayValue = ref('');
const showRaw = ref(props.disabled);

watch(
  () => [props.raw, props.replace, props.displayMode, props.displayLength, props.type, props.mode, props.start, props.end, props.disabled],
  () => {
    showRaw.value = props.disabled;
    onInput();
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  onInput();
});

function toggleEnable() {
  showRaw.value = !showRaw.value;
  onInput();
}

function onInput() {
  let result = '';
  if (props.raw.length <= 0) {
    displayValue.value = result;
    return;
  }

  if (props.disabled || showRaw.value) {
    displayValue.value = props.raw;
    return;
  }

  switch (props.displayMode) {
    case DisplayMode.followContent:
      result = fixContent();
      break;
    case DisplayMode.fixLength:
      result = fixLength();
      break;
  }

  displayValue.value = result;
}

function fixLength(): string {
  switch (props.type) {
    case DesensitiveType.all:
      return fixLength_all();
    case DesensitiveType.part:
      return fixLength_part();
  }
  return '';
}

function fixContent(): string {
  switch (props.type) {
    case DesensitiveType.all:
      return fixContent_all();
    case DesensitiveType.part:
      return fixContent_part();
  }
  return '';
}

function fixLength_all(): string {
  return props.replace.repeat(Number(props.displayLength));
}

function fixLength_part(): string {
  const propsDisplayLength = Number(props.displayLength);
  const propsStart = Number(props.start);
  const propsEnd = Number(props.end);

  switch (props.mode) {
    case DesensitiveMode.startEnd:
      // 优先start，不足补*
      if (propsDisplayLength <= props.raw.length) {
        if (propsDisplayLength <= propsStart) {
          return props.replace.repeat(propsDisplayLength);
        } else {
          if (propsDisplayLength <= propsStart + propsEnd) {
            return props.replace.repeat(propsStart).concat(props.raw.substring(propsStart, propsDisplayLength));
          } else {
            return props.replace
              .repeat(propsStart)
              .concat(props.raw.substring(propsStart, propsDisplayLength - propsEnd))
              .concat(props.replace.repeat(propsEnd));
          }
        }
      } else {
        if (propsStart >= props.raw.length) {
          return props.replace.repeat(propsDisplayLength);
        } else {
          return props.replace
            .repeat(propsStart)
            .concat(props.raw.substring(propsStart))
            .concat(props.replace.repeat(propsDisplayLength - props.raw.length));
        }
      }

    case DesensitiveMode.middle:
      // 优先start，不足补*
      if (propsDisplayLength <= props.raw.length) {
        if (propsDisplayLength <= propsStart) {
          return props.raw.substring(0, propsDisplayLength);
        } else {
          if (propsDisplayLength <= propsStart + propsEnd) {
            return props.raw.substring(0, propsStart).concat(props.replace.repeat(propsDisplayLength - propsStart));
          } else {
            return props.raw
              .substring(0, propsStart)
              .concat(props.replace.repeat(propsDisplayLength - propsStart - propsEnd))
              .concat(props.raw.substring(propsDisplayLength - propsEnd, propsDisplayLength));
          }
        }
      } else {
        if (propsStart > props.raw.length) {
          return props.raw.concat(props.replace.repeat(propsDisplayLength - props.raw.length));
        } else {
          return props.raw.substring(0, propsStart).concat(props.replace.repeat(propsDisplayLength - propsStart));
        }
      }
  }

  return '';
}

function fixContent_all(): string {
  return props.raw
    .split('')
    .map(() => {
      return props.replace;
    })
    .join('');
}

function fixContent_part(): string {
  const propsStart = Number(props.start);
  const propsEnd = Number(props.end);

  switch (props.mode) {
    case DesensitiveMode.startEnd:
      if (props.raw.length <= propsStart + propsEnd) {
        return props.replace.repeat(props.raw.length);
      } else {
        return props.replace
          .repeat(propsStart)
          .concat(props.raw.substring(propsStart, props.raw.length - propsEnd))
          .concat(props.replace.repeat(propsEnd));
      }
    case DesensitiveMode.middle:
      if (props.raw.length <= propsStart + propsEnd) {
        return props.raw;
      } else {
        return props.raw
          .substring(0, propsStart)
          .concat(props.replace.repeat(props.raw.length - (propsStart + propsEnd)))
          .concat(props.raw.substring(props.raw.length - propsEnd));
      }
  }

  return '';
}
</script>

<style lang="scss" scoped>
.coo-text {
  display: inline-flex;
  align-items: center;
}

.coo-svg-icon {
  cursor: pointer;
  margin-left: 4px;
}
</style>

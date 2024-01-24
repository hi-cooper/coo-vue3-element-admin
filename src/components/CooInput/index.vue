<template>
  <div class="coo-input" :class="$style.root">
    <div class="el-input el-input--prefix el-input--suffix" :class="$style['content-wrapper']">
      <div class="el-input__wrapper">
        <span v-if="$slots.prefix" class="el-input__prefix">
          <span class="el-input__prefix-inner">
            <slot name="prefix" />
          </span>
        </span>
        <div class="el-input__inner">
          <ElText :class="[isPlaceholder ? 'placeholder' : '', isSelected && !isPlaceholder ? 'el-text-selected' : '']">{{ refDispaly }}</ElText>
        </div>
      </div>
    </div>
    <ElInput
      v-model="refRaw"
      v-bind="attrs"
      :minlength="minlength"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :class="$style.input"
      @input="onInput"
      @click="selectAll($event)"
      @blur="disselectAll()"
      @focus="selectAll($event)"
      clearable
      show-password
    >
      <!-- <template v-slot:suffix>
        <CooSvgIcon v-if="!props.disabled && refRaw && refRaw.length && refRaw.length > 0" :name="showRaw ? 'basic-eye_open' : 'basic-eye_close'" @click="toggleEnable" />
      </template> -->
    </ElInput>
    <div :class="$style['password-visible']">
      <CooSvgIcon v-if="!props.disabled && refRaw && refRaw.length && refRaw.length > 0" :name="showRaw ? 'basic-eye_open' : 'basic-eye_close'" @click="toggleEnable" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, watch, onMounted } from 'vue';
import { DesensitiveType, DesensitiveMode } from '../CooText/types';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

const props = defineProps({
  modelValue: {
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

  minlength: {
    type: [String, Number],
    required: false,
    default: 0,
  },

  maxlength: {
    type: [String, Number],
    required: false,
    default: 10000,
  },

  placeholder: {
    type: String,
    required: false,
    default: '',
  },
});

const refRaw = ref(props.modelValue);
const refDispaly = ref();
const showRaw = ref(props.disabled);
const isPlaceholder = ref(false);
const isSelected = ref(false);

const attrs = useAttrs();
let emits = defineEmits(['update:modelValue']);

watch(
  () => [props.modelValue, props.replace, props.type, props.mode, props.start, props.end, props.disabled],
  () => {
    showRaw.value = props.disabled;
    refRaw.value = props.modelValue;
    update();
  },
  {
    immediate: true,
  },
);

onMounted(() => {
  update();
});

function toggleEnable() {
  showRaw.value = !showRaw.value;
  update();
}

function onInput(value: string) {
  refRaw.value = value;
  update();
}

function update() {
  disselectAll();
  emits('update:modelValue', refRaw.value);

  if (!refRaw.value || refRaw.value.length === 0) {
    refDispaly.value = props.placeholder;
    isPlaceholder.value = true;
    return;
  }

  isPlaceholder.value = false;
  if (props.disabled || showRaw.value) {
    refDispaly.value = refRaw.value;
    return;
  }

  refDispaly.value = fixContent();
}

function selectAll(e: any) {
  e.currentTarget.select();
  isSelected.value = true;
}

function disselectAll() {
  isSelected.value = false;
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

function fixContent_all(): string {
  return refRaw.value
    .split('')
    .map(() => {
      return props.replace;
    })
    .join('');
}

function fixContent_part(): string {
  const start = Number(props.start);
  const end = Number(props.end);

  switch (props.mode) {
    case DesensitiveMode.startEnd:
      if (refRaw.value.length <= start + end) {
        return props.replace.repeat(refRaw.value.length);
      } else {
        return props.replace
          .repeat(start)
          .concat(refRaw.value.substring(start, refRaw.value.length - end))
          .concat(props.replace.repeat(end));
      }
    case DesensitiveMode.middle:
      if (refRaw.value.length <= start + end) {
        return refRaw.value;
      } else {
        return refRaw.value
          .substring(0, start)
          .concat(props.replace.repeat(refRaw.value.length - (start + end)))
          .concat(refRaw.value.substring(refRaw.value.length - end));
      }
  }

  return '';
}
</script>

<script lang="ts">
export default {
  name: 'CooInput',
  inheritAttrs: false,
};
</script>

<style lang="scss" scoped>
.coo-svg-icon {
  cursor: pointer;
}

.placeholder {
  color: var(--el-text-color-placeholder);
}

.el-text-selected {
  background-color: #3165cf;
  color: #ffffff;
}
</style>

<style lang="scss" module>
.root {
  position: relative;
  width: 100%;

  > .content-wrapper {
    position: absolute !important;
    left: 0;
    top: 2px;
  }

  .input {
    :global(.el-input__wrapper) {
      background-color: rgba(0, 0, 0, 0) !important;
    }

    :global(.el-input__inner) {
      opacity: 0;
    }

    :global(.el-input__password) {
      visibility: hidden;
    }
  }

  .password-visible {
    position: absolute !important;
    right: 10px;
    top: 1px;

    display: flex;
    align-items: center;
    height: 100%;
    color: #a8abb2;
    cursor: pointer;
  }
}
</style>

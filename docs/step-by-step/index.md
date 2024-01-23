# Step-by-Step搭建项目
vue3 + element-plus

# 1 环境搭建

见[VSCode前端开发环境搭建](./VSCode前端开发环境搭建.md)

# 2 项目初始化

> see: [How to](../../Howto.md)

```shell
# npm 7+
pnpm create vue@latest
cd coo-vue3-element-admin
pnpm install
pnpm format
pnpm dev
```

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/2_1.svg)

# 3 代码规范ESLint + Prettier

## 3.1 ESLint

- 修改eslint配置文件

```typescript
// /.eslintrc.cjs
// 添加

module.exports = {
    rules: {
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // 关闭any类型警告
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
};
```

- 新建`/.eslintignore`

```ini
# /.eslintignore

node_modules
/public
/docs
/src/assets
/dist
/bin
/build
.idea
.vscode
*.sh
*.md
*.woff
*.ttf
.husky
.local
# /**/*.d.ts
```

## 3.2 Prettier

- 删除`/.prettierrc.json`
- 新增/.prettierrc.cjs

```typescript
// /.prettierrc.cjs

/**
 * 格式化配置
 */
module.exports = {
  useTabs: false, // 是否使用tab
  tabWidth: 2, // 每个tab的空格数
  semi: true, // 语句末尾是否添加分号
  singleQuote: true, // 是否使用单引号
  endOfLine: 'lf', // 换行符样式：\n(lf)|\r\n(crlf)|\r(cr)：<auto|lf|crlf|cr>
  printWidth: 180, // 每行最大字符数
  proseWrap: 'never', // 换行。<always|never|preserve>
  quoteProps: 'as-needed', //// 更改引用对象属性的时间。可选值"<as-needed|consistent|preserve>"
  trailingComma: 'all', // 多行时添加尾随逗号规则：<none|es5|all>，默认none
  bracketSpacing: true, // 是否在对象文字中的括号之间添加空格
  arrowParens: 'always', // 箭头函数参数周围是否包括括号：always: (x) => x \ avoid: x => x
  rangeStart: 0, // 格式化字符偏移量（包括和不包括）
  rangeEnd: Infinity, // 格式化字符偏移量（包括和不包括）
  requirePragma: false, // 指定要使用的解析器，不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier
  htmlWhitespaceSensitivity: 'css', // 指定HTML文件的全局空格敏感度 <css|strict|ignore>
  vueIndentScriptAndStyle: false, // Vue文件脚本和样式标签缩进
};
```

- 新增`/.prettierignore`

```ini
# /.prettierignore

node_modules
/public
/docs
/src/assets
/dist
/bin
/build
.idea
.vscode
*.sh
*.md
*.woff
*.ttf
.husky
.local
# /**/*.d.ts
```

# 4 路由别名

> 使用vue模板创建项目时，已默认安装和配置好`@types/node`，所以可以直接使用

- tsconfig.app.json

```json
// /tsconfig.app.json
// 替换

{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

                        ↓
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- 示例

```typescript
// App.vue
import HelloWorld from './components/HelloWorld.vue';
                        ↓
import HelloWorld from '@/components/HelloWorld.vue';
```

# 5 环境变量

> see：https://cn.vitejs.dev/guide/env-and-mode.html

# 5.1 文件命名格式

```properties
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

## 5.2 配置

- 开发环境：`/.env.dev`

```properties
# /.env.dev
# 新建 
# 开发环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'coo-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:8080/dev'
```

- 生产环境：`/.env.prod`

```properties
# /.env.prod
# 新建 
# 正式环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'coo-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:8080/prod'
```

- 测试环境：`/.env.test`

```properties
# /.env.test
# 新建 
# 测试环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'coo-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:8080/test'
```

## 5.3 IDE自动提示

```typescript
// /env.d.ts
// 添加

// 环境变量类型
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_HTTP_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## 5.4 package.json

```json
// package.json
// 添加

{
    "scripts": {
        "dev": "vite --mode dev",
        "test": "vite --mode test",
        "prod": "vite --mode prod",
        "build-only": "vite build --mode prod",
    }
}
```

## 5.5 环境启动

```shell
pnpm dev      # 开发环境
pnpm test     # 测试环境
pnpm prod     # 正式环境
```

## 5.6 IDE示例

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/5-6_1.svg)

# 6 element-plus

> see: https://element-plus.org/zh-CN/

## 6.1 安装

```shell
pnpm add element-plus
pnpm add @element-plus/icons-vue # element icons
```

## 6.2 配置

- ComponetService.ts

```typescript
// /src/components/ComponetService.ts
// 新建

import type { App } from 'vue';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const ComponetService = {
  setup(app: App) {
    app.use(ElementPlus);

    // element icons
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
export default ComponetService;
```

- 全局注册

```typescript
// /src/main.ts
// 添加

import 'element-plus/theme-chalk/index.css';
import ComponetService from '@/components/ComponetService';

ComponetService.setup(app);
```

## 6.3 示例

```vue
// /src/App.vue
// 添加

<script setup lang="ts">
</script>

<template>
  <el-button type="primary" icon="Edit" circle></el-button>
</template>
```

# 7 状态管理Pinia

> 使用vue模板创建项目时，已默认安装，这里仅进行优化

## 7.1 配置

- StoreService.ts

```typescript
// /src/stores/StoreService.ts
// 新建

import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

function _init(): void {
  // console.log('Store init');
}

const StoreService = {
  setup(app: App<Element>) {
    app.use(store);
    _init();
  },
};

export default StoreService;
export { store };
```

- 全局注册

```typescript
// /src/main.ts
// 替换

import { createPinia } from 'pinia';
app.use(createPinia());
               ↓
import StoreService from '@/stores/StoreService';
StoreService.setup(app);
```

## 7.2 使用规则

在`/src/stores/modules`目录下创建状态管理类，在需要使用的地方import该类进行管理。

## 7.3 示例

以用户状态存储和管理为示例进行说明。

### 7.3.1 在`modules`目录下创建`用户状态管理类userStore.ts`

```typescript
// /src/stores/modules/userStore.ts
// 新建

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { store } from '../StoreService';

const useStore = defineStore('UserStore', () => {
  // state
  const openId = ref<string>('user_open_id');
  const nickname = ref<string>('user_nickname');
  const avatar = ref<string>('user_avatoar');

  // actions
  function updateNickname(val: string) {
    nickname.value = val;
  }

  return {
    openId,
    nickname,
    avatar,
    updateNickname,
  };
});

const userStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { userStoreHook };
```

### 7.3.2 创建测试页面

```vue
// /src/views/testing/index.vue
// 新建

<template>
  <button @click="testStoreHandler">Test Store</button>
</template>
<script setup lang="ts">
import testStore from './store.vue';

function testStoreHandler() {
  testStore();
}
</script>
```

### 7.3.3 引入测试页面

```vue
// /src/views/testing/store.vue
// 添加

<!-- 正确运行 -->
<!-- <template>测试Store</template>
<script setup lang="ts">
function testStore() {
  console.log('\n============================begin test store============================');
  console.log(userStore.nickname);
  userStore.updateNickname('NICK_NAME');
  console.log(userStore.nickname);
  console.log('============================end test store============================');
}

testStore();
</script> -->

<!-- 将文件改成下面代码，正确运行 -->
<!-- <template>测试Store</template>
<script lang="ts">
import { userStoreHook } from '@/store/modules/userStore';

function testStore() {
  console.log('\n============================begin test store============================');
  console.log('without setup', userStoreHook.nickname);
  userStoreHook.updateNickname('NICK_NAME_WITHOUT_SETUP');
  console.log('without setup', userStoreHook.nickname);
  console.log('============================end test store============================');
}
export default testStore;
</script> -->

<!-- 将文件改成下面代码，正确运行， -->
<!-- 因为已在userStore.ts中const userStoreHook = useStore(store);声明在useStore()前。but why? -->
<template>测试Store</template>
<script lang="ts">
import userStore from '@/stores/modules/userStore';

function testStore() {
  console.log('\n============================begin test store============================');
  console.log('store: without setup', userStore.nickname);
  userStore.updateNickname('NICK_NAME_WITHOUT_SETUP');
  console.log('store: without setup', userStore.nickname);
  console.log('============================end test store============================');
}
export default testStore;
</script>
```

### 7.3.4 路由配置

- 路由

```typescript
// /src/router/index.ts
// 添加

const router = createRouter({
    {
      path: '/testing',
      name: 'testing',
      component: () => import('@/views/testing/index.vue'),
    },
  ],
});

```

- App.vue

```vue
// /src/App.vue
// 添加

<RouterLink to="/testing">测试</RouterLink>
```

### 7.3.5 运行结果

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/7-3-5_1.png)


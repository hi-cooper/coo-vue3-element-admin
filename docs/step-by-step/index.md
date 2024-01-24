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

# 8 路由router

> see: https://router.vuejs.org/zh/

## 8.1 优化配置

- 删除`/src/router/index.ts`

- RouterService.ts

```typescript
// /src/router/RouterService.ts
// 新建

import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import allRoutes from './route/index';

const router = createRouter({
  routes: allRoutes as RouteRecordRaw[],
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }), // 刷新时，还原滚动条位置
});

function setup(app: App<Element>) {
  app.use(router);
}

const RouterService = {
  router,
  setup,
};

export { router };
export default RouterService;
```

- /src/routerroute/index.ts

```typescript
// /src/router/route/index.ts
// 新建

import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob<Record<string, unknown>>('./modules/**/*.ts', { eager: true });
const allRoutes: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}; // 仅支持export default
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    allRoutes.push(...modList);
});

export default allRoutes;
```

- 全局注册

```typescript
// /src/main.ts
// 替换

import router from './router';
app.use(router);
               ↓
import RouterService from '@/router/RouterService';
RouterService.setup(app);
```

## 8.2 使用规则

在`/src/router/route/modules`目录下创建路由配置（参见8.3示例）。

## 8.3 示例：将原来`/src/router/index.ts`的配置移至`/src/router/route/modules/basicRoutes.ts`

```typescript
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/testing',
      name: 'testing',
      component: () => import('@/views/testing/index.vue'),
    },
  ],
});

export default router;
```

# 9 axios封装

> see: https://github.com/axios/axios
>
> see: https://blog.cooperzhu.com/you-ya-di-feng-zhuang-axiosyu-apiguan-li/

## 9.1 安装

```shell
pnpm add axios
```

## 9.2 axios封装

- axios封装


```typescript
// /src/api/HttpApi/HttpHelper.ts
// 新建

import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, type ResponseType } from 'axios';

import HttpHandler from './HttpHandler';
import type { IHttpApiResponse } from './types';

const helper = {
  isDownload: function (response: AxiosResponse<IHttpApiResponse<any> | Blob>): boolean {
    return response.data instanceof Blob;
  },

  hasBizError: function (response: AxiosResponse<IHttpApiResponse<any> | Blob>): boolean {
    if (response.data instanceof Blob) {
      return response.data.type === 'application/json';
    }

    return (response.data as IHttpApiResponse<any>)?.code !== 200;
  },

  download: function (response: any, defaultFileName?: string): void {
    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement('a');
    link.href = url;
    link.download = this.getFileName(response, defaultFileName);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  },

  getFileName: function (response: any, defaultFileName?: string) {
    if (defaultFileName) {
      return defaultFileName;
    }

    let fileName = 'download';
    const contentDisposition = response.headers['content-disposition'];
    if (!contentDisposition) {
      return fileName;
    }

    const rfc5987Match = contentDisposition.match(/filename\*=(.*''.+)/); // Rfc5987
    if (rfc5987Match?.length === 2) {
      const tmp = rfc5987Match[1].split("''");
      if (tmp.length === 1) {
        fileName = decodeURI(tmp[0]);
      } else if (tmp.length === 2) {
        fileName = decodeURI(tmp[1]);
      }
    }

    if (!fileName) {
      const match = contentDisposition.match(/filename="(.+)"/); // other
      if (match?.length === 2) {
        fileName = decodeURI(match[1]);
      }
    }

    return fileName;
  },
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_HTTP_API_BASE_URL, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

axiosInstance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    // config.headers.set({
    //   'Content-Type': 'application/json; charset=utf-8',
    // });

    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.set('Authorization', `Bearer ${token}`);
    // }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response: AxiosResponse<IHttpApiResponse<any> | Blob>) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    if (response.status !== 200) {
      return Promise.reject({
        isBizError: false,
        data: response,
      });
    }

    if (!helper.hasBizError(response)) {
      return response;
    }

    if (helper.isDownload(response)) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
          // BizError
          return reject({
            isBizError: true,
            data: fileReader.result,
          });
        };
        fileReader.readAsText(response.data as Blob);
      });
    }

    HttpHandler.handleGlobalBizError(response.data as IHttpApiResponse<any>);
    return Promise.reject({
      isBizError: true,
      data: response.data,
    });
  },
  function (error: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    HttpHandler.handleGlobalHttpStatusError(error.status);
    return Promise.reject({
      isBizError: false,
      data: error.response ?? error,
    });
  },
);

const HttpHelper = {
  get: function <T>(
    url: string,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  post: function <T>(
    url: string,
    data?: any,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  put: function <T>(
    url: string,
    data?: any,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(url, data, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  delete: function <T>(
    url: string,
    options?: {
      config?: AxiosRequestConfig<any>; // request配置
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<IHttpApiResponse<T>> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(url, options?.config)
        .then(function (response: any) {
          resolve(response.data);
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        })
        .finally(function () {
          // always executed
        });
    });
  },

  /**
   * post JSON数据
   *
   * @param url url
   * @param data JSON格式数据
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * @returns
   */
  postJson: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'application/json;charset:utf-8;',
      },
    };

    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * post HTML form作为JSON数据
   * @param url url
   * @param formId form表单的id
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * @returns
   */
  postFormAsJson: function <T>(url: string, formId: string, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'application/json;charset:utf-8;',
      },
    };

    const data = document.querySelector('#' + formId);
    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * 使用post 'Content-Type': 'application/x-www-form-urlencoded'
   *
   * @param url url
   * @param data JSON格式数据
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * @returns
   */
  postUrlencoded: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset:utf-8;',
      },
    };
    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * 使用post 'Content-Type': 'multipart/form-data'
   *
   * @param url url
   * @param data JSON格式数据。包含文件信息<br/>示例
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * {
   *    userId: 1,
   *    avatars: document.querySelector('#fileInput').files
   *  }
   *
   * input示例：
   * <input id="fileInput" type="file" name="avatars" multiple />
   * @returns
   */
  postMultipart: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    return this.post(url, data, {
      config: config,
      isThrow: isThrow,
    });
  },

  /**
   * 上传多个文件（可包含其他数据字段）
   *
   * @param url url
   * @param data JSON格式数据。包含文件信息<br/>示例
   * @param isThrow  是否使用reject(error)外抛错误。默认为false
   * {
   *    userId: 1,
   *    avatars: document.querySelector('#fileInput').files
   *  }
   *
   * input示例：
   * <input id="fileInput" type="file" name="avatars" multiple />
   * @returns
   * @see HttpHelper.postMultipart()
   */
  uploadFiles: function <T>(url: string, data: {}, isThrow?: boolean): Promise<IHttpApiResponse<T>> {
    return this.postMultipart(url, data, isThrow);
  },

  /**
   * 使用GET请求下载
   *
   * @param url url
   * @param options 其他参数
   */
  getDownload: function (
    url: string,
    options?: {
      filename?: string; // 默认文件名
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<void> {
    const config = {
      responseType: 'blob' as ResponseType,
    };

    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, config)
        .then((response: any) => {
          helper.download(response, options?.filename);
          resolve();
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        });
    });
  },

  /**
   * 使用POST请求下载
   *
   * @param url url
   * @param data 请求参数
   * @param options 其他参数
   */
  postDownload: function (
    url: string,
    data: {},
    options?: {
      filename?: string; // 默认文件名
      isThrow?: boolean; // 是否使用reject(error)外抛错误。默认为false
    },
  ): Promise<void> {
    const config = {
      responseType: 'blob' as ResponseType,
    };

    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, data, config)
        .then((response: any) => {
          helper.download(response, options?.filename);
          resolve();
        })
        .catch(function (error: any) {
          if (options?.isThrow) {
            reject(error);
          }
        });
    });
  },
};

export default HttpHelper;
```

- 数据类型

```typescript
// /src/api/HttpApi/types.ts
// 新建

export interface IHttpApiResponse<T> {
  /** 请求的唯一id */
  requestId: string;
  /** 响应编码， 200-成功；非200-业务异常码 */
  code: number;
  /** 提示信息 */
  message: string;
  /** 应答消息体 */
  data?: T;
}

export interface IHttpApiError<T> {
  /** 是否是业务异常 */
  isBizError: boolean;
  /** 错误详细数据 */
  data: any | IHttpApiResponse<T>;
}
```

- 全局错误处理

```typescript
// /src/api/HttpApi/HttpHandler.ts
// 新建

import { ElMessage } from 'element-plus';
import type { IHttpApiResponse } from './types';

const HttpHandler = {
  handleGlobalHttpStatusError: function (status: number): void {
    let message = '未知错误';
    if (status) {
      switch (status) {
        case 400:
          message = '错误的请求';
          break;
        case 401:
          message = '未授权，请重新登录';
          break;
        case 403:
          message = '拒绝访问';
          break;
        case 404:
          message = '请求错误,未找到该资源';
          break;
        case 405:
          message = '请求方法未允许';
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = '服务器端出错';
          break;
        case 501:
          message = '网络未实现';
          break;
        case 502:
          message = '网络错误';
          break;
        case 503:
          message = '服务不可用';
          break;
        case 504:
          message = '网络超时';
          break;
        case 505:
          message = 'http版本不支持该请求';
          break;
        default:
          message = `其他错误 --${status}`;
      }
    } else {
      message = `无法连接到服务器！`;
    }

    console.log(message);
  },

  handleGlobalBizError: function (resp: IHttpApiResponse<any>): void {
    switch (resp.code) {
      case 200:
        break;
      case 30000:
        console.log(`Business Error: ${resp.message}`);
        break;
      default:
        ElMessage.error(`${resp.message}`);
    }
  }
}

export default HttpHandler;
```

## 9.3 模块API

> 以test模块为示例

- API文件

```typescript
// /src/api/HttpApi/modules/test/index.ts
// 新建


import HttpHelper from '../../HttpHelper';
import type { IHttpApiResponse } from '../../types';
import type { TestCreateRequest, TestCreateResponse } from './types';

const Api = {
  v1: {
    create: '/v1/test/create',
  },
};

const test = {
  create: function (params: TestCreateRequest): Promise<IHttpApiResponse<TestCreateResponse>> {
    return HttpHelper.postJson(Api.v1.create, params, true);
  },
};

export default test;
```

- 数据类型

```typescript
// /src/api/modules/test/types.ts
// 新建

export interface TestCreateRequest {
  testId: number;
  name: string;
}
export interface TestCreateResponse {
  message: string;
}
```

## 9.4 统一API export

```typescript
// /src/api/HttpApi/index.ts
// 新建

import test from './modules/test';

const HttpApi = {
  test,
};

export default HttpApi;
```

## 9.5 示例

```vue
// /src/views/testing/index.vue
// 添加

<template>
  <button @click="testHttpApi">Test HttpApi</button>
</template>

<script setup lang="ts">
import HttpApi from '@/api/HttpApi';

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
```

# 10 Mock

> see: http://mockjs.com/

## 10.1 安装

```shell
pnpm add mockjs
```

## 10.2 配置

- /src/mock/index.ts

```typescript
// /src/mock/index.ts
// 新建

import Mock from 'mockjs';
import type { IMockParam } from './types';

const modules = import.meta.glob<Record<string, unknown>>('./modules/**/*.ts', { eager: true });
const allMockApis: IMockParam[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {}; // 仅支持export default
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  allMockApis.push(...modList);
});

// 设置200-600毫秒延时请求数据
Mock.setup({
  timeout: '200-600',
});

for (const api of allMockApis) {
  Mock.mock(new RegExp(api.url), api.method || 'get', api.response);
}
```

- types

```typescript
import type { IHttpApiResponse } from '@/api/HttpApi/types';

export interface IMockParam {
  url: string;
  method: string;
  response<T>(option?: Record<string, unknown>): IHttpApiResponse<T>;
}
```

- env.d.ts

```typescript
// /env.d.ts
// 添加

declare module 'mockjs';
```

## 10.3 创建mock环境

- .env.mock

```properties
# /.env.mock
# 新建 
# mock环境

# 自定义变量，必须以VITE_开头
VITE_APP_TITLE = 'coo-vue3-element-admin'
VITE_HTTP_API_BASE_URL = 'http://localhost:3000/mock'
```

- package.json

```json
// /package.json
// 添加

{
  "scripts": {
    "mock": "vite --mode mock",
  }
}
```

- 根据启动环境加载mock配置

```typescript
// /src/main.ts
// 添加

if (import.meta.env.MODE === 'mock') {
    import('@/mock/index');
}
```

## 10.4 使用规则

在`/src/mock/modules`目录下创建mock配置（参见10.5示例）。

## 10.5 示例

```typescript
// /src/mock/modules/user.ts
// 新建

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IHttpApiResponse } from '@/api/HttpApi/types';
import type { IMockParam } from '../types';

const apis: IMockParam[] = [
  {
    url: '/v1/test/create',
    method: 'post',
    response: function (option?: Record<string, unknown>): IHttpApiResponse<any> {
      return {
        requestId: '1',
        code: 200,
        message: '成功',
        data: {
          userId: 1,
          username: 'Cooper',
        },
      };
    },
  },
];

export default apis;
```

## 10.6 启动

```shell
pnpm mock
```

# 11 自定义SVG组件 (vite-plugin-svg-icons)

> see; https://github.com/vbenjs/vite-plugin-svg-icons

## 11.1 安装

```shell
pnpm add -D vite-plugin-svg-icons
```

## 11.2 配置

- 创建svg文件存放路径：`src/assets/icons`

- vite.config.ts

```typescript
// /vite.config.ts
// 添加

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path'

export default () => {
  return {
    plugins: [
        createSvgIconsPlugin({
          iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // 指定icons路径
          symbolId: 'icon-[dir]-[name]', // symbolId格式
        }),
    ],
  };
};
```

- tsconfig.json

```json
// /tsconfig.json
// 添加

{
  "compilerOptions": {
    "types": ["vite-plugin-svg-icons/client"]
  },
}
```

- 全局注册

```typescript
// /src/main.ts

import 'virtual:svg-icons-register';
```

- 组件声明

```vue
// /src/components/CooSvgIcon/index.vue
// 新建

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
```

## 11.3 示例

- 上传svg至`/src/assets/icons`

![](https://czmdi.cooperzhu.com/technology/vue/vue3-element-plushuan-jing-da-jian-step-by-step/10-3_1.svg)

- 页面引用

```vue
// /src/testing/index.vue
// 添加

<template>
    <CooSvgIcon name="logo" color="#FF0000" />
    <CooSvgIcon name="menu-dict" color="#FF0000" />
    <CooSvgIcon name="menu-language" color="#FF0000" size="32px" /><!-- 使用logo.svg重命名为language.svg -->
    <CooSvgIcon name="basic-language" color="#FF0000" width="40px" height="64px" />
</template>

<script setup lang="ts">
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';
</script>
```

# 12 Layout

## 12.1 基本layout框架

> see: https://blog.cooperzhu.com/css-simple-admin-layout/

- 创建layout文件

```vue
// /src/layouts/default/index.vue
// 添加

<template>
  <div class="app-wrapper">
    <!-- 手机设备侧边栏打开遮罩层 -->
    <div id="drawer-bg" class="drawer-bg" @click="toggleSidebar"></div>

    <div id="sidebar-wrapper" class="sidebar-wrapper">
      sidebar-wrapper

      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/testing">Test</RouterLink></li>
      </ul>
    </div>
    <div class="main-wrapper">
      <div id="header-wrapper" class="header-wrapper">
        <div>
          <button id="btnToggle" @click="toggleSidebar">&lt;&lt;</button>
        </div>
        <div>全屏 &nbsp;&nbsp;&nbsp;&nbsp;头像</div>
      </div>
      <div id="content-wrapper" class="content-wrapper">
        Content
        <button @click="toggleFullContent">全屏</button><br />
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const smallMaxWidth = 768; // px
const middleMaxWidth = 1200; // px
const sidebarShortWidth = 54; // px

function toggleSidebar() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-big-hide');
  } else if (width <= smallMaxWidth) {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-middle-show');
    sidebar?.classList.toggle('sidebar-wrapper-small-show');
    drawerBg?.classList.toggle('drawer-bg-small-show');
  } else {
    sidebar?.classList.remove('sidebar-wrapper-big-hide');
    sidebar?.classList.remove('sidebar-wrapper-small-show');
    drawerBg?.classList.remove('drawer-bg-small-show');
    sidebar?.classList.toggle('sidebar-wrapper-middle-show');
  }

  const btnToggle = document.getElementById('btnToggle') as HTMLButtonElement | null;
  if (btnToggle) {
    if (sidebar?.clientWidth && sidebar?.clientWidth > sidebarShortWidth) {
      btnToggle.innerHTML = '&lt;&lt;';
    } else {
      btnToggle.innerHTML = '&gt;&gt;';
    }
  }
}

function toggleFullContent() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var header = document.getElementById('header-wrapper');
  var content = document.getElementById('content-wrapper');
  sidebar?.classList.toggle('sidebar-wrapper-full-content');
  header?.classList.toggle('header-wrapper-full-content');
  content?.classList.toggle('content-wrapper-full-content');
}

window.addEventListener('resize', () => {
  var sidebar = document.getElementById('sidebar-wrapper');
  var drawerBg = document.getElementById('drawer-bg');

  sidebar?.classList.remove('sidebar-wrapper-big-hide');
  sidebar?.classList.remove('sidebar-wrapper-small-show');
  sidebar?.classList.remove('sidebar-wrapper-middle-show');
  drawerBg?.classList.remove('drawer-bg-small-show');
});
</script>

<style scoped>
/* @media (min-width: 768px)
        @media (min-width: 992px)
        @media (min-width: 1200px)
        @media (max-width: 767px) */
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.app-wrapper {
  display: flex;
  height: 100%;
}

.sidebar-wrapper {
  flex: 0 0 210px;
  display: block;
  overflow: auto;
  background: lightblue;
}

.main-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

.header-wrapper {
  flex: 0 0 50px;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  background: lightgreen;
}

.content-wrapper {
  flex: 1 1 auto;
  height: calc(100% - 50px);
  background: lightpink;
  overflow: auto;
}
</style>

<style scoped>
/* 大屏 & 中屏（>768px） */
@media (min-width: 768px) {
  .sidebar-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .header-wrapper-full-content {
    /* flex: 0 0 0 !important;
          overflow: hidden; */
    display: none !important;
  }

  .content-wrapper-full-content {
    height: 100%;
  }
}
</style>

<style scoped>
/* all: 大屏（>=1200px） */
@media (min-width: 1200px) {
  .sidebar-wrapper-big-hide {
    /*display: none;*/
    flex: 0 0 54px;
    display: block;
  }
}
</style>

<style scoped>
/* 中屏（>768px && < 1200px） */
@media (max-width: 1200px) and (min-width: 768px) {
  .sidebar-wrapper {
    flex: 0 0 54px;
    display: block;
    overflow: hidden;
  }

  .sidebar-wrapper-middle-show {
    flex: 0 0 210px;
    display: block;
  }
}
</style>

<style scoped>
/* all: 小屏（<768px） */
@media (max-width: 768px) {
  .sidebar-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    height: 100%;
    display: none;
  }

  .drawer-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    display: none;
  }

  #sidebar-wrapper.sidebar-wrapper-small-show,
  #drawer-bg.drawer-bg-small-show {
    display: block;
  }
}
</style>
```

- 更新App.vue

```vue
// /src/App.vue
// 替换

<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style scoped></style>
```

- 更新router

```typescript
// /src/router/route/modules/basicRoutes.ts
// 替换

import type { RouteRecordRaw } from 'vue-router';

const DEFAULT_LAYOUT = () => import('@/layouts/default/index.vue');

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DEFAULT_LAYOUT,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/about',
    component: DEFAULT_LAYOUT,
    redirect: '/about/index',
    children: [
      {
        path: '/about/index',
        name: 'about',
        component: () => import('@/views/AboutView.vue'),
      },
    ],
  },
  {
    path: '/testing',
    component: DEFAULT_LAYOUT,
    redirect: '/testing/index',
    children: [
      {
        path: '/testing/index',
        name: 'testing',
        component: () => import('@/views/testing/index.vue'),
      },
    ],
  },
];
export default routes;
```

- 全局css

```css
// /src/assets/main.css
// 替换

@import './base.css';

html,
body,#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
```

## 12.2 侧边栏Sidebar

### 12.2.1 辅助工具/组件

- DomUtil.ts

```typescript
// /src/utils/basic/DomUtil.ts
// 新建

/**
 * Check if an element has a class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
function hasClass(ele: HTMLElement, cls: string) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * Add class to element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
function addClass(ele: HTMLElement, cls: string) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} ele
 * @param {string} cls
 */
function removeClass(ele: HTMLElement, cls: string) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
function isExternal(path: string) {
  return /^(https?:|http?:|mailto:|tel:)/.test(path);
}

const DomUtil = {
  hasClass,
  addClass,
  removeClass,
  isExternal,
};
export default DomUtil;
```

- CooLink

```vue
// src/components/CooLink/index.vue
// 新建

<template>
  <a v-if="DomUtil.isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import DomUtil from '@/utils/basic/DomUtil';
import { useRouter } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const router = useRouter();
function push() {
  router.push(props.to).catch((err) => {
    console.error(err);
  });
}
</script>
```

- 全局types

```typescript
// /src/types/index.ts
// 新建

enum ScreenWidthType {
  Big,
  Middle,
  Small,
}

export { ScreenWidthType };
```

- appStore.ts

```typescript
// /src/stores/modules/appStore.ts
// 新建

import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { store } from '../StoreService';
import { ScreenWidthType } from '@/types';

const useStore = defineStore('AppStore', () => {
  // state
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false,
  });
  const screen = reactive({
    widthType: ScreenWidthType.Big,
  });

  // actions
  function openSidebar() {
    sidebar.opened = true;
  }
  function closeSidebar() {
    sidebar.opened = false;
  }
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
  }

  function changeScreenWidthType(type: ScreenWidthType) {
    screen.widthType = type;
  }

  return {
    sidebar,
    screen,
    openSidebar,
    closeSidebar,
    toggleSidebar,
    changeScreenWidthType,
  };
});

const appStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { appStoreHook };
```

### 12.2.2 核心组件封装

- types

```typescript
// src/layouts/default/components/CooSidebar/types.ts
// 新建

declare type IMenuItem = ISubMenuRaw | IMenuItemRaw | IMenuItemDisabledRaw;

interface IMenuItemRaw extends IBaseMenu {
  path: string;
  children?: never;
}

interface IMenuItemDisabledRaw extends IBaseMenu {
  path?: string;
  children?: never;
  disabled: true;
}

interface ISubMenuRaw extends IBaseMenu {
  path?: never;
  isTab?: never;
  children: IMenuItem[];
}

interface IBaseMenu {
  id: string; // id，全局唯一
  title: string; // 显示标题
  path?: string; // url（绝对路径，最终route path，即不能是redirect前的route path）。支持外链
  icon?: string; // 菜单图标。icon路径。根目录为”/src/assets“
  visiable?: boolean; // 是否显示。true-是；false-否；
  browser?: boolean; // 是否浏览器打开。true-是；false-否（即系统标签页打开）；默认false
  newTab?: boolean; // 是否在新标签页打开。true-是；false-否。默认true
  disabled?: boolean; // 是否禁用。true-是；false-否。默认false
  tabClosable?: boolean; // tab标签页是否可关闭。true-是；false-否。默认true
  children?: IMenuItem[];
}

export type { IMenuItem, ISubMenuRaw, IMenuItemRaw };
```

- 侧边栏核心组件

```vue
// src/layouts/default/components/CooSidebar/CooSidebarItem.vue
// 新建

<template>
  <template v-if="!hasChild(item)">
    <CooLink v-if="item.visiable ?? true" :to="item.path ?? '#'">
      <ElMenuItem :index="item.path" :disabled="item.disabled ?? false">
        <CooSvgIcon v-if="item.icon" :name="item.icon" :color="sidebarTextcolor" />
        <template #title>
          {{ item.title }}
        </template>
      </ElMenuItem>
    </CooLink>
  </template>

  <ElSubMenu v-else :index="item.id" teleported :disabled="item.disabled ?? false">
    <template #title>
      <CooSvgIcon v-if="item.icon" :name="item.icon" :color="sidebarTextcolor" />
      <span v-if="item.title">{{ item.title }}</span>
    </template>

    <CooSidebarItem v-for="child in item.children" :key="child.id" :item="child" />
  </ElSubMenu>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { IMenuItem } from './types';
import CooLink from '@/components/CooLink/index.vue';
import CooSvgIcon from '@/components/CooSvgIcon/index.vue';

defineProps({
  item: {
    type: Object as PropType<IMenuItem>,
    required: true,
  },
});

const sidebarTextcolor = '#b7bdc3';

/**
 * 判断当前菜单是否包含可显示的子菜单
 *
 * @param item 当前菜单
 */
function hasChild(item: IMenuItem) {
  const effectives = item.children?.filter((item: any) => {
    return item.visiable ?? true;
  });

  if (null == effectives || effectives.length === 0) {
    return false;
  }

  return true;
}
</script>

<style scoped>
.coo-svg-icon {
  margin-right: 8px;
}

.coo-link {
  display: block;
}

.coo-link :deep(.el-link__inner) {
  display: block !important;
}
</style>
```

- index

```vue
// src/layouts/default/components/CooSidebar/index.vue
// 新建

<template>
  <ElScrollbar>
    <ElMenu :default-active="currRoute.path" :unique-opened="false" :collapse="!appStore.sidebar.opened" mode="vertical">
      <CooSidebarItem v-for="item in items" :key="item.id" :item="item" />
    </ElMenu>
  </ElScrollbar>
</template>

<script setup lang="ts">
import CooSidebarItem from './CooSidebarItem.vue';
import appStore from '@/stores/modules/appStore';
import { ref, type PropType } from 'vue';
import type { IMenuItem } from './types';
import RouterService from '@/router/RouterService';

defineProps({
  items: {
    type: Object as PropType<IMenuItem[]>,
    required: true,
  },
});

const currRoute = ref(RouterService.router.currentRoute);
</script>
```

### 12.2.3 layout文件

> 详见代码记录

```vue
// /src/layouts/default/index.vue
// 修改

<div id="sidebar-wrapper" class="sidebar-wrapper">
    sidebar-wrapper

    <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/testing">Test</RouterLink></li>
    </ul>
</div>
                      ↓
<div id="sidebar-wrapper" class="sidebar-wrapper">
    <CooSidebar :items="menus" />
</div>

// 添加
window.addEventListener('resize', () => {
  var width = document.body.clientWidth;
  if (width > middleMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Big);
    appStore.openSidebar();
  } else if (width <= smallMaxWidth) {
    appStore.changeScreenWidthType(ScreenWidthType.Small);
    appStore.closeSidebar();
  } else {
    appStore.changeScreenWidthType(ScreenWidthType.Middle);
    appStore.closeSidebar();
  }
});
```

## 12.3 标签页

> - 基于el-tabs
> - 仅列出核心部分，详见代码

### 12.3.1 tabViewStore

```typescript
// /src/stores/modules/tabViewStore.ts
// 新建

import { defineStore } from 'pinia';
import { store } from '../StoreService';
import RouterService from '@/router/RouterService';
import { ref } from 'vue';
import type { ITabView } from '@/layouts/default/components/CooTabView/types';

const useStore = defineStore('TabViewStore', () => {
  // state
  const allTabs = ref<ITabView[]>([]);
  const activeTab = ref<string>('');

  // actions
  function init() {
    if (allTabs.value.length === 0) {
      const tab: ITabView = {
        title: '首页',
        path: '/dashboard',
        closable: false,
      };
      addTab(tab);
    }
  }

  function addTab(tab: ITabView) {
    if (_isTabAlreadyExists(tab)) {
      activeTab.value = tab.path;
    } else {
      allTabs.value.push(tab);
      activeTab.value = tab.path;
    }
    RouterService.router.push(activeTab.value);
  }

  function openInCurrentTab(tab: ITabView) {
    if (activeTab.value === tab.path) {
      return;
    }

    if (_isTabAlreadyExists(tab)) {
      activeTab.value = tab.path;
    } else {
      const index = allTabs.value.findIndex((item) => item.path === activeTab.value);
      if (index >= 0) {
        allTabs.value.splice(index, 1);
        allTabs.value.splice(index, 0, tab);
        activeTab.value = tab.path;
      }
    }

    RouterService.router.push(activeTab.value);
  }

  function _isTabAlreadyExists(tab: ITabView) {
    const filters = allTabs.value.filter((item: ITabView) => {
      return item.path === tab.path;
    });

    return filters.length !== 0;
  }

  function removeTab(name: String) {
    const tabs = allTabs.value;
    let activeName = activeTab.value;
    if (activeName === name) {
      tabs.forEach((tab: ITabView, index: number) => {
        if (tab.path === name) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.path;
          }
        }
      });
    }

    activeTab.value = activeName;
    allTabs.value = tabs.filter((tab) => tab.path !== name);
    RouterService.router.replace(activeTab.value);

    init();
  }

  function setActiveTab(name: string) {
    activeTab.value = name;
    RouterService.router.push(activeTab.value);
  }

  return {
    allTabs,
    activeTab,
    init,
    addTab,
    openInCurrentTab,
    removeTab,
    setActiveTab,
  };
});

const tabViewStoreHook = useStore(store); // 在useStore()前声明，可解决错误：etActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?

export default useStore();
export { tabViewStoreHook };
```

### 12.3.2 TabView组件

- types

```typescript
// /src/layouts/default/components/CooTabView/types.ts
// 新建

interface ITabView {
  title: string; // 选项卡标题
  path: string; // 选项卡对应的router-view path
  closable: boolean; // 是否可关闭
}

export type { ITabView };
```

- TabView组件

```vue
// /src/layouts/default/components/CooTabView/index.vue
// 新建

<template>
  <div :class="$style.root">
    <ElTabs v-model="tabViewStore.activeTab" type="card" :class="$style['main-tab']" @tab-click="handleClick" @tab-remove="handleRemove">
      <ElTabPane v-for="item in tabViewStore.allTabs" :key="item.path" :name="item.path" :label="item.title" :closable="item.closable"> </ElTabPane>
    </ElTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { RoutePathEnum } from '@/router/RoutePathEnum';
import type { IMenuItem } from '../CooSidebar/types';
import type { ITabView } from './types';
import tabViewStore from '@/stores/modules/tabViewStore';
import menuStore from '@/stores/modules/menuStore';
import RouterService from '@/router/RouterService';
import { watch } from 'vue';

watch(
  () => menuStore.menus,
  () => {
    initTabView();
  },
);

function handleClick(tab: TabsPaneContext) {
  tabViewStore.setActiveTab(tab.paneName as string);
}

function handleRemove(name: TabPaneName) {
  tabViewStore.removeTab(name as String);
}

function initTabView(): void {
  const curPath = RouterService.router.currentRoute.value.path;
  const matched = tabViewStore.allTabs.filter((item) => {
    return curPath === item.path;
  });

  if (matched.length > 0) {
    return;
  }

  if (tabViewStore.allTabs.length === 0) {
    const homeTab: ITabView = {
      title: '首页',
      path: RoutePathEnum.HOME,
      closable: false,
    };
    tabViewStore.addTab(homeTab);
  }

  const menu = getMenu(curPath);
  if (null != menu) {
    const currTab = {
      title: menu.title,
      path: menu.path as string,
      closable: menu.tabClosable ?? true,
    };
    tabViewStore.addTab(currTab);
  }
}

function getMenu(path: string): IMenuItem | null {
  let matched = null;
  for (const menu of menuStore.menus) {
    matched = getPathInMenu(path, menu);
    if (null != matched) {
      return matched;
    }
  }

  return null;
}

function getPathInMenu(path: string, menu: IMenuItem): IMenuItem | null {
  if (menu.path && menu.path === path) {
    return menu;
  }

  if (menu.children) {
    let matched = null;
    for (const item of menu.children) {
      matched = getPathInMenu(path, item);
      if (null != matched) {
        return matched;
      }
    }
  }

  return null;
}
</script>

<style module>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 2px;
}

.main-tab {
  --el-tabs-header-height: 24px;
}

.main-tab > :global(.el-tabs__header) {
  margin: 0 !important;
  border: 0 none;
}

.main-tab > :global(.el-tabs__header) :global(.el-tabs__nav-next),
.main-tab > :global(.el-tabs__header) :global(.el-tabs__nav-prev) {
  line-height: 30px;
  color: var(--el-text-color-primary);
}

.main-tab :global(.el-tabs__item) {
  border-radius: 6px 6px 0 0;
}

.main-tab :global(.el-tabs__item):global(.is-active) {
  color: #ffffff;
  background-color: var(--el-color-primary);
  border-color: var(--el-color-primary);
}
</style>
```

### 12.3.3 CooAppMain组件

```vue
// /src/layouts/default/components/CooAppMain/index.vue
// 新建

<template>
  <div :class="$style.root">
    <div :class="$style['tabview-wrapper']">
      <div :class="$style['tabview-title']">
        <CooTabView :class="$style['tabview-content']" />
      </div>
      <div :class="$style['tabview-action']"><button @click="toggleFullContent">全屏</button><br /></div>
    </div>
    <div :class="$style['view-container']">
      <ElScrollbar>
        <router-view v-slot="{ Component, route }">
          <keep-alive :include="tabViewStore.allTabs.map((i) => i.path)">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </router-view>
      </ElScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import CooTabView from '@/layouts/default/components/CooTabView/index.vue';
import tabViewStore from '@/stores/modules/tabViewStore';

function toggleFullContent() {
  var sidebar = document.getElementById('sidebar-wrapper');
  var header = document.getElementById('header-wrapper');
  var content = document.getElementById('content-wrapper');
  sidebar?.classList.toggle('sidebar-wrapper-full-content');
  header?.classList.toggle('header-wrapper-full-content');
  content?.classList.toggle('content-wrapper-full-content');
}
</script>

<style scoped></style>

<style module>
.root {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.root .tabview-wrapper {
  flex: 0 0 auto;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

.root .tabview-wrapper .tabview-title {
  flex: 1 1 auto;
  overflow: hidden;
}

.root .tabview-wrapper .tabview-action {
  flex: 0 0 fit-content;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.root .tabview-wrapper .tabview-action div {
  padding: 0px 10px;
  border-left: 1px solid #eeeeee;
}

.root .tabview-wrapper .tabview-action div:hover {
  background-color: #f6f6f6;
}

.root .view-container {
  flex: 1 1 auto;
  background-color: #f2f3f5;
  overflow: hidden;
}

.root .view-container > :global(.el-scrollbar) > :global(.el-scrollbar__wrap) > :global(.el-scrollbar__view) {
  margin: 10px;
  padding: 6px;
  background-color: #ffffff;
}
</style>
```

### 12.3.4 更新CooLink组件

```vue
// /src/components/CooLink/index.vue
//  修改/添加

const props = defineProps({
  ...

  tabTitle: {
    type: String,
    required: false,
  },
});

-----------------------------------------------------------------------

function push() {
  router.push(props.to).catch((err) => {
    console.error(err);
  });
}
                      ↓
function push() {
  const tab: ITabView = {
    title: props.tabTitle ?? props.to,
    path: props.to,
    closable: true,
  };
  tabViewStore.addTab(tab);
}
```

### 12.3.5 layout文件

```html
<div id="content-wrapper" class="content-wrapper">
    Content
    <button @click="toggleFullContent">全屏</button><br />
    <RouterView />
</div>
                      ↓
<div id="content-wrapper" class="content-wrapper">
    <CooAppMain />
</div>
```

# 13 vueuse

> see: https://vueuse.org/

## 13.1 安装

```shell
pnpm add @vueuse/core
```

## 13.2 示例

```html
// /src/layouts/default/index.vue
// 替换

<template>
    <div>全屏 &nbsp;&nbsp;&nbsp;&nbsp;头像</div>
                         ↓
    <div>
        <button @click="toggle">全屏</button>
        &nbsp;&nbsp;&nbsp;&nbsp;头像
    </div>
</template>

// 添加
<script setup lang="ts">
    import { useFullscreen } from '@vueuse/core';
    const { toggle } = useFullscreen();
</script>
```

# 14 sass/scss

> vue sass: https://cli.vuejs.org/guide/css.html#pre-processors
>
> vite sass: https://vitejs.dev/config/shared-options.html#css-preprocessoroptions

## 14.1 安装

```shell
pnpm add -D sass-loader sass
```

## 14.2 配置

- vite.config.ts

```typescript
// /vite.config.ts
// 添加

export default defineConfig({
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      //define global scss variable
      scss: {
        javascriptEnabled: true,
        additionalData: `@use "@/layouts/scss/index.scss" as *;`, // 默认scss文件
      },
    },
  },
});
```

- index.scss

```scss
// /src/layouts/scss/index.scss
// 新建
```

## 14.3 示例

- index.scss定义变量

```scss
// /src/layouts/scss/index.scss
// 新建

$background-color: #ff0000;
$text-color: #ffffff;
```

- 页面引用

```vue
// /src/views/testing/index.vue
// 添加

<template>
  <div id="idScss">SCSS</div>
</template>

<style lang="scss" scoped>
#idScss {
  width: 100%;
  height: 50px;
  background-color: $background-color;
  color: $text-color;
}
</style>
```

# 15 Layout优化

## 15.1 Layout优化

详见代码

# 16 示例

详见代码

# 17 Breadcrumb

> 支持生成方式：
>
> - （默认）由Sidebar Menu生成
> - RouteMode：由Route结构生成
> - MenuItemMode：基于Sidebar Menu叶子节点生成
> - FreeMode：全自定义生成

- IBreadcrumb.ts

```typescript
// /src/types/RouterMeta/IBreadcrumb.ts
// 新建

declare type IBreadcrumb = IBreadcrumbRouteMode | IBreadcrumbMenuItemMode | IBreadcrumbFreeMode;

enum IBreadcrumbMode {
  RouteMode,
  MenuItemMode,
  FreeMode,
}

interface IBreadcrumbRaw {
  id: string; // 全局唯一标识
  title: string; // 显示文本
  path?: string; // url。若非空，则会生成<a href="path" />
  child?: IBreadcrumbRaw; // 子节点
}

interface IBreadcrumbRouteMode {
  mode?: IBreadcrumbMode.RouteMode;
  title: string;
  path?: string; // 对于祖先级Route，可以设置生成<a />的path
}

interface IBreadcrumbMenuItemMode {
  mode: IBreadcrumbMode.MenuItemMode;
  title: string; // 显示文本
  menuPath: string; // menu的path值
  parents?: IBreadcrumbRaw;
}

interface IBreadcrumbFreeMode {
  mode: IBreadcrumbMode.FreeMode;
  title: string;
  parents?: IBreadcrumbRaw;
}

export { IBreadcrumbMode };
export type { IBreadcrumb, IBreadcrumbRouteMode, IBreadcrumbMenuItemMode, IBreadcrumbFreeMode, IBreadcrumbRaw };
```

- CooBreadcrumb.vue

```vue
// /src/layouts/default/components/CooHeader/CooBreadcrumb.vue
// 新建

<template>
  <ElBreadcrumb>
    <TransitionGroup name="breadcrumb">
      <ElBreadcrumbItem v-for="item in breadcrumbs" :key="item.id">
        <CooLink v-if="item.path" :to="item.path">{{ item.title }}</CooLink>
        <template v-else>
          {{ item.title }}
        </template>
      </ElBreadcrumbItem>
    </TransitionGroup>
  </ElBreadcrumb>
</template>

<script setup lang="ts">
import type { IMenuItem } from '../CooSidebar/types';
import CooLink from '@/components/CooLink/index.vue';
import RouterService from '@/router/RouterService';
import menuStore from '@/stores/modules/menuStore';
import { IBreadcrumbMode, type IBreadcrumbMenuItemMode, type IBreadcrumbRaw } from '@/types/RouterMeta/IBreadcrumb';
import { ref, watch, onMounted } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

const breadcrumbs = ref<IBreadcrumbRaw[]>([]);

watch(
  () => [RouterService.router.currentRoute.value.path, menuStore.menus],
  (newValue) => {
    breadcrumbs.value = getBreadcrumbs(newValue[0] as string, newValue[1] as IMenuItem[]);
  },
);

onMounted(() => {
  const path = RouterService.router.currentRoute.value.path;
  breadcrumbs.value = getBreadcrumbs(path, menuStore.menus);
});

function getBreadcrumbs(path: string, menus: IMenuItem[]): IBreadcrumbRaw[] {
  const router = RouterService.router.currentRoute.value;
  const meta = router.meta;

  // 未设置自定义Breadcrumb
  if (!meta || !meta.breadcrumb) {
    return buildFromMenu(path, menus);
  }

  let breadcrumbs: IBreadcrumbRaw[] = [];
  switch (meta.breadcrumb.mode) {
    case IBreadcrumbMode.MenuItemMode:
      breadcrumbs = buildFromMenuItemMode(router, meta.breadcrumb.menuPath, menus);
      break;
    case IBreadcrumbMode.RouteMode:
      breadcrumbs = buildFromRouteMode(router);
      break;
    case IBreadcrumbMode.FreeMode:
      breadcrumbs = buildFromFreeMode(router);
      break;
  }
  return breadcrumbs;
}

/**
 * 获取基于menus的Breadcrumbs
 *
 * @param path
 * @param items
 * @returns null-未匹配到；非null-匹配到的Breadcrumb路径
 */
function buildFromMenu(path: string, menus: IMenuItem[]): IBreadcrumbRaw[] {
  for (const item of menus) {
    const matched: IBreadcrumbRaw[] = getMatchedMenuPath(path, item, []);
    if (matched.length > 0) {
      return matched.reverse();
    }
  }
  return [];
}

/**
 * 获取基于Route的Breadcrumbs
 * @param router
 */
function buildFromRouteMode(router: RouteLocationNormalizedLoaded): IBreadcrumbRaw[] {
  const items: IBreadcrumbRaw[] = [];
  router.matched.forEach((item) => {
    if (item.meta && item.meta.breadcrumb && item.meta.breadcrumb.title) {
      items.push({
        id: item.path,
        title: item.meta.breadcrumb.title,
        path: item.path,
      });
    }
  });
  return items;
}

function getMatchedMenuPath(path: string, item: IMenuItem, matchedTree: IBreadcrumbRaw[]): IBreadcrumbRaw[] {
  if (item.path && item.path === path) {
    matchedTree.push({
      id: item.id,
      title: item.title,
      path: item.path,
    });
    return matchedTree;
  }

  if (item.children) {
    for (const it of item.children) {
      const matched = getMatchedMenuPath(path, it, matchedTree);
      if (matched.length > 0) {
        matchedTree.push({
          id: item.id,
          title: item.title,
          path: item.path,
        });
        return matched;
      }
    }
  }

  return [];
}

function buildFromMenuItemMode(router: RouteLocationNormalizedLoaded, menuPath: string, menus: IMenuItem[]): IBreadcrumbRaw[] {
  if (!menuPath) {
    return [];
  }

  let breadcrumbs: IBreadcrumbRaw[] = buildFromMenu(menuPath, menus);
  if (!router.meta || !router.meta.breadcrumb) {
    return breadcrumbs;
  }

  breadcrumbs.push(...buildFromFreeMode(router));
  return breadcrumbs;
}

function buildFromFreeMode(router: RouteLocationNormalizedLoaded): IBreadcrumbRaw[] {
  let breadcrumbs: IBreadcrumbRaw[] = [];
  if (!router.meta || !router.meta.breadcrumb) {
    return breadcrumbs;
  }

  const parents = (router.meta.breadcrumb as IBreadcrumbMenuItemMode).parents;
  breadcrumbs.push(...getParentsNode([], parents));

  if (router.meta.breadcrumb.title) {
    breadcrumbs.push({
      id: router.path,
      title: router.meta.breadcrumb.title,
    });
  }
  return breadcrumbs;
}

function getParentsNode(matchedTree: IBreadcrumbRaw[], item?: IBreadcrumbRaw): IBreadcrumbRaw[] {
  if (!item) {
    return matchedTree;
  }

  matchedTree.push(item);
  return getParentsNode(matchedTree, item.child);
}
</script>

<style lang="scss">
.el-breadcrumb {
  display: flex;
  text-align: center;

  .el-breadcrumb__inner,
  .el-breadcrumb__separator {
    color: var(--el-text-color-placeholder) !important;
  }
}
</style>
```

# 18 脱敏组件

## 18.1 CooInput

```vue
// /src/components/CooInput/index.vue
// 新建

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
```

## 18.2 CooText

- types

```typescript
// /src/components/CooText/types.ts
// 新建

export enum DisplayMode {
  fixLength = 'fix-length',
  followContent = 'follow-content',
}

export enum DesensitiveType {
  all = 'all',
  part = 'part',
}

export enum DesensitiveMode {
  startEnd = 'start-end',
  middle = 'middle',
}
```

- index.vue

```vue
// /src/components/CooText/index.vue
// 新建

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
```

## 18.3 示例

详见代码
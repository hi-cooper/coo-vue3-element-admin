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
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

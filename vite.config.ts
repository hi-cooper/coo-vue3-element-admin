import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')], // ָ��icons·��
      symbolId: 'icon-[dir]-[name]', // symbolId��ʽ
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
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

  build: {
    chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
    minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        drop_console: true, // 生产环境去除 console
        drop_debugger: true, // 生产环境去除 debugger
        module: true, // (默认值 false) -- 压缩 ES6 模块时传递 true。 隐含了严格模式以及 toplevel 选项
        passes: 3, // (默认值： 1) -- 运行压缩的最大次数。 在某些情况下，不止一次传递会导致进一步压缩代码。 请记住，更多的传递将花费更多的时间
      },
      format: {
        comments: "some", //  (默认值 "some") -- 默认情况下，它保留包含 "@license"、"@copyright"、"@preserve" 或以 ! 开头的 JSDoc 风格注释，传递 true 或 "all" 来保留所有注释，传递 false 来省略输出中的注释、正则表达式字符串（例如 /^!/）或函数
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].[hash].js", // 入口点。[name]-文件名；[hash]-该文件内容hash值
        chunkFileNames: "assets/[name].[hash].js", // 代码拆分共享块
        assetFileNames: (assetInfo: any) => { // 静态资源：[ext]-文件扩展名
          const info = assetInfo.name.split(".");
          let extType = info[info.length - 1];
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
          ) {
            extType = "media";
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
            extType = "img";
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
            extType = "fonts";
          }
          return `${extType}/[name].[hash].[ext]`;
        },
      },
    },
  }
});

/// <reference types="vite/client" />

// 环境变量类型
interface ImportMetaEnv {
  VITE_APP_TITLE: string;
  VITE_HTTP_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

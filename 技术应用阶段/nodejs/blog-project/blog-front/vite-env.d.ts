/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly Base_Url: string; // 添加自定义环境变量类型
  readonly VITE_API_URL: string; // 添加自定义环境变量类型
  readonly VITE_APP_TITLE: string; // 添加自定义环境变量类型
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

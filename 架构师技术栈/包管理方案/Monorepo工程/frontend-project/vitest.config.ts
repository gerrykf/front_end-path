import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 表示 vitest 启用全局变量检测
    globals: true,
    // 配置测试文件的运行环境
    environment: "node",
  },
});

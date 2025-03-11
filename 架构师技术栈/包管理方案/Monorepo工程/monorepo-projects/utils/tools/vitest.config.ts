import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // 表示 vitest 会在 src 目录下查找所有的测试文件
    // 自动将常见的测试工具导入到全局环境中
    // 例如 test、expect、describe 等
    globals: true,
    // 配置 vitest 的运行环境
    environment: "node",
  },
});

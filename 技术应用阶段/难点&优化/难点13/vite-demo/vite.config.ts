import { ConfigEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import { visualizer } from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";

// https://vite.dev/config/
export default ({ mode }: ConfigEnv) => {
  const isProduction = mode === "production";

  return defineConfig({
    plugins: [
      vue(),
      // Gzip 压缩
      viteCompression({
        verbose: true, // 是否在控制台显示压缩详情
        disable: !isProduction, // 是否禁用该插件
        threshold: 10240, // 文件大小大于 10KB 时才进行压缩
        algorithm: "gzip", // 压缩算法
        ext: ".gz", // 压缩后的文件扩展名
      }),
      // 图片压缩
      viteImagemin({
        gifsicle: { optimizationLevel: 7 }, // GIF 压缩
        optipng: { optimizationLevel: 7 }, // PNG 压缩
        mozjpeg: { quality: 70 }, // JPEG 压缩
        svgo: {
          plugins: [
            { name: "removeViewBox" }, // 移除 viewBox 属性
            { name: "removeEmptyAttrs", active: false }, // 保留空属性
          ],
        },
      }),
      // 可视化分析
      visualizer({
        filename: "dist/stats.html", // 输出文件
        open: true, // 是否自动打开浏览器
        gzipSize: true, // 是否显示 Gzip 压缩后的大小
        brotliSize: true, // 是否显示 Brotli 压缩后的大小
      }),
      // 1.打包时忽略的全局变量  2.需要在Rollup配置中添加externalGlobals插件排除这些全局变量 3.在index.html中引入cdn链接
      externalGlobals({
        vue: "Vue",
        "element-plus": "ElementPlus",
      }),
    ],
    build: {
      minify: isProduction ? "terser" : "esbuild", // 生产环境使用 terser 压缩,esbuild 压缩速度更快
      terserOptions: {
        compress: {
          drop_console: isProduction, // 生产环境移除 console
          drop_debugger: isProduction, // 生产环境移除 debugger
        },
      },
      // 分包策略
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              // 过大的第三方包独立分包，维持单 chunk  减少主入口 app.js 的体积
              if (id.includes("element-plus")) {
                return "vender-element-plus"; // element-plus 单独打包
              }
              return "vender"; // 其他依赖包
            }
          },
        },
        external: ["vue", "element-plus"], // 排除打包
        plugins: [
          externalGlobals({
            vue: "Vue",
            "element-plus": "ElementPlus", // 对应 CDN 的全局变量
          }),
        ],
      },
    },
    optimizeDeps: {
      // 第一次运行会导致依赖预构建，从而导致路由切换不成功
      include: ["element-plus/dist/index.css"], // 解决路由切换卡顿问题
    },
  });
};

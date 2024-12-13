import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

// https://vite.dev/config/
export default ({ mode, env }) => {
  return defineConfig({
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    server: {
      port: 5173,
      host: true,
      hmr: true,
      proxy: {
        "/api": {
          target: "http://localhost:8888",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};

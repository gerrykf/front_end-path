import { defaultDefines } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

const pathResolve = (dir) => resolve(__dirname, ".", dir);

export default defaultDefines({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
});

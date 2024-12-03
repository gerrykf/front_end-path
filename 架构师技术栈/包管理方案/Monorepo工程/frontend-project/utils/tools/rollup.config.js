// tools/rollup.config.ts

// 导入各种插件
import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";

const extensions = [".js"];

// 导出一个数组，数组里面每一项对应一种格式的配置
export default [
  // CommonJS
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // ESM
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
    ],
  },
  // Browser-compatible
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.browser.js",
      format: "iife",
      name: "MyModule",
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
      }),
      resolve({ extensions }),
      commonjs(),
      json(),
      babel({
        exclude: "node_modules/**",
        extensions,
        babelHelpers: "bundled",
        presets: [
          ["@babel/preset-env"],
          {
            targets: "> 0.25%, not dead",
          },
        ],
      }),
    ],
  },
];

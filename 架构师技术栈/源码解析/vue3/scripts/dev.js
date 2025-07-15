/**
 * 打包开发环境的脚本
 *
 * node scripts/dev.js --format cjs
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import esbuild from "esbuild";
import { createRequire } from "node:module";

console.log(process.argv);

const {
  values: { format },
  positionals,
} = parseArgs({
  allowPositionals: true,
  options: {
    format: {
      type: "string",
      short: "f",
      default: "esm",
    },
  },
});

console.log("format", format, positionals);

// 创建esm 的 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const require = createRequire(import.meta.url);
const target = positionals.length ? positionals[0] : "vue";

const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
console.log("entry", entry);

/**
 * --format cjs or esm
 * cjs ==> reactivity.cjs.js
 * esm ==> reactivity.esm.js
 * @type {string}
 */
const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
);

const pkg = require(`../packages/${target}/package.json`);
console.log("package", pkg);

esbuild
  .context({
    entryPoints: [entry], // 入口文件
    outfile, // 输出文件路径
    format, // 输出格式 (esm, cjs, iife)
    platform: format === "cjs" ? "node" : "browser", // 打包平台类型
    sourcemap: true, // 是否生成 sourcemap 文件
    bundle: true, // 把所有的依赖打包到一个文件中
    globalName: pkg.buildOptions.name, // 全局变量名 (iife 模式下使用)
  })
  .then((ctx) => ctx.watch());

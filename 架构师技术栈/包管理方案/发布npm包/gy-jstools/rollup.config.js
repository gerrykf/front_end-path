import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const output = (file, format, name) => ({
  file: file,
  format: format,
  name: name,
  sourcemap: true,
});

export default [
  {
    input: "src/index.js",
    output: [
      output("dist/index.cjs", "cjs", "cjs"),
      output("dist/index.js", "es"),
      output("dist/index.browser.js", "iife", "gy"),
    ],
    plugins: [resolve(), terser()],
  },
];

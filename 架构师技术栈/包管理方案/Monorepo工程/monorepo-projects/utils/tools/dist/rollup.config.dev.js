"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rollupPluginTypescript = _interopRequireDefault(require("rollup-plugin-typescript2"));

var _pluginCommonjs = _interopRequireDefault(require("@rollup/plugin-commonjs"));

var _pluginNodeResolve = _interopRequireDefault(require("@rollup/plugin-node-resolve"));

var _pluginJson = _interopRequireDefault(require("@rollup/plugin-json"));

var _pluginBabel = _interopRequireDefault(require("@rollup/plugin-babel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 导入各种插件
var extensions = [".js", ".ts"]; // 导出一个数组，数组里面每一个对象对应一种格式的配置

var _default = [// CommonJS
{
  input: "src/index.ts",
  output: {
    file: "dist/index.cjs",
    format: "cjs"
  },
  plugins: [(0, _rollupPluginTypescript["default"])({
    useTsconfigDeclarationDir: true
  }), (0, _pluginNodeResolve["default"])({
    extensions: extensions
  }), (0, _pluginCommonjs["default"])(), (0, _pluginJson["default"])()]
}, // ESM
{
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [(0, _rollupPluginTypescript["default"])({
    useTsconfigDeclarationDir: true
  }), (0, _pluginNodeResolve["default"])({
    extensions: extensions
  }), (0, _pluginCommonjs["default"])(), (0, _pluginJson["default"])()]
}, // Browser-compatible
{
  input: "src/index.ts",
  output: {
    file: "dist/index.browser.js",
    format: "iife",
    name: "jsTools"
  },
  plugins: [(0, _rollupPluginTypescript["default"])({
    useTsconfigDeclarationDir: true
  }), (0, _pluginNodeResolve["default"])({
    extensions: extensions
  }), (0, _pluginCommonjs["default"])(), (0, _pluginJson["default"])(), (0, _pluginBabel["default"])({
    exclude: "node_modules/**",
    extensions: extensions,
    babelHelpers: "bundled",
    presets: [["@babel/preset-env", {
      targets: "> 0.25%, not dead"
    }]]
  })]
}];
exports["default"] = _default;
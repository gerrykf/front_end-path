const path = require("path");
// 引入 SpeedMeasurePlugin 用于性能分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 是否为生产环境
const isProduction = process.env.NODE_ENV === "production";

// SpeedMeasurePlugin 实例化（可选）
const smp = new SpeedMeasurePlugin({
  outputFormat: "humanVerbose", // 输出格式：'json', 'human', 或 'verbose'
  outputTarget: console.log, // 输出结果的目标路径
  loaderTopFiles: 10, // 显示处理时间最长的 10 个文件
  loaderCount: true, // 显示每个 loader 处理的文件数量
});

// Webpack 配置
const webpackConfig = {
  mode: isProduction ? "production" : "development",
  entry: "./src/index.js", // 项目入口
  output: {
    // 文件输出配置
    filename: isProduction ? "bundle.[contenthash].js" : "bundle.js", // 根据环境选择是否带 hash
    path: path.resolve(__dirname, "dist"), // 输出目录
    clean: true, // 清理旧的构建文件
  },
  module: {
    rules: [
      {
        test: /\.m?js$/, // 匹配 `.js` 和 `.mjs` 文件
        exclude: /node_modules/, // 排除第三方库
        use: [
          {
            loader: "swc-loader", // 使用 swc 替代 babel 进行快速编译
            options: {
              jsc: {
                parser: {
                  syntax: "ecmascript",
                  jsx: true, // 如果项目中有 JSX，启用支持
                },
                target: "es5", // 指定输出目标
              },
            },
          },
          {
            loader: "thread-loader",
            options: {
              workers: 4, // 根据系统核心数设置，默认是 CPU 核心数 - 1
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        use: [
          {
            loader: "thread-loader",
          },
          {
            loader: "vue-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    ...(isProduction ? [new MiniCssExtractPlugin()] : []),
  ],
  cache: {
    // 文件缓存配置
    type: "filesystem", // 使用文件系统缓存
    cacheDirectory: path.resolve(__dirname, "webpack_cache"), // 缓存目录
    buildDependencies: {
      config: [__filename], // 配置文件变更时重新生成缓存
    },
    name: "my-name", // 缓存名称
    version: "1.0", // 缓存版本
  },
  devtool: isProduction ? false : "source-map", // 开发模式下启用 Source Map
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"), // 静态资源目录
    },
    compress: true, // 启用 GZIP 压缩
    port: 8080, // 开发服务器端口
    hot: true, // 热模块替换
  },
};

// 包装配置（启用 smp 性能分析）
// 默认导出配置
module.exports = smp.wrap(webpackConfig);

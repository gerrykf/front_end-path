- [难点公关](#难点公关)
  - [Webpack 构建优化(2)](#webpack-构建优化2)
    - [问题](#问题)
    - [原因](#原因)
    - [解决思路](#解决思路)
    - [解决细节](#解决细节)
  - [Vite 相关性能优化(13)](#vite-相关性能优化13)
    - [依赖预构建](#依赖预构建)
  - [defer 优化方案(16)](#defer-优化方案16)
    - [requestAnimationFrame](#requestanimationframe)
    - [分屏渲染](#分屏渲染)
    - [SSR](#ssr)

# 难点公关

> 回答问题遵循以下基本原则：

1. 遇到的问题或困难(S:Situation)
2. 列举问题难点或者思考过程(T:Task)
3. 根据确定的解决方案实施的行动(A:Action)
4. 解决问题的结果，对项目，对团队，对公司的帮助，对个人的提升(R:Result)

## Webpack 构建优化(2)

### 问题

在维护一些老旧项目的时候，脚手架用的是 create-react-app 或者 vue-cli 搭建的，这一类项目会随着项目的规模越变越大后，每次启动项目的时间也会越来越长，这是在维护一个项目的痛点。

### 原因

基于 webpack 的项目，即便是在开发环境下，也是要先打包才能在浏览器上看到效果

### 解决思路

`speed-measure-webpack-plugin` 该插件主要作用于分析打包的时候各个地方的耗时情况。
分析过后往往会存在这么几方面比较耗时：

1. JavaScript 编译：Babel 编译 JavaScript 代码花费了大量时间。
2. 打包时间： Webpackde 模块打包花费了很久时间，特别是在处理大型依赖和复杂的项目结构时。
3. 插件耗时：一些插件，如 TerserWebpackPlugin(用于代码压缩)，在处理大量代码时会变得非常慢。
4. 文件读取与写入： 文件系统操作，特别是读取和写入缓存，耗时较长
5. 热更新（HMR）:开发环境中，热更新的处理时间也较长，特别是在修改多文件时。

确定了问题之后就可以逐个点进行过优化：

1. swc 替换 babel
2. 使用 thread-loader
3. 利用 webpack5 的持久化 缓存技术
4. 开发环境去除 hash，生产环境要保留
5. 升级老旧的 plugin

### 解决细节

1. 使用 `speed-measure-webpack-plugin`[https://github.com/stephencookdev/speed-measure-webpack-plugin] 进行耗时分析

   ```js
   const SpeedMeasurePlugin = required("speed-measure-webpack-plugin");
   const smp = new SpeedMeasurePlugin();

   const wevpackConfig = {
     // 你的配置
   };

   module.exports = smp.wrap(wevpackConfig);
   ```

   该插件还提供了一些配置项：

   ```js
   const smp = new SpeedMeasurePlugin({
     outputFormat: "humanVerbose", // 输出的格式：'json','human',(默认)'verbose'
     outputTarget: console.log, // 输出结果的目标路径
     loaderTopFiles: 10, // 是否在插件耗时结果中显示每个loader的详细信息
     loaderCount: true, // 是否在详细信息中显示每个loader处理文件的数量
   });
   ```

   回头就会生成一份报告：

   ```js
   Speed Measure Plugin
   General output time took 1345 ms
   Top 10 plugin
   - HtmlWebpackPlugin took 320 ms
   - MiniCssExtractPlugin took 280 ms
   - TerserPlugin took 150 ms
   - DefinePlugin took 110 ms
   Top 10 loader
   - babel-loader took 600 ms
   - css-loader took 200 ms
   - style-loader took 180 ms
   - file-loader took 120 ms
   - ...
   ```

   该报告就会包含如下信息：

   1. 总体构建时间： webpack 网站构建的总时间
   2. 各个阶段的耗时：例如，解析依赖，构建，模块，优化和输出资源等阶段的时间
   3. 插件耗时：每个插件构建过程中所花费的时间
   4. loader 耗时： 每个 loader 处理文件时所花费的时间

   根据这份报告就可以有目标的进行优化。

   还有一个常用插件：

   - Webpack Bundle analyzer: 主要时分析打包后资源的大小，会生成一个交互式的可视化图表。
   - Speed Measure Webpack Plugin: 主要分析 Webpack 构建过程中的时间消耗。

2. 用 swc 替换 babel
   全称是 Speedy Web Compiler,它是一个使用 Rust 编写的编译器。babel 是 js 写的，因为 js 是单线程 所以处理的不会太快
   SWC 特点：

   1. 高性能
   2. 兼容性
   3. 生态系统

   使用 SWC 替换 babel 之后，能够获取到的性能上的收益：

   1. 编译速度
   2. 多线程处理
   3. 内存管理

3. 使用 thread-loader
   thread-loader 是一个 Webpack 的 loader,可以将某些耗时的操作（如文件编译和转换）放在子线程中执行，从而减少主线程的负担，提高构建性能。
   thread-loader 主要提供的也就是多线程并行处理的优势：

   - 单线程瓶颈：默认情况如下，Webpack 在主线程中逐个处理文件。对于大型项目或复杂的转换操作，这种单线程模式可能会导致严重的性能瓶颈。
   - 并行加速：thread-loader 通过创建多个子线程，并行处理文件，从而减少主线程的负载，加速整个编译过程。

4. 利用 webpack5 的持久化 缓存技术
   持久化缓存技术是 webpack5 引入的新技术，可以对构建内容进行缓存：

   - memory: 缓存在内存中，使用于开发环境
   - filesystem：以文件的形式缓存在磁盘上，使用于生产环境

   一般缓存的内容跟：

   1. 模块缓存
   2. 解析缓存
   3. 插件缓存

   ```js
   const path = require("path");

   module.exports = {
     mode: "development",
     entry: "./src/index.js",
     output: {
       // ...
     },
     cache: {
       type: "filesystem", // 使用文件系统进行缓存
       cacheDirectory: path.resolve(__dirname, "webpack_cache"), // 缓存目录
       buildDependenciess: {
         config: [__filename], // 当配置文件改变时，重新构建缓存
       },
       name: "my-name", // 缓存名称
       version: "1.0", // 缓存版本
     },
   };
   ```

5. 开发环境去掉 hash
   在 webpack 配置中，hash 的目的是为了生成唯一的文件名：`bundle.(hash).js`
   不同环境下对 hash 的需求是不一样的：

   - 开发环境：频繁进行代码修改和构建，不需要长时间缓存，生成 hash 会增加不必要的构建时间。
   - 生产环境： 希望生成 hash，以便利用浏览器缓存机制，提高加载速度。

   因此在 Webpack 配置文件中，就可以动态的配置是否要生成 hash：

   ```js
   const path = require("path");

   module.exports = (env, args) => {
     // 获取当前的构建模式
     const isProduction = args.mode === "production";

     return {
       entry: "./src/index.js",
       output: {
         // 根据不同的构建模式来决定生成的文件名是否要包含hash值
         filebane: isProduction ? "bunlde.[contenthash].js" : "bundle.js",
         path: path.resolve(__dirname, "dist"),
       },
       module: {
         rules: {
           test: /\.m?js$/,
           exclude: /node_modules/,
           use: {
             loader: "swc-loader",
           },
         },
       },
       cache: {
         type: "filesystem", // 使用文件系统进行缓存
       },
     };
   };
   ```

   在`package.json`中可以配置启动模式

   ```json
   {
     "scripts": {
       "start": "webpack serve --mode development",
       "build": "webpack --mode production"
     }
   }
   ```

6. 升级老旧 Plugin
   例如升级 terser-webpack-plugin,这个插件使用了压缩代码的，新版本相比旧版本就有很大的提升：

   1. 性能改进：
      - 算法优化： 插件的新版本通常包含更高效的算法和优化政策，可以在保持相同压缩率的同时加快压缩速度。
      - 多线程处理： 新版本可能引入了对多线程的支持，从而利用多线程 CPU 提升压缩性能
   2. Bug 修复和改进
      - 修复性能瓶颈： 老版本可能存在一些未被发现的性能瓶颈或 bug，通过升级可以避免这些问题。
      - 代码改进：维护者和社区贡献者会不断的改进插件的代码，以提高其性能和稳定性
   3. 新特性
      - 缓存支持：新版本支持持久化缓存功能，从而避免重复压缩相同的代码块，进一步提升构建速度。
      - 配置优化：简化和改进配置选项，使得更容易进行性能调优。

## Vite 相关性能优化(13)

- 技术讲解

1. 对 Vite 整体认知程度
2. 为什么要性能优化，优化的指标是什么？
3. 怎么进行性能优化
4. 优化的结果是什么？
5. 能突出表达你在性能优化中的高亮点

Vite 在开发环境性能 已经非常不错了，因为 Vite 在开发环境中使用了 Esbuild 进行了以来预构建，一般情况下很舒服，但是也会有一些坑点。

生产环境应该如何优化呢？Vite 打包是用的 Rollup，但是基本的优化处理其实和 WebPack 差不多的

- 解决思路

开发环境的依赖预构建没什么可说的，但是会存在一个问题，如果我们使用了按需引用的插件，类似于 Element-plus 这一种，特别是存在切换路由的情况的是否，我们需要点击两次才会生效，而且界面可能存在闪动问题，仔细看会发现点击路由时，Vite 还进行了依赖预构建的处理

为了防止在启动时占用大量编译的时间，Vite 只会处理常用的组件和依赖，特别时按需加载的时候，加上 Vite 本身就会忽略 node_modules 中的内容，这就导致一些按需的依赖在进入到对应的页面时才会处理，从而导致一直在处理依赖和 reloading。

解决：通过分析，类似于 element-plus，vant 等这种可以按需加载的组件，VIte 的优化触发就是在 style 样式加载，在开发模式就把所有组件的样式全优化了

```js
optimizeDeps: {
  incluede: ["element-plus/es/components/**/style/css"];
}
```

生产环境的优化，大部分都是和打包优化相关的：

- 代码压缩
  、 GZIP 压缩
  、图片压缩
- 分包策略
- 构建分析
- 摇树优化(Tree Shaking)
  摇树优化会移除未使用的代码，减少最终打包体积。
  优化建议：
  使用支持 Tree Shaking 的第三方库（如 lodash-es 替代 lodash）。
- CDN 加速

- 开发阶段
  依靠 Esbuild 处理的依赖预构建让我们的开发体验已经很舒服了，不过在开发过程中我还是发现一些小问题，如果开发过程中我们有动态的依赖导入，特别是在和路由懒加载结合时，第一次运行会导致依赖预构建重新进行加载，从而导致路由跳转不成功，
  尤其当您禁用浏览器缓存时（这种情况只应该发生在调试阶段）必须将对应模块加入到 include 里，否则会遇到开发环境切换页面卡顿的问题（vite 会认为它是一个新的依赖包会重新加载并强制刷新页面），因为它既无法使用浏览器缓存，又没有在本地 node_modules/.vite 里缓存

  解决办法是配置 optimize 将所有需要按需载入的依赖加入到 include 中

既然是优化 那就需要确立量化指标，没有量化指标就没有指导方向，也不会有我们优化后的基线和目标。

- 打包阶段
  在打包生产阶段的优化，我们需要根据实际情况来进行分析。

1. 资源压缩减少代码体积，减少用户请求资源的时间，资源的压缩一般都是比较常规的代码压缩，gzip 压缩，图片压缩等等。
   当然 Vite 本事是基于 ESM，所以代码阶段我们也需要注意使用 ESM 方式按需加载。更利于摇树优化。
2. 分包策略，最重要的是为了更好的利用浏览器缓存
   但是为了平衡浏览器缓存的利用率，首页文件加载过大，以及顾及 SEO 的情况（**埋钩子：引起面试官提问，我们也需要自己引出来说一说**）我采用的策略是：将 Node_modules 中第三方 lib 打包到一个 vendor 里面，过大的第三方包独立分包，业务代码维持单 chunk，通过 HTTP2 保证页面加载速度
3. 对于一些比较重要的资源使用了 Preload 方式进行预加载。Prefetch 也是一个比较常用的优化方式，它相当于告诉浏览器空闲时去预加载其他页面的资源，但是**Vite 并没有提供 Prefetch 的功能**，默认只有 Preload,所以我**自定义了 Vite 插件**，通过 Vite 插件的钩子 transformIndexHtml，给链接加上 Prefetch，从而达到 Prefetch 预加载效果（埋钩子：展示自己在这一块儿的亮点）
   通过上面的优化，开发阶段显得更加流畅，打包体积明显减小，而且打包时间减少了将近 20S 左右，当然主要还是用户侧的感受更加流畅了，首页的 FCP 从原来的 2.3S,变成了优化后的 0.7S,LCP 也从原来的 3.4S 左右降低到优化后比较稳定的 1.8S 左右，TBT 总阻塞时间也控制在 300ms 以内。

### 依赖预构建

## defer 优化方案(16)

- S
  因为我们的这个项目，用户首页打开的速度特别慢，无论我们自己测试也好，还是根据监控埋点反馈的数据也好，基本上可以排除其他网络因素，主要原因还是因为首屏渲染的 DOM 内容特别多。这个当然我们也清楚，所以**一开始就给用户做了骨架屏和延迟分屏渲染的相关优化**。

- T
  但是这两种方式并不能解决关键问题，骨架屏本身就是治标不治本的做法，而分屏渲染只是解决了不再当前视口 DOM 内容优化渲染的问题。而我们项目的麻烦点就在于，首屏内容本身的 DOM 阶段渲染就十分的多（可能**面试官会处于好奇**，什么项目首屏这么麻烦，一般涉及数据密集型 仪表盘显示的，DOM 会十分的密集），分屏分页只能解决不在当前视口内容渲染的问题。

- A
  当然也考虑过 SSR，但是 SSR 虽然是解决渲染问题的大招，但是本身该有的大量的 DOM 节点内容在客户端还是要进行渲染，而且最重要的是**项目的成本预算并不打算把压力放在服务器上来，这个想法也没有可行性**（**埋钩子：引起面试官兴趣**）

- R
  最后想到了**requestAnimationFrame** 进行分帧渲染的方式，和我们当时的需求是最契合的。根本原理就是借助 **RAF** 下一次重绘之前执行回调函数，将长任务分帧分解成一个个的短任务，当然还需要封装相关的脚本工具，探测页面的节点，根据节点渲染的优先级进行处理（**埋钩子：引起面试官兴趣**）

- 总结
  这样的处理，对原有的代码侵入性最少，而且以比较简单直接的方式，解决了首屏渲染时间过长的问题，经过这样优化之后，首屏的 FCP，LCP 时间大幅度降低，用户留存率（RR）也有明显的改善。
  (最后追问面试官，哪些地方需要详说明以下)

### requestAnimationFrame

- 使用场景

  1. 创建高性能动画
     requestAnimationFrame 是替代 setInterval 和 setTimeout 的最佳选择，因为它：

     自动优化帧率（基于显示器刷新率）。
     减少不必要的绘制，提升性能。
     动画在页面非激活时自动暂停，节省资源。
     示例场景：

     平滑滚动效果（如滚动到特定位置）。
     游戏动画帧渲染。
     元素平移动画（如滑动、缩放）。

  2. 分帧渲染
     处理大量 DOM 操作或数据时，可以将任务拆分为多帧完成，避免阻塞主线程导致页面卡顿。

     示例场景：

     渲染大列表（如虚拟滚动）。
     分帧加载图片。
     大型 SVG 或 Canvas 渲染。

  3. 减少性能瓶颈
     requestAnimationFrame 的回调是在浏览器的绘制周期中执行的，适用于优化与绘制相关的任务。

     示例场景：

     检测并动态调整布局变化。
     自适应动画或页面布局。

### 分屏渲染

使用浏览器提供的 IntersectionObserver,在 DOM 原始进入视口时进行渲染

### SSR

SSR 的方案当然可以帮助我们解决一部分渲染问题，但是其实我们主要的问题是首屏的节点就很多，无论怎么样，就算时服务端渲染了，传递到客户端还是需要渲染的。
当然这肯定减轻了客户端浏览器渲染的压力，不过最重要的问题也在这里，SSR 相当于把运算压力给到了服务器端，也就是说前端服务器需要承受动态渲染的压力。
实际情况就是前端服务器基本配置跑起来没问题，但是上了 SSR 之后，这服务器我们需要额外申请。
如果效果没有达标，这设备的问题很容易产生纠纷，这种问题很容易背锅啊

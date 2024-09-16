- [vue 入门概念](#vue-入门概念)
  - [注入](#注入)
  - [虚拟 dom 树](#虚拟-dom-树)
  - [挂载](#挂载)
  - [完整流程](#完整流程)
  - [vue 知识体系](#vue-知识体系)
    - [模板](#模板)
      - [内容](#内容)
      - [指令](#指令)
    - [配置](#配置)

## vue 入门概念

### 注入

![alt text](image-2.png)

![alt text](image-1.png)

### 虚拟 dom 树

直接操作真实的 DOM 会引发严重的效率问题，vue 使用虚拟（VNode）的方式来描述要渲染的内容
VNode 是一个普通的 js 对象，用于描述界面上有什么，比如：

```js
var vnode = {
  tag: "h1",
  children: [{ tag: undefined, text: "第一个vue应用：hello world" }],
};
```

上面的对象描述了：

> 有一个标签名为 h1 的节点，他有一个子节点，该子节点是一个文本，内容为【第一个 vue 应用：hello world】

vue 模板并不是真实的 DOM，它会被编译为虚拟 DOM

```html
<div id="app">
  <h1>第一个vue应用：{{title}}</h1>
  <p>作者：{{author}}</p>
</div>
```

上面的模板会被编译为类似下面结构的虚拟 DOM 树：

```js
{
    tag: "div",
    children: [
        {tag: "h1",children:[{text: "第一个vue应用：hello world"}]},
        {tag: "p",children:[{text: "作者gerry"}]},
    ]
}
```

再通过 vue 的虚拟 dom 树最终生成真实的 dom：

```html
<div id="app">
  <h1>第一个vue应用：hello world</h1>
  <p>作者：作者gerry</p>
</div>
```

![alt text](image-3.png)

当数据发生变化后，将引发重新渲染，vue 会比较新旧两棵 vnode tree,找出差异，然后仅仅把差异部分应用到真实 dom tree 中

![alt text](reactive.gif)

![alt text](image-4.png)

![alt text](image-5.png)

Vue 构造函数中会：

1. 判断有没有 render 函数，有则直接返回
2. 没有则检测有没有配置 tempalte，有则编译为 render 函数
3. 没有配置 template 则检测 el 属性有没有配置根节点，没有则报错

> 虚拟 dom 是具有单根性的。

### 挂载

vue 框架是渐进式的 可以只控制一个项目中的某一块儿 dom
挂载的方式：

1. 通过 el: "css 选择器" 进行配置
2. 通过 vue 实例.$mount("css 选择器")进行配置(比如异步读取一些项目配置文件，读取成功后才挂载 dom)

### 完整流程

![alt text](image-6.png)

### vue 知识体系

#### 模板

##### 内容

mustache 语法

##### 指令

1. v-bind
2. v-for
   > 循环加入 key 属性 提高渲染效率(新旧虚拟 dom 树对比效率)
3. v-on

#### 配置

1. data
2. computed
3. methods
4. template
5. render
6. el

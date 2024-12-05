- [vue3 中的面试题](#vue3-中的面试题)
  - [vue3 带来的效率提升](#vue3-带来的效率提升)
  - [API 和数据响应式的变化](#api-和数据响应式的变化)

# vue3 中的面试题

## vue3 带来的效率提升

- 静态提升

> 通过静态提升，Vue 3 可以在编译阶段将模板中的静态节点提升到 render 函数之外，这样在每次组件渲染时，就不需要重新创建静态节点，从而减少了渲染开销。

```html
<template>
  <div>
    <p>静态节点</p>
    <p>{{ msg }}</p>
  </div>
</template>
```

```js
import { ref } from "vue";
export default {
  setup() {
    const msg = ref("动态节点");
    return { msg };
  },
};
```

```js
// 编译后
import { createVNode as _createVNode } from "vue";
const hoisted1 = ceateVNode("p", null, "静态节点", 1 /* TEXT */);
export function render(_ctx, _cache) {
  return _createVNode("div", null, [
    hoisted1,
    _createVNode("p", null, _ctx.msg, 1 /* TEXT */),
  ]);
}
```

- 预字符串化

当遇到大量的静态节点时，Vue 3 会将这些静态节点的内容提取出来，然后通过字符串拼接的方式生成一个字符串，这样在渲染时就不需要再创建静态节点，而是直接使用字符串。

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>{{msg}}</li>
</ul>
```

```js
import { ref } from "vue";
export default {
  setup() {
    const msg = ref("动态节点");
    return { msg };
  },
};
```

```js
// 编译后
import { createVNode as _createVNode } from "vue";
export function render(_ctx, _cache) {
  return (_cache[0] || (_cache[0] = _createVNode("ul", null, [
    "<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>", _ctx.msg, "</li>"
  ]))
}
```

- 缓存事件处理函数

在 Vue 3 中，事件处理函数会被缓存，这样在每次组件渲染时，就不需要重新创建事件处理函数，从而减少了渲染开销。

```html
<template>
  <button @click="handleClick">点击</button>
</template>
```

```js
import { ref } from "vue";
export default {
  setup() {
    const msg = ref("动态节点");
    const handleClick = () => {
      console.log("click");
    };
    return { msg, handleClick };
  },
};
```

```js

// vue2-- 编译后
import { createVNode as _createVNode } from "vue";
export function render(_ctx) {
    return _createVNode("button", {
        onClick: _ctx.handleClick
    }, "点击")
}

// vue3-- 编译后
import { createVNode as _createVNode } from "vue";
export function render(_ctx, _cache) {
  return (_cache[0] || (_cache[0] = _createVNode("button", {
    onClick: _cache[1] || (_cache[1] = ($event) => _ctx.handleClick($event))
  }, "点击"))
}
```

- Block tree

vue2 中的 v-if 和 v-for 会生成多个 vnode，vue3 中会生成一个 block tree，减少了 vnode 的数量，提高了渲染性能。
patch 算法会根据 block tree 的树状结构，只对发生变化的节点进行更新，而不是对整个节点树进行更新。
会标记出哪些节点是静态的，哪些节点是动态的，只对动态节点进行更新。

- Patch flag

vue2 中的 patch 算法是通过递归对比新旧节点，找到差异后再更新，这样会对整个节点树进行更新，性能较低。
vue3 中引入了 patch flag，通过标记节点的类型，只对发生变化的节点进行更新，提高了渲染性能。

## API 和数据响应式的变化

- 去掉了构造函数

  1. 为什么 vue3 去掉了构造函数？
     在 vue2 中，通过 new Vue()创建的实例，会将实例挂载到 Vue 的原型上，这样会导致所有的实例共享同一个 Vue 原型，从而导致数据共享的问题。
     在 vue3 中，通过 createApp()创建的实例，会将实例挂载到 app 的原型上，这样就不会出现数据共享的问题。

  2. 谈谈你对 vue3 数据响应式的理解
     vue2 中通过 Object.defineProperty()实现数据响应式，这样会对对象的属性进行劫持，从而导致性能问题。
     它在 beforeCreate()之后 created 之前的钩子函数中会对 data 数据进行响应式处理，通过递归遍历 data 数据，将 data 数据中的属性转换为 getter 和 setter，从而实现数据的响应式。
     缺点：

     1. 递归遍历 data 数据，性能较低。
     2. 无法监听数组的变化，需要通过 hack 的方式实现对数组的监听。

     vue3 中通过 Proxy()实现数据响应式，Proxy()是 ES6 中新增的特性，它可以代理对象的属性，从而实现对对象的监听。
     在任何阶段都可以监听到对象的变化，不需要递归遍历对象，性能较高。

- 组件实例中的 API

- 对比数据响应式

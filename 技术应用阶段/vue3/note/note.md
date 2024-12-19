
- [Vue3](#vue3)
  - [Vue3的重大变化](#vue3的重大变化)
  - [watchEffect](#watcheffect)
  - [Vue3更利于逻辑抽离](#vue3更利于逻辑抽离)
  - [Vite 原理](#vite-原理)
  - [vue3 带来的效率提升](#vue3-带来的效率提升)
  - [API 和数据响应式的变化](#api-和数据响应式的变化)
  - [v-model](#v-model)
  - [v-for \& v-if](#v-for--v-if)
    - [key](#key)

# Vue3

`vue create vue3-app-vue-cli`
内部使用的webpack 打包构建过程太慢

`npm init vite-app vue3-app-vite`
优化过打包速度

## Vue3的重大变化

```js
//vue2 使用构造函数创建
const app = new Vue(options);
Vue.use(...);
app.$mount("#app")

// Vue3 
const app = createApp(App);
app.use(...);
app.mount("#app")
```

1. 访问的实例属性内容不同

    vue2 使用构造函数创建,这样创建出来的实例类似于组件实例，里面有很多不需要使用的属性
    vue3 中只提供了公开的属性 实例内部属性 不见了

2. this的指向不同

    vue2指向组件的实例
    vue3指向Proxy

## watchEffect

这个函数参数需要传入一个函数，在参数函数中的`ref`引用会被自动收集

```js
const todoRef = ref(0);
watchEffct(()=>{
    setTimeout(()=>{
        todoRef.value = 1;
    },3000);
});
```

## Vue3更利于逻辑抽离

功能逻辑高度聚合

```js
// useTodoList.js
export const useTodoList = ()=>{
    const todoRef = ref(0);
    return {todoRef};
}
```

```vue
<script>
//todo.vue
import {useTodoList} from "./useTodoList"

export default {
    setup:()=>{
        return {
            ...useTodoList()
        }
    }
}
</script>
<template>
    <h1>
        {{todoRef}}
    </h1>
</template>
```

## Vite 原理

  对比webpack

- webpack打包构建流程：

1. 给它一个入口文件
2. 它通过入口文件去找依赖(会找到很多的模块，这些模块包含js模块，css模块，包含图片)
3. webpack进行打包，通过loader、plugin等打包 生成打包文件
4. 启动一个开发服务器
5. 我们访问这个开发服务器 webpack就会把这些打包结果响应给我们

- vite打包构建流程：

1. 直接启动开发服务器(用koa启动的服务器)
2. 我们访问服务器地址，它把index.html文件内容响应给我们
3. `src="/src/main.js"` 页面上的入口文件会让浏览器自动发送请求
4. `main.js` 中包含什么模块，浏览器再请求这些文件内容

```html
<script type="module" src="/src/main.js"></script>
```

`type=module` 需要现代浏览器支持

- 总结
webpack耗时在先打包再启动开发服务器，vite直接启动开发服务器index.html中会自动发出请求进行后续模块读取，所以不管项目大小、模块多少vite的启动速度都非常快，因为它没有打包过程，不需要分析模块的依赖、不需要编译
HMR方面，当改动了一个模块后，仅需让浏览器重新请求该模块即可，不需要像webpack那样 需要把该模块的相关依赖模块全部编译一次
当需要打包到生产环境时，vite使用传统的rollup进行打包   所以**vite的优势主要还是在开发阶段**
注意点：Vite使用的是 ES Module，因此在代码中不可以使用CommonJS语法

那为什么vue2使用webpack可以使用CommonJS的语法呢,例如：`require("./style.css")`:
因为webpack是先打包，打包完了就没有require等语法了，只剩下立即执行函数等js代码
vite没有打包,直接用浏览器请求的方式 浏览器不认识require等commonjs语法

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

## v-model

vue2中提供了两种双向绑定：`v-model` 和 `.sync`,在vue3中移除了`.sync`修饰符
但是为了让`v-model`更好的针对多个属性进行双向绑定，vue3做出了以下修改

- 当对自定义组件使用`v-model`指令时，绑定的属性名由原来的value变为**modelValue**,事件名由原来的input变为 **update:modelValue**

```vue
<!-- vue2 -->
<ChildComponent :value="title" @input="title = $event"/>
<!-- 简写 -->
<ChildComponent v-model="title"/>


<!-- vue3 -->
<ChildComponent :modelValue="title" @update:modelValue="title = $event"/>
<!-- 简写 -->
<ChildComponent v-model="title" />
```

语法：v-model:[myPropName]   = :[myPropName]  @update:[myPropName]

- 去掉了`.sync` 修饰符，它原本的功能由 `v-model` 的参数代替

```vue
<!-- vue2 -->
<ChildComponent :title="title" @update:title="title = $event"/>
<!-- 简写 -->
<ChildComponent :title.sync="title"/>


<!-- vue3 -->
<ChildComponent :title="title" @update:title="title = $event"/>
<!-- 简写 -->
<ChildComponent v-model:title="title" />
```

- 允许自定义`v-model` 修饰符
vue2 无此功能

v-model:[myPropName].[modifiersName]
属性传递名称.修饰符名称

```vue
<CheckEditor v-model="checked" v-model:title.trim="title" />
```

```js
export default {
    props: {
        title: String,
        titleModifiers: {
            type: Function,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        const handleTextChange = (e) => {
        let value = e.target.value;
        if (props.titleModifiers.trim) {
            value = value.trim();
        }
        emit("update:title", value);
        };
    }
}
```

这样就完成了.trim修饰符去空格功能

## v-for & v-if

在vue2中
`<template v-for="(item,index) in sellings" v-if="item.sell">` v-for跟v-if同时使用时v-for的优先级高于v-if,就是说v-for中循环的item在v-if中还可以使用
但是vue官方不推荐，因为影响渲染效率，如果数组中的某一项v-if判断为true则循环数组长度的数量，当我们改动了数组其他项的item.sell时dom元素又将重新渲染整个数组

vue3中 v-if的优先级高于 v-for 这将访问不到item项了做了异常抛出处理
推荐用computed过滤完之后直接遍历计算属性

### key

vue3中允许只在循环遍历的根节点上写 **:key**
其他分支元素上可以不用在做标记
 举例：

```html
<div>
    <div v-if="show" key="1">手机号：
        <input/>
    </div>
    <div v-else key="2">邮箱：
        <input/>
    </div>
    <button @click="toggle"></button>
</div>
```

 vue2中在显示手机号时输入的值 切换到邮箱时 值仍然保留着 需要给分支标记一个自定义key值
 vue3取消了这种做法更新时自动做了标记

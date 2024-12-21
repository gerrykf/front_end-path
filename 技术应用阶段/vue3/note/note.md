
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
  - [组件中的变化](#组件中的变化)
  - [reactivity api](#reactivity-api)
    - [获取数据响应式](#获取数据响应式)
      - [笔试题1：下面代码的输出结果](#笔试题1下面代码的输出结果)
      - [笔试题2：按照下面的要求完成函数](#笔试题2按照下面的要求完成函数)
      - [笔试题3：按照下面的要求完成函数](#笔试题3按照下面的要求完成函数)
    - [监听数据变化](#监听数据变化)
      - [watchEffct](#watcheffct)
      - [watch](#watch)
      - [笔试题：下面的结果输出什么？](#笔试题下面的结果输出什么)
    - [判断](#判断)
    - [转换](#转换)
    - [降低心智负担](#降低心智负担)
  - [compisition API](#compisition-api)
    - [setup](#setup)
      - [面试题 composition api 相比于 option api 有哪些优势？](#面试题-composition-api-相比于-option-api-有哪些优势)

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

## 组件中的变化

更新了teleport来改变元素结构

更新了defineAsyncComponent

示例[D:\LearnFolder\front_end-path\技术应用阶段\vue3\深入\组件中的变化\demo\src\utils\index.ts]

## reactivity api

### 获取数据响应式

| API      | 传入                  | 返回       | 备注                                                                                                             |
| -------- | --------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------- |
| reactive | plain-object          | 对象代理   | 深度代理对象中的成员                                                                                             |
| readonly | plain-object or proxy | 对象代理   | 只能读取代理对象中的成员，不可修改                                                                               |
| ref      | any                   | {value...} | 对value的访问是响应式的，如果给value的值是一个对象，则会通过reactive函数进行代理，如果已经是代理，则直接使用代理 |
| computed | function              | {value...} | 当读取value值时，会根据情况决定是否要运行函数                                                                    |

应用场景：

- 如果想要让一个对象变成响应式数据，可以使用reactive or ref
- 如果想要让一个对象的所有属性只读，使用readonly
- 如果想要让一个非对象数据变成响应式数据，使用ref
- 如果想要根据已知的响应式数据得到一个新的响应式数据，使用computed

#### 笔试题1：下面代码的输出结果

题目：

```js
import { reactive, ref, watchEffect, readonly, computed } from "vue";

const state = reactive({
  firstName: "Xu Ming",
  lastName: "Deng",
});

const fullName = computed(() => {
  console.log("fullName-changed");
  return state.lastName + "" + state.firstName;
});
console.log("state ready"); 
console.log("fullName is", fullName.value); 
console.log("fullName is", fullName.value); 

const imState = readonly(state);
console.log(imState === state); 

const stateRef = ref(state);
console.log(stateRef.value === state); 

state.firstName = "Cheng";
state.lastName = "Ji";

console.log(imState.firstName, imState.lastName); 
console.log("fullName is", fullName.value); 
console.log("fullName is", fullName.value); 

const imState2 = readonly(stateRef);
console.log(imState2 === stateRef); 
```

解答：

```js
import { reactive, ref, watchEffect, readonly, computed } from "vue";

const state = reactive({
  firstName: "Xu Ming",
  lastName: "Deng",
});

const fullName = computed(() => {
  console.log("fullName-changed");
  return state.lastName + "" + state.firstName;
});
console.log("state ready"); //state ready
console.log("fullName is", fullName.value); //Deng Xu Ming
console.log("fullName is", fullName.value); //Deng Xu Ming

const imState = readonly(state);
console.log(imState === state); // false

const stateRef = ref(state);
console.log(stateRef.value === state); // true

state.firstName = "Cheng";
state.lastName = "Ji";

console.log(imState.firstName, imState.lastName); //Cheng Ji
console.log("fullName is", fullName.value); // Ji Cheng
console.log("fullName is", fullName.value); // Ji Cheng

const imState2 = readonly(stateRef);
console.log(imState2 === stateRef); // false

/**
 * 代码解读：
 * 1. reactive 创建一个响应式对象 state
 * 2. computed 创建一个计算属性 fullName,只在使用的时候才会计算，并且会缓存计算结果
 * 3. readonly 创建一个只读对象 imState ，拿到的是一个新的代理对象 所以 imState !== state
 * 4. ref 创建一个引用对象 stateRef ，ref()的入参是一个代理对象，它会赋值到{value..}上面 所以 stateRef.value === state
 * 5. state.firstName = "Cheng"; state.lastName = "Ji"; 修改state的值，imState 和 fullName 都会更新，因为响应式数据会通知依赖的地方更新
 * 6. imState2 是一个只读对象，拿到的是一个新的代理对象，而stateRef时一个{value..}对象，
 * 只有imState2 === stateRef.value让两个代理对象的引用做对比才成立，所以 imState2 !== stateRef
 */
/**
 * 输出结果：
 * 1. state ready
 * 2. fullName-changed
 * 3. fullName is Deng Xu Ming
 * 4. fullName is Deng Xu Ming
 * 5. false
 * 6. true
 * 7. Cheng Ji
 * 8. Ji Cheng
 * 9. Ji Cheng
 * 10. false
 */
```

#### 笔试题2：按照下面的要求完成函数

题目：

```js
function useUser() {
  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的姓名
    setUserAge, // 这是一个函数，传入用户年龄，用于修改用户的年龄
  };
}
```

解答：

```js
import { reactive, readonly } from "vue";

function useUser() {
  const userState = reactive({});
  const user = readonly(userState);

  const setUserName = (name) => {
    userState.name = name;
  };

  const setUserAge = (age) => {
    userState.age = age;
  };
  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的姓名
    setUserAge, // 这是一个函数，传入用户年龄，用于修改用户的年龄
  };
}

const { user, setUserName, setUserAge } = useUser();

console.log(user); // {}
setUserName("Xu Ming");
setUserAge(18);
console.log(user); // {name: "Xu Ming", age: 18}

/**
 * 代码解读：
 * userState的属性值是响应式数据，当属性值发生变化时，会通知依赖的地方更新
 * user是一个只读对象，只能读取属性值，不能修改属性值
 * 但是可以通过setUserName和setUserAge方法修改属性值
 * 会触发user响应式数据的更新
 */

```

#### 笔试题3：按照下面的要求完成函数

题目：

```js
function useDebounce(obj,duration){
  // 在这里补全函数
  return {
    value,// 这里是一个只读对象，响应式数据，默认值为参数值
    setValue,// 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  }
}
```

解答：

```js
import { reactive, readonly } from "vue";

function useDebounce(obj, duration) {
  // 在这里补全函数
  const valueState = reactive(obj);
  const value = readonly(valueState);
  let timer = null;
  const setValue = (newObj) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      for (let key in newObj) {
        valueState[key] = newObj[key];
      }
    }, duration);
  };

  return {
    value, // 这里是一个只读对象，响应式数据，默认值为参数值
    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  };
}

const { value, setValue } = useDebounce({ name: "Xu Ming" }, 1000);

console.log(value); // {name: "Xu Ming"}
setValue({ name: "Deng" });
// 这1秒期间，不会触发value的更新
console.log(value); // {name: "Xu Ming"}
setTimeout(() => {
  console.log(value); // {name: "Deng"}
}, 2000);
```

### 监听数据变化

#### watchEffct

```js
const stop = watchEffct(()=>{
  // 该函数会立即执行，然后追踪函数中用到的响应式数据，响应式数据变化后会再次执行
});

// 调用stop函数会停止监听
stop();// 停止监听
```

#### watch

```js
// 等效于vue2中的$watch

// 监听单个数据的变化
const state = reactive({count:0});
// reactive必须使用函数式调用 形成一个表达式 才能收集到依赖
watch(()=>state.count,(newValue,oldValue)=>{
// ...
},options);

const countRef = ref(0);
// ref数据可以不用函数式调用，因为countRef中包含了{value...} 值没有被展开 可以收集到依赖
watch(countRef,(newValue,oldValue)=>{
// ...
},options);

// 监听多个数据的变化
watch([()=>state.count,countRef],([new1,new2],[old1,old2])=>{});
```

注意：无论是watchEffct还是watch 它们的回调函数都是异步的(微队列)

应用场景：除非遇到下面的场景，否则均建议选择watchEffct

- 不希望回调函数一开始执行
- 数据改变时，需要参考旧值
- 需要监控一些回调函数中不希望被收集依赖的数据

#### 笔试题：下面的结果输出什么？

```js
import { reactive, watch, watchEffect } from "vue";

const state = reactive({
  count: 0,
});

watchEffect(() => {
  console.log("watchEffect", state.count);
});

watch(
  () => state.count,
  (count, oldVal) => {
    console.log("watch", count, oldVal);
  }
);

console.log("start");

setTimeout(() => {
  console.log("setTimeout");
  state.count++;
  state.count++;
});

state.count++;
state.count++;

console.log("end");


/**
 * 输出结果：
 * 1. watchEffect 0
 * 2. start
 * 3. end
 * 4. watchEffect 2
 * 5. watch 2 0
 * 6. setTimeout
 * 7. watchEffect 4
 * 8. watch 4 2
 */

/**
 * 代码解读：
 * 1. watchEffect 会立即执行一次，同时收集依赖 state.count
 * 2. watchEffect 会在同步任务执行完后执行
 * 3. watch 会在同步任务执行完后执行
 * 4. setTimeout 是宏任务，会在微任务(watchEffct、watch)执行完后执行
 * 5. 监听函数不管改变多少次，只会触发一次
 */
```

### 判断

| API        | 含义                                         |
| ---------- | -------------------------------------------- |
| isProxy    | 判断某个数据是否由 reactive 或readonly创建的 |
| isReactive | 判断某个数据是否是通过 reactive 创建的       |
| isReadonly | 判断某个数据是否是通过 readonly 创建的       |
| isRef      | 判断某个数据是否是一个 ref 对象              |

### 转换

- unref
等同于： isRef(val) ? val.value : val
应用场景：

```js
function useNewTodo(todos){
 todos = unref(todos);// 不管传什么类型的响应式数据进来  都转成 ref 形式
 //...
}
```

- toRef
得到一个响应式对象某个属性的ref格式

```js
const state = reactive({
  foo:1,
  bar:2
});

const fooRef = toRef(state,'foo');// fooRef:{value: ...}

fooRef.value++;
console.log(state.foo);// 2

state.foo++;
console.log(fooRef.value);// 3
```

- toRefs
把一个响应式对象的所有属性转化为ref格式，然后包装到一个plain-object 中返回

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);// stateAsRefs 现在是一个普通对象，它的每一个属性是ref对象{value: ...}

console.log(stateAsRefs.foo.value); // 1
console.log(stateAsRefs.bar.value); // 2

console.log(isProxy(stateAsRefs.foo)); // false
console.log(isRef(stateAsRefs.foo)); // false
```

应用场景：

```js
setup(){
  const state1 = reactive({a:1,b:2});
  const state2 = reactive({c:3,d:4});
  return {
    ...state1,// lost reactivity
    ...state2,// lost reactivity
  }
}

setup(){
  const state1 = reactive({a:1,b:2});
  const state2 = reactive({c:3,d:4});
  return {
    ...toRefs(state1),// reactivity
    ...toRefs(state2),// reactivity
  }
}

function usePos(){
  const pos = reactive({x:0,y:0});
  return pos;
}

setup(){
  const {x,y} = usePos();// lost reactivity
  const {x,y} = toRefs(usePos());// reactivity
}
```

### 降低心智负担

为了避免编写的代码展开后失去响应性 导致的心智负担，所有的composition function均以 ref的结果返回，
以保证 setup 函数的返回结果中不包含 reactive 或 readonely 直接产生的数据

```js
function usePos(){
  const pos = reactive({x:0,y:0});
  return toRefs(pos);
}
function useBooks(){
  const books = ref([]);
  return {
    books // books is refobj
  }
}
function useLoginUser(){
  const user = readonly({
    isLogin:false,
    loginId:null
  });
  return torefs(user);// {isLogin:refObj,loginId:refObj} all ref is readonly
}

setup(){
  // 在setup函数中，尽量保证解构、展开出来的所有响应式数据均是ref
  return {
    ...usePos(),
    ...useBooks(),
    ...useLoginUser()
  }
}
```

## compisition API

不同于reactivity api,composition api 提供的函数很多是与组件深度绑定的

### setup

```js
export default {
  setup(props,context){
    // 该函数在属性被赋值后立即执行，早于所有声明周期钩子函数
    // props 是一个对象，包含了所有的组件属性
    // context 是一个对象，提供了组件所需上下文信息
  }
}

```

context对象的成员：

| 成员  | 类型 | 说明                |
| ----- | ---- | ------------------- |
| attrs | 对象 | 同Vue2的this.$attrs |
| slots | 对象 | 同Vue2的this.$slots |
| emit  | 方法 | 同Vue2的this.$emit  |

- 生命周期函数
| vue2 option api | vue3 option api    | vue3 compisition api           |
| --------------- | ------------------ | ------------------------------ |
| beforeCreate    | beforeCreate       | 不再需要 代码可直接置于setup中 |
| created         | created            | 不再需要 代码可直接置于setup中 |
| beforeMount     | beforeMount        | onBeforeMount                  |
| mounted         | mounted            | onMounted                      |
| beforeUpdate    | beforeUpdate       | onBeforeUpdate                 |
| updated         | updated            | onUpdated                      |
| beforeDestory   | 改 beforeUnmount   | onBeforeUnMount                |
| destoryed       | 改 unmounted       | onUnmounted                    |
| errorCaptured   | errorCaptured      | onErrorCaptured                |
| -               | 新 renderTracked   | onRenderTracked                |
| -               | 新 renderTriggered | onRenderTriggered              |

新增钩子函数说明：

| 钩子函数        | 参数          | 执行时机                       |
| --------------- | ------------- | ------------------------------ |
| renderTracked   | DebuggerEvent | 渲染vdom收集到的每一次依赖时   |
| renderTriggered | DebuggerEvent | 某个依赖变化导致组件重新渲染时 |

DebuggerEvent:

- target:跟踪或触发渲染的对象
- key:跟踪或触发渲染的属性
- type:跟踪或触发渲染的方式

#### 面试题 composition api 相比于 option api 有哪些优势？

> 两个方面：
>
> 1. 为了更好的逻辑复用和代码组织
> 2. 更好的类型推导
有了composition api，配合reactivity api，可以在组件内部进行更加细粒度的控制，使得组件中不同的功能能高聚合，提升了代码的可维护性。对于不同组件的相同功能，也能更好的复用。
相比于option api,composition api中没有了指向奇怪的this,所有的api变得更加函数式，这有利于和类型推断系统 比如TS深度配合。


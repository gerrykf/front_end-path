# 浏览器或者 node 环境都会提供一个全局对象

- 浏览器环境：window
- node 环境： global

## 全局对象有一下几个特点

1. 全局对象的属性可以直接访问

```js
console.log() === window.console.log();
```

2. 给未声明的变量赋值，实际就是给全局对象的属性赋值(永远不要这么干)

```js
a = 1;
console.log(a); // 1 === window.a
```

## 多个 js 造成的全局污染

```js
//1.js
var a = 1; // 不希望暴漏在全局对象中，但是直接这样写就污染了全局,其他js文件时可以访问到的

function b() {} // 希望暴漏在全局对象中

//2.js
console.log(a); // 1
b();
```

## 解决 js 的全局污染

- 使用立即函数改变其作用域

```js
// 1.js
var module1 = (function(){
    var a = 1;
    var b = 2;
    function c(){
        console.log(a+b);
    }

    return {
        b:b,
        c:c
    }
})();

// 2.js
(function(){
    console.log(module1.b);
    module1.c();
})();

这样解决了1.js中a不想暴漏在全局对象中
立即函数的做法就是将其所有变量跟函数声明全部归纳在函数作用域中，全局属于外部，外部不能访问内部的变量跟函数声明
```

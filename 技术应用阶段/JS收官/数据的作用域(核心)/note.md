- [JS 中 的数据作用域](#js-中-的数据作用域)
  - [js 中只有两种作用域](#js-中只有两种作用域)
    - [函数内部的作用域是可以访问全局的变量](#函数内部的作用域是可以访问全局的变量)
    - [外部是不能访问函数内部的变量的](#外部是不能访问函数内部的变量的)
    - [函数内部查找变量时 是由内而外查找](#函数内部查找变量时-是由内而外查找)
    - [函数内部的作用域中访问外部变量时会产生闭包](#函数内部的作用域中访问外部变量时会产生闭包)
    - [内部作用域能访问的外部，取决于函数定义的位置，和函数调用无关](#内部作用域能访问的外部取决于函数定义的位置和函数调用无关)
  - [作用域内定义的变量，函数声明会提升到作用域顶部](#作用域内定义的变量函数声明会提升到作用域顶部)

# JS 中 的数据作用域

## js 中只有两种作用域

1. 全局作用域
2. 函数作用域

```js
if (xxx) {
  var a = 1;
}

a属于全局作用域 `if(){}` 只是一个代码块
```

### 函数内部的作用域是可以访问全局的变量

```js
var a = 1;
function m() {
  a++;
}
m(); //2
```

### 外部是不能访问函数内部的变量的

```js
function m() {
  var a = 1;
  a++;
}

console.log(a); // error, it's not defined
```

### 函数内部查找变量时 是由内而外查找

```js
var a = 1;
function m() {
  var a = 1;
  a++;
}
console.log(a); // 1
函数自增的内部的a 所以外部的a没有变化

包括形参也是函数内部的变量：like this:
var a = 1;
function m(a){
    a++;
}

console.log(a); // 1
```

### 函数内部的作用域中访问外部变量时会产生闭包

```js
var a = 1;
function m() {
  a++;
}

m();
console.log(a); // 2
```

### 内部作用域能访问的外部，取决于函数定义的位置，和函数调用无关

```js
var a = 1;

function m() {
  a++;
}

function m2() {
  var a = 3;
  m(); // m函数使用的a是函数定义的时候，外部的a(是全局的a，不是m2内部的)
  console.log(a); // 3
}

m2();
console.log(a); // 2
```

## 作用域内定义的变量，函数声明会提升到作用域顶部

```js
console.log(a, m,b); // undefined [Function: m]  undefined
var a = 1;
var b = function m(){};
function m() {}

在变量或函数定义前使用变量或函数 在其他语言中是会出现编译错误的，但是在JS语言中 是可以使用到的
like this:

var a; // 变量和函数声明会提升到顶部
var b;
function m(){}
console.log(a,m,b);
a = 1;// 这里只做赋值操作
b = function m(){}

但是如果这种写法在函数声明前调用则会提示错误：
b();// b is not a function
var b = function (){}
b();// nth...

函数内部也是如此：
function m(){
    console.log(a,b,c);// undefined [Function: b] undefined
    var a = 1;
    function b(){}
    var c = function(){}
}

提升过程：
function m(){
    `var a;
    function b(){}
    var c;`
    console.log(a,b,c);// undefined [Function: b] undefined
    a = 1;
    function b(){}
    c = function(){}
}
```

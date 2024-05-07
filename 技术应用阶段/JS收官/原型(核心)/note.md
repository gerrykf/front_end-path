- [原型](#原型)
  - [原型是什么？](#原型是什么)
  - [原型解决了什么问题？](#原型解决了什么问题)

# 原型

## 原型是什么？

![alt text](image.png)

1. 原型
   每个函数都会附带一个属性 **prototype**,这个属性的值是一个普通对象，称之为原型对象
2. 实例(instance)
   构造函数 new 出来的对象(由于 JS 中所有的对象都是通过 new 产生的，所以严格来说，JS 中所有对象都称为都称为实例)
3. 隐式原型
   每个实例都拥有一个特殊的属性 **\_\_proto\_\_**,称之为隐式原型，它指向构造函数的原型

## 原型解决了什么问题？

先看一个正常书写代码的案例：

```js
function User(name, age) {
  //var this = {}; // 隐式创建
  this.name = name;
  this.age = age;
  this.sayHi = function () {
    return "我是" + name + ",今年" + age + "岁";
  };
  // return this; // 隐式返回
}

var u1 = new User('张三'，18);
var u2 = new User('李四'，19);
console.log(u1.sayHi===u2.sayHi);// false

```

> 这个做法的缺陷就是每个用户都有一个 sayHi 函数 ，但是这个函数都是一样的，函数就是对象 因此**每个 user 都会有一个 sayHi 函数占用内存空间**

> 原型的意义：
> **当访问实例成员时，先找自身，如果不存在，会自动从隐式原型中寻找**

通过原型 我们可以把公用的函数或属性都放在原型这个普通对象上，即可被所有实例共享
注意：构造函数的 **prototype**与实例的隐式原型 **\_\_proto\_\_**指向的是同一个对象地址

```js
console.log(u1.__proto__ === User.prototype);
```

![alt text](image-1.png)

改造下上面的代码

```js
function User(name, age) {
  //var this = {}; // 隐式创建
  this.name = name;
  this.age = age;
  // return this; // 隐式返回
}

User.sayHi = function () {
  return "我是" + this.name + ",今年" + this.age + "岁";
};

var u1 = new User('张三'，18);
var u2 = new User('李四'，19);

u1.sayHi();
u2.sayHi();

// 如果创建对象够多  会节约大量的内存空间
console.log(u1.sayHi===u2.sayHi);// true

先找自身 自身没有该函数或属性时找原型对象，原型对象中没有时 会提示错误
```

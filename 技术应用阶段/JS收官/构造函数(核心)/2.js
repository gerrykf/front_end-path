// JS中所有的对象都是通过构造函数创建的，包括内置对象，例如：Object、Array、Function等，也包括自定义对象。

// 语法糖
// var obj = {
//   name: "Tom",
//   age: 18,
//   sayHi: function () {
//     console.log("Hi, I am " + this.name);
//   },
// };

// 构造函数
var obj = new Object(); // 创建一个空对象
obj.name = "Tom";
obj.age = 18;
obj.sayHi = function () {
  console.log("Hi, I am " + this.name);
};

// var arr = [1, 2, 3];
var arr = new Array(1, 2, 3); // 创建一个数组对象

// function sum(a, b) {
//   return a + b;
// }

var sum = new Function("a", "b", "return a + b");
console.log(sum(1, 2));

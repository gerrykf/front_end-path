"use strict";

Function.prototype.myBind = function (context) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (typeof this !== "function") {
    throw new TypeError('"myBind must be called on a function"');
  }

  var fn = this; // 保存原函数

  return function boundFucntion() {
    for (var _len2 = arguments.length, innerArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      innerArgs[_key2] = arguments[_key2];
    }

    return fn.apply(this instanceof boundFucntion ? this : context, // 判断是否是构造函数调用
    [].concat(args, innerArgs));
  };
};

function greating(greating) {
  console.log(greating, "My name is ".concat(this.name, ", I am ").concat(this.age, " years old"));
}

var person = {
  name: "Jack",
  age: 18
};
var boundGreating = greating.myBind(person, "Hello");
boundGreating(); // Hello My name is Jack, I am 18 years old

function FnConstructor(name, age) {
  this.name = name;
  this.age = age;
}

var boundGreating2 = FnConstructor.myBind(null);
var tom = new boundGreating2("Tom", 20);
console.log(tom); // FnConstructor { name: 'Tom', age: 20 }
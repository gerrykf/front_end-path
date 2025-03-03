"use strict";

Function.prototype.myCall = function (context) {
  var _context;

  // 异常处理
  if (typeof this !== "function") {
    throw new TypeError('"myCall must be called on a function"');
  } // 如果context为null或者undefined，则指向globalThis


  context = context || globalThis; // 创建一个唯一的Symbol值，防止fn覆盖context原有属性

  var fnSymbol = Symbol("fn"); // 将函数挂载到context上

  context[fnSymbol] = this; // 执行函数

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var result = (_context = context)[fnSymbol].apply(_context, args); // 删除函数


  delete context[fnSymbol]; // 返回结果

  return result;
};

function greating(greating) {
  console.log(greating, "My name is ".concat(this.name, ", I am ").concat(this.age, " years old"));
}

var person = {
  name: "Jack",
  age: 18
};
greating.myCall(person, "Hello");
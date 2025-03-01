"use strict";

var person = {
  name: "张三",
  age: 25
};
var handler = {
  get: function get(target, key) {
    console.log("\u8BFB\u53D6\u5C5E\u6027: ".concat(key));
    return key in target ? target[key] : "属性不存在";
  },
  set: function set(target, key, value) {
    console.log("\u4FEE\u6539\u5C5E\u6027: ".concat(key, " => ").concat(value));
    target[key] = value;
    return true;
  }
};
var proxy = new Proxy(person, handler);
console.log(proxy.name); // 读取属性: name -> '张三'

proxy.age = 30; // 修改属性: age => 30

console.log(proxy.age); // 30

console.log(proxy.job); // 读取属性: job -> '属性不存在'
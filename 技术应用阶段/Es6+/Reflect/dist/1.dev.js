"use strict";

var obj = {
  name: "Tom",
  age: 20
};
var proxy = new Proxy(obj, {
  get: function get(target, key) {
    console.log("\u8BBF\u95EE\u5C5E\u6027 ".concat(key));
    return Reflect.get(target, key); // 等价于 target[key]
  },
  set: function set(target, key, value) {
    console.log("\u8BBE\u7F6E ".concat(key, " \u4E3A ").concat(value));
    return Reflect.set(target, key, value);
  }
});
proxy.name; // 访问属性 name

proxy.age = 30; // 设置 age 为 30

console.log(Reflect.has({
  name: '张三'
}, 'name')); // true

console.log(Reflect.has({
  name: '张三'
}, 'age')); // false
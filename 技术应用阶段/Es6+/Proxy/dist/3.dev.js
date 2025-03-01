"use strict";

var obj = {
  name: "Alice",
  age: 25
};
var readonly = new Proxy(obj, {
  set: function set(target, key, value) {
    console.warn("\u4E0D\u80FD\u4FEE\u6539 ".concat(key, "\uFF0C\u53EA\u8BFB\u6A21\u5F0F\uFF01"));
    return false;
  },
  deleteProperty: function deleteProperty() {
    console.warn("不能删除属性，已锁定！");
    throw new Error("不能删除属性，已锁定！");
  }
});
readonly.name = "Bob"; // 不能修改 name，只读模式！

delete readonly.age; // 不能删除属性，已锁定！
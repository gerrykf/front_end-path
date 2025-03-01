"use strict";

var obj = {
  1: 1,
  b: 2
};
var proxy = new Proxy(obj, {
  deleteProperty: function deleteProperty(target, key) {
    console.log("\u5220\u9664\u5C5E\u6027: ".concat(key));
    delete target[key];
    return true;
  }
});
delete proxy[1]; // 删除属性: 1

delete proxy.b; // 删除属性: b

delete proxy.c; // 删除属性: c
// Output:
// 删除属性: 1
// 删除属性: b
// 删除属性: c
const obj = { 1: 1, b: 2 };

const proxy = new Proxy(obj, {
  deleteProperty(target, key) {
    console.log(`删除属性: ${key}`);
    delete target[key];
    return true;
  },
});

delete proxy[1]; // 删除属性: 1
delete proxy.b; // 删除属性: b
delete proxy.c; // 删除属性: c
// Output:
// 删除属性: 1
// 删除属性: b
// 删除属性: c

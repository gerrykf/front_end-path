const obj = { name: "Alice", age: 25 };

const readonly = new Proxy(obj, {
  set(target, key, value) {
    console.warn(`不能修改 ${key}，只读模式！`);
    return false;
  },
  deleteProperty() {
    console.warn("不能删除属性，已锁定！");
    throw new Error("不能删除属性，已锁定！");
  },
});

readonly.name = "Bob"; // 不能修改 name，只读模式！
delete readonly.age; // 不能删除属性，已锁定！

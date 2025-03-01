const obj = { name: "Tom", age: 20 };

const proxy = new Proxy(obj, {
  get(target, key) {
    console.log(`访问属性 ${key}`);
    return Reflect.get(target, key); // 等价于 target[key]
  },
  set(target, key, value) {
    console.log(`设置 ${key} 为 ${value}`);
    return Reflect.set(target, key, value);
  },
});

proxy.name; // 访问属性 name
proxy.age = 30; // 设置 age 为 30

console.log(Reflect.has({ name: '张三' }, 'name')); // true
console.log(Reflect.has({ name: '张三' }, 'age'));  // false


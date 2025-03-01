const person = {
  name: "张三",
  age: 25,
};

const handler = {
  get(target, key) {
    console.log(`读取属性: ${key}`);
    return key in target ? target[key] : "属性不存在";
  },
  set(target, key, value) {
    console.log(`修改属性: ${key} => ${value}`);
    target[key] = value;
    return true;
  },
};

const proxy = new Proxy(person, handler);

console.log(proxy.name); // 读取属性: name -> '张三'
proxy.age = 30; // 修改属性: age => 30
console.log(proxy.age); // 30
console.log(proxy.job); // 读取属性: job -> '属性不存在'

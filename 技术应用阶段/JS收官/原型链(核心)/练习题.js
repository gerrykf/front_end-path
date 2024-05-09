// 创建一个没有隐式原型的对象,随意添加一些属性

// example 1
var obj = Object.create(null);
obj.name = "zhangsan";
obj.age = 18;
console.log(obj);

// example 2
var obj2 = {
  name: "lisi",
  age: 20,
};

Object.setPrototypeOf(obj2, null);
console.log(obj2);

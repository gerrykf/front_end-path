// 为所有对象添加方式print,打印对象的键值对
Object.prototype.print = function () {
  for (var key in this) {
    // 判断是否是对象自身的属性
    if (this.hasOwnProperty(key))
      console.log(`对象的键值对: ${key}: ${this[key]}`);
  }
};

var obj = {
  a: "obja",
  b: "objb",
};

var obj2 = {
  a: "obj2a",
  b: "obj2b",
};

obj.print();
obj2.print();

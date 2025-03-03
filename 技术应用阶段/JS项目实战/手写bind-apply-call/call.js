Function.prototype.myCall = function (context, ...args) {
  // 异常处理
  if (typeof this !== "function") {
    throw new TypeError('"myCall must be called on a function"');
  }

  // 如果context为null或者undefined，则指向globalThis
  context = context || globalThis;
  // 创建一个唯一的Symbol值，防止fn覆盖context原有属性
  const fnSymbol = Symbol("fn");
  // 将函数挂载到context上
  context[fnSymbol] = this;
  // 执行函数
  const result = context[fnSymbol](...args);
  // 删除函数
  delete context[fnSymbol];
  // 返回结果
  return result;
};

function greating(greating) {
  console.log(greating, `My name is ${this.name}, I am ${this.age} years old`);
}

const person = {
  name: "Jack",
  age: 18,
};

greating.myCall(person, "Hello");

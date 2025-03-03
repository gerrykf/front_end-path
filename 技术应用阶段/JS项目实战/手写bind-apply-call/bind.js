Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError('"myBind must be called on a function"');
  }

  const fn = this; // 保存原函数

  return function boundFucntion(...innerArgs) {
    return fn.apply(
      this instanceof boundFucntion ? this : context, // 判断是否是构造函数调用
      [...args, ...innerArgs]
    );
  };
};

function greating(greating) {
  console.log(greating, `My name is ${this.name}, I am ${this.age} years old`);
}

const person = {
  name: "Jack",
  age: 18,
};

const boundGreating = greating.myBind(person, "Hello");
boundGreating();
// Hello My name is Jack, I am 18 years old

function FnConstructor(name, age) {
  this.name = name;
  this.age = age;
}
const boundGreating2 = FnConstructor.myBind(null);
const tom = new boundGreating2("Tom", 20);
console.log(tom);
// FnConstructor { name: 'Tom', age: 20 }

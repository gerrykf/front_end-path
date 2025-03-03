Function.prototype.myApply = function (context, args = []) {
  if (typeof this !== "function") {
    throw new TypeError('"myApply must be called on a function"');
  }

  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  context = context || globalThis;
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};

function greating(greating) {
  console.log(greating, `My name is ${this.name}, I am ${this.age} years old`);
}

const person = {
  name: "Jack",
  age: 18,
};

greating.myApply(person, ["Hello"]);
// Hello My name is Jack, I am 18 years old

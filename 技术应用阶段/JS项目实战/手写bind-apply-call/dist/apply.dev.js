"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Function.prototype.myApply = function (context) {
  var _context;

  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (typeof this !== "function") {
    throw new TypeError('"myApply must be called on a function"');
  }

  if (!Array.isArray(args)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  context = context || globalThis;
  var fnSymbol = Symbol("fn");
  context[fnSymbol] = this;

  var result = (_context = context)[fnSymbol].apply(_context, _toConsumableArray(args));

  delete context[fnSymbol];
  return result;
};

function greating(greating) {
  console.log(greating, "My name is ".concat(this.name, ", I am ").concat(this.age, " years old"));
}

var person = {
  name: "Jack",
  age: 18
};
greating.myApply(person, ["Hello"]); // Hello My name is Jack, I am 18 years old
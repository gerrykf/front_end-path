/**
 * ✅ Reflect.apply() 代替 Function.prototype.apply()
 * @param {*} name
 * @returns
 */

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(Reflect.apply(greet, null, ["张三"])); // Hello, 张三!

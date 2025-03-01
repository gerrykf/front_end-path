/**
 * ✅ 基本用法
 */

const key1 = Symbol("id");
const key2 = Symbol("id"); // 这是一个不同的 Symbol

console.log(key1 === key2); // false（Symbol 总是唯一的）

const user = {
  [key1]: 12345,
};
console.log(user[key1]); // 12345

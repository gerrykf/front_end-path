/**
 * ✅ Symbol 作为对象的 "私有" 属性
 * 
 * Symbol 属性不会被 Object.keys() 枚举，相当于隐藏私有数据。
 */

const SECRET_KEY = Symbol("secret");

const obj = {
  [SECRET_KEY]: "这是私有数据",
  name: "普通属性",
};

console.log(obj[SECRET_KEY]); // 这是私有数据
console.log(Object.keys(obj)); // ["name"]
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]

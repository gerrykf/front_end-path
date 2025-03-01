"use strict";

var _obj;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ✅ Symbol 作为对象的 "私有" 属性
 * 
 * Symbol 属性不会被 Object.keys() 枚举，相当于隐藏私有数据。
 */
var SECRET_KEY = Symbol("secret");
var obj = (_obj = {}, _defineProperty(_obj, SECRET_KEY, "这是私有数据"), _defineProperty(_obj, "name", "普通属性"), _obj);
console.log(obj[SECRET_KEY]); // 这是私有数据

console.log(Object.keys(obj)); // ["name"]

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]
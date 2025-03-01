"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ✅ 基本用法
 */
var key1 = Symbol("id");
var key2 = Symbol("id"); // 这是一个不同的 Symbol

console.log(key1 === key2); // false（Symbol 总是唯一的）

var user = _defineProperty({}, key1, 12345);

console.log(user[key1]); // 12345
"use strict";

/**
 * ✅ 用 Symbol 定义常量，避免魔法字符串
 *
 * 避免 "A"、"B" 这样的字符串硬编码，防止命名冲突。
 */
var TYPE_A = Symbol("A");
var TYPE_B = Symbol("B");

function getType(type) {
  switch (type) {
    case TYPE_A:
      return "类型 A";

    case TYPE_B:
      return "类型 B";

    default:
      return "未知类型";
  }
}

console.log(getType(TYPE_A)); // 类型 A
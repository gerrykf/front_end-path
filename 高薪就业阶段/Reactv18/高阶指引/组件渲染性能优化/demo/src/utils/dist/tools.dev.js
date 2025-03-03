"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectIsEqual = void 0;

/**
 * 对象浅比较
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
var objectIsEqual = function objectIsEqual(obj1, obj2) {
  for (var key in obj1) {
    if (!Object.is(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

exports.objectIsEqual = objectIsEqual;
var MyModule = (function (exports) {
  'use strict';

  /**
   * @description 求和
   * @param a
   * @param b
   * @returns a + b
   */
  function sum(a, b) {
      return a + b;
  }

  /**
   * 减法
   * @param a
   * @param b
   * @returns a - b
   */
  function sub(a, b) {
      return a - b;
  }

  exports.sub = sub;
  exports.sum = sum;

  return exports;

})({});

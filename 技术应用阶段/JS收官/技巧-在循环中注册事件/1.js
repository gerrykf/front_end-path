for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

/**
 * 相当于：
 * var i；
 * for (i = 0; i < 3; i++) {
 *  setTimeout(function () {
 *   console.log(i);
 *  });
 * }
 *
 * 因为js时异步的 所以它会先执行完for循环再执行setTimeout 也就是说当for循环执行完之后i的值为3
 */

// 解决方法1：使用闭包 函数提升会将形参i提升到函数内部
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 0);
  })(i);
}
// 等同于
for (var i = 0; i < 3; i++) {
  help(i);
}

function help(i) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}
/**
 * 但是我们一般用函数来抽离重复代码，所以可以直接写立即执行函数
 */

// 解决方法2：使用let
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 0);
}

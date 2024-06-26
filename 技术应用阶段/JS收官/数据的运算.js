/**
 * 编写一个完美的求和函数：
 * 1.若两个数据都是数字，则返回两个数字的和
 * 2.NaN的数据需要转成0
 * 3.其他类型的数据需要转成数字
 */

function sum(a, b) {
  // +a 转换成数字
  a = +a || 0;
  b = +b || 0;
  return a + b;
}

console.log(sum(1, 5)); // 3

var a = 1;

var b = a;

b = 2;
console.log(a, b);

/**
 * 交换两个变量的值
 * @param {*} a
 * @param {*} b
 */
function swap(a, b) {
  // a,b 形参 函数运行结束后 形参消失   这里是一个作用域，不会影响外部的变量
  var temp = a;
  a = b;
  b = temp;
}

const n1 = 1;
const n2 = 2;
swap(n1, n2); // 1,2

console.log(n1, n2);

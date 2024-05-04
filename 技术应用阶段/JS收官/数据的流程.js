/**
 * 1-100 求和
 */
function sum() {
  var sum = 0;
  for (var i = 1; i <= 100; i++) {
    sum += i;
  }
  return sum;
}

console.log(sum());

/**
 * 求某个数的阶乘
 */

function factorial(n) {
  if (n === 1) {
    return 1;
  }

  // 递归调用
  return n * factorial(n - 1);
}

console.log(factorial(6));

/**
 * 数组中是否存在某个元素，存在返回下标，不存在返回-1
 */

function indexOf(arr, target) {
  for (var i = 0; i < arr.length - 1; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

console.log(indexOf([1, 2, 3, 4, 5], 3));

/**
 * 输出一个对象的键值对
 */

function printObj(obj) {
  for (var key in obj) {
    console.log(key + ":" + obj[key]);
  }
}

printObj({ name: "张三", age: 18 });

/**
 * 将对象中的所有数字转变为字符串 并拼接￥符号 例如 {a: 1, b: 2} => {a: '￥1', b: '￥2'}
 */
var obj = {
  a: 1,
  b: 2,
  c: "abc",
  d: "def",
};
var newObj = {};

function objToString(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "number") {
      newObj[key] = "￥" + obj[key];
    } else {
      newObj[key] = obj[key];
    }
  }

  console.log(obj);
  console.log(newObj);
}

objToString(obj);

var a = {
  n: 1,
};

var b = a;

b.n = 2;

console.log(a.n, b.n);

/**
 * 交换对象两个属性的值
 * @param {*} obj
 * @param {*} k1
 * @param {*} k2
 */
function swap(obj, k1, k2) {
  // 形参的obj会接收实参的引用，所以这里的obj是实参的引用，所以会改变实参的值

  var temp = obj[k1];
  obj[k1] = obj[k2];
  obj[k2] = temp;
}

var obj = {
  n1: 1,
  n2: 2,
};

swap(obj, "n1", "n2");

console.log(obj.n1, obj.n2);

/**
 * 交换数组两个元素的值
 * @param {*} arr
 * @param {*} i
 * @param {*} j
 */
function swap(arr, i, j) {
  // 形参的arr会接收实参的引用，所以这里的arr是实参的引用，所以会改变实参的值
  // 数组也是对象 {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, length: 5}

  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

var arr = [1, 2, 3, 4, 5];

swap(arr, 0, 1);

console.log(arr);

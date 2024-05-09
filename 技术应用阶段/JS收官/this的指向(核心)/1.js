// 示例2
var obj = {
  a: 1,
  b: 2,
  m: function () {
    console.log(this); //
  },
};

var method2 = obj.m; // 这里将m函数的引用赋值到method2
method2();

// 下面的代码输出什么

var a = 1;
b = 2;

function m1() {
  console.log(a); // undefined 因为m1函数内部有定义a，所以不会去全局找a，但是变量提升后a的值是undefined
  var a = 3;
  function m2() {
    console.log(a, b); // 3 2 因为m2函数内部没有定义a，所以会它函数定义位置的外部找
  }
  m2();
}

m1();

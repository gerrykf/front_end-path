// 下面的代码输出什么? (京东)
Function.prototype.a = 1;
Object.prototype.b = 2;

function A() {}

var a = new A();

console.log(a.a, a.b); // undefined 2

// __proto__ 会一直向上查找
console.log(A.a, A.b); // 1 2

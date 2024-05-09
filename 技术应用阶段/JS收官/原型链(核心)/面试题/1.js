// 下面的代码输出什么?
function User() {}
User.prototype.sayHi = function () {};

var u1 = new User();
var u2 = new User();

console.log(u1.sayHi === u2.sayHi); // true 原型上的方法是共享的
console.log(User.prototype === Function.prototype); // false 这是两个对象的地址
console.log(User.__proto__ === Function.prototype); // true User是Function的实例
console.log(User.__proto__ === Function.__proto__); // true User跟Function的隐式原型都指向的Function的原型
console.log(u1.__proto__ === u2.__proto__); // true 实例的隐式原型是共享的
console.log(u1.__proto__ === User.__proto__); // false 实例的隐式原型是指向的User的原型,而User的隐式原型指向的是Function的原型
console.log(Function.__proto__ === Object.__proto__); // true Function和Object的隐式原型都指向的是Function的原型
console.log(Function.prototype.__proto__ === Object.prototype.__proto__); // false Function原型的隐式原型指向Object的原型,但是Object原型的隐式原型指向null
console.log(Function.prototype.__proto__ === Object.prototype); // true Function原型的隐式原型指向Object的原型

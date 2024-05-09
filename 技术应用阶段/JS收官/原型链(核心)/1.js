var a = {};
console.log(a.__proto__ === Object.prototype);

// 示例 函数上为什么会有 call & apply
function method() {}
// 因为 函数的隐式原型指向的Function的原型 Function的原型上有call&apply
console.log(method.apply === Function.prototype.apply); // true

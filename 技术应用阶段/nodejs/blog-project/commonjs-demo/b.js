const { add, sub } = require("./a.js");
const _ = require("lodash");

const sum = add(1, 2);
console.log(sum); // 3

const diff = sub(1, 2);
console.log(diff); // -1

const arr = [1, 2, 3, 4, 5];
const shuffledArr = _.shuffle(arr); // 随机打乱数组

console.log(shuffledArr); // [ 3, 1, 4, 5, 2 ]

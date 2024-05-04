/**
 * 查找函数中是否包含某个数
 * @param {Array} arr
 * @param {number} n
 */
function includes(arr, n) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      return true;
    }
  }
}

const nums = [3, 7, 8, 2, 9, 1];
const num1 = [3, 5, 7];
// /**
//  *判断num1中的数是否都在nums中存在
//  */
// function isAllIn() {
//   let isFind = false;
//   for (let i = 0; i < nums.length; i++) {
//     if (!includes(nums, num1[i])) {
//       isFind = true;
//       break;
//     }
//   }

//   return isFind;
// }

// console.log(
//   isAllIn() ? "num1中有nums中不存在的数" : "num1中的数都在nums中存在"
// );

function isAllIn2() {
  let result = { status: true, num: -1 };
  for (let i = 0; i < num1.length; i++) {
    result.status = result.status && includes(nums, num1[i]);
    result.num = num1[i];
    if (!result.status) {
      break;
    }
  }

  return result;
}

console.log(
  isAllIn2().status
    ? "num1中的数都在nums中存在"
    : `num1中有nums中不存在的数${isAllIn2().num}`
);

"use strict";

/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 *
 * 场景1：
 * 游戏开发
 * 场景：寻找资源组合
 * 在游戏中，玩家需要将两种资源组合在一起，达到目标值，解锁某个成就。
 *
 * 示例
 * 输入：nums 是玩家拥有的资源值，target 是目标值。
 * 输出：两种资源的索引，用于提示玩家完成任务。
 * --------------------------------------------------------------------------------
 * 场景2：
 * 购物车和电商系统
 * 场景：价格组合推荐
 * 在电商平台中，当用户输入预算时，可以推荐两种商品的组合，正好等于用户的预算。
 *
 * 示例
 * 输入：nums 是商品价格列表，target 是用户的预算。
 * 输出：两个商品的下标（或 ID），表示推荐的商品组合。
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function twoSum(nums, target) {
  var map = new Map(); // 创建一个map来存储数组的值和索引

  for (var i = 0; i < nums.length; i++) {
    var diff = target - nums[i]; // 计算差值

    if (map.has(diff)) {
      // 如果map中存在差值，返回差值的索引和当前索引
      return [map.get(diff), i];
    }

    map.set(nums[i], i); // 如果map中不存在差值，将当前值和索引存入map
  }

  return [];
};

var res = twoSum([2, 7, 11, 15], 9); // [0, 1]

var res2 = twoSum([6, 14, 4, 12, 20], 18);
console.log(res);
console.log(res2);

function twoSum2(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }

  return [];
}

var res3 = twoSum2([2, 7, 11, 15], 9); // [0, 1]

var res4 = twoSum2([6, 14, 4, 12, 20], 18);
console.log(res3);
console.log(res4);
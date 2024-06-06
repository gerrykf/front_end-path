/**
 *
 * @param {*} options
 * options = {
 * from: 100, // 起始值
 * to: 0, // 结束值
 * totalMS: 1000, // 总时间
 * duration: 15, // 每次变化的时间间隔
 * onmove: function(n) { // 每次变化的回调
 *  console.log(n);
 * },
 * onend: function() { // 动画结束的回调
 *  console.log('end');
 * }
 */
function createAnimation(options) {
  var from = options.from;
  var to = options.to;
  var totalMS = options.totalMS || 1000; //默认动画时间为1s
  var duration = options.duration || 15; //每次变化的时间间隔
  var times = totalMS / duration; //总帧数
  var dis = (to - from) / times; //每一次变化的值
  var curTimes = 0; //当前帧数

  var timerId = setInterval(function () {
    from += dis;
    curTimes++;
    if (curTimes >= times) {
      // 变化的次数达到总帧数时，停止动画
      from = to;
      clearInterval(timerId);
      options.onend && options.onend();
    }
    console.log(from);
    // 无数的可能性  可能是移动，可能是改变透明度，可能是改变大小
    options.onmove && options.onmove(from);
  }, duration);
}

// createAnimation({
//   from: 120,
//   to: 0,
//   totalMS: 500,
//   duration: 10,
//   onmove: function (n) {
//     console.log("回调", n);
//   },
//   onend: function () {
//     console.log("end");
//   },
// });

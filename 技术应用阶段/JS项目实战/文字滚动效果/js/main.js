(function () {
  var list = document.querySelector(".list");

  // 初始化做什么
  // 1.将列表的第一项复制一份放到列表的最后
  function cloneForstToEnd() {
    var firstItem = list.children[0].cloneNode(true);
    list.appendChild(firstItem);
  }

  cloneForstToEnd();

  var DURATION = 2000;
  setInterval(moveToNextItem, DURATION);

  var curIndex = 0;
  var itemHeight = 30;
  // 2. 滚动：每隔一段时间，让ul向上移动一段距离
  function moveToNextItem() {
    var from = curIndex * itemHeight;
    curIndex++;
    var to = curIndex * itemHeight;

    var totalDuration = 300;
    var interval = 10;
    var times = totalDuration / interval; // 变化的次数
    var dis = (to - from) / times; // 每次变化的距离

    var timerId = setInterval(function () {
      // 每循环一次 UL的scrollTop就变化一次
      from += dis;
      if (from >= to) {
        clearInterval(timerId);

        // 如果到达最后一项，就回到第一项
        if (curIndex >= list.children.length - 1) {
          from = 0;
          curIndex = 0;
        }
      }
      console.log(from);
      // 将列表滚动到下一个位置
      list.scrollTop = from;
    }, interval);
  }
})();

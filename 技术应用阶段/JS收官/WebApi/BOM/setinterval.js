var timerId;
var curIndex = 1;
var img = document.querySelector(".container img");

function start() {
  // 防止重复启动
  if (timerId) {
    return;
  }

  timerId = setInterval(function () {
    curIndex = (curIndex % 3) + 1;
    img.src = `./images/${curIndex}.jpg`;
  }, 1000);
}

function stop() {
  clearInterval(timerId);
  // 重置 timerId 为 null，表示定时器已经停止
  timerId = null;
}

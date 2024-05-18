var timerId;

function start() {
  // 防止重复启动
  if (timerId) {
    return;
  }

  timerId = setInterval(function () {
    console.clear();
    console.log(
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
    );
  }, 1000);
}

function stop() {
  clearInterval(timerId);
  // 重置 timerId 为 null，表示定时器已经停止
  timerId = null;
}

var doms = {
  video: document.querySelector("video"),
  play: document.querySelector("#play"),
  progress: {
    range: document.querySelector("#progress"),
    current: document.querySelector("#current"),
    total: document.querySelector("#total"),
  },
  rate: document.querySelector("#rate"),
  volumn: {
    range: document.querySelector("#volumn input[type='range']"),
    text: document.querySelector("#volumn span"),
  },
  buttons: {
    fullscreen: document.querySelector(".fullscreen"),
    save: document.querySelector(".save"),
    load: document.querySelector(".load"),
  },
  controls: document.querySelectorAll(".controls"),
};

// #region 初始化
doms.video.addEventListener("loadeddata", init);

function init() {
  /**
   * 视频第一帧加载完成后
   * 显示所有视频控制按钮
   */

  doms.controls.forEach((control) => {
    control.style.display = "block";
  });

  setProgress();
  setRate();
  setVolumn();
}

/**
 * 根据当前视频的进度设置进度条
 */
function setProgress() {
  doms.progress.current.style.width = 10 + "px";
  // 1. 设置文本
  doms.progress.current.innerText = formatTime(doms.video.currentTime);
  doms.progress.total.innerText = formatTime(doms.video.duration);

  // 2. 设置进度条 百分比
  let percent = (doms.video.currentTime / doms.video.duration) * 100;
  doms.progress.range.value = percent;
}

function setRate() {
  var value = doms.rate
    .querySelector("button.active")
    .getAttribute("data-value");

  console.log(value);

  doms.video.playbackRate = value;
}

function setVolumn() {
  var value = doms.volumn.range.value;
  doms.volumn.text.innerText = value;

  doms.video.volume = value / 100;
}

/**
 * 格式化时间为 hh:mm:ss
 * @param {*} time
 * @returns
 */
function formatTime(time) {
  // 每个时间单位都是两位数
  time = Math.floor(time);
  let h = Math.floor(time / 3600);
  let m = Math.floor((time % 3600) / 60);
  let s = time % 60;

  function _format(num) {
    return num.toString().padStart(2, "0");
  }

  return `${_format(h)}:${_format(m)}:${_format(s)}`;
}

// #endregion

// 交互

function togglePlay() {
  var timer;
  if (doms.video.paused) {
    doms.video.play();
    setProgress();
    timer = setInterval(setProgress, 1000);
  } else {
    doms.video.pause();
    clearInterval(timer);
  }
}

doms.play.addEventListener("click", togglePlay);

function changeRate(e) {
  if (e.target.tagName === "BUTTON") {
    doms.rate.querySelector("button.active").classList.remove("active");
    e.target.classList.add("active");

    setRate();
  }
}

var buttonRates = doms.rate.querySelectorAll("#rate button");
buttonRates.forEach((button) => {
  button.addEventListener("click", changeRate);
});

doms.volumn.range.addEventListener("input", setVolumn);

function fullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    doms.video.requestFullscreen();
  }
}

doms.buttons.fullscreen.addEventListener("click", fullscreen);

function save() {
  var process = doms.progress.range.value;
  var volumn = doms.volumn.range.value;
  var rate = doms.rate
    .querySelector("button.active")
    .getAttribute("data-value");

  var videoObj = {
    process: process,
    volumn: volumn,
    rate: rate,
  };

  localStorage.setItem("video-infos", JSON.stringify(videoObj));
}

doms.buttons.save.addEventListener("click", save);

function load() {
  var videoObj = JSON.parse(localStorage.getItem("video-infos"));

  doms.progress.range.value = videoObj.process;
  doms.volumn.range.value = videoObj.volumn;
  doms.rate.querySelector("button.active").classList.remove("active");
  doms.rate
    .querySelector(`button[data-value="${videoObj.rate}"]`)
    .classList.add("active");
}

doms.buttons.load.addEventListener("click", load);

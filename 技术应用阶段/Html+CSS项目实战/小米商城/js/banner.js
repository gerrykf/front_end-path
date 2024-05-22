var banner = (function () {
  var datas = [
    // 随机生成一些轮播图图片数据
    {
      img: "https://gd-hbimg.huaban.com/9bd8b87348578fc9b9ac59fdcae9731ae3317527268ed-GKVYnW_fw658webp",
      link: "https://huaban.com/pins/4881791200?from=similarMaterial&searchWord=%E5%95%86%E5%9F%8E%E8%BD%AE%E6%92%AD%E5%9B%BE",
    },
    {
      img: "https://gd-hbimg.huaban.com/2dcec6c8e51a662a6ed1bd8659a9cd63fb08e6b61be2c-6kdVpB_fw658webp",
      link: "https://huaban.com/pins/4881791200?from=similarMaterial&searchWord=%E5%95%86%E5%9F%8E%E8%BD%AE%E6%92%AD%E5%9B%BE",
    },
    {
      img: "https://gd-hbimg.huaban.com/f9d2acc58c3d9f0aecb42ac66cb4cdc0ef0c67a326872-gTpkYn_fw658webp",
      link: "https://huaban.com/pins/4881791200?from=similarMaterial&searchWord=%E5%95%86%E5%9F%8E%E8%BD%AE%E6%92%AD%E5%9B%BE",
    },
    {
      img: "https://gd-hbimg.huaban.com/d9d3d1b75848b5c74024e24992c47e7b8555a5c31dc44-U1VWxD_fw658webp",
      link: "https://huaban.com/pins/4881791200?from=similarMaterial&searchWord=%E5%95%86%E5%9F%8E%E8%BD%AE%E6%92%AD%E5%9B%BE",
    },
  ];

  /**
   * 1. 设置超链接的地址及图片路径
   * 2. 动态生成span元素
   * 3. 控制span元素的类样式
   */

  function $(selector) {
    return document.querySelector(selector);
  }
  var bannerDots = $(".banner-dots");
  var bannerCover = $(".banner-cover");
  var bannerCoverImg = $(".banner-cover img");
  var bannerPrev = $(".banner-pointer-left");
  var bannerNext = $(".banner-pointer-right");
  var banner = $(".banner");

  function init() {
    for (var i = 0; i < datas.length; i++) {
      var span = document.createElement("span");
      span.className = "banner-dot fl";
      bannerDots.appendChild(span);
    }

    if (datas.length > 0) {
      change(0);
    }
  }

  init();

  function change(index) {
    var d = datas[index];
    bannerCover.href = d.link;
    bannerCoverImg.src = d.img;

    // bannerDot的选中状态
    // 移除之前的选中状态
    var selectedSpan = bannerDots.querySelector(".banner-dot-active");
    if (selectedSpan) {
      selectedSpan.className = "banner-dot fl";
    }
    var span = bannerDots.children[index];
    span.className = "banner-dot-active fl";
  }

  var curIndex = 0;

  function toPrev() {
    curIndex--;
    if (curIndex < 0) {
      curIndex = datas.length - 1;
    }

    change(curIndex);
  }

  function toNext() {
    curIndex++;
    if (curIndex >= datas.length) {
      curIndex = 0;
    }
    change(curIndex);
  }

  bannerPrev.onclick = toPrev;
  bannerNext.onclick = toNext;

  // 下面的小点
  for (var i = 0; i < bannerDots.children.length; i++) {
    (function (i) {
      var span = bannerDots.children[i];
      span.onclick = function () {
        curIndex = i;
        change(i);
      };
    })(i);
  }

  // 自动轮播
  var timerId;
  function start() {
    if (timerId) {
      return;
    }
    timerId = setInterval(toNext, 2000);
  }

  start();

  function stop() {
    clearInterval(timerId);
    timerId = null;
  }

  banner.onmouseenter = stop;
  banner.onmouseleave = start;

  return {
    change: change,
    toPrev: toPrev,
    toNext: toNext,
    start: start,
    stop: stop,
  };
})();

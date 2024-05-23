var banner = (function () {
  var datas = [
    // 随机生成一些轮播图图片数据
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/397f2569b126d8fba446b6bbf57ef771.jpg?w=2452&h=920",
      link: "https://www.xiaomiev.com/",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4fc3e16fae19bca20536a4d1de9da943.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
      link: "https://www.mi.com/shop/buy/detail?product_id=19835",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8fbeb7319f6413f0ec0ee2ba1bed0aaa.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
      link: "https://www.mi.com/a/h/40674.html?sign=fa0afc93fe174d78fe69489b2d0284b6",
    },
    {
      img: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b82cdb12380866905927fb833a838be9.jpg?thumb=1&w=1226&h=460&f=webp&q=90",
      link: "https://www.mi.com/shop/buy/detail?product_id=20007",
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

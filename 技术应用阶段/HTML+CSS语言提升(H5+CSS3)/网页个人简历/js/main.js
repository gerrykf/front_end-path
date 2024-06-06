(function () {
  function $(name) {
    return document.querySelector(name);
  }

  function initPage() {
    var mainEl = $(".main");
    var backEl = $(".back");
    // 获取mainEL的高度
    var mainHeight = mainEl.clientHeight;
    backEl.style.height = mainHeight + "px";
  }

  initPage();

  return {
    initPage: initPage,
  };
})();

var note = document.querySelector(".note");
var moveBar = document.querySelector(".move-bar");

var adsorb = document.querySelector("#adsorb");
var isAdorb = localStorage.getItem("adsorb") === "true";
adsorb.checked = isAdorb;

adsorb.onchange = function (e) {
  localStorage.setItem("adsorb", e.target.checked);
};

moveBar.onmousedown = function (e) {
  // 鼠标相对于视口的位置
  var x = e.clientX,
    y = e.clientY;

  // 获取元素的位置
  var rect = moveBar.getBoundingClientRect();
  var ex = rect.x,
    ey = rect.y;

  //3. 限制元素的移动范围
  var w = document.documentElement.clientWidth;
  var h = document.documentElement.clientHeight;
  var ew = note.offsetWidth,
    eh = note.offsetHeight;

  var maxLeft = w - ew;
  var maxTop = h - eh;

  window.onmousemove = function (e) {
    var left, top;
    //1. 获取鼠标移动的距离
    var mx = e.clientX,
      my = e.clientY;
    var disX = mx - x,
      disY = my - y;
    //2. 给当前元素设置新的位置(元素的位置 = 元素的原始位置 + 鼠标移动的距离)
    left = ex + disX;
    top = ey + disY;

    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }
    if (top > maxTop) {
      top = maxTop;
    }

    note.style.left = left + "px";
    note.style.top = top + "px";
  };

  window.onmouseup = function (e) {
    var left;

    var mx = e.clientX;

    if (mx < w / 2) {
      left = 0;
    }
    if (mx > w / 2) {
      left = maxLeft;
    }

    isAdorb = localStorage.getItem("adsorb") === "true";
    if (isAdorb) {
      note.style.transfrom = "all 0.5s ease-in-out";
      note.style.left = left + "px";
    }

    window.onmousedown = null;
    window.onmousemove = null;
  };
};

var contentBox = document.querySelector(".content-box");

contentBox.innerHTML = localStorage.getItem("content") || "";

contentBox.oninput = function (e) {
  localStorage.setItem("content", e.target.innerHTML);
};

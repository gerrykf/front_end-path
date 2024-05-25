// 初始化
var menus = document.querySelectorAll(".menu h2");
var ITEM_HEIGHT = 40;
var TOTALMS = 300;
function init() {
  for (var i = 0; i < menus.length; i++) {
    menus[i].onclick = function () {
      console.log(this);

      var openingSubmenu = document.querySelector(".sub-menu[status=playing]");
      var openedSubmenu = document.querySelector(".sub-menu[status=opened]");

      if (openingSubmenu) return;

      if (openedSubmenu) {
        closeSubmenu(openedSubmenu);
      }

      toggleSubmenu(this.nextElementSibling);
    };
  }
}

init();
//#region 交互

/**
 * 打开子菜单
 * @param {*} el
 */
function openSubmenu(el) {
  // 子菜单有三种状态: 关闭、打开、正在打开
  // 通过自定义属性来标记当前子菜单的状态 status
  var status = el.getAttribute("status");
  // 如果当前子菜单已经打开或正在打开，则直接返回
  if (status && status !== "closed") return;
  // 设置子菜单的状态为正在打开
  el.setAttribute("status", "playing");
  // 将子项的高度设置从0到（子菜单的li数量*ITEM_HEIGHT）
  console.log(el.children.length);
  var to = el.children.length * ITEM_HEIGHT;
  createAnimation({
    from: 0,
    to: to,
    totalMS: TOTALMS,
    onmove: function (val) {
      el.style.display = "block";
      el.style.height = val + "px";
    },
    onend: function () {
      el.setAttribute("status", "opened");
    },
  });
}

/**
 * 关闭子菜单
 * @param {*} el
 */
function closeSubmenu(el) {
  var status = el.getAttribute("status");
  if (status && status !== "opened") return;
  el.setAttribute("status", "playing");
  var to = 0;
  createAnimation({
    from: el.children.length * ITEM_HEIGHT,
    to: to,
    totalMS: 150,
    onmove: function (val) {
      el.style.height = val + "px";
    },
    onend: function () {
      el.setAttribute("status", "closed");
      el.style.display = "none";
    },
  });
}

const toggleSubmenu = (el) => {
  const status = el.getAttribute("status");

  if (status === "playing") return;

  if (status === "opened") {
    closeSubmenu(el);
  } else {
    openSubmenu(el);
  }
};

//#endregion

/** 创建一个匿名执行函数，规定我们自己的代码作用域 */
/**
 * 1. 复选框的关联操作
 *  1.1 全选复选框事件的绑定
 *  1.2 全选复选框的选中状态
 *  1.3 全选复选框的选中状态与其他复选框的关联
 *  1.4 处理tbody里面的复选框的选中状态
 *  1.5 通过事件委托的方式处理tbody里面的复选框的选中状态（有可能是未来元素）
 *
 * 2. 表格排序功能
 *  2.1 事件的绑定
 *  2.2 在事件绑定里面获取到当前点击的元素
 */
(function () {
  var checKAll = document.getElementById("checkAll");
  var tbody = document.querySelector("tbody");
  var ths = document.querySelectorAll("th");
  var rows = tbody.getElementsByTagName("tr");

  var init = function () {
    initEvents();
  };

  var initEvents = function () {
    checKAll.addEventListener("click", onCheckAllClick);
    tbody.addEventListener("click", onTbodyClick);
    for (var i = 0; i < ths.length; i++) {
      // 使用闭包的形式 进行每一项得到索引值的获取
      handleThsClick(ths[i], i);
    }
  };

  var onCheckAllClick = function () {
    // 获取dom节点的选中状态
    var isChecked = checKAll.checked;
    // 获取所有的复选框
    var checkboxes = tbody.querySelectorAll("input[type='checkbox']");
    // 遍历所有的复选框，设置选中状态
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = isChecked;
    }
  };

  var onTbodyClick = function (e) {
    // 获取事件源，并且准确的找到复选框事件的触发
    var target = e.target;
    if (target.nodeName === "INPUT" && target.type === "checkbox") {
      // 获取所有的复选框
      var checkboxes = tbody.querySelectorAll("input[type='checkbox']");
      // 获取所有的复选框的长度
      var length = checkboxes.length;
      // 获取所有选中的复选框的长度
      var checkedLength = tbody.querySelectorAll(
        "input[type='checkbox']:checked"
      ).length;
      // 如果选中的复选框的长度和所有的复选框的长度相等，那么全选复选框就选中，否则就不选中
      checKAll.checked = length === checkedLength;
    }
  };

  var handleThsClick = function (el, index) {
    if (index === 0) return;
    el.addEventListener("click", function () {
      var arr = Array.prototype.slice.call(rows).sort(function (a, b) {
        // 如果是第三列或者第五列，那么就按照字符串的方式进行排序 localeCompare 采用国际化字符集比较字符串
        if (index === 2 || index === 4) {
          return a
            .getElementsByTagName("td")
            [index].innerHTML.localeCompare(
              b.getElementsByTagName("td")[index].innerHTML
            );
        } else {
          var a1 = a.getElementsByTagName("td")[index].innerHTML;
          var b1 = b.getElementsByTagName("td")[index].innerHTML;
          return a1 - b1;
        }
      });

      // 将排序后的数组重新插入到tbody中
      for (var i = 0; i < arr.length; i++) {
        tbody.appendChild(arr[i]);
      }
    });
  };

  // 当页面加载完成时，执行初始化函数
  window.onload = init;
  z;
})();

var input = document.querySelector("input");

function debounce(fn, delay) {
  let timerId;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 0);

    timerId = setTimeout(function () {
      /**
       * 希望谁调用debounce，this就指向谁,这样能拿到调用者的参数
       */
      fn.call(self, args);
    }, delay);
  };
}

var newHandler = debounce(function () {
  console.log(this.value);
}, 1000);

input.addEventListener("input", newHandler);

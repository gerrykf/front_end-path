"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyPromise2 =
/*#__PURE__*/
function () {
  // 构造函数 接受一个执行器函数
  function MyPromise2(executor) {
    var _this = this;

    _classCallCheck(this, MyPromise2);

    // 初始化状态为pending
    this.state = "pending"; // 初始化成功的值

    this.value = undefined; // 初始化失败的原因

    this.reason = undefined; // 初始化成功的回调

    this.onFilfulledCallbacks = []; // 初始化失败的回调

    this.onRejectedCallbacks = []; // 定义resolve函数

    var resolve = function resolve(value) {
      // 如果状态为pending
      if (_this.state === "pending") {
        // 修改状态为fulfilled
        _this.state = "fulfilled"; // 修改成功的值

        _this.value = value; // 执行成功的回调

        _this.onFilfulledCallbacks.forEach(function (fn) {
          return fn();
        });
      }
    }; // 定义reject函数


    var reject = function reject(reason) {
      // 如果状态为pending
      if (_this.state === "pending") {
        // 修改状态为rejected
        _this.state = "rejected"; // 修改失败的原因

        _this.reason = reason; // 执行失败的回调

        _this.onRejectedCallbacks.forEach(function (fn) {
          return fn();
        });
      }
    }; // 执行执行器函数


    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  _createClass(MyPromise2, [{
    key: "then",
    value: function then(onFulfilled, onRejected) {
      var _this2 = this;

      // 如果onFulfilled不是函数，就返回一个函数，返回值为value
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) {
        return value;
      }; // 如果onRejected不是函数，就返回一个函数，返回值为reason

      onRejected = typeof onRejected === "function" ? onRejected : function (reason) {
        throw reason;
      }; // 返回一个新的Promise 这是链式调用的关键

      return new MyPromise2(function (resolve, reject) {
        // 如果状态为fulfilled
        if (_this2.state === "fulfilled") {
          // 执行成功的回调
          resolve(onFulfilled(_this2.value));
        } else if (_this2.state === "rejected") {
          // 如果状态为rejected
          // 执行失败的回调
          reject(onRejected(_this2.reason));
        } else {
          // 如果状态为pending
          // 存放成功的回调
          _this2.onFilfulledCallbacks.push(function () {
            resolve(onFulfilled(_this2.value));
          }); // 存放失败的回调


          _this2.onRejectedCallbacks.push(function () {
            reject(onRejected(_this2.reason));
          });
        }
      });
    }
  }, {
    key: "catch",
    value: function _catch(onRejected) {
      return this.then(null, onRejected);
    }
  }, {
    key: "finally",
    value: function _finally(callback) {
      return this.then(function (value) {
        callback();
        return value;
      }, function (reason) {
        callback();
        throw reason;
      });
    }
  }]);

  return MyPromise2;
}(); // 实战情况下的Promise


var res = {
  errorCode: 0,
  data: {
    name: "张三",
    age: 18
  }
};
var errorCode = res.errorCode,
    data = res.data;
var promise = new MyPromise2(function (resolve, reject) {
  if (errorCode) {
    reject(errorCode);
  }

  resolve(data);
});
promise.then(function (res) {
  console.log(res);
})["catch"](function (err) {
  console.log("error-", err);
})["finally"](function () {
  console.log("Done");
}); // 输出：{ name: '张三', age: 18 }
// Done
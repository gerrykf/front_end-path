"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MyPromise =
/*#__PURE__*/
function () {
  function MyPromise(executor) {
    var _this = this;

    _classCallCheck(this, MyPromise);

    this.state = "pending"; // pending, fulfilled, rejected

    this.value = undefined; // 成功的值

    this.reason = undefined; // 失败的原因

    this.onFulfilledCallbacks = []; // 存放成功的回调

    this.onRejectedCallbacks = []; // 存放失败的回调

    var resolve = function resolve(value) {
      if (_this.state === "pending") {
        _this.state = "fulfilled";
        _this.value = value;

        _this.onFulfilledCallbacks.forEach(function (fn) {
          return fn();
        });
      }
    };

    var reject = function reject(reason) {
      if (_this.state === "pending") {
        _this.state = "rejected";
        _this.reason = reason;

        _this.onRejectedCallbacks.forEach(function (fn) {
          return fn();
        });
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  _createClass(MyPromise, [{
    key: "then",
    value: function then(onFulfilled, onRejected) {
      var _this2 = this;

      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : function (value) {
        return value;
      };
      onRejected = typeof onRejected === "function" ? onRejected : function (reason) {
        throw reason;
      };
      return new MyPromise(function (resolve, reject) {
        if (_this2.state === "fulfilled") {
          resolve(onFulfilled(_this2.value));
        } else if (_this2.state === "rejected") {
          reject(onRejected(_this2.reason));
        } else {
          _this2.onFulfilledCallbacks.push(function () {
            resolve(onFulfilled(_this2.value));
          });

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

  return MyPromise;
}(); // test


var errorCode = 1002;
var promise = new MyPromise(function (resolve, reject) {
  setTimeout(function () {
    if (errorCode === 1001) {
      reject("error1001");
    }

    resolve("success");
  }, 1000);
});
promise.then(function (res) {
  console.log(res);
  return "Next Step";
}, function (err) {
  console.log(err);
}).then(function (res) {
  console.log(res);
}, function (err) {
  console.log(err);
})["catch"](function (err) {
  console.log(err);
})["finally"](function () {
  console.log("Done");
}); // 1 秒后输出 success
// success
// undefined
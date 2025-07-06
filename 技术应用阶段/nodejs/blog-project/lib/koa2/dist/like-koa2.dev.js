"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var http = require("http");
/**
 * 函数组合器，接收一个中间件函数数组 middlewareList，然后返回一个函数，
 * 该返回函数接收上下文对象 ctx，并逐个执行中间件函数。
 * 每个中间件函数可以显式地调用 next 来执行下一个中间件，并确保按顺序执行所有中间件
 * @param {*} middlewareList 中间件函数数组
 * @returns {Function} 返回一个函数，该函数接收上下文对象 ctx，并逐个执行中间件函数
 */


function compose(middlewareList) {
  return function (ctx) {
    function dispatch(i) {
      var fn = middlewareList[i];

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}

var LikeKoa2 =
/*#__PURE__*/
function () {
  function LikeKoa2() {
    _classCallCheck(this, LikeKoa2);

    this.middlewares = [];
  }

  _createClass(LikeKoa2, [{
    key: "use",
    value: function use(fn) {
      this.middlewares.push(fn);
      return this;
    }
  }, {
    key: "createContext",
    value: function createContext(req, res) {
      var ctx = {
        req: req,
        res: res
      };
      ctx.query = req.query;
      return ctx;
    }
  }, {
    key: "handleRequest",
    value: function handleRequest(ctx, fn) {
      return fn(ctx);
    }
  }, {
    key: "callback",
    value: function callback() {
      var _this = this;

      var fn = compose(this.middlewares);
      return function (req, res) {
        var ctx = _this.createContext(req, res);

        return _this.handleRequest(ctx, fn);
      };
    }
  }, {
    key: "listen",
    value: function listen() {
      var server = http.createServer(this.callback());
      server.listen.apply(server, arguments);
    }
  }]);

  return LikeKoa2;
}();

module.exports = LikeKoa2;
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var http = require("http");

var slice = Array.prototype.slice;

var LikeExpress =
/*#__PURE__*/
function () {
  function LikeExpress() {
    _classCallCheck(this, LikeExpress);

    this.routes = {
      all: [],
      // app.use(...)传入的中间件
      get: [],
      // app.get(...)传入的中间件
      post: [] // app.post(...)传入的中间件

    };
  }

  _createClass(LikeExpress, [{
    key: "register",
    value: function register(path) {
      var info = {};

      if (typeof path === "string") {
        // 第一个参数是路由, 从第二个参数开始, 就是stack
        info.path = path; // 从第二个参数开始, 转换为数组, 存入stack

        info.stack = slice.call(arguments, 1); // [fn, fn, fn]
      } else {
        // 第一个参数不是路由, 直接存入stack
        info.path = "/";
        info.stack = slice.call(arguments, 0);
      }

      return info;
    }
  }, {
    key: "use",
    value: function use() {
      var info = this.register.apply(this, arguments);
      this.routes.all.push(info);
    }
  }, {
    key: "get",
    value: function get() {
      var info = this.register.apply(this, arguments);
      this.routes.get.push(info);
    }
  }, {
    key: "post",
    value: function post() {
      var info = this.register.apply(this, arguments);
      this.routes.post.push(info);
    }
  }, {
    key: "match",
    value: function match(method, url) {
      var stack = [];

      if (url === "/favicon.ico") {
        return stack;
      } // 获取 routes  把所有的中间件都拿到


      var curRoutes = [];
      curRoutes = curRoutes.concat(this.routes.all);
      curRoutes = curRoutes.concat(this.routes[method]); // 把 curRoutes 中的路由和 url 匹配

      curRoutes.forEach(function (routeInfo) {
        if (url.indexOf(routeInfo.path) === 0) {
          // url === '/api/get-cookie' 且 routeInfo.path === '/'
          // url === '/api/get-cookie' 且 routeInfo.path === '/api'
          // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
          stack = stack.concat(routeInfo.stack);
        }
      });
      return stack;
    } // 核心的 next 机制

  }, {
    key: "handle",
    value: function handle(req, res, stack) {
      var next = function next() {
        // 拿到第一个匹配的中间件
        var middleware = stack.shift();

        if (middleware) {
          middleware(req, res, next);
        }
      };

      next();
    }
  }, {
    key: "callback",
    value: function callback() {
      var _this = this;

      return function (req, res) {
        res.json = function (data) {
          res.setHeader("Content-type", "application/json");
          res.end(JSON.stringify(data));
        };

        var url = req.url;
        var method = req.method.toLowerCase();

        var resultList = _this.match(method, url);

        _this.handle(req, res, resultList);
      };
    }
  }, {
    key: "listen",
    value: function listen() {
      var server = http.createServer(this.callback());
      server.listen.apply(server, arguments);
    }
  }]);

  return LikeExpress;
}(); // 导出


module.exports = function () {
  return new LikeExpress();
};
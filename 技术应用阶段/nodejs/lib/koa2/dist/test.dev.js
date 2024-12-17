"use strict";

var koa = require("./like-koa2");

var app = new koa(); // logger

app.use(function _callee(ctx, next) {
  var rt;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("第一层洋葱 - 开始");
          _context.next = 3;
          return regeneratorRuntime.awrap(next());

        case 3:
          rt = ctx["X-Response-Time"];
          console.log("".concat(ctx.req.method, " ").concat(ctx.req.url, " - ").concat(rt));
          console.log("第一层洋葱 - 结束");

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}); // x-response-time

app.use(function _callee2(ctx, next) {
  var start, ms;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log("第二层洋葱 - 开始");
          start = Date.now();
          _context2.next = 4;
          return regeneratorRuntime.awrap(next());

        case 4:
          ms = Date.now() - start;
          ctx["X-Response-Time"] = "".concat(ms, "ms");
          console.log("第二层洋葱 - 结束");

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // response

app.use(function _callee3(ctx) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log("第三层洋葱 - 开始");
          ctx.res.end("This is a koa2-like");
          console.log("第三层洋葱 - 结束");

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.listen(8000);
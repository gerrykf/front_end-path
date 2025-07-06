"use strict";

var router = require("koa-router")();

var _require = require("../controller/user.js"),
    login = _require.login;

var _require2 = require("../model/resModel.js"),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;

router.prefix("/api/user");
router.post("/login", function _callee(ctx, next) {
  var _ctx$request$body, username, password, data;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ctx$request$body = ctx.request.body, username = _ctx$request$body.username, password = _ctx$request$body.password;
          _context.next = 3;
          return regeneratorRuntime.awrap(login(username, password));

        case 3:
          data = _context.sent;
          console.log("/login---data", data);

          if (!data.username) {
            _context.next = 11;
            break;
          }

          // 设置 session  这里会在redis中设置session
          ctx.session.username = data.username;
          ctx.session.realname = data.realname;
          console.log("Session after login:", ctx.session); // console.log("Set-Cookie header:", ctx.response.getHeaders()["set-cookie"]); // 调试 Set-Cookie

          ctx.body = new SuccessModel(data, "登录成功");
          return _context.abrupt("return");

        case 11:
          ctx.body = new ErrorModel("登录失败");

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/session-test", function _callee2(ctx, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (ctx.session.viewCount == null) {
            ctx.session.viewCount = 0;
          }

          ctx.session.viewCount++;
          ctx.body = {
            errno: 0,
            viewCount: ctx.session.viewCount
          };

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;
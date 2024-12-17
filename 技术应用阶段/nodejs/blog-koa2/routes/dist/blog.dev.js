"use strict";

var router = require("koa-router")();

var _require = require("../model/resModel"),
    SuccessModel = _require.SuccessModel,
    ErrorModel = _require.ErrorModel;

var _require2 = require("../controller/blog"),
    getList = _require2.getList,
    getDetail = _require2.getDetail,
    newBlog = _require2.newBlog,
    updateBlog = _require2.updateBlog,
    delBlog = _require2.delBlog;

var loginCheck = require("../middleware/loginCheck");

router.prefix("/api/blog");
router.get("/list", function _callee(ctx, next) {
  var author, keyword, listData;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          author = ctx.query.author || "";
          keyword = ctx.query.keyword || ""; // 管理员界面

          if (!ctx.query.isadmin) {
            _context.next = 7;
            break;
          }

          console.log("isadmin--req.session", ctx.session);

          if (!(ctx.session.username == null)) {
            _context.next = 7;
            break;
          }

          // 未登录
          ctx.body = new ErrorModel("尚未登录");
          return _context.abrupt("return");

        case 7:
          // 强制查询自己的博客
          author = ctx.session.username;
          _context.next = 10;
          return regeneratorRuntime.awrap(getList(author, keyword));

        case 10:
          listData = _context.sent;
          ctx.body = new SuccessModel(listData);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/detail", function _callee2(ctx, next) {
  var data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getDetail(ctx.query.id));

        case 2:
          data = _context2.sent;
          ctx.body = new SuccessModel(data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/new", loginCheck, function _callee3(ctx, next) {
  var data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          ctx.request.body.author = ctx.session.username;
          _context3.next = 3;
          return regeneratorRuntime.awrap(newBlog(ctx.request.body));

        case 3:
          data = _context3.sent;
          ctx.body = new SuccessModel(data);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post("/update", loginCheck, function _callee4(ctx, next) {
  var val;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(updateBlog(ctx.query.id, ctx.request.body));

        case 2:
          val = _context4.sent;

          if (val) {
            ctx.body = new SuccessModel();
          } else {
            ctx.body = new ErrorModel("更新博客失败");
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
router.post("/del", loginCheck, function _callee5(ctx, next) {
  var author, val;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          author = ctx.session.username;
          _context5.next = 3;
          return regeneratorRuntime.awrap(delBlog(ctx.query.id, author));

        case 3:
          val = _context5.sent;

          if (val) {
            ctx.body = new SuccessModel();
          } else {
            ctx.body = new ErrorModel("删除博客失败");
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
module.exports = router;
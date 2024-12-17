"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controller/user.js"),
    login = _require.login;

var _require2 = require("../model/resModel.js"),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;

router.post("/login", function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  var result = login(username, password);
  return result.then(function (data) {
    if (data.username) {
      // 设置 session  这里会在redis中设置session
      req.session.username = data.username;
      req.session.realname = data.realname;
      console.log("Session after login:", req.session);
      console.log("Set-Cookie header:", res.getHeaders()["set-cookie"]); // 调试 Set-Cookie

      res.json(new SuccessModel(data, "登录成功"));
      return;
    }

    res.json(new ErrorModel("登录失败"));
  });
}); // // 测试登录验证
// router.get("/login-test", function (req, res, next) {
//   console.log("login-test--req.session", req.session);
//   if (req.session.username) {
//     res.json({
//       errno: 0,
//       msg: "已登录",
//     });
//     return;
//   }
//   res.json({
//     errno: -1,
//     msg: "未登录",
//   });
// });
// router.get("/session-test", function (req, res, next) {
//   const session = req.session;
//   if (session.viewNum == null) {
//     session.viewNum = 0;
//   }
//   session.viewNum++;
//   res.json({
//     viewNum: session.viewNum,
//   });
// });

module.exports = router;
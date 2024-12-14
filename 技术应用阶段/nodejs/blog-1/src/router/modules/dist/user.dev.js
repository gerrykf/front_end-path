"use strict";

var _require = require("../../controller/user.js"),
    login = _require.login;

var _require2 = require("../../model/resModel.js"),
    SuccessModel = _require2.SuccessModel,
    ErrorModel = _require2.ErrorModel;

var _require3 = require("../../db/redis.js"),
    set = _require3.set,
    get = _require3.get;
/**
 * 处理 user 路由
 * @param {*} req
 * @param {*} res
 * @returns
 */


var handleUserRouter = function handleUserRouter(req, res) {
  var method = req.method; // 登录

  if (method === "POST" && req.path === "/api/user/login") {
    console.log("req.body is", req.body);
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password;
    var result = login(username, password);
    return result.then(function (data) {
      console.log("data is", data);

      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname; // 同步到 redis

        set(req.sessionId, req.session);
        console.log("req.session is", req.session);
        return new SuccessModel(data, "登录成功");
      }

      return new ErrorModel("登录失败");
    });
  } // 登录验证的测试;
  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   if (req.session.username) {
  //     return Promise.resolve(
  //       new SuccessModel({ session: req.session }, "已登录")
  //     );
  //   }
  //   return Promise.resolve(new ErrorModel("尚未登录"));
  // }

};

module.exports = handleUserRouter;
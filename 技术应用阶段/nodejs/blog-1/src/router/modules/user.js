const { login } = require("../../controller/user.js");
const { SuccessModel, ErrorModel } = require("../../model/resModel.js");
const { set, get } = require("../../db/redis.js");

/**
 * 处理 user 路由
 * @param {*} req
 * @param {*} res
 * @returns
 */
const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === "GET" && req.path === "/api/user/login") {
    const { username, password } = req.query;
    const result = login(username, password);

    return result.then((data) => {
      if (data.username) {
        // 设置 session
        req.session.username = data.username;
        req.session.realname = data.realname;

        console.log("req.session--", req.sessionId);

        // 同步到 redis
        set(req.sessionId, req.session);

        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登录验证的测试
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

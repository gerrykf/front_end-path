const { login } = require("../../controller/user.js");
const { SuccessModel, ErrorModel } = require("../../model/resModel.js");

/**
 * 获取 cookie 的过期时间
 * @returns
 */
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

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
        // 操作 cookie  path=/ 表示根目录下都可以访问  httpOnly 表示只能通过后端修改 expires 表示过期时间
        res.setHeader(
          "Set-Cookie",
          `username=${
            data.username
          }; path=/; httpOnly; expires=${getCookieExpires()}`
        );

        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }

  // 登录验证的测试
  if (method === "GET" && req.path === "/api/user/login-test") {
    if (req.cookie.username) {
      return Promise.resolve(
        new SuccessModel({ username: req.cookie.username })
      );
    }
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

module.exports = handleUserRouter;

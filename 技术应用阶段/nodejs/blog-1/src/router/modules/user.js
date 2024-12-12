const { login } = require("../../controller/user.js");
const { SuccessModel, ErrorModel } = require("../../model/resModel.js");

const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);

    return result.then((data) => {
      if (data.username) {
        return new SuccessModel();
      }
      return new ErrorModel("登录失败");
    });
  }
};

module.exports = handleUserRouter;

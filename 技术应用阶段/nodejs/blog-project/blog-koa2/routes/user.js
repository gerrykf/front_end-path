const router = require("koa-router")();
const { login } = require("../controller/user.js");
const { SuccessModel, ErrorModel } = require("../model/resModel.js");

router.prefix("/api/user");

router.post("/login", async (ctx, next) => {
  const { username, password } = ctx.request.body;

  const data = await login(username, password);
  console.log("/login---data", data);
  if (data.username) {
    // 设置 session  这里会在redis中设置session
    ctx.session.username = data.username;
    ctx.session.realname = data.realname;

    console.log("Session after login:", ctx.session);
    // console.log("Set-Cookie header:", ctx.response.getHeaders()["set-cookie"]); // 调试 Set-Cookie

    ctx.body = new SuccessModel(data, "登录成功");
    return;
  }
  ctx.body = new ErrorModel("登录失败");
});

router.get("/session-test", async (ctx, next) => {
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0;
  }
  ctx.session.viewCount++;
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount,
  };
});

module.exports = router;

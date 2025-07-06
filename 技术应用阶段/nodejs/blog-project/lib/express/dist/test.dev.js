"use strict";

var express = require("./like-express"); // 本次 http 请求的实例


var app = express();
app.use(function (req, res, next) {
  console.log("请求开始...", req.method, req.url);
  next();
});
app.use(function (req, res, next) {
  // 假设在处理 cookie
  console.log("处理 cookie...");
  req.cookie = {
    userId: "abc123"
  };
  next();
});
app.use(function (req, res, next) {
  // 假设处理 post data
  // 异步
  console.log("处理 post data...");
  setTimeout(function () {
    req.body = {
      a: 100,
      b: 200
    };
    next();
  });
});
app.use("/api", function (req, res, next) {
  console.log("处理 /api 路由");
  next();
});
app.get("/api", function (req, res, next) {
  console.log("get /api 路由");
  next();
});
app.post("/api", function (req, res, next) {
  console.log("post /api 路由");
  next();
}); // 模拟登录验证

function loginCheck(req, res, next) {
  setTimeout(function () {
    console.log("模拟登陆失败");
    res.json({
      errno: -1,
      msg: "登录失败"
    }); // next();
  });
}

app.get("/api/get-cookie", loginCheck, function (req, res, next) {
  console.log("get /api/get-cookie");
  res.json({
    errno: 0,
    data: req.cookie
  });
});
app.post("/api/get-post-data", function (req, res, next) {
  console.log("post /api/get-post-data");
  res.json({
    errno: 0,
    data: req.body
  });
});
app.use(function (req, res, next) {
  console.log("处理 404");
  res.json({
    errno: -1,
    msg: "404 Not Found"
  });
});
app.listen(8000, function () {
  console.log("server is running on port 8000");
});
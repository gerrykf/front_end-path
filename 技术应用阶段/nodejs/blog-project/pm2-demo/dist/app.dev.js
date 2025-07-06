"use strict";

var http = require("http");

var server = http.createServer(function (req, res) {
  // 模拟日志
  console.log("日志: ", new Date()); // 模拟一个错误

  if (req.url === "/error") {
    throw new Error("模拟错误");
  }

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    code: 0,
    data: "PM2 demo success server 4"
  }));
});
server.listen(8000);
console.log("Server is running at http://localhost:8000");
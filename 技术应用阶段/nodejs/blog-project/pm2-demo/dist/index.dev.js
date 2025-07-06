"use strict";

var http = require("http");

var server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    code: 0,
    data: "PM2 demo success server"
  }));
});
server.listen(8000);
console.log("Server is running at http://localhost:8000");
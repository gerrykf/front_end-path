const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;
  const path = url.split("?")[0];
  res.end(path); // 返回路由
});

server.listen(8000);
console.log("server is running at 8000");

// node route.js

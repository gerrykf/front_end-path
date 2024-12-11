const http = require("http");

const server = http.createServer((req, res) => {
  debugger;
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Hello World</h1>");
});

server.listen(3000, () => {
  console.log("Server is running at http://127.0.0.1:3000/");
});

// 执行 node --inspect-brk index.js
// 打开 Chrome 浏览器，输入 chrome://inspect，点击 Configure，添加 localhost:9229，点击 inspect 即可进入调试模式

const http = require("http");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split("?")[0];
  const query = querystring.parse(url.split("?")[1]);

  // 设置返回格式为 JSON
  res.setHeader("Content-type", "application/json");

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query,
  };

  // 返回
  if (method === "GET") {
    res.end(JSON.stringify(resData));
  }

  if (method === "POST") {
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }
});

server.listen(8000);
console.log("server is running at 8000");

// GET http://localhost:8000/api/blog/list?author=zhangsan&keyword=A

// POST http://localhost:8000/api/blog/update

// {
//     "method": "POST",
//     "url": "/api/blog/update",
//     "path": "/api/blog/update",
//     "query": {},
//     "postData": "{\r\n    \"title\": \"博客标题\",\r\n    \"content\": \"博客标题A\"\r\n}"
// }

// node post-json.js

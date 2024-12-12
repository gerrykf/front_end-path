/* 基础设置相关逻辑 */

const querystring = require("querystring");
const { handleBlogRouter, handleUserRouter } = require("./src/router");

/**
 * 处理 post data
 * @param {*} req
 * @returns
 */
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });

    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });

  return promise;
};

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader("Content-type", "application/json");

  // 获取 path
  const url = req.url;
  req.path = url.split("?")[0];

  // 解析 query
  req.query = querystring.parse(url.split("?")[1]);

  // 处理 post data
  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });

      return;
    }

    // 处理 user 路由
    // controllrt 中返回的promise 路由中处理时，返回的是一个promise
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        res.end(JSON.stringify(userData));
      });

      return;
    }

    // 未命中路由，返回 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;
// process.env.NODE_ENV,

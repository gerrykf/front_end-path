/* 基础设置相关逻辑 */

const querystring = require("querystring");
const { handleBlogRouter, handleUserRouter } = require("./src/router");
const { get, set } = require("./src/db/redis.js");

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

  // 解析 cookie
  const cookieStr = req.headers.cookie || ""; // k1=v1;k2=v2;k3=v3
  req.cookie = {}; // 用来存储cookie
  cookieStr.split(";").forEach((item) => {
    if (!item) {
      return;
    }

    const arr = item.split("=");
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
  console.log("req.cookie--", req.cookie);

  // 解析 session
  let needSetCookie = false;
  let userId = req.cookie.userid;

  // 解析 session（使用 redis）
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的 session 值
    set(userId, {});
  } else {
    // 获取 session
    req.sessionId = userId;
    get(req.sessionId).then((sessionData) => {
      if (sessionData == null) {
        // 初始化 redis 中的 session 值
        set(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        req.session = sessionData;
      }

      console.log("req.session--", req.session);
    });
  }

  // 处理 post data
  getPostData(req).then((postData) => {
    req.body = postData;

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then((blogData) => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }

        res.end(JSON.stringify(blogData));
      });

      return;
    }

    // 处理 user 路由
    // controllrt 中返回的promise 路由中处理时，返回的是一个promise
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData) => {
        if (needSetCookie) {
          res.setHeader(
            "Set-Cookie",
            `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
          );
        }

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

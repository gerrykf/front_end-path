"use strict";

/* 基础设置相关逻辑 */
var querystring = require("querystring");

var _require = require("./src/router"),
    handleBlogRouter = _require.handleBlogRouter,
    handleUserRouter = _require.handleUserRouter;

var _require2 = require("./src/db/redis.js"),
    get = _require2.get,
    set = _require2.set;

var _require3 = require("./src/utils/log"),
    access = _require3.access;
/**
 * 获取 cookie 的过期时间
 * @returns
 */


var getCookieExpires = function getCookieExpires() {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};
/**
 * 处理 post data
 * @param {*} req
 * @returns
 */


var getPostData = function getPostData(req) {
  var promise = new Promise(function (resolve, reject) {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    var postData = "";
    req.on("data", function (chunk) {
      postData += chunk.toString();
    });
    req.on("end", function () {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

var serverHandle = function serverHandle(req, res) {
  // 记录 access log
  access("".concat(req.method, " -- ").concat(req.url, " -- ").concat(req.headers["user-agent"], " -- ").concat(new Date(Date.now()).toLocaleDateString(), " ").concat(new Date(Date.now()).toLocaleTimeString())); // 设置返回格式 JSON

  res.setHeader("Content-type", "application/json"); // 获取 path

  var url = req.url;
  req.path = url.split("?")[0]; // 解析 query

  req.query = querystring.parse(url.split("?")[1]); // 解析 cookie

  req.cookie = {};
  var cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach(function (item) {
    if (!item) {
      return;
    }

    var arr = item.split("=");
    var key = arr[0].trim();
    var val = arr[1].trim();
    req.cookie[key] = val;
  }); // 解析 session

  var needSetCookie = false;
  var userId = req.cookie.userid;

  if (!userId) {
    needSetCookie = true;
    userId = "".concat(Date.now(), "_").concat(Math.random());
    set(userId, {});
  } else {
    get(userId).then(function (data) {
      if (!data) {
        set(userId, {});
      }
    });
  }

  req.sessionId = userId;
  console.log("req.sessionId is", req.sessionId);
  get(req.sessionId).then(function (sessionData) {
    if (sessionData == null) {
      // 初始化 redis 中的 session 值
      set(req.sessionId, {});
      req.session = {};
    } else {
      req.session = sessionData;
    }

    return getPostData(req);
  }); // 处理 post data

  getPostData(req).then(function (postData) {
    req.body = postData;
    console.log("req.body is", req.body); // 处理 blog 路由

    var blogResult = handleBlogRouter(req, res);

    if (blogResult) {
      blogResult.then(function (blogData) {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", "userid=".concat(userId, "; path=/; httpOnly; expires=").concat(getCookieExpires()));
        }

        res.end(JSON.stringify(blogData));
      });
      return;
    } // 处理 user 路由
    // controllrt 中返回的promise 路由中处理时，返回的是一个promise


    var userResult = handleUserRouter(req, res);

    if (userResult) {
      userResult.then(function (userData) {
        console.log("userData is", userData);

        if (needSetCookie) {
          res.setHeader("Set-Cookie", "userid=".concat(userId, "; path=/; httpOnly; expires=").concat(getCookieExpires()));
        }

        res.end(JSON.stringify(userData));
      });
      return;
    } // 未命中路由，返回 404


    res.writeHead(404, {
      "Content-type": "text/plain"
    });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle; // process.env.NODE_ENV,
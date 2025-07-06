const http = require("http");
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    this.routes = {
      all: [], // app.use(...)传入的中间件
      get: [], // app.get(...)传入的中间件
      post: [], // app.post(...)传入的中间件
    };
  }

  register(path) {
    const info = {};
    if (typeof path === "string") {
      // 第一个参数是路由, 从第二个参数开始, 就是stack
      info.path = path;
      // 从第二个参数开始, 转换为数组, 存入stack
      info.stack = slice.call(arguments, 1); // [fn, fn, fn]
    } else {
      // 第一个参数不是路由, 直接存入stack
      info.path = "/";
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  match(method, url) {
    let stack = [];
    if (url === "/favicon.ico") {
      return stack;
    }

    // 获取 routes  把所有的中间件都拿到
    let curRoutes = [];
    curRoutes = curRoutes.concat(this.routes.all);
    curRoutes = curRoutes.concat(this.routes[method]);

    // 把 curRoutes 中的路由和 url 匹配
    curRoutes.forEach((routeInfo) => {
      if (url.indexOf(routeInfo.path) === 0) {
        // url === '/api/get-cookie' 且 routeInfo.path === '/'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api'
        // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie'
        stack = stack.concat(routeInfo.stack);
      }
    });
    return stack;
  }

  // 核心的 next 机制
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift();
      if (middleware) {
        middleware(req, res, next);
      }
    };
    next();
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader("Content-type", "application/json");
        res.end(JSON.stringify(data));
      };

      const url = req.url;
      const method = req.method.toLowerCase();

      const resultList = this.match(method, url);
      this.handle(req, res, resultList);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

// 导出
module.exports = () => {
  return new LikeExpress();
};

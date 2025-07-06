const http = require("http");

/**
 * 函数组合器，接收一个中间件函数数组 middlewareList，然后返回一个函数，
 * 该返回函数接收上下文对象 ctx，并逐个执行中间件函数。
 * 每个中间件函数可以显式地调用 next 来执行下一个中间件，并确保按顺序执行所有中间件
 * @param {*} middlewareList 中间件函数数组
 * @returns {Function} 返回一个函数，该函数接收上下文对象 ctx，并逐个执行中间件函数
 */
function compose(middlewareList) {
  return function (ctx) {
    function dispatch(i) {
      const fn = middlewareList[i];
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}

class LikeKoa2 {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
    return this;
  }

  createContext(req, res) {
    const ctx = { req, res };
    ctx.query = req.query;
    return ctx;
  }

  handleRequest(ctx, fn) {
    return fn(ctx);
  }

  callback() {
    const fn = compose(this.middlewares);

    return (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = LikeKoa2;

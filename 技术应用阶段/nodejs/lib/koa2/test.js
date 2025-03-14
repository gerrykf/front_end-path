const koa = require("./like-koa2");
const app = new koa();

// logger

app.use(async (ctx, next) => {
  console.log("第一层洋葱 - 开始");
  await next();
  const rt = ctx["X-Response-Time"];
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
  console.log("第一层洋葱 - 结束");
});

// x-response-time

app.use(async (ctx, next) => {
  console.log("第二层洋葱 - 开始");
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx["X-Response-Time"] = `${ms}ms`;
  console.log("第二层洋葱 - 结束");
});

// response

app.use(async (ctx) => {
  console.log("第三层洋葱 - 开始");
  ctx.res.end("This is a koa2-like");
  console.log("第三层洋葱 - 结束");
});

app.listen(8000);

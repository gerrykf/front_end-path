var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const fs = require("fs");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");

var app = express();

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
const ENV = process.env.NODE_ENV;
if (ENV !== "prod") {
  // 开发环境 / 测试环境
  app.use(logger("dev"));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(logFileName, {
    flags: "a",
  });
  app.use(
    logger("combined", {
      stream: writeStream,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const redisClient = require("./db/redis");

app.use(
  session({
    store: new RedisStore({ client: redisClient }), // 使用 Redis 作为会话存储
    secret: "WJiol#23123", // 用于加密会话 ID 的密钥
    resave: false, // 避免每次请求都重新保存会话
    saveUninitialized: false, // 避免未初始化的会话被保存到存储中
    cookie: {
      secure: false, // 开发环境设置为 false，生产环境启用 HTTPS 时设为 true
      httpOnly: true, // 阻止客户端脚本访问 Cookie
      maxAge: 1000 * 60 * 60 * 24, // 会话过期时间：1 天
    },
  })
);
// app.use(express.static(path.join(__dirname, 'public')));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error("err.stack--", err.stack);
  res.status(500).send("服务器错误"); // 发送纯文本错误信息
});

module.exports = app;

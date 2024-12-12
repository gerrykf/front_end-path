- [nodejs](#nodejs)
  - [nodejs 与 JavaScript 的区别](#nodejs-与-javascript-的区别)
  - [项目结构](#项目结构)
  - [mysql](#mysql)
  - [cookie](#cookie)

# nodejs

## nodejs 与 JavaScript 的区别

- ECMAScript
  是语法规范
- nodejs
  ECMAScript+nodejs api
- commonjs
- nodejs debugger

## 项目结构

```bash
.
├── app.js                                                      # 基础设置相关逻辑
├── package.json                                                # 依赖包
└── bin
    ├── www.js                                                  # 创建Server相关逻辑
└── src
    ├── controller                                                # controller
    │   ├── blog.js                                                   # 博客
    │   └── user.js                                                   # 用户
    ├── model                                                   # 数据库model目录
    │       ├── resModel.js                                           # 定义返回数据的模型
    ├── router                                                    # 路由
    │    ├── index.js                                                 # 路由模块集合
    │    └── modules                                                  # 路由模块
    │       ├── blog.js                                                  # blog 的路由
    │       └── user.js                                                  # user 的路由

```

## mysql

> 可视化工具[https://dev.mysql.com/downloads/workbench/]

查询所有数据库
`show databases`

创建 blog 数据库

```sql
CREATE SCHEMA `myblog` ;
```

创建用户表

```sql
CREATE TABLE `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));

```

创建 blog 表

```sql
CREATE TABLE `myblog`.`blogs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

```

增加一个字段

```sql
ALTER TABLE `myblog`.`users`
ADD COLUMN `state` INT NOT NULL DEFAULT 1 AFTER `realname`;
```

删除一个字段

```sql
ALTER TABLE `myblog`.`users`
DROP COLUMN `state`;

```

```sql
-- 插入user数据
insert into users(username,`password`,realname) values('zhangsan','123','张三');
insert into users(username,`password`,realname) values('lisi','123','李四');
-- 查询user表数据
select * from users;
select id,username from users;
select * from users where username = 'zhangsan' and `password` = '123';
select * from users where username like '%zhang%';
select * from users where password like '%1%' order by id desc;

-- 更新user
-- update users set realname = '李四2' where username='lisi';
-- Error Code: 1175.  You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.   To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.
-- 禁用安全模式
SET SQL_SAFE_UPDATES = 0;
update users set realname = '李四2' where username='lisi';

-- 删除
delete from users where username='lisi';
-- 开发中删除 示例：软删除
update users set state = 1 where username='lisi';
select * from users where state <> 0;
```

添加 blogs 测试数据

```sql
select * from blogs order by createtime desc;
insert into blogs(title,content,createtime,author) values('标题A','内容A',1733909793093,'zhangsan');
insert into blogs(title,content,createtime,author) values('标题B','内容B',1733909871598,'lisi');
```

mqsql 新特性 varchar(10) 数据类型

> 以前中文字符占两个长度 英文字符占一个长度 ,在 >=5 以上的版本都统一化了 中文字符也占一个长度

```sql
select version();
-- 8.4.0
```

- 根据 NODE_ENV 区分配置

```json
// package.json
"dev": "cross-env NODE_ENV=dev nodemon bin/www.js",
"prod": "cross-env NODE_ENV=prod nodemon bin/www.js"
```

```js
// src/config/db.js
// 配置
let MYSQL_CONF;

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "000000",
    port: "3306",
    database: "myblog",
  };
}

if (env === "prod") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "000000",
    port: "3306",
    database: "myblog",
  };
}
```

> pnpm dev -- 运行后处于开发模式

- 封装 exec 函数，API 使用操作数据库

```js
const mysql = require("mysql2");
const { MYSQL_CONF } = require("../config/db");

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

// 统一执行 sql 的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = { exec };
```

## cookie

- 什么时 cookie
  1. 存储在浏览器中的一段字符串（最大 5kb）
  2. 跨域不共享
  3. 格式如 k1=v1;k2=v2;k3=v3; 因此可以存储结构化数据
  4. 每次发送 http 请求，会将请求域的 cookie 一起发送给 server
  5. server 端可以修改 cookie 并返回给浏览器
  6. 浏览器中也可以通过 javascript 修改 cookie（有限制）
- javascript 操作 cookie,浏览器中查看 cookie
  - 客户端查看 cookie 三种方式
    1. ![alt text](image.png)
    2. ![alt text](image-1.png)
    3. ![alt text](image-2.png)
  - javascript 查看、修改 cookie（有限制）
    1. 做累加(会追加到 cookie 值的后边)
       document.cookie = 'k1=100;'
- server 端操作 cookie,实现登录验证

  - 查看 cookie

    ```js
    // 解析 cookie
    const cookieStr = req.headers.cookie || ""; // k1=v1;k2=v2;k3=v3
    req.cookie = {}; // 用来存储cookie
    cookieStr.split(";").forEach((item) => {
      if (!item) {
        return;
      }

      const arr = item.split("=");
      const key = arr[0];
      const val = arr[1];
      req.cookie[key] = val;
    });
    console.log("req.cookie--", req.cookie);
    ```

  - 修改 cookie

    ```js
    // 操作 cookie  before
    res.setHeader("Set-Cookie", `username=${data.username}; path=/;`);

    // 限制前端修改cookie after
    // 操作 cookie  path=/ 表示根目录下都可以访问  httpOnly 表示只能通过后端修改
    // 操作 cookie  path=/ 表示根目录下都可以访问  httpOnly 表示只能通过后端修改 expires 表示过期时间
    res.setHeader(
      "Set-Cookie",
      `username=${
        data.username
      }; path=/; httpOnly; expires=${getCookieExpires()}`
    );
    ```

  - 实现登录验证

    ```js
    // 登录验证的测试   -- http://localhost:8000/api/user/login-test
    if (method === "GET" && req.path === "/api/user/login-test") {
      if (req.cookie.username) {
        return Promise.resolve(
          new SuccessModel({ username: req.cookie.username })
        );
      }
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    ```

- 全选单个函数名称 ctrl + D

const mysql = require("mysql2");

// 创建连接对象
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  port: "3306",
  database: "myblog",
});

// 开始连接
connection.connect();

// 执行 sql 语句
const sql = "select * from users;";
// const sql = `insert into users (username, password, realname) values ('wangwu', '123', '王五');`;
// const sql = `update users set realname='李四2' where username='lisi';`;

connection.query(sql, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(result);
});

// 关闭连接
connection.end();

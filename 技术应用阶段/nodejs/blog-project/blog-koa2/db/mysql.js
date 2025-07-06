const mysql = require("mysql2");
const { MYSQL_CONF } = require("../conf/db");

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接
con.connect();

console.log("mysql is ready");

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

module.exports = {
  exec,
  escape: mysql.escape,
};

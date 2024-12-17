"use strict";

var mysql = require("mysql2");

var _require = require("../conf/db"),
    MYSQL_CONF = _require.MYSQL_CONF; // 创建连接对象


var con = mysql.createConnection(MYSQL_CONF); // 开始连接

con.connect();
console.log("mysql is ready"); // 统一执行 sql 的函数

function exec(sql) {
  return new Promise(function (resolve, reject) {
    con.query(sql, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
}

module.exports = {
  exec: exec,
  escape: mysql.escape
};
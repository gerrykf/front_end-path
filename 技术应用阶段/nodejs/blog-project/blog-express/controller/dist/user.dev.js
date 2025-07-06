"use strict";

var _require = require("../db/mysql"),
    exec = _require.exec,
    escape = _require.escape;

var _require2 = require("../utils/cryp"),
    genPassword = _require2.genPassword;
/**
 * 用户登录
 * @param {*} username
 * @param {*} password
 * @returns
 */


var login = function login(username, password) {
  // username = escape(username);
  // 密码加密
  // password = genPassword(password);
  // password = escape(password);
  console.log("password is", password);
  var sql = "\n    select username, realname from users where username='".concat(username, "' and password=").concat(password, ";\n  ");
  return exec(sql).then(function (rows) {
    return rows[0] || {};
  });
};

module.exports = {
  login: login
};
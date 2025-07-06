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
  var sql, rows;
  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // username = escape(username);
          // 密码加密
          // password = genPassword(password);
          // password = escape(password);
          console.log("password is", password);
          sql = "\n    select username, realname from users where username='".concat(username, "' and password=").concat(password, ";\n  ");
          _context.next = 4;
          return regeneratorRuntime.awrap(exec(sql));

        case 4:
          rows = _context.sent;
          return _context.abrupt("return", rows[0] || {});

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  login: login
};
const { exec } = require("../db/mysql");

/**
 * 用户登录
 * @param {*} username
 * @param {*} password
 * @returns
 */
const login = (username, password) => {
  const sql = `
    select username, realname from users where username='${username}' and password='${password}';
  `;

  return exec(sql).then((rows) => {
    return rows[0] || {};
  });
};

module.exports = {
  login,
};

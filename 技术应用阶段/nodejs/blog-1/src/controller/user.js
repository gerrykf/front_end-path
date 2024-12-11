/**
 * 用户登录
 * @param {*} username
 * @param {*} password
 * @returns
 */
const login = (username, password) => {
  if (username === "zhangsan" && password === "123") {
    console.log("username:", username, "password:", password);
    return true;
  }
  return false;
};

module.exports = {
  login,
};

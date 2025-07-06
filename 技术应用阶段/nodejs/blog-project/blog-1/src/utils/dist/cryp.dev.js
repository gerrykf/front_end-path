"use strict";

var crypto = require("crypto"); // 密匙


var SECRET_KEY = "WJiol_8776#"; // md5 加密

function md5(content) {
  var md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
} // 加密函数


function genPassword(password) {
  var str = "password=".concat(password, "&key=").concat(SECRET_KEY);
  return md5(str);
}

module.exports = {
  genPassword: genPassword
};
"use strict";

var fs = require("fs");

var path = require("path");
/**
 * 写日志
 * @param {*} writeStream 写入流
 * @param {*} log 日志内容
 */


function writeLog(writeStream, log) {
  writeStream.write(log + "\n");
}
/**
 * 生成 write stream
 * @param {*} fileName 文件名
 * @returns
 */


function createWriteStream(fileName) {
  var fullFileName = path.join(__dirname, "../", "../", "logs", fileName);
  var writeStream = fs.createWriteStream(fullFileName, {
    flags: "a"
  });
  return writeStream;
} // 写访问日志


var accessWriteStream = createWriteStream("access.log");

function access(log) {
  writeLog(accessWriteStream, log + "\n");
}

module.exports = {
  access: access
};
const fs = require("fs");
const path = require("path");

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
  const fullFileName = path.join(__dirname, "../", "../", "logs", fileName);

  const writeStream = fs.createWriteStream(fullFileName, {
    flags: "a",
  });
  return writeStream;
}

// 写访问日志
const accessWriteStream = createWriteStream("access.log");
function access(log) {
  writeLog(accessWriteStream, log + "\n");
}

module.exports = {
  access,
};

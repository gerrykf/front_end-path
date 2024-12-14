"use strict";

var fs = require("fs");

var path = require("path");

var readline = require("readline"); // 文件名


var fileName = path.join(__dirname, "../", "../", "logs", "access.log"); // 创建 read stream

var readStram = fs.createReadStream(fileName); // 创建 readline 对象

var rl = readline.createInterface({
  input: readStram
});
var chromeNum = 0;
var sum = 0; // 逐行读取

rl.on("line", function (lineData) {
  if (!lineData) {
    return;
  }

  sum++;
  var arr = lineData.split(" -- ");

  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    chromeNum++;
  }
}); // 监听读取完成

rl.on("close", function () {
  console.log("Chrome 占比：" + chromeNum / sum);
});
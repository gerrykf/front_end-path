const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 文件名
const fileName = path.join(__dirname, "../", "../", "logs", "access.log");

// 创建 read stream
const readStram = fs.createReadStream(fileName);

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStram,
});

let chromeNum = 0;
let sum = 0;

// 逐行读取
rl.on("line", (lineData) => {
  if (!lineData) {
    return;
  }

  sum++;

  const arr = lineData.split(" -- ");
  if (arr[2] && arr[2].indexOf("Chrome") > 0) {
    chromeNum++;
  }
});

// 监听读取完成
rl.on("close", () => {
  console.log("Chrome 占比：" + chromeNum / sum);
});

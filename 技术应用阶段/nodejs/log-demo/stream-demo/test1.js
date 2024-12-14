// 标准输入输出流
// process.stdin.pipe(process.stdout); // 输入流和输出流连接在一起  类似于水桶倒水 从一个水桶倒到另一个水桶 倒一点就输出一点

// const http = require("http");
// const server = http.createServer((req, res) => {
//   if (req.method === "POST") {
//     req.pipe(res); // 将请求的数据流向响应的数据流
//   }
// });
// server.listen(8000);

// // 复制文件
// const fs = require("fs");
// const path = require("path");

// const fileName1 = path.resolve(__dirname, "data.txt");
// const fileName2 = path.resolve(__dirname, "data-bak.txt");

// const readStream = fs.createReadStream(fileName1); // 创建读取文件流
// const writeStream = fs.createWriteStream(fileName2); // 创建写入文件流

// readStream.pipe(writeStream); // 将读取的文件流向写入的文件

// // 监听读取的文件流
// readStream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// // 监听读取的文件流结束
// readStream.on("end", () => {
//   console.log("copy done");
// });

// 文件IO 数据流 与 http 数据流
const fs = require("fs");
const path = require("path");
const http = require("http");
const fileName1 = path.resolve(__dirname, "data.txt");
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    const readStream = fs.createReadStream(fileName1); // 创建读取文件流
    readStream.pipe(res); // 将读取的文件流向响应的数据流
  }
});
server.listen(8000);

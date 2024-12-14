const fs = require("fs"); // 文件操作库
const path = require("path"); // 路径操作库

const fileName = path.resolve(__dirname, "data.txt"); // __dirname 当前文件所在目录

// // 读取文件
// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   // data 是二进制类型，需要转换为字符串
//   console.log(data.toString());
// });

// // 写入文件
// const content = "这是新写入的内容\n";
// const opt = {
//   flag: "a", // 追加写入。覆盖用 "w"   a: append 追加  w: write 覆盖
// };
// fs.writeFile(fileName, content, opt, (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
// });

// 判断文件是否存在
// fs.exists(fileName , (exist) => {
//   console.log("exist", exist);
// });

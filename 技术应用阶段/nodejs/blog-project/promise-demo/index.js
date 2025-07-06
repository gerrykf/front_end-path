const fs = require("fs");
const { get } = require("http");
const path = require("path");

// __dirname 当前文件所在的目录 files:当前文件目录
const fullFileName = path.resolve(__dirname, "files", "a.json");
fs.readFile(fullFileName, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.toString());
});

// // callback-hell 方式获取文件内容
// function getFileContent(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, "files", fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     callback(JSON.parse(data.toString()));
//   });
// }

// // 测试 callback-hell
// getFileContent("a.json", (aData) => {
//   console.log("a data", aData);
//   getFileContent(aData.next, (bData) => {
//     console.log("b data", bData);
//     getFileContent(bData.next, (cData) => {
//       console.log("c data", cData);
//     });
//   });
// });

// promise 方式获取文件内容

function getFileContent(fileName) {
  const promise = new Promise((resole, reject) => {
    const fullFileName = path.resolve(__dirname, "files", fileName);

    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resole(JSON.parse(data.toString()));
    });
  });

  return promise;
}

// getFileContent("a.json")
//   .then((aData) => {
//     console.log("a data", aData);
//     return getFileContent(aData.next);
//   })
//   .then((bData) => {
//     console.log("b data", bData);
//     return getFileContent(bData.next);
//   })
//   .then((cData) => {
//     console.log("c data", cData);
//   });

async function readFileData() {
  const aData = await getFileContent("a.json");
  console.log("a data", aData);
  const bData = await getFileContent(aData.next);
  console.log("b data", bData);
  const cData = await getFileContent(bData.next);
  console.log("c data", cData);
}

readFileData();

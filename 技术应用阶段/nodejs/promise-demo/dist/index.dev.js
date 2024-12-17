"use strict";

var fs = require("fs");

var _require = require("http"),
    get = _require.get;

var path = require("path"); // __dirname 当前文件所在的目录 files:当前文件目录


var fullFileName = path.resolve(__dirname, "files", "a.json");
fs.readFile(fullFileName, function (err, data) {
  if (err) {
    console.error(err);
    return;
  }

  console.log(data.toString());
}); // // callback-hell 方式获取文件内容
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
  var promise = new Promise(function (resole, reject) {
    var fullFileName = path.resolve(__dirname, "files", fileName);
    fs.readFile(fullFileName, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resole(JSON.parse(data.toString()));
    });
  });
  return promise;
} // getFileContent("a.json")
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


function readFileData() {
  var aData, bData, cData;
  return regeneratorRuntime.async(function readFileData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getFileContent("a.json"));

        case 2:
          aData = _context.sent;
          console.log("a data", aData);
          _context.next = 6;
          return regeneratorRuntime.awrap(getFileContent(aData.next));

        case 6:
          bData = _context.sent;
          console.log("b data", bData);
          _context.next = 10;
          return regeneratorRuntime.awrap(getFileContent(bData.next));

        case 10:
          cData = _context.sent;
          console.log("c data", cData);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}

readFileData();
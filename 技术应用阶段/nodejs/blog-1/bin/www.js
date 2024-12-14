// 1. create server about logic

const http = require("http");

const POST = 8000;
const serverHandle = require("../app");

const server = http.createServer(serverHandle);
server.listen(POST);
console.log("server is listening on " + "http://localhost:" + POST);

/* 定义路由模块 这块儿与http 与路由有关系 */

const handleBlogRouter = require("./modules/blog.js");
const handleUserRouter = require("./modules/user.js");

module.exports = {
  handleBlogRouter,
  handleUserRouter,
};

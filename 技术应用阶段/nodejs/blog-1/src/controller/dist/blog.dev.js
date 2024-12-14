"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

/* 业务逻辑层 controller 与路由层 router 的分离 该层只关心数据的来源 */
var _require = require("../db/mysql"),
    exec = _require.exec;

var xss = require("xss");
/**
 * 获取博客列表
 * @param {*} author 作者
 * @param {*} keyword 关键字
 * @returns
 */


var getList = function getList(author, keyword) {
  var sql = "select * from blogs where 1=1 "; // 1=1 是为了拼接后续的条件

  if (author) {
    sql += "and author='".concat(author, "' ");
  }

  if (keyword) {
    sql += "and title like '%".concat(keyword, "%' ");
  }

  sql += "order by createtime desc;"; // 返回 promise

  return exec(sql);
};
/**
 * 获取博客详情
 * @param {*} id
 * @returns
 */


var getDetail = function getDetail(id) {
  var sql = "select * from blogs where id='".concat(id, "'");
  return exec(sql).then(function (rows) {
    return rows[0];
  });
};
/**
 * 新建博客
 * @param {*} blogData
 * @returns
 */


var newBlog = function newBlog() {
  var blogData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  // blogData 是一个博客对象，包含 title content 属性
  console.log("newBlog blogData...", blogData);
  var title = blogData.title,
      content = blogData.content,
      author = blogData.author;
  title = (_readOnlyError("title"), xss(title));
  content = (_readOnlyError("content"), xss(content));
  var createTime = Date.now();
  var sql = "\n  insert into blogs (title, content, createtime, author)  \n  values ('".concat(title, "', '").concat(content, "', ").concat(createTime, ", '").concat(author, "');");
  return exec(sql).then(function (insertData) {
    console.log("insertData is ", insertData);
    return {
      id: insertData.insertId
    };
  });
};
/**
 * 更新博客
 * @param {*} id
 * @param {*} blogData
 * @returns
 */


var updateBlog = function updateBlog(id) {
  var blogData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  console.log("updateBlog id, blogData...", id, blogData);
  var title = blogData.title,
      content = blogData.content;
  var sql = "\n  update blogs set title='".concat(title, "', content='").concat(content, "' where id=").concat(id, ";");
  return exec(sql).then(function (updateData) {
    console.log("updateData is ", updateData);

    if (updateData.affectedRows > 0) {
      return true;
    }

    return false;
  });
};
/**
 * 删除博客
 * @param {*} id
 * @returns
 */


var delBlog = function delBlog(id, author) {
  // id 就是要删除博客的 id
  console.log("delBlog id...", id);
  var sql = "delete from blogs where id=".concat(id, " and author='").concat(author, "';");
  return exec(sql).then(function (delData) {
    console.log("delData is ", delData);

    if (delData.affectedRows > 0) {
      return true;
    }

    return false;
  });
};

module.exports = {
  getList: getList,
  getDetail: getDetail,
  newBlog: newBlog,
  updateBlog: updateBlog,
  delBlog: delBlog
};
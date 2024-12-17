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
  var sql;
  return regeneratorRuntime.async(function getList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sql = "select * from blogs where 1=1 "; // 1=1 是为了拼接后续的条件

          if (author) {
            sql += "and author='".concat(author, "' ");
          }

          if (keyword) {
            sql += "and title like '%".concat(keyword, "%' ");
          }

          sql += "order by createtime desc;"; // 返回 promise

          _context.next = 6;
          return regeneratorRuntime.awrap(exec(sql));

        case 6:
          return _context.abrupt("return", _context.sent);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};
/**
 * 获取博客详情
 * @param {*} id
 * @returns
 */


var getDetail = function getDetail(id) {
  var sql, rows;
  return regeneratorRuntime.async(function getDetail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sql = "select * from blogs where id='".concat(id, "'");
          _context2.next = 3;
          return regeneratorRuntime.awrap(exec(sql));

        case 3:
          rows = _context2.sent;
          return _context2.abrupt("return", rows[0]);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};
/**
 * 新建博客
 * @param {*} blogData
 * @returns
 */


var newBlog = function newBlog() {
  var blogData,
      title,
      content,
      author,
      createTime,
      sql,
      insertData,
      _args3 = arguments;
  return regeneratorRuntime.async(function newBlog$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          blogData = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          // blogData 是一个博客对象，包含 title content 属性
          console.log("newBlog blogData...", blogData);
          title = blogData.title, content = blogData.content, author = blogData.author;
          title = (_readOnlyError("title"), xss(title));
          content = (_readOnlyError("content"), xss(content));
          createTime = Date.now();
          sql = "\n  insert into blogs (title, content, createtime, author)  \n  values ('".concat(title, "', '").concat(content, "', ").concat(createTime, ", '").concat(author, "');");
          _context3.next = 9;
          return regeneratorRuntime.awrap(exec(sql));

        case 9:
          insertData = _context3.sent;
          return _context3.abrupt("return", {
            id: insertData.insertId
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};
/**
 * 更新博客
 * @param {*} id
 * @param {*} blogData
 * @returns
 */


var updateBlog = function updateBlog(id) {
  var blogData,
      title,
      content,
      sql,
      updateData,
      _args4 = arguments;
  return regeneratorRuntime.async(function updateBlog$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          blogData = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          // id 就是要更新博客的 id
          // blogData 是一个博客对象，包含 title content 属性
          console.log("updateBlog id, blogData...", id, blogData);
          title = blogData.title, content = blogData.content;
          sql = "\n  update blogs set title='".concat(title, "', content='").concat(content, "' where id=").concat(id, ";");
          _context4.next = 6;
          return regeneratorRuntime.awrap(exec(sql));

        case 6:
          updateData = _context4.sent;
          return _context4.abrupt("return", updateData.affectedRows > 0);

        case 8:
        case "end":
          return _context4.stop();
      }
    }
  });
};
/**
 * 删除博客
 * @param {*} id
 * @returns
 */


var delBlog = function delBlog(id, author) {
  var sql, delData;
  return regeneratorRuntime.async(function delBlog$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // id 就是要删除博客的 id
          console.log("delBlog id...", id);
          sql = "delete from blogs where id=".concat(id, " and author='").concat(author, "';");
          _context5.next = 4;
          return regeneratorRuntime.awrap(exec(sql));

        case 4:
          delData = _context5.sent;
          return _context5.abrupt("return", delData.affectedRows > 0);

        case 6:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  getList: getList,
  getDetail: getDetail,
  newBlog: newBlog,
  updateBlog: updateBlog,
  delBlog: delBlog
};
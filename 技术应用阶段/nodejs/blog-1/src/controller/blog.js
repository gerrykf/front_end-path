/* 业务逻辑层 controller 与路由层 router 的分离 该层只关心数据的来源 */
const { exec } = require("../db/mysql");
const xss = require("xss");

/**
 * 获取博客列表
 * @param {*} author 作者
 * @param {*} keyword 关键字
 * @returns
 */
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `; // 1=1 是为了拼接后续的条件
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  // 返回 promise
  return exec(sql);
};

/**
 * 获取博客详情
 * @param {*} id
 * @returns
 */
const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

/**
 * 新建博客
 * @param {*} blogData
 * @returns
 */
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  console.log("newBlog blogData...", blogData);

  const { title, content, author } = blogData;
  title = xss(title);
  content = xss(content);
  const createTime = Date.now();

  const sql = `
  insert into blogs (title, content, createtime, author)  
  values ('${title}', '${content}', ${createTime}, '${author}');`;

  return exec(sql).then((insertData) => {
    console.log("insertData is ", insertData);
    return {
      id: insertData.insertId,
    };
  });
};

/**
 * 更新博客
 * @param {*} id
 * @param {*} blogData
 * @returns
 */
const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  console.log("updateBlog id, blogData...", id, blogData);

  const { title, content } = blogData;

  const sql = `
  update blogs set title='${title}', content='${content}' where id=${id};`;

  return exec(sql).then((updateData) => {
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
const delBlog = (id, author) => {
  // id 就是要删除博客的 id
  console.log("delBlog id...", id);

  const sql = `delete from blogs where id=${id} and author='${author}';`;

  return exec(sql).then((delData) => {
    console.log("delData is ", delData);
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};

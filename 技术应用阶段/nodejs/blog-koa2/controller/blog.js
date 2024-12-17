/* 业务逻辑层 controller 与路由层 router 的分离 该层只关心数据的来源 */
const { exec } = require("../db/mysql");
const xss = require("xss");

/**
 * 获取博客列表
 * @param {*} author 作者
 * @param {*} keyword 关键字
 * @returns
 */
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `; // 1=1 是为了拼接后续的条件
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  // 返回 promise
  return await exec(sql);
};

/**
 * 获取博客详情
 * @param {*} id
 * @returns
 */
const getDetail = async (id) => {
  const sql = `select * from blogs where id='${id}'`;
  const rows = await exec(sql);
  return rows[0];
};

/**
 * 新建博客
 * @param {*} blogData
 * @returns
 */
const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  console.log("newBlog blogData...", blogData);

  const { title, content, author } = blogData;
  title = xss(title);
  content = xss(content);
  const createTime = Date.now();

  const sql = `
  insert into blogs (title, content, createtime, author)  
  values ('${title}', '${content}', ${createTime}, '${author}');`;

  const insertData = await exec(sql);
  return {
    id: insertData.insertId,
  };
};

/**
 * 更新博客
 * @param {*} id
 * @param {*} blogData
 * @returns
 */
const updateBlog = async (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  console.log("updateBlog id, blogData...", id, blogData);

  const { title, content } = blogData;

  const sql = `
  update blogs set title='${title}', content='${content}' where id=${id};`;

  const updateData = await exec(sql);
  return updateData.affectedRows > 0;
};

/**
 * 删除博客
 * @param {*} id
 * @returns
 */
const delBlog = async (id, author) => {
  // id 就是要删除博客的 id
  console.log("delBlog id...", id);

  const sql = `delete from blogs where id=${id} and author='${author}';`;

  const delData = await exec(sql);
  return delData.affectedRows > 0;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};

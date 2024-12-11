/* 业务逻辑层 controller 与路由层 router 的分离 该层只关心数据的来源 */

/**
 * 获取博客列表
 * @param {*} author
 * @param {*} keyword
 * @returns
 */
const getList = (author, keyword) => {
  //先返回假数据（格式是正确的）
  return [
    {
      id: 1,
      title: "标题A",
      content: "内容A",
      createTime: 1605595700000,
      author: "zhangsan",
    },
    {
      id: 2,
      title: "标题B",
      content: "内容B",
      createTime: 1605595710000,
      author: "lisi",
    },
    {
      id: 3,
      title: "标题C",
      content: "内容C",
      createTime: 1605595720000,
      author: "wangwu",
    },
  ];
};

/**
 * 获取博客详情
 * @param {*} id
 * @returns
 */
const getDetail = (id) => {
  //先返回假数据
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1605595700000,
    author: "zhangsan",
  };
};

/**
 * 新建博客
 * @param {*} blogData
 * @returns
 */
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content 属性
  console.log("newBlog blogData...", blogData);
  return {
    id: 3, // 表示新建博客，插入到数据表里面的 id
  };
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
  return true;
};

/**
 * 删除博客
 * @param {*} id
 * @returns
 */
const delBlog = (id) => {
  // id 就是要删除博客的 id
  console.log("delBlog id...", id);
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};

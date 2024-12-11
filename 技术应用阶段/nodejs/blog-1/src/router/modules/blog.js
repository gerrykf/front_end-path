const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../../controller/blog.js");
const { SuccessModel, ErrorModel } = require("../../model/resModel.js");

const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if (req.method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);

    return new SuccessModel(listData);
  }

  // 获取博客详情
  if (req.method === "GET" && req.path === "/api/blog/detail") {
    const id = req.query.id || "";
    const detailData = getDetail(id);

    return new SuccessModel(detailData);
  }

  // 新建一篇博客
  if (req.method === "POST" && req.path === "/api/blog/new") {
    const data = newBlog(req.body);

    return new SuccessModel(data);
  }

  // 更新一篇博客
  if (req.method === "POST" && req.path === "/api/blog/update") {
    const id = req.query.id || "";
    const result = updateBlog(id, req.body);

    if (result) return new SuccessModel();
    return new ErrorModel("更新博客失败");
  }

  // 删除一篇博客
  if (req.method === "POST" && req.path === "/api/blog/del") {
    const id = req.query.id || "";
    const result = delBlog(id);

    if (result) return new SuccessModel();
    return new ErrorModel("删除博客失败");
  }
};

module.exports = handleBlogRouter;

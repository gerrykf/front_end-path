const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../../controller/blog");
const { SuccessModel, ErrorModel } = require("../../model/resModel");

/**
 * 登录验证
 * @param {*} req
 * @returns
 */
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel("尚未登录"));
  }
};

const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id || "";

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    // const listData = getList(author, keyword);
    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    const result = getDetail(id);
    return result.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }

  // 新建一篇博客
  if (method === "POST" && req.path === "/api/blog/new") {
    // const data = newBlog(req.body);
    // return new SuccessModel(data);

    // 登录验证
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    req.body.author = req.session.username; // 登录的用户名
    const result = newBlog(req.body);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  // 更新一篇博客
  if (method === "POST" && req.path === "/api/blog/update") {
    // 登录验证
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    const result = updateBlog(id, req.body);

    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      }
      return new ErrorModel("更新博客失败");
    });
  }

  // 删除一篇博客
  if (method === "POST" && req.path === "/api/blog/del") {
    // 登录验证
    const loginCheckResult = loginCheck(req);
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }

    const author = req.session.username; // 登录的用户名
    const result = delBlog(id, author);

    return result.then((val) => {
      if (val) {
        return new SuccessModel();
      }
      return new ErrorModel("删除博客失败");
    });
  }
};

module.exports = handleBlogRouter;

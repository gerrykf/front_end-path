const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../../controller/blog");
const { get } = require("../../db/redis");
const { SuccessModel, ErrorModel } = require("../../model/resModel");

// 统一的登录验证函数
const loginCheck = (req) => {
  console.log("loginCheck", req.session);

  get(req.sessionId).then((sessionData) => {
    if (sessionData == null) {
      // 未登录
      return Promise.resolve(new ErrorModel("尚未登录"));
    }
    // 已登录
    return Promise.resolve(new SuccessModel(sessionData));
  });
};

const handleBlogRouter = async (req, res) => {
  const method = req.method;
  const id = req.query.id || "";

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    let author = req.query.author || "";
    const keyword = req.query.keyword || "";

    // 管理员界面
    if (req.query.isadmin) {
      const loginCheckResult = await loginCheck(req);
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }

      get(req.sessionId).then((sessionData) => {
        if (sessionData.username == null) {
          // 未登录
          return Promise.resolve(new ErrorModel("尚未登录"));
        }
        // 强制查询自己的博客
        author = sessionData.username;

        const result = getList(author, keyword);
        return result.then((listData) => {
          return new SuccessModel(listData);
        });
      });
    }

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

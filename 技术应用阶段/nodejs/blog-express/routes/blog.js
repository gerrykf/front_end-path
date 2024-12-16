var express = require("express");
var router = express.Router();
const { SuccessModel, ErrorModel } = require("../model/resModel");
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const loginCheck = require("../middleware/loginCheck");

router.get("/list", (req, res, next) => {
  let author = req.query.author || "";
  const keyword = req.query.keyword || "";

  // 管理员界面
  if (req.query.isadmin) {
    console.log("isadmin--req.session", req.session);
    if (req.session.username == null) {
      // 未登录
      return res.json(new ErrorModel("尚未登录"));
    }
  }

  const result = getList(author, keyword);
  return result.then((listData) => {
    res.json(new SuccessModel(listData));
  });
});

router.get("/detail", (req, res, next) => {
  const result = getDetail(req.query.id);
  return result.then((data) => {
    res.json(new SuccessModel(data));
  });
});

router.post("/new", loginCheck, (req, res, next) => {
  req.body.author = req.session.username;
  const result = newBlog(req.body);
  return result.then((data) => {
    res.json(new SuccessModel(data));
  });
});

router.post("/update", loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body);
  return result.then((val) => {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("更新博客失败"));
    }
  });
});

router.post("/del", loginCheck, (req, res, next) => {
  const author = req.session.username;
  const result = delBlog(req.query.id, author);
  return result.then((val) => {
    if (val) {
      res.json(new SuccessModel());
    } else {
      res.json(new ErrorModel("删除博客失败"));
    }
  });
});

module.exports = router;

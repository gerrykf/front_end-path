"use strict";

var _require = require("../model/resModel"),
    ErrorModel = _require.ErrorModel;

module.exports = function (req, res, next) {
  if (req.session.username) {
    next();
    return;
  }

  res.json(new ErrorModel("尚未登录"));
};
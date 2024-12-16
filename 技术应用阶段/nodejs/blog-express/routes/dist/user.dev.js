"use strict";

var express = require("express");

var router = express.Router();
router.post("/login", function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  res.json({
    errno: 0,
    data: {
      username: username,
      password: password
    }
  });
});
module.exports = router;
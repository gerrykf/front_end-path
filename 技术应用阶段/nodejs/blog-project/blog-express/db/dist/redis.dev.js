"use strict";

var redis = require("redis");

var _require = require("../config/db"),
    REDIS_CONF = _require.REDIS_CONF; // 创建客户端


var redisClient = redis.createClient(REDIS_CONF);
redisClient.on("error", function (err) {
  console.error(err);
});
module.exports = redisClient;
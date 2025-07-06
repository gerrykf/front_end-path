"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var redis = require("redis");

var _require = require("../config/db"),
    REDIS_CONF = _require.REDIS_CONF; // 创建客户端


var redisClient = redis.createClient(REDIS_CONF);
redisClient.on("error", function (err) {
  console.error(err);
});
console.log("redisClient is ready");

function set(key, val) {
  if (_typeof(val) === "object") {
    val = JSON.stringify(val);
  }

  redisClient.set(key, val, redis.print);
}

function get(key) {
  var promise = new Promise(function (resolve, reject) {
    redisClient.get(key, function (err, val) {
      if (err) {
        reject(err);
        return;
      }

      if (val == null) {
        resolve(null);
        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (ex) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set: set,
  get: get
};
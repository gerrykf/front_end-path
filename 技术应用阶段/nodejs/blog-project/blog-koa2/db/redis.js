const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF);
redisClient.on("error", (err) => {
  console.error(err);
});

module.exports = redisClient;

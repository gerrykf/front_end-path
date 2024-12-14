const { createClient } = require("redis");

// 创建客户端
const redisClient = createClient({
  url: "redis://127.0.0.1:6379",
});
redisClient.on("error", (err) => {
  console.error(err);
});

(async () => {
  try {
    // 连接到redis
    await redisClient.connect();

    // 设置值
    await redisClient.set("myname", "zhangsan");
    console.log("Set key successfully");

    // 获取值
    const value = await redisClient.get("myname");
    console.log("Get key successfully", value);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    // 退出
    redisClient.quit();
  }
})();

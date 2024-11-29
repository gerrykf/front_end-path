import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router";

Vue.use(VueRouter); // 注册路由

const router = new VueRouter({
  // 配置路由
  routes,
  mode: "history",
});

export default router;

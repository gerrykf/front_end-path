import { createRouter, createWebHistory } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {}
  interface RouteMeta {
    /** 开启路由缓存 */
    keepAlive?: boolean;
    /** 是否允许匿名访问 */
    allowAnonymous?: boolean;
    /** 是否隐藏底部 */
    hideFooter?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "list",
      component: import("@/views/list/index.vue"),
      meta: {
        allowAnonymous: false,
      },
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/index.vue"),
      meta: {
        allowAnonymous: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/login.vue"),
      meta: {
        allowAnonymous: true,
      },
    },
  ],
});

export default router;

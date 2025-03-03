import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { getAsyncPage } from "../utils";
const Home = getAsyncPage("Home");
const Login = getAsyncPage("Login");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

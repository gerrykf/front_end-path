import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { getAsyncPage } from "../utils";
const Home = getAsyncPage("Home");
const About = getAsyncPage("About");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

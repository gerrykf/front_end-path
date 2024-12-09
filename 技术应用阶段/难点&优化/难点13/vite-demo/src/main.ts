import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App); // 创建应用实例

app.use(router); // 注册路由
app.use(ElementPlus); // 注册ElementPlus插件

app.mount("#app"); // 挂载到#app节点

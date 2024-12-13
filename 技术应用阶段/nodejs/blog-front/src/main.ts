import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// 或全量引入
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { whoAmI } from "./store/useLoginUser";

const app = createApp(App);
app.use(router);
app.mount("#app");

whoAmI();

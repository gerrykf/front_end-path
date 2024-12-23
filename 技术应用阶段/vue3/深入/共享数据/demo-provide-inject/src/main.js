import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import provideStore from "./store";

const app = createApp(App);
app.use(router);
provideStore(app);
app.mount("#app");

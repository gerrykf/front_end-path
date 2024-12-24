import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";
import { myPiniaPlugin1 } from "./plugins/myPlugin";

const pinia = createPinia();
pinia.use(myPiniaPlugin1);
pinia.use(myPiniaPlugin2);
pinia.use(myPiniaPlugin3);

const app = createApp(App);
app.use(pinia);
app.mount("#app");

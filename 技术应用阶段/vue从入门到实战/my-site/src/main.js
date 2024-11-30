import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";

Vue.config.productionTip = false;

const div = document.createElement("div");
document.body.appendChild(div);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

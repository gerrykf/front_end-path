// 入口模块文件

// https://v2.cn.vuejs.org/v2/guide/installation.html
// https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.esm.browser.js
import Vue from "./vue.esm.browser.js";
import App from "./App.js";

new Vue({
  render: (h) => h(App),
}).$mount("#app");

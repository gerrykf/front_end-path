// 库的入口文件
// 核心是导出一个install方法，用于Vue.use()安装插件
import type { App, Plugin } from 'vue';
// 引入组件
import Button from './components/Button.vue';
import Card from './components/Card.vue';
import Dialog from './components/Dialog.vue';

const components = [Button, Card, Dialog];

// 定义插件的install方法
// 回头用户在main.js中使用Vue.use()安装插件时，就会调用这个方法

const install: Exclude<Plugin['install'], undefined> = (app: App): void => {
  components.forEach((component) => {
    app.component(component.name as string, component);
  });
};

const vueComps: Plugin = {
  install,
};

export default vueComps;
export { Button, Card, Dialog };

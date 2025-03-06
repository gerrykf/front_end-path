import './assets/main.css';
import './styles/normalize.scss';
import { createApp } from 'vue';
import App from './App.vue';
// 引入自定义组件
import Button from './components/Button.vue';
import Card from './components/Card.vue';
import Dialog from './components/Dialog.vue';
// 全局注册组件
const app = createApp(App);
app.component(Button.name, Button);
app.component(Card.name, Card);
app.component(Dialog.name, Button);
app.mount('#app');

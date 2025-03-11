import { createApp } from 'vue'
import App from './App.vue'
import './assets/fonts/font.scss'

// 引入自定义组件
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Dialog from './components/Dialog.vue'

const app = createApp(App)

// 全局注册组件
app.component(Button.name as string, Button)
app.component(Card.name as string, Card)
app.component(Dialog.name as string, Dialog)

app.mount('#app')
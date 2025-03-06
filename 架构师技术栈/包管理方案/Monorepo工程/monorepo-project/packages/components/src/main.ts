import './assets/main.css'
import './styles/normalize.scss'

import { createApp } from 'vue'
import App from './App.vue'

// 引入自定义组件
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Dialog from './components/Dialog.vue'

// 全局注册组件

const app = createApp(App)
app.component(Button.name as string, Button)
app.component(Card.name as string, Card)
app.component(Dialog.name as string, Button)
app.mount('#app')

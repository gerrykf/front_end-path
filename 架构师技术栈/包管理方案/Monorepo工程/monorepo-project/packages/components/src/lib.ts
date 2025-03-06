// 库的入口文件
// 核心就是导出一个 install 方法

import type { App, Plugin } from 'vue'
// 引入组件
import Button from './components/Button.vue'
import Dialog from './components/Dialog.vue'
import Card from './components/Card.vue'

const components = [Button, Dialog, Card]

// 定义插件的 install 方法
// 回头用户在使用 use 注册你这个库的时候，就会调用这个方法
const install = (app: App) => {
  components.forEach((com) => {
    app.component(com.name as string, com)
  })
}

const vuecoms: Plugin = {
  install
}

export default vuecoms
export { Button, Dialog, Card }

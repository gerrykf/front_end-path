// 库的入口文件
// 核心就是到处一个 install 方法
import type { App, Plugin } from 'vue'
// 引入组件
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Dialog from './components/Dialog.vue'

const components = [Button, Card, Dialog]

// 定义插件的 install 方法
// 回头用户在使用的时候，只需要引入这个插件，然后通过 app.use() 方法安装插件即可
const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name as string, component)
  })
}

const vuecoms: Plugin = {
  install,
}

// 导出插件
export default vuecoms
export { Button, Card, Dialog }

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import vueComps from 'vue-comps'
import 'vue-comps/assets/main.css'

const app = createApp(App)

app.use(vueComps) // 背后就是执行vueComps.install(app)
app.mount('#app')

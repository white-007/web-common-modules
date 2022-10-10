import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import directives from '@/directives'
import VueClipboard from 'vue-clipboard2'
import '@/permission'
import '@/common/walden' // echarts walden主题样式
import './common/scss/index.scss'

const app = createApp(App)
app.use(createPinia()).use(router).use(ElementPlus).use(directives).use(VueClipboard).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createBootstrap } from 'bootstrap-vue-next'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/styles/global.css'
import App from './App.vue'
import router from './router'
import { createI18nPlugin } from './plugins/i18n'
import { autoLoginGuest } from './utils/guestAuth'

console.log('user-web 应用启动')

// 创建i18n插件实例
const i18nPlugin = createI18nPlugin()

const app = createApp(App)
app.use(router)
app.use(i18nPlugin)
app.use(createBootstrap()) // 添加BootstrapVue 3

// 在开发环境中暴露 router 到 window 对象，方便调试
if (import.meta.env.DEV) {
  ; (window as any).$router = router
  console.log('Router 已挂载到 window.$router')
}

// 挂载应用
app.mount('#app')

// 初始化默认语言
const savedLocale = localStorage.getItem('user-web-locale') || 'zh'
i18nPlugin.switchLocale(savedLocale)

// 游客自动登录
console.log('开始游客自动登录...')
autoLoginGuest()

console.log('user-web 应用启动完成')

// 导出插件实例供其他模块使用
export { i18nPlugin }

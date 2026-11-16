import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import './assets/styles/global.css'
import App from './App.vue'
import router from './router'
import { createI18nPlugin } from './plugins/i18n'
import { autoLoginGuest } from './utils/guestAuth'
import { checkApiHealth } from './utils/healthCheck'
import SvgIcon from './components/SvgIcon.vue'

// 导入 SVG 图标注册
import 'virtual:svg-icons-register'

console.log('user-web 应用启动')

// 创建i18n插件实例
const i18nPlugin = createI18nPlugin()

const app = createApp(App)
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(i18nPlugin)
// 移除全局注册，改为按需引入组件

// 在开发环境中暴露 router 到 window 对象，方便调试
if (import.meta.env.DEV) {
  ; (window as any).$router = router
  console.log('Router 已挂载到 window.$router')
}

// 初始化默认语言
const savedLocale = localStorage.getItem('user-web-locale') || 'zh'
i18nPlugin.switchLocale(savedLocale)

// 在首次挂载前完成一次认证恢复/游客会话初始化，避免首页鉴权请求抢跑。
// 最长等待 8 秒；失败时仍继续渲染，由现有页面降级体验承接。
const bootstrap = async () => {
  const guestAuthReady = Promise.race([
    autoLoginGuest(),
    new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), 8000)),
  ])
  await guestAuthReady

  // 挂载应用
  app.mount('#app')

  // 后台探测 API 可用性，不阻塞页面渲染或游客登录流程。
  void checkApiHealth().then((healthy) => {
    if (!healthy) {
      console.warn('[API] 健康检查失败，后续请求可能不可用')
    }
  })

  console.log('user-web 应用启动完成')
}

void bootstrap()

// 导出插件实例供其他模块使用
export { i18nPlugin }

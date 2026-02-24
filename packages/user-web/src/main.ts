import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/styles/global.css'
import App from './App.vue'
import router from './router'
import { createI18nPlugin } from './plugins/i18n'
import { autoLoginGuest } from './utils/guestAuth'

console.log('user-web main.ts 开始执行')
console.log('window.__POWERED_BY_WUJIE__:', (window as any).__POWERED_BY_WUJIE__)
console.log('window.__WUJIE__:', (window as any).__WUJIE__)

// 创建i18n插件实例
const i18nPlugin = createI18nPlugin()

const app = createApp(App)
app.use(router)
app.use(i18nPlugin)

// 在开发环境中暴露 router 到 window 对象，方便调试
if (import.meta.env.DEV) {
  ; (window as any).$router = router
  console.log('Router 已挂载到 window.$router')
}

// 微前端环境检测 - 只检查 Wujie 特定标记
const isWujieEnv = !!(window as any).__POWERED_BY_WUJIE__ || !!(window as any).__WUJIE__

console.log('微前端环境检测:', isWujieEnv)

if (isWujieEnv) {
  console.log('检测到微前端环境')
  let instance: any

    // 设置挂载函数
    ; (window as any).__WUJIE_MOUNT__ = () => {
      console.log('微前端挂载函数被调用')
      try {
        instance = app.mount('#app')
        console.log('微前端挂载成功')

        // 监听主应用的语言变化
        if ((window as any).__PARENT_APP__) {
          const parentLocale = (window as any).__PARENT_APP__.locale
          if (parentLocale && parentLocale !== i18nPlugin.currentLocale) {
            i18nPlugin.switchLocale(parentLocale)
          }
        }
      } catch (error) {
        console.error('微前端挂载失败:', error)
      }
    }

    // 设置卸载函数
    ; (window as any).__WUJIE_UNMOUNT__ = () => {
      console.log('微前端卸载函数被调用')
      try {
        instance?.unmount()
        console.log('微前端卸载成功')
      } catch (error) {
        console.error('微前端卸载失败:', error)
      }
    }

  // 如果已经有挂载标记，立即挂载
  if ((window as any).__WUJIE_MOUNT__) {
    console.log('立即执行挂载')
      ; (window as any).__WUJIE_MOUNT__()
  }
} else {
  console.log('独立环境，直接挂载')
  app.mount('#app')
}

// 初始化默认语言
const savedLocale = localStorage.getItem('user-web-locale') || 'zh'
i18nPlugin.switchLocale(savedLocale)

// 游客自动登录
console.log('开始游客自动登录...')
autoLoginGuest()

console.log('user-web main.ts 执行完成')

// 导出插件实例供其他模块使用
export { i18nPlugin }

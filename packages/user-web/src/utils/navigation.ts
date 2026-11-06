import { getAdminSsoConfig } from './adminSso'
import { autoLoginGuest } from './guestAuth'

/**
 * 跨应用导航工具
 * 用于子应用与主应用之间的路由跳转
 */

export interface NavigationOptions {
  path: string
  replace?: boolean
}

/**
 * 导航到主应用的路由
 * @param path 目标路径
 * @param replace 是否使用 replace 模式（不会在历史记录中留下记录）
 */
export const navigateToMainApp = (path: string, replace = false) => {
  console.log(`🔗 navigateToMainApp called: ${path}, replace: ${replace}`)
  
  // 检查是否在微前端环境中
  if (window.parent && window.parent !== window) {
    console.log('📤 Sending NAVIGATE message to parent app')
    // 发送导航消息给主应用
    window.parent.postMessage({
      type: 'NAVIGATE',
      path,
      replace
    }, '*')
    console.log('✅ Message sent successfully')
  } else {
    // 独立运行时，使用普通路由跳转
    console.warn('⚠️ Not in micro-frontend environment, using window.location')
    if (replace) {
      window.location.replace(path)
    } else {
      window.location.href = path
    }
  }
}

/**
 * 登出并以游客身份返回首页
 * @param clearGuestAccount 是否清除游客账号
 */
export const logoutAndNavigate = async (clearGuestAccount = false) => {
  console.log('Logging out...')
  const token = localStorage.getItem('token')
  try {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
    await fetch(`${baseUrl}/app/logout`, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: '' })
  } catch (error) { console.warn('退出登录接口调用失败，继续清理本地状态:', error) }
  
  // 清除本地存储
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('userInfo')
  localStorage.removeItem('lastVisitedRoute')
  
  if (clearGuestAccount) {
    localStorage.removeItem('guestAccount')
  }
  
  // 检查是否在微前端环境中
  // 退出后保留游客账号，立即恢复当前游客会话，避免页面落到登录页。
  if (!clearGuestAccount) {
    await autoLoginGuest()
  }

  if (window.parent && window.parent !== window) {
    // 发送登出消息给主应用
    window.parent.postMessage({
      type: 'LOGOUT',
      clearGuestAccount,
      redirectPath: '/'
    }, '*')
    // 明确要求宿主返回首页；LOGOUT 仅负责同步登录态。
    window.parent.postMessage({ type: 'NAVIGATE', path: '/', replace: true }, '*')
  } else {
    // 独立运行时，直接跳转
    window.location.replace('/')
  }
}

/** 将 C 端 admin audience token 写入管理端 Cookie，并进入管理端。 */
const writeAdminTokenCookie = (token: string, adminUrl: string): boolean => {
  let adminHost = window.location.hostname
  let secure = window.location.protocol === 'https:'
  try {
    const parsed = new URL(adminUrl, window.location.href)
    adminHost = parsed.hostname
    secure = parsed.protocol === 'https:'
  } catch {
    console.warn('管理端地址无效，使用当前页面域名写入 Cookie')
  }

  // 浏览器只接受当前主机或其父域名；完全不同域名必须由后端重定向 Set-Cookie。
  const currentHost = window.location.hostname
  const canSetDomain = adminHost === 'localhost' ||
    currentHost === adminHost ||
    currentHost.endsWith(`.${adminHost}`) ||
    adminHost.endsWith(`.${currentHost}`)
  if (!canSetDomain) {
    console.error(`无法从 ${currentHost} 写入 ${adminHost} 的 Cookie；请由后端通过重定向/Set-Cookie 建立管理端会话。`)
    window.alert('管理端与当前站点不在同一域名，无法直接共享登录状态，请联系管理员配置后端跳转。')
    return false
  }

  const encoded = encodeURIComponent(token)
  const attributes = ['Admin-Token=' + encoded, 'Path=/', 'SameSite=Lax']
  if (secure) attributes.push('Secure')
  if (adminHost !== 'localhost' && /^[a-zA-Z0-9.-]+$/.test(adminHost) && !/^\d+(?:\.\d+){3}$/.test(adminHost)) {
    attributes.splice(1, 0, `Domain=${adminHost}`)
  }
  document.cookie = attributes.join('; ')
  // Domain=localhost 在部分浏览器会被拒绝，回退为 host-only Cookie。
  if (adminHost === 'localhost' && !document.cookie.split('; ').some(item => item.startsWith('Admin-Token='))) {
    document.cookie = ['Admin-Token=' + encoded, 'Path=/', 'SameSite=Lax', ...(secure ? ['Secure'] : [])].join('; ')
  }
  return true
}

const navigateToAdminLogin = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    window.alert('请先登录 C 端账号')
    return
  }
  const { baseUrl: adminBaseUrl } = getAdminSsoConfig()
  const adminUrl = adminBaseUrl || window.location.origin
  if (!writeAdminTokenCookie(token, adminUrl)) return

  // 微前端宿主将 /admin/login 映射到管理端应用，保留既有消息协议。
  if (window.parent && window.parent !== window) {
    navigateToMainApp('/admin/login')
    return
  }
  if (!adminBaseUrl) {
    // 本地/同源部署的管理端入口是登录路由；直接访问 /admin 会落到
    // 管理端未注册的静态路径，从而被服务器返回 404。
    window.location.replace('/admin/login')
    return
  }
  window.location.replace(new URL('/admin/login', `${adminBaseUrl}/`).toString())
}

/**
 * 常用路由快捷方法
 */
export const navigation = {
  toLogin: () => navigateToMainApp('/login'),
  toRegister: () => navigateToMainApp('/register'),
  toUser: () => navigateToMainApp('/user'),
  // Unified B-side sign-in route; deliberately never forwards a C-side token.
  toDashboard: navigateToAdminLogin,
  toAdminLogin: navigateToAdminLogin,
  logout: (clearGuestAccount = false) => logoutAndNavigate(clearGuestAccount)
}

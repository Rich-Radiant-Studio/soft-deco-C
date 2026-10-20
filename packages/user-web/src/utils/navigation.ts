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
 * 登出并跳转到登录页
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
  if (window.parent && window.parent !== window) {
    // 发送登出消息给主应用
    window.parent.postMessage({
      type: 'LOGOUT',
      clearGuestAccount
    }, '*')
  } else {
    // 独立运行时，直接跳转
    window.location.href = '/login'
  }
}

/**
 * 常用路由快捷方法
 */
export const navigation = {
  toLogin: () => navigateToMainApp('/login'),
  toRegister: () => navigateToMainApp('/register'),
  toUser: () => navigateToMainApp('/user'),
  toDashboard: () => navigateToMainApp('/dashboard'),
  logout: (clearGuestAccount = false) => logoutAndNavigate(clearGuestAccount)
}

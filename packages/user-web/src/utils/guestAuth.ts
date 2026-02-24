/**
 * 游客自动登录工具
 * 根据浏览器指纹或IP地址自动创建并登录游客账号
 */

export interface GuestAccount {
  id: string
  username: string
  token: string
  createdAt: number
  fingerprint: string
  isGuest: boolean
}

/**
 * 生成浏览器指纹
 * 基于浏览器特征生成唯一标识
 */
const generateFingerprint = (): string => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  // 收集浏览器特征
  const features = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ]
  
  // Canvas指纹
  if (ctx) {
    ctx.textBaseline = 'top'
    ctx.font = '14px Arial'
    ctx.fillText('Guest', 2, 2)
    features.push(canvas.toDataURL())
  }
  
  // 生成简单哈希
  const str = features.join('|')
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  return 'fp_' + Math.abs(hash).toString(36)
}

/**
 * 生成游客用户名
 */
const generateGuestUsername = (fingerprint: string): string => {
  const suffix = fingerprint.slice(-6).toUpperCase()
  return `Guest_${suffix}`
}

/**
 * 创建游客账号
 */
export const createGuestAccount = (): GuestAccount => {
  const fingerprint = generateFingerprint()
  const username = generateGuestUsername(fingerprint)
  const guestId = `guest_${fingerprint}_${Date.now()}`
  const token = `guest_token_${fingerprint}_${Date.now()}`
  
  const guestAccount: GuestAccount = {
    id: guestId,
    username,
    token,
    createdAt: Date.now(),
    fingerprint,
    isGuest: true
  }
  
  return guestAccount
}

/**
 * 获取或创建游客账号
 */
export const getOrCreateGuestAccount = (): GuestAccount => {
  const stored = localStorage.getItem('guestAccount')
  
  if (stored) {
    try {
      const account = JSON.parse(stored) as GuestAccount
      // 检查账号是否过期（7天）
      const isExpired = Date.now() - account.createdAt > 7 * 24 * 60 * 60 * 1000
      
      if (!isExpired) {
        console.log('使用已存在的游客账号:', account.username)
        return account
      } else {
        console.log('游客账号已过期，创建新账号')
      }
    } catch (error) {
      console.error('解析游客账号失败:', error)
    }
  }
  
  // 创建新游客账号
  const newAccount = createGuestAccount()
  localStorage.setItem('guestAccount', JSON.stringify(newAccount))
  console.log('创建新游客账号:', newAccount.username)
  
  return newAccount
}

/**
 * 自动登录游客账号
 */
export const autoLoginGuest = (): boolean => {
  try {
    // 检查是否已经登录
    const existingToken = localStorage.getItem('token')
    const existingUserInfo = localStorage.getItem('userInfo')
    
    if (existingToken && existingUserInfo) {
      const userInfo = JSON.parse(existingUserInfo)
      // 如果已经是正式用户，不覆盖
      if (!userInfo.isGuest) {
        console.log('已登录正式用户，跳过游客自动登录')
        return false
      }
    }
    
    // 获取或创建游客账号
    const guestAccount = getOrCreateGuestAccount()
    
    // 保存登录信息
    localStorage.setItem('token', guestAccount.token)
    localStorage.setItem('tokenExpiry', String(Date.now() + 7 * 24 * 60 * 60 * 1000))
    localStorage.setItem('userInfo', JSON.stringify({
      id: guestAccount.id,
      username: guestAccount.username,
      email: '',
      roles: ['guest', 'user'],
      isGuest: true,
      guestAccountId: guestAccount.id
    }))
    
    console.log('游客自动登录成功:', guestAccount.username)
    
    // 通知主应用（如果在微前端环境中）
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'GUEST_LOGIN',
        payload: {
          token: guestAccount.token,
          userInfo: {
            id: guestAccount.id,
            username: guestAccount.username,
            email: '',
            roles: ['guest', 'user'],
            isGuest: true
          }
        }
      }, '*')
    }
    
    return true
  } catch (error) {
    console.error('游客自动登录失败:', error)
    return false
  }
}

/**
 * 清除游客账号
 */
export const clearGuestAccount = () => {
  localStorage.removeItem('guestAccount')
  localStorage.removeItem('token')
  localStorage.removeItem('tokenExpiry')
  localStorage.removeItem('userInfo')
  console.log('游客账号已清除')
}

/**
 * 检查是否为游客
 */
export const isGuestUser = (): boolean => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      const user = JSON.parse(userInfo)
      return user.isGuest === true
    }
  } catch (error) {
    console.error('检查游客状态失败:', error)
  }
  return false
}

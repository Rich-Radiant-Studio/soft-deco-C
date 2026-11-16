export interface CustomerAuthState { token: string | null; isGuest: boolean; isAuthenticated: boolean }

export function getCustomerAuthState(): CustomerAuthState {
  const storedToken = localStorage.getItem('token')
  const expiry = Number(localStorage.getItem('tokenExpiry') || '')
  const token = storedToken && Number.isFinite(expiry) && expiry > 0 && expiry <= Date.now() ? null : storedToken
  if (!token && storedToken && expiry > 0 && expiry <= Date.now()) {
    localStorage.removeItem('token')
    localStorage.removeItem('tokenExpiry')
  }
  let userInfo: { isGuest?: boolean } = {}
  try { userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}') } catch { /* invalid session is treated as unauthenticated */ }
  const isGuest = userInfo.isGuest === true
  return { token, isGuest, isAuthenticated: Boolean(token) && !isGuest }
}

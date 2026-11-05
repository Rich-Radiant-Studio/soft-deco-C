/**
 * 管理端 SSO 配置接入点。
 *
 * 这里仅读取部署配置并生成不携带凭据的地址；在后端契约确认前，
 * 不拼接 token、密码，也不臆造兑换接口或参数。
 */
export interface AdminSsoConfig {
  baseUrl: string
  callbackUrl: string
}

export const getAdminSsoConfig = (): AdminSsoConfig => ({
  baseUrl: (import.meta.env.VITE_ADMIN_BASE_URL || '').trim().replace(/\/+$/, ''),
  callbackUrl: (import.meta.env.VITE_ADMIN_SSO_CALLBACK_URL || '').trim()
})

/**
 * 返回已配置的 SSO 回调地址；未配置时返回 null，调用方应保持现有登录页行为。
 * callbackUrl 的具体查询参数/票据契约由后端确认后再实现。
 */
export const getConfiguredAdminSsoUrl = (): string | null => {
  const { baseUrl, callbackUrl } = getAdminSsoConfig()
  if (!baseUrl || !callbackUrl) return null
  try {
    return new URL(callbackUrl, `${baseUrl}/`).toString()
  } catch {
    console.error('VITE_ADMIN_SSO_CALLBACK_URL 配置无效')
    return null
  }
}

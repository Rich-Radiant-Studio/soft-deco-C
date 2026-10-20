export interface HealthResponse {
  code: number
  msg: string
  data: string
}

const HEALTH_PATH = '/app/health'
const DEFAULT_TIMEOUT_MS = 5000

/**
 * Probe the API service without making application startup depend on it.
 * The backend returns an envelope such as { code: 0, msg: '', data: '' }.
 */
export async function checkApiHealth(timeoutMs = DEFAULT_TIMEOUT_MS): Promise<boolean> {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(`${baseUrl}${HEALTH_PATH}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    if (!response.ok) return false

    const payload = (await response.json()) as Partial<HealthResponse>
    return payload.code === 0
  } catch {
    return false
  } finally {
    window.clearTimeout(timeout)
  }
}

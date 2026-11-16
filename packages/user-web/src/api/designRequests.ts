import { getCustomerAuthState } from '@/utils/customerAuth'

export interface DesignOption { code: string; name: string; wholeHouse?: boolean }
export interface DesignTier {
  roomTypeCode: string
  tierCode: string
  kind: 'BUDGET' | 'DESIGN'
  name: string
  priceAmount: number | string
  currency: string
  priceVersion: string | number
}
export interface DesignOptions { rooms: DesignOption[]; styles: DesignOption[]; tags: DesignOption[]; tiers: DesignTier[]; colors: string[]; lengthUnit: string; areaUnit: string }
export class DesignRequestError extends Error {
  constructor(message: string, public code?: string, public status = 0, public businessCode?: number | string, public responseBody?: unknown) {
    super(message)
    this.name = 'DesignRequestError'
  }
}

const baseUrl = () => {
  const value = import.meta.env.VITE_API_BASE_URL || ''
  return value.endsWith('/') ? value.slice(0, -1) : value
}
function customerToken() {
  const auth = getCustomerAuthState()
  if (!auth.isAuthenticated || !auth.token) throw new DesignRequestError(auth.isGuest ? 'Please sign in with a customer account.' : 'Please sign in to continue.', 'UNAUTHORIZED', 401)
  return auth.token
}

async function call(path: string, options: RequestInit = {}, authRequired = true): Promise<unknown> {
  const headers = new Headers(options.headers || {})
  headers.set('Accept', 'application/json')
  if (authRequired) headers.set('Authorization', 'Bearer ' + customerToken())
  if (options.body !== undefined) headers.set('Content-Type', 'application/json')
  let response: Response
  try { response = await fetch(baseUrl() + path, { ...options, headers }) }
  catch { throw new DesignRequestError('Network error. Please check your connection and try again.') }

  let result: Record<string, unknown>
  try {
    const body: unknown = await response.json()
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid response shape')
    result = body as Record<string, unknown>
  } catch { throw new DesignRequestError('Invalid server response.', undefined, response.status) }
  const businessCode = typeof result.code === 'string' || typeof result.code === 'number' ? result.code : undefined
  const message = typeof result.msg === 'string' ? result.msg : typeof result.message === 'string' ? result.message : 'Design request operation failed.'
  const succeeded = businessCode === 0 || businessCode === 200 || (businessCode === undefined && result.success === true)
  if (!response.ok || !succeeded) throw new DesignRequestError(message, String(businessCode ?? ''), response.status, businessCode, result)
  return result.data ?? result
}

function recordList(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object' && !Array.isArray(item))) : []
}
function optionList(value: unknown): DesignOption[] {
  return recordList(value).flatMap(item => typeof item.code === 'string' && typeof item.name === 'string'
    ? [{ code: item.code, name: item.name, wholeHouse: item.wholeHouse === true }]
    : [])
}

export async function getDesignRequestOptions(): Promise<DesignOptions> {
  const data = await call('/app/design-request/options', { method: 'GET' }, false)
  const envelope = data && typeof data === 'object' ? data as Record<string, unknown> : {}
  const optionValue = envelope.options ?? data
  const source = optionValue && typeof optionValue === 'object' ? optionValue as Record<string, unknown> : {}
  const tiers = recordList(source.tiers).filter((tier): tier is Record<string, unknown> & DesignTier =>
    typeof tier.roomTypeCode === 'string' && typeof tier.tierCode === 'string' &&
    (tier.kind === 'BUDGET' || tier.kind === 'DESIGN') && typeof tier.name === 'string' &&
    (typeof tier.priceAmount === 'number' || typeof tier.priceAmount === 'string') &&
    typeof tier.currency === 'string' && (typeof tier.priceVersion === 'number' || typeof tier.priceVersion === 'string')
  )
  const options: DesignOptions = {
    rooms: optionList(source.rooms), styles: optionList(source.styles), tags: optionList(source.tags), tiers,
    colors: Array.isArray(source.colors) ? source.colors.filter((color): color is string => typeof color === 'string') : [],
    lengthUnit: typeof source.lengthUnit === 'string' ? source.lengthUnit : 'ft',
    areaUnit: typeof source.areaUnit === 'string' ? source.areaUnit : 'sqft'
  }
  if (!options.rooms.length || !options.styles.length || !options.tiers.length) throw new DesignRequestError('Design options response is incomplete or invalid.')
  const roomCodes = new Set(options.rooms.map(room => room.code))
  if (options.tiers.some(tier => !roomCodes.has(tier.roomTypeCode))) throw new DesignRequestError('Design options contain a tier for an unknown room.')
  return options
}

export interface DraftRecord { version: number | string; updatedAt?: string; expiresAt?: string; payload: Record<string, unknown> | null }
export async function getDesignRequestDraft(): Promise<DraftRecord | null> {
  const data = await call('/app/design-request/draft')
  const envelope = data && typeof data === 'object' ? data as Record<string, unknown> : {}
  const draftValue = envelope.draft ?? data
  if (!draftValue || typeof draftValue !== 'object' || Array.isArray(draftValue)) return null
  const draft = draftValue as Record<string, unknown>
  if (!draft.payload || typeof draft.payload !== 'object' || Array.isArray(draft.payload)) return null
  const version = typeof draft.version === 'string' || typeof draft.version === 'number' ? draft.version : 0
  return {
    version,
    updatedAt: typeof draft.updatedAt === 'string' ? draft.updatedAt : undefined,
    expiresAt: typeof draft.expiresAt === 'string' ? draft.expiresAt : undefined,
    payload: draft.payload as Record<string, unknown>
  }
}

// Keep JSON request bodies until the backend's controller/OpenAPI confirms a form-parameter protocol.
export async function saveDesignRequestDraft(version: number | string, payload: Record<string, unknown>) {
  return call('/app/design-request/draft', { method: 'POST', body: JSON.stringify({ version, payload }) })
}
export async function submitDesignRequest(payload: Record<string, unknown>, idempotencyKey: string) {
  return call('/app/design-request', { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(payload) })
}

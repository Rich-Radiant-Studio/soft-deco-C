import { getCustomerAuthState } from '@/utils/customerAuth'

export interface TradeRecord { demandId: string; demandNo: string; title: string; amount: string | number; currency: string; status: string; statusText: string; createTime: string }
export interface TradePage { items: TradeRecord[]; total?: number }
export class TradeApiError extends Error { constructor(message: string, public status = 0, public code?: string) { super(message); this.name = 'TradeApiError' } }
const baseUrl = () => { const value = import.meta.env.VITE_API_BASE_URL || ''; return value.endsWith('/') ? value.slice(0, -1) : value }
export async function getTradeList(pageNum = 1, pageSize = 10): Promise<TradePage> {
  if (!Number.isInteger(pageNum) || pageNum < 1) throw new TradeApiError('Page number must be at least 1.')
  if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > 20) throw new TradeApiError('Page size must be between 1 and 20.')
  const auth = getCustomerAuthState()
  if (!auth.isAuthenticated || !auth.token) throw new TradeApiError(auth.isGuest ? 'Sign in with a customer account to view transactions.' : 'Please sign in to view transactions.', 401, 'UNAUTHORIZED')
  const query = new URLSearchParams({ pageNum: String(pageNum), pageSize: String(pageSize) })
  const response = await fetch(baseUrl() + '/app/trade/getList?' + query.toString(), { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Bearer ' + auth.token } })
  let payload: any
  try { payload = await response.json() } catch { throw new TradeApiError('Invalid transaction response.', response.status) }
  if (!response.ok || !(payload?.success === true || payload?.code === 0 || payload?.code === 200)) throw new TradeApiError(payload?.msg || payload?.message || 'Failed to load transactions.', response.status, String(payload?.code || ''))
  const data = payload?.data
  // Accept only the common documented C-end page shape when present; unknown wrappers are errors, not empty results.
  const records = Array.isArray(data) ? data : Array.isArray(data?.list) ? data.list : Array.isArray(data?.rows) ? data.rows : null
  if (!records) throw new TradeApiError('Transaction response page structure is not recognized.', response.status)
  const items = records.map((item: any) => {
    if (typeof item?.demandId === 'number' && !Number.isSafeInteger(item.demandId)) throw new TradeApiError('demandId exceeds safe integer range; backend must serialize int64 IDs as strings.')
    if (item?.demandId === undefined || item?.demandId === null) throw new TradeApiError('Transaction record is missing demandId.')
    return { demandId: String(item.demandId), demandNo: String(item.demandNo || ''), title: String(item.title || ''), amount: item.amount, currency: String(item.currency || ''), status: String(item.status || ''), statusText: String(item.statusText || ''), createTime: String(item.createTime || '') }
  })
  const totalValue = data?.total
  return { items, ...(Number.isFinite(Number(totalValue)) ? { total: Number(totalValue) } : {}) }
}

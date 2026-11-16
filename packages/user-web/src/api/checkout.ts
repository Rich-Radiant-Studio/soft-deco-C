import { getCustomerAuthState } from '@/utils/customerAuth'

export class CheckoutApiError extends Error { constructor(message: string, public status = 0) { super(message); this.name = 'CheckoutApiError' } }
export interface CheckoutDraft { draftId: string; goodsId: string; skuId: string; quantity: number; currency: string; salePrice: string; shippingFee: string; tax: string; total: string; expireTime: string; goodsName?: string; skuName?: string; imageUrl?: string }
const baseUrl = () => { const value = import.meta.env.VITE_API_BASE_URL || ''; return value.endsWith('/') ? value.slice(0, -1) : value }
function exactId(value: unknown, field: string): string { if (typeof value === 'number' && !Number.isSafeInteger(value)) throw new CheckoutApiError(field + ' exceeds JavaScript safe integer range; backend must serialize int64 IDs as strings.'); if (value === undefined || value === null || !String(value).trim()) throw new CheckoutApiError(field + ' is missing.'); return String(value) }
function token() { const auth = getCustomerAuthState(); if (!auth.isAuthenticated || !auth.token) throw new CheckoutApiError(auth.isGuest ? 'Please sign in with a customer account to buy now.' : 'Please sign in to buy now.', 401); return auth.token }
async function request(path: string, init: RequestInit = {}) {
  const response = await fetch(baseUrl() + path, { ...init, headers: { Accept: 'application/json', Authorization: 'Bearer ' + token(), ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...init.headers } })
  let payload: any
  try { payload = await response.json() } catch { throw new CheckoutApiError('Invalid checkout response.', response.status) }
  if (!response.ok || !(payload?.success === true || payload?.code === 0 || payload?.code === 200)) throw new CheckoutApiError(payload?.msg || payload?.message || 'Checkout request failed.', response.status)
  return payload?.data ?? payload
}
export async function createCheckoutDraft(goodsId: string | number, skuId: string | number): Promise<string> {
  if (!String(goodsId).trim() || !String(skuId).trim()) throw new CheckoutApiError('Choose a valid product option first.')
  const result = await request('/app/checkout/drafts', { method: 'POST', body: JSON.stringify({ goodsId: String(goodsId), skuId: String(skuId) }) })
  return exactId(result?.draftId ?? result?.draft?.draftId, 'draftId')
}
export async function getCheckoutDraft(draftId: string): Promise<CheckoutDraft> {
  if (!String(draftId).trim()) throw new CheckoutApiError('Checkout draft ID is missing.')
  const result = await request('/app/checkout/drafts/' + encodeURIComponent(String(draftId)))
  const draft = result?.draft ?? result
  if (!draft || exactId(draft.draftId, 'draftId') !== String(draftId)) throw new CheckoutApiError('Checkout draft was not found or did not match the requested ID.', 404)
  for (const field of ['goodsId', 'skuId', 'quantity', 'currency', 'salePrice', 'shippingFee', 'tax', 'total', 'expireTime']) if (draft[field] === undefined || draft[field] === null) throw new CheckoutApiError('Checkout draft response is missing ' + field + '.')
  return { ...draft, draftId: exactId(draft.draftId, 'draftId'), goodsId: exactId(draft.goodsId, 'goodsId'), skuId: exactId(draft.skuId, 'skuId'), quantity: Number(draft.quantity), salePrice: String(draft.salePrice), shippingFee: String(draft.shippingFee), tax: String(draft.tax), total: String(draft.total) }
}

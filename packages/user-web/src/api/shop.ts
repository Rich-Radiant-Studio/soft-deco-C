export interface ShopGoodsItem { goodsId: string; name: string; category: string; price: string; currency: string; description: string; image: string; cardStatus: 'ON' | 'OFF' | 'SOLD_OUT'; purchasable: boolean }
export interface ShopGoodsQuery { category?: string; subcategory?: string; minPrice?: string; maxPrice?: string; brands?: string[]; materials?: string[]; structures?: string[]; styles?: string[]; sizes?: string[]; sort?: 'default' | 'priceAsc' | 'priceDesc' | 'newest' | 'sales'; page?: number; pageSize?: number }
export interface ShopGoodsPage { list: ShopGoodsItem[]; total: number; page: number; pageSize: number }
export class ShopApiError extends Error { constructor(message: string, public status = 0) { super(message); this.name = 'ShopApiError' } }
const baseUrl = () => { const value = import.meta.env.VITE_API_BASE_URL || ''; return value.endsWith('/') ? value.slice(0, -1) : value }
export async function getShopGoods(query: ShopGoodsQuery): Promise<ShopGoodsPage> {
  const params = new URLSearchParams()
  for (const key of ['category', 'subcategory', 'minPrice', 'maxPrice', 'sort', 'page', 'pageSize'] as const) { const value = query[key]; if (value !== undefined && value !== '') params.set(key, String(value)) }
  for (const key of ['brands', 'materials', 'structures', 'styles', 'sizes'] as const) { const values = query[key]?.map(value => value.trim()).filter(Boolean); if (values?.length) params.set(key, values.join(',')) }
  const response = await fetch(baseUrl() + '/app/shop/goods?' + params.toString(), { headers: { Accept: 'application/json' } })
  let payload: any
  try { payload = await response.json() } catch { throw new ShopApiError('Invalid shop response.', response.status) }
  if (!response.ok || !(payload?.success === true || payload?.code === 0 || payload?.code === 200)) throw new ShopApiError(payload?.msg || payload?.message || 'Unable to load products.', response.status)
  const data = payload?.data
  if (!data || !Array.isArray(data.list) || !Number.isFinite(Number(data.total))) throw new ShopApiError('Shop response is missing data.list or total.', response.status)
  const list: ShopGoodsItem[] = data.list.map((item: any) => {
    if (!item || item.goodsId === undefined || item.goodsId === null || (typeof item.goodsId === 'number' && !Number.isSafeInteger(item.goodsId))) throw new ShopApiError('Product response contains an invalid goodsId.', response.status)
    return { goodsId: String(item.goodsId), name: String(item.name || ''), category: String(item.category || ''), price: String(item.price ?? ''), currency: String(item.currency || ''), description: String(item.description || ''), image: String(item.image || ''), cardStatus: item.cardStatus, purchasable: item.purchasable === true }
  })
  return { list, total: Number(data.total), page: Number(data.page || query.page || 1), pageSize: Number(data.pageSize || query.pageSize || 10) }
}

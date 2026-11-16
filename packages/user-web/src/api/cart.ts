import { getCustomerAuthState } from '@/utils/customerAuth'
export interface CartItemRecord { cartItemId: string|number; goodsId?: string|number; skuId?: string|number; goodsName?: string; specText?: string; imageUrl?: string; quantity?: number; stock?: number; unitPrice?: number|string; salePrice?: number|string; payablePrice?: number|string; lineAmount?: number|string; currency?: string; selected?: boolean|string|number; lineStatus?: string; priceChanged?: boolean }
export interface CartPayload { items: CartItemRecord[]; goodsSubtotal?: number|string; discountAmount?: number|string; payable?: number|string; shippingMethods?: any[] }
export class CartApiError extends Error { constructor(public status:number,message:string){super(message);this.name='CartApiError'} }
function ok(payload:any){const code=payload?.code;return !((code!==undefined&&code!==0&&code!==200)||payload?.success===false)}
function body(payload:any):CartPayload{const data=payload?.data;const items=data?.items;if(!Array.isArray(items))throw new Error('购物车响应缺少 data.items');return {...data,items}}
async function call(path:string,init:RequestInit={}){const base=(import.meta.env.VITE_API_BASE_URL||'').replace(/\/$/,'');const {token}=getCustomerAuthState();const response=await fetch(base+path,{...init,headers:{Accept:'application/json',...(init.body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})}});let payload:any=null;try{payload=await response.json()}catch{}if(!response.ok||!ok(payload))throw new CartApiError(response.status,payload?.msg||payload?.message||'购物车请求失败');return payload}
export async function getCart(){return body(await call('/app/cart'))}
export async function getCartCount(){const p=await call('/app/cart/count');return Number(p?.data?.quantity||0)}
export async function addCartItem(goodsId:string|number,skuId:string|number){return call('/app/cart/items',{method:'POST',body:JSON.stringify({goodsId,skuId})})}
export async function deleteCartItem(cartItemId:string){return call('/app/cart/items/'+encodeURIComponent(String(cartItemId)),{method:'DELETE'})}
export async function patchCartItem(cartItemId:string,patch:{quantity?:number;selected?:'0'|'1'}){return call('/app/cart/items/'+encodeURIComponent(String(cartItemId)),{method:'PATCH',body:JSON.stringify(patch)})}
export async function selectAllCart(selected:'0'|'1'){return call('/app/cart/select-all',{method:'POST',body:JSON.stringify({selected})})}

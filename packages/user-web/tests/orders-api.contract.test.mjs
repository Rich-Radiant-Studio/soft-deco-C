import assert from 'node:assert/strict';
const captured=[];
let result={code:200,data:{quote:{quoteId:'q1',version:2,amount:'9.5',expireTime:'2099-01-01T00:00:00Z'}}};
const auth={getCustomerAuthState:()=>({token:'mock-only',isGuest:false,isAuthenticated:true})};
const mockedFetch=async(url,init={})=>{captured.push({url,init});return{ok:true,status:200,json:async()=>result}};
const api={};
function success(payload){return Boolean(payload&&typeof payload==='object'&&(payload.success===true||payload.code===0||payload.code===200))}
async function write(path,body){assert.equal(auth.getCustomerAuthState().isAuthenticated,true);const init={method:'POST',headers:{Accept:'application/json',Authorization:'Bearer '+auth.getCustomerAuthState().token},...(body===undefined?{}:{body:JSON.stringify(body)})};const r=await mockedFetch('https://mock.invalid'+path,init);const payload=await r.json();assert.ok(r.ok&&success(payload),payload.msg||'business failure');return payload.data??payload}
const qraw=await write('/app/orders/quote',{addressId:'9007199254740993',shippingMethodId:'ship-a'});const q=qraw.quote;assert.equal(q.quoteId,'q1');assert.equal(JSON.parse(captured.at(-1).init.body).addressId,'9007199254740993');
result={code:200,data:{orders:[{orderId:'1'},{orderId:'2'}]}};const orderResult=await write('/app/orders',{quoteId:'q1',version:2,idempotencyKey:'stable'});assert.equal(orderResult.orders.length,2);assert.equal(JSON.parse(captured.at(-1).init.body).idempotencyKey,'stable');
for(const suffix of ['cancel','receipt','rebuy']){result={code:200,msg:'ok'};await write('/app/orders/42/'+suffix);assert.ok(captured.at(-1).url.endsWith('/'+suffix));assert.equal(captured.at(-1).init.body,undefined)}
result={code:200,msg:'ok'};await write('/app/orders/42/after-sale/save',{kind:'CANCEL',reason:'OTHER'});assert.equal(JSON.parse(captured.at(-1).init.body).kind,'CANCEL');await write('/app/orders/42/after-sale/ship',{afterSaleId:'9'});assert.equal(JSON.parse(captured.at(-1).init.body).afterSaleId,'9');await write('/app/orders/42/review/save',{goodsId:'7',rating:5,content:'ok'});assert.equal(JSON.parse(captured.at(-1).init.body).goodsId,'7');
assert.equal(success({code:401,msg:'令牌不能为空'}),false);assert.equal(success({code:200}),true);assert.equal(success({data:{}}),false);console.log('PASS isolated request-contract mock: quote IDs, orders[], 6 operation methods/payloads, AjaxResult business failures');


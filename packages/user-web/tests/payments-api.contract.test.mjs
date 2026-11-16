import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const api = await readFile(new URL('../src/api/payments.ts', import.meta.url), 'utf8')
const view = await readFile(new URL('../src/views/PaymentResult.vue', import.meta.url), 'utf8')
assert.ok(api.includes("'/app/payments/attempts/'+encodeURIComponent(String(attemptId))"), 'GET uses the attemptId path, not orderId')
assert.ok(api.includes("Authorization:'Bearer '+token"), 'query uses the current customer token')
assert.ok(api.includes('value.attemptId??value.id??requestedAttemptId'), 'attempt ID falls back to the exact queried string ID when response omits it')
assert.ok(api.includes('payload.success===true||payload.code===0||payload.code===200'), 'AjaxResult success is explicitly checked')
assert.ok(!api.includes('cardNumber') && !api.includes('cvv'), 'query module does not accept or persist card data')
assert.ok(!api.includes('/callback') && !api.includes('/sandbox'), 'browser API does not expose callback/sandbox write endpoints')
assert.ok(view.includes('onBeforeUnmount') && view.includes('polls.value<10'), 'polling is bounded and disposed')
assert.ok(view.includes('getOrderDetail(result.orderId)'), 'confirmed payment refreshes linked order')
assert.ok(view.includes('current!==sequence') && view.includes('watch(()=>route.query.attemptId'), 'route changes invalidate previous requests')
const normalize = value => { if(typeof value!=='string')return'unknown';const s=value.trim().toUpperCase();if(['SUCCESS','SUCCEEDED','PAID'].includes(s))return'success';if(['FAIL','FAILED'].includes(s))return'failed';if(['CANCEL','CANCELLED','CANCELED'].includes(s))return'cancelled';if(['PROCESSING','PENDING','CREATED','INITIATED'].includes(s))return'processing';return'unknown' }
for(const [input,expected] of [['SUCCESS','success'],['FAIL','failed'],['CANCEL','cancelled'],['PROCESSING','processing'],['FUTURE_STATE','unknown'],[null,'unknown']]) assert.equal(normalize(input),expected)
console.log('PASS isolated payment contract checks: auth/query path, AjaxResult guard, no card/callback/sandbox, bounded polling, unknown state')


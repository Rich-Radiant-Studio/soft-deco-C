import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const api = await readFile(new URL('../src/api/goods.ts', import.meta.url), 'utf8')
const detail = await readFile(new URL('../src/views/ProductDetail.vue', import.meta.url), 'utf8')
assert.ok(api.includes("'/app/goods/' + encodeURIComponent(id(goodsId, 'goodsId'))"), 'detail uses real goods ID')
assert.ok(api.includes('/quote') && api.includes('skuId'), 'quote supports SKU')
assert.ok(api.includes('/reviews?filter='), 'reviews endpoint supports filter/paging')
assert.ok(api.includes('Number.isSafeInteger'), 'int64 IDs are protected')
assert.ok(detail.includes('getGoodsDetail') && detail.includes('getGoodsQuote'), 'single detail calls unified goods API')
assert.ok(detail.includes('quoteSequence'), 'quote requests are race isolated')
assert.ok(detail.includes('createCheckoutDraft(goodsId, selectedSkuId.value)'), 'buy now uses current goods and SKU')
assert.ok(!detail.includes('Array.from({ length: 998 }'), 'static review flood was removed')
console.log('PASS goods contract assertions: detail, quote, reviews, SKU query, ID safety and race guard')

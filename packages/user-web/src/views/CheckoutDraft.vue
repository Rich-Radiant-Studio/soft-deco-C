<template>
  <div class="checkout-page"><Header/><main class="panel">
    <h1>Buy now · Confirm item</h1>
    <p v-if="state==='loading'">Loading checkout draft…</p>
    <div v-else-if="state==='error'" class="error">{{ error }} <button @click="load">Retry</button></div>
    <template v-else-if="draft">
      <article class="product"><img v-if="draft.imageUrl" :src="draft.imageUrl" alt=""><div><h2>{{ draft.goodsName || 'Product' }}</h2><p>Goods ID: {{ draft.goodsId }}</p><p>Selected SKU: {{ draft.skuName || draft.skuId }}</p><p>Quantity: {{ draft.quantity }}</p></div></article>
      <section class="amounts"><p>Sale price <span>{{ money(draft.salePrice) }}</span></p><p>Shipping <span>{{ money(draft.shippingFee) }}</span></p><p>Tax <span>{{ money(draft.tax) }}</span></p><p class="total">Total <strong>{{ money(draft.total) }}</strong></p></section>
      <p class="expiry" :class="{ expired }">{{ expired ? 'This checkout draft has expired.' : 'Draft expires: ' + formatDate(draft.expireTime) }}</p>
      <p v-if="!expired" class="hint">Order placement is unavailable: the server has not provided a checkout-draft-to-order contract. This page will not submit a cart quote or create an order.</p>
      <div class="actions"><button @click="router.back()">Back to product</button><button v-if="expired" class="primary" @click="router.back()">Return and create a new draft</button><button v-else disabled class="primary">Continue checkout unavailable</button></div>
    </template>
  </main><Footer/></div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { getCheckoutDraft, CheckoutApiError, type CheckoutDraft } from '@/api/checkout'
const route=useRoute(),router=useRouter(),draft=ref<CheckoutDraft|null>(null),state=ref<'loading'|'success'|'error'>('loading'),error=ref('')
const expired=computed(()=>!!draft.value&&Number.isFinite(Date.parse(draft.value.expireTime))&&Date.parse(draft.value.expireTime)<=Date.now())
function money(value:string){try{return new Intl.NumberFormat(undefined,{style:'currency',currency:draft.value?.currency||'USD'}).format(Number(value))}catch{return value+' '+(draft.value?.currency||'')}}
function formatDate(value:string){const date=new Date(value);return Number.isNaN(date.getTime())?value:date.toLocaleString()}
async function load(){const id=String(route.params.draftId||'');if(!id){state.value='error';error.value='Checkout draft ID is invalid.';return}state.value='loading';try{draft.value=await getCheckoutDraft(id);state.value='success'}catch(e){state.value='error';error.value=e instanceof CheckoutApiError?e.message:'Unable to load checkout draft.'}}
onMounted(load)
</script>
<style scoped>.checkout-page{min-height:100vh;background:#f4f4f5;padding-bottom:30px;color:#333;font:13px Arial}.panel{max-width:760px;margin:28px auto;padding:22px;background:#fff;border:1px solid #e2e5e9;border-radius:6px}.panel h1{font-size:18px}.product{display:flex;gap:14px;padding:16px 0;border-bottom:1px solid #e5e7eb}.product img{width:96px;height:96px;object-fit:cover}.product h2{font-size:16px}.product p{margin:5px 0;color:#555;overflow-wrap:anywhere}.amounts{max-width:460px;margin:15px 0 0 auto}.amounts p{display:flex;justify-content:space-between;margin:10px 0}.total{border-top:1px solid #ddd;padding-top:12px;font-size:15px}.expiry{margin-top:18px}.expired,.error{color:#a63805}.hint{padding:10px;background:#fff8e6;color:#755800;line-height:1.5}.actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}.actions button{min-height:36px;padding:0 14px;background:#fff;border:1px solid #cbd1d8;border-radius:4px}.actions .primary{background:#333;color:white}.actions button:disabled{opacity:.55}@media(max-width:700px){.panel{margin:14px 12px;padding:16px}.product img{width:72px;height:72px}.actions{justify-content:stretch}.actions button{flex:1}}</style>

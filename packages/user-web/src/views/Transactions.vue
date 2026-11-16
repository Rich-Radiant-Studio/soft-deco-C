<template>
  <div class="page profile-page"><Header/><main><ProfileSidebar/><section class="profile-content"><div class="panel"><div class="heading"><h1>我的交易记录</h1></div><div v-if="state==='loading'" class="state">Loading transactions…</div><div v-else-if="state==='unauthorized'" class="state error">{{ error }} <router-link to="/login">Sign in</router-link></div><div v-else-if="state==='error'" class="state error">{{ error }} <button @click="load">Retry</button></div><template v-else><table><thead><tr><th>创建时间</th><th>需求编号</th><th>费用类型</th><th>需求标题</th><th>金额</th><th>状态</th><th>操作</th></tr></thead><tbody><tr v-if="!records.length"><td colspan="7" class="empty">暂无交易记录</td></tr><tr v-for="record in records" :key="record.demandId"><td>{{ formatDate(record.createTime) }}</td><td>{{ record.demandNo || '—' }}</td><td>设计需求费用</td><td>{{ record.title || '—' }}</td><td>{{ money(record.amount, record.currency) }}</td><td><span :class="['status', statusClass(record.status)]">{{ record.statusText || record.status || '—' }}</span></td><td><router-link :to="'/profile/requests/' + record.demandId">查看需求</router-link></td></tr></tbody></table><div class="pagination" v-if="total !== null"><button :disabled="pageNum<=1||loading" @click="goPage(pageNum-1)">上一页</button><span>第 {{ pageNum }} 页 / 共 {{ totalPages }} 页（{{ total }} 条）</span><button :disabled="pageNum>=totalPages||loading" @click="goPage(pageNum+1)">下一页</button><label>每页<select v-model.number="pageSize" @change="changePageSize"><option :value="10">10</option><option :value="20">20</option></select></label></div></template></div></section></main><Footer/></div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ProfileSidebar from '@/components/ProfileSidebar.vue'
import { getTradeList, TradeApiError, type TradeRecord } from '@/api/trades'
const records=ref<TradeRecord[]>([]),state=ref<'loading'|'success'|'empty'|'error'|'unauthorized'>('loading'),error=ref(''),pageNum=ref(1),pageSize=ref(10),total=ref<number|null>(null),loading=ref(false)
let sequence=0
const totalPages=computed(()=>total.value===null?1:Math.max(1,Math.ceil(total.value/pageSize.value)))
async function load(){const seq=++sequence;loading.value=true;state.value='loading';error.value='';try{const result=await getTradeList(pageNum.value,pageSize.value);if(seq!==sequence)return;records.value=result.items;total.value=result.total===undefined?null:result.total;state.value=records.value.length?'success':'empty'}catch(e){if(seq!==sequence)return;records.value=[];total.value=null;if(e instanceof TradeApiError&&(e.status===401||e.status===403)){state.value='unauthorized';error.value=e.message}else{state.value='error';error.value=e instanceof Error?e.message:'Failed to load transactions.'}}finally{if(seq===sequence)loading.value=false}}
function goPage(value:number){if(value<1||loading.value||total.value===null||value>totalPages.value)return;pageNum.value=value;void load()}
function changePageSize(){pageSize.value=Math.min(20,Math.max(1,pageSize.value));pageNum.value=1;void load()}
function formatDate(value:string){const date=new Date(value);return value&&!Number.isNaN(date.getTime())?date.toLocaleString():'—'}
function money(value:unknown,currency:string){if(value===undefined||value===null||value==='')return'—';return String(value)+' '+(currency||'')}
function statusClass(status:string){return status.toLowerCase().replace(/[^a-z0-9_-]/g,'-')}
onMounted(load)
</script>
<style scoped>.page{background:#f4f4f5;min-height:100vh;color:#333;font:13px Arial}.page main{display:flex;width:100%;max-width:none;margin:0;background:#fff;min-height:640px}.profile-content{flex:1;background:#f4f4f5;padding:14px}.panel{background:#fff;border:1px solid #dfe3e8;padding:14px}.heading{display:flex;align-items:center;justify-content:space-between}.heading h1{font-size:18px;margin:0 0 14px}.state{text-align:center;padding:48px 12px}.error{color:#a63805}.state a{margin-left:10px;color:#0878b0}table{width:100%;border-collapse:collapse;font-size:13px}th,td{padding:11px 8px;border-bottom:1px solid #e5e7eb;text-align:left}th{background:#f7f8fa;font-weight:600}.status{display:inline-block;padding:3px 7px;border-radius:3px;background:#eef2f5;font-size:12px}.unpaid{color:#9a5b00;background:#fff5dc}.cancelled{color:#a63805;background:#fff0ed}.accepted,.assigned,.open{color:#176d45;background:#edf8f1}.pagination{display:flex;align-items:center;gap:10px;justify-content:flex-end;margin-top:16px}.pagination button{padding:5px 9px;border:1px solid #cbd1d8;background:#fff;border-radius:3px}.pagination button:disabled{opacity:.5}.pagination select{margin-left:4px}@media(max-width:800px){.page main{display:block}.profile-content{padding:10px;overflow-x:auto}table{min-width:760px}.pagination{justify-content:flex-start;min-width:760px}}
</style>




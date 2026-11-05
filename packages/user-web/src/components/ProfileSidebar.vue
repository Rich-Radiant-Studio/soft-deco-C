<template>
  <aside class="profile-sidebar" aria-label="个人中心菜单">
    <div class="profile-user">
      <div class="profile-avatar" aria-hidden="true"><i class="bi bi-person"></i></div>
      <h1>Mia Wu</h1>
      <p>1562514994163@163.com</p>
    </div>
    <nav class="profile-nav">
      <router-link v-for="item in items" :key="item.to" :to="item.to" class="profile-nav-link" :class="{ active: isActive(item) }" :aria-current="isActive(item) ? 'page' : undefined">
        <i :class="['bi', item.icon]" aria-hidden="true"></i><span>{{ item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const items = [
  { label: '账户概览', icon: 'bi-person', to: '/profile' },
  { label: '我的需求', icon: 'bi-journal-check', to: '/profile/requests' },
  { label: '我的订单', icon: 'bi-receipt', to: '/profile/orders' },
  { label: '售后订单', icon: 'bi-file-earmark-text', to: '/profile/after-sales' },
  { label: '我的交易', icon: 'bi-currency-exchange', to: '/profile/transactions' },
  { label: '我的收藏', icon: 'bi-star', to: '/profile/favorites' },
  { label: '平台推荐', icon: 'bi-heart', to: '/profile/recommendations' },
  { label: '收货地址', icon: 'bi-geo-alt', to: '/profile/addresses' },
  { label: '支付方式', icon: 'bi-credit-card', to: '/profile/payment-methods' },
  { label: '账户设置', icon: 'bi-gear', to: '/profile/settings' },
  { label: '退出登录', icon: 'bi-power', to: '/logout' }
]

function isActive(item: typeof items[number]) {
  if (item.to === '/profile') return route.path === item.to
  if (item.to === '/logout') return route.path === item.to
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}
</script>

<style scoped>
.profile-sidebar {
  box-sizing: border-box;
  flex: 0 0 185px;
  width: 185px;
  min-width: 185px;
  align-self: stretch;
  padding: 16px 7px 18px;
  background: #fff;
  border-right: 1px solid #e8eaed;
}
.profile-user { text-align: center; padding: 0 4px 17px; }
.profile-avatar { display: grid; place-items: center; width: 66px; height: 66px; margin: 0 auto 5px; border: 2px solid #d8e6f3; border-radius: 50%; background: #cdd2da; color: #fff; }
.profile-avatar i { font-size: 29px; }
.profile-user h1 { margin: 5px 0; color: #30343a; font-size: 20px; line-height: 24px; font-weight: 700; }
.profile-user p { margin: 0 0 4px; color: #666; font-size: 10px; line-height: 15px; white-space: nowrap; }
.profile-nav { display: flex; flex-direction: column; gap: 2px; }
.profile-nav-link { display: flex; align-items: center; gap: 11px; min-height: 34px; padding: 0 11px; border-radius: 4px; color: #33383d; font-size: 12px; line-height: 1.2; text-decoration: none; white-space: nowrap; }
.profile-nav-link i { width: 12px; font-size: 11px; text-align: center; }
.profile-nav-link:hover, .profile-nav-link.active { color: #0878b6; background: #eef7fc; }
.profile-nav-link.active { font-weight: 600; }
@media (max-width: 900px) {
  .profile-sidebar { flex: 0 0 auto; width: 100%; min-width: 0; padding: 8px 12px; border-right: 0; border-bottom: 1px solid #e8eaed; }
  .profile-user { display: none; }
  .profile-nav { flex-direction: row; gap: 5px; overflow-x: auto; }
  .profile-nav-link { flex: 0 0 auto; padding: 0 10px; }
}
</style>

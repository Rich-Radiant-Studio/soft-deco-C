<template>
  <div class="account-overview-page">
    <Header />

    <main class="profile-shell">
      <aside class="account-sidebar" aria-label="Personal center navigation">
        <div class="profile-user">
          <div class="profile-avatar placeholder-avatar" aria-label="Default user avatar"><i class="bi bi-person" aria-hidden="true"></i></div>
          <h1>{{ profile.name }}</h1>
          <p class="profile-email">{{ profile.email }}</p>
          <p class="profile-balance">Balance: {{ profile.balance }}</p>
        </div>

        <nav class="profile-nav">
          <router-link
            v-for="item in sidebarItems"
            :key="item.label"
            :to="item.to"
            class="sidebar-link"
            :class="{ active: item.active }"
          >
            <i :class="['bi', item.icon]" aria-hidden="true"></i>
            <span>{{ item.label }}</span>
          </router-link>
        </nav>
      </aside>

      <section class="account-content">
        <div class="last-login">Last login: January 3, 2026 14:30</div>

        <section class="summary-grid" aria-label="Order overview">
          <article v-for="stat in orderStats" :key="stat.label" class="summary-card">
            <div :class="['summary-icon', stat.tone]">
              <i :class="['bi', stat.icon]" aria-hidden="true"></i>
            </div>
            <div class="summary-copy">
              <strong>{{ stat.count }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </article>
        </section>

        <section class="panel recent-orders">
          <div class="panel-heading">
            <h2>Recent Orders</h2>
            <router-link v-if="recentOrders.length" to="/profile/orders" class="text-link">View all orders</router-link>
          </div>

          <div v-if="recentOrders.length" class="orders-table-wrap">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.number">
                  <td class="order-number">{{ order.number }}</td>
                  <td>
                    <div class="order-product">
                      <img :src="order.image" :alt="order.product" loading="lazy" />
                      <span>{{ order.product }}</span>
                    </div>
                  </td>
                  <td class="amount">{{ order.amount }}</td>
                  <td><span :class="['status-pill', order.statusClass]">{{ order.status }}</span></td>
                  <td class="order-date">{{ order.date }}</td>
                  <td>
                    <div class="order-actions">
                      <a href="#" @click.prevent>Details</a>
                      <a href="#" @click.prevent>{{ order.action }}</a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="empty-state orders-empty">
            <i class="bi bi-inbox" aria-hidden="true"></i>
            <span>No data available</span>
          </div>
        </section>

        <section id="favorites" class="panel favorites-panel">
          <div class="panel-heading favorites-heading">
            <h2>My Favorites</h2>
          </div>
          <div v-if="favorites.length" class="favorites-grid">
            <article v-for="product in favorites" :key="product.name" class="favorite-card">
              <img class="favorite-image" :src="product.image" :alt="product.name" loading="lazy" />
              <div class="favorite-info">
                <h3 :title="product.name">{{ product.name }}</h3>
                <p class="favorite-price">{{ product.price }}</p>
                <div class="favorite-actions">
                  <button type="button" class="button-outline">Add to cart</button>
                  <button type="button" class="button-primary">Buy now</button>
                </div>
              </div>
            </article>
          </div>
          <div v-if="favorites.length" class="view-more-row">
            <span></span>
            <router-link to="/profile/favorites">View more</router-link>
            <span></span>
          </div>
        </section>
      </section>
    </main>

    <footer class="account-footer">
      © 2025 家装平台版权所有 粤ICP备XXXXXXX号 联系我们：400-XXX-XXXX
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'

const profile = {
  name: 'Mia Wu',
  email: '1562514994163@163.com',
  balance: '$100,234.00',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mia-Wu'
}

const sidebarItems = [
  { label: 'Account Overview', icon: 'bi-person', to: '/profile', active: true },
  { label: 'My Requests', icon: 'bi-journal-check', to: '/profile/requests' },
  { label: 'My Orders', icon: 'bi-receipt', to: '/profile/orders' },
  { label: 'After-sales Orders', icon: 'bi-file-earmark-text', to: '/profile/orders?tab=after-sales' },
  { label: 'My Transactions', icon: 'bi-currency-exchange', to: '/profile/transactions' },
  { label: 'My Favorites', icon: 'bi-star', to: '/profile/favorites' },
  { label: 'Platform Recommendations', icon: 'bi-heart', to: '/shop' },
  { label: 'Shipping Address', icon: 'bi-geo-alt', to: '/profile/addresses' },
  { label: 'Payment Methods', icon: 'bi-credit-card', to: '/profile/payment-methods' },
  { label: 'Account Settings', icon: 'bi-folder2', to: '/profile/settings' },
  { label: 'Log Out', icon: 'bi-power', to: '/login' }
]

const orderStats = [
  { count: 1, label: 'Pending Payment', icon: 'bi-currency-dollar', tone: 'red' },
  { count: 2, label: 'Pending Shipment', icon: 'bi-wallet2', tone: 'orange' },
  { count: 8, label: 'In Transit', icon: 'bi-truck', tone: 'blue' },
  { count: 25, label: 'Completed', icon: 'bi-check-circle', tone: 'green' }
]

const recentOrders = [
  { number: 'ORD202601030008', product: 'Modern Minimalist Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&q=80', amount: '$500.00', status: 'Pending Payment', statusClass: 'pending', date: '2026-02-03', action: 'Pay Now' },
  { number: 'ORD202601030007', product: 'Nordic Style Coffee Table', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=80&h=80&fit=crop&q=80', amount: '$350.00', status: 'Pending Shipment', statusClass: 'shipment', date: '2026-02-03', action: 'Logistics' },
  { number: 'ORD202601030006', product: 'Designer Floor Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=80&h=80&fit=crop&q=80', amount: '$315.00', status: 'In Transit', statusClass: 'transit', date: '2026-02-02', action: 'Logistics' },
  { number: 'ORD202601030005', product: 'Modern Minimalist Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&q=80', amount: '$200.00', status: 'Completed', statusClass: 'completed', date: '2026-02-02', action: 'Evaluate' },
  { number: 'ORD202601030004', product: 'Nordic Style Coffee Table', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=80&h=80&fit=crop&q=80', amount: '$400.00', status: 'In Transit', statusClass: 'transit', date: '2026-02-02', action: 'Logistics' },
  { number: 'ORD202601030003', product: 'Designer Floor Lamp', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=80&h=80&fit=crop&q=80', amount: '$2,599.00', status: 'In Transit', statusClass: 'transit', date: '2026-02-01', action: 'Logistics' },
  { number: 'ORD202601030002', product: 'Modern Minimalist Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop&q=80', amount: '$80.00', status: 'In Transit', statusClass: 'transit', date: '2026-02-01', action: 'Logistics' },
  { number: 'ORD202601030001', product: 'Nordic Style Coffee Table', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=80&h=80&fit=crop&q=80', amount: '$2,000.00', status: 'In Transit', statusClass: 'transit', date: '2026-02-01', action: 'Logistics' }
]

const favorites = [
  { name: 'Luxury Velvet ArmchairLuxury Velvet Armchair Luxury Velvet ...', price: '$1,299.00', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=640&h=320&fit=crop&q=80' },
  { name: 'Marble Dining Table', price: '$1,299.00', image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=640&h=320&fit=crop&q=80' },
  { name: 'Pendant Light Set', price: '$1,299.00', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=640&h=320&fit=crop&q=80' },
  { name: 'Wool Area Rug', price: '$1,299.00', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&h=320&fit=crop&q=80' }
]
</script>

<style scoped>
.account-overview-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: #24272b;
  background: #f4f4f5;
  font-family: Arial, Helvetica, sans-serif;
}

/* Match the compact two-tier desktop header in the reference. */
.account-overview-page :deep(.top-nav-bar) { padding: 2px 0; }
.account-overview-page :deep(.main-header) { padding: 6px 0; }
.account-overview-page :deep(.top-nav-bar .container-fluid),
.account-overview-page :deep(.main-header .container-fluid) { padding-left: 14px !important; padding-right: 14px !important; }
.account-overview-page :deep(.navbar-brand) { width: 80px; font-family: Georgia, 'Times New Roman', serif; }
.account-overview-page :deep(.main-nav) { gap: clamp(16px, 2vw, 30px); }
.account-overview-page :deep(.right-section) { gap: clamp(18px, 2.5vw, 34px); }
.account-overview-page :deep(.search-wrapper) { width: clamp(220px, 31vw, 338px); }

.profile-shell {
  flex: 1 0 auto;
  display: flex;
  min-height: calc(100vh - 172px);
  background: #f4f4f5;
}

.account-sidebar {
  flex: 0 0 170px;
  width: 170px;
  background: #fff;
  border-right: 1px solid #eceef1;
  padding: 15px 6px 18px;
}

.profile-user {
  text-align: center;
  padding: 0 4px 13px;
}

.profile-avatar {
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto 5px;
  border: 2px solid #d8e6f3;
  border-radius: 50%;
  background: #eaf2fc;
  object-fit: cover;
}
.placeholder-avatar { display: grid; place-items: center; color: #fff; background: #cdd2da; border-color: #d7dbe2; }
.placeholder-avatar i { font-size: 29px; }

.profile-user h1 { margin: 0 0 4px; font-size: 17px; line-height: 21px; font-weight: 700; }
.profile-email, .profile-balance { margin: 0 0 4px; color: #666; font-size: 10px; line-height: 15px; white-space: nowrap; }
.profile-balance { margin-bottom: 0; font-size: 11px; }

.profile-nav { display: flex; flex-direction: column; gap: 2px; }
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 30px;
  padding: 0 9px;
  border-radius: 4px;
  color: #33383d;
  font-size: 11px;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
}
.sidebar-link i { width: 12px; font-size: 11px; text-align: center; }
.sidebar-link:hover { color: #0878b6; background: #f5f9fc; }
.sidebar-link.active { color: #0878b6; background: #eef7fc; font-weight: 600; }

.account-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 10px 14px;
}

.last-login { min-height: 17px; color: #71757a; font-size: 11px; line-height: 17px; }
.summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.summary-card {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  height: 72px;
  padding: 11px 13px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(22, 35, 48, .025);
}
.summary-icon {
  display: grid;
  place-items: center;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 16px;
}
.summary-icon.red { color: #f04444; background: #fff0f0; }
.summary-icon.orange { color: #fa8c00; background: #fff5e8; }
.summary-icon.blue { color: #1677ff; background: #eaf3ff; }
.summary-icon.green { color: #10b84a; background: #eaffef; }
.summary-copy { display: flex; min-width: 0; flex-direction: column; gap: 4px; }
.summary-copy strong { font-size: 20px; line-height: 20px; font-weight: 700; }
.summary-copy span { color: #666; font-size: 10px; line-height: 14px; white-space: nowrap; }

.panel { min-width: 0; padding: 12px; background: #fff; border-radius: 4px; }
.panel-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
.panel-heading h2 { margin: 0; color: #34373b; font-size: 18px; font-weight: 700; line-height: 24px; }
.text-link, .order-actions a, .view-more-row a { color: #0878bb; font-size: 11px; text-decoration: none; }
.text-link:hover, .order-actions a:hover, .view-more-row a:hover { color: #005b91; text-decoration: underline; }
.orders-table-wrap { width: 100%; overflow-x: auto; }
.empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; color: #999; }
.orders-empty { min-height: 101px; gap: 8px; }
.orders-empty i { color: #999; font-size: 32px; line-height: 32px; }
.empty-state span { font-size: 11px; line-height: 16px; }
.orders-table { width: 100%; min-width: 760px; border-collapse: collapse; table-layout: fixed; font-size: 10.5px; }
.orders-table th {
  height: 30px;
  padding: 0 10px;
  background: #f1f2f4;
  color: #22262a;
  font-size: 10.5px;
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}
.orders-table td { height: 31px; padding: 3px 10px; border-bottom: 1px solid #e5e7eb; color: #30343a; vertical-align: middle; }
.orders-table th:nth-child(1) { width: 17%; }
.orders-table th:nth-child(2) { width: 32%; }
.orders-table th:nth-child(3) { width: 8%; }
.orders-table th:nth-child(4) { width: 16%; }
.orders-table th:nth-child(5) { width: 12%; }
.orders-table th:nth-child(6) { width: 15%; }
.order-number, .order-date, .amount { white-space: nowrap; }
.order-product { display: flex; align-items: center; gap: 6px; min-width: 0; }
.order-product img { flex: 0 0 18px; width: 18px; height: 18px; border-radius: 2px; object-fit: cover; }
.order-product span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.status-pill { display: inline-block; padding: 2px 7px; border-radius: 2px; font-size: 10px; line-height: 14px; white-space: nowrap; }
.status-pill.pending { color: #f04444; background: #fff0ee; }
.status-pill.shipment { color: #e77800; background: #fff3e5; }
.status-pill.transit { color: #1677ff; background: #eaf3ff; }
.status-pill.completed { color: #11a63f; background: #e8fbe9; }
.order-actions { display: flex; gap: 10px; white-space: nowrap; }

.favorites-panel { padding: 12px; }
.favorites-panel > .empty-state { min-height: 98px; gap: 8px; }
.favorites-panel > .empty-state i { color: #999; font-size: 32px; line-height: 32px; }
.favorites-heading { margin-bottom: 9px; }
.favorites-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.favorite-card { min-width: 0; overflow: hidden; border: 1px solid #e3e6ea; border-radius: 4px; background: #fff; }
.favorite-image { display: block; width: 100%; height: 84px; object-fit: cover; background: #ebe8e3; }
.favorite-info { padding: 7px 10px 6px; }
.favorite-info h3 { display: -webkit-box; height: 29px; margin: 0 0 3px; overflow: hidden; color: #333; font-size: 10px; font-weight: 600; line-height: 14px; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.favorite-price { margin: 0 0 7px; color: #333; font-size: 11px; line-height: 15px; }
.favorite-actions { display: flex; gap: 6px; }
.favorite-actions button { flex: 1; min-width: 0; height: 25px; padding: 0 4px; border: 1px solid #0878b6; border-radius: 3px; font-size: 10px; line-height: 23px; white-space: nowrap; cursor: pointer; }
.button-outline { color: #0878b6; background: #fff; }
.button-primary { color: #fff; background: #0878b6; }
.button-outline:hover { background: #f0f8fc; }
.button-primary:hover { background: #056494; }
.view-more-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 8px; }
.view-more-row span { height: 1px; flex: 1; background: #e7e9ec; }

.account-footer { flex: 0 0 auto; min-height: 73px; display: grid; place-items: center; padding: 16px; background: #333; color: #aaa; font-size: 11px; text-align: center; }

@media (max-width: 1100px) {
  .account-sidebar { flex-basis: 160px; width: 160px; }
  .account-content { padding-right: 8px; padding-left: 8px; }
  .summary-grid, .favorites-grid { gap: 8px; }
  .summary-card { gap: 7px; padding: 9px; }
  .summary-icon { flex-basis: 32px; width: 32px; height: 32px; }
  .favorite-info { padding-right: 7px; padding-left: 7px; }
}

@media (max-width: 900px) {
  .profile-shell { flex-direction: column; }
  .account-sidebar { width: 100%; flex-basis: auto; padding: 8px 12px; border-right: 0; border-bottom: 1px solid #e8eaed; }
  .profile-user { display: none; }
  .profile-nav { flex-direction: row; overflow-x: auto; gap: 5px; }
  .sidebar-link { flex: 0 0 auto; padding: 0 10px; }
  .account-content { padding: 12px; }
  .profile-shell { min-height: calc(100vh - 170px); }
}

@media (max-width: 620px) {
  .summary-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .favorites-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .favorite-image { height: 110px; }
  .panel { padding: 10px; }
  .panel-heading h2 { font-size: 16px; }
  .last-login { font-size: 10px; }
  .account-footer { min-height: 60px; font-size: 10px; }
  .account-overview-page :deep(.navbar-brand) { width: auto; }
  .account-overview-page :deep(.search-wrapper) { width: 160px; }
}
</style>

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/test',
    component: () => import('@/views/HomeTest.vue'),
    meta: { title: '首页测试' }
  },
  {
    path: '/shop',
    component: () => import('@/views/Shop.vue'),
    meta: { title: '单品商城' }
  },
  {
    path: '/designers',
    component: () => import('@/views/Designers.vue'),
    meta: { title: '设计师' }
  },
  {
    path: '/designer/:id',
    component: () => import('@/views/DesignerDetail.vue'),
    meta: { title: '设计师详情' }
  },
  {
    path: '/community',
    component: () => import('@/views/Community.vue'),
    meta: { title: '社区' }
  },
  {
    path: '/product/:id',
    component: () => import('@/views/ProductDetail.vue'),
    meta: { title: '商品详情' }
  },
  {
    path: '/cart',
    component: () => import('@/views/Cart.vue'),
    meta: { title: '购物车' }
  },
  {
    path: '/payment-success',
    component: () => import('@/views/PaymentSuccess.vue'),
    meta: { title: '支付成功' }
  },
  {
    path: '/payment-failed',
    component: () => import('@/views/PaymentFailed.vue'),
    meta: { title: '支付失败' }
  },
  {
    path: '/profile',
    component: () => import('@/views/AccountOverview.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/profile/orders',
    component: () => import('@/views/MyOrders.vue'),
    meta: { title: '我的订单' }
  },
  {
    path: '/profile/after-sales',
    component: () => import('@/views/AfterSalesOrders.vue'),
    meta: { title: '售后订单' }
  },
  {
    path: '/profile/after-sales/:id',
    component: () => import('@/views/AfterSalesDetail.vue'),
    meta: { title: '售后订单详情' }
  },
  {
    path: '/profile/transactions',
    component: () => import('@/views/Transactions.vue'),
    meta: { title: '我的交易' }
  },
  {
    path: '/profile/favorites',
    component: () => import('@/views/Favorites.vue'),
    meta: { title: '我的收藏' }
  },
  {
    path: '/profile/likes',
    component: () => import('@/views/Likes.vue'),
    meta: { title: '我的点赞' }
  },
  {
    path: '/profile/browsing-history',
    component: () => import('@/views/BrowsingHistory.vue'),
    meta: { title: '浏览历史' }
  },
  {
    path: '/profile/recommendations',
    component: () => import('@/views/Recommendations.vue'),
    meta: { title: '平台推荐' }
  },
  {
    path: '/profile/addresses',
    component: () => import('@/views/Addresses.vue'),
    meta: { title: '收货地址' }
  },
  {
    path: '/profile/payment-methods',
    component: () => import('@/views/PaymentMethods.vue'),
    meta: { title: '支付方式' }
  },
  {
    path: '/profile/settings',
    component: () => import('@/views/Settings.vue'),
    meta: { title: '账户设置' }
  },
  {
    path: '/logout',
    component: () => import('@/views/Logout.vue'),
    meta: { title: '退出登录' }
  },
  {
    path: '/profile/orders/:id/refund',
    component: () => import('@/views/RefundRequest.vue'),
    meta: { title: '申请退款' }
  },
  {
    path: '/profile/orders/:id',
    component: () => import('@/views/OrderDetail.vue'),
    meta: { title: '订单详情' }
  },
  {
    path: '/profile/orders/:id/review',
    component: () => import('@/views/ReviewModal.vue'),
    meta: { title: '评价订单' }
  },
  {
    path: '/profile/requests',
    component: () => import('@/views/MyRequests.vue'),
    meta: { title: '我的需求' }
  },
  {
    path: '/profile/requests/:id',
    component: () => import('@/views/DesignRequestDetail.vue'),
    meta: { title: '需求详情' }
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/case/:id',
    component: () => import('@/views/CaseDetail.vue'),
    meta: { title: '案例详情' }
  },
  {
    path: '/post-demand',
    component: () => import('@/views/CreateDesignRequest.vue'),
    meta: { title: '提交需求' }
  },

  {
    path: '/buy-now/:type',
    component: () => import('@/views/Profile.vue'),
    meta: { title: '立即购买' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, _from, next) => {
  console.log('路由跳转:', { from: _from.path, to: to.path })
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 家居装修平台`
  }
  next()
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})

console.log('路由配置完成，共', routes.length, '个路由')

export default router

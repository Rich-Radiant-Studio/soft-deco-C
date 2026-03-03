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
    path: '/profile',
    component: () => import('@/views/Profile.vue'),
    meta: { title: '个人中心' }
  },
  {
    path: '/profile/orders',
    component: () => import('@/views/Profile.vue'),
    meta: { title: '我的订单' }
  },
  {
    path: '/case/:id',
    component: () => import('@/views/CaseDetail.vue'),
    meta: { title: '案例详情' }
  },
  {
    path: '/post-demand',
    component: () => import('@/views/Profile.vue'),
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

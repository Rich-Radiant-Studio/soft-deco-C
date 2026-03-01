<template>
  <div>
    <!-- Top Navigation Bar - Part 1 (深色背景区域) -->
    <div class="top-nav-bar">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-end" style="gap: 16px;">
          <button class="btn btn-sm btn-register">
            <i class="bi bi-person-plus-fill me-2"></i>{{ $t('nav.register') }}
          </button>
          <LanguageSwitcher />
          <UserAvatar />
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar (白色背景区域) -->
    <header class="main-header">
      <div class="container-fluid px-4">
        <div class="header-content">
          <!-- 左侧：LOGO + 导航栏 -->
          <div class="left-section">
            <router-link to="/" class="navbar-brand">LOGO</router-link>
            
            <nav class="main-nav d-none d-lg-flex align-items-center">
              <router-link to="/" class="nav-link" exact active-class="active">{{ $t('nav.home') }}</router-link>
              <router-link to="/shop" class="nav-link" active-class="active">{{ $t('nav.singleProductMall') }}</router-link>
              <router-link to="/designers" class="nav-link" active-class="active">{{ $t('nav.designer') }}</router-link>
              <router-link to="/community" class="nav-link" active-class="active">{{ $t('nav.communityCenter') }}</router-link>
              <AboutUsDropdown />
            </nav>
          </div>
          
          <!-- 右侧：搜索框 + 操作按钮 -->
          <div class="right-section">
            <!-- 搜索框 -->
            <div class="search-wrapper position-relative">
              <input type="text" class="search-input" :placeholder="$t('nav.searchPlaceholder')">
              <svg class="search-icon" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.35742 0C6.78758 7.23821e-05 8.13391 0.557034 9.14453 1.56934C10.1552 2.58184 10.7139 3.92528 10.7139 5.35742C10.7138 6.55364 10.3249 7.69086 9.60547 8.62109L14.2432 13.2588C14.2567 13.2724 14.2671 13.2889 14.2744 13.3066C14.2817 13.3243 14.2861 13.3432 14.2861 13.3623C14.2861 13.3815 14.2818 13.4012 14.2744 13.4189C14.2671 13.4364 14.2565 13.4524 14.2432 13.4658L13.4639 14.2432C13.4504 14.2565 13.4345 14.2671 13.417 14.2744C13.3992 14.2818 13.3796 14.2861 13.3604 14.2861C13.3412 14.2861 13.3223 14.2817 13.3047 14.2744C13.2869 14.2671 13.2704 14.2568 13.2568 14.2432L8.62012 9.60742C7.68983 10.3252 6.55375 10.7138 5.35742 10.7139C3.92528 10.7139 2.58005 10.157 1.56934 9.14453C0.558819 8.13391 7.2614e-05 6.78758 0 5.35742C0 3.92528 0.556836 2.58005 1.56934 1.56934C2.58005 0.558622 3.92706 0 5.35742 0ZM5.35742 1.35742C4.28956 1.35742 3.28546 1.77296 2.52832 2.52832C1.77296 3.28368 1.35742 4.28956 1.35742 5.35742C1.35749 6.42508 1.77316 7.42849 2.52832 8.18555C3.28546 8.9409 4.28956 9.35742 5.35742 9.35742C6.42517 9.35735 7.42847 8.94084 8.18555 8.18555C8.94084 7.43026 9.35735 6.42518 9.35742 5.35742C9.35742 4.28956 8.9409 3.28546 8.18555 2.52832C7.43028 1.77138 6.42508 1.35749 5.35742 1.35742Z" fill="#333333"/>
              </svg>
            </div>
            
            <!-- 操作按钮组 -->
            <div class="action-buttons">
              <!-- Cart -->
              <router-link to="/cart" class="action-btn">
                <div class="icon-wrapper">
                  <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M46.0927 34.9339H13.6424L5.36424 5.13255H0V1.82129H7.88079L16.1589 31.6226H43.3278L46.0265 16.722H19.8675V13.4107H50L46.0927 34.9339ZM18.2119 48.1789C17.2296 48.1789 16.2693 47.8876 15.4525 47.3418C14.6357 46.7961 13.999 46.0203 13.6231 45.1128C13.2472 44.2052 13.1488 43.2065 13.3405 42.243C13.5321 41.2795 14.0052 40.3945 14.6998 39.6999C15.3944 39.0053 16.2794 38.5322 17.2429 38.3406C18.2064 38.1489 19.2051 38.2473 20.1127 38.6232C21.0202 38.9991 21.796 39.6358 22.3417 40.4526C22.8875 41.2694 23.1788 42.2297 23.1788 43.212C23.1788 44.5293 22.6555 45.7927 21.724 46.7241C20.7926 47.6556 19.5292 48.1789 18.2119 48.1789ZM18.2119 41.5564C17.8845 41.5564 17.5644 41.6535 17.2921 41.8354C17.0198 42.0173 16.8076 42.2759 16.6823 42.5784C16.557 42.881 16.5242 43.2139 16.5881 43.535C16.652 43.8562 16.8097 44.1512 17.0412 44.3827C17.2728 44.6143 17.5678 44.772 17.8889 44.8358C18.2101 44.8997 18.543 44.8669 18.8455 44.7416C19.148 44.6163 19.4066 44.4041 19.5885 44.1318C19.7704 43.8596 19.8675 43.5395 19.8675 43.212C19.8675 42.7729 19.6931 42.3518 19.3826 42.0413C19.0721 41.7308 18.651 41.5564 18.2119 41.5564ZM39.7351 48.1789C38.7527 48.1789 37.7924 47.8876 36.9756 47.3418C36.1588 46.7961 35.5222 46.0203 35.1463 45.1128C34.7704 44.2052 34.672 43.2065 34.8636 42.243C35.0553 41.2795 35.5283 40.3945 36.223 39.6999C36.9176 39.0053 37.8026 38.5322 38.7661 38.3406C39.7296 38.1489 40.7283 38.2473 41.6358 38.6232C42.5434 38.9991 43.3191 39.6358 43.8649 40.4526C44.4107 41.2694 44.702 42.2297 44.702 43.212C44.702 44.5293 44.1787 45.7927 43.2472 46.7241C42.3157 47.6556 41.0524 48.1789 39.7351 48.1789ZM39.7351 41.5564C39.4076 41.5564 39.0875 41.6535 38.8153 41.8354C38.543 42.0173 38.3308 42.2759 38.2055 42.5784C38.0802 42.881 38.0474 43.2139 38.1113 43.535C38.1752 43.8562 38.3328 44.1512 38.5644 44.3827C38.7959 44.6143 39.0909 44.772 39.4121 44.8358C39.7333 44.8997 40.0662 44.8669 40.3687 44.7416C40.6712 44.6163 40.9298 44.4041 41.1117 44.1318C41.2936 43.8596 41.3907 43.5395 41.3907 43.212C41.3907 42.7729 41.2163 42.3518 40.9058 42.0413C40.5953 41.7308 40.1742 41.5564 39.7351 41.5564Z" fill="#333333"/>
                    <path d="M23.2812 20.3125H26.4062V28.125H23.2812V20.3125ZM32.6562 20.3125H35.7812V28.125H32.6562V20.3125Z" fill="#333333"/>
                  </svg>
                  <span class="badge-count" v-if="cartCount > 0">{{ cartCount }}</span>
                </div>
                <span class="action-text">{{ $t('nav.cart') }}</span>
              </router-link>
              
              <!-- Order -->
              <router-link to="/profile/orders" class="action-btn">
                <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M41.5714 11.2854C41.5714 10.8308 41.752 10.3947 42.0735 10.0733C42.395 9.75176 42.8311 9.57115 43.2857 9.57115C43.7404 9.57115 44.1764 9.75176 44.4979 10.0733C44.8194 10.3947 45 10.8308 45 11.2854V41.5712C45 45.0426 42.1857 47.8569 38.7143 47.8569H11.2857C7.81429 47.8569 5 45.0426 5 41.5712V8.42829C5 4.95686 7.81429 2.14258 11.2857 2.14258H43.2857C43.7404 2.14258 44.1764 2.32319 44.4979 2.64468C44.8194 2.96617 45 3.40221 45 3.85686C45 4.31152 44.8194 4.74756 44.4979 5.06905C44.1764 5.39054 43.7404 5.57115 43.2857 5.57115H11.2857C10.9105 5.57115 10.539 5.64505 10.1923 5.78864C9.84569 5.93222 9.53072 6.14268 9.26541 6.40799C9.0001 6.6733 8.78964 6.98827 8.64606 7.33491C8.50247 7.68156 8.42857 8.05309 8.42857 8.42829V41.5712C8.42857 41.9464 8.50247 42.3179 8.64606 42.6645C8.78964 43.0112 9.0001 43.3261 9.26541 43.5915C9.53072 43.8568 9.84569 44.0672 10.1923 44.2108C10.539 44.3544 10.9105 44.4283 11.2857 44.4283H38.7143C39.0895 44.4283 39.461 44.3544 39.8077 44.2108C40.1543 44.0672 40.4693 43.8568 40.7346 43.5915C40.9999 43.3261 41.2104 43.0112 41.3539 42.6645C41.4975 42.3179 41.5714 41.9464 41.5714 41.5712V11.2854ZM15.8571 20.9997C15.4025 20.9997 14.9665 20.8191 14.645 20.4976C14.3235 20.1761 14.1429 19.7401 14.1429 19.2854C14.1429 18.8308 14.3235 18.3947 14.645 18.0733C14.9665 17.7518 15.4025 17.5711 15.8571 17.5711H34.1429C34.5975 17.5711 35.0336 17.7518 35.355 18.0733C35.6765 18.3947 35.8571 18.8308 35.8571 19.2854C35.8571 19.7401 35.6765 20.1761 35.355 20.4976C35.0336 20.8191 34.5975 20.9997 34.1429 20.9997H15.8571ZM15.8571 30.1426C15.4025 30.1426 14.9665 29.962 14.645 29.6405C14.3235 29.319 14.1429 28.8829 14.1429 28.4283C14.1429 27.9736 14.3235 27.5376 14.645 27.2161C14.9665 26.8946 15.4025 26.714 15.8571 26.714H27.2857C27.7404 26.714 28.1764 26.8946 28.4979 27.2161C28.8194 27.5376 29 27.9736 29 28.4283C29 28.8829 28.8194 29.319 28.4979 29.6405C28.1764 29.962 27.7404 30.1426 27.2857 30.1426H15.8571Z" fill="#333333"/>
                </svg>
                <span class="action-text">{{ $t('nav.order') }}</span>
              </router-link>
              
              <!-- Demand -->
              <router-link to="/post-demand" class="action-btn">
                <svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.4067 30.8577C15.6609 30.8577 15.0535 30.2503 15.0535 29.5045C15.0535 28.7577 15.661 28.149 16.4067 28.149H32.97C33.7168 28.149 34.3243 28.7576 34.3243 29.5045C34.3243 30.2503 33.7168 30.8577 32.97 30.8577H16.4067ZM16.205 38.1769C15.4581 38.1769 14.8507 37.5694 14.8507 36.8226C14.8507 36.0769 15.458 35.4683 16.205 35.4683H32.7671C33.514 35.4683 34.1214 36.0769 34.1214 36.8226C34.1214 37.5694 33.514 38.1769 32.7671 38.1769H16.205ZM8.85129 47.5109C6.51248 47.5109 5.19397 46.034 5.19397 43.8074V7.60605C5.19397 5.46702 6.28757 3.61246 8.94124 3.61246H32.2588C32.8294 3.61246 33.3227 3.91734 33.5785 4.42793C33.8333 4.93916 33.7826 5.51726 33.4391 5.97362C33.1624 6.34367 32.721 6.56494 32.2588 6.56494H12.8105C11.9483 6.56494 11.2636 6.56494 10.7058 6.56494H9.59584C9.24662 6.56494 8.96652 6.56494 8.71754 6.56494L8.14465 6.56319V44.5579H42.0434L42.0423 43.9862C42.0389 43.1321 42.04 42.4958 42.0412 41.6902V41.6555C42.0412 41.1667 42.0423 40.6089 42.0423 39.8931V18.3961C42.0423 17.9356 42.2613 17.4953 42.6279 17.2181C42.8931 17.0199 43.1973 16.9161 43.5097 16.9161C44.223 16.9161 44.9942 17.4814 44.9942 18.3956V43.9874C44.9942 45.0997 44.7522 45.9503 44.2762 46.5138C43.7194 47.1744 42.7754 47.5109 41.4707 47.5109L8.85129 47.5109ZM38.7493 4.87511L39.0951 4.44979C39.3822 4.09539 39.7741 3.61066 40.0149 3.34616C40.4241 2.89718 40.9866 2.65918 41.6413 2.65918C42.0516 2.65918 42.4031 2.75084 42.6267 2.8281C43.3715 3.08392 44.3545 3.94387 44.8202 4.74487C45.3227 5.61112 45.3182 6.50153 44.8087 7.18846C44.396 7.74862 44.0699 8.16472 43.9477 8.31692L43.6353 8.71053L38.7493 4.87511ZM29.5214 23.2561C29.247 23.2561 29.0245 23.1703 28.8586 23.0008C28.6489 22.7859 28.5554 22.4608 28.5658 21.979C28.5842 21.1566 29.0269 18.5678 29.1952 18.0191C29.3219 17.6065 29.4763 17.2336 29.8175 16.7581C30.3097 16.0746 36.4141 7.98546 37.6324 6.3706L37.9437 5.95922L42.8226 9.79226L42.5265 10.1882C40.8021 12.4854 35.1554 20.0114 34.8372 20.4183C34.5571 20.7769 34.1813 21.1301 33.8333 21.3629C33.106 21.8511 30.772 22.9852 30.0032 23.1858C29.8221 23.2331 29.6642 23.2561 29.5214 23.2561Z" fill="#333333"/>
                </svg>
                <span class="action-text">{{ $t('nav.demand') }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import UserAvatar from './UserAvatar.vue'
import AboutUsDropdown from './AboutUsDropdown.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const $t = (key: string) => i18n?.t(key) || key

// 购物车数量（示例）
const cartCount = ref(0)
</script>

<style scoped>
/* Top Navigation Bar - 深色背景区域 */
.top-nav-bar {
  background: #333333;
  color: white;
  padding: 8px 0;
  border-bottom: 1px solid #e5e7eb;
}

.btn-register {
  background: transparent;
  border: none;
  color: #FFFFFF;
  padding: 6px 16px;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.btn-register:hover {
  background: transparent;
  color: #FFFFFF;
}

/* Main Header - 白色背景区域 */
.main-header {
  background: white;
  padding: 16px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 0;
}

/* Header内容布局 */
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 左侧区域：LOGO + 导航 */
.left-section {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* 右侧区域：搜索框 + 按钮 */
.right-section {
  display: flex;
  align-items: center;
  gap: 193px;
  margin-left: auto;
}

/* LOGO */
.navbar-brand {
  width: 200px;
  height: 44px;
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.navbar-brand:hover {
  color: #000000;
}

/* 导航栏 */
.main-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.nav-link {
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
  position: relative;
  padding: 4px 0;
  text-align: center;
}

.nav-link:hover {
  color: #000000;
}

.nav-link.active {
  color: #000000;
  font-weight: 500;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 19.29px;
  height: 0;
  border-bottom: 4px solid #00699A;
}

/* 搜索框 */
.search-wrapper {
  width: 480px;
}

.search-input {
  width: 100%;
  height: 42px;
  padding: 10px 48px 10px 16px;
  border: 1px solid #E5E6EB;
  border-radius: 8px;
  font-size: 14px;
  background: #F5F5F5;
}

.search-input::placeholder {
  color: #999999;
}

.search-input:focus {
  outline: none;
  border-color: #E5E6EB;
  background: #F5F5F5;
}

.search-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 15px;
  pointer-events: none;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 50px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #000000;
  position: relative;
  cursor: pointer;
  width: 58px;
  height: 50px;
  gap: 4px;
}

.action-btn:hover {
  color: #000000;
}

.action-btn i,
.action-btn svg {
  font-size: 24px;
  line-height: 1;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* 图标包装器 - 用于定位徽章 */
.icon-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 22px;
  letter-spacing: 0;
  color: #333333;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

/* 购物车数量徽章 */
.badge-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #8B2C00;
  color: white;
  font-size: 12px;
  font-weight: 500;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}

/* 响应式布局 */
@media (max-width: 1400px) {
  .right-section {
    gap: 100px;
  }
}

@media (max-width: 1200px) {
  .main-nav {
    gap: 20px;
  }
  
  .right-section {
    gap: 60px;
  }
  
  .search-wrapper {
    width: 360px;
  }
  
  .action-buttons {
    gap: 10px;
  }
  
  /* 保持下划线样式 */
  .nav-link.active::after {
    bottom: -10px;
  }
}

@media (max-width: 992px) {
  .main-nav {
    display: none !important;
  }
  
  .left-section {
    gap: 24px;
  }
  
  .right-section {
    gap: 40px;
  }
  
  .search-wrapper {
    width: 280px;
  }
  
  .action-text {
    display: none;
  }
  
  .action-btn i {
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .right-section {
    gap: 24px;
  }
  
  .search-wrapper {
    width: 200px;
  }
  
  .action-buttons {
    gap: 8px;
  }
}
</style>

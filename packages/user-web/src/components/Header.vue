<template>
  <div>
    <!-- Top Navigation Bar - Part 1 -->
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

    <!-- Top Navigation Bar - Part 2 -->
    <header class="main-header">
      <div class="container-fluid px-4">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-4">
            <router-link to="/" class="navbar-brand">LOGO</router-link>
            <nav class="d-none d-md-flex align-items-center">
              <router-link to="/" class="nav-link" exact active-class="active">{{ $t('nav.home') }}</router-link>
              <router-link to="/shop" class="nav-link" active-class="active">{{ $t('nav.shop') }}</router-link>
              <router-link to="/designers" class="nav-link" active-class="active">{{ $t('nav.designers') }}</router-link>
              <router-link to="/community" class="nav-link" active-class="active">{{ $t('nav.community') }}</router-link>
              <AboutUsDropdown />
            </nav>
          </div>
          <div class="d-flex align-items-center gap-3">
            <div class="position-relative">
              <input type="text" class="form-control search-input" :placeholder="$t('home.search')">
              <i class="bi bi-search search-icon"></i>
            </div>
            <router-link to="/cart" class="btn btn-icon">
              <i class="bi bi-cart"></i>
            </router-link>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import UserAvatar from './UserAvatar.vue'
import AboutUsDropdown from './AboutUsDropdown.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const $t = (key: string) => i18n?.t(key) || key
</script>

<style scoped>
/* Top Navigation */
.top-nav-bar {
  background: #333333;
  color: white;
  padding: clamp(6px, 0.8vw, 8px) 0;
  border-bottom: 1px solid #e5e7eb;
}

.btn-register {
  background: transparent;
  border: none;
  color: #FFFFFF;
  padding: clamp(4px, 0.6vw, 6px) clamp(12px, 1.5vw, 16px);
  border-radius: clamp(2px, 0.3vw, 4px);
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

.main-header {
  background: white;
  padding: clamp(12px, 1.5vw, 16px) 0;
  box-shadow: 0 clamp(1px, 0.15vw, 2px) clamp(2px, 0.3vw, 4px) rgba(0, 0, 0, 0.05);
  margin-bottom: 0;
}

.navbar-brand {
  font-size: clamp(20px, 2.5vw, 24px);
  font-weight: 700;
  color: #00699A;
  text-decoration: none;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  padding: clamp(6px, 0.8vw, 8px) clamp(12px, 1.5vw, 16px);
  font-size: clamp(14px, 1.3vw, 15px);
  transition: color 0.2s;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active {
  color: #00699A;
}

.search-input {
  width: clamp(200px, 25vw, 300px);
  padding-left: clamp(32px, 4vw, 40px);
  padding-top: clamp(6px, 0.8vw, 8px);
  padding-bottom: clamp(6px, 0.8vw, 8px);
  padding-right: clamp(8px, 1vw, 12px);
  border: 1px solid #e5e7eb;
  border-radius: clamp(2px, 0.3vw, 4px);
  font-size: clamp(13px, 1.2vw, 14px);
}

.search-icon {
  position: absolute;
  left: clamp(8px, 1vw, 12px);
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: clamp(14px, 1.5vw, 16px);
}

.btn-icon {
  width: clamp(36px, 4vw, 40px);
  height: clamp(36px, 4vw, 40px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.2s;
  font-size: clamp(16px, 1.8vw, 18px);
}

.btn-icon:hover {
  background: #f3f4f6;
  color: #00699A;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .main-header .container-fluid {
    padding-left: clamp(12px, 3vw, 16px) !important;
    padding-right: clamp(12px, 3vw, 16px) !important;
  }
  
  .search-input {
    width: clamp(150px, 35vw, 200px);
  }
  
  .nav-link {
    padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
    font-size: clamp(13px, 3vw, 14px);
  }
}

@media (max-width: 576px) {
  .main-header .d-flex.gap-4 {
    gap: clamp(8px, 2vw, 12px) !important;
  }
  
  .main-header .d-flex.gap-3 {
    gap: clamp(6px, 1.5vw, 8px) !important;
  }
}
</style>

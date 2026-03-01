<template>
  <div class="home-test">
    <h1>{{ $t('page.test.title') || 'C端用户系统 - 首页测试' }}</h1>
    <p>{{ $t('page.test.desc') || '如果你能看到这个页面，说明路由配置正确！' }}</p>
    <div class="test-info">
      <h3>{{ $t('page.test.info') || '测试信息：' }}</h3>
      <ul>
        <li>{{ $t('page.test.route') || '当前路由' }}: {{ $route.path }}</li>
        <li>{{ $t('page.test.app') || '应用名称' }}: user-web</li>
        <li>{{ $t('page.test.port') || '端口' }}: 8084</li>
        <li>{{ $t('page.test.time') || '时间' }}: {{ new Date().toLocaleString() }}</li>
        <li>{{ $t('page.test.micro') || '微前端环境' }}: {{ isMicroFrontend ? $t('common.yes') || '是' : $t('common.no') || '否' }}</li>
        <li>{{ $t('page.test.window') || '窗口对象' }}: {{ windowInfo }}</li>
      </ul>
    </div>
    
    <div class="navigation-test">
      <h3>{{ $t('page.test.nav') || '导航测试：' }}</h3>
      <LanguageSwitcher class="mb-3" />
      <div>
        <router-link to="/shop" class="btn btn-primary me-2">{{ $t('nav.shop') }}</router-link>
        <router-link to="/designers" class="btn btn-primary me-2">{{ $t('nav.designers') }}</router-link>
        <router-link to="/community" class="btn btn-primary me-2">{{ $t('nav.community') }}</router-link>
        <router-link to="/home" class="btn btn-success me-2">{{ $t('nav.home') || '完整首页' }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, inject } from 'vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const $t = (key: string) => i18n?.t(key) || key

const windowInfo = computed(() => {
  return {
    location: window.location.href,
    userAgent: navigator.userAgent.substring(0, 50) + '...'
  }
})

onMounted(() => {
  console.log('HomeTest.vue 挂载完成')
  console.log('窗口信息:', windowInfo.value)
})
</script>

<style scoped>
.home-test {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
}

.test-info, .navigation-test {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f9fa;
}

.btn {
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  text-decoration: none;
  border-radius: 4px;
  display: inline-block;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.btn-success {
  background-color: #28a745;
  color: white;
  border: 1px solid #28a745;
}

.btn:hover {
  opacity: 0.8;
}
</style>
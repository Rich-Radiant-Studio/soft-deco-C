<template>
  <div class="language-switcher">
    <div class="dropdown">
      <button 
        class="btn btn-dark-custom btn-sm dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown"
        :title="currentLanguage.name"
      >
        <span>{{ currentLanguage.name }}</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <li v-for="locale in availableLocales" :key="locale">
          <a 
            class="dropdown-item" 
            href="#" 
            @click.prevent="switchLanguage(locale)"
            :class="{ active: locale === currentLocale }"
          >
            <span class="flag me-2">{{ getLanguageInfo(locale).flag }}</span>
            {{ getLanguageInfo(locale).name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, onMounted } from 'vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const currentLocale = ref(i18n?.currentLocale || 'zh')

const languages = {
  zh: { name: '中文', flag: '🇨🇳' },
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' }
}

const availableLocales = computed(() => i18n?.availableLocales || ['zh', 'en', 'es'])

const currentLanguage = computed(() => {
  return languages[currentLocale.value as keyof typeof languages] || languages.zh
})

const getLanguageInfo = (locale: string) => {
  return languages[locale as keyof typeof languages] || languages.zh
}

const switchLanguage = async (locale: string) => {
  if (i18n && locale !== currentLocale.value) {
    await i18n.switchLocale(locale)
    currentLocale.value = locale
  }
}

// 监听语言变化事件
onMounted(() => {
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLocale.value = event.detail.locale
  })
  
  // 同步初始语言
  currentLocale.value = i18n?.currentLocale || 'zh'
})
</script>

<style scoped>
.language-switcher {
  position: relative;
}

.flag {
  font-size: 1.1em;
}

.btn-dark-custom {
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 0.375rem 0.75rem;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  cursor: pointer;
}

.btn-dark-custom:hover {
  background: transparent;
  border: none;
  color: #ffffff;
}

.btn-dark-custom:focus {
  box-shadow: none;
  outline: none;
}

.dropdown-menu-dark {
  background-color: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 0.25rem;
  padding: 0.5rem 0;
  min-width: 150px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dropdown-menu-dark .dropdown-item {
  color: #e0e0e0;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.dropdown-menu-dark .dropdown-item:hover {
  background-color: #3d3d3d;
  color: #ffffff;
}

.dropdown-menu-dark .dropdown-item.active {
  background-color: #f97316;
  color: #ffffff;
  font-weight: 500;
}
</style>
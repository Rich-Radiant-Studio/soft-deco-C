<template>
  <footer class="site-footer">
    <div class="container-fluid px-4 py-4">
      <div class="text-center">
        <p class="mb-2">{{ $t('common.copyright') }}</p>
        <p class="mb-0">ICP备案号：京ICP备12345678号</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import type { I18nPlugin } from '@/plugins/i18n'

const i18n = inject<I18nPlugin>('i18n')
const $t = (key: string) => i18n?.t(key) || key
</script>

<style scoped>
.site-footer {
  background: #3C3C3C;
  color: white;
  margin-top: 0;
}

.site-footer p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}
</style>

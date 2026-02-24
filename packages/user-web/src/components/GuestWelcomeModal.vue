<template>
  <teleport to="body">
    <div v-if="visible" class="guest-modal-overlay" @click.self="handleClose">
      <div class="guest-modal">
        <button class="close-btn" @click="handleClose">
          <i class="bi bi-x-lg"></i>
        </button>
        
        <div class="modal-header">
          <i class="bi bi-person-check-fill welcome-icon"></i>
          <h2>{{ $t('guest.welcome') }}</h2>
          <p class="subtitle">{{ $t('guest.autoLoginMessage') }}</p>
        </div>
        
        <div class="account-info">
          <div class="info-row">
            <span class="label">{{ $t('guest.username') }}:</span>
            <span class="value">{{ guestAccount?.username }}</span>
          </div>
          <div class="info-row">
            <span class="label">{{ $t('guest.accountId') }}:</span>
            <span class="value">{{ guestAccount?.id }}</span>
          </div>
        </div>
        
        <div class="notice-box">
          <i class="bi bi-info-circle-fill"></i>
          <div>
            <p class="notice-title">{{ $t('guest.noticeTitle') }}</p>
            <ul class="notice-list">
              <li>{{ $t('guest.notice1') }}</li>
              <li>{{ $t('guest.notice2') }}</li>
              <li>{{ $t('guest.notice3') }}</li>
            </ul>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-primary" @click="handleUpgrade">
            <i class="bi bi-person-plus-fill me-2"></i>
            {{ $t('guest.upgradeNow') }}
          </button>
          <button class="btn btn-secondary" @click="handleContinue">
            {{ $t('guest.continueAsGuest') }}
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import type { I18nPlugin } from '@/plugins/i18n'
import { navigation } from '@/utils/navigation'
import type { GuestAccount } from '@/utils/guestAuth'

const i18n = inject<I18nPlugin>('i18n')
const $t = (key: string) => i18n?.t(key) || key

const visible = ref(false)
const guestAccount = ref<GuestAccount | null>(null)

// 检查是否需要显示欢迎弹窗
const checkAndShow = () => {
  try {
    const userInfo = localStorage.getItem('userInfo')
    const hasSeenWelcome = localStorage.getItem('hasSeenGuestWelcome')
    
    if (userInfo && !hasSeenWelcome) {
      const user = JSON.parse(userInfo)
      if (user.isGuest) {
        const accountStr = localStorage.getItem('guestAccount')
        if (accountStr) {
          guestAccount.value = JSON.parse(accountStr)
          visible.value = true
        }
      }
    }
  } catch (error) {
    console.error('检查游客欢迎弹窗失败:', error)
  }
}

const handleClose = () => {
  visible.value = false
  localStorage.setItem('hasSeenGuestWelcome', 'true')
}

const handleUpgrade = () => {
  handleClose()
  navigation.toRegister()
}

const handleContinue = () => {
  handleClose()
}

onMounted(() => {
  // 延迟显示，避免影响页面加载
  setTimeout(checkAndShow, 1000)
})
</script>

<style scoped>
.guest-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.guest-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.welcome-icon {
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.account-info {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}

.info-row:not(:last-child) {
  border-bottom: 1px solid #e5e7eb;
}

.info-row .label {
  color: #6b7280;
  font-size: 0.875rem;
}

.info-row .value {
  color: #111827;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: monospace;
}

.notice-box {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  gap: 0.75rem;
}

.notice-box i {
  color: #3b82f6;
  font-size: 1.25rem;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.notice-title {
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.notice-list {
  margin: 0;
  padding-left: 1.25rem;
  color: #1e40af;
  font-size: 0.8125rem;
}

.notice-list li {
  margin-bottom: 0.25rem;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
}

.btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary {
  background: #f97316;
  color: white;
}

.btn-primary:hover {
  background: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}
</style>

<template>
  <div class="about-dropdown-wrapper" ref="wrapperRef">
    <a 
      href="#" 
      class="nav-link"
      @mouseenter="showMenu"
      @mouseleave="hideMenu"
      @click.prevent
    >
      {{ $t('nav.about') }}
    </a>
    
    <transition name="dropdown-fade">
      <div 
        v-if="isVisible"
        class="dropdown-menu"
        :style="dropdownStyle"
        ref="dropdownRef"
        @mouseenter="showMenu"
        @mouseleave="hideMenu"
      >
        <!-- Left Column: Platform Info with Image -->
        <div class="menu-column left-column">
          <div class="platform-image">
            <img src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=240&h=160&fit=crop&q=80" alt="Platform">
          </div>
          <h4 class="platform-name">{{ $t('about.platformName') }}</h4>
          <p class="platform-desc">{{ $t('about.platformDesc') }}</p>
        </div>
        
        <!-- Middle Column 1: Quick Links -->
        <div class="menu-column middle-column">
          <h5 class="section-title">{{ $t('about.quickLinks') }}</h5>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.sitemap') }}</a>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.terms') }}</a>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.privacy') }}</a>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.partners') }}</a>
        </div>
        
        <!-- Middle Column 2: Service Support -->
        <div class="menu-column middle-column">
          <h5 class="section-title">{{ $t('about.support') }}</h5>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.help') }}</a>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.faq') }}</a>
          <a href="#" class="menu-link" @click.prevent>{{ $t('about.feedback') }}</a>
        </div>
        
        <!-- Right Column: Contact Info -->
        <div class="menu-column right-column">
          <h5 class="section-title">{{ $t('about.contact') }}</h5>
          <div class="contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <span>{{ $t('about.address') }}</span>
          </div>
          <div class="contact-item">
            <i class="bi bi-telephone-fill"></i>
            <span>{{ $t('about.phone') }}</span>
          </div>
          <div class="contact-item clickable" @click="copyEmail">
            <i class="bi bi-envelope-fill"></i>
            <span>{{ $t('about.email') }}</span>
            <i class="bi bi-copy copy-icon"></i>
          </div>
        </div>
        
        <!-- Copy Notification -->
        <transition name="notification-fade">
          <div v-if="showCopyNotification" class="copy-notification">
            {{ $t('about.emailCopied') }}
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onBeforeUnmount, computed, nextTick } from 'vue'
import type { I18nPlugin } from '@/plugins/i18n'

// Inject i18n instance
const i18n = inject<I18nPlugin>('i18n')

// Translation helper
const $t = (key: string) => i18n?.t(key) || key

// Reactive state
const isVisible = ref<boolean>(false)
const showCopyNotification = ref<boolean>(false)
const wrapperRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)

// Timers
let hideTimer: number | null = null
let notificationTimer: number | null = null

// Calculate dropdown position to prevent overflow
const dropdownStyle = computed(() => {
  if (!isVisible.value || !wrapperRef.value) return {}
  
  // Get wrapper position
  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  const dropdownWidth = 800
  const viewportWidth = window.innerWidth
  const padding = 16
  
  // Calculate if dropdown would overflow on the left
  const wouldOverflowLeft = wrapperRect.right - dropdownWidth < padding
  
  if (wouldOverflowLeft) {
    // If would overflow left, align to left edge with padding
    return {
      left: `${padding - wrapperRect.left}px`,
      right: 'auto'
    }
  }
  
  // Default: align right edge of dropdown with right edge of button
  return {
    right: '0',
    left: 'auto'
  }
})

// Show menu
const showMenu = (): void => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  isVisible.value = true
}

// Hide menu with delay
const hideMenu = (): void => {
  hideTimer = window.setTimeout(() => {
    isVisible.value = false
  }, 200)
}

// Copy email to clipboard
const copyEmail = async (): Promise<void> => {
  try {
    const email = $t('about.email')
    await navigator.clipboard.writeText(email)
    showCopyNotification.value = true
    
    // Auto-hide notification
    if (notificationTimer) clearTimeout(notificationTimer)
    notificationTimer = window.setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy email:', error)
    // Fallback method
    fallbackCopyEmail()
  }
}

// Fallback copy method using execCommand
const fallbackCopyEmail = (): void => {
  const email = $t('about.email')
  const textArea = document.createElement('textarea')
  textArea.value = email
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  
  try {
    document.execCommand('copy')
    showCopyNotification.value = true
    
    if (notificationTimer) clearTimeout(notificationTimer)
    notificationTimer = window.setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  } catch (error) {
    console.error('Fallback copy also failed:', error)
  } finally {
    document.body.removeChild(textArea)
  }
}

// Cleanup timers on unmount
onBeforeUnmount(() => {
  if (hideTimer) clearTimeout(hideTimer)
  if (notificationTimer) clearTimeout(notificationTimer)
})
</script>

<style scoped>
.about-dropdown-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.about-dropdown-wrapper .nav-link {
  color: #000000;
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  white-space: nowrap;
  position: relative;
  padding: 4px 0;
  text-align: center;
  display: inline-block;
}

.about-dropdown-wrapper .nav-link:hover {
  color: #000000;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  margin-top: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  padding: 32px;
  display: flex;
  gap: 24px;
  width: 800px;
  max-width: calc(100vw - 32px);
  z-index: 1002;
}

/* 如果弹窗会溢出左侧，自动调整到右对齐 */
@media (max-width: 850px) {
  .dropdown-menu {
    width: calc(100vw - 32px);
  }
}

.menu-column {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* Left Column - Platform Info */
.left-column {
  flex: 0 0 180px;
  padding-right: 20px;
  border-right: 1px solid #e5e7eb;
}

.platform-image {
  width: 100%;
  max-width: 176px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 8px;
}

.platform-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.platform-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 8px 0;
}

.platform-desc {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  color: #9C9C9C;
  margin: 0;
}

/* Middle Columns - Links */
.middle-column {
  flex: 0 0 120px;
}

.middle-column > *:not(:last-child) {
  margin-bottom: 8px;
}

.section-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 12px 0;
}

.menu-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  color: #333333;
  text-decoration: none;
  padding: 5px 0;
  transition: color 0.2s ease;
  display: block;
  margin: 0;
}

.menu-link:hover {
  color: #00699A;
}

/* Right Column - Contact */
.right-column {
  flex: 0 0 240px;
}

.right-column .section-title {
  margin-bottom: 16px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0;
  color: #333333;
}

.contact-item:last-of-type {
  margin-bottom: 0;
}

.contact-item i {
  font-size: 12px;
  color: #9C9C9C;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.contact-item i.copy-icon {
  font-size: 11px;
  color: #00699A !important;
  width: 11px;
  height: 11px;
  margin-left: 8px;
  cursor: pointer;
}

.contact-item span {
  line-height: 1;
  display: flex;
  align-items: center;
}

.contact-item.clickable {
  cursor: pointer;
}

/* Copy Notification */
.copy-notification {
  position: absolute;
  bottom: -50px;
  right: 20px;
  background: #10b981;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* Transitions */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.notification-fade-enter-active,
.notification-fade-leave-active {
  transition: opacity 0.3s ease;
}

.notification-fade-enter-from,
.notification-fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .dropdown-menu {
    flex-direction: column;
    min-width: 320px;
    max-width: 90vw;
    gap: 24px;
    padding: 24px;
  }
  
  .left-column,
  .right-column {
    border: none;
    padding: 0;
    flex: 1;
  }
  
  .middle-column {
    flex: 1;
  }
  
  .left-column {
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e7eb;
  }
}
</style>

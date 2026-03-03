<template>
  <div v-if="visible" class="review-modal-overlay" @click.self="closeModal">
    <div class="review-modal">
      <!-- Close Button -->
      <button class="modal-close-btn" @click="closeModal">
        <i class="bi bi-x"></i>
      </button>

      <!-- Title -->
      <h2 class="modal-title">{{ title }}</h2>

      <!-- Filter Tabs -->
      <div class="filter-tabs">
        <button 
          class="filter-tab" 
          :class="{ active: activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >
          全部98%好评
        </button>
        <button 
          class="filter-tab"
          :class="{ active: activeFilter === 'withImages' }"
          @click="activeFilter = 'withImages'"
        >
          图片赞200+
        </button>
        <button 
          class="filter-tab"
          :class="{ active: activeFilter === 'good' }"
          @click="activeFilter = 'good'"
        >
          好评200+
        </button>
        <button 
          class="filter-tab"
          :class="{ active: activeFilter === 'medium' }"
          @click="activeFilter = 'medium'"
        >
          中评 4
        </button>
        <button 
          class="filter-tab"
          :class="{ active: activeFilter === 'bad' }"
          @click="activeFilter = 'bad'"
        >
          差评 0
        </button>
      </div>

      <!-- Reviews List -->
      <div class="reviews-container">
        <!-- Empty State -->
        <div v-if="paginatedReviews.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 0H26V8H22V0Z" fill="black" fill-opacity="0.4"/>
              <path d="M10.002 1.17157L7.17353 4L13.002 9.82843L15.8304 7L10.002 1.17157Z" fill="black" fill-opacity="0.4"/>
              <path d="M2 27.4689L10.8394 12H37.1606L46 27.4689V44H2V27.4689ZM13.1606 16L7.44636 26H17.8025L18.1889 27.5015C18.8551 30.0898 21.207 32 24 32C26.793 32 29.1449 30.0898 29.8111 27.5015L30.1975 26H40.5536L34.8394 16H13.1606Z" fill="black" fill-opacity="0.4"/>
              <path d="M37.998 1.17157L32.1696 7L34.998 9.82843L40.8265 4L37.998 1.17157Z" fill="black" fill-opacity="0.4"/>
            </svg>
          </div>
          <p class="empty-text">暂无数据</p>
        </div>

        <!-- Review Items -->
        <div class="review-item" v-for="review in paginatedReviews" :key="review.id">
          <!-- Review Header -->
          <div class="review-header">
            <div class="user-info">
              <img :src="review.avatar" :alt="review.username" class="user-avatar">
              <div class="user-details">
                <div class="user-name-date">
                  <span class="username">{{ review.username }}</span>
                  <span class="review-date">{{ review.date }}</span>
                </div>
                <!-- Star Rating -->
                <div class="star-rating">
                  <i 
                    v-for="n in 5" 
                    :key="n"
                    class="bi"
                    :class="n <= review.rating ? 'bi-star-fill' : 'bi-star-half'"
                  ></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Review Text -->
          <p class="review-text">{{ review.text }}</p>

          <!-- Review Images -->
          <div class="review-images" v-if="review.images && review.images.length > 0">
            <img 
              v-for="(img, index) in review.images" 
              :key="index"
              :src="img" 
              :alt="`Review image ${index + 1}`"
              class="review-image"
            >
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          class="page-btn page-prev" 
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page"
          class="page-btn page-number"
          :class="{ active: page === currentPage, ellipsis: page === '...' }"
          @click="page !== '...' && goToPage(page)"
          :disabled="page === '...'"
        >
          {{ page }}
        </button>

        <button 
          class="page-btn page-next"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, toRef } from 'vue'
import { useLockScroll } from '@/composables/useLockScroll'

interface Review {
  id: number
  username: string
  avatar: string
  rating: number
  text: string
  images: string[]
  date: string
  hasImages?: boolean
}

interface Props {
  visible: boolean
  reviews: Review[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '案例评价'
})
const emit = defineEmits<{
  (e: 'close'): void
}>()

// 锁定页面滚动
const visibleRef = toRef(props, 'visible')
useLockScroll(visibleRef)

const activeFilter = ref('all')
const currentPage = ref(1)
const pageSize = 3 // 每页显示3条评论

// 关闭弹窗
const closeModal = () => {
  emit('close')
}

// 筛选后的评论
const filteredReviews = computed(() => {
  let reviews = props.reviews

  switch (activeFilter.value) {
    case 'withImages':
      return reviews.filter(r => r.images && r.images.length > 0)
    case 'good':
      return reviews.filter(r => r.rating >= 4)
    case 'medium':
      return reviews.filter(r => r.rating === 3)
    case 'bad':
      return reviews.filter(r => r.rating < 3)
    default:
      return reviews
  }
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredReviews.value.length / pageSize)
})

// 当前页的评论
const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredReviews.value.slice(start, end)
})

// 可见的页码
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    // 如果总页数小于等于7，显示所有页码
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // 总是显示第一页
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // 显示当前页附近的页码
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (current < total - 2) {
      pages.push('...')
    }

    // 总是显示最后一页
    if (total > 1) {
      pages.push(total)
    }
  }

  return pages
})

// 跳转到指定页
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// 当筛选条件改变时，重置到第一页
watch(activeFilter, () => {
  currentPage.value = 1
})

// 当弹窗打开时，重置状态
watch(() => props.visible, (newVal) => {
  if (newVal) {
    activeFilter.value = 'all'
    currentPage.value = 1
  }
})

</script>

<style scoped>
.review-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: clamp(16px, 3vw, 20px);
}

.review-modal {
  position: relative;
  width: clamp(320px, 90vw, 1000px);
  height: clamp(600px, 80vh, 864px);
  max-width: 100%;
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (max-width: 768px) {
  .review-modal {
    width: 95vw;
    height: clamp(500px, 85vh, 800px);
    padding: clamp(16px, 4vw, 20px);
  }
}

/* Close Button */
.modal-close-btn {
  position: absolute;
  top: clamp(12px, 2vw, 16px);
  right: clamp(12px, 2vw, 16px);
  width: clamp(28px, 4vw, 32px);
  height: clamp(28px, 4vw, 32px);
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(20px, 3vw, 24px);
  color: #6B7280;
  transition: color 0.2s;
  padding: 0;
  z-index: 10;
}

.modal-close-btn:hover {
  color: #111827;
}

/* Title */
.modal-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  line-height: clamp(28px, 3.5vw, 32px);
  letter-spacing: 0;
  color: #1D2129;
  margin: 0 0 clamp(16px, 2vw, 20px) 0;
  text-align: center;
  padding-right: clamp(28px, 4vw, 32px);
  vertical-align: middle;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .modal-title {
    font-size: clamp(16px, 5vw, 20px);
    line-height: clamp(24px, 6vw, 28px);
    margin: 0 0 clamp(12px, 3vw, 16px) 0;
  }
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: clamp(16px, 2vw, 20px);
  flex-shrink: 0;
}

.filter-tab {
  padding: 5px 24px;
  font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  color: #1D2129;
  background: #F7FAFC;
  border: 1px solid #E5E7EB;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.filter-tab:hover {
  border-color: #00699A;
  color: #00699A;
}

.filter-tab.active {
  background: #E0F2FE;
  border-color: #00699A;
  color: #00699A;
}

@media (max-width: 768px) {
  .filter-tabs {
    gap: 4px;
  }
  
  .filter-tab {
    font-size: 13px;
    line-height: 20px;
    padding: 5px clamp(16px, 4vw, 24px);
    height: clamp(28px, 8vw, 32px);
  }
}

/* Reviews Container */
.reviews-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-right: clamp(4px, 1vw, 8px);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px);
  flex: 1;
}

.empty-icon {
  display: flex;
  justify-content: center;
  margin-bottom: clamp(12px, 2vw, 16px);
}

.empty-icon svg {
  width: clamp(48px, 8vw, 64px);
  height: clamp(48px, 8vw, 64px);
}

.empty-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 400;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  text-align: center;
}

.reviews-container::-webkit-scrollbar {
  width: 6px;
}

.reviews-container::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.reviews-container::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

.reviews-container::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

/* Review Item */
.review-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 0;
  border-bottom: none;
}

.review-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

/* Review Header */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: clamp(12px, 2vw, 16px);
}

.user-info {
  display: flex;
  align-items: flex-start;
  gap: clamp(8px, 1.5vw, 12px);
  flex: 1;
}

.user-avatar {
  width: clamp(40px, 5vw, 48px);
  height: clamp(40px, 5vw, 48px);
  border-radius: 125px;
  object-fit: cover;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .user-avatar {
    width: clamp(36px, 10vw, 44px);
    height: clamp(36px, 10vw, 44px);
  }
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.user-name-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(12px, 2vw, 16px);
  width: 100%;
}

.username {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.8vw, 16px);
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  color: #333333;
}

@media (max-width: 768px) {
  .username {
    font-size: clamp(14px, 4vw, 16px);
    line-height: 18px;
  }
}

.review-date {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #9C9C9C;
  white-space: nowrap;
  flex-shrink: 0;
}

/* Star Rating */
.star-rating {
  display: flex;
  gap: clamp(2px, 0.5vw, 4px);
}

.star-rating i {
  font-size: clamp(14px, 2vw, 18px);
  color: #FFC107;
}

/* Review Text */
.review-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0;
  color: #333333;
  margin: 0;
  word-wrap: break-word;
  word-break: break-word;
  vertical-align: middle;
}

/* Review Images */
.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(8px, 1.5vw, 12px);
}

.review-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.review-image:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .review-image {
    width: clamp(60px, 15vw, 80px);
    height: clamp(60px, 15vw, 80px);
  }
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding-top: clamp(16px, 2vw, 20px);
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-top: auto;
}

.page-btn {
  min-width: 32px;
  height: 32px;
  padding: 4px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: #6B7280;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled):not(.ellipsis):not(.active) {
  background: #F7FAFC;
  color: #00699A;
}

.page-btn.active {
  background: transparent;
  border: 1px solid #00699A;
  color: #00699A;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: transparent;
}

.page-btn.ellipsis {
  border: none;
  cursor: default;
  background: transparent;
}

.page-btn.ellipsis:hover {
  background: transparent;
  color: #6B7280;
}

.page-prev,
.page-next {
  min-width: 32px;
}

@media (max-width: 768px) {
  .pagination {
    gap: 8px;
    padding-top: clamp(12px, 3vw, 16px);
  }
  
  .page-btn {
    min-width: 32px;
    height: 32px;
    font-size: 13px;
    padding: 4px;
  }
  
  .page-prev,
  .page-next {
    min-width: 32px;
  }
}
</style>

<template>
  <div class="case-detail-page">
    <!-- Header -->
    <Header />

    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container-fluid px-4 py-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li class="breadcrumb-item active">{{ productTitle }}</li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container-fluid pb-5">
      <div class="main-content-container">
        <div class="row gx-4">
          <!-- Left: Image Gallery -->
          <div class="col-left">
            <div class="image-gallery">
              <div class="gallery-layout">
                <!-- Thumbnail List (Left) -->
                <div class="thumbnail-container">
                  <div class="thumbnail-list" ref="thumbnailListRef">
                    <div 
                      v-for="(img, index) in productImages" 
                      :key="index"
                      class="thumbnail-item"
                      :class="{ active: selectedImage === img }"
                      @click="selectedImage = img"
                    >
                      <img :src="img" alt="Thumbnail">
                    </div>
                  </div>
                </div>
                
                <!-- Main Image (Right) -->
                <div class="main-image">
                  <img :src="selectedImage" alt="Product">
                </div>
              </div>
            </div>

            <!-- Tabs Section -->
            <div class="case-tabs">
              <div class="tab-buttons">
                <button 
                  class="tab-btn" 
                  :class="{ active: activeTab === 'product' }"
                  @click="activeTab = 'product'"
                >
                  Case Product
                </button>
                <button 
                  class="tab-btn" 
                  :class="{ active: activeTab === 'inspiration' }"
                  @click="activeTab = 'inspiration'"
                >
                  Design Inspiration
                </button>
                <button 
                  class="tab-btn" 
                  :class="{ active: activeTab === 'review' }"
                  @click="activeTab = 'review'"
                >
                  Case Review
                </button>
              </div>

              <!-- Tab Content -->
              <div class="tab-content">
                <!-- Case Product Tab -->
                <div v-if="activeTab === 'product'" class="kiro-tab-pane">
                  <div v-if="caseProducts.length > 0" class="product-grid-2col">
                    <div class="product-card-detail" v-for="item in caseProducts" :key="item.id">
                      <div class="product-card-image">
                        <img :src="item.image" :alt="item.name">
                      </div>
                      <div class="product-card-info">
                        <h4 class="product-card-name">{{ item.name }}</h4>
                        <div class="product-card-row">
                          <span class="label">Price:</span>
                          <span class="value price" v-if="item.price">${{ item.price }}</span>
                          <span class="value price" v-else>-</span>
                        </div>
                        <div class="product-card-row">
                          <span class="label">Color:</span>
                          <span class="value">{{ item.color }}</span>
                        </div>
                        <div class="product-card-row">
                          <span class="label">Size:</span>
                          <span class="value">{{ item.size }}</span>
                        </div>
                        <div class="product-card-row">
                          <span class="label">Material:</span>
                          <span class="value">{{ item.material }}</span>
                        </div>
                        <p class="product-card-desc">{{ item.description }}</p>
                      </div>
                    </div>
                  </div>
                  <div v-else class="empty-state">
                    <div class="empty-icon">
                      <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 0H26V8H22V0Z" fill="black" fill-opacity="0.4"/>
                        <path d="M10.002 1.17157L7.17353 4L13.002 9.82843L15.8304 7L10.002 1.17157Z" fill="black" fill-opacity="0.4"/>
                        <path d="M2 27.4689L10.8394 12H37.1606L46 27.4689V44H2V27.4689ZM13.1606 16L7.44636 26H17.8025L18.1889 27.5015C18.8551 30.0898 21.207 32 24 32C26.793 32 29.1449 30.0898 29.8111 27.5015L30.1975 26H40.5536L34.8394 16H13.1606Z" fill="black" fill-opacity="0.4"/>
                        <path d="M37.998 1.17157L32.1696 7L34.998 9.82843L40.8265 4L37.998 1.17157Z" fill="black" fill-opacity="0.4"/>
                      </svg>
                    </div>
                    <p class="empty-text">No data available</p>
                  </div>
                </div>

                <!-- Design Inspiration Tab -->
                <div v-if="activeTab === 'inspiration'" class="kiro-tab-pane">
                  <div v-if="hasDesignInspiration && currentProduct?.designInspiration" class="inspiration-content">
                    <h3 class="inspiration-title">{{ currentProduct.designInspiration.title }}</h3>
                    <p class="inspiration-intro">{{ currentProduct.designInspiration.intro }}</p>
                    
                    <div class="inspiration-detail">
                      <div class="detail-row">
                        <span class="detail-label">color matching:</span>
                        <span class="detail-text">{{ currentProduct.designInspiration.colorMatching }}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Material Selection:</span>
                        <span class="detail-text">{{ currentProduct.designInspiration.materialSelection }}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">spatial characteristics:</span>
                        <span class="detail-text">{{ currentProduct.designInspiration.spatialCharacteristics }}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Designer's suggestion:</span>
                        <span class="detail-text">{{ currentProduct.designInspiration.designerSuggestion }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else class="empty-state">
                    <div class="empty-icon">
                      <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 0H26V8H22V0Z" fill="black" fill-opacity="0.4"/>
                        <path d="M10.002 1.17157L7.17353 4L13.002 9.82843L15.8304 7L10.002 1.17157Z" fill="black" fill-opacity="0.4"/>
                        <path d="M2 27.4689L10.8394 12H37.1606L46 27.4689V44H2V27.4689ZM13.1606 16L7.44636 26H17.8025L18.1889 27.5015C18.8551 30.0898 21.207 32 24 32C26.793 32 29.1449 30.0898 29.8111 27.5015L30.1975 26H40.5536L34.8394 16H13.1606Z" fill="black" fill-opacity="0.4"/>
                        <path d="M37.998 1.17157L32.1696 7L34.998 9.82843L40.8265 4L37.998 1.17157Z" fill="black" fill-opacity="0.4"/>
                      </svg>
                    </div>
                    <p class="empty-text">No data available</p>
                  </div>
                </div>

                <!-- Case Review Tab -->
                <div v-if="activeTab === 'review'" class="kiro-tab-pane">
                  <div v-if="allReviews.length > 0" class="review-content">
                    <h3 class="review-title">Case Review ({{ totalReviews }}+)</h3>
                    
                    <div class="review-list">
                      <div class="review-item" v-for="review in displayedReviews" :key="review.id">
                        <div class="review-header">
                          <img :src="review.avatar" alt="User Avatar" class="review-avatar">
                          <span class="review-username">{{ review.username }}</span>
                        </div>
                        <p class="review-text">{{ review.text }}</p>
                        <div class="review-images" v-if="review.images && review.images.length > 0">
                          <img v-for="(img, index) in review.images" :key="index" :src="img" alt="Review Image">
                        </div>
                      </div>
                    </div>
                    
                    <div class="view-more-container" v-if="hasMoreReviews">
                      <div class="view-more-line"></div>
                      <button class="view-more-btn" @click="openReviewModal">View more</button>
                      <div class="view-more-line"></div>
                    </div>
                  </div>
                  <div v-else class="empty-state">
                    <div class="empty-icon">
                      <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 0H26V8H22V0Z" fill="black" fill-opacity="0.4"/>
                        <path d="M10.002 1.17157L7.17353 4L13.002 9.82843L15.8304 7L10.002 1.17157Z" fill="black" fill-opacity="0.4"/>
                        <path d="M2 27.4689L10.8394 12H37.1606L46 27.4689V44H2V27.4689ZM13.1606 16L7.44636 26H17.8025L18.1889 27.5015C18.8551 30.0898 21.207 32 24 32C26.793 32 29.1449 30.0898 29.8111 27.5015L30.1975 26H40.5536L34.8394 16H13.1606Z" fill="black" fill-opacity="0.4"/>
                        <path d="M37.998 1.17157L32.1696 7L34.998 9.82843L40.8265 4L37.998 1.17157Z" fill="black" fill-opacity="0.4"/>
                      </svg>
                    </div>
                    <p class="empty-text">No data available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="col-right">
            <div class="product-info">
              <h1 class="product-title">{{ productTitle }}</h1>
            
              <!-- Rating -->
              <div class="rating-section">
                <div class="stars">
                  <i class="bi bi-star-fill" v-for="n in 5" :key="n"></i>
                </div>
                <span class="rating-score">{{ productRating.toFixed(1) }}</span>
                <a href="#" class="view-reviews-link">View all reviews</a>
              </div>

              <!-- Price and Designer -->
              <div class="price-designer-row">
                <span class="current-price">$<span class="price-number">{{ productPrice }}</span></span>
                <span class="designer-info">Designer: {{ productDesigner }}</span>
              </div>

              <!-- Service Options Title -->
              <div class="service-title-container">
                <div class="service-title-line"></div>
                <h3 class="service-title">service options</h3>
                <div class="service-title-line"></div>
              </div>

              <!-- Design Drawings Option -->
              <div class="service-option">
                <div class="option-header">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="services.designDrawings">
                    <span>design drawings</span>
                  </label>
                  <span class="option-price">$399.00</span>
                </div>
              </div>

              <!-- Purchase Materials Option -->
              <div class="service-option">
                <div class="option-header">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="services.purchaseMaterials" @change="onPurchaseMaterialsChange">
                    <span>Purchase materials</span>
                  </label>
                  <span class="option-price">${{ materialsTotal.toFixed(2) }}</span>
                </div>
                <div class="option-details">
                  <div class="delivery-date">Expected delivery date: 2026-02-20</div>
                  
                  <!-- Materials Table -->
                  <table class="materials-table">
                    <thead>
                      <tr>
                        <th><input type="checkbox" v-model="selectAllMaterials" @change="toggleAllMaterials"></th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="materials.length === 0">
                        <td colspan="4" class="empty-data">
                          <div class="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22 0H26V8H22V0Z" fill="black" fill-opacity="0.4"/>
                              <path d="M10.002 1.17157L7.17353 4L13.002 9.82843L15.8304 7L10.002 1.17157Z" fill="black" fill-opacity="0.4"/>
                              <path d="M2 27.4689L10.8394 12H37.1606L46 27.4689V44H2V27.4689ZM13.1606 16L7.44636 26H17.8025L18.1889 27.5015C18.8551 30.0898 21.207 32 24 32C26.793 32 29.1449 30.0898 29.8111 27.5015L30.1975 26H40.5536L34.8394 16H13.1606Z" fill="black" fill-opacity="0.4"/>
                              <path d="M37.998 1.17157L32.1696 7L34.998 9.82843L40.8265 4L37.998 1.17157Z" fill="black" fill-opacity="0.4"/>
                            </svg>
                          </div>
                          <p class="empty-text">暂无数据</p>
                        </td>
                      </tr>
                      <tr v-for="item in materials" :key="item.id" v-else>
                        <td><input type="checkbox" v-model="item.selected"></td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>${{ item.price }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Purchase Construction Option -->
              <div class="service-option">
                <div class="option-header">
                  <label class="option-checkbox">
                    <input type="checkbox" v-model="services.purchaseConstruction">
                    <span>Purchase construction</span>
                  </label>
                  <span class="option-price">$1,200.00</span>
                </div>
                <div class="option-details">
                  <div class="date-picker">
                    <input type="text" placeholder="*Select construction date" onfocus="(this.type='date')" onblur="if(!this.value)this.type='text'">
                    <i class="bi bi-calendar"></i>
                  </div>
                </div>
              </div>

              <!-- Total Price Section -->
              <div class="total-price-section">
                <div class="total-title-container">
                  <div class="total-title-line"></div>
                  <h4 class="total-title">Total Price</h4>
                  <div class="total-title-line"></div>
                </div>
                <div class="price-row">
                  <span>Shipping:</span>
                  <span>-</span>
                </div>
                <div class="price-row">
                  <span>Tax:</span>
                  <span>-</span>
                </div>
                <div class="price-row total-row">
                  <span>Order Total:</span>
                  <span>{{ orderTotal }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <button class="btn btn-redesign" @click="showRedesignModal = true">Redesign</button>
                <button class="btn btn-add-cart">Add to Cart</button>
                <button class="btn btn-buy-now">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Redesign Modal -->
    <div v-if="showRedesignModal" class="modal-overlay" @click.self="showRedesignModal = false">
      <div class="redesign-modal">
        <button class="modal-close" @click="showRedesignModal = false">
          <i class="bi bi-x"></i>
        </button>
        
        <h2 class="modal-title">Request Modification</h2>
        
        <div class="modal-content-wrapper">
          <p class="modal-description">Please select the furniture you want to modify and choose the specifications to change</p>
          
          <div class="furniture-list">
            <!-- Cloud Sofa -->
            <div class="furniture-item">
              <label class="furniture-label">Cloud Sof:</label>
              <div class="furniture-inputs">
                <input type="text" placeholder="*Size" class="input-field">
                <input type="text" placeholder="*Color" class="input-field">
              </div>
            </div>
            
            <!-- CloudDDDDDDDD DresserCloudDD DDDDDresser -->
            <div class="furniture-item">
              <label class="furniture-label">CloudDDDDDDDD DresserCloudDD DDDDDresser:</label>
              <div class="furniture-inputs">
                <input type="text" placeholder="*Size" class="input-field">
                <input type="text" placeholder="*Color" class="input-field">
              </div>
            </div>
            
            <!-- Iron Bed -->
            <div class="furniture-item">
              <label class="furniture-label">Iron Bed:</label>
              <div class="furniture-inputs">
                <input type="text" placeholder="*Size" class="input-field">
                <input type="text" placeholder="*Color" class="input-field">
              </div>
            </div>
            
            <!-- Nightstand -->
            <div class="furniture-item">
              <label class="furniture-label">Nightstand:</label>
              <div class="furniture-inputs">
                <input type="text" placeholder="*Size" class="input-field">
                <input type="text" placeholder="*Color" class="input-field">
              </div>
            </div>
            
            <!-- Custom input -->
            <div class="furniture-item">
              <label class="furniture-label">Custom input:</label>
              <textarea class="custom-textarea" placeholder="Enter custom requirements..."></textarea>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button class="btn-cancel" @click="showRedesignModal = false">Cancel</button>
          <button class="btn-submit">Submit Modification Request</button>
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <ReviewModal 
      :visible="showReviewModal" 
      :reviews="reviewsWithDate"
      @close="showReviewModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, getCurrentInstance, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ReviewModal from '@/components/ReviewModal.vue'
import type { I18nPlugin } from '@/plugins/i18n'
import { getProductById } from '@/data/mockData'
import type { Product } from '@/data/mockData'
import { useLockScroll } from '@/composables/useLockScroll'

const route = useRoute()
const i18n = inject<I18nPlugin>('i18n')
const instance = getCurrentInstance()
const currentLanguage = ref(i18n?.currentLocale || 'zh')
const componentKey = ref(0)

const $t = (key: string) => {
  const _ = currentLanguage.value
  return i18n?.t(key) || key
}

// 当前商品数据
const currentProduct = ref<Product | null>(null)

// Product data - 从当前商品获取或使用默认值
const productImages = computed(() => {
  return currentProduct.value?.detailImages || [
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop&q=80'
  ]
})

const selectedImage = ref('')
const quantity = ref(1)
const productTitle = computed(() => currentProduct.value?.title || 'Product Detail')
const productPrice = computed(() => currentProduct.value?.price || 0)
const productDesigner = computed(() => currentProduct.value?.designer.name || 'Designer')
const productRating = computed(() => currentProduct.value?.rating || 5.0)
const totalReviews = computed(() => currentProduct.value?.reviewCount || 0)

const thumbnailListRef = ref<HTMLElement | null>(null)
const activeTab = ref('product')
const showRedesignModal = ref(false)
const showReviewModal = ref(false)

// 锁定页面滚动（当任一弹窗打开时）
const anyModalOpen = computed(() => showRedesignModal.value || showReviewModal.value)
useLockScroll(anyModalOpen)

// Service options
const services = ref({
  designDrawings: false,
  purchaseMaterials: false,
  purchaseConstruction: false
})

// Materials list
const materials = ref([
  { id: 1, name: 'Kitchen cabinet', quantity: 1, price: 1500, selected: false },
  { id: 2, name: 'Wall cabinet', quantity: 1, price: 800, selected: false },
  { id: 3, name: 'Solid wood flooring', quantity: 1, price: 2300, selected: false },
  { id: 4, name: 'Three trees painted', quantity: 1, price: 300, selected: false },
  { id: 5, name: 'All wood coffee table', quantity: 1, price: 500, selected: false },
  { id: 6, name: 'Cloud small round stool There are many styles of text available', quantity: 10, price: 60, selected: false }
])

// Select all materials checkbox
const selectAllMaterials = ref(false)

// Toggle all materials selection
const toggleAllMaterials = () => {
  isProgrammaticUpdate = true
  materials.value.forEach(item => {
    item.selected = selectAllMaterials.value
  })
  services.value.purchaseMaterials = selectAllMaterials.value
  isProgrammaticUpdate = false
}

// 处理 Purchase materials 大类复选框点击
const onPurchaseMaterialsChange = () => {
  // 用户直接点击了大类复选框
  isProgrammaticUpdate = true
  if (services.value.purchaseMaterials) {
    // 勾选大类 -> 全选所有商品
    materials.value.forEach(item => {
      item.selected = true
    })
    selectAllMaterials.value = true
  } else {
    // 取消大类 -> 取消所有商品
    materials.value.forEach(item => {
      item.selected = false
    })
    selectAllMaterials.value = false
  }
  isProgrammaticUpdate = false
}

// 价格定义
const prices = {
  designDrawings: 399.00,
  purchaseMaterials: 5460.00,
  purchaseConstruction: 1200.00
}

// 计算材料总价
const materialsTotal = computed(() => {
  const selectedItems = materials.value.filter(item => item.selected)
  if (selectedItems.length === 0) {
    return 0
  }
  return selectedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

// 计算订单总额
const orderTotal = computed(() => {
  let total = 0
  
  if (services.value.designDrawings) {
    total += prices.designDrawings
  }
  
  if (services.value.purchaseMaterials) {
    total += materialsTotal.value
  }
  
  if (services.value.purchaseConstruction) {
    total += prices.purchaseConstruction
  }
  
  return total > 0 ? `$${total.toFixed(2)}` : '-'
})

// 标志：是否正在程序化更新（避免循环触发）
let isProgrammaticUpdate = false

// 监听材料选择变化
watch(() => materials.value.map(m => m.selected), () => {
  if (isProgrammaticUpdate) return
  
  const allSelected = materials.value.every(item => item.selected)
  const anySelected = materials.value.some(item => item.selected)
  
  selectAllMaterials.value = allSelected
  
  // 只要有任何商品被选中，就勾选大类（但不触发全选）
  isProgrammaticUpdate = true
  if (anySelected) {
    services.value.purchaseMaterials = true
  } else {
    services.value.purchaseMaterials = false
  }
  isProgrammaticUpdate = false
}, { deep: true })

// Case products data - 从当前商品获取
const caseProducts = computed(() => currentProduct.value?.caseProducts || [])

// Case reviews data - 从当前商品获取
const allReviews = computed(() => currentProduct.value?.reviews || [])

const displayedReviews = ref<any[]>([])
const hasMoreReviews = ref(true)

// Control whether to show design inspiration content - 从当前商品获取
const hasDesignInspiration = computed(() => currentProduct.value?.hasDesignInspiration || false)

const loadMoreReviews = () => {
  const currentLength = displayedReviews.value.length
  const nextBatch = allReviews.value.slice(currentLength, currentLength + 3)
  
  if (nextBatch.length > 0) {
    displayedReviews.value = [...displayedReviews.value, ...nextBatch]
  }
  
  // 如果显示的评论数量达到所有评论数量，隐藏"View more"按钮
  if (displayedReviews.value.length >= allReviews.value.length) {
    hasMoreReviews.value = false
  }
}

// 打开评论弹窗
const openReviewModal = () => {
  showReviewModal.value = true
}

// 准备评论数据（添加日期）
const reviewsWithDate = computed(() => {
  return allReviews.value.map(review => ({
    ...review,
    date: '2026-01-28 17:12:05',
    rating: 5 // 默认5星
  }))
})

// 根据路由参数获取产品信息
const loadProductData = () => {
  const productId = route.params.id
  
  // 从模拟数据中获取商品信息
  const product = getProductById(productId as string)
  
  if (product) {
    currentProduct.value = product
    // 设置第一张图片为选中图片
    selectedImage.value = productImages.value[0] || ''
    // 初始化评论显示
    displayedReviews.value = allReviews.value.slice(0, 3)
    hasMoreReviews.value = allReviews.value.length > 3
  } else {
    console.warn('Product not found:', productId)
    // 可以跳转到404页面或显示错误信息
  }
}

const increaseQty = () => {
  quantity.value++
}

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

onMounted(() => {
  loadProductData()
  
  window.addEventListener('user-web-language-changed', (event: any) => {
    currentLanguage.value = event.detail.locale
    componentKey.value++
    instance?.proxy?.$forceUpdate()
  })
})
</script>

<style scoped>
.case-detail-page {
  background: #F4F4F4;
  min-height: 100vh;
}

/* Breadcrumb Section */
.breadcrumb-section {
}

/* Breadcrumb */
.breadcrumb {
  font-size: 0.875rem;
  background: transparent;
}

.breadcrumb-item a {
  color: #6b7280;
  text-decoration: none;
}

.breadcrumb-item.active {
  color: #333;
}

/* Main Content Container */
.main-content-container {
  padding-left: clamp(16px, 5vw, 79px);
  padding-right: clamp(16px, 5vw, 79px);
}

@media (max-width: 1200px) {
  .main-content-container {
    padding-left: clamp(16px, 3vw, 40px);
    padding-right: clamp(16px, 3vw, 40px);
  }
}

@media (max-width: 768px) {
  .main-content-container {
    padding-left: clamp(12px, 2vw, 16px);
    padding-right: clamp(12px, 2vw, 16px);
  }
}

.main-content-container .row {
  display: flex;
  gap: clamp(12px, 1.5vw, 24px);
  flex-wrap: nowrap;
}

.main-content-container .row > * {
  padding: 0 !important;
}

@media (max-width: 991px) {
  .main-content-container .row {
    flex-wrap: wrap;
    gap: clamp(16px, 3vw, 24px);
  }
}

.col-left {
  flex: 1 1 auto;
  min-width: 0;
  max-width: clamp(600px, 60vw, 1097px);
}

.col-right {
  flex: 0 0 auto;
  width: clamp(400px, 35vw, 650px);
  min-width: clamp(400px, 35vw, 650px);
}

.col-right .product-info {
  position: sticky;
  top: clamp(16px, 2vw, 24px);
  align-self: flex-start;
  max-height: calc(100vh - clamp(32px, 4vw, 48px));
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.col-right .product-info::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

@media (max-width: 1400px) {
  .col-left {
    flex: 1 1 auto;
    max-width: clamp(500px, 55vw, 900px);
  }
  
  .col-right {
    width: clamp(380px, 40vw, 600px);
    min-width: clamp(380px, 40vw, 600px);
  }
}

@media (max-width: 991px) {
  .col-left,
  .col-right {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
  }
}

/* Image Gallery */
.image-gallery {
  width: 100%;
  max-width: 100%;
  margin-bottom: clamp(12px, 1.5vw, 16px);
  padding: 0;
  border-radius: clamp(4px, 0.5vw, 8px);
}

@media (max-width: 1200px) {
  .image-gallery {
    max-width: 100%;
  }
}

.gallery-layout {
  display: flex;
  gap: clamp(4px, 0.5vw, 6px);
  align-items: flex-start;
  width: 100%;
}

.thumbnail-container {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: clamp(400px, 45vw, 647px);
  width: clamp(80px, 9vw, 131px);
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 1.2vw, 16px);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: clamp(6px, 0.8vw, 11px);
}

/* 自定义滚动条样式 */
.thumbnail-list::-webkit-scrollbar {
  width: 6px;
}

.thumbnail-list::-webkit-scrollbar-track {
  background: #F3F4F6;
  border-radius: 3px;
}

.thumbnail-list::-webkit-scrollbar-thumb {
  background: #D1D5DB;
  border-radius: 3px;
}

.thumbnail-list::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

.thumbnail-item {
  width: clamp(70px, 8.5vw, 120px);
  height: clamp(47px, 5.7vw, 81px);
  border-radius: clamp(2px, 0.3vw, 4px);
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.thumbnail-item:hover,
.thumbnail-item.active {
  border-color: #00699A;
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image {
  flex: 1;
  max-width: 100%;
  height: clamp(400px, 45vw, 647px);
  border-radius: clamp(2px, 0.3vw, 4px);
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .main-image {
    width: 100%;
    height: auto;
    aspect-ratio: 960/647;
  }
  
  .thumbnail-container {
    height: auto;
  }
  
  .thumbnail-list {
    max-height: 400px;
  }
}

@media (max-width: 768px) {
  .gallery-layout {
    flex-direction: column-reverse;
  }
  
  .thumbnail-container {
    flex-direction: row;
    width: 100%;
    gap: 12px;
    height: auto;
  }
  
  .thumbnail-nav-btn {
    width: 40px;
    height: 54px;
  }
  
  .thumbnail-list {
    flex-direction: row;
    width: 100%;
    max-height: none;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 12px;
    flex: 1;
  }
  
  .thumbnail-item {
    width: 80px;
    height: 54px;
  }
  
  .main-image {
    width: 100%;
    height: auto;
    aspect-ratio: 960/647;
  }

  .tab-buttons {
    overflow-x: auto;
    padding: 0 0.5rem;
  }

  .tab-btn {
    padding: 0;
    font-size: 14px;
    white-space: nowrap;
  }

  .tab-btn::after {
    width: 35px;
    height: 3px;
  }

  .product-grid-2col {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .product-card-name {
    font-size: 1.125rem;
  }
}

/* Product Info */
.product-info {
  padding: clamp(16px, 2vw, 24px);
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
  max-width: 100%;
  width: 100%;
}

@media (max-width: 1200px) {
  .product-info {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .product-info {
    padding: clamp(12px, 2vw, 16px);
  }
}

.product-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(24px, 3vw, 36px) !important;
  font-weight: 700 !important;
  line-height: clamp(28px, 3.5vw, 40px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin-bottom: clamp(12px, 1.5vw, 16px) !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .product-title {
    font-size: clamp(20px, 5vw, 28px) !important;
    line-height: clamp(24px, 6vw, 32px) !important;
  }
}

.rating-section {
  display: flex;
  align-items: center;
  gap: clamp(10px, 1.2vw, 12px);
  margin-bottom: clamp(12px, 1.5vw, 16px);
}

.stars {
  color: #FFA500;
  display: flex;
  gap: clamp(6px, 0.8vw, 8px);
  align-items: center;
}

.stars i {
  font-size: clamp(18px, 2vw, 24px);
  width: clamp(18px, 2vw, 24px);
  height: clamp(18px, 2vw, 24px);
  line-height: clamp(18px, 2vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.rating-score {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(14px, 1.4vw, 16px) !important;
  font-weight: 400 !important;
  line-height: clamp(18px, 1.8vw, 20px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  vertical-align: middle;
}

.view-reviews-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 20px);
  color: #00689A;
  text-decoration: none;
  margin-left: auto;
  vertical-align: middle;
}

.view-reviews-link:hover {
  text-decoration: underline;
}

.price-designer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}

.current-price {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 700;
  line-height: clamp(32px, 3.5vw, 40px);
  color: #333333;
  vertical-align: middle;
}

.price-number {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(20px, 2.2vw, 24px);
  font-weight: 700;
  line-height: clamp(24px, 2.6vw, 28px);
  color: #333333;
  vertical-align: middle;
}

.designer-info {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 20px);
  color: #333333;
  text-align: right;
  vertical-align: middle;
}

.service-title-container {
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 16px);
  margin: clamp(16px, 2vw, 24px) 0 clamp(12px, 1.5vw, 16px) 0;
}

.service-title-line {
  flex: 1;
  height: 1px;
  background: #E5E6EB;
  border: none;
}

.service-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
}

.service-option {
  margin-top: clamp(16px, 2vw, 24px);
  margin-bottom: 0;
  border-bottom: none;
  padding-bottom: clamp(6px, 0.8vw, 8px);
  padding-top: 0;
}

.service-option:first-of-type {
  padding-top: 0;
  margin-top: clamp(16px, 2vw, 24px);
}

.service-option:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.option-checkbox {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.8vw, 8px);
  cursor: pointer;
  margin: 0;
}

.option-checkbox input[type="checkbox"] {
  width: clamp(16px, 1.8vw, 20px);
  height: clamp(16px, 1.8vw, 20px);
  cursor: pointer;
  flex-shrink: 0;
  border: none !important;
  outline: none !important;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  position: relative;
}

.option-checkbox input[type="checkbox"]::before {
  content: '';
  display: block;
  width: clamp(16px, 1.8vw, 20px);
  height: clamp(16px, 1.8vw, 20px);
  border: 1px solid #D1D5DB;
  border-radius: clamp(1.5px, 0.2vw, 2px);
  background-color: #fff;
}

.option-checkbox input[type="checkbox"]:checked::before {
  background-color: #00699A;
  border-color: #00699A;
}

.option-checkbox input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: bold;
}

.option-checkbox span {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 20px);
  color: rgba(0, 0, 0, 0.9);
}

.option-price {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.8vw, 20px);
  color: rgba(0, 0, 0, 0.9);
}

.option-details {
  margin-top: 0;
  padding-left: 26px;
  background: transparent;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 0;
  animation: slideDown 0.3s ease-out;
  overflow: hidden;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: 1000px;
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.delivery-date {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
  color: #8B2C00;
  margin-bottom: clamp(6px, 0.8vw, 8px);
  vertical-align: middle;
}

.materials-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-bottom: 0;
  background: #FFFFFF;
  border-radius: clamp(3px, 0.4vw, 4px);
  border: 1px solid #E5E6EB;
  border-top: none;
}

.materials-table thead th {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 500;
  line-height: clamp(18px, 1.8vw, 22px);
  color: #1D2129;
  text-align: left;
  padding: clamp(10px, 1.2vw, 12px) clamp(12px, 1.5vw, 16px);
  background: #F9FAFB;
  border-bottom: 1px solid #E5E6EB;
}

.materials-table thead th:first-child {
  width: clamp(45px, 5vw, 50px);
  text-align: center;
  padding-left: clamp(12px, 1.5vw, 16px);
  border-top-left-radius: 0;
}

.materials-table thead th:first-child input[type="checkbox"] {
  width: clamp(14px, 1.5vw, 16px);
  height: clamp(14px, 1.5vw, 16px);
  cursor: pointer;
  margin: 0;
  border: none !important;
  outline: none !important;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  position: relative;
}

.materials-table thead th:first-child input[type="checkbox"]::before {
  content: '';
  display: block;
  width: clamp(14px, 1.5vw, 16px);
  height: clamp(14px, 1.5vw, 16px);
  border: 1px solid #D1D5DB;
  border-radius: clamp(1.5px, 0.2vw, 2px);
  background-color: #fff;
}

.materials-table thead th:first-child input[type="checkbox"]:checked::before {
  background-color: #00699A;
  border-color: #00699A;
}

.materials-table thead th:first-child input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: clamp(10px, 1vw, 12px);
  font-weight: bold;
}

.materials-table thead th:last-child {
  border-top-right-radius: 0;
}

.materials-table thead th:nth-child(2) {
  text-align: left;
}

.materials-table thead th:nth-child(3),
.materials-table thead th:nth-child(4) {
  text-align: center;
  width: clamp(100px, 12vw, 120px);
}

.materials-table tbody td {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 22px);
  color: #1D2129;
  padding: clamp(10px, 1.2vw, 12px) clamp(12px, 1.5vw, 16px);
  border-bottom: 1px solid #F3F4F6;
  vertical-align: middle;
  background: #FFFFFF;
}

.materials-table tbody tr:last-child td {
  border-bottom: none;
}

.materials-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: clamp(3px, 0.4vw, 4px);
}

.materials-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: clamp(3px, 0.4vw, 4px);
}

.materials-table tbody td:first-child {
  width: clamp(45px, 5vw, 50px);
  text-align: center;
  padding-left: clamp(12px, 1.5vw, 16px);
}

.materials-table tbody td:nth-child(2) {
  text-align: left;
}

.materials-table tbody td:nth-child(3),
.materials-table tbody td:nth-child(4) {
  text-align: center;
}

.materials-table tbody td input[type="checkbox"] {
  width: clamp(14px, 1.5vw, 16px);
  height: clamp(14px, 1.5vw, 16px);
  cursor: pointer;
  margin: 0;
  border: none !important;
  outline: none !important;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  position: relative;
}

.materials-table tbody td input[type="checkbox"]::before {
  content: '';
  display: block;
  width: clamp(14px, 1.5vw, 16px);
  height: clamp(14px, 1.5vw, 16px);
  border: 1px solid #D1D5DB;
  border-radius: clamp(1.5px, 0.2vw, 2px);
  background-color: #fff;
}

.materials-table tbody td input[type="checkbox"]:checked::before {
  background-color: #00699A;
  border-color: #00699A;
}

.materials-table tbody td input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: clamp(10px, 1vw, 12px);
  font-weight: bold;
}

/* 空数据占位符样式 */
.materials-table .empty-data {
  text-align: center;
  padding: clamp(32px, 4vw, 40px) clamp(16px, 2vw, 20px);
}

.materials-table .empty-icon {
  display: flex;
  justify-content: center;
  margin-bottom: clamp(10px, 1.2vw, 12px);
}

.materials-table .empty-icon svg {
  width: clamp(56px, 6vw, 64px);
  height: clamp(56px, 6vw, 64px);
}

.materials-table .empty-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 20px);
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  text-align: center;
}

.date-picker {
  position: relative;
  margin-top: clamp(6px, 0.8vw, 8px);
}

.date-picker i {
  position: absolute;
  right: clamp(10px, 1.2vw, 12px);
  top: 50%;
  transform: translateY(-50%);
  color: #5C5C5C;
  font-size: clamp(14px, 1.4vw, 16px);
  pointer-events: none;
}

.date-picker input {
  width: 100%;
  padding: clamp(10px, 1.2vw, 12px);
  border: 1px solid #E5E7EB;
  border-radius: clamp(3px, 0.4vw, 4px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
  color: #5C5C5C;
  background: #FFFFFF;
}

.date-picker input::placeholder {
  color: #5C5C5C;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
}

.total-price-section {
  padding-top: clamp(6px, 0.8vw, 8px);
  border-top: none;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  gap: clamp(6px, 0.8vw, 8px);
}

.total-title-container {
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 16px);
  margin-bottom: 0;
  width: 100%;
}

.total-title-line {
  flex: 1;
  height: 1px;
  background: #E5E6EB;
  border: none;
}

.total-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 20px);
  color: rgba(0, 0, 0, 0.9);
  gap: clamp(6px, 0.8vw, 8px);
  text-align: right;
}

.price-row:first-of-type {
  margin-top: 0;
  margin-bottom: 0;
}

.price-row.total-row {
  border-top: none;
  padding: 0;
  margin-top: 0;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.price-row.total-row span:last-child {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.8vw, 20px);
  color: rgba(0, 0, 0, 0.9);
}

.action-buttons {
  display: flex;
  gap: clamp(10px, 1.2vw, 12px);
  margin-top: 0;
}

.btn-redesign {
  flex: 1;
  background: #E5E7EB;
  border: none;
  color: #333333;
  padding: clamp(10px, 1.2vw, 12px);
  border-radius: clamp(3px, 0.4vw, 4px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 400;
  line-height: clamp(22px, 2.4vw, 28px);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.btn-redesign:hover {
  background: #D1D5DB;
}

.btn-add-cart {
  flex: 0 0 clamp(220px, 24vw, 275px);
  width: clamp(220px, 24vw, 275px);
  background: #00699A;
  border: none;
  color: #FFFFFF;
  padding: clamp(10px, 1.2vw, 12px);
  border-radius: clamp(3px, 0.4vw, 4px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 400;
  line-height: clamp(22px, 2.4vw, 28px);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.btn-add-cart:hover {
  background: #005580;
}

.btn-buy-now {
  flex: 1;
  background: white;
  border: 2px solid #00699A;
  color: #00699A;
  padding: clamp(10px, 1.2vw, 12px);
  border-radius: clamp(3px, 0.4vw, 4px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 400;
  line-height: clamp(22px, 2.4vw, 28px);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

.btn-buy-now:hover {
  background: #00699A;
  color: white;
}

@media (max-width: 768px) {
  .action-buttons {
    flex-direction: column;
  }
  
  .btn-redesign,
  .btn-add-cart,
  .btn-buy-now {
    flex: 1 1 auto;
    width: 100%;
  }
}

/* Related Products */
.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}

.product-card h5 {
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
}

.product-card .price {
  padding: 0 1rem 1rem;
  color: #00699A;
  font-weight: 600;
  font-size: 1.25rem;
}

/* Design Inspiration */
.design-inspiration p {
  color: #6b7280;
  line-height: 1.6;
}

/* Case Reviews */
.review-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.review-text {
  color: #6b7280;
  margin-bottom: 1rem;
}

.review-images {
  display: flex;
  gap: 0.5rem;
}

.review-images img {
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.375rem;
}

/* Case Tabs */
.case-tabs {
  width: 100%;
  max-width: 1097px;
  background: #FFFFFF;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .case-tabs {
    max-width: 100%;
  }
}

.tab-buttons {
  display: flex;
  gap: 32px;
  background: #FFFFFF;
  padding: 0 16px;
  height: 44px;
  align-items: flex-end;
}

.tab-btn {
  padding: 0;
  padding-bottom: 12px;
  height: auto;
  background: transparent;
  border: none;
  color: #333333;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 4px;
  background: transparent;
  transition: background 0.2s;
}

.tab-btn:hover {
  color: #00699A;
}

.tab-btn.active {
  color: #00699A;
}

.tab-btn.active::after {
  background: #00699A;
}

.tab-content {
  width: 100%;
  padding: 0;
  background: #F4F4F4;
}

.kiro-tab-pane {
  animation: fadeIn 0.3s;
  background: #F4F4F4;
  padding-top: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: #FFFFFF;
  border-radius: 4px;
}

.empty-icon {
  margin-bottom: 16px;
}

.empty-icon svg {
  display: block;
}

.empty-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #9CA3AF;
  margin: 0;
}

/* Product Grid 2 Columns */
.product-grid-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 0;
  width: 100%;
}

@media (max-width: 768px) {
  .product-grid-2col {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0;
    padding-top: 1rem;
  }
}

.product-card-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #FFFFFF;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 540px;
}

@media (max-width: 1200px) {
  .product-card-detail {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .product-card-detail {
    padding: 1.5rem;
    gap: 1rem;
  }
}

.product-card-image {
  width: 100% !important;
  max-width: 476px !important;
  height: 190.4px !important;
  border-radius: 4px !important;
  overflow: hidden !important;
  background: #f3f4f6 !important;
}

.product-card-image img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

@media (max-width: 1200px) {
  .product-card-image {
    max-width: 100% !important;
    height: auto !important;
    aspect-ratio: 476 / 190.4 !important;
  }
}

@media (max-width: 768px) {
  .product-card-image {
    aspect-ratio: 16 / 9 !important;
  }
}

.product-card-info {
  display: flex;
  flex-direction: column;
  gap: 8px !important;
  width: 100%;
  max-width: 476px;
}

@media (max-width: 1200px) {
  .product-card-info {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .product-card-info {
    gap: 8px !important;
  }
}

.product-card-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #333333 !important;
  margin: 0 !important;
  line-height: 28px !important;
  letter-spacing: 0 !important;
}

@media (max-width: 768px) {
  .product-card-name {
    font-size: 20px !important;
    line-height: 24px !important;
  }
}

.product-card-row {
  display: flex;
  gap: 0.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  align-items: baseline;
}

.product-card-row .label {
  color: #9C9C9C !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  flex-shrink: 0;
}

.product-card-row .value {
  color: #333333 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  flex: 1;
}

.product-card-row .value.price {
  color: #8B2C00 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  line-height: 20px !important;
  letter-spacing: 0 !important;
}

.product-card-desc {
  color: #333333 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  margin: 0 !important;
  margin-top: 0 !important;
  padding: 0 !important;
  font-weight: 400 !important;
}

/* Inspiration Content */
.inspiration-content {
  padding: 32px;
  background: #FFFFFF;
  max-width: 1097px;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .inspiration-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .inspiration-content {
    padding: 16px;
  }
}

.inspiration-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 28px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 16px 0 !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .inspiration-title {
    font-size: 20px !important;
    line-height: 24px !important;
  }
}

.inspiration-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 16px 0 !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .inspiration-intro {
    margin: 0 0 16px 0 !important;
  }
}

.inspiration-detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
}

.detail-row .detail-label {
  color: #9C9C9C !important;
  flex-shrink: 0;
  margin-right: 4px;
}

.detail-row .detail-text {
  color: #333333 !important;
  flex: 1;
}

/* Review List */
.review-content {
  padding: 32px;
  background: #FFFFFF;
  max-width: 1097px;
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .review-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .review-content {
    padding: 16px;
  }
}

.review-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  line-height: 28px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 16px 0 !important;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .review-title {
    font-size: 20px !important;
    line-height: 24px !important;
    margin: 0 0 16px 0 !important;
  }
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-item {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  border-bottom: none !important;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-avatar {
  width: 24px !important;
  height: 24px !important;
  border-radius: 62.5px !important;
  padding: 10px !important;
  flex-shrink: 0;
  background: #F3F4F6;
}

.review-username {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 20px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
}

.review-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 !important;
  vertical-align: middle;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.review-images img {
  width: 80px !important;
  height: 80px !important;
  object-fit: cover;
  border-radius: 4px !important;
  cursor: pointer;
  transition: transform 0.2s;
}

.review-images img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .review-images img {
    width: 70px !important;
    height: 70px !important;
  }
}

.view-more-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 16px;
}

@media (max-width: 768px) {
  .view-more-container {
    margin-top: 16px;
  }
}

.view-more-line {
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.view-more-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 18px !important;
  letter-spacing: 0 !important;
  color: #00699A !important;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  vertical-align: middle;
}

.view-more-btn:hover {
  color: #005580 !important;
  text-decoration: underline;
}

/* Redesign Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.redesign-modal {
  position: relative;
  width: clamp(320px, 90vw, 1000px);
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
  padding: clamp(20px, 3vw, 32px);
  display: flex;
  flex-direction: column;
  gap: 0;
}

@media (max-width: 768px) {
  .redesign-modal {
    width: 95vw;
    max-height: 95vh;
    padding: clamp(16px, 4vw, 20px);
    gap: 0;
  }
}

.modal-close {
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
}

.modal-close:hover {
  color: #111827;
}

.modal-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
  color: #1D2129;
  margin: 0 0 clamp(16px, 2.5vw, 24px) 0;
  text-align: center;
  vertical-align: middle;
}

@media (max-width: 768px) {
  .modal-title {
    font-size: clamp(16px, 5vw, 20px);
    margin: 0 0 clamp(12px, 4vw, 20px) 0;
  }
}

.modal-description {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;
  color: #1D2129;
  margin: 0;
  text-align: left;
}

@media (max-width: 768px) {
  .modal-description {
    font-size: clamp(12px, 3.5vw, 13px);
    margin: 0;
  }
}

.modal-content-wrapper {
  background: #F6F6F6;
  padding: clamp(12px, 2vw, 16px);
  border-radius: clamp(4px, 0.5vw, 6px);
  margin-bottom: clamp(16px, 2.5vw, 24px);
}

@media (max-width: 768px) {
  .modal-content-wrapper {
    padding: clamp(12px, 4vw, 16px);
    margin-bottom: clamp(16px, 5vw, 20px);
  }
}

.furniture-list {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 2vw, 16px);
  margin-top: clamp(12px, 2vw, 16px);
}

@media (max-width: 768px) {
  .furniture-list {
    gap: clamp(12px, 4vw, 16px);
    margin-top: clamp(12px, 4vw, 16px);
  }
}

.furniture-item {
  display: grid;
  grid-template-columns: minmax(100px, 15%) 1fr;
  gap: clamp(12px, 2vw, 16px);
  align-items: center;
}

@media (max-width: 992px) {
  .furniture-item {
    grid-template-columns: minmax(80px, 20%) 1fr;
    gap: clamp(8px, 2vw, 12px);
  }
}

@media (max-width: 768px) {
  .furniture-item {
    grid-template-columns: 1fr;
    gap: clamp(8px, 3vw, 12px);
    align-items: start;
  }
}

.furniture-label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 400;
  line-height: 1.4;
  color: #6B7280;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  align-self: center;
  max-width: 100%;
}

@media (max-width: 768px) {
  .furniture-label {
    align-self: start;
    font-size: clamp(12px, 3.5vw, 14px);
  }
}

.furniture-inputs {
  display: flex;
  gap: clamp(8px, 1.5vw, 12px);
  flex: 1;
  max-width: 100%;
  min-width: 0;
}

@media (max-width: 992px) {
  .furniture-inputs {
    flex-direction: column;
    gap: clamp(8px, 2vw, 12px);
  }
}

@media (max-width: 768px) {
  .furniture-inputs {
    flex-direction: column;
    gap: clamp(8px, 3vw, 12px);
    width: 100%;
  }
}

.input-field {
  flex: 1;
  min-width: 0;
  width: 100%;
  height: clamp(36px, 5vw, 40px);
  padding: clamp(8px, 1.2vw, 10px) clamp(10px, 1.5vw, 12px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 400;
  line-height: 1.4;
  color: #111827;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: clamp(3px, 0.5vw, 4px);
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: #9CA3AF;
}

.input-field:focus {
  background: #FFFFFF;
  border-color: #00699A;
}

@media (max-width: 768px) {
  .input-field {
    width: 100%;
    height: clamp(36px, 10vw, 40px);
    font-size: clamp(13px, 3.5vw, 14px);
  }
}

.custom-textarea {
  width: 100%;
  min-height: clamp(100px, 15vh, 120px);
  padding: clamp(8px, 1.2vw, 10px) clamp(10px, 1.5vw, 12px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 400;
  line-height: 1.6;
  color: #111827;
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: clamp(3px, 0.5vw, 4px);
  outline: none;
  resize: vertical;
  transition: all 0.2s;
  box-sizing: border-box;
}

.custom-textarea::placeholder {
  color: #9CA3AF;
}

.custom-textarea:focus {
  background: #FFFFFF;
  border-color: #00699A;
}

@media (max-width: 768px) {
  .custom-textarea {
    min-height: clamp(80px, 20vh, 100px);
    font-size: clamp(13px, 3.5vw, 14px);
  }
}

.modal-actions {
  display: flex;
  gap: clamp(12px, 2vw, 16px);
  justify-content: flex-end;
  margin-top: 0;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .modal-actions {
    flex-direction: column-reverse;
    gap: clamp(10px, 3vw, 12px);
  }
}

.btn-cancel {
  padding: clamp(8px, 1.2vw, 10px) clamp(20px, 2.5vw, 24px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  line-height: 1.4;
  color: #374151;
  background: #FFFFFF;
  border: 1px solid #D1D5DB;
  border-radius: clamp(3px, 0.5vw, 4px);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-cancel:hover {
  background: #F9FAFB;
  border-color: #9CA3AF;
}

@media (max-width: 768px) {
  .btn-cancel {
    width: 100%;
    padding: clamp(10px, 3vw, 12px) clamp(20px, 6vw, 24px);
    font-size: clamp(13px, 3.5vw, 14px);
  }
}

.btn-submit {
  padding: clamp(8px, 1.2vw, 10px) clamp(20px, 2.5vw, 24px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  line-height: 1.4;
  color: #FFFFFF;
  background: #111827;
  border: 1px solid #111827;
  border-radius: clamp(3px, 0.5vw, 4px);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-submit:hover {
  background: #1F2937;
  border-color: #1F2937;
}

@media (max-width: 768px) {
  .btn-submit {
    width: 100%;
    padding: clamp(10px, 3vw, 12px) clamp(20px, 6vw, 24px);
    font-size: clamp(13px, 3.5vw, 14px);
  }
}
</style>
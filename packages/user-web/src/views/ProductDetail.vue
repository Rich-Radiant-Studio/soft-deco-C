<template>
  <div class="product-detail-page">
    <!-- Header -->
    <Header />

    <!-- Breadcrumb -->
    <div class="breadcrumb-section">
      <div class="container-fluid px-4 py-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item"><router-link to="/">{{ $t('nav.home') }}</router-link></li>
            <li class="breadcrumb-item"><router-link to="/shop">{{ $t('nav.shop') }}</router-link></li>
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
                  <div class="thumbnail-list">
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

            <!-- Product Description -->
            <div class="product-description-section">
              <h3 class="inspiration-title">Product Description</h3>
              <p class="inspiration-intro">Experience luxurious comfort with our signature Cloud Sofa. This sofa uniquely blends modern aesthetics with exceptional comfort.</p>
              
              <div class="inspiration-detail">
                <div class="detail-row">
                  <span class="detail-label">Material:</span>
                  <span class="detail-text">High-density memory foam that adapts to your body while maintaining its shape</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Fabric:</span>
                  <span class="detail-text">Soft, breathable fabric ensures year-round comfort</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Frame:</span>
                  <span class="detail-text">Sturdy wooden frame guarantees long-lasting quality</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Design:</span>
                  <span class="detail-text">Modern aesthetics with exceptional comfort and ergonomic support</span>
                </div>
              </div>
            </div>

            <!-- Product Reviews -->
            <div class="product-reviews-section">
              <div class="review-content">
                <h3 class="review-title">Product Reviews ({{ totalReviews }}+)</h3>
                
                <div class="review-list" v-if="displayedReviews.length > 0">
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
                  <button class="view-more-btn" @click="showReviewModal = true">All Reviews</button>
                  <div class="view-more-line"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Product Info -->
          <div class="col-right">
            <div class="product-info">
              <h1 class="product-title">{{ productTitle }}</h1>
              <p class="product-subtitle">{{ productSubtitle }}</p>

              <!-- Price -->
              <div class="price-section">
                <span class="current-price">
                  <span class="currency-symbol">{{ currency === 'USD' ? '$' : currency }}</span><span class="price-number">{{ productPrice }}</span>
                </span>
                <span class="free-shipping">Free Shipping</span>
              </div>

              <!-- Color Selection -->
              <div class="option-group">
                <label class="option-label">Select Color:</label>
                <div class="color-options">
                  <button 
                    v-for="color in colors" 
                    :key="color.name"
                    class="color-btn"
                    :class="{ active: selectedColor === color.name }"
                    :style="{ backgroundColor: color.value }"
                    @click="selectedColor = color.name"
                    :title="color.name"
                  ></button>
                </div>
              </div>

              <!-- Fabric Selection -->
              <div class="option-group">
                <label class="option-label">Select Fabric:</label>
                <div class="fabric-options">
                  <button 
                    v-for="fabric in fabrics" 
                    :key="fabric"
                    class="fabric-btn"
                    :class="{ active: selectedFabric === fabric }"
                    @click="selectedFabric = fabric"
                  >
                    {{ fabric }}
                  </button>
                </div>
              </div>

              <!-- Size Selection -->
              <div class="option-group">
                <label class="option-label">Select Size:</label>
                <div class="size-options">
                  <button 
                    v-for="size in sizes" 
                    :key="size"
                    class="size-btn"
                    :class="{ active: selectedSize === size }"
                    @click="selectedSize = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- Total Price -->
              <div class="total-price-section">
                <div class="total-title-container">
                  <div class="total-title-line"></div>
                  <h4 class="total-title">Total Price</h4>
                  <div class="total-title-line"></div>
                </div>
                <div class="price-details">
                  <div class="price-row">
                    <span class="label">Shipping:</span>
                    <span class="value">{{ currency === 'USD' ? '$' : currency }}{{ shippingFee }}</span>
                  </div>
                  <div class="price-row">
                    <span class="label">Tax:</span>
                    <span class="value">{{ currency === 'USD' ? '$' : currency }}{{ taxValue }}</span>
                  </div>
                  <div class="price-row">
                    <span class="label">Order Total:</span>
                    <span class="value">{{ currency === 'USD' ? '$' : currency }}{{ orderTotalValue }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="action-buttons">
                <button class="btn btn-add-cart" :disabled="!selectedSkuId" @click="addToCart">Add to Cart</button>
                <button class="btn btn-buy-now" :disabled="!selectedSkuId" @click="buyNow">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <FloatingActionButtons />

    <!-- Footer -->
    <Footer />

    <!-- Review Modal -->
    <ReviewModal 
      :visible="showReviewModal" 
      :reviews="reviewsWithDate"
      title="商品评价"
      @close="showReviewModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import FloatingActionButtons from '@/components/FloatingActionButtons.vue'
import ReviewModal from '@/components/ReviewModal.vue'
import { useLockScroll } from '@/composables/useLockScroll'

const route = useRoute()

// Product data
const productTitle = ref('全木茶几')
const productSubtitle = ref('Modern sofa design with memory foam')
const productPrice = ref(1405)
const productDescription = ref('Experience luxurious comfort with our signature Cloud Sofa. This sofa uniquely blends modern aesthetics with exceptional comfort, featuring high-density memory foam that adapts to your body while maintaining its shape. The soft, breathable fabric ensures year-round comfort, while the sturdy wooden frame guarantees long-lasting quality.')

const productImages = ref([
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop&q=80'
])

const selectedImage = ref(productImages.value[0])
const loading = ref(true)
const loadError = ref('')
const selectedSkuId = ref<string | number | undefined>()
const currency = ref('USD')

const apiFetch = async (path: string) => {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
  const token = localStorage.getItem('token')
  const response = await fetch(`${baseUrl}${path}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  const result = await response.json()
  if (result.code !== 200 && result.code !== 0) throw new Error(result.msg || 'Request failed')
  return result.data
}
const apiFetchPost = async (path: string, body: unknown) => {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
  const token = localStorage.getItem('token')
  const response = await fetch(`${baseUrl}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  const result = await response.json()
  if (result.code !== 200 && result.code !== 0) throw new Error(result.msg || 'Request failed')
  return result.data
}

async function loadProduct() {
  const goodsId = String(route.params.id || '')
  if (!goodsId) { loadError.value = 'Missing product ID'; loading.value = false; return }
  try {
    const [detail, quote] = await Promise.all([apiFetch(`/app/goods/${encodeURIComponent(goodsId)}`), apiFetch(`/app/goods/${encodeURIComponent(goodsId)}/quote`)])
    productTitle.value = detail.name || productTitle.value
    productSubtitle.value = detail.subtitle || ''
    productDescription.value = detail.description || ''
    currency.value = detail.currency || quote?.currency || 'USD'
    productPrice.value = Number(quote?.salePrice || 0)
    const images = detail.images?.length ? detail.images : productImages.value
    productImages.value = images
    selectedImage.value = images[0]
    selectedSkuId.value = detail.defaultSkuId
    colors.value = detail.groups?.find((group: any) => group.code === 'color')?.values?.map((name: string) => ({ name, value: name })) || colors.value
    fabrics.value = detail.groups?.find((group: any) => group.code === 'material')?.values || fabrics.value
    sizes.value = detail.groups?.find((group: any) => group.code === 'size')?.values || sizes.value
    if (quote) { shippingFee.value = quote.shippingFee || '0'; taxValue.value = quote.tax || '0'; orderTotalValue.value = quote.total || quote.salePrice || '0' }
  } catch (error: any) { loadError.value = error?.message || 'Unable to load product' } finally { loading.value = false }
}

// Color options
const colors = ref([
  { name: 'White', value: '#FFFFFF' },
  { name: 'Gray', value: '#9CA3AF' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Black', value: '#000000' }
])
const selectedColor = ref('White')
const shippingFee = ref('0')
const taxValue = ref('0')
const orderTotalValue = ref('0')

// Fabric options
const fabrics = ref(['Leather', 'Tech Fabric', 'Cotton Linen'])
const selectedFabric = ref('Leather')

// Size options
const sizes = ref(['1-Seater', '2-Seater', '3-Seater'])
const selectedSize = ref('1-Seater')

// Reviews - 所有评论数据
const allReviews = ref([
  {
    id: 1,
    username: 'Username',
    avatar: 'https://i.pravatar.cc/150?img=1',
    text: 'I recently purchased bedroom furniture and I\'m very satisfied! The gray metal frame is both stylish and has a soft touch. The craftsmanship of the headboard is very elegant, and the black bracket is super sturdy. The assembly is very simple, the husband and I took about 45 minutes. The only minor drawback is that the bed board is a bit thinner than I expected, but at this price point, it\'s definitely the most cost-effective choice I\'ve found. I have already recommended it to my friends!',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=150&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200&h=150&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop&q=80'
    ]
  },
  {
    id: 2,
    username: 'Username',
    avatar: 'https://i.pravatar.cc/150?img=2',
    text: 'The furniture quality is excellent and the design is beautiful. Highly recommended!',
    images: []
  },
  // 生成更多模拟评论数据以达到1000条
  ...Array.from({ length: 998 }, (_, i) => ({
    id: i + 3,
    username: 'Username',
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    text: 'Great product! Very satisfied with the quality and design.',
    images: []
  }))
])

// 实际评论总数
const totalReviews = computed(() => allReviews.value.length)

// 显示的评论（前10条）
const displayedReviews = computed(() => allReviews.value.slice(0, 10))

// 是否显示"All Reviews"按钮（评论数量>10时显示）
const hasMoreReviews = computed(() => allReviews.value.length > 10)

const showReviewModal = ref(false)

// Lock scroll when modal is open
useLockScroll(showReviewModal)

// Reviews with date for modal
const reviewsWithDate = computed(() => {
  return allReviews.value.map(review => ({
    ...review,
    date: '2026-01-28 17:12:05',
    rating: 5
  }))
})

// Price calculations
const taxAmount = computed(() => (productPrice.value * 0.08).toFixed(2))
const orderTotal = computed(() => (productPrice.value + parseFloat(taxAmount.value)).toFixed(2))

const $t = (key: string) => key

async function loadReviews() {
  const goodsId = String(route.params.id || '')
  if (!goodsId) return
  try {
    const data = await apiFetch(`/app/goods/${encodeURIComponent(goodsId)}/reviews?filter=all&page=1&pageSize=10`)
    allReviews.value = (data?.list || []).map((review: any) => ({ id: review.reviewId, username: review.displayName || 'Anonymous', avatar: review.avatarUrl || 'https://i.pravatar.cc/150?img=1', text: review.content || '', images: review.images || [] }))
  } catch { /* keep empty fallback when reviews are unavailable */ }
}
async function addToCart() {
  try { await apiFetchPost('/app/cart/items', { skuId: selectedSkuId.value, quantity: 1 }); alert('Added to cart') } catch (error: any) { alert(error?.message || 'Unable to add to cart') }
}
async function buyNow() {
  try { await apiFetchPost('/app/checkout/drafts', { skuId: selectedSkuId.value, quantity: 1 }); alert('Checkout draft created') } catch (error: any) { alert(error?.message || 'Unable to start checkout') }
}

onMounted(() => { loadProduct(); loadReviews() })
</script>

<style scoped>
.product-detail-page {
  background: #F4F4F4;
  min-height: 100vh;
}

/* Breadcrumb */
.breadcrumb-section {
  background: #F4F4F4;
}

.breadcrumb {
  font-size: clamp(12px, 1.2vw, 14px);
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.col-right .product-info::-webkit-scrollbar {
  display: none;
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
  margin-bottom: clamp(16px, 2vw, 24px);
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
  padding: clamp(12px, 1.5vw, 16px);
}

.gallery-layout {
  display: flex;
  gap: clamp(8px, 1vw, 12px);
  align-items: flex-start;
}

.thumbnail-container {
  flex: 0 0 auto;
  width: clamp(60px, 7vw, 80px);
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.8vw, 8px);
}

.thumbnail-item {
  width: 100%;
  aspect-ratio: 1;
  border: 2px solid transparent;
  border-radius: clamp(3px, 0.4vw, 4px);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.thumbnail-item:hover {
  border-color: #00699A;
}

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
  border-radius: clamp(4px, 0.5vw, 8px);
  overflow: hidden;
  background: #F7F7F7;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Product Description Section */
.product-description-section {
  padding: clamp(16px, 2vw, 32px);
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
  margin-bottom: clamp(16px, 2vw, 24px);
}

.inspiration-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(20px, 2vw, 24px) !important;
  font-weight: 700 !important;
  line-height: clamp(24px, 2.3vw, 28px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 clamp(12px, 1.3vw, 16px) 0 !important;
  vertical-align: middle;
}

.inspiration-intro {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(13px, 1.2vw, 14px) !important;
  font-weight: 400 !important;
  line-height: clamp(17px, 1.5vw, 18px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 clamp(12px, 1.3vw, 16px) 0 !important;
  vertical-align: middle;
}

.inspiration-detail {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.7vw, 8px);
}

.detail-row {
  display: flex;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(13px, 1.2vw, 14px) !important;
  font-weight: 400 !important;
  line-height: clamp(17px, 1.5vw, 18px) !important;
  letter-spacing: 0 !important;
}

.detail-row .detail-label {
  color: #9C9C9C !important;
  flex-shrink: 0;
  margin-right: clamp(3px, 0.35vw, 4px);
}

.detail-row .detail-text {
  color: #333333 !important;
  flex: 1;
}

.product-reviews-section {
  background: transparent;
  border-radius: 0;
  padding: 0;
  margin-bottom: clamp(16px, 2vw, 24px);
}

.review-content {
  padding: clamp(16px, 2.5vw, 32px);
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
}

.review-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(20px, 2vw, 24px) !important;
  font-weight: 700 !important;
  line-height: clamp(24px, 2.3vw, 28px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 0 clamp(12px, 1.3vw, 16px) 0 !important;
  vertical-align: middle;
}

/* Reviews */
.section-title {
  font-size: clamp(16px, 1.8vw, 20px);
  font-weight: 700;
  color: #333333;
  margin-bottom: clamp(12px, 1.5vw, 16px);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 2vw, 24px);
}

.review-item {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1vw, 12px);
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  border-bottom: none !important;
}

.review-header {
  display: flex;
  align-items: center;
  gap: clamp(10px, 1vw, 12px);
}

.review-avatar {
  width: clamp(20px, 2vw, 24px) !important;
  height: clamp(20px, 2vw, 24px) !important;
  border-radius: 62.5px !important;
  padding: clamp(8px, 0.8vw, 10px) !important;
  flex-shrink: 0;
  background: #F3F4F6;
  object-fit: cover;
}

.review-username {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(14px, 1.4vw, 16px) !important;
  font-weight: 400 !important;
  line-height: clamp(18px, 1.7vw, 20px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
}

.review-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(13px, 1.2vw, 14px) !important;
  font-weight: 400 !important;
  line-height: clamp(17px, 1.5vw, 18px) !important;
  letter-spacing: 0 !important;
  color: #333333 !important;
  margin: 0 !important;
  vertical-align: middle;
}

.review-images {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 0.7vw, 8px);
}

.review-images img {
  width: clamp(70px, 7vw, 80px) !important;
  height: clamp(70px, 7vw, 80px) !important;
  object-fit: cover;
  border-radius: clamp(3px, 0.4vw, 4px) !important;
  cursor: pointer;
  transition: transform 0.2s;
}

.review-images img:hover {
  transform: scale(1.05);
}

.view-more-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: clamp(12px, 1.3vw, 16px);
  gap: clamp(12px, 1.3vw, 16px);
}

.view-more-line {
  flex: 1;
  height: 1px;
  background: #E5E7EB;
}

.view-more-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
  font-size: clamp(13px, 1.2vw, 14px) !important;
  font-weight: 400 !important;
  line-height: clamp(17px, 1.5vw, 18px) !important;
  letter-spacing: 0 !important;
  color: #00699A !important;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: clamp(6px, 0.7vw, 8px) clamp(12px, 1.3vw, 16px);
  transition: all 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
  vertical-align: middle;
}

.view-more-btn:hover {
  color: #005580 !important;
  text-decoration: underline;
}

/* Product Info */
.product-info {
  background: #FFFFFF;
  border-radius: clamp(4px, 0.5vw, 8px);
  padding: clamp(16px, 2vw, 24px);
}

.product-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 700;
  line-height: clamp(32px, 3.3vw, 40px);
  letter-spacing: 0;
  color: #333333;
  margin-bottom: clamp(6px, 0.8vw, 8px);
  vertical-align: middle;
}

.product-subtitle {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(20px, 1.8vw, 22px);
  letter-spacing: 0;
  color: #333333;
  margin-bottom: clamp(10px, 1vw, 12px);
  vertical-align: middle;
}

.price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(10px, 1vw, 12px);
  padding-bottom: 0;
  border-bottom: none;
}

.current-price {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  color: #333333;
  display: flex;
  align-items: baseline;
}

.currency-symbol {
  font-size: clamp(18px, 1.7vw, 20px);
  line-height: clamp(36px, 3.3vw, 40px);
  letter-spacing: 0;
  vertical-align: middle;
}

.price-number {
  font-size: clamp(20px, 2vw, 24px);
  line-height: clamp(28px, 2.7vw, 32px);
  letter-spacing: 0;
  vertical-align: middle;
}

.free-shipping {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #00699A;
  text-align: right;
  vertical-align: middle;
}

/* Option Groups */
.option-group {
  margin-bottom: clamp(16px, 2vw, 20px);
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.5vw, 16px);
  flex-wrap: wrap;
}

.option-label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(20px, 1.8vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  margin-bottom: 0;
  vertical-align: middle;
  flex-shrink: 0;
}

.color-options,
.fabric-options,
.size-options {
  display: flex;
  gap: clamp(8px, 1vw, 10px);
  flex-wrap: wrap;
}

.color-btn {
  width: clamp(28px, 2.8vw, 32px);
  height: clamp(28px, 2.8vw, 32px);
  border: 2px solid #E5E7EB;
  border-radius: clamp(3px, 0.35vw, 4px);
  cursor: pointer;
  transition: all 0.3s;
}

.color-btn:hover,
.color-btn.active {
  border-color: #00699A;
  transform: scale(1.1);
}

.fabric-btn,
.size-btn {
  padding: clamp(6px, 0.8vw, 8px) clamp(12px, 1.5vw, 16px);
  background: transparent;
  border: 1px solid #E5E7EB;
  border-radius: clamp(3px, 0.4vw, 4px);
  font-size: clamp(12px, 1.3vw, 14px);
  color: #333333;
  cursor: pointer;
  transition: all 0.3s;
}

.fabric-btn:hover,
.size-btn:hover {
  background: #F7F7F7;
}

.fabric-btn.active,
.size-btn.active {
  background: transparent;
  color: #00699A;
  border-color: #00699A;
}

/* Total Price Section */
.total-price-section {
  margin-top: clamp(20px, 2.5vw, 24px);
  padding-top: 0;
  border-top: none;
}

.total-title-container {
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.3vw, 16px);
  margin-bottom: clamp(12px, 1.3vw, 16px);
}

.total-title-line {
  flex: 1;
  height: 1px;
  background: #E5E7EB;
  border: none;
}

.total-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(20px, 1.8vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  text-align: center;
  margin: 0;
  white-space: nowrap;
  flex-shrink: 0;
  vertical-align: middle;
}

.price-details {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.8vw, 10px);
  align-items: flex-end;
}

.price-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(13px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(20px, 1.8vw, 22px);
  letter-spacing: 0;
  color: #333333;
  vertical-align: middle;
  width: 100%;
}

.price-row .label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0;
  color: #000000;
  vertical-align: middle;
}

.price-row .value {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0;
  color: #000000;
  vertical-align: middle;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: clamp(8px, 1vw, 12px);
  margin-top: clamp(20px, 2.5vw, 24px);
}

.btn {
  flex: 1;
  padding: clamp(10px, 1.2vw, 12px);
  border-radius: clamp(4px, 0.5vw, 6px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  vertical-align: middle;
}

.btn-add-cart {
  background: #00699A;
  color: #FFFFFF;
  border: none;
}

.btn-add-cart:hover {
  background: #005580;
}

.btn-buy-now {
  background: transparent;
  border: 1px solid #00699A;
  color: #00699A;
}

.btn-buy-now:hover {
  background: #E0F2FE;
}
</style>

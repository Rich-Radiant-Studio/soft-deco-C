<template>
  <div class="shop-page">
    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <div class="shop-container">
      <div class="shop-layout">
        <!-- Left Sidebar Navigation -->
        <aside class="sidebar">
          <div class="category-section">
            <h3 class="category-title">Products</h3>
            <ul class="category-list">
              <li class="category-item active">
                <a href="#" class="category-link">All Products</a>
              </li>
            </ul>
          </div>

          <div class="category-section">
            <h3 class="category-title">Living Room</h3>
            <ul class="category-list">
              <li class="category-item"><a href="#" class="category-link">Sofas</a></li>
              <li class="category-item"><a href="#" class="category-link">Coffee Tables</a></li>
              <li class="category-item"><a href="#" class="category-link">TV Stands/Media Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Side Tables/Corner Tables</a></li>
              <li class="category-item"><a href="#" class="category-link">Storage/Display Cabinets</a></li>
            </ul>
          </div>

          <div class="category-section">
            <h3 class="category-title">Bedroom</h3>
            <ul class="category-list">
              <li class="category-item"><a href="#" class="category-link">Beds</a></li>
              <li class="category-item"><a href="#" class="category-link">Nightstands</a></li>
              <li class="category-item"><a href="#" class="category-link">Wardrobes</a></li>
              <li class="category-item"><a href="#" class="category-link">Vanity Tables/Desks</a></li>
              <li class="category-item"><a href="#" class="category-link">Dressers/Drawer Chests</a></li>
            </ul>
          </div>

          <div class="category-section">
            <h3 class="category-title">Kitchen</h3>
            <ul class="category-list">
              <li class="category-item"><a href="#" class="category-link">Base Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Wall Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Tall Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Pantry Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Sideboards</a></li>
              <li class="category-item"><a href="#" class="category-link">Kitchen Islands/Bars</a></li>
            </ul>
          </div>

          <div class="category-section">
            <h3 class="category-title">Bathroom</h3>
            <ul class="category-list">
              <li class="category-item"><a href="#" class="category-link">Vanity Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Mirror Cabinets</a></li>
              <li class="category-item"><a href="#" class="category-link">Toilets</a></li>
              <li class="category-item"><a href="#" class="category-link">Sinks/Basins</a></li>
              <li class="category-item"><a href="#" class="category-link">Shower Systems</a></li>
              <li class="category-item"><a href="#" class="category-link">Bathtubs</a></li>
            </ul>
          </div>

          <div class="category-section">
            <h3 class="category-title">Other</h3>
            <ul class="category-list">
              <li class="category-item"><a href="#" class="category-link">Other Products</a></li>
            </ul>
          </div>
        </aside>

        <!-- Right Content Area -->
        <main class="main-content">
          <!-- Filter Section -->
          <div class="filter-section">
            <!-- Price Range -->
            <div class="filter-group">
              <span class="filter-label">Price Range:</span>
              <div class="filter-options">
                <button class="filter-btn">$0-100</button>
                <button class="filter-btn">$100-500</button>
                <button class="filter-btn">$500-1000</button>
                <button class="filter-btn">$1000-2000</button>
                <button class="filter-btn">$2000+</button>
                <input v-model="filters.minPrice" type="number" placeholder="Min" class="price-input">
                <input v-model="filters.maxPrice" type="number" placeholder="Max" class="price-input">
                <button class="filter-apply-btn" @click="page = 1; loadProducts()">Filter</button>
              </div>
            </div>

            <!-- Brand -->
            <div class="filter-group">
              <span class="filter-label">Brand:</span>
              <div class="filter-options">
                <button class="filter-btn">IKEA</button>
                <button class="filter-btn">Lin's Wood</button>
                <button class="filter-btn">QuanU Home</button>
              </div>
            </div>

            <!-- Material -->
            <div class="filter-group">
              <span class="filter-label">Material:</span>
              <div class="filter-options-wrapper">
                <div class="filter-options">
                  <button class="filter-btn">Oak</button>
                  <button class="filter-btn">Walnut</button>
                  <button class="filter-btn">Pine</button>
                  <button class="filter-btn">Particle Board</button>
                  <button class="filter-btn">MDF</button>
                  <template v-if="expandedFilters.material">
                    <button class="filter-btn">Metal</button>
                    <button class="filter-btn">Fabric</button>
                    <button class="filter-btn">Leather</button>
                    <button class="filter-btn">Faux Leather</button>
                    <button class="filter-btn">Upholstered</button>
                  </template>
                </div>
                <button 
                  class="show-more-btn" 
                  @click="expandedFilters.material = !expandedFilters.material"
                >
                  {{ expandedFilters.material ? '- Show Less' : '+ Show More' }}
                </button>
              </div>
            </div>

            <!-- Structure -->
            <div class="filter-group">
              <span class="filter-label">Structure:</span>
              <div class="filter-options-wrapper">
                <div class="filter-options">
                  <button class="filter-btn">Platform Bed</button>
                  <button class="filter-btn">Storage Bed</button>
                  <button class="filter-btn">Upholstered Bed</button>
                  <template v-if="expandedFilters.structure">
                    <button class="filter-btn">Canopy Bed</button>
                    <button class="filter-btn">Bunk Bed</button>
                  </template>
                </div>
                <button 
                  class="show-more-btn" 
                  @click="expandedFilters.structure = !expandedFilters.structure"
                >
                  {{ expandedFilters.structure ? '- Show Less' : '+ Show More' }}
                </button>
              </div>
            </div>

            <!-- Style -->
            <div class="filter-group">
              <span class="filter-label">Style:</span>
              <div class="filter-options-wrapper">
                <div class="filter-options">
                  <button class="filter-btn">Modern</button>
                  <button class="filter-btn">Scandinavian</button>
                  <button class="filter-btn">Asian</button>
                  <button class="filter-btn">Industrial</button>
                  <button class="filter-btn">American</button>
                  <template v-if="expandedFilters.style">
                    <button class="filter-btn">European Classic</button>
                    <button class="filter-btn">Japanese</button>
                  </template>
                </div>
                <button 
                  class="show-more-btn" 
                  @click="expandedFilters.style = !expandedFilters.style"
                >
                  {{ expandedFilters.style ? '- Show Less' : '+ Show More' }}
                </button>
              </div>
            </div>

            <!-- Size -->
            <div class="filter-group">
              <span class="filter-label">Size:</span>
              <div class="filter-options">
                <button class="filter-btn">Twin</button>
                <button class="filter-btn">Full</button>
                <button class="filter-btn">Queen</button>
                <button class="filter-btn">King</button>
                <button class="reset-btn" @click="resetFilters">Reset</button>
              </div>
            </div>
          </div>

          <!-- Product Grid -->
          <div v-if="loading" class="shop-state">Loading products...</div>
          <div v-else-if="error" class="shop-state error">{{ error }}</div>
          <div v-else-if="!products.length" class="shop-state">No products found.</div>
          <div v-else class="product-grid">
            <router-link :to="`/product/${product.id}`" class="product-card-link" v-for="product in products" :key="product.id">
              <div class="product-card">
                <div class="product-image">
                  <img :src="product.image" :alt="product.name">
                </div>
                <div class="product-info">
                  <div class="product-header">
                    <p class="product-category">{{ product.category }}</p>
                    <h3 class="product-price">
                      <span class="price-symbol">{{ product.currency === 'USD' ? '$' : product.currency }}</span>
                      <span class="price-amount">{{ product.price }}</span>
                    </h3>
                  </div>
                  <h4 class="product-name">{{ product.name }}</h4>
                  <p class="product-description">{{ product.description }}</p>
                </div>
              </div>
            </router-link>
          </div>
          <div v-if="total > pageSize" class="pagination">
            <button :disabled="page <= 1" @click="page--; loadProducts()">Previous</button>
            <span>Page {{ page }} / {{ totalPages }}</span>
            <button :disabled="page >= totalPages" @click="page++; loadProducts()">Next</button>
          </div>
        </main>
      </div>
    </div>

    <!-- Floating Action Buttons -->
    <FloatingActionButtons />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import FloatingActionButtons from '@/components/FloatingActionButtons.vue'

interface Product {
  id: number | string
  category: string
  price: string
  name: string
  description: string
  image: string
  currency?: string
}

const products = ref<Product[]>([
  {
    id: 1,
    category: 'Living Room Furniture',
    price: '$1,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 2,
    category: 'Living Room Furniture',
    price: '$2,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 3,
    category: 'Living Room Furniture',
    price: '$1,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 4,
    category: 'Living Room Furniture',
    price: '$1,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 5,
    category: 'Living Room Furniture',
    price: '$1,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 6,
    category: 'Living Room Furniture',
    price: '$643',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 7,
    category: 'Office Furniture',
    price: '$1,099',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 8,
    category: 'Office Furniture',
    price: '$3,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 9,
    category: 'Living Room Furniture',
    price: '$880',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 10,
    category: 'Vanity Cabinets',
    price: '$1,680',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600566752229-250ed79470e6?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 11,
    category: 'Vanity Cabinets',
    price: '$670',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop&q=80'
  },
  {
    id: 12,
    category: 'Vanity Cabinets',
    price: '$880',
    name: 'Cloud Fabric Sofa',
    description: 'High-density foam filling for ultimate comfort',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop&q=80'
  }
])

const loading = ref(true)
const error = ref('')
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const filters = ref<Record<string, string>>({})

async function loadProducts() {
  loading.value = true
  error.value = ''
  try {
    const params = new URLSearchParams({ page: String(page.value), pageSize: String(pageSize.value), sort: 'default' })
    Object.entries(filters.value).forEach(([key, value]) => value && params.set(key, value))
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
    const token = localStorage.getItem('token')
    const response = await fetch(`${baseUrl}/app/shop/goods?${params}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    if (!response.ok) throw new Error(`Request failed (${response.status})`)
    const result = await response.json()
    if (result.code !== 200 && result.code !== 0) throw new Error(result.msg || 'Unable to load products')
    const data = result.data || {}
    products.value = (data.list || []).map((item: any) => ({ id: item.goodsId, category: item.category || '', price: String(item.price ?? ''), currency: item.currency || 'USD', name: item.name || '', description: item.description || '', image: item.image || '' }))
    total.value = Number(data.total || 0)
    page.value = Number(data.page || page.value)
    pageSize.value = Number(data.pageSize || pageSize.value)
  } catch (err: any) { error.value = err?.message || 'Unable to load products' } finally { loading.value = false }
}
function resetFilters() { filters.value = {}; page.value = 1; loadProducts() }
onMounted(loadProducts)

// 筛选展开状态
const expandedFilters = ref({
  material: false,
  structure: false,
  style: false
})
</script>

<style scoped>
.shop-page {
  background: #F4F4F4;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shop-container {
  flex: 1;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 clamp(16px, 1.8vw, 24px) 0;
}

.shop-layout {
  display: flex;
  gap: clamp(12px, 1.5vw, 24px);
  align-items: flex-start;
  min-height: 500px;
}

/* Sidebar */
.sidebar {
  width: clamp(160px, 12vw, 200px);
  min-width: clamp(160px, 12vw, 200px);
  background: #F4F4F4;
  border-radius: clamp(4px, 0.4vw, 8px);
  padding: clamp(12px, 1.5vw, 20px);
  flex-shrink: 0;
}

.category-section {
  margin-bottom: clamp(8px, 1vw, 12px);
  padding-bottom: clamp(8px, 1vw, 12px);
  border-bottom: 1px solid #E5E7EB;
}

.category-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.category-title {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.4vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.8vw, 20px);
  color: #333333;
  margin: 0 0 clamp(6px, 0.8vw, 10px) 0;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-item {
  margin-bottom: clamp(4px, 0.6vw, 8px);
}

.category-item:last-child {
  margin-bottom: 0;
}

.category-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
  color: #5C5C5C;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(3px, 0.4vw, 5px) 0;
  transition: color 0.2s;
}

.category-link:hover {
  color: #00699A;
}

.category-item.active .category-link {
  color: #5C5C5C;
  font-weight: 400;
}

.category-item.active .category-link::after {
  content: '✓';
  color: #5C5C5C;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.6vw, 18px);
}

/* Main Content */
.main-content {
  flex: 1;
  min-width: 0;
  width: 100%;
  margin-top: clamp(16px, 2vw, 24px);
}

/* Filter Section */
.filter-section {
  background: #FFFFFF;
  border-radius: clamp(4px, 0.4vw, 8px);
  padding: clamp(12px, 1.5vw, 20px);
  margin-bottom: clamp(12px, 1.5vw, 20px);
}

.filter-group {
  display: flex;
  align-items: flex-start;
  gap: clamp(20px, 2.2vw, 24px);
  margin-bottom: clamp(10px, 1.2vw, 14px);
  flex-wrap: wrap;
}

.filter-group:last-child {
  margin-bottom: 0;
}

.filter-label {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.8vw, 22px);
  color: #333333;
  white-space: nowrap;
  padding-top: clamp(3px, 0.4vw, 5px);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 0.6vw, 8px);
  flex: 1;
}

.filter-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 22px);
  color: #333333;
  background: transparent;
  border: none;
  border-radius: clamp(2px, 0.25vw, 4px);
  padding: clamp(3px, 0.4vw, 5px) clamp(10px, 1.2vw, 14px);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.filter-btn:hover {
  background: #E0F2FE;
  color: #00699A;
}

.filter-btn.active {
  background: #00699A;
  color: #FFFFFF;
}

.price-input {
  width: clamp(50px, 6vw, 70px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.8vw, 22px);
  color: #000000;
  padding: clamp(3px, 0.4vw, 5px) clamp(6px, 0.8vw, 10px);
  border: 1px solid #E5E7EB;
  border-radius: clamp(2px, 0.25vw, 4px);
  outline: none;
  text-align: center;
  vertical-align: middle;
}

/* 移除数字输入框的增加/减少按钮 */
.price-input::-webkit-outer-spin-button,
.price-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.price-input[type=number] {
  -moz-appearance: textfield;
}

.price-input::placeholder {
  color: #000000;
  opacity: 1;
}

.price-input::-webkit-input-placeholder {
  color: #000000;
  opacity: 1;
}

.price-input::-moz-placeholder {
  color: #000000;
  opacity: 1;
}

.price-input:-ms-input-placeholder {
  color: #000000;
  opacity: 1;
}

.price-input::-ms-input-placeholder {
  color: #000000;
  opacity: 1;
}

.price-input:focus {
  border-color: #00699A;
}

.filter-apply-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 500;
  color: #FFFFFF;
  background: #333333;
  border: none;
  border-radius: clamp(3px, 0.35vw, 4px);
  padding: clamp(4px, 0.45vw, 5px) clamp(14px, 1.4vw, 16px);
  cursor: pointer;
  transition: background 0.2s;
  width: clamp(58px, 5.8vw, 66px);
  height: clamp(28px, 2.8vw, 32px);
}

.filter-apply-btn:hover {
  background: #000000;
}

.reset-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 500;
  color: #FFFFFF;
  background: #333333;
  border: none;
  border-radius: clamp(3px, 0.35vw, 4px);
  padding: clamp(4px, 0.45vw, 5px) clamp(14px, 1.4vw, 16px);
  cursor: pointer;
  transition: background 0.2s;
  margin-left: auto;
  width: clamp(58px, 5.8vw, 66px);
  height: clamp(28px, 2.8vw, 32px);
}

.reset-btn:hover {
  background: #000000;
}

/* Filter Expand/Collapse */
.filter-options-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}

.show-more-btn {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 500;
  color: #00699A;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.2s;
  align-self: flex-start;
  text-align: left;
}

.show-more-btn:hover {
  color: #004d73;
  text-decoration: underline;
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(280px, 32vw, 380px), 1fr));
  gap: clamp(14px, 1.5vw, 16px);
  background: #FFFFFF;
  border-radius: 4px;
  padding: clamp(14px, 1.5vw, 16px);
  width: 100%;
}

@media (min-width: 1600px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1200px) and (max-width: 1599px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .sidebar {
    width: clamp(140px, 10vw, 160px);
    min-width: clamp(140px, 10vw, 160px);
  }
}

@media (max-width: 767px) {
  .shop-layout {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
  
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .filter-label {
    min-width: 100%;
    padding-top: 0;
    margin-bottom: clamp(4px, 0.5vw, 6px);
  }
  
  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  
  .shop-container {
    padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px);
  }
}

.product-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card {
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E5E6EB;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  width: 100%;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: clamp(120px, 14vw, 152px);
  overflow: hidden;
  background: #F7F7F7;
  border-radius: 4px 4px 0 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: clamp(20px, 2.4vw, 24px) !important;
}

.product-header {
  display: flex;
  flex-direction: column;
  gap: clamp(3px, 0.4vw, 4px);
  width: 100%;
  height: auto;
  margin-bottom: clamp(6px, 0.8vw, 8px);
}

.product-category {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 500;
  line-height: clamp(18px, 2.2vw, 22px);
  color: #1D2129;
  margin: 0;
  background-color: #F2F3F5;
  border-radius: 2px;
  padding: clamp(1px, 0.1vw, 1px) clamp(6px, 0.8vw, 8px);
  display: inline-block;
  width: fit-content;
}

.product-price {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(18px, 2.4vw, 24px);
  font-weight: 700;
  line-height: clamp(26px, 3.2vw, 32px);
  color: #333333;
  margin: 0;
  display: flex;
  align-items: center;
}

.price-symbol {
  font-size: clamp(16px, 2vw, 20px);
  line-height: clamp(32px, 4vw, 40px);
  font-weight: 700;
}

.price-amount {
  font-size: clamp(18px, 2.4vw, 24px);
  line-height: clamp(26px, 3.2vw, 32px);
  font-weight: 700;
}

.product-name {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.6vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 2vw, 20px);
  color: #333333;
  margin: 0 0 clamp(6px, 0.8vw, 8px) 0;
}

.product-description {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(14px, 1.6vw, 16px);
  font-weight: 400;
  line-height: clamp(18px, 2vw, 20px);
  color: #86909C;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>


/* Floating Action Buttons */
.shop-page .floating-actions {
  position: fixed !important;
  right: clamp(16px, 1.25vw, 24px) !important;
  bottom: clamp(60px, 4.17vw, 80px) !important;
  display: flex !important;
  flex-direction: column !important;
  flex-wrap: nowrap !important;
  gap: clamp(16px, 1.17vw, 22.5px) !important;
  z-index: 1000 !important;
  width: auto !important;
  height: auto !important;
}

.shop-page .floating-btn {
  width: clamp(48px, 3.75vw, 72px) !important;
  height: clamp(48px, 3.75vw, 72px) !important;
  min-width: clamp(48px, 3.75vw, 72px) !important;
  min-height: clamp(48px, 3.75vw, 72px) !important;
  border-radius: clamp(24px, 2.11vw, 40.5px) !important;
  background: #FFFFFF !important;
  border: 1px solid #E5E7EB !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.3s !important;
  box-shadow: 0 clamp(1px, 0.1vw, 2px) clamp(4px, 0.42vw, 8px) rgba(0, 0, 0, 0.15) !important;
  padding: clamp(12px, 0.94vw, 18px) !important;
  margin: 0 !important;
  flex-shrink: 0 !important;
}

.shop-page .floating-btn i {
  font-size: clamp(24px, 1.875vw, 36px) !important;
  color: #00699A !important;
  transition: color 0.3s !important;
  width: clamp(24px, 1.875vw, 36px) !important;
  height: clamp(24px, 1.875vw, 36px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
}

.shop-page .floating-btn .back-to-top-icon {
  width: clamp(24px, 1.875vw, 36px) !important;
  height: clamp(24px, 1.875vw, 36px) !important;
  color: #FFFFFF !important;
  transition: color 0.3s !important;
  display: block !important;
}

.shop-page .floating-btn:hover {
  background: #F5F5F5 !important;
  transform: scale(1.05) !important;
  box-shadow: 0 clamp(2px, 0.21vw, 4px) clamp(8px, 0.63vw, 12px) rgba(0, 0, 0, 0.2) !important;
}

.shop-page .floating-btn.active i {
  color: #00699A !important;
}

.shop-page .floating-btn:last-child {
  background: #333333 !important;
  border: none !important;
}

.shop-page .floating-btn:last-child i {
  color: #FFFFFF !important;
}

.shop-page .floating-btn:last-child:hover {
  background: #000000 !important;
}

@media (max-width: 768px) {
  .shop-page .floating-actions {
    right: clamp(12px, 2.08vw, 16px) !important;
    bottom: clamp(48px, 8.33vw, 64px) !important;
  }
  
  .shop-page .floating-btn {
    width: clamp(40px, 6.25vw, 48px) !important;
    height: clamp(40px, 6.25vw, 48px) !important;
    min-width: clamp(40px, 6.25vw, 48px) !important;
    min-height: clamp(40px, 6.25vw, 48px) !important;
  }
  
  .shop-page .floating-btn i {
    font-size: clamp(16px, 2.34vw, 18px) !important;
  }
}


<style>
/* Global Floating Action Buttons - Not Scoped */
.floating-actions {
  position: fixed;
  right: clamp(16px, 1.25vw, 24px);
  bottom: clamp(60px, 4.17vw, 80px);
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.17vw, 22.5px);
  z-index: 9999;
}

.floating-btn {
  width: clamp(48px, 3.75vw, 72px);
  height: clamp(48px, 3.75vw, 72px);
  border-radius: clamp(24px, 2.11vw, 40.5px);
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 clamp(1px, 0.1vw, 2px) clamp(4px, 0.42vw, 8px) rgba(0, 0, 0, 0.15);
  padding: clamp(12px, 0.94vw, 18px);
}

.floating-btn i {
  font-size: clamp(24px, 1.875vw, 36px);
  color: #00699A;
  width: clamp(24px, 1.875vw, 36px);
  height: clamp(24px, 1.875vw, 36px);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.floating-btn .back-to-top-icon {
  width: clamp(24px, 1.875vw, 36px);
  height: clamp(24px, 1.875vw, 36px);
  color: #FFFFFF;
  transition: color 0.3s;
  display: block;
}

.floating-btn:hover {
  background: #F5F5F5;
  transform: scale(1.05);
  box-shadow: 0 clamp(2px, 0.21vw, 4px) clamp(8px, 0.63vw, 12px) rgba(0, 0, 0, 0.2);
}

.floating-btn.active i {
  color: #00699A;
}

.floating-btn:last-child {
  background: #333333;
  border: none;
}

.floating-btn:last-child i {
  color: #FFFFFF;
}

.floating-btn:last-child:hover {
  background: #000000;
}
</style>

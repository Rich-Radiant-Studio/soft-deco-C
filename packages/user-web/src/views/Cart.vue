<template>
  <div class="cart-page">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="cart-content">
      <div class="container-fluid">
        <div class="cart-layout">
          <!-- Left Section -->
          <div class="left-section">
            <!-- Shopping Cart Items -->
            <div class="cart-module">
              <h2 class="module-title">Shopping cart items</h2>
              <div class="cart-items">
                <!-- Cart Item Header -->
                <div class="cart-item-header">
                  <div class="header-checkbox">
                    <BFormCheckbox v-model="selectAll" @change="toggleSelectAll" />
                  </div>
                  <div class="header-commodity">Commodity</div>
                  <div class="header-unit-price">Unit price</div>
                  <div class="header-quantity">Quantity</div>
                  <div class="header-subtotal">Subtotal</div>
                  <div class="header-operation">Operation</div>
                </div>
                
                <!-- Cart Items List -->
                <div v-for="item in cartItems" :key="item.id" class="cart-item">
                  <div class="item-checkbox">
                    <BFormCheckbox v-model="item.selected" />
                  </div>
                  <div class="item-commodity">
                    <img :src="item.image" :alt="item.name" class="item-image">
                    <div class="item-info">
                      <h3 class="item-name">{{ item.name }}</h3>
                      <p class="item-specs" v-for="spec in item.specs" :key="spec">{{ spec }}</p>
                    </div>
                  </div>
                  <div class="item-unit-price">${{ item.price }}</div>
                  <div class="item-quantity">
                    <button @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
                      <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.2517e-07 0L11.2 1.00136e-06V1.4L0 1.4L1.2517e-07 0Z" :fill="item.quantity > 1 ? '#333333' : '#D4D4D4'"/>
                      </svg>
                    </button>
                    <input type="number" v-model.number="item.quantity" min="1">
                    <button @click="increaseQuantity(item)">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.3 0V4.9L11.2 4.9V6.3L6.3 6.3V11.2H4.9L4.9 6.3H0L1.66893e-07 4.9L4.9 4.9L4.9 4.17233e-08L6.3 0Z" fill="#333333"/>
                      </svg>
                    </button>
                  </div>
                  <div class="item-subtotal">${{ (item.price * item.quantity).toFixed(2) }}</div>
                  <div class="item-operation">
                    <button @click="removeItem(item.id)" class="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Delivery Method -->
            <div class="cart-module">
              <h2 class="module-title">Delivery Method</h2>
              <div class="delivery-options-wrapper">
                <div class="delivery-option">
                  <div class="delivery-header">
                    <BFormRadio v-model="deliveryMethod" value="standard" name="delivery-method">
                      <strong>Standard delivery</strong> <span class="delivery-time">(3-7 working days)</span>
                    </BFormRadio>
                  </div>
                  <p class="delivery-details">Within 3 kilometers $9.99 · 3 kilometers away $19.99 · Free shipping on orders over $999</p>
                </div>
                <div class="delivery-option">
                  <div class="delivery-header">
                    <BFormRadio v-model="deliveryMethod" value="quick" name="delivery-method">
                      <strong>Quick delivery</strong> <span class="delivery-time">(2-3 business days)</span>
                    </BFormRadio>
                  </div>
                  <p class="delivery-details">Within 3 kilometers $19.99 · 3 kilometers away $29.99 · Free shipping on orders over $999</p>
                </div>
              </div>
            </div>
            
            <!-- Payment Information -->
            <div class="cart-module">
              <h2 class="module-title">Payment Information</h2>
              <div class="payment-methods">
                <button class="payment-method" :class="{ active: paymentMethod === 'visa' }" @click="paymentMethod = 'visa'">
                  <img src="@/assets/images/sprites/VISA 1.png" alt="VISA" class="payment-icon payment-icon-visa">
                  Credit Card
                </button>
                <button class="payment-method" :class="{ active: paymentMethod === 'paypal' }" @click="paymentMethod = 'paypal'">
                  <img src="@/assets/images/sprites/PayPal.png" alt="PayPal" class="payment-icon payment-icon-paypal">
                  PayPal
                </button>
                <button class="payment-method" :class="{ active: paymentMethod === 'apple' }" @click="paymentMethod = 'apple'">
                  <img src="@/assets/images/sprites/ApplePay.png" alt="Apple Pay" class="payment-icon payment-icon-paypal">
                  Apple Pay
                </button>
              </div>
              <div class="payment-form">
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Card number" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Cardholder Name" class="form-input">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Validity period" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Security code" class="form-input">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Postal code" class="form-input">
                  </div>
                  <div class="form-input-placeholder"></div>
                </div>
              </div>
              <button class="pay-now-btn">Pay Now ${{ totalAmount }}</button>
              <p class="security-note">Your payment is protected by 256 bit SSL encryption</p>
            </div>
          </div>
          
          <!-- Right Section -->
          <div class="right-section">
            <!-- Order Details -->
            <div class="cart-module">
              <h2 class="module-title">Order Details</h2>
              <div class="order-details">
                <div class="detail-row">
                  <span>Subtotal</span>
                  <span>${{ subtotal }}</span>
                </div>
                <div class="detail-row">
                  <span>Freight discount</span>
                  <span class="discount">-$18</span>
                </div>
                <div class="detail-row">
                  <span>Coupon discount</span>
                  <span class="discount">-$50</span>
                </div>
                <div class="detail-row save-together">
                  <span>Save together</span>
                  <div class="save-together-right">
                    <a href="#" class="view-discount">View discount details</a>
                    <span class="save-amount">$68</span>
                  </div>
                </div>
                <div class="detail-row total">
                  <span>Total payable amount</span>
                  <span class="total-amount">${{ totalAmount }}</span>
                </div>
                <div class="guarantees">
                  <p>100%Genuine Product Guarantee</p>
                  <p>7-day unconditional return and exchange</p>
                  <p>Multiple payment methods</p>
                </div>
              </div>
            </div>
            
            <!-- Billing Address -->
            <div class="cart-module">
              <h2 class="module-title">Billing Address</h2>
              <div class="address-form">
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Name" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Surname" class="form-input">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <select class="form-input full-width">
                      <option>Street</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <input type="text" placeholder="Address" class="form-input full-width">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <select class="form-input">
                      <option>City</option>
                    </select>
                  </div>
                  <div class="form-input-wrapper">
                    <select class="form-input">
                      <option>State</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Postal code" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <select class="form-input">
                      <option>Country</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Receiving Address -->
            <div class="cart-module">
              <div class="module-header">
                <h2 class="module-title">Receiving address</h2>
                <div class="same-address">
                  <BFormCheckbox v-model="sameAsBilling">
                    Same as billing address
                  </BFormCheckbox>
                </div>
              </div>
              <div class="address-form">
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Name" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Surname" class="form-input">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <select class="form-input full-width">
                      <option>Street</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <input type="text" placeholder="Address" class="form-input full-width">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <select class="form-input">
                      <option>City</option>
                    </select>
                  </div>
                  <div class="form-input-wrapper">
                    <select class="form-input">
                      <option>State</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" placeholder="Postal code" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <select class="form-input">
                      <option>Country</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="checkbox-label">
                    <BFormCheckbox>
                      Not the construction site
                    </BFormCheckbox>
                  </div>
                </div>
              </div>
              <button class="save-btn">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BFormRadio, BFormCheckbox } from 'bootstrap-vue-next'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

interface CartItem {
  id: number
  name: string
  image: string
  specs: string[]
  price: number
  quantity: number
  selected: boolean
}

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Comfortable wooden furniture set',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    specs: ['three-seater sofa ×1', 'Multi-functional coffee table ×1', 'Simple TV cabinet ×1'],
    price: 3144,
    quantity: 1,
    selected: true
  },
  {
    id: 2,
    name: 'Comfortable wooden furniture set',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    specs: ['three-seater sofa ×1', 'Multi-functional coffee table ×1', 'Simple TV cabinet ×1'],
    price: 420,
    quantity: 1,
    selected: true
  },
  {
    id: 3,
    name: 'Comfortable wooden furniture set',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    specs: ['three-seater sofa ×1', 'Multi-functional coffee table ×1', 'Simple TV cabinet ×1'],
    price: 129,
    quantity: 1,
    selected: true
  }
])

const selectAll = ref(true)
const deliveryMethod = ref('standard')
const paymentMethod = ref('visa')
const sameAsBilling = ref(false)

const subtotal = computed(() => {
  return cartItems.value
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const totalAmount = computed(() => {
  return (subtotal.value - 18 - 50).toFixed(0)
})

const toggleSelectAll = () => {
  cartItems.value.forEach(item => {
    item.selected = selectAll.value
  })
}

const increaseQuantity = (item: CartItem) => {
  item.quantity++
}

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (id: number) => {
  const index = cartItems.value.findIndex(item => item.id === id)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
}

.cart-content {
  flex: 1;
  padding: clamp(16px, 1.25vw, 24px);
}

.cart-content .container-fluid {
  padding: 0;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr clamp(450px, 27.81vw, 534px);
  gap: clamp(12px, 0.83vw, 16px);
  align-items: stretch;
}

.left-section,
.right-section {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 0.83vw, 16px);
  height: 100%;
}

.right-section .cart-module:last-child {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-module {
  background: white;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(16px, 1.25vw, 24px);
  box-sizing: border-box;
}

.module-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(20px, 1.25vw, 24px);
  font-weight: 700;
  font-style: normal;
  line-height: clamp(26px, 1.67vw, 32px);
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 clamp(7px, 0.57vw, 11px) 0;
  display: flex;
  align-items: center;
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

/* Shopping Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 0.83vw, 16px);
  max-height: clamp(400px, 31.25vw, 600px);
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏滚动条 - Webkit浏览器 */
.cart-items::-webkit-scrollbar {
  display: none;
}

.cart-item-header {
  display: grid;
  grid-template-columns: 40px clamp(400px, 30.52vw, 586px) 1fr 1fr 1fr 1fr;
  gap: 0;
  padding: 0;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 500;
  color: #666666;
  background: #F4F4F4;
  border-radius: clamp(3px, 0.21vw, 4px);
}

.cart-item-header > div {
  padding: clamp(8px, 0.52vw, 10px) clamp(12px, 0.83vw, 16px);
  border-left: 1px solid #E5E6EB;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cart-item-header > div:first-child {
  border-left: none;
}

.cart-item {
  display: grid;
  grid-template-columns: 40px clamp(400px, 30.52vw, 586px) 1fr 1fr 1fr 1fr;
  gap: 0;
  padding: 0;
  align-items: center;
}

.cart-item > div {
  padding: 0 clamp(12px, 0.83vw, 16px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cart-item > .item-checkbox,
.cart-item > .item-commodity {
  justify-content: flex-start;
  text-align: left;
}

.item-commodity {
  display: flex;
  gap: clamp(6px, 0.42vw, 8px);
  align-items: flex-start;
}

.item-image {
  width: clamp(120px, 8.33vw, 160px);
  height: clamp(90px, 6.25vw, 120px);
  object-fit: cover;
  border-radius: clamp(3px, 0.21vw, 4px);
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.42vw, 8px);
}

.item-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 700;
  font-style: normal;
  line-height: clamp(18px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.9;
  margin: 0;
}

.item-specs {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  margin: 0;
}

.item-unit-price {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.9;
}

.item-quantity {
  display: inline-flex;
  align-items: center;
  gap: 0;
}

.item-quantity button {
  width: clamp(28px, 1.67vw, 32px);
  height: clamp(28px, 1.67vw, 32px);
  border: 1px solid #E5E7EB;
  background: white;
  cursor: pointer;
  font-size: clamp(14px, 0.83vw, 16px);
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  padding: 0;
}

.item-quantity button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.item-quantity button svg {
  width: clamp(10px, 0.63vw, 12px);
  height: auto;
  flex-shrink: 0;
}

.item-quantity button:first-child {
  border-radius: clamp(3px, 0.21vw, 4px) 0 0 clamp(3px, 0.21vw, 4px);
}

.item-quantity button:last-child {
  border-radius: 0 clamp(3px, 0.21vw, 4px) clamp(3px, 0.21vw, 4px) 0;
}

.item-quantity button:hover {
  background: #F5F5F5;
}

.item-quantity input {
  width: clamp(40px, 2.5vw, 48px);
  height: clamp(28px, 1.67vw, 32px);
  text-align: center;
  border: 1px solid #E5E7EB;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.9;
  background: white;
  outline: none;
  padding: 0;
  -moz-appearance: textfield;
  margin: 0 -1px;
}

.item-quantity input::-webkit-outer-spin-button,
.item-quantity input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.item-subtotal {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #8B2C00;
}

.delete-btn {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: #FF4D4F;
}

/* Delivery Method */
.delivery-options-wrapper {
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 1.25vw, 24px);
}

.delivery-option {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.42vw, 8px);
  padding: 0;
  border: none;
  border-radius: 0;
  margin: 0;
}

.delivery-header {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

.delivery-header :deep(.form-check) {
  margin: 0 !important;
  padding: 0 !important;
}

.delivery-header :deep(.form-check-input) {
  margin-right: clamp(8px, 0.52vw, 10px);
  margin-left: 0 !important;
  flex-shrink: 0;
}

.delivery-header :deep(.form-check-label) {
  flex: 1;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 700;
  font-style: normal;
  line-height: clamp(18px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.9;
}

.delivery-header :deep(.form-check-label) strong {
  font-weight: 700;
}

.delivery-header :deep(.form-check-label) .delivery-time {
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.9;
}

.delivery-details {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  margin: 0 0 0 clamp(26px, 1.46vw, 28px);
}

/* 单选框和多选框样式覆盖 */
:deep(.form-check-input) {
  box-shadow: none !important;
}

:deep(.form-check-input:focus) {
  box-shadow: none !important;
  border-color: #00699A !important;
}

:deep(.form-check-input:checked) {
  background-color: #00699A !important;
  border-color: #00699A !important;
  box-shadow: none !important;
}

:deep(.form-check-input[type="radio"]:checked) {
  background-color: white !important;
  border-color: #00699A !important;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%2300699A'/%3e%3c/svg%3e") !important;
}

/* Payment Information */
.payment-methods {
  display: flex;
  gap: clamp(3px, 0.21vw, 4px);
  margin-bottom: clamp(12px, 0.83vw, 16px);
  width: clamp(350px, 22.05vw, 423.4px);
}

.payment-method {
  flex: 0 0 auto;
  padding: clamp(4px, 0.26vw, 5px) clamp(20px, 1.25vw, 24px);
  height: clamp(28px, 1.67vw, 32px);
  border: 1px solid #E5E6EB;
  background: white;
  border-radius: clamp(3px, 0.21vw, 4px);
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 22px;
  letter-spacing: 0;
  color: #1D2129;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  white-space: nowrap;
}

.payment-method.active {
  border-color: #00699A;
  background: #F7FAFC;
  color: #00699A;
}

.payment-icon {
  height: clamp(13px, 0.83vw, 16px);
  margin-right: clamp(2px, 0.16vw, 3px);
  flex-shrink: 0;
  object-fit: contain;
}

.payment-icon-visa {
  width: clamp(32px, 2vw, 38.4px);
}

.payment-icon-paypal {
  width: clamp(13px, 0.83vw, 16px);
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.63vw, 12px);
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: clamp(8px, 0.63vw, 12px);
  width: 100%;
}

.form-input-wrapper {
  flex: 0 0 calc(50% - 6px);
  position: relative;
}

.form-input-wrapper.full-width {
  flex: 0 0 100%;
}

.form-input-wrapper::before {
  content: '*';
  position: absolute;
  left: clamp(8px, 0.63vw, 12px);
  top: 50%;
  transform: translateY(-50%);
  color: #FF0000;
  font-size: clamp(12px, 0.73vw, 14px);
  pointer-events: none;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: clamp(8px, 0.63vw, 12px);
  padding-left: clamp(16px, 1.04vw, 20px);
  border: 1px solid #E5E7EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  box-sizing: border-box;
  outline: none;
}

.form-input:focus {
  border-color: #E5E7EB;
  outline: none;
}

.form-input::placeholder {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #5C5C5C;
}

.form-input.full-width {
  flex: 0 0 100%;
}

.form-input-placeholder {
  flex: 0 0 calc(50% - 6px);
  visibility: hidden;
}

.pay-now-btn {
  width: 100%;
  height: clamp(40px, 2.5vw, 48px);
  padding: clamp(8px, 0.52vw, 10px) clamp(20px, 1.25vw, 24px);
  background: #8B2C00;
  color: #FFFFFF;
  border: none;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(20px, 1.25vw, 24px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(24px, 1.46vw, 28px);
  letter-spacing: 0;
  text-align: center;
  cursor: pointer;
  margin-bottom: clamp(6px, 0.42vw, 8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.security-note {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  margin: 0;
}

/* Order Details */
.order-details {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 0.83vw, 16px);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
}

.detail-row > span:last-child {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  text-align: right;
  color: #000000;
  opacity: 0.9;
}

.detail-row > span.discount {
  color: #00699A;
  opacity: 1;
}

.detail-row.total > span.total-amount {
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.04vw, 20px);
  color: #8B2C00;
  opacity: 1;
}

.detail-row.save-together {
  padding-top: 0;
  border-top: none;
}

.save-together-right {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.42vw, 8px);
}

.save-amount {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.9;
  text-align: right;
}

.detail-row.total {
  padding-top: 0;
  border-top: none;
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.04vw, 20px);
  color: #333333;
}

.view-discount {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  font-style: normal;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #00699A;
  text-decoration: none;
  text-align: right;
}

.guarantees {
  padding-top: clamp(14px, 0.83vw, 16px);
  border-top: 1px solid #E5E7EB;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 0.42vw, 8px);
}

.guarantees p {
  font-family: 'Arial', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #1D2129;
  margin: 0;
  padding: 1px clamp(6px, 0.42vw, 8px);
  background: transparent;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  white-space: nowrap;
  height: clamp(22px, 1.25vw, 24px);
  display: flex;
  align-items: center;
}

/* Address Forms */
.address-form {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.63vw, 12px);
  flex: 1;
}

.same-address {
  display: flex;
  align-items: center;
}

.same-address :deep(.form-check) {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.same-address :deep(.form-check-input) {
  margin: 0;
  flex-shrink: 0;
}

.same-address :deep(.form-check-label) {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #000000;
  opacity: 0.9;
  cursor: pointer;
  margin: 0;
  padding-left: clamp(6px, 0.42vw, 8px);
  display: flex;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.checkbox-label :deep(.form-check) {
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.checkbox-label :deep(.form-check-input) {
  margin: 0;
  flex-shrink: 0;
}

.checkbox-label :deep(.form-check-label) {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #000000;
  opacity: 0.9;
  cursor: pointer;
  margin: 0;
  padding-left: clamp(6px, 0.42vw, 8px);
  display: flex;
  align-items: center;
}

.save-btn {
  width: 100%;
  height: clamp(44px, 2.5vw, 48px);
  padding: clamp(8px, 0.52vw, 10px) clamp(20px, 1.25vw, 24px);
  background: #333333;
  color: #FFFFFF;
  border: none;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(20px, 1.25vw, 24px);
  font-weight: 400;
  line-height: clamp(24px, 1.46vw, 28px);
  cursor: pointer;
  margin-top: clamp(20px, 1.25vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1200px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}
</style>

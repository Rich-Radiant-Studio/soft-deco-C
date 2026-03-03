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
                  <div class="header-checkbox" v-if="cartItems.length > 0">
                    <BFormCheckbox v-model="selectAll" @change="toggleSelectAll" />
                  </div>
                  <div class="header-checkbox-empty" v-else></div>
                  <div class="header-commodity">Commodity</div>
                  <div class="header-unit-price">Unit price</div>
                  <div class="header-quantity">Quantity</div>
                  <div class="header-subtotal">Subtotal</div>
                  <div class="header-operation">Operation</div>
                </div>
                
                <!-- Empty State -->
                <div v-if="cartItems.length === 0" class="cart-empty-state">
                  <div class="empty-icon">
                    <svg width="80" height="80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 0H26V8H22V0Z" fill="black" fill-opacity="0.4"/>
                      <path d="M10.002 1.17157L7.17353 4L13.002 9.82843L15.8304 7L10.002 1.17157Z" fill="black" fill-opacity="0.4"/>
                      <path d="M2 27.4689L10.8394 12H37.1606L46 27.4689V44H2V27.4689ZM13.1606 16L7.44636 26H17.8025L18.1889 27.5015C18.8551 30.0898 21.207 32 24 32C26.793 32 29.1449 30.0898 29.8111 27.5015L30.1975 26H40.5536L34.8394 16H13.1606Z" fill="black" fill-opacity="0.4"/>
                      <path d="M37.998 1.17157L32.1696 7L34.998 9.82843L40.8265 4L37.998 1.17157Z" fill="black" fill-opacity="0.4"/>
                    </svg>
                  </div>
                  <h3 class="empty-title">Your cart is empty</h3>
                  <p class="empty-description">Browse our selections below</p>
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
            <div v-if="cartItems.length > 0" class="cart-module">
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
            <div v-if="cartItems.length > 0" class="cart-module">
              <h2 class="module-title">Payment Information</h2>
              
              <!-- Saved Payment Methods Display -->
              <div v-if="savedPaymentMethods.length > 0" class="saved-payment-methods">
                <div 
                  v-for="method in savedPaymentMethods" 
                  :key="method.id"
                  class="saved-payment-card"
                  :class="{ active: selectedPaymentId === method.id }"
                  @click="selectedPaymentId = method.id"
                >
                  <div class="saved-card-header">
                    <div class="saved-card-title">
                      <img :src="getPaymentIcon(method.type)" :alt="method.type" class="saved-payment-icon">
                      <span class="saved-card-type">{{ getPaymentTypeName(method.type) }}</span>
                    </div>
                    <div class="saved-card-check" v-if="selectedPaymentId === method.id">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="10" fill="#00699A"/>
                        <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div class="saved-card-info">
                    <p class="saved-card-number">Card number: {{ method.cardNumber }}</p>
                    <p class="saved-card-holder">Cardholder: {{ method.cardholderName }}</p>
                    <p class="saved-card-validity">Validity period: {{ method.validityPeriod }}</p>
                    <p class="saved-card-address">Billing Address: {{ method.billingAddress }}</p>
                  </div>
                </div>
                
                <!-- Add New Payment Method Button -->
                <button class="add-payment-btn" @click="openPaymentForm">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 4V16M4 10H16" stroke="#00699A" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  Add Payment Method
                </button>
              </div>
              
              <!-- Payment Form (for new or first payment) -->
              <div v-if="savedPaymentMethods.length === 0 || showPaymentForm" class="payment-form-section">
                <div class="payment-methods">
                  <button 
                    v-if="!hasPaymentType('visa')"
                    class="payment-method" 
                    :class="{ active: paymentMethod === 'visa' }" 
                    @click="paymentMethod = 'visa'"
                  >
                    <img src="@/assets/images/sprites/VISA 1.png" alt="VISA" class="payment-icon payment-icon-visa">
                    Credit Card
                  </button>
                  <button 
                    v-if="!hasPaymentType('paypal')"
                    class="payment-method" 
                    :class="{ active: paymentMethod === 'paypal' }" 
                    @click="paymentMethod = 'paypal'"
                  >
                    <img src="@/assets/images/sprites/PayPal.png" alt="PayPal" class="payment-icon payment-icon-paypal">
                    PayPal
                  </button>
                  <button 
                    v-if="!hasPaymentType('apple')"
                    class="payment-method" 
                    :class="{ active: paymentMethod === 'apple' }" 
                    @click="paymentMethod = 'apple'"
                  >
                    <img src="@/assets/images/sprites/ApplePay.png" alt="Apple Pay" class="payment-icon payment-icon-paypal">
                    Apple Pay
                  </button>
                </div>
                <div class="payment-form">
                  <div class="form-row">
                    <div class="form-input-wrapper">
                      <input type="text" v-model="paymentForm.cardNumber" placeholder="Card number" class="form-input">
                    </div>
                    <div class="form-input-wrapper">
                      <input type="text" v-model="paymentForm.cardholderName" placeholder="Cardholder Name" class="form-input">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-input-wrapper">
                      <input type="text" v-model="paymentForm.validityPeriod" placeholder="Validity period" class="form-input">
                    </div>
                    <div class="form-input-wrapper">
                      <input type="text" v-model="paymentForm.securityCode" placeholder="Security code" class="form-input">
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-input-wrapper">
                      <input type="text" v-model="paymentForm.postalCode" placeholder="Postal code" class="form-input">
                    </div>
                    <div class="form-input-placeholder"></div>
                  </div>
                </div>
                <div v-if="showPaymentForm" class="payment-form-actions">
                  <button class="cancel-payment-btn" @click="cancelPaymentForm">Cancel</button>
                </div>
              </div>
              
              <button class="pay-now-btn" @click="handlePayNow">Pay Now ${{ totalAmount }}</button>
              <p class="security-note">Your payment is protected by 256 bit SSL encryption</p>
            </div>
          </div>
          
          <!-- Right Section -->
          <div class="right-section">
            <!-- Order Details -->
            <div v-if="cartItems.length > 0" class="cart-module">
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
            <div v-if="cartItems.length > 0" class="cart-module">
              <h2 class="module-title">Billing Address</h2>
              <div class="address-form">
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" v-model="billingAddress.name" placeholder="Name" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <input type="text" v-model="billingAddress.surname" placeholder="Surname" class="form-input">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <select v-model="billingAddress.street" class="form-input full-width">
                      <option value="">Street</option>
                      <option value="Main Street">Main Street</option>
                      <option value="Oak Avenue">Oak Avenue</option>
                      <option value="Park Road">Park Road</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <input type="text" v-model="billingAddress.address" placeholder="Address" class="form-input full-width">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <select v-model="billingAddress.city" class="form-input">
                      <option value="">City</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                    </select>
                  </div>
                  <div class="form-input-wrapper">
                    <select v-model="billingAddress.state" class="form-input">
                      <option value="">State</option>
                      <option value="NY">NY</option>
                      <option value="CA">CA</option>
                      <option value="IL">IL</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" v-model="billingAddress.postalCode" placeholder="Postal code" class="form-input">
                  </div>
                  <div class="form-input-wrapper">
                    <select v-model="billingAddress.country" class="form-input">
                      <option value="">Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Receiving Address -->
            <div class="cart-module">
              <div class="module-header">
                <h2 class="module-title">Receiving address</h2>
                <div class="same-address" v-if="showAddressForm">
                  <BFormCheckbox v-model="sameAsBilling">
                    Same as billing address
                  </BFormCheckbox>
                </div>
              </div>
              
              <!-- Saved Addresses Display -->
              <div v-if="!showAddressForm && savedAddresses.length > 0" class="saved-addresses">
                <div 
                  v-for="address in savedAddresses" 
                  :key="address.id"
                  class="saved-address-card"
                  :class="{ active: selectedAddressId === address.id }"
                  @click="selectAddress(address.id)"
                >
                  <div class="address-card-header">
                    <h3 class="address-card-name">{{ address.name }}</h3>
                    <button 
                      v-if="selectedAddressId === address.id"
                      class="address-default-btn"
                    >
                      Default
                    </button>
                  </div>
                  <div class="address-card-info">
                    <p class="address-card-detail"><span class="address-label">Address:</span> {{ address.address }}</p>
                    <p class="address-card-detail"><span class="address-label">telephone:</span> {{ address.telephone }}</p>
                    <p class="address-card-detail"><span class="address-label">postal code:</span> {{ address.postalCode }}</p>
                  </div>
                  <div v-if="address.notConstructionSite" class="address-card-note">
                    Not the construction site
                  </div>
                </div>
              </div>
              
              <!-- Address Form -->
              <div v-if="showAddressForm" class="address-form">
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" v-model="receivingAddress.name" placeholder="Name" class="form-input" :disabled="sameAsBilling">
                  </div>
                  <div class="form-input-wrapper">
                    <input type="text" v-model="receivingAddress.surname" placeholder="Surname" class="form-input" :disabled="sameAsBilling">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <select v-model="receivingAddress.street" class="form-input full-width" :disabled="sameAsBilling">
                      <option value="">Street</option>
                      <option value="Main Street">Main Street</option>
                      <option value="Oak Avenue">Oak Avenue</option>
                      <option value="Park Road">Park Road</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper full-width">
                    <input type="text" v-model="receivingAddress.address" placeholder="Address" class="form-input full-width" :disabled="sameAsBilling">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <select v-model="receivingAddress.city" class="form-input" :disabled="sameAsBilling">
                      <option value="">City</option>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                      <option value="Chicago">Chicago</option>
                    </select>
                  </div>
                  <div class="form-input-wrapper">
                    <select v-model="receivingAddress.state" class="form-input" :disabled="sameAsBilling">
                      <option value="">State</option>
                      <option value="NY">NY</option>
                      <option value="CA">CA</option>
                      <option value="IL">IL</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-input-wrapper">
                    <input type="text" v-model="receivingAddress.postalCode" placeholder="Postal code" class="form-input" :disabled="sameAsBilling">
                  </div>
                  <div class="form-input-wrapper">
                    <select v-model="receivingAddress.country" class="form-input" :disabled="sameAsBilling">
                      <option value="">Country</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                    </select>
                  </div>
                </div>
                <div class="form-row">
                  <div class="checkbox-label">
                    <BFormCheckbox v-model="notConstructionSite">
                      Not the construction site
                    </BFormCheckbox>
                  </div>
                </div>
              </div>
              
              <button v-if="showAddressForm" class="save-btn" @click="saveReceivingAddress">Save</button>
              <button v-else class="save-btn" @click="addNewAddress">Add New Address</button>
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
import { ref, computed, watch, onMounted } from 'vue'
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

interface SavedPaymentMethod {
  id: number
  type: 'visa' | 'paypal' | 'apple'
  cardNumber: string
  cardholderName: string
  validityPeriod: string
  billingAddress: string
}

interface PaymentForm {
  cardNumber: string
  cardholderName: string
  validityPeriod: string
  securityCode: string
  postalCode: string
}

interface AddressForm {
  name: string
  surname: string
  street: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface SavedAddress {
  id: number
  name: string
  address: string
  telephone: string
  postalCode: string
  notConstructionSite: boolean
}

const cartItems = ref<CartItem[]>([
  {
    id: 1,
    name: 'Product Name 1',
    image: 'https://via.placeholder.com/160x120',
    specs: ['Color: Black', 'Size: Large'],
    price: 99.99,
    quantity: 2,
    selected: true
  },
  {
    id: 2,
    name: 'Product Name 2',
    image: 'https://via.placeholder.com/160x120',
    specs: ['Color: White', 'Size: Medium'],
    price: 149.99,
    quantity: 1,
    selected: true
  },
  {
    id: 3,
    name: 'Product Name 3',
    image: 'https://via.placeholder.com/160x120',
    specs: ['Color: Blue', 'Size: Small'],
    price: 79.99,
    quantity: 3,
    selected: true
  }
])

const selectAll = ref(true)
const deliveryMethod = ref('standard')
const paymentMethod = ref('visa')
const sameAsBilling = ref(false)

// Address forms
const billingAddress = ref<AddressForm>({
  name: '',
  surname: '',
  street: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: ''
})

const receivingAddress = ref<AddressForm>({
  name: '',
  surname: '',
  street: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: ''
})

const notConstructionSite = ref(false)

// Saved addresses
const savedAddresses = ref<SavedAddress[]>([])
const selectedAddressId = ref<number | null>(null)
const showAddressForm = ref(true)

// Load saved addresses from localStorage on mount
onMounted(() => {
  const savedAddr = localStorage.getItem('savedAddresses')
  if (savedAddr) {
    try {
      const parsed = JSON.parse(savedAddr)
      savedAddresses.value = parsed
      if (parsed.length > 0) {
        selectedAddressId.value = parsed[0].id
        showAddressForm.value = false
      }
    } catch (e) {
      console.error('Failed to parse saved addresses:', e)
    }
  }
})

// Payment related states
const savedPaymentMethods = ref<SavedPaymentMethod[]>([])
const selectedPaymentId = ref<number | null>(null)
const showPaymentForm = ref(false)
const paymentForm = ref<PaymentForm>({
  cardNumber: '',
  cardholderName: '',
  validityPeriod: '',
  securityCode: '',
  postalCode: ''
})

// Load saved payment methods from localStorage on mount
onMounted(() => {
  const saved = localStorage.getItem('savedPaymentMethods')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      savedPaymentMethods.value = parsed
      if (parsed.length > 0) {
        selectedPaymentId.value = parsed[0].id
        showPaymentForm.value = false
      } else {
        showPaymentForm.value = true
      }
    } catch (e) {
      console.error('Failed to parse saved payment methods:', e)
      showPaymentForm.value = true
    }
  } else {
    showPaymentForm.value = true
  }
})

const getPaymentIcon = (type: string) => {
  const icons: Record<string, string> = {
    visa: '/src/assets/images/sprites/VISA 1.png',
    paypal: '/src/assets/images/sprites/PayPal.png',
    apple: '/src/assets/images/sprites/ApplePay.png'
  }
  return icons[type] || ''
}

const getPaymentTypeName = (type: string) => {
  const names: Record<string, string> = {
    visa: '信用卡',
    paypal: 'PayPal',
    apple: 'Apple Pay'
  }
  return names[type] || type
}

const hasPaymentType = (type: string) => {
  return savedPaymentMethods.value.some(method => method.type === type)
}

const getFirstAvailablePaymentType = () => {
  const types: ('visa' | 'paypal' | 'apple')[] = ['visa', 'paypal', 'apple']
  return types.find(type => !hasPaymentType(type)) || 'visa'
}

const openPaymentForm = () => {
  showPaymentForm.value = true
  paymentMethod.value = getFirstAvailablePaymentType()
}

const handlePayNow = () => {
  // 准备支付信息数据
  let paymentDataToSave = null
  
  // 如果是新填写的支付信息，准备保存数据
  if (savedPaymentMethods.value.length === 0 || showPaymentForm.value) {
    const newMethod: SavedPaymentMethod = {
      id: Date.now(),
      type: paymentMethod.value as 'visa' | 'paypal' | 'apple',
      cardNumber: paymentForm.value.cardNumber || '**** **** **** 1234',
      cardholderName: paymentForm.value.cardholderName || 'Sophia',
      validityPeriod: paymentForm.value.validityPeriod || '12/2029',
      billingAddress: `John Smith 123 Main Street, Apt 4B New York, NY 10001 United States`
    }
    
    paymentDataToSave = [...savedPaymentMethods.value, newMethod]
  }
  
  // 在跳转前保存到 localStorage（不更新响应式状态，避免触发重新渲染）
  if (paymentDataToSave) {
    localStorage.setItem('savedPaymentMethods', JSON.stringify(paymentDataToSave))
  }
  
  // 立即跳转到支付成功页面
  window.location.href = '/payment-success'
}

const cancelPaymentForm = () => {
  showPaymentForm.value = false
  paymentForm.value = {
    cardNumber: '',
    cardholderName: '',
    validityPeriod: '',
    securityCode: '',
    postalCode: ''
  }
}

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

// Watch sameAsBilling checkbox
watch(sameAsBilling, (newValue) => {
  if (newValue) {
    // Copy billing address to receiving address
    receivingAddress.value = { ...billingAddress.value }
  } else {
    // Clear receiving address
    receivingAddress.value = {
      name: '',
      surname: '',
      street: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  }
})

// Watch billing address changes when sameAsBilling is true
watch(billingAddress, (newValue) => {
  if (sameAsBilling.value) {
    receivingAddress.value = { ...newValue }
  }
}, { deep: true })

const saveReceivingAddress = () => {
  const fullAddress = `${receivingAddress.value.address}, ${receivingAddress.value.city}, ${receivingAddress.value.state} ${receivingAddress.value.postalCode} ${receivingAddress.value.country}`
  
  const newAddress: SavedAddress = {
    id: Date.now(),
    name: `${receivingAddress.value.name} ${receivingAddress.value.surname}`.trim() || 'Sophia',
    address: fullAddress || '123 Main Street, Apt 4B New York, NY 10001 United States',
    telephone: '(212) 555-1234',
    postalCode: receivingAddress.value.postalCode || '853100',
    notConstructionSite: notConstructionSite.value
  }
  
  savedAddresses.value.push(newAddress)
  selectedAddressId.value = newAddress.id
  showAddressForm.value = false
  
  // Save to localStorage
  localStorage.setItem('savedAddresses', JSON.stringify(savedAddresses.value))
}

const selectAddress = (id: number) => {
  selectedAddressId.value = id
}

const addNewAddress = () => {
  showAddressForm.value = true
  sameAsBilling.value = false
  receivingAddress.value = {
    name: '',
    surname: '',
    street: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  }
  notConstructionSite.value = false
}

const cancelAddressForm = () => {
  showAddressForm.value = false
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

.header-checkbox-empty {
  width: 40px;
}

/* Empty State */
.cart-empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(60px, 5vw, 100px) clamp(20px, 2vw, 40px);
  text-align: center;
  gap: clamp(6px, 0.42vw, 8px);
  width: fit-content;
  margin: 0 auto;
}

.empty-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon svg {
  width: clamp(60px, 4.17vw, 80px);
  height: clamp(60px, 4.17vw, 80px);
  display: block;
}

.empty-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(18px, 1.25vw, 24px);
  font-weight: 700;
  line-height: clamp(24px, 1.67vw, 32px);
  letter-spacing: 0;
  color: #333333;
  margin: 0;
}

.empty-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #000000;
  opacity: 0.6;
  text-align: center;
  margin: 0;
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
.saved-payment-methods {
  display: flex;
  gap: clamp(12px, 0.83vw, 16px);
  margin-bottom: clamp(16px, 1.04vw, 20px);
  flex-wrap: wrap;
}

.saved-payment-card {
  flex: 1;
  min-width: clamp(280px, 20vw, 320px);
  padding: clamp(16px, 1.04vw, 20px);
  border: 2px solid #E5E6EB;
  border-radius: clamp(6px, 0.42vw, 8px);
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.saved-payment-card:hover {
  border-color: #00699A;
}

.saved-payment-card.active {
  border-color: #00699A;
  background: #F7FAFC;
}

.saved-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(12px, 0.83vw, 16px);
  padding-bottom: clamp(8px, 0.52vw, 10px);
  border-bottom: 1px solid #E5E6EB;
}

.saved-card-title {
  display: flex;
  align-items: center;
  gap: clamp(6px, 0.42vw, 8px);
}

.saved-payment-icon {
  height: clamp(16px, 1.04vw, 20px);
  width: auto;
  object-fit: contain;
}

.saved-card-type {
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(18px, 1.04vw, 20px);
  color: #333333;
}

.saved-card-check svg {
  display: block;
}

.saved-card-info {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.42vw, 8px);
}

.saved-card-info p {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(16px, 1.04vw, 20px);
  color: #5C5C5C;
  margin: 0;
}

.add-payment-btn {
  flex: 1;
  min-width: clamp(280px, 20vw, 320px);
  padding: clamp(16px, 1.04vw, 20px);
  border: 2px dashed #00699A;
  border-radius: clamp(6px, 0.42vw, 8px);
  background: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 0.42vw, 8px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 500;
  color: #00699A;
  transition: all 0.2s;
  min-height: clamp(140px, 10vw, 160px);
}

.add-payment-btn:hover {
  background: #F7FAFC;
}

.payment-form-section {
  margin-bottom: clamp(16px, 1.04vw, 20px);
}

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

.form-input:disabled {
  background-color: #F5F5F5;
  cursor: not-allowed;
  opacity: 0.6;
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

.payment-form-actions {
  display: flex;
  gap: clamp(8px, 0.63vw, 12px);
  margin-bottom: clamp(16px, 1.04vw, 20px);
  justify-content: flex-end;
}

.cancel-payment-btn {
  height: clamp(40px, 2.5vw, 48px);
  padding: clamp(8px, 0.52vw, 10px) clamp(20px, 1.25vw, 24px);
  background: white;
  color: #333333;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(14px, 0.83vw, 16px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-payment-btn:hover {
  background: #F5F5F5;
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
.saved-addresses {
  display: flex;
  flex-direction: column;
  gap: clamp(13px, 0.83vw, 16px);
  margin-bottom: clamp(16px, 1.04vw, 20px);
  max-height: calc(clamp(130px, 8.44vw, 162px) * 3 + clamp(13px, 0.83vw, 16px) * 2);
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏滚动条 - Webkit浏览器 */
.saved-addresses::-webkit-scrollbar {
  display: none;
}

.saved-address-card {
  padding: clamp(13px, 0.83vw, 16px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  min-height: clamp(130px, 8.44vw, 162px);
  display: flex;
  flex-direction: column;
}

.saved-address-card:hover {
  border-color: #00699A;
}

.saved-address-card.active {
  border-color: #00699A;
  background: #F7FAFC;
}

.address-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(12px, 0.83vw, 16px);
}

.address-card-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(19px, 1.25vw, 24px);
  font-weight: 400;
  line-height: clamp(22px, 1.46vw, 28px);
  letter-spacing: 0;
  color: #333333;
  margin: 0;
}

.address-default-btn {
  padding: clamp(4px, 0.26vw, 5px) clamp(12px, 0.83vw, 16px);
  background: #00699A;
  color: white;
  border: none;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 500;
  cursor: default;
}

.address-card-info {
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 0.42vw, 8px);
}

.address-card-info .address-card-detail {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  margin: 0;
}

.address-label {
  font-weight: 400;
  color: #5C5C5C;
}

.address-card-note {
  padding: clamp(6px, 0.42vw, 8px) clamp(12px, 0.83vw, 16px);
  background: #F5F5F5;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  color: #5C5C5C;
  margin-top: clamp(8px, 0.52vw, 10px);
}

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

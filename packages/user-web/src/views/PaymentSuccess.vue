<template>
  <div class="payment-success-page">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="success-content">
      <div class="success-container">
        <!-- Success Header Section -->
        <div class="success-header">
          <!-- Success Icon -->
          <div class="success-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24ZM22 31.8285L34.9142 18.9142L32.0858 16.0858L22 26.1716L16.4142 20.5858L13.5858 23.4142L22 31.8285Z" fill="#00699A"/>
            </svg>
          </div>
          
          <!-- Success Title -->
          <h1 class="success-title">Payment successful</h1>
          
          <!-- Success Message -->
          <p class="success-message">
            Thank you for your order. Your payment has been successfully processed
          </p>
          <p class="success-email">
            The confirmation email has been sent to <span class="email-address">customer@example.com</span>
          </p>
          
          <!-- Order Confirmation Number -->
          <div class="order-number">
            <span class="order-tag">Order Confirmation Number: <strong>#HD-2023-78945</strong></span>
          </div>
        </div>
        
        <!-- Order Details Section -->
        <div class="order-details-section">
          <!-- Order Status Timeline -->
          <div class="order-timeline">
            <div class="timeline-item active">
              <div class="timeline-dot"></div>
              <span class="timeline-label">Order placed</span>
            </div>
            <div class="timeline-line"></div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <span class="timeline-label">Processing</span>
            </div>
            <div class="timeline-line"></div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <span class="timeline-label">Shipped</span>
            </div>
            <div class="timeline-line"></div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <span class="timeline-label">Delivered</span>
            </div>
          </div>
          
          <!-- Order Summary -->
          <div class="order-summary">
            <h2 class="summary-title">Order Summary</h2>
            
            <div class="summary-row">
              <span class="summary-label">Order Date:</span>
              <span class="summary-value">January 15, 2026</span>
            </div>
            
            <div class="summary-row">
              <span class="summary-label">Total number of products:</span>
              <span class="summary-value">$327.50</span>
            </div>
            
            <div class="summary-row">
              <span class="summary-label">Shipping cost:</span>
              <span class="summary-value">$20.00</span>
            </div>
            
            <div class="summary-row">
              <span class="summary-label">Taxes and fees:</span>
              <span class="summary-value">$26.20</span>
            </div>
            
            <div class="summary-row total">
              <span class="summary-label">Total Amount:</span>
              <span class="summary-value">$373.70</span>
            </div>
            
            <div class="summary-row">
              <span class="summary-label">Payment Method:</span>
              <span class="summary-value">Credit Card [************ 1234]</span>
            </div>
          </div>
          
          <!-- Delivery Information -->
          <div class="delivery-info">
            <h2 class="delivery-title">Delivery Information</h2>
            
            <div class="delivery-row">
              <span class="delivery-label">Receiving address:</span>
              <span class="delivery-value">123 Main Street, Apt 4B, New York, NY 10001</span>
            </div>
            
            <div class="delivery-row">
              <span class="delivery-label">Estimated delivery:</span>
              <span class="delivery-value">January 18-20, 2026</span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="btn-primary" @click="viewOrderDetails">View order details</button>
            <button class="btn-secondary" @click="continueShopping">Continue Shopping</button>
            <button class="btn-secondary" @click="printReceipt">Print receipt</button>
          </div>
        </div>
        
        <!-- What's Next Section -->
        <div class="whats-next">
          <h2 class="whats-next-title">What will happen next?</h2>
          
          <div class="next-steps">
            <div class="next-step">
              <div class="step-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#F5F5F5"/>
                  <path d="M12 20H28M12 14H28M12 26H20" stroke="#333333" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <h3 class="step-title">Order Processing</h3>
              <p class="step-description">We will prepare a shipper for you product</p>
            </div>
            
            <div class="next-step">
              <div class="step-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#F5F5F5"/>
                  <path d="M8 20H24M24 20L18 14M24 20L18 26M28 12V28" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="step-title">Delivery and Delivery</h3>
              <p class="step-description">Your order is about to be shipped out</p>
            </div>
            
            <div class="next-step">
              <div class="step-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="#F5F5F5"/>
                  <path d="M20 12V20L26 23M32 20C32 26.6274 26.6274 32 20 32C13.3726 32 8 26.6274 8 20C8 13.3726 13.3726 8 20 8C26.6274 8 32 13.3726 32 20Z" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="step-title">Door-to-door delivery</h3>
              <p class="step-description">Receive your goods at your doorstep</p>
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
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()

const viewOrderDetails = () => {
  // Navigate to order details page
  console.log('View order details')
}

const continueShopping = () => {
  router.push('/')
}

const printReceipt = () => {
  window.print()
}
</script>

<style scoped>
.payment-success-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
}

.success-content {
  flex: 1;
  padding: clamp(20px, 1.46vw, 28px) clamp(16px, 1.25vw, 24px);
  display: flex;
  justify-content: center;
}

.success-container {
  width: 100%;
  max-width: clamp(500px, 32.29vw, 620px);
  background: white;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(19px, 1.25vw, 24px);
  box-sizing: border-box;
}

/* Success Header Section */
.success-header {
  display: flex;
  flex-direction: column;
  gap: clamp(13px, 0.83vw, 16px);
  margin-bottom: clamp(20px, 1.46vw, 28px);
}

/* Success Icon */
.success-icon {
  display: flex;
  justify-content: center;
}

.success-icon svg {
  width: 48px;
  height: 48px;
}

/* Success Title */
.success-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(19px, 1.25vw, 24px);
  font-weight: 700;
  line-height: clamp(26px, 1.67vw, 32px);
  letter-spacing: 0;
  text-align: center;
  color: #333333;
  margin: 0;
}

/* Success Message */
.success-message {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  text-align: center;
  color: #5C5C5C;
  margin: 0;
}

.success-email {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  text-align: center;
  color: #5C5C5C;
  margin: 0;
}

.email-address {
  color: #00699A;
  font-weight: 500;
  margin-left: clamp(6px, 0.42vw, 8px);
}

/* Order Number */
.order-number {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.order-tag {
  display: inline-flex;
  align-items: center;
  padding: clamp(10px, 0.63vw, 12px);
  background: #F4F4F4;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #5C5C5C;
}

.order-tag strong {
  font-weight: 700;
  color: #333333;
  margin-left: clamp(8px, 0.52vw, 10px);
}

/* Order Details Section */
.order-details-section {
  display: flex;
  flex-direction: column;
  gap: clamp(19px, 1.25vw, 24px);
}

/* Order Timeline */
.order-timeline {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 clamp(16px, 1.25vw, 24px);
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(6px, 0.42vw, 8px);
}

.timeline-dot {
  width: clamp(10px, 0.63vw, 12px);
  height: clamp(10px, 0.63vw, 12px);
  border-radius: 50%;
  background: #E5E6EB;
  border: 2px solid #E5E6EB;
}

.timeline-item.active .timeline-dot {
  background: #333333;
  border-color: #333333;
}

.timeline-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(10px, 0.63vw, 12px);
  font-weight: 400;
  color: #999999;
  white-space: nowrap;
}

.timeline-item.active .timeline-label {
  color: #333333;
  font-weight: 500;
}

.timeline-line {
  flex: 1;
  height: 2px;
  background: #E5E6EB;
  margin: 0 clamp(6px, 0.42vw, 8px);
  margin-bottom: clamp(20px, 1.25vw, 24px);
}

/* Order Summary */
.order-summary {
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  padding: clamp(13px, 0.83vw, 16px);
}

.summary-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(16px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 clamp(12px, 0.83vw, 16px) 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: clamp(8px, 0.52vw, 10px);
}

.summary-row.total {
  margin-top: clamp(12px, 0.83vw, 16px);
  padding-top: clamp(12px, 0.83vw, 16px);
  border-top: 1px solid #E5E6EB;
}

.summary-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #5C5C5C;
}

.summary-value {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  text-align: right;
}

.summary-row.total .summary-label,
.summary-row.total .summary-value {
  font-weight: 700;
  font-size: clamp(14px, 0.83vw, 16px);
}

/* Delivery Information */
.delivery-info {
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  padding: clamp(13px, 0.83vw, 16px);
}

.delivery-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(16px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 clamp(12px, 0.83vw, 16px) 0;
}

.delivery-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: clamp(8px, 0.52vw, 10px);
  gap: clamp(12px, 0.83vw, 16px);
}

.delivery-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #5C5C5C;
  flex-shrink: 0;
}

.delivery-value {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  text-align: right;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: clamp(8px, 0.63vw, 12px);
  flex-wrap: wrap;
}

.btn-primary {
  flex: 1;
  min-width: clamp(140px, 10vw, 160px);
  height: clamp(36px, 2.29vw, 44px);
  padding: clamp(8px, 0.52vw, 10px) clamp(16px, 1.04vw, 20px);
  background: #333333;
  color: white;
  border: none;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #1a1a1a;
}

.btn-secondary {
  flex: 1;
  min-width: clamp(140px, 10vw, 160px);
  height: clamp(36px, 2.29vw, 44px);
  padding: clamp(8px, 0.52vw, 10px) clamp(16px, 1.04vw, 20px);
  background: white;
  color: #333333;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #F5F5F5;
}

/* What's Next Section */
.whats-next {
  margin-top: clamp(19px, 1.25vw, 24px);
}

.whats-next-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(16px, 1.04vw, 20px);
  font-weight: 700;
  line-height: clamp(20px, 1.46vw, 28px);
  color: #333333;
  text-align: center;
  margin: 0 0 clamp(16px, 1.04vw, 20px) 0;
}

.next-steps {
  display: flex;
  gap: clamp(12px, 0.83vw, 16px);
  justify-content: space-between;
}

.next-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-icon {
  margin-bottom: clamp(8px, 0.52vw, 10px);
}

.step-icon svg {
  width: clamp(32px, 2.08vw, 40px);
  height: clamp(32px, 2.08vw, 40px);
}

.step-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 600;
  line-height: clamp(16px, 1.04vw, 20px);
  color: #333333;
  margin: 0 0 clamp(4px, 0.26vw, 5px) 0;
}

.step-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(10px, 0.63vw, 12px);
  font-weight: 400;
  line-height: clamp(14px, 0.94vw, 18px);
  color: #999999;
  margin: 0;
}

@media print {
  .action-buttons {
    display: none;
  }
}
</style>

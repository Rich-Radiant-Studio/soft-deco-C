<template>
  <div class="payment-failed-page">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="failed-content">
      <div class="failed-container">
        <!-- Failed Header Section -->
        <div class="failed-header">
          <!-- Failed Icon -->
          <div class="failed-icon">
            <SvgIcon name="payment-failed" size="48px" />
          </div>
          
          <!-- Failed Title -->
          <h1 class="failed-title">Payment failed</h1>
          
          <!-- Failed Message -->
          <p class="failed-message">
            Sorry, we are unable to process your payment.
          </p>
        </div>
        
        <!-- Order Information Section -->
        <div class="order-info-section">
          <h2 class="section-title">Order Information</h2>
          
          <div class="info-row">
            <span class="info-label">Order Number:</span>
            <span class="info-value">#HD-2023-78945</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Order Date:</span>
            <span class="info-value">January 15, 2026</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Total number of products:</span>
            <span class="info-value">$327.50</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">Payment Method:</span>
            <span class="info-value">Credit Card [************ 1234]</span>
          </div>
        </div>
        
        <!-- Failure Reasons Section -->
        <div class="failure-reasons-section">
          <h2 class="section-title">Possible reasons for failure</h2>
          
          <div class="reason-list">
            <div class="reason-item">
              <span class="reason-icon">◆</span>
              <span class="reason-text">Insufficient account balance</span>
            </div>
            <div class="reason-item">
              <span class="reason-icon">◆</span>
              <span class="reason-text">The card information entered is incorrect</span>
            </div>
            <div class="reason-item">
              <span class="reason-icon">◆</span>
              <span class="reason-text">The card may have expired</span>
            </div>
            <div class="reason-item">
              <span class="reason-icon">◆</span>
              <span class="reason-text">Temporary issue with payment processor</span>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-primary" @click="retryPayment">Repayment</button>
          <button class="btn-secondary" @click="changePaymentMethod">Change payment method</button>
          <button class="btn-secondary" @click="backToCart">Back to Shopping Cart</button>
        </div>
        
        <!-- Need Assistance Section -->
        <div class="assistance-section">
          <h2 class="assistance-title">Need payment assistance?</h2>
          
          <div class="contact-methods">
            <div class="contact-item">
              <div class="contact-icon">
                <SvgIcon name="phone" size="24px" />
              </div>
              <h3 class="contact-title">phone consultation</h3>
              <p class="contact-info">400-888-8888</p>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <SvgIcon name="email" size="24px" />
              </div>
              <h3 class="contact-title">Email contact</h3>
              <p class="contact-info">contact@jianyi.com</p>
            </div>
            
            <div class="contact-item">
              <div class="contact-icon">
                <SvgIcon name="customer-service" size="24px" />
              </div>
              <h3 class="contact-title">Online Customer Service</h3>
              <p class="contact-info">24/7 online</p>
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
import SvgIcon from '@/components/SvgIcon.vue'

const router = useRouter()

const retryPayment = () => {
  // Retry payment logic
  console.log('Retry payment')
}

const changePaymentMethod = () => {
  // Navigate back to cart to change payment method
  router.push('/cart')
}

const backToCart = () => {
  router.push('/cart')
}
</script>

<style scoped>
.payment-failed-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
}

.failed-content {
  flex: 1;
  padding: clamp(20px, 1.46vw, 28px) clamp(16px, 1.25vw, 24px);
  display: flex;
  justify-content: center;
}

.failed-container {
  width: 100%;
  max-width: clamp(500px, 32.29vw, 620px);
  background: white;
  border-radius: clamp(6px, 0.42vw, 8px);
  padding: clamp(19px, 1.25vw, 24px);
  box-sizing: border-box;
}

/* Failed Header Section */
.failed-header {
  display: flex;
  flex-direction: column;
  gap: clamp(13px, 0.83vw, 16px);
  margin-bottom: clamp(32px, 2.08vw, 40px);
}

/* Failed Icon */
.failed-icon {
  display: flex;
  justify-content: center;
}

.failed-icon svg {
  width: 48px;
  height: 48px;
}

/* Failed Title */
.failed-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(19px, 1.25vw, 24px);
  font-weight: 700;
  line-height: clamp(26px, 1.67vw, 32px);
  letter-spacing: 0;
  text-align: center;
  color: #333333;
  margin: 0;
}

/* Failed Message */
.failed-message {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  text-align: center;
  color: #5C5C5C;
  margin: 0;
}

/* Order Information Section */
.order-info-section {
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  padding: clamp(13px, 0.83vw, 16px);
  margin-bottom: clamp(19px, 1.25vw, 24px);
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(16px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 clamp(20px, 1.25vw, 24px) 0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: clamp(20px, 1.25vw, 24px) 0;
  border-bottom: 1px solid #E5E6EB;
}

.info-row:last-child {
  border-bottom: none;
  padding-bottom: clamp(6px, 0.42vw, 8px);
}

.info-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
}

.info-value {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  text-align: right;
}

/* Failure Reasons Section */
.failure-reasons-section {
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  padding: clamp(13px, 0.83vw, 16px);
  margin-bottom: clamp(19px, 1.25vw, 24px);
}

.reason-list {
  display: flex;
  flex-direction: column;
  gap: clamp(12px, 0.83vw, 16px);
}

.reason-item {
  display: flex;
  align-items: flex-start;
  gap: clamp(6px, 0.42vw, 8px);
}

.reason-icon {
  font-size: clamp(8px, 0.52vw, 10px);
  color: #333333;
  flex-shrink: 0;
  margin-top: clamp(4px, 0.26vw, 5px);
}

.reason-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: clamp(6px, 0.42vw, 8px);
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: clamp(32px, 2.08vw, 40px);
}

.btn-primary {
  height: clamp(28px, 1.67vw, 32px);
  padding: clamp(4px, 0.26vw, 5px) clamp(13px, 0.83vw, 16px);
  background: #333333;
  color: white;
  border: none;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  background: #1a1a1a;
}

.btn-secondary {
  height: clamp(28px, 1.67vw, 32px);
  padding: clamp(4px, 0.26vw, 5px) clamp(13px, 0.83vw, 16px);
  background: white;
  color: #333333;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-secondary:hover {
  background: #F5F5F5;
}

/* Need Assistance Section */
.assistance-section {
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 1.25vw, 24px);
}

.assistance-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(16px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #333333;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
  gap: clamp(12px, 0.83vw, 16px);
}

.assistance-title::before,
.assistance-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E6EB;
}

.contact-methods {
  display: flex;
  gap: clamp(20px, 1.25vw, 24px);
  justify-content: space-between;
}

.contact-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.contact-icon {
  margin-bottom: clamp(8px, 0.52vw, 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333333;
}

.contact-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 clamp(4px, 0.26vw, 5px) 0;
}

.contact-info {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  margin: 0;
}
</style>

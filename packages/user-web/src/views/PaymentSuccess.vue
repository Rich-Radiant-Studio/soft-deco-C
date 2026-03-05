<template>
  <div class="payment-success-page">
    <!-- 页眉 -->
    <Header />
    
    <!-- 主要内容 -->
    <div class="success-content">
      <div class="success-container">
        <!-- 成功页眉部分 -->
        <div class="success-header">
          <!-- 成功图标 -->
          <div class="success-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24ZM22 31.8285L34.9142 18.9142L32.0858 16.0858L22 26.1716L16.4142 20.5858L13.5858 23.4142L22 31.8285Z" fill="#00699A"/>
            </svg>
          </div>
          
          <!-- 成功标题 -->
          <h1 class="success-title">Payment successful</h1>
          
          <!-- 成功消息 -->
          <p class="success-message">
            Thank you for your order. Your payment has been successfully processed
          </p>
          <p class="success-email">
            The confirmation email has been sent to <span class="email-address">customer@example.com</span>
          </p>
          
          <!-- 订单确认号 -->
          <div class="order-number">
            <span class="order-tag">Order Confirmation Number: <strong>#HD-2023-78945</strong></span>
          </div>
        </div>
        
        <!-- 订单详情部分 -->
        <div class="order-details-section">
          <!-- 订单状态时间线 -->
          <div class="order-timeline">
            <div class="timeline-column">
              <div class="timeline-dot active"></div>
              <div class="timeline-line"></div>
              <span class="timeline-label active">Order placed</span>
            </div>
            <div class="timeline-column">
              <div class="timeline-dot"></div>
              <div class="timeline-line"></div>
              <span class="timeline-label">Processing</span>
            </div>
            <div class="timeline-column">
              <div class="timeline-dot"></div>
              <div class="timeline-line"></div>
              <span class="timeline-label">Shipped</span>
            </div>
            <div class="timeline-column">
              <div class="timeline-dot"></div>
              <span class="timeline-label">Delivered</span>
            </div>
          </div>
          
          <!-- 订单摘要 -->
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
          
          <!-- 收货信息 -->
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
          
          <!-- 操作按钮 -->
          <div class="action-buttons">
            <button class="btn-primary" @click="viewOrderDetails">View order details</button>
            <button class="btn-secondary" @click="continueShopping">Continue Shopping</button>
            <button class="btn-secondary" @click="printReceipt">Print receipt</button>
          </div>
        </div>
        
        <!-- 下一步部分 -->
        <div class="whats-next">
          <h2 class="whats-next-title">What will happen next?</h2>
          
          <div class="next-steps">
            <div class="next-step">
              <div class="step-icon">
                <SvgIcon name="order-processing" />
              </div>
              <h3 class="step-title">Order Processing</h3>
              <p class="step-description">We will prepare a shipper for you product</p>
            </div>
            
            <div class="next-step">
              <div class="step-icon">
                <SvgIcon name="delivery-truck" />
              </div>
              <h3 class="step-title">Delivery and Delivery</h3>
              <p class="step-description">Your order is about to be shipped out</p>
            </div>
            
            <div class="next-step">
              <div class="step-icon">
                <SvgIcon name="door-delivery" />
              </div>
              <h3 class="step-title">Door-to-door delivery</h3>
              <p class="step-description">Receive your goods at your doorstep</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 页脚 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

const router = useRouter()

const viewOrderDetails = () => {
  // 导航到订单详情页
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

/* 成功页眉部分 */
.success-header {
  display: flex;
  flex-direction: column;
  gap: clamp(13px, 0.83vw, 16px);
  margin-bottom: clamp(32px, 2.08vw, 40px);
}

/* 成功图标 */
.success-icon {
  display: flex;
  justify-content: center;
}

.success-icon svg {
  width: 48px;
  height: 48px;
}

/* 成功标题 */
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

/* 成功消息 */
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

/* 订单号 */
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

/* 订单详情部分 */
.order-details-section {
  display: flex;
  flex-direction: column;
  gap: clamp(19px, 1.25vw, 24px);
}


/* 订单时间线 */
.order-timeline {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0;
  gap: 2px;
}

.timeline-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(6px, 0.42vw, 8px);
  position: relative;
  padding-top: clamp(16px, 1vw, 20px);
  width: 143px;
}

.timeline-dot {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(8px, 0.52vw, 10px);
  height: clamp(8px, 0.52vw, 10px);
  border-radius: 50%;
  background: var(--fill-4, #C9CDD4);
  border: 2px solid var(--fill-4, #C9CDD4);
}

.timeline-dot.active {
  background: #333333;
  border-color: #333333;
}

.timeline-line {
  position: absolute;
  top: calc(clamp(8px, 0.52vw, 10px) / 2 - 1px);
  left: calc(50% + clamp(8px, 0.52vw, 10px) / 2 + 2px);
  width: calc(143px - clamp(8px, 0.52vw, 10px) - 4px);
  height: 2px;
  background: #E5E6EB;
}

.timeline-dot.active ~ .timeline-line {
  background: #333333;
}

.timeline-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(13px, 0.83vw, 16px);
  font-weight: 500;
  line-height: clamp(20px, 1.25vw, 24px);
  letter-spacing: 0;
  color: #5C5C5C;
  white-space: nowrap;
  text-align: center;
}

.timeline-label.active {
  color: #1D2129;
  font-weight: 500;
}

/* 订单摘要 */
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
  margin: 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: clamp(20px, 1.25vw, 24px) 0;
  border-bottom: 1px solid #E5E6EB;
}

.summary-row:last-child {
  border-bottom: none;
  padding-bottom: clamp(6px, 0.42vw, 8px);
}

.summary-row.total {
  margin-top: 0;
  padding-top: clamp(20px, 1.25vw, 24px);
  border-top: none;
}

.summary-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  display: flex;
  align-items: center;
}

.summary-value {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  text-align: right;
  display: flex;
  align-items: center;
}

/* 收货信息 */
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
  margin: 0;
}

.delivery-row {
  display: flex;
  justify-content: space-between;
  padding: clamp(20px, 1.25vw, 24px) 0;
  border-bottom: 1px solid #E5E6EB;
  gap: clamp(12px, 0.83vw, 16px);
}

.delivery-row:last-child {
  border-bottom: none;
  padding-bottom: clamp(6px, 0.42vw, 8px);
}

.delivery-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.delivery-value {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  text-align: right;
  display: flex;
  align-items: center;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: clamp(6px, 0.42vw, 8px);
  flex-wrap: wrap;
  justify-content: center;
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

/* 下一步部分 */
.whats-next {
  margin-top: clamp(32px, 2.08vw, 40px);
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 1.25vw, 24px);
}

.whats-next-title {
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

.whats-next-title::before,
.whats-next-title::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #E5E6EB;
}

.next-steps {
  display: flex;
  gap: clamp(20px, 1.25vw, 24px);
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

.step-icon :deep(svg) {
  width: clamp(20px, 1.25vw, 24px);
  height: clamp(20px, 1.25vw, 24px);
}

.step-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  margin: 0 0 clamp(4px, 0.26vw, 5px) 0;
  text-align: center;
}

.step-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  margin: 0;
  text-align: center;
}

@media print {
  .action-buttons {
    display: none;
  }
}
</style>

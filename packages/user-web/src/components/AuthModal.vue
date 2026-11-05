<template>
  <teleport to="body">
    <div v-if="visible" class="auth-modal-overlay" @click.self="handleClose">
      <div class="auth-modal-container">
        <!-- 登录模态框 -->
        <div v-if="mode === 'login'" class="auth-modal">
          <button class="close-btn" @click="handleClose">×</button>
          <h2>Login your account</h2>

          <div class="role-selection login-role-selection">
            <div v-for="role in registerRoleOptions" :key="role.value" class="role-card" :class="{ active: loginForm.role === role.value }" @click="loginForm.role = role.value">
              <div class="role-icon">{{ role.icon }}</div>
              <h3>{{ role.name }}</h3>
              <p>{{ role.desc }}</p>
            </div>
          </div>
          
          <!-- 登录表单 -->
          <div class="form-wrapper">
            <div class="form-group">
              <label><span>*</span>Email</label>
              <input v-model="loginForm.email" type="email" placeholder="Email" />
            </div>
            
            <div class="form-group">
              <label><span>*</span>Password</label>
              <input v-model="loginForm.password" type="password" placeholder="Password" />
            </div>
            
            <button class="btn-primary" @click="handleLogin">LOG IN</button>
            <button class="btn-secondary" @click="switchToRegister">Register a new account</button>
            
            <div class="forgot-password">
              <a href="#" @click.prevent="handleResetPassword">Forgot Password?</a>
            </div>
          </div>

          <div class="no-account">Don't have an account? <a href="#" @click.prevent="switchToRegister">Register now</a></div>
        </div>

        <!-- 注册模态框 -->
        <div v-else class="auth-modal register-modal">
          <button class="close-btn" @click="handleClose">×</button>
          <h2>Create your account</h2>
          <p class="subtitle">Join our platform as a Customer, Designer or Supplier</p>
          
          <!-- 角色选择 -->
          <div class="role-selection">
            <div 
              v-for="role in registerRoleOptions" 
              :key="role.value"
              class="role-card"
              :class="{ active: registerForm.role === role.value }"
              @click="registerForm.role = role.value"
            >
              <div class="role-icon">{{ role.icon }}</div>
              <h3>{{ role.name }}</h3>
              <p>{{ role.desc }}</p>
            </div>
          </div>

          <!-- 可滚动表单区域 -->
          <div class="modal-body" :class="{ 'scrollable': needsScroll }">
            <!-- 基础信息 -->
            <div class="form-row">
              <div class="form-group">
                <label>*Email</label>
                <input v-model="registerForm.email" type="email" placeholder="Enter your email" />
              </div>
              
              <div class="form-group">
                <label>*Password</label>
                <input v-model="registerForm.password" type="password" placeholder="Enter password" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>*Email verification code</label>
                <div class="code-wrapper">
                  <input v-model="registerForm.emailCode" placeholder="Enter code" />
                  <button class="link-btn" :disabled="emailCodeDisabled" @click="sendEmailCode">
                    {{ emailCodeText }}
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label>*Confirm password</label>
                <input v-model="registerForm.confirmPassword" type="password" placeholder="Confirm password" />
              </div>
            </div>

            <div class="form-group">
              <label>Phone number</label>
              <input v-model="registerForm.phone" placeholder="Enter phone number" />
            </div>

            <!-- 设计师专属表单 -->
            <div v-if="registerForm.role === 'designer'" class="role-specific-section">
              <div class="section-title">Designer Nature</div>
              <div class="radio-group">
                <label><input type="radio" v-model="registerForm.designerType" value="individual" /> Individual</label>
                <label><input type="radio" v-model="registerForm.designerType" value="studio" /> Studio</label>
                <label><input type="radio" v-model="registerForm.designerType" value="company" /> Company</label>
              </div>

              <div class="form-group">
                <label>*Designer / Company Name</label>
                <input v-model="registerForm.designerName" placeholder="Enter name" />
              </div>

              <div class="section-title">Specialized Room Types</div>
              <p class="section-desc">Select the room types you specialize in (multiple selections allowed)</p>
              <div class="checkbox-grid">
                <label><input type="checkbox" value="living" v-model="registerForm.roomTypes" /> Living Room</label>
                <label><input type="checkbox" value="bedroom" v-model="registerForm.roomTypes" /> Bedroom</label>
                <label><input type="checkbox" value="kitchen" v-model="registerForm.roomTypes" /> Kitchen</label>
                <label><input type="checkbox" value="bathroom" v-model="registerForm.roomTypes" /> Bathroom</label>
                <label><input type="checkbox" value="dining" v-model="registerForm.roomTypes" /> Dining Room</label>
                <label><input type="checkbox" value="study" v-model="registerForm.roomTypes" /> Study</label>
                <label><input type="checkbox" value="balcony" v-model="registerForm.roomTypes" /> Balcony</label>
                <label><input type="checkbox" value="entrance" v-model="registerForm.roomTypes" /> Entrance</label>
                <label><input type="checkbox" value="kids" v-model="registerForm.roomTypes" /> Kids Room</label>
                <label><input type="checkbox" value="storage" v-model="registerForm.roomTypes" /> Storage</label>
              </div>
            </div>

            <!-- 供应商专属表单 -->
            <div v-if="registerForm.role === 'supplier'" class="role-specific-section supplier-section">
              <div class="section-title">Company Information</div>
              <div class="form-row">
                <div class="form-group">
                  <label>*Company Name</label>
                  <input v-model="registerForm.companyName" placeholder="Enter company name" />
                </div>
                
                <div class="form-group">
                  <label>*Contact Person</label>
                  <input v-model="registerForm.contactPerson" placeholder="Enter contact person" />
                </div>
              </div>

              <div class="form-group">
                <label>*Contact Phone</label>
                <input v-model="registerForm.contactPhone" placeholder="Enter contact phone" />
              </div>

              <div class="section-title">Company Address</div>
              <div class="form-row">
                <div class="form-group">
                  <label>*Street Address</label>
                  <input v-model="registerForm.street" placeholder="Enter street address" />
                </div>
                
                <div class="form-group">
                  <label>Apartment, Suite, Floor, etc</label>
                  <input v-model="registerForm.apartment" placeholder="Optional" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>*City</label>
                  <input v-model="registerForm.city" placeholder="Enter city" />
                </div>
                
                <div class="form-group">
                  <label>*State / Province</label>
                  <input v-model="registerForm.state" placeholder="Enter state" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>*Postal Code</label>
                  <input v-model="registerForm.zipCode" placeholder="Enter postal code" />
                </div>
                
                <div class="form-group">
                  <label>*Country</label>
                  <input v-model="registerForm.country" placeholder="Enter country" />
                </div>
              </div>

              <div class="section-title">Building Materials Category</div>
              <div class="checkbox-grid">
                <label><input type="checkbox" value="tiles" v-model="registerForm.businessCategories" /> Tiles</label>
                <label><input type="checkbox" value="flooring" v-model="registerForm.businessCategories" /> Flooring</label>
                <label><input type="checkbox" value="bathroom" v-model="registerForm.businessCategories" /> Bathroom</label>
                <label><input type="checkbox" value="cabinets" v-model="registerForm.businessCategories" /> Cabinets</label>
                <label><input type="checkbox" value="doors" v-model="registerForm.businessCategories" /> Doors & Windows</label>
                <label><input type="checkbox" value="paint" v-model="registerForm.businessCategories" /> Paint</label>
                <label><input type="checkbox" value="lighting" v-model="registerForm.businessCategories" /> Lighting</label>
                <label><input type="checkbox" value="hardware" v-model="registerForm.businessCategories" /> Hardware</label>
                <label><input type="checkbox" value="others" v-model="registerForm.businessCategories" /> Others</label>
              </div>
            </div>
          </div>

          <!-- 固定底部 -->
          <div class="modal-footer">
            <div class="agreement-item">
              <label>
                <input type="checkbox" v-model="registerForm.agreement" />
                I agree to the 
                <a href="#" @click.prevent="showTerms">Terms of Service</a>
                and 
                <a href="#" @click.prevent="showPrivacy">Privacy Policy</a>
              </label>
            </div>

            <div class="footer-actions">
              <div class="login-link">
                Already have an account? 
                <a href="#" @click.prevent="switchToLogin">Sign in</a>
              </div>
              <div class="action-buttons">
                <button class="btn-secondary" @click="handleClose">Cancel</button>
                <button class="btn-primary" @click="handleRegister">Create account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { navigation } from '@/utils/navigation'

const props = defineProps<{
  visible: boolean
  initialMode?: 'login' | 'register'
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'login', data: any): void
  (e: 'register', data: any): void
}>()

const mode = ref<'login' | 'register'>(props.initialMode || 'login')
const emailCodeDisabled = ref(false)
const countdown = ref(0)

// 登录角色选项
// 注册角色选项
const registerRoleOptions = [
  { value: 'customer', icon: '👤', name: 'Customer', desc: 'Browse products and order' },
  { value: 'designer', icon: '🎨', name: 'Designer', desc: 'Upload and sell your designs' },
  { value: 'supplier', icon: '🏪', name: 'Supplier', desc: 'Offer products on our marketplace' }
]

// 登录表单
const loginForm = reactive({
  email: '',
  password: '',
  role: 'customer' as string
})

// 注册表单
const registerForm = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  emailCode: '',
  phone: '',
  agreement: false,
  role: 'customer' as string,
  // 设计师字段
  designerType: 'individual',
  designerName: '',
  roomTypes: [] as string[],
  // 供应商字段
  companyName: '',
  contactPerson: '',
  contactPhone: '',
  street: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  businessCategories: [] as string[]
})

// 判断是否需要滚动
const needsScroll = computed(() => {
  return registerForm.role === 'designer' || registerForm.role === 'supplier'
})

// 邮箱验证码按钮文本
const emailCodeText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return 'Send verification code'
})

// 切换到注册
const switchToRegister = () => {
  mode.value = 'register'
}

// 切换到登录
const switchToLogin = () => {
  mode.value = 'login'
}

// 关闭模态框
const handleClose = () => {
  emit('update:visible', false)
}

// 处理登录
const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) { alert('Please enter email and password'); return }
  try {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
    const guestAccount = localStorage.getItem('guestAccount')
    const storedGuestId = guestAccount ? JSON.parse(guestAccount).id : undefined
    const guestId = guestAccount && JSON.parse(guestAccount).backendIssued && (typeof storedGuestId === 'number' ? Number.isInteger(storedGuestId) : typeof storedGuestId === 'string' && /^\d+$/.test(storedGuestId)) ? storedGuestId : undefined
    const response = await fetch(`${baseUrl}/app/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: loginForm.role, email: loginForm.email.trim(), password: loginForm.password, ...(guestId !== undefined ? { guestId } : {}) }) })
    const payload = await response.json()
    if (!response.ok || (payload.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload.msg || 'Login failed')
    const data = payload.data || {}
    const token = data.token || data.accessToken || data.access_token
    const userInfo = data.user || data.userInfo || data.account || data
    if (token) localStorage.setItem('token', token)
    if (userInfo && typeof userInfo === 'object') localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, isGuest: false }))
    emit('login', { ...loginForm, response: payload }); handleClose()
  } catch (error: any) { console.error('登录失败:', error); alert(error?.message || 'Login failed') }
}

const handleResetPassword = async () => {
  const email = window.prompt('Enter your email')?.trim(); if (!email) return
  const code = window.prompt('Enter the verification code')?.trim(); if (!code) return
  const password = window.prompt('Enter your new password') || ''; if (!password) return
  try {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
    const response = await fetch(`${baseUrl}/app/password/reset`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, code, password }) })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok || (payload.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload.msg || 'Password reset failed')
    alert(payload.msg || 'Password reset successfully')
  } catch (error: any) { console.error('重置密码失败:', error); alert(error?.message || 'Password reset failed') }
}

// 处理注册
const handleRegister = async () => {
  if (!registerForm.agreement) {
    alert('Please agree to the terms')
    return
  }
  if (!registerForm.email || !registerForm.password || registerForm.password !== registerForm.confirmPassword) { alert('Please complete email and matching passwords'); return }
  if (registerForm.role === 'designer' && (!registerForm.designerType || !registerForm.designerName.trim() || registerForm.roomTypes.length === 0)) { alert('Please complete designer nature, display name and select at least one space type'); return }
  if (registerForm.role === 'supplier' && (!registerForm.companyName.trim() || !registerForm.contactPerson.trim() || !registerForm.contactPhone.trim() || !registerForm.street.trim() || !registerForm.city.trim() || !registerForm.state.trim() || !registerForm.country.trim())) { alert('Please complete all required supplier details'); return }
  try {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
    const guestAccount = localStorage.getItem('guestAccount')
    const storedGuestId = guestAccount ? JSON.parse(guestAccount).id : undefined
    const guestId = guestAccount && JSON.parse(guestAccount).backendIssued && (typeof storedGuestId === 'number' ? Number.isInteger(storedGuestId) : typeof storedGuestId === 'string' && /^\d+$/.test(storedGuestId)) ? storedGuestId : undefined
    const body: Record<string, unknown> = {
      role: registerForm.role,
      email: registerForm.email.trim(),
      code: registerForm.emailCode.trim(),
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword,
      agreeTerms: registerForm.agreement,
      phone: registerForm.phone.trim(),
      apartment: registerForm.apartment.trim(),
      postalCode: registerForm.zipCode.trim(),
      materialCategories: registerForm.businessCategories,
      clientIp: '',
      ...(guestId !== undefined ? { guestId } : {})
    }
    if (registerForm.role === 'designer') Object.assign(body, { designerNature: registerForm.designerType, displayName: registerForm.designerName.trim(), roomTypes: registerForm.roomTypes })
    if (registerForm.role === 'supplier') Object.assign(body, { companyName: registerForm.companyName.trim(), contactPerson: registerForm.contactPerson.trim(), contactPhone: registerForm.contactPhone.trim(), street: registerForm.street.trim(), city: registerForm.city.trim(), state: registerForm.state.trim(), country: registerForm.country.trim() })
    const response = await fetch(`${baseUrl}/app/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok || (payload.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload.msg || 'Registration failed')
    emit('register', { ...registerForm, response: payload })
    if (registerForm.role === 'designer' || registerForm.role === 'supplier') {
      alert(payload.msg || 'Registration successful. Please sign in to the management portal.')
      navigation.toDashboard()
      return
    }
    alert(payload.msg || 'Registration successful')
    handleClose()
  } catch (error: any) { console.error('注册失败:', error); alert(error?.message || 'Registration failed') }
}

// 发送邮箱验证码
const sendEmailCode = async () => {
  if (emailCodeDisabled.value) return
  if (!registerForm.email) {
    alert('Please enter email first')
    return
  }
  
  emailCodeDisabled.value = true
  try {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
    const response = await fetch(`${baseUrl}/app/verify-code/email`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: registerForm.email.trim(), clientIp: '' }) })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok || (payload.code !== undefined && payload.code !== 0 && payload.code !== 200)) throw new Error(payload.msg || 'Failed to send verification code')
    // 测试环境可能直接返回验证码，也可能包在 data/code/verificationCode 中
    const returnedCode = payload.data && typeof payload.data === 'object'
      ? (payload.data.code ?? payload.data.verificationCode ?? payload.data.emailCode)
      : (payload.data ?? payload.verificationCode ?? payload.emailCode)
    if (typeof returnedCode === 'string' || typeof returnedCode === 'number') {
      registerForm.emailCode = String(returnedCode)
    } else {
      console.warn('验证码接口未返回验证码内容:', payload)
    }
  } catch (error: any) { emailCodeDisabled.value = false; alert(error?.message || 'Failed to send verification code'); return }
  emailCodeDisabled.value = true
  countdown.value = 60
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      emailCodeDisabled.value = false
    }
  }, 1000)
}

// 显示服务条款
const showTerms = () => {
  alert('Terms of Service')
}

// 显示隐私政策
const showPrivacy = () => {
  alert('Privacy Policy')
}

// 监听 visible 变化，重置模式
watch(() => props.visible, (newVal) => {
  if (newVal) {
    mode.value = props.initialMode || 'login'
  }
})
</script>

<style scoped>
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 24px;
  z-index: 9999;
  padding: 20px;
}

.auth-modal-container {
  width: 100%;
  max-width: 760px;
  max-height: calc(100vh - 48px);
  display: flex;
  justify-content: center;
}

.auth-modal {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 40px;
  position: relative;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
}

.register-modal {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  line-height: 1;
  padding: 0;
}

.close-btn:hover {
  color: #333;
}

.auth-modal h2 {
  font-size: 36px;
  font-weight: 700;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
}

.login-role-selection { margin: 30px 0 24px; gap: 24px; }
.login-role-selection .role-card { min-height: 118px; display: flex; flex-direction: column; justify-content: center; padding: 14px 12px; border-width: 2px; }
.login-role-selection .role-card.active { border-color: #0078b8; background: #f4fbff; }
.login-role-selection .role-icon { font-size: 34px; filter: grayscale(1); }
.login-role-selection .role-card.active .role-icon,
.login-role-selection .role-card.active h3,
.login-role-selection .role-card.active p { color: #0078b8; }
.login-role-selection .role-card h3 { font-size: 18px; margin: 4px 0 8px; }
.login-role-selection .role-card p { font-size: 15px; line-height: 1.35; }
.login-role-selection + .form-wrapper { border: 0; padding: 0; margin: 0; }
.auth-modal:has(.login-role-selection) { padding: 34px 48px 42px; }
.auth-modal:has(.login-role-selection) { max-height: calc(100vh - 48px); }
.auth-modal:has(.login-role-selection) .form-group { margin-bottom: 24px; }
.auth-modal:has(.login-role-selection) .form-group label { font-size: 20px; color: #555; }
.auth-modal:has(.login-role-selection) .form-group label span { color: #e33; }
.auth-modal:has(.login-role-selection) .form-group input { height: 52px; font-size: 16px; padding: 0 14px; border: 2px solid #e0e3e8; }
.auth-modal:has(.login-role-selection) .btn-primary,
.auth-modal:has(.login-role-selection) .btn-secondary { height: 56px; font-size: 18px; border-radius: 6px; }
.auth-modal:has(.login-role-selection) .btn-primary { background: #333; }
.auth-modal:has(.login-role-selection) .btn-secondary { background: #e5e6e8; color: #333; border: 0; }
.auth-modal:has(.login-role-selection) .forgot-password { font-size: 20px; margin-top: 26px; }

.subtitle {
  color: #666;
  font-size: 14px;
  text-align: center;
  margin: 0 0 24px 0;
}

/* 角色选择 */
.role-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 30px;
}

.role-selection {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  flex-shrink: 0;
}

.role-card {
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.role-card:hover {
  border-color: #91d5ff;
  background: #f0f9ff;
}

.role-card.active {
  border-color: #1890ff;
  background: #e6f7ff;
}

.role-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.role-card h3,
.role-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
}

.role-card p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

/* 表单样式 */
.form-wrapper {
  border: 2px solid #1890ff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
}

.modal-body {
  padding: 24px 0;
  flex: 1;
  min-height: 0;
}

.modal-body.scrollable {
  overflow-y: auto;
  flex: 1 1 auto;
  min-height: 0;
  max-height: calc(100vh - 430px);
  overscroll-behavior: contain;
  scrollbar-width: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #1890ff;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.code-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-wrapper input {
  flex: 1;
}

.link-btn {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  white-space: nowrap;
  padding: 0 8px;
}

.link-btn:disabled {
  color: #999;
  cursor: not-allowed;
}

/* 按钮 */
.btn-primary,
.btn-secondary {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 12px;
}

.btn-primary {
  background: #1890ff;
  color: white;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: white;
  border: 1px solid #d9d9d9;
  color: #333;
}

.btn-secondary:hover {
  border-color: #1890ff;
  color: #1890ff;
}

/* 角色专属表单 */
.role-specific-section {
  margin-top: 24px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.supplier-section {
  background: #f0f9ff;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 16px 0;
}

.section-desc {
  font-size: 13px;
  color: #666;
  margin: -8px 0 12px 0;
}

.radio-group {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px 8px;
}

.checkbox-grid label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

/* 固定底部 */
.modal-footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, auto);
  column-gap: 28px;
  align-items: start;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.agreement-item {
  margin: 0;
  font-size: 14px;
}

.agreement-item label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.agreement-item a {
  color: #1890ff;
  text-decoration: none;
}

.footer-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
}

.login-link {
  color: #666;
  font-size: 14px;
  text-align: right;
}

.login-link a {
  color: #1890ff;
  text-decoration: none;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-buttons button {
  width: auto;
  padding: 8px 24px;
  margin: 0;
}

/* 社交登录 */
.social-login {
  text-align: center;
}

.divider {
  color: #999;
  margin: 20px 0;
  font-size: 14px;
}

.social-btn {
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.google-btn span {
  color: #4285f4;
  font-weight: bold;
  margin-right: 8px;
}

.facebook-btn span {
  color: #1877f2;
  font-weight: bold;
  margin-right: 8px;
}

.no-account,
.forgot-password {
  margin-top: 16px;
  color: #666;
  font-size: 14px;
  text-align: center;
}

.forgot-password {
  text-align: right;
}

.no-account a,
.forgot-password a {
  color: #1890ff;
  text-decoration: none;
}

/* 响应式 */
@media (max-width: 768px) {
  .auth-modal-overlay {
    align-items: flex-start;
    padding: 12px;
  }

  .auth-modal-container,
  .auth-modal {
    max-height: calc(100vh - 24px);
  }

  .role-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .role-selection {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .footer-actions {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .modal-footer {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }

  .login-link {
    text-align: left;
  }
  
  .action-buttons {
    width: 100%;
  }
  
  .action-buttons button {
    flex: 1;
  }
}
</style>

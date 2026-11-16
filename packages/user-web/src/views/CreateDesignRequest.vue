<template>
  <div class="create-design-request-page">
    <!-- Header -->
    <Header />
    
    <!-- Main Content -->
    <div class="request-content">
      <div class="content-wrapper">
        <!-- Page Title -->
        <div class="page-header">
          <h1 class="page-title">
            <SvgIcon name="clipboard" size="clamp(20px, 1.46vw, 28px)" />
            Create Your Design Request
          </h1>
          <p class="page-subtitle">We're here to personalize, and we'll match you with a professional designer to create your ideal home.</p>
        </div>
        
        <!-- Main Form Container -->
        <div class="form-container">
          <!-- Room Selection -->
          <div class="form-section">
            <h2 class="section-title">Room Selection</h2>
            <div class="subsection-group">
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Select room type</h3>
                <div id="roomType" class="room-types">
                  <button 
                    v-for="room in roomTypes" 
                    :key="room.code"
                    class="room-type-btn"
                    :class="{ active: selectedRooms.includes(room.code) }"
                    @click="toggleRoom(room.code)"
                  >
                    {{ translateOption(room.name) }}
                  </button>
                </div>
              </div>
              
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Room dimensions ({{ areaUnitLabel }})</h3>
                <p class="section-description">Please provide the total dimensions for all the design rooms mentioned.</p>
                <div class="dimension-inputs">
                  <div class="floating-label-wrapper">
                    <input v-model="form.length" @input="handleDimensionInput" type="number" min="0.1" step="0.01" id="length" :class="['dimension-input', { 'has-error': fieldErrors.length }]" placeholder=" " required>
                    <label for="length" class="floating-label"><span class="required">*</span>Length ({{ lengthUnitLabel }})</label>
                  </div>
                  <div class="floating-label-wrapper">
                    <input v-model="form.width" @input="handleDimensionInput" type="number" min="0.1" step="0.01" id="width" :class="['dimension-input', { 'has-error': fieldErrors.width }]" placeholder=" " required>
                    <label for="width" class="floating-label"><span class="required">*</span>Width ({{ lengthUnitLabel }})</label>
                  </div>
                </div>
                <div class="dimension-inputs">
                  <div class="floating-label-wrapper">
                    <input v-model="form.height" type="number" min="0.1" step="0.01" id="height" :class="['dimension-input', { 'has-error': fieldErrors.height }]" placeholder=" " required>
                    <label for="height" class="floating-label"><span class="required">*</span>Height ({{ lengthUnitLabel }})</label>
                  </div>
                  <div class="floating-label-wrapper">
                    <input :value="form.area" @input="handleAreaInput" type="number" min="0.1" step="0.01" id="area" :class="['dimension-input', { 'has-error': fieldErrors.area }]" placeholder=" " required>
                    <button v-if="areaMode === 'MANUAL'" type="button" class="recalculate-btn" @click="restoreCalculatedArea">Recalculate / 恢复自动计算</button>
                    <small class="area-mode-hint">{{ areaMode === 'MANUAL' ? 'Manual override' : 'Automatically calculated' }}</small>
                    <div v-if="areaNeedsConfirmation" class="area-confirmation">
                      Manual area {{ form.area }} differs from calculated {{ formatArea(calculatedArea) }} by {{ areaDifferencePercent.toFixed(1) }}%.
                      <label><input v-model="areaConfirmed" type="checkbox"> I confirm this manual area.</label>
                    </div>
                    <label for="area" class="floating-label"><span class="required">*</span>Area ({{ areaUnitLabel }})</label>
                  </div>
                </div>
              </div>
              
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Upload Floor Plan with Dimensions</h3>
                <div class="upload-area-wrapper">
                  <BFormFile
                    class="custom-file-input"
                    placeholder="Click to upload"
                    drop-placeholder="Drag and drop your file here"
                    accept=".pdf,.png,.jpg,.jpeg"
                  >
                    <template #file-name="{ files }">
                      <div v-if="files.length === 0" class="upload-placeholder">
                        <SvgIcon name="plus" size="clamp(16px, 1.25vw, 24px)" />
                        <div class="upload-text-group">
                          <p class="upload-text">Click or drag the file to upload here</p>
                          <p class="upload-hint">Only pdf, png, jpg can be uploaded, and the size does not exceed 100MB</p>
                        </div>
                      </div>
                      <div v-else class="file-name">
                        {{ files[0].name }}
                      </div>
                    </template>
                  </BFormFile>
                </div>
              </div>
              
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Room description</h3>
                <textarea 
                  v-model="form.roomDescription"
                  placeholder="Please describe your room's present condition, existing features, and specific requirements."
                  :class="['description-textarea', { 'has-error': fieldErrors.roomDescription }]"
                ></textarea>
              </div>
            </div>
          </div>
          
          <!-- Style Preference -->
          <div class="form-section">
            <h2 class="section-title">Style Preference</h2>
            <div class="subsection-group">
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Select your preferred style (multiple)</h3>
                <div class="style-options">
                  <button 
                    v-for="style in styleOptions" 
                    :key="style.code"
                    class="style-btn"
                    :class="{ active: selectedStyles.includes(style.code) }"
                    @click="toggleStyle(style.code)"
                  >
                    {{ translateOption(style.name) }}
                  </button>
                </div>
              </div>
              
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Your preference color (optional)</h3>
                <div class="color-palette">
                  <button 
                    v-for="(color, index) in colorPalette" 
                    :key="index"
                    class="color-btn"
                    :style="{ backgroundColor: color }"
                    :class="{ active: selectedColors.includes(color) }"
                    @click="toggleColor(color)"
                  ></button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Budget Range -->
          <div v-if="isWholeHouseSelected" class="form-section">
            <h2 class="section-title">Budget Range</h2>
            <h3 class="subsection-title"><span class="required">*</span>What is your target budget?</h3>
            <p class="section-description">Please select your budget range, this will help designers provide more suitable solutions</p>
            <div class="budget-options">
              <button 
                v-for="budget in availableTiers" 
                :key="budget.tierCode"
                class="budget-btn"
                :class="{ active: selectedTierCode === budget.tierCode }"
                @click="selectedTierCode = budget.tierCode"
              >
                <div class="budget-price">{{ formatPrice(budget) }}</div>
                <div class="budget-name">{{ translateOption(budget.name) }}</div>
              </button>
            </div>
          </div>
          
          <!-- Design Tier -->
          <div v-if="!isWholeHouseSelected" class="form-section">
            <h2 class="section-title">Design Tier</h2>
            <div id="tier" class="tier-options">
              <button 
                v-for="tier in availableTiers" 
                :key="tier.tierCode"
                class="tier-btn"
                :class="{ active: selectedTierCode === tier.tierCode }"
                @click="selectedTierCode = tier.tierCode"
              >
                <div class="tier-price">{{ formatPrice(tier) }}</div>
                <div class="tier-name">{{ translateOption(tier.name) }}</div>
              </button>
            </div>
          </div>
          
          <!-- Inspiration Links -->
          <div class="form-section">
            <h2 class="section-title">Inspiration & Reference Links</h2>
            <div class="subsection-group">
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Inspiration Source (optional)</h3>
                <textarea 
                  v-model="form.linksText"
                  placeholder="Paste a link to your Pinterest board, Houzz Ideabook, or other inspiration sources"
                  class="description-textarea"
                ></textarea>
              </div>
              
              <div v-if="isWholeHouseSelected" class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Upload images</h3>
                
                <div v-for="roomName in ['Living Room', 'Bedroom', 'Dining Room', 'Kitchen', 'Study Room', 'Entrance']" :key="roomName" class="room-upload-section">
                  <div class="room-upload-header">
                    <span class="room-upload-label">{{ roomName }}</span>
                    <button type="button" class="add-upload-btn" @click="addUploadSlot(roomName)">+ Add</button>
                  </div>
                  
                  <div class="upload-grid">
                    <!-- 第一个默认的上传框，永远存在，无删除按钮 -->
                    <div class="upload-grid-item">
                      <div class="upload-area-wrapper">
                        <BFormFile
                          class="custom-file-input"
                          :placeholder="`Click to upload`"
                          drop-placeholder="Drag and drop your file here"
                          accept=".jpg,.jpeg,.png"
                          @change="(event: any) => handleBFormFileUpload(event, roomName, 0)"
                        >
                          <template #file-name="{ files }">
                            <div v-if="!roomUploadImages[roomName]?.[0]?.preview" class="upload-placeholder">
                              <SvgIcon name="plus" size="clamp(16px, 1.25vw, 24px)" />
                              <div class="upload-text-group">
                                <p class="upload-text">Click to upload</p>
                                <p class="upload-hint">{{ roomName }} reference image 1, JPG/PNG, max 5MB</p>
                              </div>
                            </div>
                            <div v-else class="image-preview-container">
                              <img :src="roomUploadImages[roomName][0].preview" alt="Preview" class="uploaded-image" />
                            </div>
                          </template>
                        </BFormFile>
                      </div>
                    </div>
                    
                    <!-- 通过 Add 按钮添加的上传框，都有删除按钮 -->
                    <div v-for="(slot, index) in roomUploadImages[roomName] || []" :key="`${roomName}-add-${index}`" class="upload-grid-item">
                      <button 
                        type="button" 
                        class="delete-upload-btn" 
                        @click.stop.prevent="removeImage(roomName, index)"
                        title="Delete"
                      >
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 2V0L4.5 2.14577e-06V2L0 2V4H1.75L1.75 17.5C1.75 18.3284 2.42157 19 3.25 19L15.75 19C16.5784 19 17.25 18.3284 17.25 17.5V4L19 4V2L14.5 2ZM3.75 17L3.75 4L15.25 4V17L3.75 17ZM6.5 6.5V14H8.5V6.5H6.5ZM10.5 6.5V14H12.5V6.5H10.5Z" fill="white"/>
                        </svg>
                      </button>
                      <div class="upload-area-wrapper">
                        <BFormFile
                          class="custom-file-input"
                          :placeholder="`Click to upload`"
                          drop-placeholder="Drag and drop your file here"
                          accept=".jpg,.jpeg,.png"
                          @change="(event: any) => handleBFormFileUpload(event, roomName, index + 1)"
                        >
                          <template #file-name="{ files }">
                            <div v-if="!slot?.preview" class="upload-placeholder">
                              <SvgIcon name="plus" size="clamp(16px, 1.25vw, 24px)" />
                              <div class="upload-text-group">
                                <p class="upload-text">Click to upload</p>
                                <p class="upload-hint">{{ roomName }} reference image {{ index + 2 }}, JPG/PNG, max 5MB</p>
                              </div>
                            </div>
                            <div v-else class="image-preview-container">
                              <img :src="slot.preview" alt="Preview" class="uploaded-image" />
                            </div>
                          </template>
                        </BFormFile>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Upload Floor Plan with Dimensions</h3>
                <div class="upload-area-wrapper">
                  <BFormFile
                    class="custom-file-input"
                    placeholder="Click to upload"
                    drop-placeholder="Drag and drop your file here"
                    accept=".pdf,.png,.jpg,.jpeg"
                  >
                    <template #file-name="{ files }">
                      <div v-if="files.length === 0" class="upload-placeholder">
                        <SvgIcon name="plus" size="clamp(16px, 1.25vw, 24px)" />
                        <div class="upload-text-group">
                          <p class="upload-text">Click or drag the file to upload here</p>
                          <p class="upload-hint">Only pdf, png, jpg can be uploaded, and the size does not exceed 100MB</p>
                        </div>
                      </div>
                      <div v-else class="file-name">
                        {{ files[0].name }}
                      </div>
                    </template>
                  </BFormFile>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Construction Time -->
          <div class="form-section">
            <h2 class="section-title">Construction Time</h2>
            <h3 class="subsection-title"><span class="required">*</span>Select preferred construction period</h3>
            <div id="constructionDate" class="date-input-wrapper">
              <div class="date-input-container">
                <Datepicker 
                  v-model="constructionDate"
                  placeholder="Select date"
                  class="custom-datepicker"
                  input-class="datepicker-input"
                />
                <div class="calendar-icon-wrapper">
                  <CalendarIcon :size="16" color="#333333" />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Design Tags -->
          <div class="form-section">
            <h2 class="section-title">Design Tags</h2>
            <p class="section-description">You can select from the tags below or add your own. It streamlines your request. Your tags designed find the best match for your needs. You can add up to 10 tags.</p>
            <input 
              type="text" 
              class="tags-input"
              v-model="customTag"
            >
            <div class="tags-container">
                  <button type="button"
                v-for="tag in designTags" 
                    :key="tag.code"
                    class="tag-label"
                    :class="{ active: selectedTags.includes(tag.code) }"
                    @click="toggleTag(tag.code)"
              >
                    {{ translateOption(tag.name) }}
                  </button>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="form-section">
            <h2 class="section-title">Contact Information</h2>
            <div class="contact-form">
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input v-model="form.contactName" type="text" id="fullName" :class="['form-input', { 'has-error': fieldErrors.contactName }]" placeholder=" ">
                  <label for="fullName" class="floating-label"><span class="required">*</span>Full name</label>
                </div>
                <div class="floating-label-wrapper">
                  <select v-model="form.contactMethod" id="contactMethod" :class="['form-input', { 'has-error': fieldErrors.contactMethod }]">
                    <option value=""></option>
                    <option value="PHONE">Phone</option>
                    <option value="EMAIL">Email</option>
                  </select>
                  <label for="contactMethod" class="floating-label"><span class="required">*</span>Contact Method</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input v-model="form.phone" type="text" id="phoneNumber" :class="['form-input', { 'has-error': fieldErrors.phone }]" placeholder=" ">
                  <label for="phoneNumber" class="floating-label"><span class="required">*</span>Phone Number</label>
                </div>
                <div class="floating-label-wrapper contact-time-picker">
                  <div class="contact-time-controls">
                    <select v-model="contactStartTime" id="contactStartTime" :class="['form-input', { 'has-error': fieldErrors.contactTime }]" @change="syncContactTime">
                      <option value="">{{ currentLanguage === 'zh' ? '开始时间' : 'Start Time' }}</option>
                      <option v-for="time in contactTimeOptions" :key="`start-${time}`" :value="time">{{ time }}</option>
                    </select>
                    <span class="contact-time-separator">-</span>
                    <select v-model="contactEndTime" id="contactEndTime" :class="['form-input', { 'has-error': fieldErrors.contactTime }]" @change="syncContactTime">
                      <option value="">{{ currentLanguage === 'zh' ? '结束时间' : 'End Time' }}</option>
                      <option v-for="time in contactTimeOptions" :key="`end-${time}`" :value="time">{{ time }}</option>
                    </select>
                  </div>
                  <div class="contact-time-display"><CalendarIcon :size="16" color="#333333" /> {{ contactTime || (currentLanguage === 'zh' ? '请选择联系时间段' : 'Select contact time range') }}</div>
                  <p v-if="contactTimeRestoreWarning" class="request-error">{{ contactTimeRestoreWarning }}</p>
                  <label class="floating-label active" for="contactStartTime"><span class="required">*</span>{{ currentLanguage === 'zh' ? '方便联系的时间' : 'Preferred Contact Time' }}</label>
                </div>
              </div>
              <div v-if="form.contactMethod === 'EMAIL'" class="form-row">
                <div class="floating-label-wrapper">
                  <input v-model="form.email" type="email" id="emailAddress" :class="['form-input', { 'has-error': fieldErrors.email }]" placeholder=" ">
                  <label for="emailAddress" class="floating-label"><span class="required">*</span>Email</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input v-model="form.address" type="text" id="projectAddress" :class="['form-input', { 'has-error': fieldErrors.address }]" placeholder=" ">
                  <label for="projectAddress" class="floating-label"><span class="required">*</span>Project Address</label>
                </div>
                <div class="floating-label-wrapper">
                  <input v-model="form.apt" type="text" id="aptSuite" class="form-input" placeholder=" ">
                  <label for="aptSuite" class="floating-label">Apt, Suite, Unit, etc.</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input v-model="form.city" type="text" id="city" class="form-input" placeholder=" ">
                  <label for="city" class="floating-label">City</label>
                </div>
                <div class="floating-label-wrapper">
                  <input v-model="form.state" type="text" id="state" class="form-input" placeholder=" ">
                  <label for="state" class="floating-label">State</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input v-model="form.postalCode" type="text" id="postalCode" class="form-input" placeholder=" ">
                  <label for="postalCode" class="floating-label">Postal Code</label>
                </div>
                <div class="floating-label-wrapper">
                  <input v-model="form.country" type="text" id="country" class="form-input" placeholder=" ">
                  <label for="country" class="floating-label">Country</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Additional Items -->
          <div class="form-section">
            <h2 class="section-title">Additional Items (Optional)</h2>
            <textarea 
              v-model="form.additionalText"
              placeholder="Any other information you'd like designers to know"
              class="additional-textarea"
            ></textarea>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <div class="action-button-row">
              <button type="button" class="submit-btn" :disabled="submitting" :aria-busy="submitting" @click.prevent="handleSubmit">{{ submitting ? 'Submitting…' : 'Submit Design Request' }}</button>
              <button type="button" class="draft-btn" :disabled="savingDraft" @click="saveDraft">{{ savingDraft ? 'Saving…' : 'Save as Draft' }}</button>
            </div>
            <div v-if="pageError || (submitBlockReason && !pageError) || Object.keys(fieldErrors).length" class="request-feedback">
              <p v-if="pageError" class="request-error" role="alert">{{ pageError }}</p>
              <p v-if="submitBlockReason && !pageError" class="request-error" role="status">{{ submitBlockReason }}</p>
              <ul v-if="Object.keys(fieldErrors).length" class="request-error field-errors" role="alert">
              <li v-for="(message, field) in fieldErrors" :key="field">{{ message }}</li>
              </ul>
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
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { BFormFile } from 'bootstrap-vue-next'
import Datepicker from 'vue3-datepicker'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import CalendarIcon from '@/components/CalendarIcon.vue'
import { getCustomerAuthState } from '@/utils/customerAuth'
import type { I18nPlugin } from '@/plugins/i18n'
import { DesignRequestError, getDesignRequestDraft, getDesignRequestOptions, saveDesignRequestDraft, submitDesignRequest, type DesignOption, type DesignTier } from '@/api/designRequests'

const router = useRouter()
const i18n = inject<I18nPlugin>('i18n')
const currentLanguage = ref(i18n?.currentLocale || 'zh')
const onLanguageChanged = (event: Event) => { currentLanguage.value = (event as CustomEvent<{ locale: string }>).detail.locale }
onMounted(() => window.addEventListener('user-web-language-changed', onLanguageChanged))
onBeforeUnmount(() => window.removeEventListener('user-web-language-changed', onLanguageChanged))
const translateOption = (value: string) => {
  const key = ({
    'Bathroom': 'room.bathroom', 'Living Room': 'room.living', 'Bedroom': 'room.bedroom', 'Dining Room': 'room.dining', 'Whole House': 'room.whole',
    'Modern': 'home.style.modern', 'Minimalist': 'home.style.modern', 'Nordic': 'home.style.scandinavian', 'Chinese': 'home.style.chinese', 'Japanese': 'home.style.japanese', 'Industrial': 'home.style.industrial', 'Mediterranean': 'home.style.mediterranean',
    'Basic': 'request.budget.basic', 'Standard': 'request.budget.standard', 'Premium': 'request.budget.premium', 'Luxury': 'request.budget.luxury',
    'CLASSIC': 'request.tier.classic', 'MODERN': 'request.tier.modern', 'Cozy': 'request.tag.cozy', 'Bright': 'request.tag.bright', 'Spacious': 'request.tag.spacious', 'Classic': 'request.tier.classic', 'Functional': 'request.tag.functional'
  } as Record<string, string>)[value]
  if (!key) return value
  // The existing catalog covers the common room/style keys; keep request-only
  // labels local here until the catalog is extended, while remaining reactive.
  const labels: Record<string, Record<string, string>> = {
    'request.budget.basic': { zh: '基础', en: 'Basic', es: 'Básico' }, 'request.budget.standard': { zh: '标准', en: 'Standard', es: 'Estándar' },
    'request.budget.premium': { zh: '高级', en: 'Premium', es: 'Premium' }, 'request.budget.luxury': { zh: '豪华', en: 'Luxury', es: 'Lujo' },
    'request.tier.classic': { zh: '经典', en: 'CLASSIC', es: 'Clásico' }, 'request.tier.modern': { zh: '现代', en: 'MODERN', es: 'Moderno' },
    'request.tag.cozy': { zh: '温馨', en: 'Cozy', es: 'Acogedor' }, 'request.tag.bright': { zh: '明亮', en: 'Bright', es: 'Luminoso' },
    'request.tag.spacious': { zh: '宽敞', en: 'Spacious', es: 'Espacioso' }, 'request.tag.functional': { zh: '实用', en: 'Functional', es: 'Funcional' }
  }
  return labels[key]?.[currentLanguage.value] || i18n?.t(key) || value
}

// Options and selected values retain the backend codes; labels are presentation only.
const roomOptions = ref<DesignOption[]>([])
const styleOptions = ref<DesignOption[]>([])
const tagOptions = ref<DesignOption[]>([])
const tierOptions = ref<DesignTier[]>([])
const colorOptions = ref<string[]>([])
const lengthUnitLabel = ref('ft')
const areaUnitLabel = ref('sq.ft')
const selectedRooms = ref<string[]>([])
const selectedTierCode = ref('')
const isWholeHouseSelected = computed(() => roomOptions.value.find(room => room.code === selectedRooms.value[0])?.wholeHouse === true)
const roomTypes = computed(() => roomOptions.value)
const availableTiers = computed(() => {
  const roomCode = selectedRooms.value[0]
  const kind = isWholeHouseSelected.value ? 'BUDGET' : 'DESIGN'
  return tierOptions.value.filter(tier => tier.roomTypeCode === roomCode && tier.kind === kind)
})
const configurationReady = computed(() => roomOptions.value.length > 0 && styleOptions.value.length > 0 && availableTiers.value.length > 0)
const optionsReady = computed(() => roomOptions.value.length > 0 && styleOptions.value.length > 0 && tierOptions.value.length > 0)
const submitBlockReason = computed(() => {
  if (submitting.value) return 'Submitting your design request…'
  if (!optionsReady.value) return 'Design options are still loading. Please wait a moment and try again.'
  if (!selectedRooms.value.length) return 'Select a room type to continue.'
  if (!availableTiers.value.length) return 'No active price options are configured for the selected room.'
  if (!selectedTierCode.value) return 'Select a price option to continue.'
  return ''
})
const selectedTier = computed(() => availableTiers.value.find(tier => tier.tierCode === selectedTierCode.value))
const pageError = ref('')
const fieldErrors = ref<Record<string, string>>({})
const submitting = ref(false)
const savingDraft = ref(false)
const draftVersion = ref<number | string>(0)
const form = ref({ length: '', width: '', height: '', area: '', roomDescription: '', linksText: '', additionalText: '', constructionDate: '', contactName: '', contactMethod: '', phone: '', email: '', contactTime: '', address: '', apt: '', city: '', state: '', postalCode: '', country: '' })
const contactStartTime = ref('')
const contactEndTime = ref('')
const contactTimeRestoreWarning = ref('')
const contactTimeOptions = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, '0')
  const minute = index % 2 === 0 ? '00' : '30'
  return `${hour}:${minute}`
})
const contactTime = computed(() => contactStartTime.value && contactEndTime.value ? `${contactStartTime.value}-${contactEndTime.value}` : '')
const syncContactTime = () => {
  form.value.contactTime = contactTime.value
  contactTimeRestoreWarning.value = ''
  if (contactStartTime.value && contactEndTime.value && contactEndTime.value <= contactStartTime.value) fieldErrors.value.contactTime = 'End time must be later than start time.'
  else if (fieldErrors.value.contactTime) delete fieldErrors.value.contactTime
}
type AreaMode = 'CALCULATED' | 'MANUAL'
const areaMode = ref<AreaMode>('CALCULATED')
const areaConfirmed = ref(true)
const calculatedArea = computed(() => {
  const length = Number(form.value.length)
  const width = Number(form.value.width)
  return Number.isFinite(length) && length > 0 && Number.isFinite(width) && width > 0 ? Math.round(length * width * 100) / 100 : NaN
})
const areaDifferencePercent = computed(() => {
  const manual = Number(form.value.area)
  const calculated = calculatedArea.value
  return areaMode.value === 'MANUAL' && Number.isFinite(manual) && Number.isFinite(calculated) && calculated > 0 ? Math.abs(manual - calculated) / calculated * 100 : 0
})
const areaNeedsConfirmation = computed(() => areaMode.value === 'MANUAL' && areaDifferencePercent.value > 5)
const formatArea = (value: number) => Number.isFinite(value) ? value.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1') : ''
const recalculateArea = () => {
  form.value.area = formatArea(calculatedArea.value)
}
const handleDimensionInput = () => {
  areaConfirmed.value = false
  if (areaMode.value === 'CALCULATED') recalculateArea()
}
const handleAreaInput = (event: Event) => {
  areaMode.value = 'MANUAL'
  areaConfirmed.value = false
  form.value.area = (event.target as HTMLInputElement).value
}
const restoreCalculatedArea = () => {
  areaMode.value = 'CALCULATED'
  areaConfirmed.value = true
  recalculateArea()
}
const selectedStyles = ref<string[]>([])

// Color palette
const selectedColors = ref<string[]>([])
const colorPalette = computed(() => colorOptions.value)

// Design tags
const designTags = computed(() => tagOptions.value)
const selectedTags = ref<string[]>([])
const customTag = ref('')

// Construction date
const constructionDate = ref<Date | undefined>(undefined)

// Upload images for each room type
interface UploadedImage {
  id: string
  file: File
  preview: string
}

const roomUploadImages = ref<Record<string, UploadedImage[]>>({
  'Living Room': [],
  'Bedroom': [],
  'Dining Room': [],
  'Kitchen': [],
  'Study Room': [],
  'Entrance': []
})

// Add upload slot for a room
const addUploadSlot = (roomName: string) => {
  if (!roomUploadImages.value[roomName]) {
    roomUploadImages.value[roomName] = []
  }
  // Add a placeholder to increase the count
  roomUploadImages.value[roomName].push({
    id: `${roomName}-${Date.now()}`,
    file: null as any,
    preview: ''
  })
}

// Handle file upload
const handleFileUpload = (event: Event, roomName: string, index: number) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      const uploadedImage: UploadedImage = {
        id: `${roomName}-${Date.now()}-${index}`,
        file,
        preview
      }
      
      if (!roomUploadImages.value[roomName]) {
        roomUploadImages.value[roomName] = []
      }
      
      // Replace or add image at index
      if (roomUploadImages.value[roomName][index]) {
        roomUploadImages.value[roomName][index] = uploadedImage
      } else {
        roomUploadImages.value[roomName].push(uploadedImage)
      }
    }
    reader.readAsDataURL(file)
  }
}

// Handle BFormFile upload
const handleBFormFileUpload = (event: any, roomName: string, index: number) => {
  const files = event.target?.files || event
  const file = files?.[0]
  
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const preview = e.target?.result as string
      const uploadedImage: UploadedImage = {
        id: `${roomName}-${Date.now()}-${index}`,
        file,
        preview
      }
      
      if (!roomUploadImages.value[roomName]) {
        roomUploadImages.value[roomName] = []
      }
      
      // Replace or add image at index
      if (roomUploadImages.value[roomName][index]) {
        roomUploadImages.value[roomName][index] = uploadedImage
      } else {
        roomUploadImages.value[roomName].push(uploadedImage)
      }
    }
    reader.readAsDataURL(file)
  }
}

// Remove uploaded image
const removeImage = (roomName: string, index: number) => {
  if (roomUploadImages.value[roomName]) {
    roomUploadImages.value[roomName].splice(index, 1)
  }
}

// Add new upload slot
const addNewUploadSlot = (roomName: string) => {
  // This will be handled by v-for in template
}

// Toggle functions
const toggleRoom = (room: string) => {
  // Single selection - replace the array with only the selected room
  selectedRooms.value = [room]
  selectedTierCode.value = ''
  pageError.value = availableTiers.value.length ? '' : 'No active price options are configured for this room.'
}

const toggleStyle = (style: string) => {
  const index = selectedStyles.value.indexOf(style)
  if (index > -1) {
    selectedStyles.value.splice(index, 1)
  } else {
    selectedStyles.value.push(style)
  }
}

const toggleColor = (color: string) => {
  const index = selectedColors.value.indexOf(color)
  if (index > -1) {
    selectedColors.value.splice(index, 1)
  } else {
    selectedColors.value.push(color)
  }
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else if (selectedTags.value.length < 10) {
    selectedTags.value.push(tag)
  }
}

// Handle submit
const formatPrice = (tier: DesignTier) => {
  const amount = typeof tier.priceAmount === 'number' ? tier.priceAmount : Number(tier.priceAmount)
  return Number.isFinite(amount) ? new Intl.NumberFormat(undefined, { style: 'currency', currency: tier.currency || 'USD' }).format(amount) : String(tier.priceAmount)
}
const buildDesignRequestPayload = (validate = true): Record<string, unknown> | null => {
  fieldErrors.value = {}
  const roomTypeCode = selectedRooms.value[0]
  const tier = selectedTier.value
  if (validate && !optionsReady.value) { pageError.value = 'Design options are unavailable. Please reload the page or try again later.'; return null }
  if (validate && !roomTypeCode) { fieldErrors.value.roomType = 'Room type is required.'; return null }
  if (validate && (!configurationReady.value || !tier)) { fieldErrors.value.tier = 'Select an available price option for the selected room.'; return null }
  const number = (value: string) => value.trim() === '' ? NaN : Number(value)
  const length = number(form.value.length), width = number(form.value.width), height = number(form.value.height), enteredArea = number(form.value.area)
  if (validate) {
    if (!(Number.isFinite(length) && length > 0)) fieldErrors.value.length = 'Length must be greater than 0.'
    if (!(Number.isFinite(width) && width > 0)) fieldErrors.value.width = 'Width must be greater than 0.'
    if (!(Number.isFinite(height) && height > 0)) fieldErrors.value.height = 'Height must be greater than 0.'
    if (form.value.area.trim() !== '' && !(Number.isFinite(enteredArea) && enteredArea > 0)) fieldErrors.value.area = 'Area must be greater than 0 when provided.'
    if (!form.value.roomDescription.trim()) fieldErrors.value.roomDescription = 'Room description is required.'
    if (!selectedStyles.value.length) fieldErrors.value.styles = 'Select at least one preferred style.'
    if (!constructionDate.value) fieldErrors.value.constructionDate = 'Construction period is required.'
    if (!form.value.contactName.trim()) fieldErrors.value.contactName = 'Full name is required.'
    if (!form.value.contactMethod) fieldErrors.value.contactMethod = 'Contact method is required.'
    if (!contactStartTime.value) fieldErrors.value.contactTime = 'Start time is required.'
    else if (!contactEndTime.value) fieldErrors.value.contactTime = 'End time is required.'
    else if (!/^\d{2}:([03]0)$/.test(contactStartTime.value) || !/^\d{2}:([03]0)$/.test(contactEndTime.value)) fieldErrors.value.contactTime = 'Select a valid 30-minute time slot.'
    else if (contactEndTime.value <= contactStartTime.value) fieldErrors.value.contactTime = 'End time must be later than start time.'
    if (!form.value.address.trim()) fieldErrors.value.address = 'Project address is required.'
    if (form.value.contactMethod === 'PHONE' && !form.value.phone.trim()) fieldErrors.value.phone = 'Phone number is required for phone contact.'
    if (form.value.contactMethod === 'EMAIL' && !form.value.email.trim()) fieldErrors.value.email = 'Email is required for email contact.'
    if (form.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) fieldErrors.value.email = 'Enter a valid email address.'
    if (Object.keys(fieldErrors.value).length) {
      pageError.value = 'Please correct the highlighted fields before submitting.'
      const firstField = Object.keys(fieldErrors.value)[0]
      const targetId: Record<string, string> = { roomType: 'length', tier: 'tier', roomDescription: 'roomDescription', constructionDate: 'constructionDate', contactName: 'fullName', contactMethod: 'contactMethod', contactTime: 'contactTime', address: 'projectAddress', email: 'emailAddress', phone: 'phoneNumber' }
      requestAnimationFrame(() => {
        const target = document.getElementById(targetId[firstField] || firstField)
        target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        target?.focus({ preventScroll: true })
      })
      return null
    }
  }
  const calculated = calculatedArea.value
  const isManual = areaMode.value === 'MANUAL'
  const area = isManual ? enteredArea : calculated
  const areaSource = isManual ? 'MANUAL' : 'CALCULATED'
  const differs = Number.isFinite(calculated) && calculated > 0 && Number.isFinite(area) && Math.abs(area - calculated) / calculated > 0.05
  const areaRatio = Number.isFinite(calculated) && calculated > 0 && Number.isFinite(area) ? area / calculated : 1
  if (validate && isManual && (areaRatio > 100 || areaRatio < 0.01)) {
    fieldErrors.value.area = 'The entered area appears inconsistent with length × width. Please correct it or use the calculated area.'
    pageError.value = 'Please correct the area before submitting.'
    requestAnimationFrame(() => {
      const target = document.getElementById('area')
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      target?.focus({ preventScroll: true })
    })
    return null
  }
  if (validate && isManual && differs && !areaConfirmed.value) {
    fieldErrors.value.area = 'Please confirm the manual area when it differs from length × width by more than 5%.'
    pageError.value = 'Please confirm the manual area before submitting.'
    return null
  }
  const confirmed = isManual ? (differs ? areaConfirmed.value : true) : true
  const date = constructionDate.value
  const constructionDateValue = date ? [date.getFullYear(), String(date.getMonth() + 1).padStart(2, '0'), String(date.getDate()).padStart(2, '0')].join('-') : ''
  const additionalText = [form.value.additionalText.trim(), customTag.value.trim() ? 'Custom tag: ' + customTag.value.trim() : ''].filter(Boolean).join('\n')
  return { ...(roomTypeCode ? { roomTypeCode } : {}), ...(tier ? { tierCode: tier.tierCode, priceVersion: tier.priceVersion } : {}), ...(Number.isFinite(length) ? { length } : {}), ...(Number.isFinite(width) ? { width } : {}), ...(Number.isFinite(height) ? { height } : {}), ...(Number.isFinite(area) ? { areaSource, area, areaConfirmed: confirmed } : {}), styles: selectedStyles.value, tags: selectedTags.value, colors: selectedColors.value, links: form.value.linksText.split(/\r?\n/).map(link => link.trim()).filter(Boolean), roomDescription: form.value.roomDescription.trim(), additionalText, constructionDate: constructionDateValue, contactName: form.value.contactName.trim(), contactMethod: form.value.contactMethod, phone: form.value.phone.trim(), ...(form.value.email.trim() ? { email: form.value.email.trim() } : {}), contactTime: contactTime.value, address: form.value.address.trim(), apt: form.value.apt.trim(), city: form.value.city.trim(), state: form.value.state.trim(), postalCode: form.value.postalCode.trim(), country: form.value.country.trim() }
}
function showRequestError(error: unknown) {
  const requestError = error instanceof DesignRequestError ? error : null
  if (requestError?.code === 'FIELD_INVALID' || requestError?.businessCode === 400 || requestError?.message === 'FIELD_INVALID') pageError.value = '提交的数据不符合要求，请检查房间尺寸、面积、联系时间及其他必填字段。' + (requestError.businessCode !== undefined ? ' (business code: ' + requestError.businessCode + ')' : '')
  else if (requestError?.code === 'CONFIG_INVALID' || requestError?.message === 'CONFIG_INVALID') pageError.value = '房间或档位价格配置无效，请重新选择。' + (requestError.businessCode !== undefined ? ' (business code: ' + requestError.businessCode + ')' : '') + (requestError.status ? ' (HTTP ' + requestError.status + ')' : '')
  else if (requestError?.status === 401 || requestError?.code === 'UNAUTHORIZED') pageError.value = 'Please sign in with a customer account to continue.'
  else if (requestError?.status === 400 || requestError?.status === 422) pageError.value = requestError.message || 'Please check the submitted information.'
  else pageError.value = requestError?.message || (error instanceof Error ? error.message : 'Unable to complete the request.')
}
const pendingRequestKey = 'pending-design-request-form'
const savePendingRequestForm = () => {
  const payload = {
    ...form.value,
    roomTypeCode: selectedRooms.value[0],
    tierCode: selectedTierCode.value,
    styles: selectedStyles.value,
    colors: selectedColors.value,
    tags: selectedTags.value,
    customTag: customTag.value,
    constructionDate: constructionDate.value ? constructionDate.value.toISOString() : ''
  }
  sessionStorage.setItem(pendingRequestKey, JSON.stringify(payload))
}
const handleSubmit = async () => {
  if (submitting.value) return
  pageError.value = ''
  fieldErrors.value = {}
  const auth = getCustomerAuthState()
  if (!auth.isAuthenticated || !auth.token) {
    savePendingRequestForm()
    pageError.value = auth.isGuest ? 'Please sign in with a customer account to submit a design request.' : 'Please sign in to continue.'
    await router.push({ path: '/login', query: { returnTo: '/post-demand' } })
    return
  }
  const payload = buildDesignRequestPayload()
  if (!payload) return
  submitting.value = true
  try {
    const key = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2)
    await submitDesignRequest(payload, key)
    alert('Request submitted. Design-fee payment is not yet connected. View it in My Requests.')
    await router.push('/profile/requests')
  } catch (error) { showRequestError(error) } finally { submitting.value = false }
}
const restoreDraftPayload = (payload: Record<string, unknown>) => {
  const scalar = (key: keyof typeof form.value) => typeof payload[key] === 'string' || typeof payload[key] === 'number' ? String(payload[key]) : ''
  form.value = { length: scalar('length'), width: scalar('width'), height: scalar('height'), area: scalar('area'), roomDescription: scalar('roomDescription'), linksText: Array.isArray(payload.links) ? payload.links.filter((item): item is string => typeof item === 'string').join('\n') : '', additionalText: scalar('additionalText'), constructionDate: scalar('constructionDate'), contactName: scalar('contactName'), contactMethod: scalar('contactMethod'), phone: scalar('phone'), email: scalar('email'), contactTime: scalar('contactTime'), address: scalar('address'), apt: scalar('apt'), city: scalar('city'), state: scalar('state'), postalCode: scalar('postalCode'), country: scalar('country') }
  contactStartTime.value = ''
  contactEndTime.value = ''
  contactTimeRestoreWarning.value = ''
  const savedContactTime = form.value.contactTime.trim()
  const parsedContactTime = /^(\d{2}:\d{2})-(\d{2}:\d{2})$/.exec(savedContactTime)
  if (parsedContactTime && contactTimeOptions.includes(parsedContactTime[1]) && contactTimeOptions.includes(parsedContactTime[2])) {
    contactStartTime.value = parsedContactTime[1]
    contactEndTime.value = parsedContactTime[2]
    syncContactTime()
  } else if (savedContactTime) {
    contactTimeRestoreWarning.value = 'Saved contact time is not a valid time range. Please select a start and end time.'
  }
  const savedAreaSource = payload.areaSource === 'MANUAL' || payload.areaSource === 'CALCULATED' ? payload.areaSource : undefined
  const savedArea = Number(form.value.area)
  const inferredManual = savedAreaSource ? savedAreaSource === 'MANUAL' : Number.isFinite(savedArea) && Number.isFinite(Number(form.value.length) * Number(form.value.width)) && Math.abs(savedArea - Number(form.value.length) * Number(form.value.width)) > 0.05 * Number(form.value.length) * Number(form.value.width)
  areaMode.value = inferredManual ? 'MANUAL' : 'CALCULATED'
  areaConfirmed.value = areaMode.value === 'MANUAL' && payload.areaConfirmed === true
  if (areaMode.value === 'CALCULATED') recalculateArea()
  constructionDate.value = form.value.constructionDate ? new Date(form.value.constructionDate) : undefined
  selectedRooms.value = typeof payload.roomTypeCode === 'string' ? [payload.roomTypeCode] : Array.isArray(payload.rooms) ? payload.rooms.filter((item): item is string => typeof item === 'string') : []
  selectedTierCode.value = typeof payload.tierCode === 'string' ? payload.tierCode : ''
  selectedStyles.value = Array.isArray(payload.styles) ? payload.styles.filter((item): item is string => typeof item === 'string') : []
  selectedColors.value = Array.isArray(payload.colors) ? payload.colors.filter((item): item is string => typeof item === 'string') : []
  selectedTags.value = Array.isArray(payload.tags) ? payload.tags.filter((item): item is string => typeof item === 'string') : []
  customTag.value = typeof payload.customTag === 'string' ? payload.customTag : ''
}
const saveDraft = async () => {
  if (savingDraft.value) return
  pageError.value = ''
  const payload = buildDesignRequestPayload(false)
  if (!payload) return
  payload.customTag = customTag.value
  savingDraft.value = true
  try {
    const result = await saveDesignRequestDraft(draftVersion.value, payload) as { version?: number | string; data?: { version?: number | string } }
    const version = result?.version ?? result?.data?.version
    if (version !== undefined) draftVersion.value = version
    alert('Draft saved')
  } catch (error) { showRequestError(error) } finally { savingDraft.value = false }
}
onMounted(async () => {
  try {
    const options = await getDesignRequestOptions()
    roomOptions.value = options.rooms; styleOptions.value = options.styles; tagOptions.value = options.tags; tierOptions.value = options.tiers; colorOptions.value = options.colors
    lengthUnitLabel.value = options.lengthUnit.toLowerCase() === 'ft' ? 'ft' : options.lengthUnit
    areaUnitLabel.value = options.areaUnit.toLowerCase() === 'sqft' ? 'sq.ft' : options.areaUnit
    if (!options.rooms.length || !options.tiers.length || !options.styles.length) throw new DesignRequestError('No usable rooms, styles, or pricing tiers were returned.')
  } catch (error) { showRequestError(error) }
  let restoredPending = false
  try {
    const pending = sessionStorage.getItem(pendingRequestKey)
    if (pending) {
      restoreDraftPayload(JSON.parse(pending))
      sessionStorage.removeItem(pendingRequestKey)
      restoredPending = true
      pageError.value = 'Your saved form was restored. Review it and submit when ready.'
    }
  } catch { sessionStorage.removeItem(pendingRequestKey) }
  try {
    const draft = await getDesignRequestDraft()
    if (draft) { draftVersion.value = draft.version; if (draft.payload && !restoredPending) restoreDraftPayload(draft.payload) }
  } catch (error) { if (!(error instanceof DesignRequestError) || error.status !== 401) showRequestError(error) }
  document.querySelectorAll('select.form-input').forEach(select => {
    const updateLabel = () => select.nextElementSibling?.classList.toggle('active', (select as HTMLSelectElement).value !== '')
    select.addEventListener('change', updateLabel); select.addEventListener('blur', updateLabel); updateLabel()
  })
})
</script>

<style scoped>
.create-design-request-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F5F5F5;
}

.request-content {
  flex: 1;
  padding: clamp(16px, 1.25vw, 24px);
}

.content-wrapper {
  max-width: clamp(800px, 62.5vw, 1200px);
  margin: 0 auto;
}

/* Page Header */
.page-header {
  margin-bottom: clamp(10px, 0.83vw, 16px);
  text-align: center;
}

.page-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(16px, 1.25vw, 24px);
  font-weight: 700;
  line-height: clamp(16px, 1.25vw, 24px);
  color: #333333;
  margin: 0 0 clamp(10px, 0.83vw, 16px) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(6px, 0.42vw, 8px);
}

.page-title :deep(svg) {
  flex-shrink: 0;
}

.page-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(14px, 1.15vw, 22px);
  color: #5C5C5C;
  margin: 0;
}

/* Form Container */
.form-container {
  background: white;
  border-radius: clamp(3px, 0.21vw, 4px);
  padding: clamp(16px, 1.25vw, 24px);
  display: flex;
  flex-direction: column;
  gap: clamp(21px, 1.67vw, 32px);
}

/* Form Section */
.form-section {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 0.83vw, 16px);
}

.subsection-group {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 1.25vw, 24px);
}

.subsection-item {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.63vw, 12px);
}

.section-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(16px, 1.25vw, 24px);
  font-weight: 700;
  line-height: clamp(21px, 1.67vw, 32px);
  letter-spacing: 0;
  color: #333333;
  margin: 0;
  padding-left: clamp(8px, 0.63vw, 12px);
  position: relative;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: clamp(4px, 0.31vw, 6px);
  height: clamp(13px, 1.04vw, 20px);
  background: #00699A;
  border-radius: 0 clamp(3px, 0.21vw, 4px) clamp(3px, 0.21vw, 4px) 0;
}

.required {
  color: #FF0000;
}

.section-description {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(14px, 1.15vw, 22px);
  color: #5C5C5C;
  margin: 0;
}

.subsection-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.83vw, 16px);
  font-weight: 700;
  line-height: clamp(13px, 1.04vw, 20px);
  letter-spacing: 0;
  color: #333333;
  margin: 0;
}

/* Room Types */
.room-types {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(3px, 0.21vw, 4px);
}

.room-type-btn {
  height: clamp(31px, 2.4vw, 46px);
  padding: clamp(8px, 0.63vw, 12px) clamp(16px, 1.25vw, 24px);
  background: white;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
}

.room-type-btn:hover {
  border-color: #00699A;
}

.room-type-btn.active {
  background: #F7FAFC;
  border-color: #00699A;
  color: #00699A;
}

/* Dimension Inputs */
.dimension-inputs {
  display: flex;
  gap: clamp(10px, 0.83vw, 16px);
}

.dimension-input {
  width: 100%;
  height: clamp(32px, 2.29vw, 44px);
  padding: clamp(2.5px, 0.26vw, 5px) clamp(6px, 0.63vw, 12px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  box-sizing: border-box;
  outline: none;
  background: white;
}

.dimension-input:hover,
.dimension-input:focus {
  border-color: #E5E6EB;
}

.dimension-input::placeholder {
  color: transparent;
}
/* Upload Area */
.upload-area-wrapper {
  width: 50%;
}

.room-upload-section {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 0.63vw, 12px);
  margin-bottom: clamp(16px, 1.25vw, 24px);
}

.upload-grid {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(10px, 0.83vw, 16px);
}

.upload-grid-item {
  position: relative;
  width: calc(50% - clamp(5px, 0.42vw, 8px));
}

.upload-grid-item .upload-area-wrapper {
  width: 100%;
}

.delete-upload-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: clamp(32px, 2.5vw, 48px);
  height: clamp(32px, 2.5vw, 48px);
  background: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: clamp(3px, 0.21vw, 4px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: background 0.2s;
  padding: clamp(8px, 0.63vw, 12px);
}

.delete-upload-btn:hover {
  background: rgba(0, 0, 0, 0.3);
}

.delete-upload-btn svg {
  width: clamp(12px, 0.99vw, 19px);
  height: clamp(12px, 0.99vw, 19px);
  flex-shrink: 0;
  pointer-events: none;
}

.image-preview-container {
  position: relative;
  width: 100%;
  min-height: clamp(120px, 9.38vw, 180px);
  padding: 0;
}

.uploaded-image {
  width: 100%;
  height: 100%;
  min-height: clamp(120px, 9.38vw, 180px);
  object-fit: cover;
  border-radius: clamp(3px, 0.21vw, 4px);
  display: block;
}

.room-upload-header {
  display: flex;
  align-items: center;
  gap: clamp(8px, 0.63vw, 12px);
}

.room-upload-label {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
}

.add-upload-btn {
  width: clamp(38px, 2.97vw, 57px);
  height: clamp(16px, 1.25vw, 24px);
  padding: 1px 8px;
  background: #F7FAFC;
  border: 1px solid #00699A;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Arial', sans-serif;
  font-size: clamp(9px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(15px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #00699A;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(3px, 0.21vw, 4px);
}

.add-upload-btn:hover {
  background: #E8F4F8;
}

.custom-file-input {
  width: 100%;
}

.custom-file-input :deep(.form-control) {
  display: none !important;
}

.custom-file-input :deep(.form-control-plaintext) {
  display: none !important;
}

.custom-file-input :deep(label) {
  display: none !important;
}

.custom-file-input :deep(.btn-light) {
  display: none !important;
}

.custom-file-input :deep(button) {
  display: none !important;
}

.custom-file-input :deep(label[for]) {
  display: none !important;
}

.custom-file-input :deep(.b-form-file-text) {
  padding: 0 !important;
}

.custom-file-input :deep(.btn) {
  width: 100%;
  height: auto;
  padding: 0;
  border: 1px dashed #86909C !important;
  border-radius: clamp(3px, 0.21vw, 4px);
  background: #F9F9F9 !important;
  transition: border-color 0.2s;
}

.custom-file-input :deep(.btn:hover) {
  border-color: #00699A !important;
  background: #F9F9F9 !important;
}

.custom-file-input :deep(.b-form-file-text) {
  border: 1px dashed #86909C !important;
  border-radius: clamp(3px, 0.21vw, 4px);
  background: #F9F9F9 !important;
}

.custom-file-input :deep(.b-form-file-text:hover) {
  border-color: #00699A !important;
}

.upload-placeholder {
  padding: clamp(26px, 2.08vw, 40px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 0.83vw, 16px);
  cursor: pointer;
}

.upload-text-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(5px, 0.42vw, 8px);
}

.upload-text {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  margin: 0;
}

.upload-hint {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(14px, 0.94vw, 18px);
  color: #5C5C5C;
  margin: 0;
  text-align: center;
}

.file-name {
  padding: clamp(26px, 2.08vw, 40px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  text-align: center;
}

/* Textarea */
.description-textarea,
.additional-textarea {
  width: 100%;
  min-height: clamp(80px, 6.25vw, 120px);
  padding: clamp(2.5px, 0.26vw, 5px) clamp(6px, 0.63vw, 12px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  resize: vertical;
  box-sizing: border-box;
  outline: none;
}

.description-textarea:hover,
.description-textarea:focus,
.additional-textarea:hover,
.additional-textarea:focus {
  border-color: #E5E6EB;
}

.description-textarea::placeholder,
.additional-textarea::placeholder {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #9C9C9C;
}

/* Style Options */
.style-options {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(3px, 0.21vw, 4px);
}

.style-btn {
  height: clamp(31px, 2.4vw, 46px);
  padding: clamp(8px, 0.63vw, 12px) clamp(16px, 1.25vw, 24px);
  background: white;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  white-space: nowrap;
}

.style-btn:hover {
  border-color: #00699A;
}

.style-btn.active {
  background: #F7FAFC;
  border-color: #00699A;
  color: #00699A;
}

/* Color Palette */
.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 0.42vw, 8px);
}

.color-btn {
  width: clamp(24px, 1.67vw, 32px);
  height: clamp(24px, 1.67vw, 32px);
  border: 2px solid transparent;
  border-radius: clamp(3px, 0.21vw, 4px);
  cursor: pointer;
  transition: all 0.2s;
}

.color-btn:hover {
  transform: scale(1.1);
}

.color-btn.active {
  border-color: #00699A;
  box-shadow: 0 0 0 2px white, 0 0 0 4px #00699A;
}

/* Design Tiers */
.tier-options {
  display: flex;
  gap: clamp(3px, 0.21vw, 4px);
  flex-wrap: wrap;
}

.tier-btn {
  min-width: clamp(91px, 7.08vw, 136px);
  height: clamp(48px, 3.75vw, 72px);
  padding: clamp(8px, 0.63vw, 12px) clamp(16px, 1.25vw, 24px);
  background: white;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(3px, 0.21vw, 4px);
  box-sizing: border-box;
}

.tier-btn:hover {
  border-color: #00699A;
}

.tier-btn.active {
  background: #F7FAFC;
  border-color: #00699A;
}

.tier-price {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  text-align: center;
}

.tier-btn.active .tier-price {
  color: #00699A;
}

.tier-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  text-align: center;
}

.tier-btn.active .tier-name {
  color: #00699A;
}

/* Budget Range */
.budget-options {
  display: flex;
  gap: clamp(3px, 0.21vw, 4px);
  flex-wrap: wrap;
}

.budget-btn {
  min-width: clamp(91px, 7.08vw, 136px);
  height: clamp(48px, 3.75vw, 72px);
  padding: clamp(8px, 0.63vw, 12px) clamp(16px, 1.25vw, 24px);
  background: white;
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(3px, 0.21vw, 4px);
  box-sizing: border-box;
}

.budget-btn:hover {
  border-color: #00699A;
}

.budget-btn.active {
  background: #F7FAFC;
  border-color: #00699A;
}

.budget-price {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 700;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #333333;
  text-align: center;
}

.budget-btn.active .budget-price {
  color: #00699A;
}

.budget-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #5C5C5C;
  text-align: center;
}

.budget-btn.active .budget-name {
  color: #00699A;
}

/* Link Input */
.link-input {
  width: 100%;
  height: clamp(32px, 2.29vw, 44px);
  padding: clamp(2.5px, 0.26vw, 5px) clamp(6px, 0.63vw, 12px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  box-sizing: border-box;
  outline: none;
}

.link-input:hover,
.link-input:focus {
  border-color: #E5E6EB;
}

.link-input::placeholder {
  color: #5C5C5C;
}

/* Date Input */
.date-input-wrapper {
  width: 50%; /* 修改宽度为 50% */
  position: relative;
}

.date-input-container {
  position: relative;
  width: 100%;
}

:deep(.custom-datepicker) {
  width: 100% !important; /* 确保输入框宽度为 100% */
  height: clamp(32px, 2.29vw, 44px);
  padding: clamp(2.5px, 0.26vw, 5px) clamp(6px, 0.63vw, 12px);
  padding-right: clamp(40px, 3.13vw, 60px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  box-sizing: border-box;
  width: 100%; /* 确保输入框宽度为 100% */
}

/* 修改可选日期span的样式 */
:deep(.v3dp__elements button.selected span) {
  background-color: #00699A !important;
  color: #ffffff !important;
}

:deep(.v3dp__elements button:not(:disabled):hover span) {
  background-color: #00699A !important;
  color: #ffffff !important;
}

:deep(.custom-datepicker:hover),
:deep(.custom-datepicker:focus) {
  outline: none;
}

 :deep(.custom-datepicker::placeholder) {
  color: #9C9C9C;
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
}

.date-input-container .calendar-icon-wrapper {
  position: absolute;
  right: clamp(12px, 1.04vw, 20px);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.date-input-container input {
  width: 100%; /* 确保子元素的 <input> 标签宽度为 100% */
}

/* Tags */
.tags-input {
  width: 100%;
  height: 88px;
  padding: clamp(2.5px, 0.26vw, 5px) clamp(6px, 0.63vw, 12px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(11px, 0.73vw, 14px);
  background: #FFFFFF;
  box-sizing: border-box;
  transition: all 0.2s;
}

.tags-input:focus {
  outline: none;
  border-color: #00699A;
  box-shadow: 0 0 0 2px rgba(0, 105, 154, 0.1);
}

.tags-input::placeholder {
  color: #5C5C5C;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.tag-label {
  height: clamp(12px, 1.25vw, 24px);
  padding: 1px 8px;
  background: #F4F4F4;
  border: 1px solid #E5E6EB;
  border-radius: 4px;
  font-family: 'Arial', sans-serif;
  font-size: clamp(7px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(11px, 1.15vw, 22px);
  letter-spacing: 0;
  color: #1D2129;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin: 0;
  box-sizing: border-box;
  min-width: min-content;
  cursor: pointer;
  user-select: none;
}

.tag-label.active {
  border-color: #00699A;
  background: #E8F4FA;
  color: #00699A;
}

.request-error {
  margin: 8px 0 0;
  color: #b42318;
  font-size: 13px;
  overflow-wrap: anywhere;
  white-space: normal;
  line-height: 1.45;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.action-button-row {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 0.42vw, 8px);
}

.request-feedback {
  width: 100%;
  min-width: 0;
}

.field-errors {
  padding-left: 20px;
  margin-bottom: 0;
}

.has-error {
  border-color: #b42318 !important;
  box-shadow: 0 0 0 1px rgba(180, 35, 24, 0.12);
}

.recalculate-btn {
  align-self: flex-start;
  margin-top: 6px;
  padding: 3px 8px;
  border: 1px solid #00699A;
  border-radius: 3px;
  background: #F7FAFC;
  color: #00699A;
  font-size: 12px;
  cursor: pointer;
}

.area-mode-hint {
  display: block;
  margin-top: 4px;
  color: #5C5C5C;
}

.area-confirmation {
  margin-top: 8px;
  color: #8a4b08;
  font-size: 12px;
  line-height: 1.4;
}

.area-confirmation label {
  display: block;
  margin-top: 4px;
}

.contact-time-picker {
  min-width: 0;
}

.contact-time-controls {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
}

.contact-time-controls .form-input {
  flex: 1;
  min-width: 0;
}

.contact-time-separator {
  color: #5C5C5C;
}

.contact-time-display {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  color: #333333;
  font-size: 12px;
}

.submit-btn:disabled,
.draft-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* Contact Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 0.83vw, 16px);
}

.form-row {
  display: flex;
  gap: clamp(10px, 0.83vw, 16px);
}

.floating-label-wrapper {
  flex: 1;
  position: relative;
}

.form-input {
  width: 100%;
  height: clamp(32px, 2.29vw, 44px);
  padding: clamp(2.5px, 0.26vw, 5px) clamp(6px, 0.63vw, 12px);
  border: 1px solid #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  color: #333333;
  outline: none;
  box-sizing: border-box;
  background: white;
}

.form-input:hover,
.form-input:focus {
  border-color: #E5E6EB;
}

.floating-label {
  position: absolute;
  left: clamp(10px, 0.83vw, 16px);
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  color: #5C5C5C;
  pointer-events: none;
  transition: all 0.2s ease;
  background: white;
  padding: 0 clamp(2px, 0.21vw, 4px);
}

input.form-input:focus + .floating-label,
input.form-input:not(:placeholder-shown) + .floating-label,
input.dimension-input:focus + .floating-label,
input.dimension-input:not(:placeholder-shown) + .floating-label,
.floating-label.active {
  top: 0;
  transform: translateY(-50%);
  font-size: clamp(10px, 0.63vw, 12px);
  color: #5C5C5C;
}

.form-input.full-width {
  width: 100%;
}

.form-input::placeholder {
  color: transparent;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-top: 0;
}

.action-button-row {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(4px, 0.42vw, 8px);
}

.submit-btn {
  height: clamp(22px, 2.29vw, 44px);
  padding: clamp(5px, 0.52vw, 10px) clamp(12px, 1.25vw, 24px);
  background: #333333;
  color: white;
  border: none;
  border-radius: clamp(2px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover {
  background: #1a1a1a;
}

.draft-btn {
  height: clamp(22px, 2.29vw, 44px);
  padding: clamp(5px, 0.52vw, 10px) clamp(12px, 1.25vw, 24px);
  background: white;
  color: #333333;
  border: 1px solid #333333;
  border-radius: clamp(2px, 0.21vw, 4px);
  font-family: 'Inter', sans-serif;
  font-size: clamp(12px, 0.73vw, 14px);
  font-weight: 400;
  line-height: clamp(18px, 1.15vw, 22px);
  cursor: pointer;
  transition: all 0.2s;
}

.draft-btn:hover {
  background: #F5F5F5;
}
</style>

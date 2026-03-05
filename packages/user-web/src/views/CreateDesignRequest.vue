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
                <div class="room-types">
                  <button 
                    v-for="room in roomTypes" 
                    :key="room"
                    class="room-type-btn"
                    :class="{ active: selectedRooms.includes(room) }"
                    @click="toggleRoom(room)"
                  >
                    {{ room }}
                  </button>
                </div>
              </div>
              
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Room dimensions (m²)</h3>
                <p class="section-description">Please provide the total dimensions for all the design rooms mentioned.</p>
                <div class="dimension-inputs">
                  <div class="floating-label-wrapper">
                    <input type="text" id="length" class="dimension-input" placeholder=" " required>
                    <label for="length" class="floating-label"><span class="required">*</span>Length</label>
                  </div>
                  <div class="floating-label-wrapper">
                    <input type="text" id="width" class="dimension-input" placeholder=" " required>
                    <label for="width" class="floating-label"><span class="required">*</span>Width</label>
                  </div>
                </div>
                <div class="dimension-inputs">
                  <div class="floating-label-wrapper">
                    <input type="text" id="height" class="dimension-input" placeholder=" " required>
                    <label for="height" class="floating-label"><span class="required">*</span>Height</label>
                  </div>
                  <div class="floating-label-wrapper">
                    <input type="text" id="area" class="dimension-input" placeholder=" " required>
                    <label for="area" class="floating-label"><span class="required">*</span>Area</label>
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
                          <p class="upload-text">Click to upload</p>
                          <p class="upload-hint">Drag and drop your file here, and the max size will be allowed 10MB</p>
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
                  placeholder="Please describe your room's present condition, existing features, and specific requirements."
                  class="description-textarea"
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
                    :key="style"
                    class="style-btn"
                    :class="{ active: selectedStyles.includes(style) }"
                    @click="toggleStyle(style)"
                  >
                    {{ style }}
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
            <h3 class="subsection-title">What is your target budget?</h3>
            <p class="section-description">Please provide your budget range for this design project. This helps us match you with the right designer and create a proposal that fits your needs.</p>
            <div class="budget-options">
              <button 
                v-for="budget in budgetRanges" 
                :key="budget.value"
                class="budget-btn"
                :class="{ active: selectedBudget === budget.value }"
                @click="selectedBudget = budget.value"
              >
                {{ budget.label }}
              </button>
            </div>
          </div>
          
          <!-- Design Tier -->
          <div class="form-section">
            <h2 class="section-title">Design Tier</h2>
            <div class="tier-options">
              <button 
                v-for="tier in designTiers" 
                :key="tier.value"
                class="tier-btn"
                :class="{ active: selectedTier === tier.value }"
                @click="selectedTier = tier.value"
              >
                <div class="tier-price">${{ tier.price }}</div>
                <div class="tier-name">{{ tier.name }}</div>
              </button>
            </div>
          </div>
          
          <!-- Inspiration Links -->
          <!-- Inspiration Links -->
          <div class="form-section">
            <h2 class="section-title">Inspiration & Reference Links</h2>
            <div class="subsection-group">
              <div class="subsection-item">
                <h3 class="subsection-title"><span class="required">*</span>Reference Source (optional)</h3>
                <input 
                  type="text" 
                  placeholder="Paste a link to your Pinterest boards, online designs, or other inspiration source."
                  class="link-input"
                >
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
                          <p class="upload-text">Click to upload</p>
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
            <div class="date-input-wrapper">
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
              <span 
                v-for="tag in designTags" 
                :key="tag"
                class="tag-label"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div class="form-section">
            <h2 class="section-title">Contact Information</h2>
            <div class="contact-form">
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input type="text" id="fullName" class="form-input" placeholder=" ">
                  <label for="fullName" class="floating-label"><span class="required">*</span>Full name</label>
                </div>
                <div class="floating-label-wrapper">
                  <select id="contactMethod" class="form-input">
                    <option value=""></option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                  </select>
                  <label for="contactMethod" class="floating-label"><span class="required">*</span>Contact Method</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input type="text" id="phoneNumber" class="form-input" placeholder=" ">
                  <label for="phoneNumber" class="floating-label"><span class="required">*</span>Phone Number</label>
                </div>
                <div class="floating-label-wrapper">
                  <input type="text" id="contactTime" class="form-input" placeholder=" ">
                  <label for="contactTime" class="floating-label"><span class="required">*</span>Preferred Contact Time</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input type="text" id="projectAddress" class="form-input" placeholder=" ">
                  <label for="projectAddress" class="floating-label"><span class="required">*</span>Project Address</label>
                </div>
                <div class="floating-label-wrapper">
                  <input type="text" id="aptSuite" class="form-input" placeholder=" ">
                  <label for="aptSuite" class="floating-label">Apt, Suite, Unit, etc.</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input type="text" id="city" class="form-input" placeholder=" ">
                  <label for="city" class="floating-label">City</label>
                </div>
                <div class="floating-label-wrapper">
                  <input type="text" id="state" class="form-input" placeholder=" ">
                  <label for="state" class="floating-label">State</label>
                </div>
              </div>
              <div class="form-row">
                <div class="floating-label-wrapper">
                  <input type="text" id="postalCode" class="form-input" placeholder=" ">
                  <label for="postalCode" class="floating-label">Postal Code</label>
                </div>
                <div class="floating-label-wrapper">
                  <input type="text" id="country" class="form-input" placeholder=" ">
                  <label for="country" class="floating-label">Country</label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Additional Items -->
          <div class="form-section">
            <h2 class="section-title">Additional Items (Optional)</h2>
            <textarea 
              placeholder="Any other information you'd like designers to know"
              class="additional-textarea"
            ></textarea>
          </div>
          
          <!-- Action Buttons -->
          <div class="action-buttons">
            <button class="submit-btn">Submit Design Request</button>
            <button class="draft-btn">Save as Draft</button>
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
import { BFormFile } from 'bootstrap-vue-next'
import Datepicker from 'vue3-datepicker'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import CalendarIcon from '@/components/CalendarIcon.vue'

// Room types
const roomTypes = ['Bathroom', 'Living Room', 'Bedroom', 'Dining Room', 'Balcony', 'Whole House']
const selectedRooms = ref<string[]>([])

// Check if Whole House is selected
const isWholeHouseSelected = computed(() => selectedRooms.value.includes('Whole House'))

// Style options
const styleOptions = ['Modern', 'Minimalist', 'Nordic', 'Chinese', 'Japanese', 'Industrial', 'Mediterranean', 'Vintage']
const selectedStyles = ref<string[]>([])

// Color palette
const colorPalette = [
  '#000000', '#333333', '#666666', '#999999',
  '#FFB6C1', '#FFC0CB', '#FFD700', '#FFFF00',
  '#90EE90', '#00FF00', '#87CEEB', '#00BFFF',
  '#4169E1', '#0000FF', '#9370DB', '#8B008B',
  '#DDA0DD', '#EE82EE'
]
const selectedColors = ref<string[]>([])

// Design tiers
const designTiers = [
  { value: 'classic', price: '3,000', name: 'CLASSIC' },
  { value: 'modern', price: '5,000', name: 'MODERN' },
  { value: 'premium', price: '10,000', name: 'PREMIUM' },
  { value: 'luxury', price: '20,000+', name: 'LUXURY' }
]
const selectedTier = ref('')

// Budget ranges
const budgetRanges = [
  { value: 'budget', label: 'Budget' },
  { value: 'economy', label: 'Economy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'luxurious', label: 'Luxurious' }
]
const selectedBudget = ref('')

// Design tags
const designTags = ['Cozy', 'Bright', 'Spacious', 'Modern', 'Classic', 'Functional', 'Top', 'Big', 'Top']
const selectedTags = ref<string[]>([])
const customTag = ref('')

// Construction date
const constructionDate = ref<Date | undefined>(undefined)

// Toggle functions
const toggleRoom = (room: string) => {
  const index = selectedRooms.value.indexOf(room)
  if (index > -1) {
    selectedRooms.value.splice(index, 1)
  } else {
    selectedRooms.value.push(room)
  }
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

// Handle select floating label
import { onMounted } from 'vue'

onMounted(() => {
  const selectElements = document.querySelectorAll('select.form-input')
  selectElements.forEach((select) => {
    const updateLabel = () => {
      const label = select.nextElementSibling
      if (select.value !== '') {
        label?.classList.add('active')
      } else {
        label?.classList.remove('active')
      }
    }
    
    select.addEventListener('change', updateLabel)
    select.addEventListener('blur', updateLabel)
    
    updateLabel()
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
  border: 2px dashed #E5E6EB;
  border-radius: clamp(3px, 0.21vw, 4px);
  background: transparent;
  transition: border-color 0.2s;
}

.custom-file-input :deep(.btn:hover) {
  border-color: #00699A;
  background: transparent;
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

.budget-btn:hover {
  border-color: #00699A;
}

.budget-btn.active {
  background: #F7FAFC;
  border-color: #00699A;
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
  cursor: default;
  user-select: none;
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
  gap: clamp(4px, 0.42vw, 8px);
  justify-content: center;
  margin-top: 0;
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

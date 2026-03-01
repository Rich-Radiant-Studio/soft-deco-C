# 响应式设计快速参考

## 🚫 禁止使用

```css
width: 800px;        /* ❌ 固定宽度 */
height: 600px;       /* ❌ 固定高度 */
font-size: 16px;     /* ❌ 固定字体 */
padding: 20px;       /* ❌ 固定间距 */
margin: 30px;        /* ❌ 固定外边距 */
```

## ✅ 推荐使用

### 1. CSS 变量（最推荐）

```css
/* 使用预定义的 CSS 变量 */
width: var(--container-lg);
padding: var(--spacing-md);
font-size: var(--font-base);
border-radius: var(--radius-md);
gap: var(--spacing-lg);
```

### 2. clamp() 函数

```css
/* clamp(最小值, 理想值, 最大值) */
width: clamp(320px, 80vw, 1200px);
font-size: clamp(14px, 1.5vw, 18px);
padding: clamp(16px, 2vw, 32px);
gap: clamp(12px, 1.5vw, 24px);
```

### 3. 视口单位

```css
width: 50vw;         /* 视口宽度的 50% */
height: 100vh;       /* 视口高度的 100% */
font-size: 2vw;      /* 视口宽度的 2% */
```

### 4. 百分比

```css
width: 100%;         /* 父元素宽度的 100% */
max-width: 80%;      /* 最大宽度为父元素的 80% */
```

### 5. rem/em

```css
font-size: 1.5rem;   /* 相对于根元素 */
padding: 2rem;       /* 相对于根元素 */
margin: 1.5em;       /* 相对于当前元素字体大小 */
```

## 📱 断点系统

```css
/* 移动优先 */
@media (min-width: 576px) { /* 小屏及以上 */ }
@media (min-width: 768px) { /* 中屏及以上 */ }
@media (min-width: 992px) { /* 大屏及以上 */ }
@media (min-width: 1200px) { /* 超大屏及以上 */ }

/* 桌面优先 */
@media (max-width: 767px) { /* 小屏及以下 */ }
@media (max-width: 991px) { /* 中屏及以下 */ }
@media (max-width: 1199px) { /* 大屏及以下 */ }
```

## 🛠️ Vue 组件中使用

### 方式 1：使用 Composable

```vue
<script setup lang="ts">
import { useResponsive } from '@/composables/useResponsive';

const r = useResponsive();

const cardStyle = computed(() => ({
  width: r.value.clamp(400, 280, 500),
  padding: r.value.clamp(24, 16, 32),
}));
</script>

<template>
  <div :style="cardStyle">
    <p v-if="r.isMobile">移动端</p>
    <p v-else-if="r.isTablet">平板</p>
    <p v-else>桌面</p>
  </div>
</template>
```

### 方式 2：使用工具函数

```vue
<script setup lang="ts">
import { vw, vh, clamp } from '@/utils/responsive';

const cardStyle = {
  width: clamp(400, 280, 500),
  height: vh(600),
  padding: vw(24),
};
</script>

<template>
  <div :style="cardStyle">内容</div>
</template>
```

### 方式 3：直接使用 CSS 变量

```vue
<template>
  <div class="card">内容</div>
</template>

<style scoped>
.card {
  width: var(--container-md);
  padding: var(--spacing-lg);
  font-size: var(--font-base);
  border-radius: var(--radius-md);
}
</style>
```

## 📦 常用 CSS 变量

### 字体大小
```css
var(--font-xs)    /* 12-14px */
var(--font-sm)    /* 14-16px */
var(--font-base)  /* 16-18px */
var(--font-md)    /* 18-20px */
var(--font-lg)    /* 20-24px */
var(--font-xl)    /* 24-32px */
var(--font-2xl)   /* 32-40px */
var(--font-3xl)   /* 40-48px */
```

### 间距
```css
var(--spacing-xs)   /* 4-8px */
var(--spacing-sm)   /* 8-12px */
var(--spacing-md)   /* 12-16px */
var(--spacing-lg)   /* 16-24px */
var(--spacing-xl)   /* 24-32px */
var(--spacing-2xl)  /* 32-48px */
var(--spacing-3xl)  /* 48-64px */
```

### 容器宽度
```css
var(--container-xs)   /* 280-540px */
var(--container-sm)   /* 320-720px */
var(--container-md)   /* 540-960px */
var(--container-lg)   /* 720-1140px */
var(--container-xl)   /* 960-1320px */
var(--container-xxl)  /* 1140-1536px */
```

### 圆角
```css
var(--radius-xs)   /* 2-4px */
var(--radius-sm)   /* 4-6px */
var(--radius-md)   /* 6-8px */
var(--radius-lg)   /* 8-12px */
var(--radius-xl)   /* 12-16px */
var(--radius-2xl)  /* 16-24px */
```

## 🎯 实战示例

### 响应式卡片

```vue
<template>
  <div class="card">
    <img :src="image" class="card-image" />
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-text">{{ description }}</p>
  </div>
</template>

<style scoped>
.card {
  width: clamp(280px, 40vw, 400px);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
  gap: var(--spacing-md);
}

.card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: var(--radius-sm);
}

.card-title {
  font-size: var(--font-lg);
  margin-bottom: var(--spacing-sm);
}

.card-text {
  font-size: var(--font-base);
  line-height: var(--leading-normal);
}
</style>
```

### 响应式网格

```vue
<template>
  <div class="grid">
    <div v-for="item in items" :key="item.id" class="grid-item">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(clamp(250px, 30vw, 350px), 1fr)
  );
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
}

.grid-item {
  min-height: clamp(200px, 20vh, 300px);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}
</style>
```

## 🔍 检查清单

提交代码前确认：

- [ ] 没有使用固定像素值（除了 1px, 2px）
- [ ] 容器宽度是响应式的
- [ ] 字体大小使用 CSS 变量或 clamp()
- [ ] 间距使用 CSS 变量或 clamp()
- [ ] 在多个断点测试过（手机、平板、桌面）
- [ ] 在不同分辨率测试过（1920x1080, 1366x768, 375x667）

## 📚 更多信息

详细文档：`RESPONSIVE_DESIGN_GUIDE.md`

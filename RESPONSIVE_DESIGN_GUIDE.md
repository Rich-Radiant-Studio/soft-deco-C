# 响应式设计规范

## 核心原则

### 🎯 所有尺寸必须动态计算，基于当前分辨率
- 禁止使用固定像素值（除了极少数特殊情况）
- 使用相对单位：rem, em, %, vw, vh, clamp()
- 使用 CSS 变量实现动态尺寸系统
- 使用媒体查询实现断点响应

## 1. 尺寸单位使用规范

### ✅ 推荐使用

```css
/* 1. 使用 clamp() 实现流式响应 */
width: clamp(300px, 50vw, 800px);  /* 最小300px，理想50vw，最大800px */
font-size: clamp(14px, 1.5vw, 18px);

/* 2. 使用 CSS 变量 + calc() */
--base-size: 16px;
width: calc(var(--base-size) * 20);  /* 320px */

/* 3. 使用百分比 */
width: 100%;
max-width: 80%;

/* 4. 使用 vw/vh（视口单位）*/
width: 50vw;   /* 视口宽度的50% */
height: 100vh; /* 视口高度的100% */

/* 5. 使用 rem（相对根元素）*/
font-size: 1.5rem;  /* 相对于 html font-size */
padding: 2rem;

/* 6. 使用 em（相对父元素）*/
padding: 1.5em;  /* 相对于当前元素的 font-size */
```

### ❌ 避免使用

```css
/* 固定像素值 */
width: 800px;        /* ❌ 不响应 */
height: 600px;       /* ❌ 不响应 */
font-size: 16px;     /* ❌ 不响应 */
padding: 20px;       /* ❌ 不响应 */
```

## 2. 响应式断点系统

### 标准断点定义

```css
/* CSS 变量定义 */
:root {
  --breakpoint-xs: 320px;   /* 超小屏 */
  --breakpoint-sm: 576px;   /* 小屏 */
  --breakpoint-md: 768px;   /* 中屏 */
  --breakpoint-lg: 992px;   /* 大屏 */
  --breakpoint-xl: 1200px;  /* 超大屏 */
  --breakpoint-xxl: 1400px; /* 超超大屏 */
}

/* 媒体查询使用 */
/* 移动优先 */
@media (min-width: 576px) { /* 小屏及以上 */ }
@media (min-width: 768px) { /* 中屏及以上 */ }
@media (min-width: 992px) { /* 大屏及以上 */ }
@media (min-width: 1200px) { /* 超大屏及以上 */ }

/* 桌面优先 */
@media (max-width: 1199px) { /* 大屏及以下 */ }
@media (max-width: 991px) { /* 中屏及以下 */ }
@media (max-width: 767px) { /* 小屏及以下 */ }
@media (max-width: 575px) { /* 超小屏 */ }
```

## 3. 动态尺寸计算系统

### 方案 A：CSS 变量 + clamp()（推荐）

```css
:root {
  /* 基础尺寸 */
  --base-font-size: clamp(14px, 1.5vw, 16px);
  --base-spacing: clamp(8px, 1vw, 16px);
  
  /* 容器尺寸 */
  --container-width: clamp(320px, 90vw, 1200px);
  --card-width: clamp(280px, 40vw, 400px);
  
  /* 字体尺寸 */
  --font-xs: clamp(12px, 1.2vw, 14px);
  --font-sm: clamp(14px, 1.4vw, 16px);
  --font-md: clamp(16px, 1.6vw, 18px);
  --font-lg: clamp(18px, 2vw, 24px);
  --font-xl: clamp(24px, 3vw, 36px);
  
  /* 间距系统 */
  --spacing-xs: clamp(4px, 0.5vw, 8px);
  --spacing-sm: clamp(8px, 1vw, 12px);
  --spacing-md: clamp(12px, 1.5vw, 16px);
  --spacing-lg: clamp(16px, 2vw, 24px);
  --spacing-xl: clamp(24px, 3vw, 32px);
}

/* 使用示例 */
.container {
  width: var(--container-width);
  padding: var(--spacing-lg);
  font-size: var(--font-md);
}
```

### 方案 B：JavaScript 动态计算

```typescript
// utils/responsive.ts

/**
 * 响应式尺寸计算工具
 */
export class ResponsiveUtils {
  private static baseWidth = 1920;  // 设计稿基准宽度
  private static baseHeight = 1080; // 设计稿基准高度
  
  /**
   * 根据视口宽度计算尺寸
   * @param size 设计稿中的尺寸
   * @param base 基准宽度（默认1920）
   */
  static vw(size: number, base: number = this.baseWidth): string {
    return `${(size / base) * 100}vw`;
  }
  
  /**
   * 根据视口高度计算尺寸
   * @param size 设计稿中的尺寸
   * @param base 基准高度（默认1080）
   */
  static vh(size: number, base: number = this.baseHeight): string {
    return `${(size / base) * 100}vh`;
  }
  
  /**
   * 计算响应式尺寸（带最小最大值限制）
   * @param size 理想尺寸
   * @param min 最小值
   * @param max 最大值
   */
  static clamp(size: number, min: number, max: number): string {
    const vwSize = this.vw(size);
    return `clamp(${min}px, ${vwSize}, ${max}px)`;
  }
  
  /**
   * 获取当前视口尺寸
   */
  static getViewport() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    };
  }
  
  /**
   * 判断当前断点
   */
  static getBreakpoint(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    if (width < 1400) return 'xl';
    return 'xxl';
  }
  
  /**
   * 监听视口变化
   */
  static onResize(callback: (viewport: ReturnType<typeof this.getViewport>) => void) {
    const handler = () => callback(this.getViewport());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }
}

// 使用示例
const width = ResponsiveUtils.vw(800);  // "41.67vw"
const height = ResponsiveUtils.vh(600); // "55.56vh"
const fontSize = ResponsiveUtils.clamp(16, 14, 20); // "clamp(14px, 0.83vw, 20px)"
```

### 方案 C：Vue Composable（推荐用于 Vue 项目）

```typescript
// composables/useResponsive.ts
import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useResponsive() {
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  
  // 计算响应式尺寸
  const responsive = computed(() => ({
    // 基于宽度的尺寸
    vw: (size: number, base = 1920) => `${(size / base) * 100}vw`,
    vh: (size: number, base = 1080) => `${(size / base) * 100}vh`,
    
    // clamp 函数
    clamp: (ideal: number, min: number, max: number) => 
      `clamp(${min}px, ${(ideal / 1920) * 100}vw, ${max}px)`,
    
    // 当前断点
    breakpoint: (() => {
      const w = windowWidth.value;
      if (w < 576) return 'xs';
      if (w < 768) return 'sm';
      if (w < 992) return 'md';
      if (w < 1200) return 'lg';
      if (w < 1400) return 'xl';
      return 'xxl';
    })(),
    
    // 是否移动端
    isMobile: windowWidth.value < 768,
    isTablet: windowWidth.value >= 768 && windowWidth.value < 992,
    isDesktop: windowWidth.value >= 992,
    
    // 视口信息
    viewport: {
      width: windowWidth.value,
      height: windowHeight.value,
      ratio: windowWidth.value / windowHeight.value
    }
  }));
  
  // 监听窗口变化
  const updateSize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };
  
  onMounted(() => {
    window.addEventListener('resize', updateSize);
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateSize);
  });
  
  return responsive;
}

// 使用示例
// <script setup>
// const r = useResponsive();
// </script>
//
// <template>
//   <div :style="{ width: r.vw(800), height: r.vh(600) }">
//     当前断点: {{ r.breakpoint }}
//   </div>
// </template>
```

## 4. 实战示例

### 示例 1：响应式卡片

```vue
<template>
  <div class="card">
    <img :src="image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  /* 使用 clamp 实现流式宽度 */
  width: clamp(280px, 40vw, 400px);
  
  /* 使用 CSS 变量 */
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  
  /* 响应式间距 */
  gap: clamp(12px, 1.5vw, 20px);
}

.card-image {
  width: 100%;
  /* 保持宽高比 */
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-sm);
}

.card-title {
  /* 响应式字体 */
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1.4;
  margin-bottom: clamp(8px, 1vw, 12px);
}

.card-description {
  font-size: clamp(14px, 1.5vw, 16px);
  line-height: 1.6;
  color: var(--text-secondary);
}

/* 断点调整 */
@media (max-width: 768px) {
  .card {
    width: 100%;
    max-width: 100%;
  }
}
</style>
```

### 示例 2：响应式网格布局

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
  
  /* 响应式列数 */
  grid-template-columns: repeat(auto-fit, minmax(clamp(250px, 30vw, 350px), 1fr));
  
  /* 响应式间距 */
  gap: clamp(16px, 2vw, 32px);
  
  /* 响应式内边距 */
  padding: clamp(16px, 3vw, 48px);
}

.grid-item {
  /* 响应式高度 */
  min-height: clamp(200px, 20vh, 300px);
  
  padding: clamp(12px, 1.5vw, 24px);
  border-radius: clamp(8px, 1vw, 16px);
}
</style>
```

### 示例 3：使用 Composable

```vue
<script setup lang="ts">
import { useResponsive } from '@/composables/useResponsive';

const r = useResponsive();

// 动态计算样式
const cardStyle = computed(() => ({
  width: r.value.clamp(400, 280, 500),
  padding: r.value.clamp(24, 16, 32),
  fontSize: r.value.clamp(16, 14, 18)
}));
</script>

<template>
  <div class="container">
    <div class="card" :style="cardStyle">
      <p>当前断点: {{ r.breakpoint }}</p>
      <p>视口宽度: {{ r.viewport.width }}px</p>
      <p v-if="r.isMobile">移动端视图</p>
      <p v-else-if="r.isTablet">平板视图</p>
      <p v-else>桌面视图</p>
    </div>
  </div>
</template>
```

## 5. 迁移指南

### 从固定像素迁移到响应式

```css
/* ❌ 旧代码 */
.container {
  width: 800px;
  height: 600px;
  padding: 20px;
  font-size: 16px;
}

/* ✅ 新代码 */
.container {
  width: clamp(320px, 80vw, 800px);
  height: clamp(400px, 60vh, 600px);
  padding: clamp(12px, 2vw, 20px);
  font-size: clamp(14px, 1.5vw, 16px);
}
```

### 批量替换建议

1. 宽度/高度：使用 `clamp()` 或百分比
2. 字体大小：使用 `clamp()` 或 `rem`
3. 间距：使用 CSS 变量 + `clamp()`
4. 边框圆角：使用 `clamp()` 或固定小值
5. 阴影：可保持固定值

## 6. 性能优化

### 避免过度计算

```css
/* ❌ 不好：每个属性都用 clamp */
.element {
  width: clamp(100px, 10vw, 200px);
  height: clamp(100px, 10vw, 200px);
  padding: clamp(10px, 1vw, 20px);
  margin: clamp(10px, 1vw, 20px);
  border-radius: clamp(5px, 0.5vw, 10px);
  /* ... 太多了 */
}

/* ✅ 好：使用 CSS 变量复用 */
:root {
  --size-md: clamp(100px, 10vw, 200px);
  --spacing-md: clamp(10px, 1vw, 20px);
  --radius-sm: clamp(5px, 0.5vw, 10px);
}

.element {
  width: var(--size-md);
  height: var(--size-md);
  padding: var(--spacing-md);
  margin: var(--spacing-md);
  border-radius: var(--radius-sm);
}
```

## 7. 检查清单

在提交代码前，确保：

- [ ] 没有使用固定像素值（除了极小值如 1px, 2px）
- [ ] 所有容器宽度都是响应式的
- [ ] 字体大小使用相对单位或 clamp()
- [ ] 间距使用 CSS 变量或 clamp()
- [ ] 在多个断点测试过
- [ ] 在不同分辨率下测试过（1920x1080, 1366x768, 375x667）
- [ ] 使用浏览器开发工具的响应式模式测试

## 8. 工具推荐

- Chrome DevTools 响应式模式
- Firefox 响应式设计模式
- VS Code 插件：px to rem & rpx & vw
- 在线工具：https://nekocalc.com/px-to-rem-converter

## 总结

记住三个核心原则：
1. **流式布局**：使用 clamp(), vw, vh, %
2. **断点响应**：使用媒体查询适配不同设备
3. **CSS 变量**：统一管理，便于维护

让每个尺寸都能随着视口动态变化！

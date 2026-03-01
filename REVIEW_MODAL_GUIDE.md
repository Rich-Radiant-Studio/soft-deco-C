# 评论弹窗实现指南

## 概述

根据设计图实现了一个功能完整的评论弹窗组件，包含筛选标签、评论列表和分页功能。

## 功能特性

### 1. 筛选功能
- **全部98%好评**：显示所有评论
- **图片赞200+**：只显示带图片的评论
- **好评200+**：只显示4星及以上的评论
- **中评 4**：只显示3星评论
- **差评 0**：只显示3星以下的评论

### 2. 分页功能
- 每页显示3条评论
- 智能分页器：
  - 总页数 ≤ 7：显示所有页码
  - 总页数 > 7：显示首页、末页、当前页附近页码，中间用省略号
- 上一页/下一页按钮
- 当前页高亮显示

### 3. 响应式设计
- 所有尺寸使用 `clamp()` 动态计算
- 完美适配桌面、平板、手机
- 弹窗宽度：`clamp(320px, 90vw, 1000px)`
- 弹窗高度：最大 90vh，内容超出可滚动

## 组件结构

### 文件位置
```
packages/user-web/src/components/ReviewModal.vue
```

### Props
```typescript
interface Props {
  visible: boolean;    // 控制弹窗显示/隐藏
  reviews: Review[];   // 评论数据数组
}
```

### Events
```typescript
emit('close')  // 关闭弹窗事件
```

### Review 数据结构
```typescript
interface Review {
  id: number;
  username: string;
  avatar: string;
  rating: number;      // 1-5星评分
  text: string;
  images: string[];
  date: string;        // 格式：'2026-01-28 17:12:05'
}
```

## 使用方法

### 1. 在 CaseDetail.vue 中引入

```vue
<script setup>
import ReviewModal from '@/components/ReviewModal.vue'

const showReviewModal = ref(false)

// 准备评论数据（添加日期和评分）
const reviewsWithDate = computed(() => {
  return allReviews.value.map(review => ({
    ...review,
    date: '2026-01-28 17:12:05',
    rating: review.rating || 5
  }))
})

// 打开弹窗
const openReviewModal = () => {
  showReviewModal.value = true
}
</script>

<template>
  <!-- 触发按钮 -->
  <button @click="openReviewModal">View more</button>

  <!-- 弹窗组件 -->
  <ReviewModal 
    :visible="showReviewModal" 
    :reviews="reviewsWithDate"
    @close="showReviewModal = false"
  />
</template>
```

### 2. 评论数据示例

```typescript
const reviews = [
  {
    id: 1,
    username: 'Mia Wu',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'This industrial style floor lamp is definitely the focus...',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ],
    date: '2026-01-28 17:12:05'
  },
  {
    id: 2,
    username: 'Sally',
    avatar: 'https://i.pravatar.cc/150?img=2',
    rating: 4,
    text: 'Great product, highly recommend!',
    images: [],
    date: '2026-01-28 17:12:05'
  }
]
```

## 设计规范

### 尺寸（根据设计图）
- **弹窗宽度**：1000px（响应式：320px - 1000px）
- **弹窗高度**：864px（最大90vh，可滚动）
- **圆角**：4px
- **内边距**：24px 32px 32px 32px
- **间距**：24px

### 颜色
- **背景色**：#FFFFFF
- **遮罩层**：rgba(0, 0, 0, 0.5)
- **边框色**：#E5E7EB
- **文字主色**：#1D2129
- **文字次色**：#6B7280
- **主题色**：#00699A
- **星星颜色**：#FFC107

### 字体
- **标题**：24px, 700
- **用户名**：16px, 500
- **评论文字**：14px, 400
- **日期**：14px, 400
- **筛选标签**：14px, 400

## 响应式断点

### 桌面端（> 768px）
- 弹窗宽度：最大 1000px
- 筛选标签：横向排列
- 评论图片：90px × 90px
- 分页按钮：40px × 40px

### 移动端（≤ 768px）
- 弹窗宽度：95vw
- 筛选标签：自动换行
- 评论图片：60-80px × 60-80px
- 分页按钮：28-36px × 28-36px
- 字体大小自动缩小

## 交互逻辑

### 筛选切换
1. 点击筛选标签
2. 更新 `activeFilter` 状态
3. 自动重置到第一页
4. 根据筛选条件过滤评论
5. 重新计算分页

### 分页切换
1. 点击页码或上一页/下一页
2. 更新 `currentPage` 状态
3. 根据当前页计算显示的评论
4. 滚动到评论列表顶部（可选）

### 关闭弹窗
- 点击关闭按钮
- 点击遮罩层
- 触发 `close` 事件
- 重置筛选和分页状态

## 性能优化

1. **计算属性缓存**：使用 `computed` 缓存筛选和分页结果
2. **条件渲染**：使用 `v-if` 控制弹窗显示
3. **虚拟滚动**：如果评论数量超过1000条，建议使用虚拟滚动
4. **图片懒加载**：评论图片可以添加懒加载

## 扩展功能

### 可以添加的功能
1. **排序**：按时间、评分排序
2. **搜索**：搜索评论内容
3. **图片预览**：点击图片放大查看
4. **点赞/回复**：评论互动功能
5. **加载更多**：无限滚动加载
6. **导出评论**：导出为PDF或Excel

### 示例：添加排序功能

```vue
<script setup>
const sortBy = ref('date') // 'date' | 'rating'

const sortedReviews = computed(() => {
  const reviews = [...filteredReviews.value]
  
  if (sortBy.value === 'date') {
    return reviews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } else if (sortBy.value === 'rating') {
    return reviews.sort((a, b) => b.rating - a.rating)
  }
  
  return reviews
})
</script>

<template>
  <select v-model="sortBy">
    <option value="date">按时间排序</option>
    <option value="rating">按评分排序</option>
  </select>
</template>
```

## 测试建议

### 功能测试
1. 测试所有筛选标签是否正常工作
2. 测试分页功能（首页、末页、中间页）
3. 测试上一页/下一页按钮
4. 测试关闭弹窗的所有方式
5. 测试空状态（无评论、无图片评论等）

### 响应式测试
1. 在不同分辨率下测试（1920×1080, 1366×768, 375×667）
2. 测试横屏和竖屏
3. 测试弹窗在小屏幕上的滚动
4. 测试筛选标签的换行

### 边界测试
1. 只有1条评论
2. 超过100条评论
3. 评论文字超长
4. 评论图片超多（10+张）
5. 所有评论都是5星（筛选结果为空）

## 常见问题

### Q: 弹窗打开后页面可以滚动？
A: 可以在弹窗打开时禁用 body 滚动：
```javascript
watch(() => props.visible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
```

### Q: 如何添加动画效果？
A: 使用 Vue 的 `<Transition>` 组件：
```vue
<Transition name="modal">
  <div v-if="visible" class="review-modal-overlay">
    ...
  </div>
</Transition>

<style>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
```

### Q: 如何实现图片预览？
A: 可以使用第三方库如 `vue-easy-lightbox` 或自己实现：
```vue
<script setup>
const previewImage = ref('')
const showPreview = ref(false)

const openPreview = (img: string) => {
  previewImage.value = img
  showPreview.value = true
}
</script>

<template>
  <img @click="openPreview(img)" />
  
  <div v-if="showPreview" class="image-preview">
    <img :src="previewImage" />
  </div>
</template>
```

## 总结

这个评论弹窗组件完全按照设计图实现，具有：
- ✅ 完整的筛选功能
- ✅ 智能分页系统
- ✅ 完全响应式设计
- ✅ 优雅的交互体验
- ✅ 易于扩展和维护

可以直接在项目中使用，也可以根据实际需求进行定制。

# 案例详情页响应式优化计划

## 优化目标
将案例详情页(CaseDetail.vue)中所有固定像素值改为响应式动态计算,确保在不同分辨率下都能完美显示。

## 优化原则
1. **所有尺寸必须动态计算** - 使用 `clamp()` 函数根据视口宽度动态计算
2. **禁止固定像素值** - 除了 1px、2px 等极小边框值外,所有尺寸都要响应式
3. **保持设计比例** - 在不同屏幕尺寸下保持元素间的视觉比例关系
4. **移动端优先** - 确保在小屏幕设备上也能正常显示和交互

## clamp() 使用规范
```css
/* 语法: clamp(最小值, 首选值, 最大值) */
font-size: clamp(12px, 1.2vw, 14px);  /* 字体大小 */
padding: clamp(8px, 1vw, 12px);       /* 内边距 */
margin: clamp(16px, 2vw, 24px);       /* 外边距 */
gap: clamp(4px, 0.5vw, 8px);          /* 间距 */
```

## 优化任务清单

### 阶段1: 标题和评分区域 (优先级: 高)
- [ ] 1.1 产品标题 (.product-title)
  - 当前: `font-size: 36px`, `line-height: 40px`
  - 优化为: `font-size: clamp(24px, 3vw, 36px)`, `line-height: clamp(28px, 3.5vw, 40px)`
  
- [ ] 1.2 星星评分 (.stars i)
  - 当前: `font-size: 24px`, `width: 24px`, `height: 24px`
  - 优化为: `font-size: clamp(18px, 2vw, 24px)`, `width: clamp(18px, 2vw, 24px)`, `height: clamp(18px, 2vw, 24px)`
  
- [ ] 1.3 评分分数 (.rating-score)
  - 当前: `font-size: 16px`, `line-height: 20px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`
  
- [ ] 1.4 查看评论链接 (.view-reviews-link)
  - 当前: `font-size: 16px`, `line-height: 20px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`

### 阶段2: 价格和设计师信息 (优先级: 高)
- [ ] 2.1 当前价格 (.current-price)
  - 当前: `font-size: 20px`, `line-height: 40px`
  - 优化为: `font-size: clamp(16px, 1.8vw, 20px)`, `line-height: clamp(32px, 3.5vw, 40px)`
  
- [ ] 2.2 价格数字 (.price-number)
  - 当前: `font-size: 24px`, `line-height: 28px`
  - 优化为: `font-size: clamp(20px, 2.2vw, 24px)`, `line-height: clamp(24px, 2.6vw, 28px)`
  
- [ ] 2.3 设计师信息 (.designer-info)
  - 当前: `font-size: 16px`, `line-height: 20px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`
  
- [ ] 2.4 价格设计师行间距
  - 当前: `gap: 16px`, `margin: 24px 0 16px 0`
  - 优化为: `gap: clamp(12px, 1.5vw, 16px)`, `margin: clamp(16px, 2vw, 24px) 0 clamp(12px, 1.5vw, 16px) 0`

### 阶段3: 服务选项区域 (优先级: 高)
- [ ] 3.1 服务标题 (.service-title)
  - 当前: `font-size: 16px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`
  
- [ ] 3.2 选项复选框文本 (.option-checkbox span)
  - 当前: `font-size: 16px`, `line-height: 20px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`
  
- [ ] 3.3 选项价格 (.option-price)
  - 当前: `font-size: 16px`, `line-height: 20px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`
  
- [ ] 3.4 复选框尺寸
  - 当前: `width: 20px`, `height: 20px`
  - 优化为: `width: clamp(16px, 1.8vw, 20px)`, `height: clamp(16px, 1.8vw, 20px)`
  
- [ ] 3.5 复选框对勾字体
  - 当前: `font-size: 14px`
  - 优化为: `font-size: clamp(12px, 1.2vw, 14px)`

### 阶段4: 材料表格 (优先级: 中)
- [ ] 4.1 交付日期 (.delivery-date)
  - 当前: `font-size: 14px`, `line-height: 18px`, `margin-bottom: 8px`
  - 优化为: `font-size: clamp(12px, 1.2vw, 14px)`, `line-height: clamp(16px, 1.6vw, 18px)`, `margin-bottom: clamp(6px, 0.8vw, 8px)`
  
- [ ] 4.2 表格表头 (.materials-table thead th)
  - 当前: `font-size: 14px`, `line-height: 22px`, `padding: 12px 16px`
  - 优化为: `font-size: clamp(12px, 1.2vw, 14px)`, `line-height: clamp(18px, 1.8vw, 22px)`, `padding: clamp(10px, 1.2vw, 12px) clamp(12px, 1.5vw, 16px)`
  
- [ ] 4.3 表格单元格 (.materials-table tbody td)
  - 当前: `font-size: 14px`, `line-height: 22px`, `padding: 12px 16px`
  - 优化为: `font-size: clamp(12px, 1.2vw, 14px)`, `line-height: clamp(18px, 1.8vw, 22px)`, `padding: clamp(10px, 1.2vw, 12px) clamp(12px, 1.5vw, 16px)`
  
- [ ] 4.4 表格复选框
  - 当前: `width: 16px`, `height: 16px`
  - 优化为: `width: clamp(14px, 1.5vw, 16px)`, `height: clamp(14px, 1.5vw, 16px)`
  
- [ ] 4.5 表格复选框对勾
  - 当前: `font-size: 12px`
  - 优化为: `font-size: clamp(10px, 1vw, 12px)`
  
- [ ] 4.6 空数据状态
  - 当前: `padding: 40px 20px`, `font-size: 14px`, `line-height: 20px`
  - 优化为: `padding: clamp(32px, 4vw, 40px) clamp(16px, 2vw, 20px)`, `font-size: clamp(12px, 1.2vw, 14px)`, `line-height: clamp(18px, 1.8vw, 20px)`

### 阶段5: 日期选择器 (优先级: 中)
- [ ] 5.1 日期选择器输入框 (.date-picker input)
  - 当前: `padding: 12px`, `font-size: 14px`, `line-height: 18px`, `border-radius: 4px`
  - 优化为: `padding: clamp(10px, 1.2vw, 12px)`, `font-size: clamp(12px, 1.2vw, 14px)`, `line-height: clamp(16px, 1.6vw, 18px)`, `border-radius: clamp(3px, 0.4vw, 4px)`
  
- [ ] 5.2 日期选择器图标 (.date-picker i)
  - 当前: `font-size: 16px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`
  
- [ ] 5.3 日期选择器占位符
  - 当前: `font-size: 14px`, `line-height: 18px`
  - 优化为: `font-size: clamp(12px, 1.2vw, 14px)`, `line-height: clamp(16px, 1.6vw, 18px)`

### 阶段6: 总价区域 (优先级: 中) ✅
- [x] 6.1 总价标题 (.total-title)
  - 当前: `font-size: 16px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)` ✅
  
- [x] 6.2 价格行 (.price-row)
  - 当前: `font-size: 16px`, `line-height: 20px`, `gap: 8px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`, `gap: clamp(6px, 0.8vw, 8px)` ✅
  
- [x] 6.3 总价行 (.price-row.total-row)
  - 当前: `font-size: 16px`, `line-height: 20px`, `margin-bottom: 24px`
  - 优化为: `font-size: clamp(14px, 1.4vw, 16px)`, `line-height: clamp(18px, 1.8vw, 20px)`, `margin-bottom: clamp(16px, 2vw, 24px)` ✅
  
- [x] 6.4 总价区域内边距和间距 (.total-price-section)
  - 当前: `padding-top: 8px`, `gap: 8px`
  - 优化为: `padding-top: clamp(6px, 0.8vw, 8px)`, `gap: clamp(6px, 0.8vw, 8px)` ✅
  
- [x] 6.5 总价标题容器间距 (.total-title-container)
  - 当前: `gap: 16px`
  - 优化为: `gap: clamp(12px, 1.5vw, 16px)` ✅

### 阶段7: 操作按钮 (优先级: 高)
- [ ] 7.1 按钮通用样式 (.btn)
  - 当前: `padding: 12px`, `border-radius: 4px`, `font-size: 24px`
  - 优化为: `padding: clamp(10px, 1.2vw, 12px)`, `border-radius: clamp(3px, 0.4vw, 4px)`, `font-size: clamp(18px, 2vw, 24px)`
  
- [ ] 7.2 按钮容器间距 (.action-buttons)
  - 当前: `gap: 12px`, `margin-top: 24px`
  - 优化为: `gap: clamp(10px, 1.2vw, 12px)`, `margin-top: clamp(16px, 2vw, 24px)`

### 阶段8: 标签页区域 (优先级: 中)
- [ ] 8.1 标签按钮 (.tab-btn)
  - 当前: `font-size: 14px`
  - 优化为: `font-size: clamp(12px, 1.2vw, 14px)`
  
- [ ] 8.2 标签按钮内边距和间距
  - 检查并优化所有相关的 padding、margin、gap

### 阶段9: 产品卡片 (优先级: 中)
- [ ] 9.1 产品卡片网格 (.product-grid-2col)
  - 检查并优化 gap、padding 等间距
  
- [ ] 9.2 产品卡片信息 (.product-card-info)
  - 优化所有字体大小、行高、内边距
  
- [ ] 9.3 产品卡片标签和值
  - 优化 .label 和 .value 的字体样式

### 阶段10: 评论区域 (优先级: 低)
- [ ] 10.1 评论标题 (.review-title)
  - 优化字体大小和行高
  
- [ ] 10.2 评论项 (.review-item)
  - 优化内边距和间距
  
- [ ] 10.3 评论头像 (.review-avatar)
  - 优化尺寸
  
- [ ] 10.4 评论文本 (.review-text)
  - 优化字体样式

### 阶段11: 设计灵感区域 (优先级: 低)
- [ ] 11.1 灵感标题 (.inspiration-title)
  - 优化字体大小和行高
  
- [ ] 11.2 灵感介绍 (.inspiration-intro)
  - 优化字体样式
  
- [ ] 11.3 详情行 (.detail-row)
  - 优化标签和文本的字体样式

### 阶段12: 弹窗组件 (优先级: 中)
- [ ] 12.1 重新设计弹窗 (.redesign-modal)
  - 优化所有尺寸、字体、间距
  
- [ ] 12.2 弹窗标题 (.modal-title)
  - 优化字体样式
  
- [ ] 12.3 弹窗输入框 (.input-field, .custom-textarea)
  - 优化尺寸和字体
  
- [ ] 12.4 弹窗按钮 (.btn-cancel, .btn-submit)
  - 优化按钮样式

## 执行顺序
1. **第一批**: 阶段1、2、7 (标题、价格、按钮 - 最显眼的元素)
2. **第二批**: 阶段3、4 (服务选项、材料表格 - 核心功能)
3. **第三批**: 阶段5、6 (日期选择器、总价 - 辅助功能)
4. **第四批**: 阶段8、9 (标签页、产品卡片 - 内容展示)
5. **第五批**: 阶段10、11、12 (评论、灵感、弹窗 - 次要内容)

## 测试检查点
每完成一个阶段后,需要在以下分辨率下测试:
- [ ] 1920px (桌面大屏)
- [ ] 1440px (桌面标准)
- [ ] 1024px (平板横屏)
- [ ] 768px (平板竖屏)
- [ ] 375px (手机)

## 注意事项
1. 修改时要保持原有的视觉层次和设计意图
2. 确保所有交互元素(按钮、输入框等)在小屏幕上仍然可点击
3. 文本内容要避免在小屏幕上被截断
4. 保持足够的行高和间距,确保可读性
5. 使用浏览器开发者工具实时预览不同分辨率下的效果

## 完成标准
- ✅ 所有固定像素值都已改为响应式计算
- ✅ 在所有测试分辨率下显示正常
- ✅ 没有布局错乱或内容溢出
- ✅ 保持原有的设计风格和视觉效果
- ✅ 通过移动端和桌面端的实际设备测试

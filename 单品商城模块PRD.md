# 单品商城模块产品需求文档

版本：V1.0  
文档状态：评审稿  
适用端：Web 用户端  
页面路由：/shop  
核心目标：展示可购买单品，支持分类浏览、条件筛选、商品详情进入及购物车购买承接

## 1. 产品概述

单品商城是平台面向 Customer 和游客的商品浏览与购买入口。页面基于现有 Shop.vue 静态页面设计，采用“左侧品类导航 + 右侧筛选与商品网格”的结构，集中展示家具、家居及建材类单品。用户可以按空间品类、价格、品牌、材质、结构、风格和尺寸筛选商品，点击商品卡片进入商品详情页，并从详情页加入购物车或立即购买。

## 2. 产品目标与范围

### 2.1 产品目标

1. 让用户快速发现符合预算、品类和风格偏好的单品。
2. 提供清晰的商品卡片信息，降低从浏览到详情的决策成本。
3. 通过可组合筛选缩短查找路径，提高商品曝光与购买转化。
4. 为商品详情、购物车和结算流程提供统一入口。

### 2.2 本期范围

- 商品商城首页与全量商品展示。
- 左侧分类导航：All Products、Living Room、Bedroom、Kitchen、Bathroom、Other。
- 分类下的二级品类导航。
- 价格区间、品牌、材质、结构、风格、尺寸筛选。
- 材质、结构、风格筛选项展开/收起。
- 自定义最低价/最高价输入与筛选。
- Reset 重置筛选。
- 商品卡片、图片、分类、价格、名称和简述展示。
- 商品卡片跳转 /product/:id。
- 响应式布局及空结果、加载、错误状态预留。

### 2.3 非目标

本期不包含后台商品发布、库存编辑、商品评价发布、收藏按钮、商城内直接改数量、优惠券、排序和分页的完整实现；但接口需要预留这些字段和能力。

## 3. 用户与业务场景

| 用户 | 场景 | 需求 |
|---|---|---|
| 游客 | 浏览商城 | 查看公开商品并进入详情，可加入购物车 |
| Customer | 选购单品 | 按筛选条件查找、查看详情、购买商品 |
| Designer/Supplier | 了解市场商品 | 浏览材料与单品，为设计或供应业务做参考 |

游客浏览不要求登录；加入购物车和下单是否需要登录由购物车/结算模块统一控制。

## 4. 页面信息架构

### 4.1 公共区域

- Header：沿用全站头部，提供首页、商城、购物车、用户入口等导航。
- 页面背景：浅灰色，内容区域与筛选区域使用白色卡片承载。
- Footer 与 FloatingActionButtons：沿用全站公共组件。

### 4.2 左侧品类导航

Products 下提供 All Products；空间分类包括：

- Living Room：Sofas、Coffee Tables、TV Stands/Media Cabinets、Side Tables/Corner Tables、Storage/Display Cabinets。
- Bedroom：Beds、Nightstands、Wardrobes、Vanity Tables/Desks、Dressers/Drawer Chests。
- Kitchen：Base Cabinets、Wall Cabinets、Tall Cabinets、Pantry Cabinets、Sideboards、Kitchen Islands/Bars。
- Bathroom：Vanity Cabinets、Mirror Cabinets、Toilets、Sinks/Basins、Shower Systems、Bathtubs。
- Other：Other Products。

当前分类需要高亮并提供选中反馈；点击分类后更新商品列表、筛选结果和 URL 查询参数，刷新页面后可恢复当前条件。

## 5. 筛选功能

### 5.1 价格区间

- 预置区间：$0-100、$100-500、$500-1000、$1000-2000、$2000+。
- 自定义输入：Min、Max 数字输入框。
- 点击 Filter 执行筛选；最低价不得大于最高价，金额不可为负数。
- 价格输入支持小数，提交时统一转为标准金额。
- 预置区间与自定义区间互斥或覆盖规则需明确，建议后选择条件覆盖前选择条件。

### 5.2 品牌

当前页面提供 IKEA、Lin's Wood、QuanU Home。支持单选或多选，建议产品化为多选，以满足联合筛选。

### 5.3 材质

默认展示 Oak、Walnut、Pine、Particle Board、MDF；展开后展示 Metal、Fabric、Leather、Faux Leather、Upholstered。点击 + Show More 展开，点击 - Show Less 收起；展开状态不应清空已选值。

### 5.4 结构

默认展示 Platform Bed、Storage Bed、Upholstered Bed；展开后展示 Canopy Bed、Bunk Bed。

### 5.5 风格

默认展示 Modern、Scandinavian、Asian、Industrial、American；展开后展示 European Classic、Japanese。

### 5.6 尺寸

提供 Twin、Full、Queen、King，并支持 Reset 清除全部筛选条件。若尺寸仅适用于部分品类，切换品类时应隐藏无效项或置为不可选。

### 5.7 筛选交互规则

- 筛选条件改变后显示加载状态，防止重复请求。
- 支持多条件组合，结果需同时满足所有已选条件。
- 筛选条件通过 URL query 持久化，支持复制链接分享。
- 无结果时展示空状态、当前条件摘要和 Clear Filters 操作。
- Reset 清除分类之外的所有筛选；提供“全部商品”时同步清除分类。
- 结果数量和筛选条件变更后更新页面状态，不应跳回页面顶部（首次进入除外）。

## 6. 商品列表与商品卡片

### 6.1 卡片信息

每张商品卡片展示：

- 商品主图及 alt 文本。
- 商品分类，如 Living Room Furniture。
- 当前售价，货币符号与数字分开显示。
- 商品名称，如 Cloud Fabric Sofa。
- 商品简述，如 High-density foam filling for ultimate comfort。

### 6.2 卡片行为

- 整张卡片可点击，跳转 /product/{id}。
- 点击后保留返回商城时的分类、筛选和滚动位置。
- 图片加载失败显示占位图；商品名称过长时最多两行并省略。
- 商品下架、售罄、预售状态需要在卡片上显示状态标签，并限制不可购买或跳转到状态说明。
- 价格应支持原价、促销价和折扣字段扩展；本期默认展示当前价。

### 6.3 列表加载

- 首次加载展示骨架屏。
- 接口失败展示重试按钮，不影响 Header 和 Footer 使用。
- 商品为空时展示“暂无商品”，引导清除筛选或返回全部商品。
- 后续可扩展分页、加载更多和排序（综合、价格、销量、新品）。

## 7. 与详情和购买链路衔接

1. 用户点击商品卡片进入商品详情页。
2. 详情页负责规格选择、SKU 校验、税费试算及加入购物车/立即购买。
3. 加入购物车成功后更新 Header 购物车数量，并保留用户在商城的筛选上下文。
4. 立即购买进入结算流程；游客登录要求由认证模块承接。
5. 商品列表价格仅为展示值，最终价格、库存和促销以详情页及服务端校验为准。

## 8. 数据模型与接口建议

商品对象建议包含：productId、category、subcategory、brand、name、description、image、price、originalPrice、currency、materials[]、structures[]、styles[]、sizes[]、stockStatus、sales、updatedAt。

| 接口 | 方法 | 用途 |
|---|---|---|
| /products | GET | 获取商品列表、分页和筛选结果 |
| /products/categories | GET | 获取分类树与品类数量 |
| /products/filters | GET | 获取品牌、材质、结构、风格、尺寸等可选项 |
| /products/{id} | GET | 进入详情页前获取单品详情 |

列表接口参数建议：category、subcategory、minPrice、maxPrice、brands[]、materials[]、structures[]、styles[]、sizes[]、page、pageSize、sort。

## 9. 状态与异常

- Loading：筛选区域保持可见，商品网格展示骨架。
- Empty：无商品结果，显示筛选条件和清除操作。
- Error：网络或服务端异常，显示重试按钮。
- Image Error：单张图片失败时显示默认图片，不影响其他卡片。
- Category Not Found：分类不存在时回退到 All Products。
- Price Invalid：价格区间不合法时在输入框旁提示，不发送请求。
- Inventory Changed：进入详情后发现库存变化，以详情页和服务端返回为准。

## 10. 响应式与可访问性

- 桌面端采用侧栏 + 主内容区；筛选区域横向分组排列。
- 平板端缩小侧栏宽度并允许筛选项换行。
- 移动端侧栏转为可展开分类面板，筛选区转为抽屉或折叠面板，商品网格至少两列或单列自适应。
- 筛选按钮、分类链接和卡片支持键盘操作，并提供 focus 状态。
- 不能只用颜色表示选中状态，应结合背景、边框、图标或文字。
- 图片 alt 应包含商品名称；价格、分类和状态使用可读文本。

## 11. 埋点与指标

建议事件：shop_view、category_select、filter_select、price_filter_apply、filter_expand、filter_reset、product_card_click、product_image_error、empty_result_view、retry_click。

核心指标：商城访问量、分类点击率、筛选使用率、筛选后商品点击率、详情页到达率、空结果率、卡片点击转化率、图片加载失败率、列表接口 P95、购买链路转化率。

## 12. 验收标准

1. /shop 可正常展示侧栏分类、筛选区域和商品网格。
2. All Products、Living Room、Bedroom、Kitchen、Bathroom、Other 及二级分类可点击并显示选中状态。
3. 价格预置区间、自定义 Min/Max、Filter 均可用，非法区间有明确提示。
4. 品牌、材质、结构、风格、尺寸筛选项与页面内容一致。
5. 材质、结构、风格支持展开与收起，展开不丢失已选条件。
6. Reset 可清除筛选并恢复商品列表。
7. 多条件筛选按 AND 逻辑返回结果，无结果时展示空状态。
8. 每张商品卡片正确展示图片、分类、价格、名称和简述。
9. 点击卡片进入正确的 /product/:id，返回商城时保留筛选上下文。
10. Loading、Error、Empty、图片失败、下架/售罄状态均有清晰反馈。
11. 桌面、平板、移动端无横向溢出，筛选和商品卡片可操作。
12. 商品列表展示价不作为最终成交价，详情/结算阶段必须重新校验价格和库存。

## 13. 版本规划与待确认事项

### V1.0

完成分类导航、基础筛选、商品卡片展示、详情跳转和响应式适配。

### V1.1

增加真实分页/加载更多、商品排序、筛选 URL 持久化、收藏入口和库存标签。

### V1.2

增加搜索联动、个性化推荐、促销价、优惠券预览和多语言商品属性。

待确认：品牌等条件采用单选还是多选；筛选是否实时请求还是点击 Filter 后请求；是否需要排序；移动端筛选抽屉的交互形式；游客购物车数据是否跨设备同步；商品卡片是否展示评分、销量和折扣。

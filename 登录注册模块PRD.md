# 登录注册模块产品需求文档

版本：V1.0  
文档状态：评审稿  
适用端：Web 用户端  
核心范围：登录、注册、游客访问、角色识别与角色差异化身份资料采集

## 1. 产品概述

登录注册模块是平台用户进入业务系统前的统一身份入口。模块通过角色选择将用户分流至不同的登录与注册路径，保证 Customer、Designer、Supplier、Contractor、Guest 等角色能够使用与其业务身份匹配的功能。

本期以现有前端静态页面为交互基线：登录弹窗支持五类角色；注册弹窗支持 Customer、Designer、Supplier 三类可注册角色；注册表单包含邮箱验证码、密码确认、协议勾选和角色专属字段；游客可自动创建临时身份并在后续升级为正式账号。

## 2. 背景与目标

### 2.1 背景

当前页面已经具备登录/注册弹窗、角色卡片、基础表单、邮箱验证码、条款链接和游客欢迎弹窗等静态交互。后续需要将页面明确沉淀为可研发、可测试、可验收的产品需求。

### 2.2 产品目标

1. 建立以角色为核心的统一身份入口。
2. 降低不同角色进入平台的认知成本和操作成本。
3. 通过角色专属资料采集，为后续权限、审核、推荐和业务撮合提供结构化数据。
4. 支持游客低门槛访问，并提供从游客身份升级为正式账号的路径。
5. 明确异常、校验、状态和安全要求，保证研发实现一致。

### 2.3 非目标

本期不包含角色后台首页、角色权限矩阵、实名审核工作台、支付绑定、社交账号真实 OAuth 接入和完整找回密码流程的后端实现；但需要预留接口和页面状态。

## 3. 用户角色与业务定位

| 角色 | 登录 | 注册 | 角色定位 | 默认去向 |
|---|---|---|---|---|
| Customer | 支持 | 支持 | 浏览商品、提交订单、管理个人资料 | 用户首页/商城 |
| Designer | 支持 | 支持 | 上传设计方案、展示作品、参与设计交易 | 设计师工作台 |
| Supplier | 支持 | 支持 | 提供建材及相关商品 | 供应商工作台 |
| Contractor | 支持 | 不支持本期前端注册 | 承接施工/项目服务 | 承包商工作台 |
| Guest | 支持游客入口 | 不适用 | 临时浏览和体验平台 | 当前页面，受限访问 |

规则：登录角色必须由用户主动选择；系统不得默认将一个账号静默切换到另一角色。若账号与所选角色不匹配，应提示用户重新选择或切换账号。

## 4. 信息架构与入口

### 4.1 入口

- 顶部导航登录入口：打开登录弹窗。
- 登录弹窗 Create Account / Register now：进入注册态。
- 注册弹窗 Already have an account? Sign in：返回登录态。
- 游客访问入口：创建游客身份并触发欢迎弹窗。
- 游客欢迎弹窗 Upgrade Now：进入注册流程；Continue as Guest：继续受限访问。

### 4.2 弹窗共性

- 遮罩层覆盖页面，点击遮罩空白区域可关闭。
- 右上角关闭按钮可关闭。
- 关闭后保留用户已输入内容的策略由前端实现确定；默认关闭即结束当前会话，下次打开重置。
- 桌面端最大宽度约 1000px，最大高度 90vh；供应商注册内容超出视口时，中间表单区独立滚动，底部操作区固定。
- 移动端采用单列布局，角色卡片、字段和复选项自适应换行。

## 5. 登录需求

### 5.1 登录页面结构

1. 标题：Sign In。
2. 角色选择区：Customer、Designer、Supplier、Contractor、Guest 五张卡片，单选，当前选中项高亮。
3. 基础登录表单：Email、Password。
4. 主操作：Sign In。
5. 次操作：Create Account。
6. 辅助操作：Forgot Password?。
7. 第三方登录：Google、Facebook。
8. 底部引导：Don't have an account? Register now。

### 5.2 登录字段

| 字段 | 类型 | 必填 | 规则 | 错误提示建议 |
|---|---|---:|---|---|
| Email | email | 是 | 合法邮箱格式，去除首尾空格 | Please enter a valid email address |
| Password | password | 是 | 不得为空；长度和复杂度由后端策略统一 | Please enter your password |
| Role | 单选 | 是 | 五选一，默认 Customer 仅作为页面初始态 | Please select a role |

### 5.3 登录行为

- 点击 Sign In：前端校验通过后调用登录接口，按钮进入 loading，禁止重复提交。
- 登录成功：保存 token、用户基础信息、角色信息；关闭弹窗并按角色跳转。
- 登录失败：保留用户输入，展示可理解的错误信息；密码类错误不得暴露账号是否存在。
- 账号角色不匹配：提示“当前账号不属于所选角色”，提供重新选择角色和返回登录的操作。
- 账号被冻结、未激活或待审核：根据状态展示对应提示，不直接进入业务页面。
- 点击 Forgot Password?：进入找回密码流程占位页或打开找回密码弹窗；本期需保留可点击入口。
- 点击 Google/Facebook：调用第三方登录接口；未接入时可展示“Coming soon”或禁用态，不得出现无响应按钮。

### 5.4 角色登录差异

| 角色 | 允许的登录后能力 | 额外状态 |
|---|---|---|
| Customer | 商品浏览、购物车、订单、个人资料 | 无需审核 |
| Designer | 作品管理、设计请求、报价/订单协作 | 可存在审核中状态 |
| Supplier | 商品及公司信息管理、订单协作 | 可存在审核中状态 |
| Contractor | 项目/施工服务相关能力 | 可存在审核中状态 |
| Guest | 浏览公开内容、有限体验 | 无正式账号权益，不进入受保护页面 |

## 6. 注册需求

### 6.1 注册页面结构

1. 标题：Create your account。
2. 副标题：Join our platform as a Customer, Designer or Supplier。
3. 角色卡片：Customer、Designer、Supplier，单选；每张卡片展示名称和角色描述。
4. 公共字段区：Email、Password、Email verification code、Confirm password、Phone number。
5. 角色专属字段区：随角色切换动态展示。
6. 协议区：同意 Terms of Service 和 Privacy Policy。
7. 操作区：Cancel、Create account。
8. 已有账号引导：Sign in。

### 6.2 公共注册字段

| 字段 | 必填 | 规则 |
|---|---:|---|
| Email | 是 | 合法邮箱；不可注册已存在账号 |
| Password | 是 | 密码复杂度由后端统一；输入框默认隐藏明文 |
| Email verification code | 是 | 发送前必须填写邮箱；验证码发送后 60 秒倒计时 |
| Confirm password | 是 | 必须与 Password 完全一致 |
| Phone number | 否 | 按国际号码格式校验；可作为后续联系信息 |
| Agreement | 是 | 未勾选不得提交；链接可查看条款和隐私政策 |

### 6.3 Customer 注册

Customer 仅填写公共字段。提交成功后创建普通用户账号，默认无需审核，注册完成后跳转登录页或自动登录，具体以接口方案确定。

### 6.4 Designer 注册

Designer 在公共字段后增加：

- Designer Nature：Individual、Studio、Company 三选一，默认 Individual。
- Designer / Company Name：必填。
- Specialized Room Types：多选，至少建议选择 1 项。选项包括 Living Room、Bedroom、Kitchen、Bathroom、Dining Room、Study、Balcony、Entrance、Kids Room、Storage。

提交成功后，账号状态可为“待审核”或“已激活”，由业务规则决定；页面需要能承接审核中提示。

### 6.5 Supplier 注册

Supplier 在公共字段后增加：

公司信息：Company Name、Contact Person、Contact Phone，均必填。  
公司地址：Street Address、Apartment/Suite/Floor 等、City、State/Province、Postal Code、Country；除 Apartment 外均必填。  
建材品类：Tiles、Flooring、Bathroom、Cabinets、Doors & Windows、Paint、Lighting、Hardware、Others，多选，建议至少选择 1 项。

Supplier 表单内容较长，页面中间区域滚动，底部协议和提交操作固定可见。

## 7. 游客身份需求

### 7.1 游客创建

- 用户选择 Guest 或通过游客入口进入时，系统创建临时游客身份。
- 本地保存 userInfo、guestAccount 等必要信息，避免刷新后丢失体验状态。
- 游客账号需具备唯一标识、用户名和创建时间。

### 7.2 欢迎弹窗

首次创建游客身份后延迟展示欢迎弹窗，展示用户名和账号 ID，并说明游客权限限制。

操作：

- Upgrade Now：关闭弹窗并进入注册，默认承接游客上下文。
- Continue as Guest：关闭弹窗并继续浏览。
- 关闭按钮：等同继续游客访问，并记录 hasSeenGuestWelcome，避免重复打扰。

### 7.3 游客限制

游客可浏览公开内容，但涉及下单、提交设计请求、上传作品、管理公司信息等受保护操作时，需要引导登录或注册。游客升级时应尽量保留浏览上下文，后续可扩展游客数据迁移。

## 8. 状态与交互规则

### 8.1 角色切换

- 登录角色切换只改变登录角色，不清空 Email 和 Password。
- 注册角色切换保留公共字段，清空上一角色的专属字段和校验错误。
- 切换后立即刷新角色专属区、滚动容器和必填校验规则。

### 8.2 验证码

- 邮箱为空时点击发送，提示先填写邮箱，不发起请求。
- 发送成功后按钮禁用并显示 60s 倒计时。
- 倒计时结束后恢复可点击。
- 频繁发送、验证码过期、验证码错误需展示明确提示。

### 8.3 提交状态

- 提交中按钮 loading 且不可重复点击。
- 成功后关闭弹窗并跳转；失败后保持当前页面和输入内容。
- 所有错误应靠近字段或以统一 toast/alert 呈现，不能只依赖颜色表达。

## 9. 校验与异常

### 9.1 校验触发

- blur：输入框失焦时进行格式校验。
- change：协议、单选、复选项变化时更新校验状态。
- submit：提交时执行全量校验，并自动定位到第一个错误字段。

### 9.2 重点异常

- 邮箱格式错误。
- 邮箱已注册。
- 验证码为空、错误或过期。
- 密码与确认密码不一致。
- 未勾选服务条款和隐私政策。
- Designer/Supplier 专属必填项缺失。
- 网络异常、接口超时、服务端错误。
- 用户选择的登录角色与账号角色不匹配。
- 游客本地缓存损坏或解析失败。

## 10. 接口建议

| 接口 | 方法 | 说明 |
|---|---|---|
| /auth/login | POST | email、password、role |
| /auth/register | POST | 公共字段、role、角色专属资料、verificationCode |
| /auth/send-email-code | POST | email、scene=register/reset |
| /auth/oauth/{provider} | GET/POST | Google/Facebook 登录 |
| /auth/forgot-password | POST | 发起找回密码 |
| /auth/guest | POST | 创建或恢复游客身份 |
| /auth/guest/upgrade | POST | 游客升级正式账号，预留数据迁移 |

统一返回：code、message、data、requestId。登录和注册成功返回 accessToken、refreshToken、userId、role、status、profileCompletion。

## 11. 权限与安全

- 密码不得明文存储、日志不得记录密码和验证码。
- 验证码需设置有效期、发送频控和错误次数限制。
- 登录接口需具备防暴力破解、设备/IP 风险控制和必要的验证码策略。
- token 应使用安全存储方案，退出登录时清理本地身份信息。
- 条款与隐私政策需支持版本号和同意时间留痕。
- 前端角色选择不能作为唯一权限依据，后端必须基于 token 和账号角色鉴权。

## 12. 埋点与指标

事件建议：auth_modal_open、role_select、login_submit、login_success、login_fail、register_submit、register_success、register_fail、send_code_click、oauth_click、guest_created、guest_upgrade_click、guest_continue。

核心指标：登录成功率、注册完成率、验证码发送成功率、各角色注册转化率、角色不匹配率、游客升级率、表单错误率、登录/注册接口 P95 延迟。

## 13. 验收标准

1. 登录页展示五类角色，且只能单选一个角色。
2. Customer、Designer、Supplier 可完成注册；Contractor、Guest 不出现注册卡片。
3. Designer 与 Supplier 切换后，专属字段正确展示、隐藏和清空。
4. 验证码发送前必须校验邮箱，发送后 60 秒内不可重复发送。
5. 未勾选协议、密码不一致、缺少角色必填项时不可提交。
6. 登录失败不关闭弹窗，注册失败不丢失用户输入。
7. 游客首次进入显示欢迎弹窗，关闭后不重复展示；Upgrade Now 可进入注册。
8. 桌面端与移动端无明显溢出，供应商长表单可滚动且底部操作可见。
9. 所有按钮均有成功、失败、loading、禁用等明确状态。
10. 不同角色登录后进入对应工作台或受限页面，后端权限校验有效。

## 14. 版本规划

### V1.0

完成角色化登录、Customer/Designer/Supplier 注册、邮箱验证码、协议同意、游客身份和基础异常处理。

### V1.1

接入 Google/Facebook OAuth、找回密码、账号激活邮件、审核状态页和游客数据升级迁移。

### V1.2

增加多账号角色绑定、企业认证、登录设备管理、二次验证和更细粒度的权限中心。

## 15. 待确认事项

- Contractor 是否允许自助注册，还是仅由后台邀请创建。
- Designer、Supplier 是否必须人工审核，审核通过前可使用哪些功能。
- 注册成功后是自动登录还是统一跳转登录页。
- 密码复杂度、验证码有效期、错误次数和频控阈值。
- 第三方登录首期是否正式开放。
- 游客浏览记录、购物车和收藏是否在升级后迁移。

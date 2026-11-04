from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path

OUT = Path(r'F:\Soya-PC\C端购物车模块产品需求文档.docx')
doc = Document(); sec=doc.sections[0]
sec.top_margin=Inches(.65); sec.bottom_margin=Inches(.65); sec.left_margin=Inches(.72); sec.right_margin=Inches(.72)
for n,s,z,c in [('Normal','Microsoft YaHei',9.5,'000000'),('Title','Microsoft YaHei',23,'000000'),('Heading 1','Microsoft YaHei',15,'000000'),('Heading 2','Microsoft YaHei',12,'00699A')]:
    st=doc.styles[n]; st.font.name=s; st._element.rPr.rFonts.set(qn('w:eastAsia'),s); st.font.size=Pt(z); st.font.color.rgb=RGBColor.from_string(c)
def shade(cell,fill):
    p=cell._tc.get_or_add_tcPr(); x=OxmlElement('w:shd'); x.set(qn('w:fill'),fill); p.append(x)
def borders(t):
    p=t._tbl.tblPr; b=OxmlElement('w:tblBorders')
    for e in ('top','left','bottom','right','insideH','insideV'):
        x=OxmlElement('w:'+e); x.set(qn('w:val'),'single'); x.set(qn('w:sz'),'4'); x.set(qn('w:color'),'D9D9D9'); b.append(x)
    p.append(b)
def table(h,rows):
    t=doc.add_table(rows=1,cols=len(h)); t.alignment=WD_TABLE_ALIGNMENT.CENTER; borders(t)
    for i,v in enumerate(h):
        c=t.rows[0].cells[i]; c.text=v; shade(c,'1F4E78')
        for r in c.paragraphs[0].runs: r.font.bold=True; r.font.color.rgb=RGBColor(255,255,255); r.font.size=Pt(8.5)
    for j,row in enumerate(rows):
        cs=t.add_row().cells
        for i,v in enumerate(row):
            cs[i].text=str(v); cs[i].vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            if j%2: shade(cs[i],'F3F6F8')
            for p in cs[i].paragraphs:
                for r in p.runs: r.font.size=Pt(8.2)
    doc.add_paragraph(); return t
def bullets(items):
    for x in items: doc.add_paragraph(x,style='List Bullet')

p=doc.add_paragraph(style='Title'); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.add_run('C端购物车模块产品需求文档')
p=doc.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.add_run('面向设计家居商城的购物车与结算前置能力').font.color.rgb=RGBColor(0,105,154)
table(['文档属性','内容'],[['文档版本','V1.0'],['产品模块','C端用户端 / 购物车'],['适用对象','产品、交互、视觉、前端、后端、测试、运营'],['状态','开发评审稿'],['页面依据','packages/user-web/src/views/Cart.vue 及关联商品、用户页面'],['更新时间','2026-10-29']])
doc.add_paragraph('本 PRD 将当前购物车静态页面转化为可落地的业务规则、交互流程、接口契约与验收标准。开发实现以本文件的业务规则为准，页面中的示例文案与 mock 数据仅作为视觉和流程参考。')
doc.add_page_break()

doc.add_heading('1 文档概述',1); doc.add_heading('1.1 背景与目标',2)
doc.add_paragraph('购物车是用户从商品详情、设计案例或推荐位进入购买决策的承接页面。当前静态页面已形成“商品清单—配送方式—支付信息—账单地址—收货地址—订单汇总—支付”完整结构。本期目标是将其产品化，支持用户核对商品、调整购买数量、选择配送与支付方式、完善地址并提交支付，为后续订单和支付模块提供稳定输入。')
doc.add_heading('1.2 范围',2); table(['范围内','范围外'],[['购物车商品展示、勾选、全选、数量、删除','订单详情页、物流轨迹、售后工单'],['配送方式选择、后台规则读取与运费计算','优惠活动的后台配置页面与营销投放'],['购物车优惠展示、优惠明细与金额试算','第三方支付渠道清算与对账'],['支付方式选择；支付工具在个人中心维护','地址管理独立页面的完整 CRUD'],['账单地址、收货地址及复用逻辑','支付成功/失败页的视觉改版']])
doc.add_heading('1.3 术语定义',2); table(['术语','定义'],[['购物车商品','用户加入购物车且尚未形成订单的商品快照'],['选中商品','参与当前结算金额计算并提交订单的商品'],['账单地址','用于支付账单及风控校验的地址'],['收货地址','实际配送商品的地址'],['配送方式','标准配送或快速配送'],['保存支付方式','用户已授权保存、仅展示脱敏信息的支付工具']])

doc.add_heading('2 用户与使用场景',1); table(['角色','核心诉求','关键场景'],[['游客用户','快速浏览与登录后购买','未登录访问购物车、触发登录/注册'],['注册用户','管理商品并完成支付','调整数量、选择地址、提交支付'],['运营/客服','解释价格与配送规则','查看用户提交的商品、金额与地址快照']])
doc.add_heading('2.1 主流程',2); doc.add_paragraph('进入购物车 → 获取购物车与用户默认地址 → 勾选商品 → 调整数量/删除 → 选择配送方式 → 选择或新增支付方式 → 填写账单地址与收货地址 → 系统实时计算小计、优惠、运费和应付金额 → 点击 Pay Now → 前置校验 → 创建订单 → 调起支付 → 跳转支付结果页。')
doc.add_heading('2.2 空购物车流程',2); doc.add_paragraph('购物车无商品时，展示购物袋图标、Your cart is empty、Browse our selections below；隐藏配送、支付、订单详情及账单地址模块，保留收货地址模块的页面结构但不得提交支付。点击 Browse our selections below 应跳转商品/商城列表页。')

doc.add_heading('3 页面结构与功能需求',1); doc.add_heading('3.1 页面布局',2); table(['区域','模块','功能说明'],[['顶部','全局 Header','展示站点导航、用户状态、购物车入口；购物车入口显示商品件数徽标'],['左侧','Shopping cart items','商品表头、商品行、选中状态、单价、数量、小计、删除'],['左侧','Delivery Method','标准配送/快速配送单选及费用说明'],['左侧','Payment Information','已保存支付方式、添加支付方式、支付表单、Pay Now、安全提示'],['右侧','Order Details','Subtotal、Freight discount、Coupon discount、Save together、Total payable amount、保障说明'],['右侧','Billing Address','姓名、街道、地址、城市、州、邮编、国家'],['右侧','Receiving address','已保存地址卡片、默认标识、同账单地址、收货地址表单']])
doc.add_heading('3.2 商品清单',2); doc.add_paragraph('商品行必须展示商品图片、商品名称、规格列表、单位价格、数量控制、行小计及删除操作。商品图片加载失败时展示统一占位图；商品下架、库存不足或价格变更时，行内显示不可购买原因并阻止提交。')
table(['交互','规则','反馈'],[['勾选/取消勾选','只影响当前结算，不移除商品；全选状态随行项目自动同步','实时刷新小计、优惠和应付金额'],['全选','选中/取消全部可购买商品；失效商品不参与全选','支持选中、未选、半选'],['减少数量','最小为 1，数量为 1 时减号禁用','按钮禁用态；金额同步更新'],['输入数量','仅允许正整数；失焦或回车提交，超库存自动修正','提示请输入 1-999 的整数'],['增加数量','不得超过库存上限及单品限购数','达到上限提示库存/限购说明'],['删除','删除前二次确认；确认后从购物车移除','Toast 已删除；列表为空时切换空状态'],['点击商品','进入商品详情页，保留购物车状态','按现有路由策略跳转']])
doc.add_heading('3.3 配送方式',2); table(['配置项','规则'],[['维护方','后台管理系统动态维护配送方式、名称、时效、计费公式、免运费门槛、启用状态及排序'],['前端展示','购物车读取当前生效配置，动态渲染单选项与费用说明；不得写死 Standard/Quick 两个选项'],['距离分段','计费距离 ≤ 3 公里归入“3公里内”；距离 > 3 公里归入“超过3公里”'],['计算公式','shippingFee = 配送方式对应距离区间费用；若满足后台配置的免运费门槛，则 shippingFee = 0'],['异常','无可用配送方式或地址无法计算距离时，阻止提交并提示补充地址/联系支持']])
doc.add_paragraph('配送试算必须以服务端后台配置为准，前端仅展示服务端返回的费用、时效和计算说明。后台修改规则后，新请求立即使用新版本；已创建订单保留下单时的配送规则快照。')
doc.add_heading('3.4 支付信息',2); doc.add_paragraph('已保存支付方式以卡片形式展示，卡片包含支付类型、脱敏卡号、持卡人、有效期和账单地址；选中卡片高亮。已存在某类型支付方式时，新增支付方式列表隐藏同类型入口。')
table(['支付类型','表单字段','校验'],[['Credit Card / VISA','Card number、Cardholder Name、Validity period、Security code、Postal code','卡号 Luhn 校验；有效期 MM/YY 且不得过期；安全码 3-4 位；邮编非空'],['PayPal','支付账号/授权结果','必须完成授权并返回 token'],['Apple Pay','设备支付授权结果','必须完成设备授权并返回 payment token']])
doc.add_paragraph('支付安全提示固定展示 Your payment is protected by 256 bit SSL encryption。前端不得记录完整卡号、安全码或支付 token；支付敏感数据仅通过 HTTPS 发送。')
doc.add_heading('3.5 账单地址',2); doc.add_paragraph('账单地址字段：Name、Surname、Street、Address、City、State、Postal code、Country。Street、City、State、Country 采用可配置下拉选项；支付前必须完成必填校验。')
doc.add_heading('3.6 收货地址',2); doc.add_paragraph('有保存地址时展示地址卡片，选中地址高亮并标记 Default；无保存地址或点击新增时展示表单。勾选 Same as billing address 后，收货地址自动复制账单地址并置为只读；取消后恢复可编辑。地址卡片可标记 Not the construction site。')

doc.add_heading('4 价格与金额规则',1); table(['金额项','计算规则','展示'],[['商品小计 subtotal','Σ(选中商品单价 × 数量)','保留 2 位小数'],['Freight discount','按后台配送规则及当前配送方式计算','折扣以负数展示'],['Coupon discount','按后台营销/优惠规则计算；购物车直接展示生效优惠及明细入口','折扣以负数展示'],['Save together','Freight discount 绝对值 + Coupon discount 绝对值','展示 View discount details'],['Total payable amount','商品小计 + 运费 - 各类优惠；不得小于 0','Pay Now 与订单汇总一致']])
doc.add_paragraph('所有金额由后端以最小货币单位计算并返回，前端仅负责格式化；前端金额仅用于展示，不作为创建订单的可信来源。商品后台设置的销售价格已包含税费，本模块不单独展示或计算税费。币种默认 USD，后续支持多币种时由站点配置下发。')

doc.add_heading('5 状态与异常处理',1); table(['状态','触发条件','页面处理'],[['加载中','首次进入或重新获取购物车','骨架屏/禁用提交'],['空购物车','商品数量为 0','展示空状态，隐藏结算模块'],['未选商品','有商品但选中数量为 0','Pay Now 禁用并提示'],['库存不足','库存小于购买数量','行内标红并自动降至可售数量或要求处理'],['地址不完整','必填地址缺失/格式错误','定位字段并展示错误文案'],['支付失败','支付渠道返回失败','保留购物车和地址，展示失败原因及重试'],['网络失败','接口超时/断网','Toast 重试；禁止重复创建订单'],['价格变更','服务端价格与购物车快照不一致','展示变更项，用户确认后刷新金额']])
doc.add_heading('5.1 防重复提交',2); doc.add_paragraph('点击 Pay Now 后按钮进入 loading，使用幂等键 idempotencyKey 创建订单；接口未返回前不可再次提交。刷新或支付回调重复到达时，以订单状态机保证只生成一笔有效订单。')

doc.add_heading('6 数据模型与接口契约',1); doc.add_heading('6.1 核心数据模型',2); table(['对象','字段','说明'],[['CartItem','id, productId, name, image, specs[], unitPrice, quantity, stock, selected, status','商品快照；status=AVAILABLE/OUT_OF_STOCK/OFF_SALE'],['Address','id, name, surname, street, address, city, state, postalCode, country, telephone, isDefault, notConstructionSite','账单/收货地址'],['PaymentMethod','id, type, maskedNumber, cardholderName, validityPeriod, billingAddress, isDefault','支付工具脱敏信息'],['CartSummary','subtotal, shippingFee, freightDiscount, couponDiscount, totalDiscount, totalAmount, currency','服务端计算结果'],['CheckoutRequest','selectedItemIds[], deliveryMethod, billingAddressId|billingAddress, receivingAddressId|receivingAddress, paymentMethodId|paymentToken, couponCode?, idempotencyKey','创建订单入参']])
doc.add_heading('6.2 推荐接口',2); table(['接口','方法','用途','关键返回'],[['/api/cart','GET','获取购物车、后台生效优惠与配送配置快照','items、summary、discounts、shippingOptions'],['/api/cart/items/{id}','PATCH','更新数量/选中状态','item、summary'],['/api/cart/items/{id}','DELETE','删除商品','summary'],['/api/cart/select-all','POST','批量选中/取消','items、summary'],['/api/shipping/quote','POST','按后台公式与收货地址计算运费','shippingFee、ruleVersion、eta、formulaText'],['/api/addresses','GET','获取用户地址','address[]'],['/api/payment-methods','GET','读取个人中心已维护的支付方式','paymentMethod[]'],['/api/orders','POST','校验并创建订单','orderId、paymentSession、totalAmount'],['/api/payments/{id}/confirm','POST','确认支付结果','orderStatus、redirectUrl']])
doc.add_paragraph('所有接口需返回 requestId、code、message、data；错误码至少覆盖 CART_EMPTY、ITEM_UNAVAILABLE、STOCK_INSUFFICIENT、PRICE_CHANGED、ADDRESS_INVALID、PAYMENT_REQUIRED、IDEMPOTENCY_CONFLICT。')

doc.add_heading('7 埋点与监控',1); table(['事件','触发时机','属性'],[['cart_view','页面成功加载','userId、itemCount、cartValue'],['cart_item_select','单行选中变化','itemId、selected、position'],['cart_quantity_change','数量变更成功','itemId、oldQty、newQty'],['cart_item_delete','删除成功','itemId、quantity'],['delivery_method_select','配送方式变化','method、shippingFee'],['payment_method_select','支付方式变化','type、isSaved'],['checkout_submit','点击 Pay Now','selectedCount、totalAmount、idempotencyKey'],['checkout_result','订单/支付完成','orderId、status、failureCode']])
doc.add_paragraph('监控指标：购物车加载成功率、商品更新成功率、结算提交成功率、支付成功率、价格变更率、库存不足率、接口 P95 延迟。')
doc.add_heading('8 非功能要求',1); bullets(['性能：购物车首屏接口 P95 ≤ 800ms；金额更新接口 P95 ≤ 500ms；提交按钮响应 ≤ 100ms。','安全：全链路 HTTPS；支付敏感字段不落日志、不进入前端持久化；服务端校验价格、库存、地址和支付 token。','兼容：桌面端优先，适配 1280px 及以上；窄屏下左右栏纵向排列，控件保持可操作尺寸。','可用性：输入框具备 label/placeholder；错误提示与字段关联；键盘可完成复选、单选、数量和提交。','可观测性：关键接口带 requestId 与幂等键，支付和订单状态变化写入审计日志。'])

doc.add_heading('9 验收标准',1); table(['编号','验收项','通过标准'],[['AC-01','商品清单','正确展示图片、名称、规格、单价、数量、小计和删除入口'],['AC-02','选择计算','全选、半选、取消选择正确；金额仅计算选中商品'],['AC-03','数量边界','不得小于 1、不得超过库存/限购；非法值有提示'],['AC-04','配送计费','标准/快速切换后费用、时效、总金额正确'],['AC-05','地址复用','Same as billing address 可复制并锁定收货地址'],['AC-06','支付校验','未选商品、缺地址、缺支付方式、卡号非法时不可下单'],['AC-07','金额可信','服务端重算金额；价格/库存变化可识别并提示'],['AC-08','空状态','无商品时隐藏结算模块并显示 Browse our selections below'],['AC-09','异常恢复','网络失败可重试；支付失败保留购物车，不重复扣款'],['AC-10','视觉一致','桌面端与当前静态页面结构、字段、状态样式一致']])
doc.add_heading('10 开发拆分建议',1); table(['阶段','前端任务','后端/服务任务','产出'],[['P0 基础','状态管理、商品行交互、空状态','购物车查询/更新/删除接口','可操作购物车'],['P1 结算前置','配送、地址、支付表单与校验','运费试算、地址与支付方式接口','可填写结算信息'],['P2 下单支付','幂等提交、结果跳转、异常恢复','订单创建、支付会话、回调与状态机','端到端支付链路'],['P3 质量','响应式、无障碍、埋点、错误监控','压测、安全审计、对账监控','上线验收包']])
doc.add_heading('11 已确认规则与美国合规要求',1)
bullets(['优惠在购物车展示，优惠规则、优惠金额、适用商品/门槛和有效期由后台管理系统配置；前端展示服务端返回的优惠明细，禁止仅依赖前端计算。','配送方式由后台动态维护，包含配送名称、时效、距离区间、计费公式、免运费门槛、启用状态和版本号。距离等于 3 公里时按“3公里内”计算。','允许用户维护支付方式；购物车只读取个人中心已保存的脱敏支付工具，不在购物车提供完整卡号/安全码的长期存储。','商品销售价格已包含税费，本购物车不展示、不拆分、不重复计算税费。'])
doc.add_heading('11.1 美国支付合规基线',2)
bullets(['PCI DSS：平台不得存储 CVV/CVC、完整磁道数据或未脱敏 PAN；优先使用支付服务商托管页面/Hosted Fields 或网络令牌化，平台仅保存 paymentMethodId、品牌、末四位和有效期月份等脱敏信息。','GLBA Safeguards：对支付与地址信息实施最小权限、传输加密、静态加密、访问审计、密钥轮换和供应商安全评估；建立安全事件响应和数据泄露通知流程。','FTC 规则与消费者保护：结算页必须清晰展示商品价格、配送费、折扣、最终应付金额和退款/取消规则；不得以默认勾选、隐藏费用或误导性倒计时诱导支付。','E-SIGN 与记录留存：用户同意保存支付方式、接受电子订单/收据时记录同意时间、版本、渠道和展示内容；订单与支付凭证按公司法务确定的留存周期保存。','州隐私法：按适用州（包括加州）提供隐私政策、数据收集目的、访问/删除/更正/退出定向广告等权利入口；支付和地址数据不得用于未披露目的。','自动续费/订阅：本模块不提供自动续费；如未来扩展，必须在付款前明确周期、金额、续费时间、取消入口并取得可证明同意。','支付失败与退款：不得重复扣款；支付结果以支付服务商回调/查询为准，向用户提供订单号、状态、客服入口和退款原路返回说明。'])
doc.core_properties.title='C端购物车模块产品需求文档'; doc.core_properties.subject='购物车与结算前置能力'; doc.core_properties.author='产品团队'; doc.save(OUT); print(OUT)

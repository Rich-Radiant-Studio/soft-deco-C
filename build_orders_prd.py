from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
OUT='F:/Soya-PC/C端个人中心我的订单PRD_开发版.docx'
d=Document(); s=d.sections[0]; s.top_margin=Inches(.65); s.bottom_margin=Inches(.65); s.left_margin=Inches(.7); s.right_margin=Inches(.7)
for n,z in [('Normal',10),('Title',24),('Heading 1',16),('Heading 2',12),('Heading 3',10.5)]:
 st=d.styles[n]; st.font.name='Microsoft YaHei'; st._element.rPr.rFonts.set(qn('w:eastAsia'),'Microsoft YaHei'); st.font.size=Pt(z); st.font.color.rgb=RGBColor(0,0,0)
def shade(cell,fill):
 tcPr=cell._tc.get_or_add_tcPr(); shd=OxmlElement('w:shd'); shd.set(qn('w:fill'),fill); tcPr.append(shd)
def borders(t):
 tblPr=t._tbl.tblPr; bd=OxmlElement('w:tblBorders')
 for e in ('top','left','bottom','right','insideH','insideV'):
  x=OxmlElement('w:'+e); x.set(qn('w:val'),'single'); x.set(qn('w:sz'),'4'); x.set(qn('w:color'),'D9D9D9'); bd.append(x)
 tblPr.append(bd)
def tbl(headers,rows):
 t=d.add_table(rows=1,cols=len(headers)); t.alignment=WD_TABLE_ALIGNMENT.CENTER; borders(t)
 for i,h in enumerate(headers):
  c=t.rows[0].cells[i]; c.text=h; shade(c,'1F4E78'); c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
  for r in c.paragraphs[0].runs: r.font.bold=True; r.font.color.rgb=RGBColor(255,255,255); r.font.size=Pt(9)
 for ri,row in enumerate(rows):
  cells=t.add_row().cells
  for i,x in enumerate(row):
   cells[i].text=str(x); cells[i].vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
   if ri%2==1: shade(cells[i],'F4F7FA')
   for p in cells[i].paragraphs: p.paragraph_format.space_after=Pt(2)
 d.add_paragraph().paragraph_format.space_after=Pt(2); return t
def p(x=''): d.add_paragraph(x)
def bullets(xs):
 for x in xs: d.add_paragraph(x,style='List Bullet')
d.add_paragraph('C端个人中心我的订单产品需求文档',style='Title').alignment=WD_ALIGN_PARAGRAPH.CENTER
p('开发实施版 PRD｜基于现有静态页面梳理｜版本 V1.0｜适用端：C端 Web')
p('本 PRD 覆盖订单列表、订单详情及与售后订单模块的衔接，旨在将现有静态页面升级为可真实查询、操作、追踪和验收的订单中心。文档中的“现状”仅描述页面当前行为；“目标”是开发交付要求。')
d.add_page_break()
d.add_heading('1 文档信息与范围',1)
tbl(['项目','说明'],[['模块','C端-个人中心-我的订单'],['列表路由','/profile/orders，对应 MyOrders.vue'],['详情路由','/profile/orders/:id，对应 OrderDetail.vue'],['售后衔接','/profile/after-sales、/profile/after-sales/:id，为独立模块'],['用户','已登录个人用户'],['目标','让用户查询订单、按状态筛选、进入详情、完成支付/取消/确认收货/评价/再次购买/退货申请'],['不在本期','后台订单管理、商家发货后台、支付渠道后台配置']])
d.add_heading('2 页面现状盘点',1)
tbl(['区域','静态页面现状','开发处理'],[['布局','Header、个人中心侧栏、内容区、Footer；小屏侧栏横向滚动','保留视觉结构，补齐响应式断点与可访问性'],['筛选','日期范围、关键字、Filter、Reset；当前仅关键字参与过滤','日期纳入查询，Filter 触发请求，Reset 恢复默认条件'],['Tab','All、Pending Payment、Paid、Shipped、Delivered','统一状态枚举与数量口径，支持 URL 参数回显'],['卡片','订单号、时间、状态、商品、SKU、规格、单价、数量、订单总额','字段由接口返回，金额使用货币格式化组件'],['操作','待付款 Pay Now；非 Delivered Cancel；Delivered Request Return、Buy Again、Write Review','按权限和状态机控制，所有操作落真实接口'],['分页','固定“共50条”、1-20页，无翻页逻辑','使用 total、page、pageSize，支持上一页/下一页/跳页'],['详情','进度、商品、地址、费用、支付方式；按钮无真实逻辑','订单 ID 驱动详情，接入物流、确认收货、打印/导出'],['倒计时','固定 01:59:59','使用支付截止时间计算，服务端为准，过期转已关闭/待支付超时']])
d.add_heading('3 用户流程与状态机',1)
p('入口：个人中心侧栏“我的订单”或支付成功页 → 订单列表；用户可通过状态 Tab、日期和关键词定位订单 → 查看详情 → 根据订单状态执行下一步。')
tbl(['状态','进入条件','允许操作','状态变化'],[['Pending Payment','订单创建成功且未支付','Pay Now、Cancel Order','支付成功→Paid；超时→Payment Expired；取消→Cancelled'],['Paid','支付成功，待处理/备货','Cancel（仅未进入发货）、查看详情','商家接单→Processing；取消成功→Cancelled'],['Shipped','已发货且有物流单号','查看物流、联系支持','签收/系统更新→Delivered'],['Delivered','已送达或用户确认收货','Request Return、Buy Again、Write Review','退货申请→After Sales；评价→Reviewed'],['Cancelled/Expired','用户取消或支付超时','查看详情、再次购买（可选）','终态，不可恢复']])
d.add_heading('4 列表页功能需求',1)
d.add_heading('4.1 筛选与查询',2)
tbl(['控件','规则','验收'],[['日期范围','startDate/endDate，格式 YYYY-MM-DD；结束日期不得早于开始日期；默认不限','点击 Filter 后请求带日期参数；错误时定位并提示'],['关键词','匹配 orderNo、商品名称；去除首尾空格，最多100字符','大小写/空格规则统一；无结果展示空态'],['状态 Tab','All、Pending Payment、Paid、Shipped、Delivered；可扩展 Cancelled、After Sales','切换立即刷新；刷新后保留状态'],['Filter','提交查询，按钮 loading 防重复；分页回到1','请求失败保留条件并展示重试'],['Reset','恢复 All、无日期、无关键词、page=1','清空后重新查询']])
d.add_heading('4.2 订单卡片',2)
tbl(['字段','说明'],[['订单号','orderNo，支持复制；点击卡片或订单号进入详情'],['下单时间','createdAt，按用户时区展示'],['状态','status + statusText；颜色仅作辅助，需有文字'],['商品','productImage、productName、sku、spec、unitPrice、quantity；多商品逐行展示'],['金额','subtotal、discount、shippingFee、tax、totalAmount；统一币种与小数位'],['待支付提示','显示 paymentDeadline 与优惠提示，倒计时到0后重新拉取状态'],['空态/加载','骨架屏、无结果插画、接口失败重试、分页无数据保护']])
d.add_heading('4.3 操作规则',2)
tbl(['操作','前置条件','交互与结果'],[['Pay Now','Pending Payment 且未过期','创建/获取支付会话，跳转支付页；返回后轮询订单状态'],['Cancel Order','Pending Payment；Paid 仅在未发货且后端允许','二次确认，提交原因可选；成功后刷新卡片并提示'],[['Request Return','Delivered 且在售后期内','跳转售后申请，携带 orderId；售后模块负责资格与退款'],['Buy Again','商品仍可售','将商品加入购物车，成功后提示并可去购物车'],['Write Review','Delivered 且未评价','跳转评价页或弹窗，携带 orderId/itemId'],['查看详情','任意可见订单','进入 /profile/orders/:id；非法 ID 返回404/列表']])
d.add_heading('5 订单详情页需求',1)
tbl(['区域','字段/交互'],[['订单摘要','订单号、创建时间、当前状态、支付状态、支付方式、币种'],['进度','下单、处理中、已发货、已送达；每节点时间、异常说明；当前节点高亮'],['商品清单','商品图、名称、SKU、规格、单价、数量、小计；支持多商品'],['收货信息','收货人、脱敏手机号、完整地址、邮编；禁止前端修改'],['物流','carrier、trackingNo、轨迹节点；无物流显示“暂无物流信息”'],['费用','商品小计、优惠、运费、税费、实付总额；服务端金额为准'],['操作','Print Order 生成可打印页/PDF；Confirm Receipt 二次确认后提交；状态成功后刷新'],['异常','订单不存在、无权限、接口失败、确认收货重复提交均需有明确文案与重试']])
d.add_heading('6 数据模型与接口建议',1)
tbl(['接口','方法/路径','关键参数/返回'],[['订单列表','GET /api/v1/me/orders','status,startDate,endDate,keyword,page,pageSize；返回 items,total,page,pageSize'],['订单详情','GET /api/v1/me/orders/{orderId}','返回订单摘要、items、timeline、address、payment、shipping、availableActions'],['支付','POST /api/v1/orders/{id}/payment-session','返回 paymentUrl、expiresAt、sessionId'],['取消','POST /api/v1/orders/{id}/cancel','reason、idempotencyKey；返回新状态'],[['确认收货','POST /api/v1/orders/{id}/confirm-receipt','idempotencyKey；返回 confirmedAt'],['再次购买','POST /api/v1/cart/items:batch-add','items；返回成功/失败明细'],['售后资格','GET /api/v1/orders/{id}/after-sales-eligibility','返回 eligible、deadline、reasons'],['物流','GET /api/v1/orders/{id}/tracking','carrier、trackingNo、events']])
d.add_heading('7 前端数据与状态管理',1)
bullets(['列表查询参数与 URL 同步，支持浏览器前进/后退和刷新恢复。','请求层统一处理 401、403、404、409、429、5xx；取消旧请求避免竞态覆盖。','金额、日期、时区由公共 formatter 处理，禁止页面自行拼接。','操作按钮依据后端 availableActions 渲染，前端状态仅作展示兜底。','支付截止倒计时使用 expiresAt - 当前时间；页面切后台后重新校准。'])
d.add_heading('8 埋点与监控',1)
tbl(['事件','触发','属性'],[['orders_view','列表首屏成功','source、status、page'],['orders_filter_submit','点击 Filter','status、dateRange、hasKeyword'],['orders_card_click','进入详情','orderId、status、position'],['order_action_click','点击操作','orderId、action、status'],['order_action_success/fail','接口返回','action、errorCode、latency'],['payment_redirect','跳转支付','orderId、amount、sessionId'],['order_detail_view','详情成功','orderId、status']])
d.add_heading('9 权限、隐私与安全',1)
bullets(['仅登录用户可访问；订单接口必须按当前用户鉴权，禁止仅依赖前端 ID。','手机号、地址在列表不展示，详情按产品要求脱敏；日志禁止打印完整个人信息。','取消、确认收货、支付会话均需幂等；服务端二次校验状态、价格和权限。','打印/导出仅允许当前用户订单；下载链接使用短时效签名 URL。'])
d.add_heading('10 验收标准',1)
tbl(['编号','验收项','通过标准'],[['AC-01','列表查询','首次加载、Tab、日期、关键词、分页参数正确，结果与 total 一致'],['AC-02','空态异常','无结果、网络失败、权限失败均有可理解文案和重试/返回入口'],['AC-03','支付','未过期可支付，支付回跳后状态正确，重复点击不生成重复会话'],['AC-04','取消','仅允许状态机允许的订单，确认后成功刷新，失败不误改状态'],['AC-05','详情','列表订单 ID 与详情数据一致；时间线、金额、地址完整'],['AC-06','确认收货','二次确认、幂等、防重复，成功后变为 Delivered'],['AC-07','售后','Delivered 且符合售后期限时可进入售后；不符合展示原因'],['AC-08','响应式','桌面与移动端无横向溢出，侧栏可横向滚动，操作可触达'],['AC-09','可访问性','表单有 label，按钮有可读名称，键盘可操作，颜色不作为唯一状态标识'],['AC-10','兼容性','Chrome、Edge、Safari 最近两个大版本通过核心流程']])
d.add_heading('11 开发拆分与排期建议',1)
bullets(['前端：OrdersPage、OrderFilter、OrderStatusTabs、OrderCard、Pagination、OrderDetail、Timeline、ActionModal；统一 query 与 formatter。','后端：订单查询聚合、状态机、支付会话、取消/确认收货、物流和售后资格接口。','联调：先完成列表/详情读接口，再接操作接口和支付回跳，最后补齐埋点与异常态。','测试：覆盖四种静态示例状态、无订单、超时支付、接口慢响应、重复点击、移动端。'])
d.add_heading('12 待产品确认项',1)
bullets(['Paid 状态是否允许取消，允许到哪个业务节点；','Pending Payment 支付有效期、超时状态名称及优惠提示文案；','取消是否需要原因、是否自动退款、退款到账时效；','Confirm Receipt 是否自动触发售后期起算；','Delivered 的退货窗口、运费承担与售后订单跳转规则；','分页默认 pageSize、是否支持无限滚动；','Print Order 输出格式、是否包含完整地址与支付信息。'])
p('文档结束')
d.save(OUT)
print(OUT)

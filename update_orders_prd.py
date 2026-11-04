from docx import Document
from docx.shared import Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

path='F:/Soya-PC/C端个人中心我的订单PRD_开发版.docx'
d=Document(path)
d.add_page_break()
d.add_heading('13 产品确认结果与最终业务规则',1)
d.add_paragraph('以下规则已根据产品确认结果固化，开发、测试和后台配置均以本节为准。')

def tbl(headers, rows):
    t=d.add_table(rows=1, cols=len(headers))
    for i,h in enumerate(headers):
        c=t.rows[0].cells[i]; c.text=h
        tcPr=c._tc.get_or_add_tcPr(); shd=OxmlElement('w:shd'); shd.set(qn('w:fill'),'1F4E78'); tcPr.append(shd)
        for r in c.paragraphs[0].runs: r.font.bold=True; r.font.color.rgb=__import__('docx').shared.RGBColor(255,255,255)
    for row in rows:
        cells=t.add_row().cells
        for i,x in enumerate(row): cells[i].text=str(x)
    d.add_paragraph()

tbl(['确认项','最终规则','开发要求'],[
['1. 订单范围','“我的订单”包含当前账号的全部订单，不只展示待付款、已付款、已发货、已送达；还包括已取消、支付超时、退款中、退款完成、售后关闭等历史订单。','列表 Tab 增加“全部”，服务端按当前用户返回全量可见状态；状态枚举可扩展，未知状态使用兜底文案。'],
['2. 游客订单','游客没有订单。游客不能直接创建订单；点击购买、结算或提交订单时必须先注册/登录账号。','未登录访问订单页跳转登录；登录成功后回到原目标页。下单接口必须校验 userId，禁止匿名创建订单。'],
['3. 取消权限','取消权限恢复为后台可配置规则。后台配置页面支持按订单状态、时间窗口、是否已发货控制是否允许取消。','前端只展示后端 availableActions；取消接口再次读取配置和订单状态。配置变更实时生效，不在前端写死。'],
['4. 付款与优惠','待付款订单可展示支付倒计时；在倒计时有效期内支付可享受后台配置的优惠金额。超过有效期不可继续享受优惠，按后台规则关闭订单或恢复原价。','展示 expiresAt、优惠截止时间、优惠金额；倒计时归零重新拉取订单状态和金额，禁止仅依赖前端倒计时。'],
['5. 退款说明','纳入退款说明。取消/售后操作须展示退款路径、预计到账时间及“实际到账以支付渠道为准”提示。','退款状态至少包含申请中、处理中、成功、失败；失败提供重试或联系客服入口。'],
['6. 上线范围','本次规则纳入正式上线版本，非演示功能。','完成接口联调、后台配置、埋点、权限、异常态和回归测试后才允许发布。'],
['7. 金额展示','订单统一展示：应付金额、优惠金额、实付金额。应付金额为优惠前应支付金额；优惠金额为平台/活动/优惠券减免合计；实付金额为实际支付金额。','列表卡片展示实付金额；详情费用区域展示三项及运费、税费、退款金额（如有）。所有金额由服务端返回，前端只格式化。'],
['8. 合理方案','采用“服务端状态机 + 后台规则配置 + 前端动作透传”的方案：规则集中管理，订单状态可追溯，前端不重复实现业务判断。','接口返回 availableActions、amountBreakdown、deadline、refundPolicy；操作失败保留页面数据并支持重试。']
])
d.add_heading('14 后台取消订单配置需求',1)
d.add_paragraph('截图所示配置项纳入后台管理系统订单配置页面。配置保存后，对新请求立即生效；历史订单按请求发生时的规则和订单快照处理。')
tbl(['配置项','字段建议','规则'],[
['未付款订单可随时取消','unpaidCancelable','开关；开启后 Pending Payment 在未关闭前允许取消。'],
['已付款未发货取消窗口','paidUnshippedCancelHours','数字，单位小时；为空表示不允许，0 表示仅按其他规则判断。'],
['未付款优惠支付窗口','unpaidDiscountPayHours','数字，单位小时；用于计算优惠截止时间。'],
['优惠金额','discountAmount','非负金额，需小于应付金额；建议同时支持 discountType=固定金额/百分比。'],
['开启优惠支付倒计时','discountCountdownEnabled','开启后 C 端显示倒计时；关闭后不展示优惠倒计时。'],
['退货说明','returnPolicyText','多行文本；展示在取消、退货和退款确认区域，支持版本号。']
])
d.add_heading('15 金额与退款展示示例',1)
d.add_paragraph('订单详情费用区域建议按以下顺序展示：应付金额 ¥1,000.00；优惠金额 -¥100.00；运费 ¥0.00；税费 ¥0.00；实付金额 ¥900.00。发生退款时，在实付金额下方增加已退款 ¥900.00、退款状态和预计到账时间。')
d.add_heading('16 上线验收补充',1)
for x in [
'注册前无法创建订单；登录后可正常回到原结算流程。',
'全部订单可查询历史终态，分页、筛选和关键词对全部状态生效。',
'后台修改取消窗口后，C 端按钮和接口权限按新配置生效。',
'优惠倒计时归零后，金额重新从服务端获取，不出现前后端金额不一致。',
'应付、优惠、实付三项金额在列表、详情、支付回跳页口径一致。',
'取消或售后成功后能查询退款状态，并展示退款说明。',
'上线前完成管理员、普通用户、游客三类角色的端到端回归。']:
    d.add_paragraph(x, style='List Bullet')
d.save(path)
print(path)

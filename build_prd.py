from docx import Document
from docx.shared import Inches, Pt
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
OUT="F:/Soya-PC/C端发布需求模块PRD.docx"
d=Document(); s=d.sections[0]; s.top_margin=Inches(.65); s.bottom_margin=Inches(.65); s.left_margin=Inches(.75); s.right_margin=Inches(.75)
for n,z in [("Normal",9.5),("Title",24),("Heading 1",16),("Heading 2",12)]:
 st=d.styles[n]; st.font.name="Microsoft YaHei"; st._element.rPr.rFonts.set(qn("w:eastAsia"),"Microsoft YaHei"); st.font.size=Pt(z)
def tbl(h,rows):
 t=d.add_table(rows=1,cols=len(h)); t.alignment=WD_TABLE_ALIGNMENT.CENTER
 for i,x in enumerate(h): t.rows[0].cells[i].text=x
 for row in rows:
  c=t.add_row().cells
  for i,x in enumerate(row): c[i].text=str(x)
 d.add_paragraph(); return t
def bullets(xs):
 for x in xs: d.add_paragraph(x,style="List Bullet")
def p(x=""): d.add_paragraph(x)
d.add_paragraph("C端发布需求模块产品需求文档",style="Title").alignment=WD_ALIGN_PARAGRAPH.CENTER
p("面向设计服务需求提交的开发实施版 PRD")
p("文档版本：V1.0｜状态：开发评审稿｜适用端：C端 Web｜页面：/post-demand（CreateDesignRequest.vue）")
d.add_page_break()
d.add_heading("1 文档说明",1); p("本 PRD 基于现有静态页面整理，覆盖发布需求完整闭环：进入、填写、上传、校验、保存草稿、预览、提交、支付跳转、成功/失败反馈及接口约定。")
tbl(["项目","内容"],[["产品模块","C端-发布需求"],["目标用户","需要室内设计方案的个人用户"],["核心目标","收集空间、风格、预算、时间与联系方式，生成可供设计师评估的需求单"],["入口","导航/营销页 Submit a Request；路由 /post-demand"],["成功指标","提交成功率、有效线索率、草稿恢复率、上传成功率、提交转化率"]])
d.add_heading("2 现状盘点与需补齐项",1); p("现有页面具备视觉结构和部分选择态，但尚未形成真实提交链路，以下为开发改造清单。")
tbl(["区域","现状","产品要求"],[["房型与尺寸","房型可单选；尺寸未绑定","建立 room、dimensions 对象并校验"],["上传","仅前端预览","接上传服务、进度、失败重试、大小格式校验"],["风格/颜色","多选已具备","限制数量，提交 code"],["预算/档位","条件展示","互斥提交一种 pricing 结构"],["灵感/参考图","未提交","链接校验、排序、删除、上传状态"],["施工时间","日期选择","禁止选择早于当前日期"],["标签","预置展示未绑定","最多10个，去重，支持自定义"],["联系人","字段未形成 payload","必填与格式校验"],["提交/草稿","提交直跳支付；草稿无处理","先保存需求单，再按 requestId 跳支付或成功页；当前 /pay-design-fee 路由缺失需补齐"]])
d.add_heading("3 用户流程与状态",1); p("进入发布页 → 选择房型 → 填写空间与偏好 → 上传资料 → 选择施工时间 → 填写联系人 → 校验 → 保存需求单 → 支付设计服务费。")
tbl(["状态","触发","表现","操作"],[["初始","首次进入","空表单","填写/返回"],["填写中","字段变更","未保存提示","继续/保存草稿"],["校验失败","提交有错","错误定位首个字段","修改重试"],["上传中","文件未完成","进度条","等待/取消"],["已保存","草稿成功","Toast","继续/离开"],["提交中","接口处理中","按钮 loading","等待"],["成功","返回 requestId","跳支付页","支付/返回"],["失败","网络或服务异常","保留数据","重试/保存"]])
d.add_heading("4 页面功能规格",1)
d.add_heading("4.1 Room Selection",2); tbl(["字段","类型/规则","必填"],[["room","Bathroom/Living Room/Bedroom/Dining Room/Balcony/Whole House，单选","是"],["dimensions","length/width/height/area，正数，最多2位小数，单位 ft/sq ft","按业务确认"],["floorPlan","PDF/PNG/JPG/JPEG，单文件≤100MB；展示状态","整屋必填"],["roomDescription","多行文本，最多1000字","否"]])
d.add_heading("4.2 Style Preference",2); tbl(["字段","规则"],[["styles","Modern、Minimalist、Nordic、Chinese、Japanese、Industrial、Mediterranean、Vintage；最多3项，建议至少1项"],["colors","18个 hex 色板；最多5项，重复不可计数"]])
d.add_heading("4.3 预算与设计档位",2); tbl(["房型","字段与选项","提交"],[["Whole House","budgetRange：Basic 10000 / Standard 50000 / Premium 100000 / Luxury 150000+","budgetCode + 金额快照"],["其他房型","designTier：CLASSIC 3000 / MODERN 5000 / PREMIUM 10000 / LUXURY 20000+","tierCode + 价格快照"]])
d.add_heading("4.4 Inspiration & Reference Links",2); bullets(["链接按换行拆分，每行 http/https，最多10条。","整屋按 Living Room、Bedroom、Dining Room、Kitchen、Study Room、Entrance 分组上传；默认1槽位，可 Add、删除、排序。","非整屋提供补充户型图上传位；与主户型图区分 floorPlan / supplementaryFloorPlan。","图片 JPG/PNG/WebP，单张≤20MB，最多30张；提交仅携带上传成功文件。"])
d.add_heading("4.5 Construction Time",2); p("constructionDate 以 YYYY-MM-DD 传输，禁止选择早于当前日期；如支持待定，增加 TBD 并与日期互斥。")
d.add_heading("4.6 Design Tags",2); p("预置 Cozy、Bright、Spacious、Modern、Classic、Functional、Top、Big（修正重复 Top）。最多10个，大小写不敏感去重，单个最多20字符。")
d.add_heading("4.7 Contact Information",2); tbl(["字段","要求"],[["fullName","必填，2-50字符"],["contactMethod","Phone / Email 单选"],["phoneNumber","必填，按国家区号校验，建议 E.164"],["email","contactMethod=Email 时必填"],["preferredContactTime","必填，时区+时间段"],["projectAddress","必填，至少10字符"],["aptSuite/city/state/postalCode/country","可选，按国家动态校验"]])
d.add_heading("4.8 Additional Items",2); p("可选，最多2000字，用于补充宠物、无障碍、材料偏好等。")
d.add_heading("5 交互与校验",1); tbl(["场景","规则"],[["提交","按页面顺序校验，首个错误自动聚焦；错误字段红框并显示文案"],["房型切换","已有内容时二次确认，清除不适用 pricing 与参考图"],["重复提交","按钮 loading/置灰；使用 idempotencyKey"],["上传失败","保留失败项，支持 Retry，不阻断其他填写"],["离开页面","存在未保存变更时确认；beforeunload"],["超长文本","达到上限禁止继续并显示剩余字符"]])
d.add_heading("6 数据模型与接口约定",1); p("金额统一以 cents 传输；服务端重新校验所有枚举、价格和必填字段。")
tbl(["接口","方法/路径","关键请求","返回"],[["保存草稿","POST /api/v1/design-requests/draft","draftId、requestPayload、version","draftId、savedAt、version"],["提交需求","POST /api/v1/design-requests","requestPayload、idempotencyKey","requestId、status、paymentUrl、paymentAmount"],["上传文件","POST /api/v1/uploads/presign + PUT OSS","fileName、mimeType、size、scene","fileId、url、thumbnailUrl、checksum"],["获取草稿","GET /api/v1/design-requests/draft/{draftId}","draftId","完整草稿"],["支付状态","GET /api/v1/design-requests/{requestId}/payment","requestId","paymentStatus、paidAt"]])
d.add_heading("7 推荐 Payload",1); p("{ room, dimensions, floorPlan, roomDescription, styles, colors, budget/designTier, inspirationLinks, referenceImages, constructionDate, tags, contact, additionalItems }")
d.add_heading("8 埋点与监控",1); tbl(["事件","时机","属性"],[["post_demand_view","首屏成功","source、draftId"],["post_demand_field_error","校验失败","field、errorCode"],["post_demand_upload_success/fail","上传结果","scene、mimeType、size、reason"],["post_demand_draft_save","草稿成功","draftId、completionRate"],["post_demand_submit_click","点击提交","room、pricingCode、completionRate"],["post_demand_submit_success/fail","接口返回","requestId、errorCode"],["payment_redirect","跳支付","requestId、amountCents"]])
d.add_heading("9 权限、隐私与安全",1); bullets(["仅登录用户可提交；未登录点击提交时引导登录并回填草稿。","手机号、地址等个人信息脱敏，禁止在 localStorage 保存明文。","上传校验 MIME、扩展名、大小与病毒扫描，使用签名 URL。","服务端重新校验金额、档位、枚举与必填字段。"])
d.add_heading("10 验收标准",1); tbl(["编号","验收项","通过标准"],[["AC-01","房型","单选；切换确认与清理正确"],["AC-02","校验","必填阻断、错误定位准确"],["AC-03","价格互斥","整屋只传 budget，其他只传 tier"],["AC-04","上传","格式/大小/进度/失败重试完整"],["AC-05","草稿","保存、恢复、版本冲突提示"],["AC-06","提交","生成 requestId；支付真实金额；防重复"],["AC-07","响应式","1200px 容器；移动端无横向滚动"],["AC-08","可访问性","label、键盘、错误关联、对比度达标"],["AC-09","兼容性","Chrome/Edge/Safari 最近两个大版本"],["AC-10","异常恢复","断网/500/上传失败不丢数据"]])
d.add_heading("11 开发拆分建议",1); bullets(["前端拆分 RoomSection、StyleSection、ReferenceSection、ContactSection、SubmitBar；统一表单状态与 schema。","后端草稿与正式需求单分离；提交幂等；价格快照写入订单。","上传采用预签名 + 状态回调；fileId 与需求单关联。","E2E 覆盖整屋/单房型、草稿恢复、上传失败、重复点击、支付回跳。"])
d.add_heading("12 待产品确认项",1); bullets(["尺寸字段是否全部必填，面积是否允许自动计算覆盖；","施工日期是否支持 TBD 及多时区；","预算/档位币种、税费与实际价格；","登录前草稿策略与保留期限；","是否需要短信/邮箱验证码；","参考图数量、单组上限与版权提示。"] )
d.add_paragraph("文档结束").alignment=WD_ALIGN_PARAGRAPH.CENTER
d.save(OUT); print(OUT)


from docx import Document
path='F:/Soya-PC/C端发布需求模块PRD.docx'
d=Document(path)
d.add_heading('13 后台配置与前端动态数据约定',1)
d.add_paragraph('房间类型、风格、设计档位和设计标签均不在前端写死，统一由后台配置中心提供。前端拉取并提交唯一标识，后端校验启用状态并保存价格快照。')
d.add_heading('13.1 动态数据来源',2)
for x in ['房间类型：后台管理系统-后台管理-案例中心-房间类型管理创建后获取；仅展示启用项，提交 roomTypeCode。','风格偏好：后台管理系统-后台管理-案例中心-风格管理创建后获取；支持多选，提交 styleCodes。','设计档位：后台管理系统-运营中心-配置管理获取；根据选择的房间类型联动显示，不同房间类型可配置不同档位和价格，提交 tierCode、priceCents、priceVersion。','设计标签：后台管理系统-后台管理-案例中心-标签管理创建后获取；最多10个，提交 tagCodes。']: d.add_paragraph(x,style='List Bullet')
d.add_heading('13.2 房间尺寸与户型图',2)
for x in ['房间尺寸必填：长度和宽度必须为大于0的数字；高度按最终配置校验。','面积支持两种方式：按公式自动生成（面积=长度×宽度），也允许用户手动输入；提交 areaSource=CALCULATED 或 MANUAL。','上传带尺寸标注的户型图，最多9张；达到9张后禁止继续添加，删除后可补传。上传失败或上传中不计入成功数量。']: d.add_paragraph(x)
d.add_heading('13.3 联动与异常',2)
for x in ['房间类型变更时重新拉取对应设计档位并清理不适用选项；已有内容需二次确认。','提交时以后端实时配置为准；配置停用或版本变化返回 CONFIG_INVALID，提示刷新并重新选择。','前端不得使用固定价格常量；订单保存后台返回的价格、币种和版本快照。']: d.add_paragraph(x,style='List Bullet')
d.add_heading('13.4 新增验收标准',2)
for x in ['AC-11：房间类型、风格、标签来自后台启用配置，前端无写死选项。','AC-12：尺寸必填；面积支持自动计算和手动输入并标识来源。','AC-13：户型图要求带尺寸标注，最多9张。','AC-14：档位随房间类型动态联动，价格与后台配置一致。','AC-15：后台配置变更时提交能拦截并提示刷新重选。']: d.add_paragraph(x,style='List Bullet')
d.save(path)

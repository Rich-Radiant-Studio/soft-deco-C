from docx import Document
path='F:/Soya-PC/C端发布需求模块PRD.docx'
d=Document(path)
# locate heading 12 and replace following bullet paragraphs until heading 13
start=None; end=None
for i,p in enumerate(d.paragraphs):
    if p.text.strip().startswith('12 待产品确认项'): start=i
    if start is not None and i>start and p.text.strip().startswith('13 后台配置与前端动态数据约定'): end=i; break
if start is not None:
    # remove existing paragraphs in range after heading by clearing text
    for p in d.paragraphs[start+1:(end or len(d.paragraphs))]: p.text=''
    items=[
      '房间尺寸字段中高度是否必填；长度、宽度、面积的单位是否统一为 ft / sq ft。',
      '面积自动计算时是否允许用户手动覆盖；手动输入面积与长度×宽度不一致时，是否需要提示或阻断提交。',
      '带尺寸户型图的服务端识别/审核标准：是否必须人工审核尺寸标注，支持的最终文件格式是否包含 PDF。',
      '后台配置的缓存策略：房间类型、风格、标签和档位多久刷新一次；配置停用或版本变化时是否允许用户继续使用旧草稿。',
      '不同房间类型的设计档位价格是否含税、币种及服务费；价格变更后的历史草稿是否沿用原价格还是以提交时价格为准。',
      '登录前是否允许保存草稿，以及草稿保留期限和跨设备恢复规则。',
      '联系人是否需要短信或邮箱验证码；preferredContactTime 是否需要用户选择时区。',
      '户型图最多9张之外，是否需要限制单张大小、总大小及图片排序规则。'
    ]
    # insert content before heading 13 by using paragraphs at end is acceptable; append a revised section note
    d.add_heading('12 待产品确认项（修订）',1)
    for x in items: d.add_paragraph(x,style='List Bullet')
d.save(path)

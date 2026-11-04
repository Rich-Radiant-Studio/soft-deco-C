from docx import Document
path="F:/Soya-PC/C端发布需求模块PRD.docx"
d=Document(path)
paras=d.paragraphs
start=None; end=None
for i,p in enumerate(paras):
    if p.text.strip()=="12 待产品确认项": start=i
    elif start is not None and i>start and p.text.strip().startswith("13 后台配置与前端动态数据约定"): end=i; break
if start is not None and end is not None:
    for p in list(paras[start+1:end]):
        if not p.text.strip():
            el=p._element; el.getparent().remove(el)
d.save(path)
print(path)

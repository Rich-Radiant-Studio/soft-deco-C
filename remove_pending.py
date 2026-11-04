from docx import Document
path="F:/Soya-PC/C端发布需求模块PRD.docx"
d=Document(path)
ps=d.paragraphs; start=None; end=None
for i,p in enumerate(ps):
    if p.text.strip().startswith("12 待产品确认项"):
        start=i
    elif start is not None and i>start and p.text.strip().startswith("14 已确认产品规则"):
        end=i; break
if start is not None:
    if end is None: end=len(ps)
    for p in list(ps[start:end]):
        el=p._element; el.getparent().remove(el)
d.save(path)
print(path)

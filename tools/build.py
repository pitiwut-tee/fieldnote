"""Build both pages from src/app.html + content/.

  python3 tools/build.py
    -> index.html                (student page, served by GitHub Pages)
    -> dist/parent.html          (parent page, published as the Claude artifact)
"""
import json, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def P(*a): return os.path.join(ROOT, *a)
def load(p): return json.load(open(P(p), encoding="utf8"))

sets = [json.load(open(f, encoding="utf8")) for f in sorted(glob.glob(P("content", "sets", "*.json")))]
content = {"sets": sets, "spells": load("content/spells.json"), "vocab": load("content/vocab.json"), "phonics": load("content/phonics.json"),
           "readings": load("content/readings.json"), "calendar": load("content/calendar.json"),
           "missions": load("content/missions.json"), "letters": load("content/letters.json"),
           "decisions": load("content/decisions.json"), "variants": load("content/variants.json"),
           "guests": load("content/guests.json"), "studio": load("content/studio.json"), "cards": load("content/cards.json"), "curriculum": load("content/curriculum.json"), "qtags": load("content/qtags.json"), "challenges": load("content/challenges.json"), "examfreq": load("content/examfreq.json")}

src = open(P("src", "app.html"), encoding="utf8").read()
import datetime as _dt
src = src.replace("/*@@BUILD@@*/", _dt.datetime.now(_dt.timezone(_dt.timedelta(hours=7))).strftime("%Y-%m-%d %H:%M"))
assert "/*@@CONTENT@@*/null" in src
page = src.replace("/*@@CONTENT@@*/null", json.dumps(content, ensure_ascii=False).replace("</", "<\\/"))
os.makedirs(P("dist"), exist_ok=True)
open(P("dist", "parent.html"), "w", encoding="utf8").write(page)

# student page: no parent tab, wrapped in a full HTML document; only missions dad has approved
student_content = dict(content, missions={"missions": [m for m in content["missions"]["missions"] if m.get("status") == "approved"]},
                       guests={"guests": [g for g in content["guests"]["guests"] if g.get("status") == "approved"]})
s = src.replace("/*@@CONTENT@@*/null", json.dumps(student_content, ensure_ascii=False).replace("</", "<\\/"))
def r(a, b):
    global s
    assert a in s, "missing: " + a[:60]
    s = s.replace(a, b, 1)
r('<a href="#parent" id="tab-parent" data-v="parent">หน้าผู้ปกครอง</a>', "")
r('if(h==="parent"){view="parent"} else', 'if(false){} else')
r("ฝึกวันละ 30–45 นาที · ต้นแบบรุ่นทดลอง", "ฝึกทุกวัน เก็บคาถาให้ครบ")
r("<p class=\"small muted\">เครื่องนี้ยังไม่ได้เชื่อมบัญชี ผลจึงเก็บไว้ในเครื่อง ส่งให้พ่อผ่าน LINE ได้ในไม่กี่วินาที</p>",
  "<p class=\"small muted\">ผลเก็บไว้ในเครื่องนี้ ส่งให้พ่อผ่าน LINE ได้ในไม่กี่วินาที ส่งสะสมหลายวันทีเดียวก็ได้</p>")
head = ('<!doctype html><html lang="th"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
        '<meta name="robots" content="noindex">'
        '<link rel="apple-touch-icon" href="icon-180.png"><link rel="icon" href="icon-180.png">'
        '<meta name="apple-mobile-web-app-title" content="สมุดคาถา"><title>สมุดคาถา</title>'
        '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}'
        'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>'
        '</head><body>')
open(P("index.html"), "w", encoding="utf8").write(head + s + "</body></html>")
print("built index.html and dist/parent.html;", len(sets), "sets,", len(content["vocab"]), "words")

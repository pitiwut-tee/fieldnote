/* Check content and play every set in a real browser before publishing.
   Usage: node tools/verify.js        (run tools/build.py first)
   Exit code 1 = something is wrong; read the messages and fix before pushing. */
const fs=require("fs"), path=require("path");
const ROOT=path.join(__dirname,".."), J=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),"utf8"));
const errs=[], warn=m=>errs.push(m);

/* geometry (geo) and hand-written (svg) figures, anywhere in content/ (18 Nov 2026; rules in docs/writing-content.md "Figures") */
function checkFig(f,w){
  if(!f||typeof f!=="object") return;
  if(f.kind==="geo"||f.kind==="svg"){ if(!f.desc||String(f.desc).length<15) warn(`${w}: ${f.kind} fig needs desc (a sentence for read-aloud)`); }
  if(f.kind==="geo"){ const P=f.pts||{}, has=n=>Object.prototype.hasOwnProperty.call(P,n);
    if(Object.keys(P).length<2) warn(`${w}: geo fig needs pts`);
    for(const [n,c] of Object.entries(P)) if(!(Array.isArray(c)&&c.length===2&&c.every(Number.isFinite))) warn(`${w}: geo point ${n} needs [x,y]`);
    for(const s of f.seg||[]){ const p=Array.isArray(s)?s:s.p; if(!(Array.isArray(p)&&p.length===2&&has(p[0])&&has(p[1]))) warn(`${w}: geo seg ${JSON.stringify(s)} names unknown points`);
      else if(P[p[0]][0]===P[p[1]][0]&&P[p[0]][1]===P[p[1]][1]) warn(`${w}: geo seg ${p.join("")} has zero length`); }
    for(const a of f.ang||[]) if(!(has(a.v)&&has(a.a)&&has(a.b))) warn(`${w}: geo ang ${JSON.stringify(a)} names unknown points`);
    for(const n of [...(f.hide||[]),...Object.keys(f.at||{}),...Object.keys(f.lab||{})]) if(!has(n)) warn(`${w}: geo fig names unknown point ${n}`);
    if(f.scale!==false&&!f.scaleOk) warn(`${w}: geo fig: set "scale":false (shows "รูปไม่ได้วาดตามสเกล") or "scaleOk":true after checking the drawing is to scale`); }
  if(f.kind==="svg"){ const t=String(f.svg||""); if(!/^\s*<svg[\s>]/.test(t)) warn(`${w}: svg fig must start with <svg`);
    if(/<script|<foreignObject|<image|\son\w+\s*=|href\s*=|javascript:/i.test(t)) warn(`${w}: svg fig contains a forbidden tag or attribute`); }
}
function walkFigs(o,w){ if(Array.isArray(o)) o.forEach((x,i)=>walkFigs(x,w)); else if(o&&typeof o==="object"){ if(o.fig) checkFig(o.fig,`${w}${o.id?" "+o.id:""}`); if(Array.isArray(o.figs)){ if(o.points&&o.figs.length>o.points.length) warn(`${w}: concept.figs has more entries than points`); o.figs.forEach((f,i)=>f&&checkFig(f,`${w} figs[${i}]`)) } for(const k in o) if(k!=="fig"&&k!=="figs") walkFigs(o[k],w) } }
for(const f of fs.readdirSync(path.join(ROOT,"content")).filter(f=>f.endsWith(".json"))) { try{ walkFigs(J("content/"+f),f) }catch(e){} }
for(const f of fs.readdirSync(path.join(ROOT,"content/sets")).filter(f=>f.endsWith(".json"))) { try{ walkFigs(J("content/sets/"+f),f) }catch(e){} }

/* ---- 1. content rules ---- */
const spells=new Set(J("content/spells.json").spells.map(s=>s.id));
const CAL0=J("content/calendar.json"), CPS=CAL0.checkpoints||[], WAVE1=(CAL0.understand||{}).wave1||"9999", WAVE2=(CAL0.understand||{}).wave2||"9999";
const files=fs.readdirSync(path.join(ROOT,"content/sets")).filter(f=>f.endsWith(".json")).sort();
const setIds=new Set(), qIds=new Set();
for(const f of files){
  let s; try{ s=J("content/sets/"+f) }catch(e){ warn(`${f}: not valid JSON (${e.message})`); continue }
  const where=`${f} (${s.id})`;
  if(setIds.has(s.id)) warn(`${where}: duplicate set id`); setIds.add(s.id);
  if(!["lesson","probe","mixed","passage","sweep","checkpoint"].includes(s.kind)) warn(`${where}: kind must be "lesson", "probe", "mixed", "passage", "sweep" or "checkpoint"`);
  if(s.kind==="checkpoint"){ const pr=s.practice||[];
    if(pr.some(q=>!q.spell)) warn(`${where}: every question in a checkpoint needs its own spell`);
    if(pr.length<12) warn(`${where}: a checkpoint needs 12-30 questions (has ${pr.length})`);
    if(!pr.some(q=>/^s/.test(q.spell||""))||!pr.some(q=>/^m/.test(q.spell||""))) warn(`${where}: a checkpoint mixes science and math`);
    if(s.warm&&s.warm.length||s.challenge) warn(`${where}: a checkpoint has no warm-up and no challenge`);
    if(!(CPS.some(c=>c.kind==="short"&&c.setId===s.id))) warn(`${where}: checkpoint set is not in calendar.json checkpoints`); }
  if(s.kind==="passage"&&!(s.passage&&s.passage.title&&Array.isArray(s.passage.paras)&&s.passage.paras.length)) warn(`${where}: passage needs passage.title and passage.paras`);
  if(s.kind==="mixed"){
    const sp=new Set((s.practice||[]).map(q=>q.spell));
    if((s.practice||[]).some(q=>!q.spell)) warn(`${where}: every question in a mixed set needs its own spell`);
    if(sp.size<4) warn(`${where}: a mixed set needs questions from at least 4 spells (has ${sp.size})`);
    if((s.practice||[]).length<10) warn(`${where}: a mixed set needs 10-15 questions`);
    if(s.challenge) warn(`${where}: a mixed set has no challenge`);
  } else if(s.kind!=="sweep"&&s.kind!=="checkpoint"&&!spells.has(s.spell)) warn(`${where}: unknown spell "${s.spell}"`);
  for(const k of ["subject","topic","grade","mins"]) if(!s[k]) warn(`${where}: missing ${k}`);
  if(s.kind==="lesson"&&(!s.concept||!(s.concept.points||[]).length)) warn(`${where}: lesson needs concept.points`);
  if(!Array.isArray(s.practice)||s.practice.length<6) warn(`${where}: practice needs at least 6 questions`);
  const qs=[...(s.warm||[]),...(s.practice||[]),...(s.challenge?[s.challenge]:[])];
  const lv={1:0,2:0,3:0};
  for(const q of qs){
    const w=`${where} ${q.id}`;
    if(!q.id||qIds.has(q.id)) warn(`${w}: missing or duplicate question id`); qIds.add(q.id);
    if(![1,2,3].includes(q.level)) warn(`${w}: level must be 1, 2 or 3`); else lv[q.level]++;
    if(!q.q||!q.ex||!q.topic) warn(`${w}: needs q, ex and topic`);
    if(q.spell&&!spells.has(q.spell)) warn(`${w}: unknown spell "${q.spell}"`);
    if(q.num){ if(typeof q.answer!=="number"||typeof q.tol!=="number") warn(`${w}: numeric question needs answer and tol`) }
    else {
      if(!Array.isArray(q.opts)||q.opts.length<3) warn(`${w}: needs at least 3 options`);
      else { if(new Set(q.opts).size!==q.opts.length) warn(`${w}: options repeat`);
        if(!(q.a>=0&&q.a<q.opts.length)) warn(`${w}: answer index out of range`); }
    }
    if(q.fig){ const f=q.fig; if(!["dot","stem","hist","bar","table","line","geo","svg"].includes(f.kind)) warn(`${w}: fig.kind must be dot, stem, hist, bar, table, line, geo or svg`);
      if(f.kind==="dot"&&!(typeof f.min==="number"&&typeof f.max==="number"&&f.counts)) warn(`${w}: dot fig needs min, max, counts`);
      if((f.kind==="hist"||f.kind==="bar")&&!(Array.isArray(f.values)&&f.values.length)) warn(`${w}: ${f.kind} fig needs values`);
      if((f.kind==="stem"||f.kind==="table")&&!Array.isArray(f.rows)) warn(`${w}: ${f.kind} fig needs rows`); }
    const h=(s.hints||{})[q.id]; if(s.kind!=="sweep"&&s.kind!=="checkpoint"&&(!Array.isArray(h)||!h.length)) warn(`${w}: needs at least one hint`);
    /* understanding-first fields (17 Nov 2026) */
    if(q.friend!=null&&!(q.friend&&Array.isArray(q.friend.work)&&q.friend.work.length>=2&&q.friend.work.every(l=>typeof l==="string"&&l.trim()))) warn(`${w}: friend needs {who?, work:[2+ lines of the friend's working]}`);
    if(q.friend&&q.num) warn(`${w}: a friend's-mistake item is a choice question (options describe the mistake)`);
    if(q.predict!=null){ const pd=q.predict; if(!(pd&&pd.q&&Array.isArray(pd.opts)&&pd.opts.length>=2&&new Set(pd.opts).size===pd.opts.length&&pd.a===0)) warn(`${w}: predict needs {q, opts:[2+ distinct, right one first], a:0, ex?}`) }
    if(q.sit!=null&&!(typeof q.sit==="string"&&q.sit.trim())) warn(`${w}: sit must be a short situation label`);
    /* "what does this number mean" / "which method" items (teaching audit 17 Nov 2026): ask = meaning | method, with its subtopic */
    if(q.ask!=null&&!(["meaning","method"].includes(q.ask)&&q.sub)) warn(`${w}: ask must be "meaning" or "method", and the item needs sub (its subtopic)`);
    if(q.check&&s.added>=WAVE2&&q.check.opts.length!==3) warn(`${w}: from ${WAVE2} a reason check has exactly 3 reasons (pick the right one from 3)`);
    if(q.check&&q.check.a!==0&&s.added>=WAVE1) warn(`${w}: write the right reason first (check.a = 0); the app shuffles`);
  }
  if(s.kind!=="sweep"&&s.kind!=="checkpoint"&&(lv[1]<2||lv[2]<2||lv[3]<1)) warn(`${where}: mix should have ≥2 level-1, ≥2 level-2, ≥1 level-3 (has ${JSON.stringify(lv)})`);
}
/* math sets written from 2026-11-08 on: at least half of level-2/3 questions answerable as a typed number (exam fill-in part) */
{ const R=/^\s*([−-]?[\d,]*\.?\d+(?:\s*\/\s*\d+)?)\s*(.*)$/;
  const numable=q=>q.num||Array.isArray(q.opts)&&q.opts.every(o=>R.test(String(o)))&&new Set(q.opts.map(o=>String(o).match(R)[2].trim())).size===1;
  for(const f of files){ let s; try{ s=J("content/sets/"+f) }catch(e){ continue } if(!(s.added>="2026-11-08")||s.subject!=="คณิตศาสตร์"||s.kind==="passage") continue;
    const qs=[...(s.practice||[]),...(s.challenge?[s.challenge]:[])].filter(q=>q.level>=2&&!q.ask), n=qs.filter(numable).length;   /* meaning/method items are about choosing, not computing: not counted */
    if(qs.length&&n<Math.ceil(qs.length/2)) warn(`${f}: at least half of level-2/3 math questions should be answerable as a number (has ${n}/${qs.length})`); } }
/* lessons and mixed sets written from 2026-11-05 on: every question has a context tag, lessons have a real-life "use" line */
for(const f of files){ let s; try{ s=J("content/sets/"+f) }catch(e){ continue } if(!(s.added>="2026-11-05")) continue;
  const qs=[...(s.warm||[]),...(s.practice||[]),...(s.challenge?[s.challenge]:[])];
  for(const q of qs) if(!["life","earth","fun","pure"].includes(q.ctx)) warn(`${f} ${q.id}: ctx must be life, earth, fun or pure`);
  const pr=(s.practice||[]).filter(q=>!q.ctxAuto), n=k=>pr.filter(q=>q.ctx===k).length;
  if(s.kind!=="probe"&&s.kind!=="checkpoint"&&pr.length&&(n("life")+n("earth")<Math.ceil(pr.length*0.5)||(n("earth")<1&&!s.oneContext))) warn(`${f}: practice needs about half life/earth contexts and at least 1 earth (has life ${n("life")}, earth ${n("earth")})`);
  for(const q of qs) if(q.optErr&&!(Array.isArray(q.optErr)&&q.opts&&q.optErr.length===q.opts.length&&q.optErr[q.a]==null&&q.optErr.every((e,i)=>i===q.a||typeof e==="string"&&e))) warn(`${f} ${q.id}: optErr must match opts, null at the answer, a short code for each wrong option`);
  for(const q of qs) if(q.check&&!(Array.isArray(q.check.opts)&&q.check.opts.length>=2&&Number.isInteger(q.check.a)&&q.check.a>=0&&q.check.a<q.check.opts.length)) warn(`${f} ${q.id}: check needs {q?, opts:[2+], a:index, ex}`);
  for(const q of qs) if(q.level===3&&!(q.parts&&Array.isArray(q.parts.given)&&q.parts.given.length&&q.parts.ask)) warn(`${f} ${q.id}: level-3 question needs parts {given:[...], ask, watch?}`);
  if(s.kind==="lesson"&&s.concept&&s.concept.hook){ const h=s.concept.hook; if(!h.text||!h.reveal) warn(`${f}: concept.hook needs text and reveal (q and opts optional)`) }
  if(s.kind==="lesson"&&s.concept&&s.concept.more&&s.concept.more.length!==s.concept.points.length) warn(`${f}: concept.more must have one entry per point`);
  if(s.kind==="lesson"&&!(s.concept&&s.concept.use)) warn(`${f}: lesson concept needs a "use" line (where this is used in real life)`);
}
/* missions */
const MS=J("content/missions.json").missions||[];
for(const m of MS){ const w=`missions.json ${m.id}`;
  for(const k of ["id","status","from","to","title","why","mins","steps"]) if(!m[k]) warn(`${w}: missing ${k}`);
  if(!["draft","approved"].includes(m.status)) warn(`${w}: status must be draft or approved`);
  for(const sp of m.spells||[]) if(!spells.has(sp)) warn(`${w}: unknown spell ${sp}`);
  if(m.record&&(!Array.isArray(m.record.cols)||(m.record.numCol!=null&&!(m.record.numCol<m.record.cols.length)))) warn(`${w}: record.cols / numCol wrong`);
  for(const q of m.questions||[]) if(!q.id||!q.q) warn(`${w}: question needs id and q`);
}
/* twin questions */
const VAR=J("content/variants.json").variants||{};
for(const [orig,vs] of Object.entries(VAR)){ if(!qIds.has(orig)) warn(`variants.json: ${orig} is not a question id`);
  for(const v of vs){ const w=`variants.json ${v.id}`; if(!v.id||!v.id.startsWith(orig+"~")) warn(`${w}: id must start with "${orig}~"`);
    if(qIds.has(v.id)) warn(`${w}: duplicate id`); qIds.add(v.id);
    if(!v.q||!v.ex||!Array.isArray(v.opts)||v.opts.length<3||!(v.a>=0&&v.a<v.opts.length)) warn(`${w}: needs q, ex, opts (3+), a`);
    if(new Set(v.opts||[]).size!==(v.opts||[]).length) warn(`${w}: options repeat`);
    if(!Array.isArray(v.hints)||!v.hints.length) warn(`${w}: needs hints`);
    if(!["life","earth","fun","pure"].includes(v.ctx)) warn(`${w}: needs ctx`);
    if(v.change!=null&&!["situation","numbers"].includes(v.change)) warn(`${w}: change must be "situation" or "numbers"`);
    if(v.change==="situation"&&!(typeof v.sit==="string"&&v.sit.trim())) warn(`${w}: a situation-changing twin needs sit (a short label of its new situation)`);
    if((v.added||"")>=WAVE1&&!v.change) warn(`${w}: twins added from ${WAVE1} say what they change (change: "situation" | "numbers"); prefer situation`);
    if(v.check&&!(Array.isArray(v.check.opts)&&v.check.opts.length===3&&v.check.a===0)) warn(`${w}: check needs 3 reasons, right one first (a:0)`); } }
/* daily cards (22 Nov 2026): the recall goal needs cards; shape check + stock warning */
{ let DC={cards:[]}; try{ DC=J("content/cards.json") }catch(e){ warn("content/cards.json: not valid JSON") }
  const seenDays=new Set(), today=new Date(Date.now()+7*3600000).toISOString().slice(0,10);
  for(const c of DC.cards||[]){ const w=`cards.json ${c.day}`;
    if(!/^\d{4}-\d\d-\d\d$/.test(c.day||"")) warn(`${w}: needs a YYYY-MM-DD day`);
    if(seenDays.has(c.day)) warn(`${w}: duplicate day`); seenDays.add(c.day);
    for(const k of ["icon","tag","title","body"]) if(!(typeof c[k]==="string"&&c[k].trim())) warn(`${w}: needs ${k}`);
    if(!(c.q&&typeof c.q.q==="string"&&Array.isArray(c.q.opts)&&c.q.opts.length===3&&c.q.a===0)) warn(`${w}: q needs a question, 3 options and a:0 (right option first)`); }
  const last=[...seenDays].sort().pop()||"", need=new Date(Date.now()+7*3600000+3*86400000).toISOString().slice(0,10);
  if(last<need) console.log(`WARNING: cards.json last card is ${last||"none"}; needs cards through ${need} at least (the recall goal depends on them)`) }
const cal=J("content/calendar.json");
/* understanding-first calendar fields and the reteach cards (17 Nov 2026) */
for(const k of ["wave1","wave2"]) if(cal.understand&&!/^\d{4}-\d\d-\d\d$/.test(cal.understand[k]||"")) warn(`calendar.json understand.${k}: needs a YYYY-MM-DD date`);
if(cal.minDay&&!/^\d{4}-\d\d-\d\d$/.test(cal.minDay.from||"")) warn("calendar.json minDay.from: needs a date");
{ const today=new Date(Date.now()+7*3600000).toISOString().slice(0,10), soon=new Date(Date.now()+7*3600000+10*86400000).toISOString().slice(0,10);
  for(const c of cal.checkpoints||[]){ const w=`calendar.json checkpoint ${c.date}`;
    if(!/^\d{4}-\d\d-\d\d$/.test(c.date||"")||!["short","full"].includes(c.kind)) warn(`${w}: needs date and kind short|full`);
    if(c.kind==="short"){ if(!c.setId) warn(`${w}: short checkpoint needs setId`);
      else if(!setIds.has(c.setId)){ if(c.date>=today&&c.date<=soon) console.log(`WARNING: ${w} is in ≤ 10 days but set ${c.setId} does not exist yet (write it in chat 2, with the blind check)`) }
      else if(J("content/sets/"+files.find(f=>{ try{ return J("content/sets/"+f).id===c.setId }catch(e){ return false } })).kind!=="checkpoint") warn(`${w}: set ${c.setId} must have kind "checkpoint"`) } } }
{ let RT={cards:{}}; try{ RT=J("content/reteach.json") }catch(e){ warn("content/reteach.json: not valid JSON") }
  const subs=new Set(Object.values(J("content/curriculum.json").spells||{}).flat().map(x=>x.id));
  for(const [sub,c] of Object.entries(RT.cards||{})){ const w=`reteach.json ${sub}`;
    if(!subs.has(sub)) warn(`${w}: not a curriculum subtopic id`);
    if(!c.title||!Array.isArray(c.text)||!c.text.length) warn(`${w}: needs title and text [paras]`);
    if(!["table","diagram","real","contrast"].includes(c.form)) warn(`${w}: form must be table, diagram, real or contrast (a different form from the lesson)`);
    if(c.table&&!(Array.isArray(c.table.cols)&&Array.isArray(c.table.rows)&&c.table.rows.every(r=>r.length===c.table.cols.length))) warn(`${w}: table needs cols and rows of the same length`);
    if(c.contrast&&!(Array.isArray(c.contrast)&&c.contrast.length===2&&c.contrast.every(k=>k.title&&k.text))) warn(`${w}: contrast needs exactly 2 cases {title, text}`);
    if(!Array.isArray(c.worked)||c.worked.length!==3) warn(`${w}: needs exactly 3 worked examples (full, last step blank, last two blank)`);
    else c.worked.forEach((x,i)=>{ const st=(x.steps||[]).map(s=>typeof s==="string"?{t:s}:s);
      if(!x.q||st.length<3||st.some(s=>!s.t)) warn(`${w} worked ${i+1}: needs q and at least 3 steps`);
      st.forEach((s,k)=>{ if(s.opts&&!(Array.isArray(s.opts)&&s.opts.length>=2&&s.opts[0]===s.t&&new Set(s.opts).size===s.opts.length)) warn(`${w} worked ${i+1} step ${k+1}: opts must start with the step's own text, then distinct wrong steps`) });
      const hidden=st.slice(st.length-i); if(i>0&&hidden.some(s=>!s.opts)) console.log(`note: ${w} worked ${i+1}: a blank step without opts falls back to think-then-self-check`) }); } }
/* สมุดคาถา cards and glossary terms (17 Nov 2026); a tap = a quick check at the end of one screen, right option first */
const tapOk=(t,w)=>{ if(t==null) return; if(!(t&&t.q&&Array.isArray(t.opts)&&t.opts.length>=2&&t.opts.length<=4&&new Set(t.opts).size===t.opts.length&&t.opts.every(o=>typeof o==="string"&&o.trim()))) warn(`${w}: tap needs {q, opts:[2-4 distinct, the right one FIRST], ex?}`) };
{ let LBJ={cards:{},terms:{}}; try{ LBJ=J("content/library.json") }catch(e){ warn("content/library.json: not valid JSON") }
  const subs=new Set(Object.values(J("content/curriculum.json").spells||{}).flat().map(x=>x.id));
  for(const [k,v] of Object.entries(LBJ.terms||{})) if(typeof v!=="string"||!v.trim()||!k.trim()) warn(`library.json term "${k}": needs a definition`);
  for(const [sub,c] of Object.entries(LBJ.cards||{})){ const w=`library.json ${sub}`;
    if(!subs.has(sub)) warn(`${w}: not a curriculum subtopic id`);
    if(!c.title||!c.what) warn(`${w}: needs title and what (what it is and what it is for, before any formula)`);
    if(!Array.isArray(c.steps)||!c.steps.length) warn(`${w}: needs steps`);
    else { if(c.steps.length>8) warn(`${w}: at most 8 steps (one screen each)`);
      c.steps.forEach((x,i)=>{ const t=typeof x==="string"?{t:x}:x; if(!t||!t.t) warn(`${w} step ${i+1}: needs text`); tapOk(t&&t.tap,`${w} step ${i+1}`) }) }
    tapOk(c.whatTap,`${w} what`); tapOk(c.trapTap,`${w} trap`);
    if(c.formula!=null&&!Array.isArray(c.formula)) warn(`${w}: formula is a list of lines`) }
  for(const [sub,c] of Object.entries((J("content/reteach.json").cards)||{})) (c.text||[]).forEach((x,i)=>{ if(typeof x!=="string"){ if(!x||!x.t) warn(`reteach.json ${sub} text ${i+1}: string or {t, tap?}`); else tapOk(x.tap,`reteach.json ${sub} text ${i+1}`) } }) }
/* option-length cue (teaching audit 17 Nov 2026, father approved): the right option was the longest in 92-95% of reason
   checks, so "pick the longest" scored without understanding. Two rules over every choice in content/:
   (1) per item: a right option of 20+ characters may not be more than 15% longer than the longest wrong one;
   (2) per kind (question options / reasons / card taps and blank steps): the right option may be the strictly longest
       in at most 40% of items and the strictly shortest in at most 45% (so "pick the shortest" does not work either).
   Length = characters without Thai combining marks. All-number options (e.g. "12 g", "3.5") are skipped. */
{ const L=s=>[...String(s)].filter(c=>!/\p{M}/u.test(c)).length, numOpt=s=>/^[\s\d.,\-−+×÷/:%°^()=<>a-zA-Z²³]*$/.test(String(s))&&String(s).length<14;
  const kinds={question:[0,0,0],reason:[0,0,0],card:[0,0,0]};
  const one=(kind,w,opts,a)=>{ if(!Array.isArray(opts)||opts.length<2||!(a>=0&&a<opts.length)||opts.every(numOpt)) return;
    const ls=opts.map(L), r=ls[a], wr=ls.filter((_,j)=>j!==a), mx=Math.max(...wr), mn=Math.min(...wr);
    if(r>=20&&r>1.15*mx) warn(`${w}: the right option is much longer than every wrong one (${r} vs ${mx} characters); shorten it or give a wrong option a fuller wrong reason`);
    const k=kinds[kind]; k[0]++; if(r>mx) k[1]++; if(r<mn) k[2]++ };
  const qAll=(w,q)=>{ if(!q||typeof q!=="object") return; if(Array.isArray(q.opts)&&q.q) one("question",`${w} ${q.id}`,q.opts,q.a);
    if(q.check) one("reason",`${w} ${q.id} check`,q.check.opts,q.check.a); if(q.predict) one("reason",`${w} ${q.id} predict`,q.predict.opts,q.predict.a) };
  for(const f of files){ let s; try{ s=J("content/sets/"+f) }catch(e){ continue } [...(s.warm||[]),...(s.practice||[]),...(s.challenge?[s.challenge]:[])].forEach(q=>qAll(f,q)) }
  for(const [k,arr] of Object.entries((J("content/variants.json").variants)||{})) (arr||[]).forEach(v=>qAll("variants.json",v));
  const tap=(w,t)=>{ if(t&&Array.isArray(t.opts)) one("card",w,t.opts,0) };
  for(const [sub,c] of Object.entries((J("content/reteach.json").cards)||{})){ (c.text||[]).forEach((x,i)=>tap(`reteach.json ${sub} text ${i+1}`,x&&x.tap));
    tap(`reteach.json ${sub} contrast`,c.contrastTap); tap(`reteach.json ${sub} table`,c.tableTap);
    (c.worked||[]).forEach((x,i)=>(x.steps||[]).forEach((s,k)=>{ if(s&&s.opts) one("card",`reteach.json ${sub} worked ${i+1} step ${k+1}`,s.opts,0) })) }
  { const LB=J("content/library.json"); for(const [sub,c] of Object.entries(LB.cards||{})){ tap(`library.json ${sub} what`,c.whatTap); tap(`library.json ${sub} trap`,c.trapTap);
    (c.steps||[]).forEach((x,i)=>tap(`library.json ${sub} step ${i+1}`,x&&x.tap)) } }
  for(const [kind,[n,lo,sh]] of Object.entries(kinds)) if(n>=10){
    if(lo>0.4*n) warn(`option length (${kind}): the right option is the longest in ${lo} of ${n} items (max 40%); rebalance so length gives nothing away`);
    if(sh>0.45*n) warn(`option length (${kind}): the right option is the shortest in ${sh} of ${n} items (max 45%)`) }
  console.log(`option length: right option longest / shortest — ${Object.entries(kinds).map(([k,[n,lo,sh]])=>`${k} ${lo}/${sh} of ${n}`).join(" · ")}`) }

for(const id of cal.lessonQueue||[]) if(!setIds.has(id)) warn(`calendar.json lessonQueue: unknown set ${id}`);
for(const sp of cal.currentSpells||[]) if(!spells.has(sp)) warn(`calendar.json: unknown current spell ${sp}`);
for(const d of Object.keys(cal.holidays||{})) if(!/^\d{4}-\d\d-\d\d$/.test(d)) warn(`calendar.json: bad date ${d}`);

/* letters with replies (24 Nov 2026, queue 2): each reply needs text; a qid must name a real question (sets, twins, challenges) */
{ const ids=new Set();
  for(const f of files){ const st=J("content/sets/"+f); [...(st.warm||[]),...(st.practice||[]),...(st.challenge?[st.challenge]:[])].forEach(q=>ids.add(q.id)) }
  Object.values(J("content/variants.json").variants||{}).forEach(vs=>vs.forEach(v=>ids.add(v.id)));
  ((J("content/challenges.json")||{}).items||[]).forEach(q=>ids.add(q.id));
  for(const L of J("content/letters.json").letters||[]){
    if(L.replies!==undefined&&!Array.isArray(L.replies)) warn(`letters.json ${L.id}: replies must be a list`);
    (L.replies||[]).forEach((r,k)=>{ const w=`letters.json ${L.id} reply ${k+1}`;
      if(!r||!String(r.text||"").trim()) warn(`${w}: needs text`);
      if(r.qid&&!ids.has(r.qid)) warn(`${w}: unknown qid ${r.qid} (the app would fall back to plain text)`);
      if(!r.qid&&!r.ask) warn(`${w}: needs a qid or the ask it answers`) }) } }

/* ---- 2. play every set in the browser, answering correctly ---- */
(async()=>{
  if(errs.length){ console.log("CONTENT PROBLEMS:\n- "+errs.join("\n- ")); process.exit(1) }
  const {chromium}=require("playwright");
  const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:390,height:844}});
  const pageErr=[]; pg.on("pageerror",e=>pageErr.push(e.message));
  const url="file://"+path.join(ROOT,"index.html");
  await pg.clock.install({time:new Date(Date.now()+86400000)});
  await pg.addInitScript(()=>{ try{ localStorage.setItem("fieldnote.studioTeaser2","true"); localStorage.setItem("fieldnote.callmeAsked","true"); localStorage.setItem("fieldnote.guestpop",JSON.stringify(["x"])); localStorage.setItem("fieldnote.quietSheets","true"); localStorage.setItem("fieldnote.waveSeen",JSON.stringify([1,2])) }catch(e){} window.__noTapGuard=true });
  await pg.goto(url);
  /* answer whatever session is open until it ends. wrong=true answers every question wrong (to test the paths after a miss) */
  async function play(wrong){ let ok=0, total=0;
    const pickWrong=async()=>pg.evaluate(()=>{ const q=S.steps[S.i].q; return q.opts.findIndex((_,k)=>k!==q.a) });
    for(let i=0;i<140;i++){
      if(await pg.locator("#sheet").count()){ await pg.evaluate(()=>closeSheet()); continue }   /* e.g. the level-1 gate's note (23 Nov) */
      if(await pg.locator("[data-hk]").count()){ await pg.locator("[data-hk]").first().click(); continue }
      if(await pg.locator("[data-tu]").count()&&!await pg.locator("[data-tu].picked").count()){ await pg.click('[data-tu="ok"]'); continue }   /* spoken-style card rating (24 Nov) */
      /* worksheet (24 Nov night): the current item is answered in place inside the page, nothing to open */
      if(await pg.locator("[data-pred]").count()){ await pg.click(`[data-pred="0"]`); continue }   /* the right prediction is written first */
      if(await pg.locator("#cnext").count()){ await pg.click("#cnext"); continue }
      if(await pg.locator("#save").count()){ if(await pg.locator('[data-r="พอดี"]').count()) await pg.click('[data-r="พอดี"]'); await pg.click("#save"); break }
      if(await pg.locator("[data-ck]").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.check.a); await pg.click(`[data-ck="${a}"]`); continue }
      if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue }
      if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=wrong?await pickWrong():await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator(".opt:not(.ckopt)").nth(k).click();
        if(await pg.locator("#whytext").count()) await pg.fill("#whytext","เพราะคิดตามสูตร");
        for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break }
        total++; if(await pg.locator(".feedback b.ok").count()) ok++; continue }
      if(await pg.locator("#numin:not([disabled])").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(wrong?a+1000:a));
        if(await pg.locator("#whytext").count()) await pg.fill("#whytext","เพราะคิดตามสูตร");
        if(await pg.locator("#check").count()) await pg.click("#check"); else for(const b of ["#send-unsure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break }
        total++; if(await pg.locator(".feedback b.ok").count()) ok++; continue }
      if(await pg.locator("#uncover").count()){ await pg.click("#uncover"); continue }
      if(await pg.locator("#readdone").count()){ await pg.click("#readdone"); continue }
      if(await pg.locator("#next").count()){ await pg.click("#next"); continue }
    }
    await pg.waitForTimeout(150); return {ok,total,done:await pg.evaluate(()=>view==="done")} }
  /* --since=YYYY-MM-DD plays only sets added on/after that date (content rules above still cover every set) */
  const since=(process.argv.find(x=>x.startsWith("--since="))||"").slice(8);
  const ids=await pg.evaluate(since=>SETS.filter(s=>s.kind!=="sweep"&&s.kind!=="checkpoint"&&(!since||(s.added||"")>=since)).map(s=>s.id),since);
  let n=0;
  const W2=await pg.evaluate(()=>JSON.stringify(CAL.understand||{}));
  for(const id of ids){
    /* every other set is played with this week's trial features on (confidence buttons + explain box); every third with wave 2 on */
    const k=n++, trial=k%2===0?["confidence","explain"]:[], w2=k%3===1;
    await pg.evaluate(([id,trial,w2,W2])=>{ localStorage.removeItem("fieldnote.inprogress"); CAL.trials={[isoDay(todayKey())]:trial}; CAL.understand={...JSON.parse(W2),...(w2?{wave2:"2000-01-01"}:{})}; introSet=SETS.find(s=>s.id===id); view="intro"; render() }, [id,trial,w2,W2]);
    await pg.click("#go");
    const r=await play(false);
    if(!r.done||r.ok!==r.total) warn(`${id}: played ${r.ok}/${r.total} correct, reached end: ${r.done}`);
    else console.log(`ok  ${id}  (${r.total} questions)`);
  }
  await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2); CAL.trials={} },W2);

  /* ---- 3. the understanding-first features (17 Nov 2026), on made-up test items that never reach content ---- */
  const T=async(name,f)=>{ try{ const m=await f(); if(m) warn(`${name}: ${m}`); else console.log(`ok  feature: ${name}`) }catch(e){ warn(`${name}: ${e.message.split("\n")[0]}`) } };
  const reset=async extra=>{ await pg.evaluate(extra=>{ attempts=extra||[]; lsWrite(attempts); localStorage.removeItem("fieldnote.inprogress"); localStorage.removeItem("fieldnote.cp"); S=null; LP=null; view="home"; render() },extra||[]);
    await pg.waitForTimeout(800); await pg.evaluate(()=>{ if(document.getElementById("sheet")) closeSheet() }) };
  const noToday=()=>pg.evaluate(()=>{ CAL.checkpoints=(CAL.checkpoints||[]).filter(c=>c.date!==isoDay(todayKey())) });
  const FX=await pg.evaluate(()=>{
    const mk=(id,lv,extra)=>({id,level:lv,topic:"ทดสอบ",ctx:"pure",q:"ข้อทดสอบ "+id,opts:["ถูก","ผิด ก","ผิด ข"],a:0,ex:"เฉลยทดสอบ ขั้นแรก แล้วขั้นต่อไป",hints:["คำใบ้ทดสอบ"],...extra});
    const set={id:"zz-test",kind:"lesson",subject:"คณิตศาสตร์",topic:"ชุดทดสอบระบบ",grade:"ม.2",mins:"5 นาที",spell:SETS.find(s=>s.kind==="lesson").spell,warm:[],
      concept:{title:"ทดสอบ",points:["จุดทดสอบ"],formulas:[],vocab:[],alts:[]},
      practice:[mk("zz1",1,{predict:{q:"มากขึ้นหรือน้อยลง",opts:["มากขึ้น","น้อยลง","เท่าเดิม"],a:0,ex:"ทดสอบ"}}),mk("zz2",2,{friend:{work:["บรรทัด 1","บรรทัด 2"]}}),mk("zz3",3,{check:{q:"ทำไม",opts:["เหตุผลถูก","เหตุผลผิด ก","เหตุผลผิด ข"],a:0,ex:"ทดสอบ"}})],hints:{}};
    set.practice.forEach(q=>QBANK[q.id]={q:{...q,spell:set.spell},set}); SETS.push(set);
    const cp={id:"zz-cp",kind:"checkpoint",subject:"ด่านประเมิน",topic:"ด่านทดสอบระบบ",grade:"ม.2",mins:"50 นาที",warm:[],concept:{title:"",points:[],formulas:[],vocab:[],alts:[]},
      practice:[mk("zc1",1,{spell:"m22"}),mk("zc2",2,{spell:"s4"}),mk("zc3",1,{spell:"m22",friend:{work:["ก","ข"]}}),{...mk("zc4",2,{spell:"s4"}),opts:["12 g","10 g","8 g"]}]};
    cp.practice.forEach(q=>QBANK[q.id]={q,set:cp}); SETS.push(cp);
    return {spell:set.spell} });

  await T("predict + friend + reason after a wrong answer (wave 2)",async()=>{ await reset();
    await pg.evaluate(()=>{ CAL.understand={...CAL.understand,wave2:"2000-01-01"}; startSet(SETS.find(s=>s.id==="zz-test"),false) });
    const r=await play(true); const rec=await pg.evaluate(()=>mine().find(a=>a.setId==="zz-test"));
    await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2) },W2);
    if(!r.done||!rec) return "did not finish";
    const it=id=>rec.items.find(x=>x.qid===id);
    if(!(it("zz1")&&it("zz1").predict!=null&&it("zz1").predictOk===true)) return "prediction not recorded";
    if(!(it("zz2")&&it("zz2").friend)) return "friend item not recorded";
    if(!(it("zz3")&&it("zz3").checkAfterWrong&&it("zz3").checkOk===true)) return "reason pick after a wrong answer not recorded";
    if(rec.items.some(x=>x.correct)) return "answered wrong but marked right";
    if(!rec.items.some(x=>x.explain)) return "wave 2 one-line reason not offered on any lesson question" });

  await T("repeated-error loop opens, reteaches, takes a guide and resolves",async()=>{
    const sub="m22.8", qs=await pg.evaluate(sub=>Object.values(QBANK).map(o=>o.q).filter(q=>q.check&&subOf(q.id)===sub&&!q.of).map(q=>q.id),sub);
    if(qs.length<2) return "need 2 check questions in "+sub;
    const day=n=>new Date(Date.now()+86400000-n*86400000).toISOString();
    const miss=(n,qid)=>({type:"set",setId:"x",topic:"x",startedAt:day(n),endedAt:day(n),durationSec:60,correct:0,total:1,items:[{qid,level:2,correct:false,errorType:"concept",errorTypes:["concept"]}]});
    await reset([miss(3,qs[0]),miss(5,qs[1])]);
    await pg.evaluate(sub=>{ RETEACH[sub]={title:"การ์ดทดสอบ",form:"contrast",text:["ย่อหน้าทดสอบ"],contrast:[{title:"กรณี ก",text:"ทดสอบ"},{title:"กรณี ข",text:"ทดสอบ"}],
      worked:[{q:"ตัวอย่าง 1",steps:["ขั้น 1","ขั้น 2","ขั้น 3"],answer:"ทดสอบ"},{q:"ตัวอย่าง 2",steps:["ขั้น 1","ขั้น 2",{t:"ขั้น 3",opts:["ขั้น 3","ขั้นผิด"]}]},{q:"ตัวอย่าง 3",steps:["ขั้น 1","ขั้น 2","ขั้น 3"]}]}; render() },sub);
    if(!await pg.locator("#loop-go").count()) return "loop card not on the home page";
    await pg.click("#loop-go");
    let dk=0; for(let i=0;i<40;i++){ if(await pg.locator("#sheet [data-sh]").count()) return "a tiny card (floor under 10 s) must never show the 'too fast' sheet"; if(await pg.locator("[data-dkt]").count()){ await pg.locator("[data-dkt]").first().click(); continue } if(await pg.locator("#dk-next").count()){ dk++; await pg.click("#dk-next"); continue }
      if(await pg.locator("#dk-done").count()){ await pg.click("#dk-done"); continue }
      if(await pg.locator("[data-tro]").count()){ await pg.locator("[data-tro]").first().click(); continue } if(await pg.locator("#tr-num").count()){ await pg.fill("#tr-num","1"); await pg.click("#tr-check"); continue }
      if(await pg.locator("#tr-next").count()){ await pg.click("#tr-next"); continue }
      if(await pg.locator("[data-lpo]").count()){ await pg.click('[data-lpo="0"]'); continue } if(await pg.locator("#lp-show").count()){ await pg.click("#lp-show"); continue }
      if(await pg.locator('[data-lps="1"]').count()){ await pg.click('[data-lps="1"]'); continue } if(await pg.locator("#lp-next").count()){ await pg.click("#lp-next"); continue } break }
    await pg.waitForTimeout(150);
    if(dk!==2) return `reteach card should show 2 screens (1 paragraph + the contrast) before the summary, showed ${dk}`;
    const tr=await pg.evaluate(sub=>({pool:tryPick(sub,2,[]).length,rec:mine().find(a=>a.type==="loop"&&a.act==="try")}),sub);
    if(tr.pool&&!(tr.rec&&tr.rec.tries.length===Math.min(2,tr.pool))) return "try-it questions after the reteach were not recorded";
    const st1=await pg.evaluate(sub=>{ const e=miscEps(mine()).find(x=>x.sub===sub); return e&&miscStage(e) },sub); if(st1!=="guide") return "after the reteach the stage is "+st1;
    /* the guide is offered from the next day; the evidence: 2 right answers with the right reason, different situations, 8 days apart */
    const re=await pg.evaluate(()=>mine().find(a=>a.type==="loop"&&a.act==="reteach")); re.endedAt=day(12); re.startedAt=day(12);
    const ok=(n,qid)=>({type:"set",setId:"x",topic:"x",startedAt:day(n),endedAt:day(n),durationSec:60,correct:1,total:1,items:[{qid,level:2,correct:true,checkOk:true,hints:0}]});
    await reset([miss(13,qs[0]),miss(15,qs[1]),re]);
    if(!await pg.locator("#loop-go").count()) return "guide card not offered the day after";
    await pg.click("#loop-go"); await pg.fill("#lp-guide","ต้องดูว่าโจทย์ถามอะไร แล้วระวังหน่วย"); await pg.dispatchEvent("#lp-guide","input"); await pg.click("#lp-save"); await pg.waitForTimeout(100);
    const g=await pg.evaluate(()=>mine().find(a=>a.type==="loop"&&a.act==="guide")); g.endedAt=day(11); g.startedAt=day(11);
    await reset([miss(13,qs[0]),miss(15,qs[1]),re,g,ok(10,qs[0]),ok(1,qs[1])]);
    const st2=await pg.evaluate(sub=>{ const e=miscEps(mine()).find(x=>x.sub===sub); return e&&miscStage(e) },sub); if(st2!=="resolved") return "with 2 right answers 9 days apart the stage is "+st2;
    await reset([miss(13,qs[0]),miss(15,qs[1]),re,g,ok(10,qs[0]),ok(8,qs[0])]);
    const st3=await pg.evaluate(sub=>{ const e=miscEps(mine()).find(x=>x.sub===sub); return e&&miscStage(e) },sub); if(st3==="resolved") return "the same situation twice must not resolve";
    await pg.evaluate(sub=>{ delete RETEACH[sub] },sub) });

  await T("สมุดคาถา: wrong answer → read in chunks → try 2 → back to the same question",async()=>{ await reset();
    const info=await pg.evaluate(()=>{ const o=Object.values(QBANK).find(o=>subOf(o.q.id)==="s3.3"&&o.set.kind==="lesson"&&!o.q.num&&!o.q.of&&!o.q.check&&!o.q.predict&&!o.q.friend);
      const set={...o.set,id:"zz-lib",warm:[],practice:[o.q],challenge:null}; SETS.push(set); startSet(set,false); const c=LIB["s3.3"];
      return {qid:o.q.id,screens:c?1+c.steps.length+(c.trap?1:0):0,taps:c?c.steps.filter(x=>x.tap).length+(c.whatTap?1:0)+(c.trapTap?1:0):0} });
    for(let i=0;i<15&&!await pg.locator("#go-lib-q").count();i++){
      if(await pg.locator("[data-hk]").count()){ await pg.locator("[data-hk]").first().click(); continue }
      if(await pg.locator("#cnext").count()){ await pg.click("#cnext"); continue }
      if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>{ const q=S.steps[S.i].q; return q.opts.findIndex((_,k)=>k!==q.a) }); await pg.locator(".opt:not(.ckopt)").nth(k).click();
        for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
      if(await pg.locator("#next").count()){ await pg.click("#next"); continue } }
    if(!await pg.locator("#go-lib-q").count()) return "no 'ไปอ่านเรื่องนี้' button after a wrong answer";
    await pg.click("#go-lib-q");
    /* 24 Nov night: a re-read opens as a "book" page (all sections, headings to jump to), not a deck of screens */
    const secs=await pg.locator(".bksec").count(); if(secs!==info.screens) return `card s3.3 should show ${info.screens} sections, showed ${secs}`;
    if(info.screens>=3&&!await pg.locator("[data-bk]").count()) return "no list of headings to jump to";
    if(await pg.locator("#dk-next").count()) return "the library still steps screen by screen";
    await pg.evaluate(()=>{ LB.act0=actNow()-30000 });
    if(!await pg.locator("#lb-try").count()) return "no optional try-it button under the book page";
    await pg.click("#lb-try");
    for(let i=0;i<6;i++){ if(await pg.locator("[data-tro]").count()){ await pg.locator("[data-tro]").first().click(); continue } if(await pg.locator("#tr-num").count()){ await pg.fill("#tr-num","1"); await pg.click("#tr-check"); continue }
      if(await pg.locator("#tr-next").count()){ await pg.click("#tr-next"); continue } break }
    const rec=await pg.evaluate(()=>mine().find(a=>a.type==="lib"));
    if(!rec||!rec.read||!rec.book||rec.tries.length!==2||rec.from!==info.qid) return "lib record wrong: "+JSON.stringify(rec&&{read:rec.read,book:rec.book,tries:rec.tries,from:rec.from});
    if(rec.tries.some(t=>t.qid===info.qid)) return "the question she just missed came back as a try question";
    if(rec.fast!==false) return "a book re-read must never be flagged too fast";
    if(rec.xp!==10+rec.tries.reduce((s,x)=>s+(x.ok?10:5),0)) return "first reading of the day: 10 XP + try-it XP, got "+rec.xp;
    await pg.click("#lb-back2");
    if(!await pg.evaluate(qid=>view==="session"&&S.steps[S.i].q&&S.steps[S.i].q.id===qid&&!!S.answered,info.qid)) return "did not come back to the same answered question";
    await play(false);
    const it=await pg.evaluate(qid=>((mine().find(a=>a.setId==="zz-lib")||{}).items||[]).find(x=>x.qid===qid),info.qid);
    if(!(it&&it.lib===1&&it.correct===false)) return "the library visit is not recorded on the item: "+JSON.stringify(it);
    await reset(); if(!await pg.locator("#go-lib").count()) return "no สมุดคาถา entry on the home page";
    await pg.click("#go-lib"); await pg.fill("#lb-q","rf");
    const vis=await pg.evaluate(()=>[...document.querySelectorAll("[data-lbs]")].filter(b=>!b.hidden&&!b.closest("[hidden]")).map(b=>b.dataset.lbs));
    if(!vis.includes("s3.3")||vis.length>3) return "search 'rf' shows: "+vis.join(",");
    await pg.locator('[data-lbs="s3.3"]').first().click(); if(!await pg.locator(".bksec").count()) return "card did not open from the list";
    await pg.click("#lb-back"); if(!await pg.locator("#lb-q").count()) return "back from a card did not return to the list";
    await pg.evaluate(()=>{ SETS.splice(SETS.findIndex(s=>s.id==="zz-lib"),1); LB=null }) });

  await T("minimum day counts as a full day",async()=>{
    const day=n=>new Date(Date.now()+86400000-n*86400000).toISOString(), q=await pg.evaluate(()=>SETS.find(s=>s.kind==="lesson").practice.slice(0,4).map(x=>x.id));
    await reset([{type:"set",setId:"x",topic:"x",startedAt:day(1),endedAt:day(1),durationSec:600,correct:2,total:4,items:q.map((id,i)=>({qid:id,level:1,correct:i%2===0,errorType:i%2?"concept":null}))}]);
    if(!await pg.locator("#dm-min").count()) return "no minimum-day button";
    await pg.click("#dm-min"); await pg.locator("[data-rs]").first().click(); await pg.click("#dm-minsave"); await pg.waitForTimeout(100);
    if(!await pg.locator("#mini-go").count()) return "no minimum-day mission";
    await pg.click("#mini-go"); const r=await play(false); if(!r.done) return "mini set did not finish";
    const met=await pg.evaluate(()=>progressOf(mine()).goalToday); if(!met) return "the day is not counted as met" });

  await T("checkpoint mode (timed, skip, no hints, review at the end)",async()=>{ await noToday(); await reset();
    await pg.evaluate(()=>{ CAL.checkpoints=[...(CAL.checkpoints||[]),{date:isoDay(todayKey()),kind:"short",setId:"zz-cp",mins:50}]; render() });
    if(!await pg.locator("#cp-go").count()) return "no checkpoint mission today";
    await pg.click("#cp-go"); await pg.click("#cp-start");
    if(await pg.locator("#hint,#dontknow,#parts").count()) return "hints are visible in checkpoint mode";
    await pg.click("#cp-skip");
    for(let i=0;i<12&&await pg.evaluate(()=>S.mode==="cp"&&view==="session");i++){
      if(await pg.locator("#numin").count()){ const a=await pg.evaluate(()=>S.qs[S.cp.queue[0]].answer); await pg.fill("#numin",String(a)); await pg.dispatchEvent("#numin","input") }
      else { const k=await pg.evaluate(()=>S.qs[S.cp.queue[0]].a); await pg.locator(".opt").nth(k).click() }
      await pg.click("#send-plain") }
    await pg.waitForTimeout(150);
    const rec=await pg.evaluate(()=>mine().find(a=>a.type==="checkpoint"));
    if(!rec) return "no checkpoint record"; if(rec.correct!==4||rec.total!==4) return `scored ${rec.correct}/${rec.total}, expected 4/4`;
    if(!await pg.locator("details summary").filter({hasText:"ดูเฉลยทุกข้อ"}).count()) return "no review after the checkpoint";
    /* time-out path */
    await reset(); await pg.evaluate(()=>{ startCp(SETS.find(s=>s.id==="zz-cp"),{date:isoDay(todayKey()),kind:"short",mins:50},null); S.limit=1500 });
    await pg.clock.runFor(4000); await pg.waitForTimeout(300);
    const r2=await pg.evaluate(()=>mine().find(a=>a.type==="checkpoint"));
    if(!(r2&&r2.timedOut&&r2.items.every(x=>x.timeout))) return "time-out did not finish the checkpoint";
    await pg.evaluate(W2=>{ CAL.checkpoints=CAL.checkpoints.filter(c=>c.setId!=="zz-cp") },W2) });

  await T("too-fast reteach card is flagged and does not move the loop on",async()=>{
    const sub="m22.8", qs=await pg.evaluate(sub=>Object.values(QBANK).map(o=>o.q).filter(q=>q.check&&subOf(q.id)===sub&&!q.of).map(q=>q.id),sub);
    const day=n=>new Date(Date.now()+86400000-n*86400000).toISOString();
    const miss=(n,qid)=>({type:"set",setId:"x",topic:"x",startedAt:day(n),endedAt:day(n),durationSec:60,correct:0,total:1,items:[{qid,level:2,correct:false,errorType:"concept",errorTypes:["concept"]}]});
    await reset([miss(3,qs[0]),miss(5,qs[1])]);
    const long="ย่อหน้ายาวสำหรับทดสอบการอ่าน ".repeat(12);
    await pg.evaluate(([sub,long])=>{ RETEACH[sub]={title:"การ์ดยาวทดสอบ",form:"table",text:[long,long,long],worked:[{q:"ตัวอย่าง 1",steps:["ขั้น 1","ขั้น 2"]},{q:"ตัวอย่าง 2",steps:["ขั้น 1","ขั้น 2"]},{q:"ตัวอย่าง 3",steps:["ขั้น 1","ขั้น 2"]}]}; render() },[sub,long]);
    await pg.click("#loop-go"); let warned=0;
    for(let i=0;i<40;i++){ if(await pg.locator("#sheet [data-sh]").count()){ warned++; await pg.click('#sheet [data-sh="1"]'); continue }
      if(await pg.locator("[data-dkt]").count()){ await pg.locator("[data-dkt]").first().click(); continue } if(await pg.locator("#dk-next").count()){ await pg.click("#dk-next"); continue }
      if(await pg.locator("#dk-done").count()){ await pg.click("#dk-done"); continue }
      if(await pg.locator("[data-tro]").count()){ await pg.locator("[data-tro]").first().click(); continue } if(await pg.locator("#tr-num").count()){ await pg.fill("#tr-num","1"); await pg.click("#tr-check"); continue }
      if(await pg.locator("#tr-next").count()){ await pg.click("#tr-next"); continue }
      if(await pg.locator("[data-lpo]").count()){ await pg.click('[data-lpo="0"]'); continue } if(await pg.locator("#lp-show").count()){ await pg.click("#lp-show"); continue }
      if(await pg.locator('[data-lps="1"]').count()){ await pg.click('[data-lps="1"]'); continue } if(await pg.locator("#lp-next").count()){ await pg.click("#lp-next"); continue } break }
    if(warned!==1) return "the 'too fast' sheet should show once, showed "+warned;
    const rec=await pg.evaluate(()=>mine().find(a=>a.type==="loop"&&a.act==="reteach"));
    if(!(rec&&rec.fast===true&&rec.xp===0&&rec.cardFloor>=10)) return "fast reteach record wrong: "+JSON.stringify(rec&&{fast:rec.fast,xp:rec.xp,cardSec:rec.cardSec,cardFloor:rec.cardFloor});
    const st=await pg.evaluate(sub=>{ const e=miscEps(mine()).find(x=>x.sub===sub); return e&&{stage:miscStage(e),fast:(e.fastReads||[]).length} },sub);
    if(!(st&&st.stage==="reteach"&&st.fast===1)) return "a fast reteach must leave the stage at reteach: "+JSON.stringify(st);
    /* read at a real pace → counted; an old record (no timing fields) is judged on its whole duration */
    const slow={...rec,fast:false,cardSec:200,durationSec:300,xp:20};
    await reset([miss(3,qs[0]),miss(5,qs[1]),slow]);
    if(await pg.evaluate(sub=>miscStage(miscEps(mine()).find(x=>x.sub===sub)),sub)!=="guide") return "a reteach read at a real pace did not count";
    const old={type:"loop",act:"reteach",sub,setId:"loop-"+sub,topic:"x",startedAt:day(1),endedAt:day(1),durationSec:6,correct:0,total:0,xp:20,items:[]};
    await reset([miss(3,qs[0]),miss(5,qs[1]),old]);
    if(await pg.evaluate(sub=>miscStage(miscEps(mine()).find(x=>x.sub===sub)),sub)!=="reteach") return "an old 6-second reteach record still counted";
    await pg.evaluate(sub=>{ delete RETEACH[sub] },sub) });

  await T("compute vs meaning pairs (ใช้สูตรได้แต่ไม่เข้าใจ)",async()=>{
    const P=await pg.evaluate(()=>{ const bySub={}; Object.values(QBANK).forEach(({q,set})=>{ if(q.of||set.kind==="checkpoint") return; const s=subOf(q.id); if(!s) return; const o=bySub[s]??={c:[],m:[],h:[]}; (q.ask==="meaning"?o.m:q.ask==="method"?o.h:o.c).push(q.id) });
      const s=Object.keys(bySub).find(k=>bySub[k].m.length&&bySub[k].c.length>=3); return s?{s,...bySub[s]}:null });
    if(!P) return "no subtopic with a meaning item and 3 compute items";
    const day=n=>new Date(Date.now()+86400000-n*86400000).toISOString();
    const rec=(n,items)=>({type:"set",setId:"x",topic:"x",startedAt:day(n),endedAt:day(n),durationSec:60,correct:0,total:items.length,items});
    const list=[rec(3,P.c.slice(0,3).map(qid=>({qid,level:2,correct:true}))),rec(2,[{qid:P.m[0],level:2,correct:false}]),rec(1,[{qid:"r:"+P.c[0],level:2,correct:true,guessed:true}])];
    const v=await pg.evaluate(([list,s])=>{ const r=meaningPairs(list).find(x=>x.sub===s); return r&&{v:r.v,c:r.c,m:r.m} },[list,P.s]);
    if(!(v&&v.v==="gap"&&v.c.n===4&&v.c.ok===3&&v.m.n===1&&v.m.ok===0)) return "expected the gap flag (compute 3/4, meaning 0/1): "+JSON.stringify(v);
    list.push(rec(0,[{qid:P.m[0],level:2,correct:true},{qid:P.m[0],level:2,correct:true}]));
    const v2=await pg.evaluate(([list,s])=>meaningPairs(list).find(x=>x.sub===s).v,[list,P.s]);
    if(v2!=="ok") return "after 2 of 3 meaning answers right the flag should clear, got "+v2 });

  await T("hidden options: a fast uncover does not clear the mistake",async()=>{ await noToday();
    /* a text-option question without twins, so the review serves it with options hidden */
    const qid=await pg.evaluate(()=>Object.values(QBANK).map(o=>o.q).find(q=>!q.of&&!(VARIANTS[q.id]||[]).length&&q.opts&&!numify(q)&&QBANK[q.id].set.kind==="lesson")?.id);
    if(!qid) return "no text-option question without twins";
    const day=n=>new Date(Date.now()+86400000-n*86400000).toISOString();
    const miss={type:"set",setId:"x",topic:"x",startedAt:day(3),endedAt:day(3),durationSec:60,correct:0,total:1,items:[{qid,level:2,correct:false}]};
    const one=async wait=>{ await reset([miss]); await pg.evaluate(()=>startReview(1)); await pg.waitForTimeout(200);
      if(!await pg.locator("#uncover").count()) return "the review did not hide the options";
      if(wait) await pg.clock.runFor(wait*1000);
      await pg.click("#uncover"); await pg.waitForTimeout(100);
      const note=await pg.locator("p.small",{hasText:"เปิดตัวเลือกเร็วไปนิด"}).count();
      const r=await play(false); const rec=await pg.evaluate(()=>mine().filter(a=>a.type==="review").pop());
      const it=rec&&rec.items.find(x=>x.qid===qid);
      const inPool=await pg.evaluate(qid=>reviewPool(mine()).some(q=>q.id===qid),qid);
      return {note,it,inPool,ok:r.ok} };
    const f=await one(0); if(typeof f==="string") return f;
    if(!f.it||!f.it.cover||f.it.coverFloor<10) return "the record lacks cover/coverFloor: "+JSON.stringify(f.it);
    if(!f.note) return "no note after a fast uncover";
    if(!f.inPool) return "a right answer after a fast uncover cleared the mistake";
    const fl=f.it.coverFloor, sl=await one(fl+1); if(typeof sl==="string") return sl;
    if(sl.note) return "the fast note showed after waiting "+(fl+1)+" s";
    if(sl.inPool) return "a right answer after thinking "+(fl+1)+" s did not clear the mistake" });

  await T("home renders on special days and wave intros",async()=>{ await noToday(); await reset();
    await pg.evaluate(()=>{ localStorage.removeItem("fieldnote.waveSeen"); CAL.checkpoints=[...(CAL.checkpoints||[]),{date:isoDay(todayKey()),kind:"full",subject:"คณิต"}]; render() });
    await pg.waitForTimeout(900);
    if(!await pg.evaluate(()=>!!document.getElementById("sheet"))) return "wave intro sheet did not open";
    await pg.evaluate(()=>closeSheet());
    if(!await pg.locator("#paper-go").count()) return "no paper mission on a full-checkpoint day";
    await pg.click("#paper-go"); await pg.click("#paper-go"); await pg.waitForTimeout(100);
    if(!await pg.evaluate(()=>progressOf(mine()).paperToday)) return "paper day not recorded";
    await noToday(); await pg.evaluate(()=>localStorage.setItem("fieldnote.waveSeen","[1,2]")) });

  /* 19 Nov 2026 day rules: sweep locked until the other missions are done, size follows the time gap, daily mistake review */
  await T("sweep lock + adaptive size + daily review mission",async()=>{ await noToday();
    const old=await pg.evaluate(()=>new Date(Date.now()-3*86400000).toISOString());
    const L=await pg.evaluate(()=>SETS.find(s=>s.kind==="lesson"&&s.practice.length>=6).practice.slice(0,6).map(q=>q.id));
    const les=await pg.evaluate(()=>pickLesson(mine(),true).id);
    await reset([{type:"set",setId:"zz-old",startedAt:old,endedAt:old,durationSec:600,correct:0,total:6,xp:5,items:L.map(id=>({qid:id,correct:false,level:1,timeSec:20}))}]);
    const st=await pg.evaluate(()=>{ const p=progressOf(mine()); return {keys:missionList(p).map(x=>x.key),locked:sweepLocked(p),repair:repairToday(mine(),p.info)} });
    if(!st.keys.includes("sweep")) return "no sweep mission";
    if(!st.locked) return "sweep is not locked before the other missions";
    if(!st.repair&&!st.keys.includes("review")) return "no daily review mission with 6 mistakes in the pool";
    if(await pg.locator("#sweep-go").count()) return "locked sweep still shows its start button";
    await pg.evaluate(()=>startSweep()); if(await pg.evaluate(()=>view)==="session") return "startSweep ran while locked";
    await pg.evaluate(()=>{ if(document.getElementById("sheet")) closeSheet() });
    await pg.evaluate(([les])=>{ const now=new Date(Date.now()-60000).toISOString(); attempts.push({type:"set",setId:les,startedAt:now,endedAt:now,durationSec:720,correct:1,total:1,xp:10,items:[]},{type:"vocab",setId:"vocab",startedAt:now,endedAt:now,durationSec:300,correct:1,total:1,xp:10,items:[]},
      {type:"review",setId:"review",topic:"ทบทวน",startedAt:now,endedAt:now,durationSec:200,correct:1,total:1,xp:5,items:[]},{type:"probe",setId:"zz-probe",startedAt:now,endedAt:now,durationSec:300,correct:1,total:1,xp:5,items:[]}); view="home"; render() },[les]);
    const s2=await pg.evaluate(()=>{ const p=progressOf(mine()), sp=sweepPlan(p,mine()); return {locked:sweepLocked(p),sp} });
    if(s2.locked) return "sweep still locked after every other mission: "+JSON.stringify(await pg.evaluate(()=>missionList(progressOf(mine()))));
    if(!(s2.sp.size>s2.sp.base)&&!s2.sp.fixed) return `sweep did not grow on a short day (${JSON.stringify(s2.sp)})`;   /* December: fixed size by design */
    if(!await pg.locator("#sweep-go").count()) return "no sweep button after unlock";
    /* the review is required for the flame by itself (also on a day the sweep bank is empty) */
    const g=await pg.evaluate(()=>{ const now=new Date(Date.now()-30000).toISOString(); attempts.push({type:"sweep",setId:"sweep",startedAt:now,endedAt:now,durationSec:60,correct:1,total:1,xp:5,items:[]});
      const withR=progressOf(mine()).goalToday; const keep=attempts; attempts=attempts.filter(a=>a.type!=="review"); const p=progressOf(mine()), without=p.goalToday, rep=repairToday(mine(),p.info); attempts=keep; return {withR,without,rep} });
    if(!g.withR) return "full day with review is not met";
    if(!g.rep&&g.without) return "flame lit without the daily review";
    await reset() });

  /* 22 Nov 2026: a half-done review-type session (sweep / daily review / repair / recall / mini) survives a reload and is resumed, not restarted */
  await T("review-mode session survives a reload (22 Nov)",async()=>{ await noToday();
    const old=await pg.evaluate(()=>new Date(Date.now()-3*86400000).toISOString());
    const L=await pg.evaluate(()=>SETS.find(s=>s.kind==="lesson"&&s.practice.length>=6).practice.slice(0,6).map(q=>q.id));
    await reset([{type:"set",setId:"zz-old",startedAt:old,endedAt:old,durationSec:600,correct:0,total:6,xp:5,items:L.map(id=>({qid:id,correct:false,level:1,timeSec:20}))}]);
    await pg.evaluate(()=>startReview(5,"ทบทวนข้อที่เคยพลาด",{daily:true}));
    const n0=await pg.evaluate(()=>S&&S.steps?S.steps.length:0); if(n0<4) return "could not start a review session ("+n0+" steps)";
    const answerOne=async()=>{ const have=await pg.evaluate(()=>S.items.length);
      for(let i=0;i<30;i++){ if(await pg.evaluate(()=>S.items.length)>have) return;
        if(await pg.locator("[data-pred]").count()){ await pg.click('[data-pred="0"]'); continue }
        if(await pg.locator("[data-ck]").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.check?S.steps[S.i].q.check.a:0); await pg.click(`[data-ck="${a}"]`); continue }
        if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue }
        if(await pg.locator("#next").count()){ await pg.click("#next"); await pg.waitForTimeout(80); continue }
        if(await pg.locator("#numin:not([disabled])").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(a));
          if(await pg.locator("#check").count()) await pg.click("#check"); else for(const b of ["#send-unsure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
        if(await pg.locator("#uncover").count()){ await pg.click("#uncover"); continue }
        if(await pg.locator("#readdone").count()){ await pg.click("#readdone"); continue }
        if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator(".opt:not(.ckopt)").nth(k).click();
          for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
        await pg.waitForTimeout(60) } };
    await answerOne(); await answerOne();
    const before=await pg.evaluate(()=>({i:S.i,n:S.items.length,len:S.steps.length}));
    if(before.n<2) return "could not answer 2 items before the reload";
    if(!await pg.evaluate(()=>!!localStorage.getItem("fieldnote.inprogress.rv.repair")||!!localStorage.getItem("fieldnote.inprogress.rv.review"))) return "nothing was saved for the review session";
    /* reload: in-memory state gone, localStorage stays */
    await pg.evaluate(()=>{ S=null; LP=null; view="home"; render() }); await pg.waitForTimeout(300);
    if(!await pg.locator("[data-rvgo]").count()) return "home shows no 'ทำต่อ' card for the unfinished review";
    await pg.locator("[data-rvgo]").first().click(); await pg.waitForTimeout(200);
    const after=await pg.evaluate(()=>({i:S.i,n:S.items.length,len:S.steps.length,mode:S.mode,view,active:S.active,gap:Date.now()-S.start}));
    if(after.mode!=="review"||after.view!=="session"||after.n!==before.n||after.i!==before.i||after.len!==before.len) return "resume did not restore the session: "+JSON.stringify({before,after});
    if(after.gap>600000) return "the clock counted the time she was away";
    /* finishing clears the saved copy */
    for(let g=0;g<12&&await pg.evaluate(()=>S.active&&S.steps[S.i]&&S.steps[S.i].kind==="q");g++) await answerOne();
    for(let g=0;g<30&&await pg.evaluate(()=>S&&S.active);g++){ for(const sel of ["#save","#finish","#next"]) if(await pg.locator(sel).count()){ await pg.locator(sel).first().click(); break } await pg.waitForTimeout(150) }
    await pg.waitForTimeout(500);
    if(await pg.evaluate(()=>RV_KINDS.some(k=>localStorage.getItem("fieldnote.inprogress.rv."+k)))) return "saved copy was not cleared after finishing";
    await reset() });

  /* 22 Nov 2026: "my way of thinking matches none of the reasons": she can write her own, before the explanation shows */
  await T("reason check: own reason option (checkNone / checkOwn) after a right answer only",async()=>{ await reset();
    await pg.evaluate(()=>{ CAL.understand={...CAL.understand,wave2:"2000-01-01"}; startSet(SETS.find(s=>s.id==="zz-test"),false) });
    let got=false;
    for(let i=0;i<40&&!got;i++){
      if(await pg.locator("[data-ckown]").count()){ got=true; break }
      if(await pg.locator("[data-hk]").count()){ await pg.locator("[data-hk]").first().click(); continue }
      if(await pg.locator("[data-pred]").count()){ await pg.click('[data-pred="0"]'); continue }
      if(await pg.locator("#cnext").count()){ await pg.click("#cnext"); continue }
      if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue }
      if(await pg.locator("#next").count()){ await pg.click("#next"); continue }
      if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator("#ws-cur .opt:not(.ckopt), .card .opt:not(.ckopt)").nth(k).click();
        for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
      if(await pg.locator("#numin").count()){ await pg.evaluate(()=>{ const q=S.steps[S.i].q; answer({raw:String(q.answer),correct:true}) }); continue }
      await pg.waitForTimeout(60) }
    if(!got){ await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2) },W2); return "no 'write my own reason' button shown after a right answer" }
    /* 24 Nov night (her feedback): after a WRONG answer the own-reason button is gone (it repeated "พลาดเพราะอะไร → อื่นๆ") */
    const onWrong=await pg.evaluate(()=>{ const keep=S.answered, q=S.steps[S.i].q; S.answered={choice:(q.a+1)%q.opts.length,correct:false,at:Date.now()}; S.checkPick=null; S.checkDone=false; renderStep();
      const r=!!document.querySelector("[data-ckown]")&&!!document.querySelector("[data-ck]"); S.answered=keep; S.checkPick=null; S.checkDone=false; renderStep(); return r });
    if(onWrong){ await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2) },W2); return "the own-reason button still shows after a wrong answer" }
    await pg.click("[data-ckown]");
    if(!await pg.locator("#ckown").count()){ await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2) },W2); return "own-reason box did not open" }
    if(await pg.locator("[data-ck]").count()){ await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2) },W2); return "the options are still shown next to the own-reason box" }
    await pg.fill("#ckown","ฉันนับจากรูปเอง"); await pg.click("#ckown-send");
    for(let i=0;i<8;i++){ if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue } break }
    await pg.click("#next"); await pg.waitForTimeout(100);
    const it=await pg.evaluate(()=>S.items[S.items.length-1]); await pg.evaluate(W2=>{ CAL.understand=JSON.parse(W2) },W2);
    if(!(it&&it.checkNone===true&&it.checkOwn==="ฉันนับจากรูปเอง")) return "own reason not recorded: "+JSON.stringify(it&&{checkNone:it.checkNone,checkOwn:it.checkOwn});
    if(it.checkOk!==undefined) return "an own reason must not be scored as a wrong or right option (checkOk set)";
    await reset() });

  /* 24 Nov 2026 (father, after her feedback): spoken-style card with tap-to-mark and rating, and the worksheet page */
  await T("spoken-style card: tap a confusing line, rate, compare with the old card (24 Nov)",async()=>{ await noToday(); await reset();
    const id=await pg.evaluate(()=>{ const s=SETS.find(s=>s.kind==="lesson"&&s.concept&&s.concept.talk&&s.concept.talk.length); if(!s) return null; startSet(s,true); return s.id });
    if(!id) return "no lesson with concept.talk";
    for(let k=0;k<30&&!await pg.locator("[data-tl]").count();k++){ if(await pg.locator("#sheet").count()){ await pg.evaluate(()=>closeSheet()); continue } if(await pg.locator("[data-hk]").count()){ await pg.locator("[data-hk]").first().click(); continue } if(await pg.locator("#cnext").count()) await pg.click("#cnext"); else break }
    if(!await pg.locator("[data-tl]").count()) return "the talk screens did not show tappable lines";
    await pg.locator("[data-tl]").nth(1).click(); if(!await pg.locator(".tmark").count()) return "tapping a line does not mark it";
    await pg.locator("[data-tl]").nth(1).click(); if(await pg.locator(".tmark").count()) return "tapping again does not unmark it";
    await pg.locator("[data-tl]").nth(0).click();
    for(let k=0;k<20&&!await pg.locator("[data-tu]").count();k++) await pg.click("#cnext");
    if(!await pg.locator("#cnext[disabled]").count()) return "the rating screen must wait for a rating";
    await pg.click('[data-tu="part"]'); await pg.click("#topen"); if(!await pg.locator("#sheet li").count()) return "the old card does not open"; await pg.evaluate(()=>{ closeSheet(); renderTalk() });
    await pg.click('[data-tc="new"]'); await pg.fill("#tnote","ตอนที่ 2 งง"); await pg.click("#cnext");
    if(!await pg.locator("#next").count()) return "no last screen with formulas";
    const T2=await pg.evaluate(()=>S.talk);
    if(!(T2.marks.length===1&&T2.marks[0].s===0&&T2.marks[0].l===0&&T2.u==="part"&&T2.cmp==="new"&&T2.oldOpen===1&&T2.note==="ตอนที่ 2 งง")) return "talk record wrong: "+JSON.stringify(T2);
    const r=await pg.evaluate(()=>{ saveProgress(); const t=JSON.stringify(S.talk); S=null; resumeSet(); return JSON.stringify(S.talk)===t });
    if(!r) return "resume lost the talk record";
    await pg.click("#next"); for(let k=0;k<12&&!await pg.evaluate(()=>canPeek(S.steps[S.i]));k++) await pg.evaluate(()=>{ S.answered={at:Date.now()}; advance() });
    await pg.evaluate(()=>{ S.wsOpen=false; S.wsSeen=true; render() });
    if(await pg.locator("#peek").count()){ await pg.click("#peek"); if(!await pg.locator("#sheet .bksec").count()) return "📖 peek must show the spoken-style card as a book page";
      const hs=await pg.evaluate(()=>[...document.querySelectorAll("#sheet .bksec h3")].map(h=>h.textContent)); if(hs.length<3||!hs.every(h=>h.trim().length>1)) return "book sections need headings: "+hs.join(" | ");
      if(!await pg.locator("#sheet [data-bk]").count()) return "no headings to jump to in the 📖 book"; await pg.evaluate(()=>closeSheet()) }
  });
  await T("worksheet page: every item on one page, answer in place, fixed order, level 2 locked until the gate (24 Nov night)",async()=>{ await noToday(); await reset();
    const id=await pg.evaluate(()=>{ const s=SETS.find(s=>s.kind==="lesson"&&gateEligible(s)&&s.practice.some(q=>q.level===2)); if(!s) return null; startSet(s,false); return s.id });
    if(!id) return "no gate-eligible lesson";
    await pg.evaluate(()=>{ const i=S.steps.findIndex(x=>x.kind==="q"&&x.phase==="ฝึกทำ"); S.i=i; view="session"; render() });
    if(!await pg.locator("#ws-cur").count()) return "the current item is not shown inside the page";
    const order=()=>pg.evaluate(()=>[...document.querySelectorAll(".wsno2")].map(e=>parseInt(e.textContent.replace(/\D+/,""))));
    const o1=await order(); if(o1.length<4) return "the page does not list the items: "+o1.join(",");
    if(o1.some((n,k)=>k&&n<o1[k-1])) return "items are not in their own order: "+o1.join(",");
    const prev=await pg.locator("[data-wsq]").count(); if(!prev) return "no other items to pick on the page";
    const lv=await pg.evaluate(()=>[...document.querySelectorAll("[data-wsq]")].map(c=>QBANK[c.dataset.wsq].q.level||1)); if(lv.some(l=>l>1)) return "level 2 must be locked before the gate: "+lv.join("");
    if(await pg.locator(".wsprev .opt").count()) return "read-only items must not have answer buttons";
    const want=await pg.evaluate(()=>document.querySelectorAll("[data-wsq]")[2].dataset.wsq), cur0=await pg.evaluate(()=>S.steps[S.i].q.id);
    await pg.locator(`[data-wsq="${want}"]`).click();
    if(await pg.evaluate(()=>S.steps[S.i].q.id)!==want) return "tapping an item did not make it the current one";
    if(JSON.stringify(await order())!==JSON.stringify(o1)) return "the page order moved after picking an item";
    const sk=await pg.evaluate(()=>S.ws); if(!(sk&&sk.skips.includes(cur0))) return "leaving an unanswered item was not recorded as a skip";
    /* answer in place: the page stays, the item shows its result, the next item becomes current */
    await pg.evaluate(()=>{ const q=S.steps[S.i].q; answer(q.num?{raw:String(q.answer),correct:true}:{choice:q.a,correct:true}); S.checkDone=true; renderStep() });
    for(let k=0;k<6&&!await pg.locator("#next").count();k++){ if(await pg.locator("[data-ck]").count()) await pg.locator("[data-ck]").first().click(); else break }
    if(!await pg.locator(".wsprev").count()) return "the page disappeared while answering";
    await pg.click("#next");
    if(!await pg.locator(".wsdone").count()) return "a done item does not stay on the page with its result";
    if(JSON.stringify(await order())!==JSON.stringify(o1)) return "the page order moved after answering";
    if(await pg.evaluate(w=>S.steps[S.i].q&&S.steps[S.i].q.id===w,want)) return "the next item did not become current";
    const before=await pg.evaluate(()=>({ids:S.steps.map(x=>x.q?x.q.id:x.kind).join(),opts:S.steps.map(x=>x.q?JSON.stringify(x.q.opts||null):"").join("|"),i:S.i}));
    const after=await pg.evaluate(()=>{ saveProgress(); S=null; resumeSet(); return {ids:S.steps.map(x=>x.q?x.q.id:x.kind).join(),opts:S.steps.map(x=>x.q?JSON.stringify(x.q.opts||null):"").join("|"),i:S.i} });
    if(after.ids!==before.ids||after.i!==before.i) return "resume lost the worksheet order";
    if(after.opts!==before.opts) return "resume changed the option order after a worksheet pick";
  });
  /* 23 Nov 2026 (queue 2, father agreed A+B): level-1 gate, day-1 level-2 quota, carried items, 📖 peek */
  await T("level-1 gate, carried items and the 📖 peek button (23 Nov)",async()=>{ await noToday(); await reset();
    const pick=await pg.evaluate(()=>{ const ok=SETS.filter(s=>s.kind==="lesson"&&s.concept&&s.concept.points&&s.practice.filter(q=>(q.level||1)===1).length===6&&s.practice.some(q=>q.level===3));
      const few=SETS.find(s=>s.kind==="lesson"&&s.practice.filter(q=>(q.level||1)===1).length<GATE.minL1); return {a:ok[0]&&ok[0].id,b:ok[1]&&ok[1].id,few:few&&few.id} });
    if(!pick.a||!pick.b) return "need two lessons with exactly 6 level-1 items and a level-3 item";
    if(await pg.evaluate(id=>{ startSet(SETS.find(s=>s.id===id),false); return !!S.gate },pick.few)) return "a lesson with fewer than "+6+" level-1 items must run without the gate";
    /* play the level-1 items with a given pattern of right/wrong, the way the "ต่อไป" button does */
    const play=(id,pattern)=>pg.evaluate(([id,pattern])=>{ startSet(SETS.find(s=>s.id===id),false);
      const P=S.steps.map((st,i)=>({st,i})).filter(o=>o.st.kind==="q"&&o.st.phase==="ฝึกทำ");
      const lv=P.map(o=>o.st.q.level||1); if(lv.some((l,k)=>k&&l<lv[k-1])) return {err:"practice is not served level 1 first: "+lv.join("")};
      let k=0; S.i=P[0].i;
      while(S.steps[S.i]&&S.steps[S.i].kind==="q"&&S.steps[S.i].phase==="ฝึกทำ"&&(S.steps[S.i].q.level||1)===1){ const q=S.steps[S.i].q;
        S.items.push({qid:q.id,level:q.level||1,phase:"ฝึกทำ",correct:!!pattern[k++]}); gateApply(); S.answered={at:Date.now()}; advance(); closeSheet() }
      const live=P.filter(o=>!o.st.gated).map(o=>o.st.q.level||1);
      return {gate:S.gate,n1:k,live,cur:S.steps[S.i]&&S.steps[S.i].phase,curLv:S.steps[S.i]&&S.steps[S.i].q&&S.steps[S.i].q.level,
        explain:S.steps.filter(x=>x.explain&&!x.gated).length,explainGated:S.steps.filter(x=>x.explain&&x.gated).length} },[id,pattern]);
    let r=await play(pick.a,[0,0,1,1,1,1]);
    if(r.err) return r.err;
    if(!(r.gate&&r.gate.done&&r.gate.passed&&r.gate.n1===6&&r.gate.why==="pass")) return "4 of the last 5 right after 6 items must pass: "+JSON.stringify(r.gate);
    if(r.live.filter(l=>l===2).length!==3||r.live.includes(3)) return "after passing, day 1 keeps exactly 3 level-2 items and no level 3: "+r.live.join("");
    if(r.curLv!==2) return "after the gate the next step must be level 2, got "+r.curLv;
    if(!r.gate.deferred.length) return "level-3 items must be carried to later days";
    if(r.explainGated&&!r.explain) return "the explain step was trimmed away without moving to a kept item";
    r=await play(pick.a,[0,0,0,1,1,1]);
    if(!(r.gate.done&&!r.gate.passed&&r.gate.why==="out"&&r.live.filter(l=>l===2).length===2)) return "3 of the last 5 must not pass; when level 1 runs out only 2 level-2 items stay: "+JSON.stringify({g:r.gate,live:r.live});
    /* resume after a reload keeps the trimming */
    const res=await pg.evaluate(()=>{ saveProgress(); const before={i:S.i,gated:S.steps.map(x=>!!x.gated).join(),gate:JSON.stringify(S.gate)}; S=null; resumeSet();
      return {same:S.i===before.i&&S.steps.map(x=>!!x.gated).join()===before.gated&&JSON.stringify(S.gate)===before.gate} });
    if(!res.same) return "resume lost the gate's trimming";
    /* 📖 peek: on the lesson's own practice item, opens the card, is recorded on the item; never on warm-up steps */
    await pg.evaluate(()=>{ S.answered=null; S.pick=null; S.wsSeen=true; S.wsOpen=false; view="session"; render() });
    if(!await pg.locator("#peek").count()) return "no 📖 button on a lesson practice item";
    await pg.click("#peek"); if(!await pg.locator("#sheet .formula, #sheet li").count()) return "the peek sheet does not show the lesson card";
    await pg.click('#sheet [data-sh="0"]');
    const n0=await pg.evaluate(()=>S.items.length);
    for(let i=0;i<20&&await pg.evaluate(n=>S.items.length===n,n0);i++){
      if(await pg.locator("[data-pred]").count()){ await pg.click('[data-pred="0"]'); continue }
      if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator(".opt:not(.ckopt)").nth(k).click(); for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
      if(await pg.locator("#numin:not([disabled])").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(a)); for(const b of ["#check","#send-unsure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
      if(await pg.locator("[data-ck]").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.check.a); await pg.click(`[data-ck="${a}"]`); continue }
      if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue }
      if(await pg.locator("#next").count()){ await pg.click("#next"); await pg.waitForTimeout(80); continue } break }
    const it=await pg.evaluate(()=>S.items[S.items.length-1]);
    if(!(it&&it.peek===1)) return "the peek was not recorded on the item: "+JSON.stringify(it&&{qid:it.qid,peek:it.peek});
    if(await pg.evaluate(()=>chkOk({correct:true,peek:1}))) return "a peeked answer must not count as checkpoint evidence (คงทน)";
    const warmBtn=await pg.evaluate(()=>{ const k=S.steps.findIndex(x=>x.kind==="q"&&x.phase!=="ฝึกทำ"); if(k<0) return null; S.i=k; S.answered=null; render(); return !!document.getElementById("peek") });
    if(warmBtn) return "the 📖 button must not show on warm-up / spaced steps";
    /* yesterday's deferred items come back, at most GATE.carry: before the December split as lesson warm-up, after it as their own mission */
    const ids=r.gate.deferred, y=await pg.evaluate(()=>new Date(Date.now()-86400000).toISOString());
    const yrec=[{type:"set",setId:pick.a,topic:"x",startedAt:y,endedAt:y,durationSec:600,correct:6,total:9,gate:{on:true,done:true,passed:true,n1:6,ok1:6,why:"pass",deferred:ids},items:[]}];
    await reset(yrec);
    const DECJ=await pg.evaluate(()=>JSON.stringify(DEC));
    const c=await pg.evaluate(id=>{ DEC.from="2099-01-01"; startSet(SETS.find(s=>s.id===id),false); return {carry:S.steps.filter(x=>x.carry).map(x=>x.q.id),due:S.dueIds.filter(d=>d.startsWith("g:"))} },pick.b);
    await pg.evaluate(j=>{ Object.assign(DEC,JSON.parse(j)) },DECJ);
    if(!c.carry.length||c.carry.length>6||c.carry.some(id=>!ids.includes(id))||c.due.length!==c.carry.length) return "carried items wrong (before the split): "+JSON.stringify(c);
    if(await pg.evaluate(()=>{ const k=S.steps.findIndex(x=>x.carry); S.i=k; S.answered=null; render(); return !!document.getElementById("peek") })) return "no 📖 peek on carried items";
    await reset() });

  /* 24 Nov 2026 (father's decisions ก, ง, จ; front-page queue 1): one job per mission, the December midterm sweep, the 📖 explanation button */
  await T("December: carried items are their own mission, lesson warm-up is its own, fixed midterm sweep, 📖 explanation (24 Nov)",async()=>{ await noToday(); await reset();
    const pick=await pg.evaluate(()=>{ const cur=new Set(CAL.currentSpells||[]);
      const a=SETS.find(s=>s.kind==="lesson"&&s.practice.filter(q=>(q.level||1)===1).length>=6&&s.practice.some(q=>q.level===3)&&cur.has(s.spell));
      const m=SETS.find(s=>s.kind==="lesson"&&cur.has(s.spell)&&s!==a&&s.practice.length>=8);
      const b=SETS.find(s=>s.kind==="lesson"&&s!==a&&s!==m&&s.warm&&s.warm.length);
      return {a:a&&a.id,m:m&&m.id,b:b&&b.id,def:a?a.practice.filter(q=>(q.level||1)>=2).slice(0,8).map(q=>q.id):[],seen:m?m.practice.slice(0,3).map(q=>q.id):[],today:isoDay(todayKey()),from:DEC.from} });
    if(!pick.a||!pick.m||!pick.b) return "need two midterm lessons and a lesson with warm items";
    if(pick.today<pick.from) return "the test clock is before DEC.from";
    const ago=n=>new Date(Date.now()-n*86400000).toISOString();
    const recs=[{type:"set",setId:pick.a,topic:"x",startedAt:ago(1),endedAt:ago(1),durationSec:600,correct:6,total:6,gate:{on:true,done:true,passed:true,n1:6,ok1:6,why:"pass",deferred:pick.def},items:[]},
      {type:"set",setId:pick.m,topic:"y",startedAt:ago(10),endedAt:ago(10),durationSec:600,correct:3,total:3,items:pick.seen.map(id=>({qid:id,level:1,correct:true}))}];
    await reset(recs);
    const ms=await pg.evaluate(()=>missionList(progressOf(mine())).map(x=>x.key));
    if(ms[0]!=="lesson"||ms[1]!=="carry") return "the carried-items mission must follow the lesson: "+ms.join(",");
    if(!await pg.locator("#carry-go").count()) return "no carried-items card on the home page";
    if(!await pg.locator("#m-sweep",{hasText:"ย้อนคาถา"}).count()) return "no sweep card";
    /* the lesson's warm-up is only its own warm items */
    const w=await pg.evaluate(id=>{ const s=SETS.find(x=>x.id===id); startSet(s,false); const q=S.steps.filter(x=>x.kind==="q"&&x.phase!=="ฝึกทำ"&&!x.optional); return {n:q.length,warm:s.warm.length,extra:q.filter(x=>x.carry||x.chk||x.due||x.retry||x.loop).length,dueIds:S.dueIds.length} },pick.b);
    if(w.extra||w.n!==w.warm||w.dueIds) return "the lesson warm-up must hold only its own warm items: "+JSON.stringify(w);
    await reset(recs);
    /* carried mission: items, 📖 before answering counts as a peek and is logged */
    await pg.click("#carry-go");
    const c=await pg.evaluate(()=>({n:S.steps.filter(x=>x.carry).length,ids:S.steps.filter(x=>x.carry).map(x=>x.q.id)}));
    if(!c.n||c.n>6||c.ids.some(id=>!pick.def.includes(id))) return "carried mission items wrong: "+JSON.stringify(c);
    if(await pg.locator("#peek").count()) return "the lesson's 📖 peek button must not show in the carried mission";
    if(await pg.locator("[data-pred]").count()) await pg.click('[data-pred="0"]');   /* a prediction comes before any help, by design */
    if(!await pg.locator("#expl").count()) return "no 📖 อ่านคำอธิบาย before answering a carried item";
    await pg.click("#expl"); if(!await pg.locator("#sheet .talk, #sheet li").count()&&await pg.evaluate(()=>view)!=="lib") return "the explanation did not open";
    await pg.evaluate(()=>{ if(document.getElementById("sheet")) closeSheet(); if(view==="lib"){ view="session"; render() } });
    const n0=await pg.evaluate(()=>S.items.length);
    for(let i=0;i<20&&await pg.evaluate(n=>S.items.length===n,n0);i++){
      if(await pg.locator("#sheet").count()){ await pg.evaluate(()=>closeSheet()); continue }
      if(await pg.locator("[data-pred]").count()){ await pg.click('[data-pred="0"]'); continue }
      if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>{ const q=S.steps[S.i].q; return q.opts.findIndex((_,j)=>j!==q.a) }); await pg.locator(".opt:not(.ckopt)").nth(k).click(); for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
      if(await pg.locator("#numin:not([disabled])").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(a+1000)); for(const b of ["#check","#send-unsure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
      if(await pg.locator("[data-ck]").count()){ await pg.locator("[data-ck]").first().click(); continue }
      if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue }
      if(i>2&&!await pg.locator("#expl, #go-lib-q").count()&&await pg.evaluate(()=>!!S.answered)) return "no 📖 after a wrong answer in the carried mission";
      if(await pg.locator("#next").count()){ await pg.click("#next"); await pg.waitForTimeout(80); continue } break }
    const it=await pg.evaluate(()=>S.items[S.items.length-1]);
    if(!(it&&it.carry&&it.peek>=1&&it.expl>=1&&it.explWhen==="before")) return "the before-answer explanation was not logged like a peek: "+JSON.stringify(it&&{carry:it.carry,peek:it.peek,expl:it.expl,w:it.explWhen});
    const rs=await pg.evaluate(()=>{ saveProgress(); const k=rvKind(); S.active=false; return {k,ok:pendingReviews().some(p=>p.kind==="carry")} });
    if(!(rs.k==="carry"&&rs.ok)) return "the carried mission cannot be resumed: "+JSON.stringify(rs);
    await pg.evaluate(()=>{ resumeReview("carry") }); for(let g=0;g<80&&await pg.evaluate(()=>S&&S.active);g++){ await pg.evaluate(()=>{ if(document.getElementById("sheet")) closeSheet(); const st=S.steps[S.i]; if(!st||st.kind!=="q") return; S.answered={correct:true,at:Date.now()}; S.items.push({qid:st.q.id,level:st.q.level,correct:true,carry:true,phase:st.phase}); advance() }); await pg.waitForTimeout(40) }
    await pg.waitForTimeout(300);
    const cr=await pg.evaluate(()=>{ const r=mine().find(a=>a.type==="carry"); const p=progressOf(mine()); return {rec:!!r,done:missionList(p).find(x=>x.key==="carry"),units:p.unitsToday} });
    if(!cr.rec||!(cr.done&&cr.done.done)) return "finishing the carried mission does not tick it: "+JSON.stringify(cr);
    if(cr.units) return "the carried mission must not count as the day's lesson";
    /* December sweep: fixed size, unseen items of a midterm lesson done ≥ 7 days ago */
    const sw=await pg.evaluate(m=>{ const p=progressOf(mine()), sp=sweepPlan(p,mine()), st=decSweepSteps(mine(),sp.size), mids=st.filter(x=>x.mid);
      const setOf=id=>{ const o=QBANK[id]; return o&&o.set.id };
      return {size:sp.size,fixed:!!sp.fixed,school:p.info.kind==="school",base:sp.base,n:st.length,mid:mids.length,fromM:mids.filter(x=>setOf(x.q.of||x.q.id)===m).length,seenBack:mids.some(x=>mine().some(a=>(a.items||[]).some(i=>i.qid===x.q.id))),
        subs:new Set(mids.map(x=>subOf(x.q.id))).size} },pick.m);
    if(!sw.fixed||sw.size!==(sw.school?await pg.evaluate(()=>DEC.sweepSchool):sw.base)) return "December sweep size must be fixed: "+JSON.stringify(sw);
    if(!sw.mid||!sw.fromM) return "the December sweep has no unseen item from the midterm lesson done 10 days ago: "+JSON.stringify(sw);
    if(sw.seenBack) return "the December sweep served an item she has already answered";
    if(sw.subs!==sw.mid) return "the December sweep must take one item per subtopic";
    const young=await pg.evaluate(a=>decSweepPool(mine(),20,[]).some(q=>{ const o=QBANK[q.of||q.id]; return o&&o.set.id===a }),pick.a);
    if(young) return "an item from a lesson done yesterday (under 7 days) reached the December sweep";
    /* answer-first in the sweep: no 📖 before answering, the button after a wrong answer */
    await pg.evaluate(()=>{ const st=decSweepSteps(mine(),6); S={mode:"review",sweep:true,sweepPlan:{fixed:true,size:6,base:6,mins:0,served:st.length},set:{id:"sweep",subject:"ย้อนคาถา",topic:DEC_SWEEP_TOPIC},steps:[...st,{kind:"finish",phase:"เสร็จ"}],trial:[],trialVote:{},active:true,i:0,start:Date.now(),act0:actNow(),qStart:Date.now(),items:[],answered:null,why:null,hints:0,struck:[],glossed:[],askOpen:null,confused:[],altShown:0,pick:null,whyText:""}; view="session"; render() });
    if(await pg.locator("#expl").count()) return "the sweep must stay answer-first (📖 shown before answering)";
    /* items are shuffled; an old ม.1–2 bank item may have no explanation source at all, so test on one that has */
    await pg.evaluate(()=>{ const k=S.steps.findIndex(x=>x.q&&explSource(x.q)); if(k>0){ S.i=k; qReset(); renderStep() } });
    await pg.evaluate(()=>answer({choice:-1,raw:"",correct:false,dontknow:true}));
    for(let k=0;k<6&&await pg.locator("[data-ck]").count();k++) await pg.locator("[data-ck]").first().click();
    if(!await pg.locator("#expl, #go-lib-q").count()) return "no 📖 อ่านคำอธิบาย after a wrong sweep answer: "+JSON.stringify(await pg.evaluate(()=>{ const q=S.steps[S.i].q; return {id:q.id,sub:subOf(q.id),src:explSource(q),ans:S.answered,ck:S.checkPick,html:(document.querySelector(".feedback")||{}).innerHTML?.slice(0,300)} }));
    const right=await pg.evaluate(()=>{ S.answered=null; S.checkPick=null; S.checkDone=true; const q=S.steps[S.i].q; answer(q.num?{raw:String(q.answer),correct:true}:{choice:q.a,correct:true}); S.checkDone=true; renderStep(); return !!document.querySelector("#expl, #go-lib-q") });
    if(right) return "a confident right answer must not show the explanation button";
    const gs=await pg.evaluate(()=>{ S.guessed=true; renderStep(); return !!document.querySelector("#expl, #go-lib-q") });
    if(!gs) return "a guessed right answer must show the explanation button";
    await pg.evaluate(()=>{ S.active=false; clearReviewProgress("sweep") });
    /* before DEC.from nothing changes: carried items stay in the lesson warm-up and the carry mission is not on the list */
    const old=await pg.evaluate(()=>{ const f=DEC.from; DEC.from="2099-01-01"; const r=missionList(progressOf(mine())).map(x=>x.key); DEC.from=f; return r });
    if(old.includes("carry")) return "before DEC.from the carried mission must not exist";
    await reset() });

  /* 22 Nov 2026: study time = active time. A forgotten open tab, the app hidden or swiped away, and a resumed lesson must not add hours */
  /* 24 Nov night (father's feedback round): review rotation, label lines in stems, structured text, dark mode, school-day volume */
  await T("feedback 24 Nov night: review rotation, 'ขวด P:' lines, rich text, dark figures, smaller school day (24 Nov night)",async()=>{ await noToday();
    const day=n=>new Date(Date.now()-n*86400000).toISOString();
    const qs=await pg.evaluate(()=>SETS.filter(s=>s.kind==="lesson").flatMap(s=>s.practice).filter(q=>!q.num&&!q.of).slice(0,4).map(q=>q.id));
    const it=(id,ok,extra)=>({qid:id,correct:ok,level:1,timeSec:20,...(extra||{})});
    /* qs[0] missed long ago, then right with a fast uncover on 3 different days → cleared; qs[1] missed and right once → stays */
    await reset([{type:"set",setId:"zz-a",startedAt:day(12),endedAt:day(12),durationSec:600,correct:0,total:3,items:[it(qs[0],false),it(qs[1],false),it(qs[2],false)]},
      ...[5,4,3].map(n=>({type:"review",setId:"review",startedAt:day(n),endedAt:day(n),durationSec:100,correct:1,total:1,items:[it(qs[0],true,{retry:true,cover:true,coverSec:2,coverFloor:12})]})),
      {type:"review",setId:"review",startedAt:day(1),endedAt:day(1),durationSec:100,correct:1,total:2,items:[it(qs[1],true,{retry:true,cover:true,coverSec:2,coverFloor:12}),it(qs[2],false,{retry:true})]}]);
    const pool=await pg.evaluate(()=>reviewPool(mine()).map(q=>q.id));
    if(pool.includes(qs[0])) return "a mistake answered right on 3 different days must leave the review pool";
    if(!pool.includes(qs[1])) return "one right answer (fast uncover) must not clear a mistake";
    if(pool[pool.length-1]!==qs[1]&&pool[pool.length-1]!==qs[2]) return "items served in the last review must wait behind the others: "+pool.join(",");
    /* stems: "ขวด P: … · ขวด Q: …" keeps each label on its own line */
    const ql=await pg.evaluate(()=>qLines("ได้ค่า Rf ดังนี้ ขวด P: 0.2 และ 0.6 · ขวด Q: 0.2, 0.4 และ 0.6 · ขวด R: 0.6 ข้อสรุปใดถูก"));
    if(!/<span class="qline">ขวด P: 0\.2 และ 0\.6<\/span>/.test(ql)) return "the first label line lost its label: "+ql;
    /* rich text: "·" facts become bullets, a lead label becomes bold */
    const rt=await pg.evaluate(()=>richText("สรุป: น้ำมาก ละลายได้มาก · น้ำน้อย ละลายได้น้อย · อุณหภูมิสูง ละลายได้มาก"));
    if(!(/<ul>/.test(rt)&&(rt.match(/<li>/g)||[]).length===3&&/rtlab/.test(rt))) return "richText did not structure the text: "+rt;
    /* worked solutions: every step visible at once, no step button */
    const ex=await pg.evaluate(()=>{ const q=Object.values(QBANK).map(o=>o.q).find(q=>exSteps(q.ex).length>=3); S=S||{}; S.guessed=false; S.checkPick=null; return {h:exHtml(q,{correct:false}),n:exSteps(q.ex).length} });
    if((ex.h.match(/<li>/g)||[]).length!==ex.n||/exnext/.test(ex.h)) return "worked steps must all show at once";
    /* dark mode: the tapped-sentence mark and fixed-paint figures stay readable */
    const dk=await pg.evaluate(()=>{ document.documentElement.dataset.theme="dark"; const p=document.createElement("p"); p.className="tline tmark"; const w=document.createElement("div"); w.className="talk"; w.appendChild(p); document.body.appendChild(w);
      const cs=getComputedStyle(p), bg=cs.backgroundColor, fg=cs.color; w.remove();
      const f=figHtml({kind:"svg",svg:"<svg viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'><rect width='10' height='10' fill='#FFFFFF'/><text x='1' y='8' fill='currentColor'>a</text></svg>"}); delete document.documentElement.dataset.theme; return {bg,fg,light:/figlight/.test(f)} });
    const lum=c=>{ const m=c.match(/[\d.]+/g).map(Number); return (0.299*m[0]+0.587*m[1]+0.114*m[2])/255 };
    if(Math.abs(lum(dk.bg)-lum(dk.fg))<0.4) return "dark mode: the tapped-sentence mark has low contrast "+JSON.stringify(dk);
    if(!dk.light) return "a figure with white boxes must be drawn on a light panel";
    /* school day in December: smaller carried mission and review */
    const v=await pg.evaluate(()=>({c:DEC.carrySchool,r:DEC.reviewSchool,sw:DEC.sweepSchool,rn:reviewN({info:{kind:"school"}}),rh:reviewN({info:{kind:"holiday"}})}));
    const expR=await pg.evaluate(()=>decOn()?DEC.reviewSchool:REVIEW_DAILY.school);
    if(!(v.c===4&&v.r===4&&v.sw===5&&v.rn===expR)) return "school-day sizes wrong: "+JSON.stringify(v);
    if(v.rh!==await pg.evaluate(()=>REVIEW_DAILY.holiday)) return "holiday review size must stay as before";
    /* a library reading is never the day's lesson */
    await reset([{type:"lib",sub:"s3.3",setId:"lib-s3.3",startedAt:day(0),endedAt:new Date().toISOString(),durationSec:60,read:true,xp:10,items:[]}]);
    if(await pg.evaluate(()=>progressOf(mine()).unitsToday)) return "a library reading counted as the day's lesson";
    await reset() });

  await T("study time is active time, not wall clock (22 Nov)",async()=>{ await noToday();
    const old=await pg.evaluate(()=>new Date(Date.now()-3*86400000).toISOString());
    const L=await pg.evaluate(()=>SETS.find(s=>s.kind==="lesson"&&s.practice.length>=6).practice.slice(0,6).map(q=>q.id));
    await reset([{type:"set",setId:"zz-old",startedAt:old,endedAt:old,durationSec:600,correct:0,total:6,xp:5,items:L.map(id=>({qid:id,correct:false,level:1,timeSec:20}))}]);
    await pg.evaluate(()=>startReview(5,"ทบทวนข้อที่เคยพลาด",{daily:true}));
    const answerOne=async()=>{ const have=await pg.evaluate(()=>S.items.length);
      for(let i=0;i<30;i++){ if(await pg.evaluate(()=>S.items.length)>have) return;
        if(await pg.locator("[data-pred]").count()){ await pg.click('[data-pred="0"]'); continue }
        if(await pg.locator("[data-ck]").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.check?S.steps[S.i].q.check.a:0); await pg.click(`[data-ck="${a}"]`); continue }
        if(await pg.locator("#exnext").count()){ await pg.click("#exnext"); continue }
        if(await pg.locator("#next").count()){ await pg.click("#next"); await pg.waitForTimeout(80); continue }
        if(await pg.locator("#numin:not([disabled])").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(a));
          if(await pg.locator("#check").count()) await pg.click("#check"); else for(const b of ["#send-unsure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
        if(await pg.locator("#uncover").count()){ await pg.click("#uncover"); continue }
        if(await pg.locator("#readdone").count()){ await pg.click("#readdone"); continue }
        if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator(".opt:not(.ckopt)").nth(k).click();
          for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break } continue }
        await pg.waitForTimeout(60) } };
    await answerOne();
    await pg.clock.fastForward(3*3600*1000);                      /* the tab stays open 3 h with nobody touching it */
    await answerOne();
    await pg.evaluate(()=>{ Object.defineProperty(document,"hidden",{value:true,configurable:true}); document.dispatchEvent(new Event("visibilitychange")) });
    await pg.clock.fastForward(2*3600*1000);                      /* app swiped away / switched for 2 h */
    await pg.evaluate(()=>{ Object.defineProperty(document,"hidden",{value:false,configurable:true}); document.dispatchEvent(new Event("visibilitychange")) });
    for(let g=0;g<12&&await pg.evaluate(()=>S.active&&S.steps[S.i]&&S.steps[S.i].kind==="q");g++) await answerOne();
    for(let g=0;g<30&&await pg.evaluate(()=>S&&S.active);g++){ for(const sel of ["#save","#finish","#next"]) if(await pg.locator(sel).count()){ await pg.locator(sel).first().click(); break } await pg.waitForTimeout(150) }
    await pg.waitForTimeout(400);
    const rec=await pg.evaluate(()=>mine().find(a=>(a.type==="review"||a.type==="repair")&&a.items&&a.items.length));
    if(!rec) return "no review record saved";
    if(rec.durationSec>1200) return `recorded ${rec.durationSec} s although only about 10 minutes were active (5 h of wall clock passed)`;
    if(rec.actSec!==rec.durationSec) return "new record is not marked as active time (actSec)";
    const r=await pg.evaluate(()=>({bad:recSec({durationSec:6420,conceptSec:60,items:Array.from({length:12},()=>({timeSec:60,exSec:10}))}),ok:recSec({durationSec:900,conceptSec:60,items:Array.from({length:12},()=>({timeSec:50,exSec:8}))}),act:recSec({durationSec:5000,actSec:300,items:[]})}));
    if(!(r.bad>=600&&r.bad<=1800)) return "old inflated record not trimmed to the answers: "+r.bad;
    if(r.ok!==900) return "a plausible old record must keep its duration: "+r.ok;
    if(r.act!==300) return "actSec must win over durationSec: "+r.act;
    await reset() });

  /* 24 Nov 2026 (front-page queue 2): letters show the question she asked about; "คำถามของฉัน" page */
  await T("letter replies show the question, her words and a figure; unknown qid falls back (24 Nov)",async()=>{ await reset();
    const q=await pg.evaluate(()=>{ const o=Object.values(QBANK).find(o=>o.q.fig&&o.q.fig.kind==="geo"&&!o.q.of); return {id:o.q.id,stem:o.q.q} });
    await pg.evaluate(id=>{ $v.innerHTML=letterBody({text:"เปิดจดหมาย",replies:[{qid:id,ask:"ตรงนี้งง",text:"คำตอบทดสอบ",fig:{kind:"svg",svg:'<svg viewBox="0 0 10 10"><rect width="5" height="5"/></svg>',desc:"สี่เหลี่ยมทดสอบสำหรับอ่านออกเสียง"}},{qid:"no-such-q",text:"ข้อความล้วน"}],end:"ท้ายจดหมาย"}) },q.id);
    const r=await pg.evaluate(()=>({found:document.querySelectorAll('.lreply[data-found="1"]').length,prompt:(document.querySelector('.lreply[data-found="1"] .prompt')||{}).textContent||"",
      figs:document.querySelectorAll('.lreply[data-found="1"] figure, .lreply[data-found="1"] svg').length,ask:(document.querySelector(".lask")||{}).textContent||"",
      fb:(document.querySelector('.lreply[data-found="0"]')||{}).textContent||"",end:document.body.textContent.includes("ท้ายจดหมาย"),
      first:(document.querySelector(".lropts li")||{}).textContent||""}));
    if(r.found!==1) return "the reply with a known qid did not render its question";
    if(!r.prompt.replace(/\s/g,"").includes(q.stem.replace(/\s/g,"").slice(0,20))) return "the question stem is missing";
    if(r.figs<2) return "the question figure and the reply figure must both show";
    if(!r.ask.includes("ตรงนี้งง")) return "her typed words are missing";
    if(!r.fb.includes("ข้อความล้วน")) return "an unknown qid must fall back to the plain text";
    if(!r.end) return "the closing text (end) is missing";
    const old=await pg.evaluate(()=>{ $v.innerHTML=letterBody({text:"จดหมายแบบเก่า"}); return document.body.textContent.includes("จดหมายแบบเก่า") });
    if(!old) return "an old letter with only text must still show";
    await reset() });
  await T("คำถามของฉัน lists her asks with the letter reply when there is one (24 Nov)",async()=>{
    const ids=await pg.evaluate(()=>Object.values(QBANK).filter(o=>o.set.kind==="lesson"&&!o.q.of).slice(0,2).map(o=>o.q.id));
    const at=new Date(Date.now()-3*3600000).toISOString();
    await reset([{type:"lesson",setId:"t",topic:"ทดสอบ",startedAt:at,endedAt:at,durationSec:60,correct:0,total:0,items:[],
      confused:[{where:"question",key:ids[0],qid:ids[0],ask:"ข้อแรกงง"},{where:"question",key:ids[1],qid:ids[1],ask:"ข้อสองงง"},{where:"concept",key:"concept",topic:"บททดสอบ",ask:"การ์ดงง"},{where:"question",qid:ids[1],key:ids[1]}]}]);
    const t=await pg.evaluate(()=>isoDay(todayKey()));
    await pg.evaluate(([id,t])=>{ LETTERS.unshift({id:"t-letter",date:t,text:"ทดสอบ",replies:[{qid:id,ask:"ข้อแรกงง",text:"ตอบข้อแรกแล้ว"}]}); render() },[ids[0],t]);
    if(!await pg.locator("#go-myq").count()) return "home has no entry to คำถามของฉัน";
    await pg.click("#go-myq");
    const r=await pg.evaluate(()=>({n:document.querySelectorAll("details.myq").length,txt:document.querySelector("#view").textContent,
      done:[...document.querySelectorAll("details.myq summary")].filter(s=>s.textContent.includes("✅")).length,prompts:document.querySelectorAll("details.myq .prompt").length}));
    await pg.evaluate(()=>{ LETTERS.shift() });
    if(r.n!==3) return `expected 3 asks (one without ask text is skipped), got ${r.n}`;
    if(r.done!==1||!r.txt.includes("ตอบข้อแรกแล้ว")) return "the letter reply is not matched to her question";
    if(r.prompts<2) return "the question stems are missing";
    if(!r.txt.includes("การ์ดงง")||!r.txt.includes("บททดสอบ")) return "an ask about a lesson card must show with its lesson";
    await pg.click("#mq-back"); if(await pg.evaluate(()=>view)!=="home") return "back does not return home";
    await reset() });
  /* 24 Nov 2026 (front-page queue 2b): a tap right after a box closes must not fall through; an early "ยังคิดไม่ออก" asks again */
  await T("tap guard after a box closes, and an early 'ยังคิดไม่ออก' asks once more (24 Nov)",async()=>{ await noToday(); await reset();
    await pg.evaluate(()=>{ window.__noTapGuard=false; window.__hit=0; $v.insertAdjacentHTML("beforeend",'<button id="tg-b" style="position:fixed;top:300px;left:20px;z-index:1">x</button>'); document.getElementById("tg-b").onclick=()=>{ window.__hit++ };
      sheet({title:"ทดสอบ",html:"<p>x</p>",actions:[{label:"ปิด",fn:closeSheet}]}) });
    await pg.click('[data-sh="0"]'); await pg.click("#tg-b",{force:true});
    const early=await pg.evaluate(()=>window.__hit); await pg.waitForTimeout(700); await pg.click("#tg-b",{force:true}); const late=await pg.evaluate(()=>window.__hit);
    if(early!==0) return "a tap right after closing the box went through";
    if(late!==1) return "taps must work again after the guard";
    const set=await pg.evaluate(()=>SETS.find(s=>s.kind==="lesson"&&!gateEligible(s)&&s.practice.some(q=>!q.predict)).id);
    await pg.evaluate(id=>{ localStorage.removeItem("fieldnote.inprogress"); introSet=SETS.find(s=>s.id===id); view="intro"; render() },set); await pg.click("#go");
    for(let k=0;k<40&&!await pg.locator("#dontknow").count();k++){ if(await pg.locator("#sheet").count()){ await pg.evaluate(()=>closeSheet()); await pg.waitForTimeout(650); continue } if(await pg.locator("#cnext").count()){ await pg.click("#cnext"); continue } if(await pg.locator("[data-tu]").count()){ await pg.click('[data-tu="ok"]'); continue } if(await pg.locator("[data-ws]").count()){ await pg.locator("[data-ws]").first().click(); continue } if(await pg.locator("[data-pred]").count()){ await pg.click('[data-pred="0"]'); continue } if(await pg.locator("#next").count()){ await pg.click("#next"); continue } break }
    if(!await pg.locator("#dontknow").count()) return "could not reach a question with 'ยังคิดไม่ออก'";
    const n0=await pg.evaluate(()=>S.items.length);
    await pg.evaluate(()=>{ S.qStart=Date.now() }); await pg.click("#dontknow");
    if(await pg.evaluate(()=>S.items.length)!==n0||await pg.evaluate(()=>!!S.answered)) return "an early tap answered at once";
    if(!(await pg.locator("#dontknow").textContent()).includes("แน่ใจ")) return "the button must ask once more";
    await pg.click("#dontknow"); if(!await pg.evaluate(()=>!!S.answered)) return "the second tap must show the answer";
    await pg.evaluate(()=>{ window.__noTapGuard=true }); await reset() });

  const testAttempts=await pg.evaluate(()=>{ const x=JSON.parse(JSON.stringify(mine())); return x });
  await b.close();

  /* ---- 4. the parent page renders with the new sections ---- */
  { const b2=await chromium.launch(); const p2=await b2.newPage({viewport:{width:1000,height:900}}); const e2=[]; p2.on("pageerror",e=>e2.push(e.message));
    await p2.clock.install({time:new Date(Date.now()+86400000)});
    await p2.goto("file://"+path.join(ROOT,"dist","parent.html"));
    await p2.evaluate(a=>{ const at=new Date(Date.now()-3600000).toISOString(); attempts=[...a.map(x=>({...x,test:false})),{type:"lib",sub:"s3.3",setId:"lib-s3.3",topic:"สมุดคาถา",src:"lib",from:null,startedAt:at,endedAt:at,durationSec:4,read:true,screens:4,reached:4,taps:[],stuck:[],tries:[],correct:0,total:0,xp:10,items:[]}]; view="parent"; render() },testAttempts);
    if(!await p2.locator("#understand").count()) warn("parent page: misconception section missing"); else console.log("ok  feature: parent page sections");
    if(!await p2.locator("h3",{hasText:"สมุดคาถา: น้องเปิดอ่านเอง"}).count()) warn("parent page: library log missing");
    if(!await p2.locator("h3",{hasText:"ใช้สูตรได้ แต่รู้ไหมว่าตัวเลขบอกอะไร"}).count()) warn("parent page: compute/meaning section missing");
    if(!await p2.locator("#understand",{hasText:"เร็วเกินอ่านทัน"}).count()) warn("parent page: the too-fast library reading is not flagged");
    { const at=new Date(Date.now()-3600000).toISOString(), q=await p2.evaluate(()=>Object.values(QBANK).find(o=>o.set.kind==="lesson").q.id);
      await p2.evaluate(([at,q])=>{ attempts=[...attempts,{type:"review",setId:"review",topic:"ทบทวน",startedAt:at,endedAt:at,durationSec:20,correct:1,total:1,items:[{qid:q,level:2,correct:true,cover:true,coverSec:1,coverFloor:14}]}]; render() },[at,q]);
      if(!await p2.locator("text=กดเปิดเร็วกว่าเวลาอ่านโจทย์").count()) warn("parent page: the fast uncover is not flagged"); else console.log("ok  feature: parent page fast-uncover flag") }
    if(e2.length) warn("parent page errors: "+e2.join(" | "));
    await b2.close() }
  if(pageErr.length) warn("page errors: "+pageErr.join(" | "));
  if(errs.length){ console.log("PROBLEMS:\n- "+errs.join("\n- ")); process.exit(1) }
  console.log("all checks passed");
})();

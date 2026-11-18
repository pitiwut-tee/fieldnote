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

/* ---- 2. play every set in the browser, answering correctly ---- */
(async()=>{
  if(errs.length){ console.log("CONTENT PROBLEMS:\n- "+errs.join("\n- ")); process.exit(1) }
  const {chromium}=require("playwright");
  const b=await chromium.launch(); const pg=await b.newPage({viewport:{width:390,height:844}});
  const pageErr=[]; pg.on("pageerror",e=>pageErr.push(e.message));
  const url="file://"+path.join(ROOT,"index.html");
  await pg.clock.install({time:new Date(Date.now()+86400000)});
  await pg.addInitScript(()=>{ try{ localStorage.setItem("fieldnote.studioTeaser2","true"); localStorage.setItem("fieldnote.callmeAsked","true"); localStorage.setItem("fieldnote.guestpop",JSON.stringify(["x"])); localStorage.setItem("fieldnote.quietSheets","true"); localStorage.setItem("fieldnote.waveSeen",JSON.stringify([1,2])) }catch(e){} });
  await pg.goto(url);
  /* answer whatever session is open until it ends. wrong=true answers every question wrong (to test the paths after a miss) */
  async function play(wrong){ let ok=0, total=0;
    const pickWrong=async()=>pg.evaluate(()=>{ const q=S.steps[S.i].q; return q.opts.findIndex((_,k)=>k!==q.a) });
    for(let i=0;i<60;i++){
      if(await pg.locator("[data-hk]").count()){ await pg.locator("[data-hk]").first().click(); continue }
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
    let screens=0; for(let i=0;i<20;i++){ if(await pg.locator("[data-dkt]").count()){ await pg.locator("[data-dkt]").first().click(); continue } if(await pg.locator("#dk-next").count()){ screens++; await pg.click("#dk-next"); continue } break }
    if(screens!==info.screens) return `card s3.3 should show ${info.screens} screens, showed ${screens}`;
    if(!await pg.locator("#dk-done").count()) return "no one-page summary at the end";
    await pg.click("#dk-done");
    const fastSheet=await pg.locator("#sheet [data-sh]").count(); if(!fastSheet) return "no 'too fast' sheet after clicking through a long card in a few seconds";
    await pg.click('#sheet [data-sh="1"]');
    for(let i=0;i<6;i++){ if(await pg.locator("[data-tro]").count()){ await pg.locator("[data-tro]").first().click(); continue } if(await pg.locator("#tr-num").count()){ await pg.fill("#tr-num","1"); await pg.click("#tr-check"); continue }
      if(await pg.locator("#tr-next").count()){ await pg.click("#tr-next"); continue } break }
    const rec=await pg.evaluate(()=>mine().find(a=>a.type==="lib"));
    if(!rec||!rec.read||rec.tries.length!==2||rec.taps.length!==info.taps||rec.from!==info.qid) return "lib record wrong: "+JSON.stringify(rec&&{read:rec.read,tries:rec.tries,taps:rec.taps,from:rec.from});
    if(rec.tries.some(t=>t.qid===info.qid)) return "the question she just missed came back as a try question";
    if(!rec.xp) return "first reading of the day earned no XP";
    if(!(rec.fast===true&&rec.floorSec>=10&&rec.xp===rec.tries.reduce((s,x)=>s+(x.ok?10:5),0))) return "a too-fast reading must be recorded as fast and earn only its try-it XP: "+JSON.stringify({fast:rec.fast,floor:rec.floorSec,xp:rec.xp});
    await pg.click("#lb-back2");
    if(!await pg.evaluate(qid=>view==="session"&&S.steps[S.i].q&&S.steps[S.i].q.id===qid&&!!S.answered,info.qid)) return "did not come back to the same answered question";
    await play(false);
    const it=await pg.evaluate(qid=>((mine().find(a=>a.setId==="zz-lib")||{}).items||[]).find(x=>x.qid===qid),info.qid);
    if(!(it&&it.lib===1&&it.correct===false)) return "the library visit is not recorded on the item: "+JSON.stringify(it);
    await reset(); if(!await pg.locator("#go-lib").count()) return "no สมุดคาถา entry on the home page";
    await pg.click("#go-lib"); await pg.fill("#lb-q","rf");
    const vis=await pg.evaluate(()=>[...document.querySelectorAll("[data-lbs]")].filter(b=>!b.hidden&&!b.closest("[hidden]")).map(b=>b.dataset.lbs));
    if(!vis.includes("s3.3")||vis.length>3) return "search 'rf' shows: "+vis.join(",");
    await pg.locator('[data-lbs="s3.3"]').first().click(); if(!await pg.locator("#dk-next").count()) return "card did not open from the list";
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

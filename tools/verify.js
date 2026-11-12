/* Check content and play every set in a real browser before publishing.
   Usage: node tools/verify.js        (run tools/build.py first)
   Exit code 1 = something is wrong; read the messages and fix before pushing. */
const fs=require("fs"), path=require("path");
const ROOT=path.join(__dirname,".."), J=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),"utf8"));
const errs=[], warn=m=>errs.push(m);

/* ---- 1. content rules ---- */
const spells=new Set(J("content/spells.json").spells.map(s=>s.id));
const files=fs.readdirSync(path.join(ROOT,"content/sets")).filter(f=>f.endsWith(".json")).sort();
const setIds=new Set(), qIds=new Set();
for(const f of files){
  let s; try{ s=J("content/sets/"+f) }catch(e){ warn(`${f}: not valid JSON (${e.message})`); continue }
  const where=`${f} (${s.id})`;
  if(setIds.has(s.id)) warn(`${where}: duplicate set id`); setIds.add(s.id);
  if(!["lesson","probe","mixed","passage","sweep"].includes(s.kind)) warn(`${where}: kind must be "lesson", "probe", "mixed" or "passage"`);
  if(s.kind==="passage"&&!(s.passage&&s.passage.title&&Array.isArray(s.passage.paras)&&s.passage.paras.length)) warn(`${where}: passage needs passage.title and passage.paras`);
  if(s.kind==="mixed"){
    const sp=new Set((s.practice||[]).map(q=>q.spell));
    if((s.practice||[]).some(q=>!q.spell)) warn(`${where}: every question in a mixed set needs its own spell`);
    if(sp.size<4) warn(`${where}: a mixed set needs questions from at least 4 spells (has ${sp.size})`);
    if((s.practice||[]).length<10) warn(`${where}: a mixed set needs 10-15 questions`);
    if(s.challenge) warn(`${where}: a mixed set has no challenge`);
  } else if(s.kind!=="sweep"&&!spells.has(s.spell)) warn(`${where}: unknown spell "${s.spell}"`);
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
    if(q.fig){ const f=q.fig; if(!["dot","stem","hist","bar","table","line"].includes(f.kind)) warn(`${w}: fig.kind must be dot, stem, hist, bar, table or line`);
      if(f.kind==="dot"&&!(typeof f.min==="number"&&typeof f.max==="number"&&f.counts)) warn(`${w}: dot fig needs min, max, counts`);
      if((f.kind==="hist"||f.kind==="bar")&&!(Array.isArray(f.values)&&f.values.length)) warn(`${w}: ${f.kind} fig needs values`);
      if((f.kind==="stem"||f.kind==="table")&&!Array.isArray(f.rows)) warn(`${w}: ${f.kind} fig needs rows`); }
    const h=(s.hints||{})[q.id]; if(s.kind!=="sweep"&&(!Array.isArray(h)||!h.length)) warn(`${w}: needs at least one hint`);
  }
  if(s.kind!=="sweep"&&(lv[1]<2||lv[2]<2||lv[3]<1)) warn(`${where}: mix should have ≥2 level-1, ≥2 level-2, ≥1 level-3 (has ${JSON.stringify(lv)})`);
}
/* math sets written from 2026-11-08 on: at least half of level-2/3 questions answerable as a typed number (exam fill-in part) */
{ const R=/^\s*([−-]?[\d,]*\.?\d+(?:\s*\/\s*\d+)?)\s*(.*)$/;
  const numable=q=>q.num||Array.isArray(q.opts)&&q.opts.every(o=>R.test(String(o)))&&new Set(q.opts.map(o=>String(o).match(R)[2].trim())).size===1;
  for(const f of files){ let s; try{ s=J("content/sets/"+f) }catch(e){ continue } if(!(s.added>="2026-11-08")||s.subject!=="คณิตศาสตร์"||s.kind==="passage") continue;
    const qs=[...(s.practice||[]),...(s.challenge?[s.challenge]:[])].filter(q=>q.level>=2), n=qs.filter(numable).length;
    if(qs.length&&n<Math.ceil(qs.length/2)) warn(`${f}: at least half of level-2/3 math questions should be answerable as a number (has ${n}/${qs.length})`); } }
/* lessons and mixed sets written from 2026-11-05 on: every question has a context tag, lessons have a real-life "use" line */
for(const f of files){ let s; try{ s=J("content/sets/"+f) }catch(e){ continue } if(!(s.added>="2026-11-05")) continue;
  const qs=[...(s.warm||[]),...(s.practice||[]),...(s.challenge?[s.challenge]:[])];
  for(const q of qs) if(!["life","earth","fun","pure"].includes(q.ctx)) warn(`${f} ${q.id}: ctx must be life, earth, fun or pure`);
  const pr=(s.practice||[]).filter(q=>!q.ctxAuto), n=k=>pr.filter(q=>q.ctx===k).length;
  if(s.kind!=="probe"&&pr.length&&(n("life")+n("earth")<Math.ceil(pr.length*0.5)||(n("earth")<1&&!s.oneContext))) warn(`${f}: practice needs about half life/earth contexts and at least 1 earth (has life ${n("life")}, earth ${n("earth")})`);
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
    if(!["life","earth","fun","pure"].includes(v.ctx)) warn(`${w}: needs ctx`); } }
const cal=J("content/calendar.json");
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
  await pg.addInitScript(()=>{ try{ localStorage.setItem("fieldnote.studioTeaser2","true"); localStorage.setItem("fieldnote.callmeAsked","true"); localStorage.setItem("fieldnote.guestpop",JSON.stringify(["x"])); localStorage.setItem("fieldnote.quietSheets","true") }catch(e){} });
  await pg.goto(url);
  /* --since=YYYY-MM-DD plays only sets added on/after that date (content rules above still cover every set) */
  const since=(process.argv.find(x=>x.startsWith("--since="))||"").slice(8);
  const ids=await pg.evaluate(since=>SETS.filter(s=>s.kind!=="sweep"&&(!since||(s.added||"")>=since)).map(s=>s.id),since);
  let n=0;
  for(const id of ids){
    /* every other set is played with this week's trial features on (confidence buttons + explain box) */
    const trial=(n++)%2===0?["confidence","explain"]:[];
    await pg.evaluate(([id,trial])=>{ localStorage.removeItem("fieldnote.inprogress"); CAL.trials={[isoDay(todayKey())]:trial}; introSet=SETS.find(s=>s.id===id); view="intro"; render() }, [id,trial]);
    await pg.click("#go");
    let ok=0, total=0;
    for(let i=0;i<40;i++){
      if(await pg.locator("[data-hk]").count()){ await pg.locator("[data-hk]").first().click(); continue }
      if(await pg.locator("#cnext").count()){ await pg.click("#cnext"); continue }
      if(await pg.locator("#save").count()){ await pg.click('[data-r="พอดี"]'); await pg.click("#save"); break }
      const afterAns=async()=>{ if(await pg.locator("[data-ck]").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.check.a); await pg.click(`[data-ck="${a}"]`) } await pg.click("#next") };
      if(await pg.locator(".opt:not([disabled]):not(.ckopt)").count()){ const k=await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator(".opt").nth(k).click();
        if(await pg.locator("#whytext").count()) await pg.fill("#whytext","เพราะคิดตามสูตร");
        for(const b of ["#send-sure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break }
        total++; if(await pg.locator(".feedback b.ok").count()) ok++; await afterAns(); continue }
      if(await pg.locator("#numin").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(a));
        if(await pg.locator("#check").count()) await pg.click("#check"); else for(const b of ["#send-unsure","#send-plain"]) if(await pg.locator(b).count()){ await pg.click(b); break }
        total++; if(await pg.locator(".feedback b.ok").count()) ok++; await afterAns(); continue }
      if(await pg.locator("#uncover").count()){ await pg.click("#uncover"); continue }
      if(await pg.locator("#readdone").count()){ await pg.click("#readdone"); continue }
      if(await pg.locator("#next").count()){ await pg.click("#next"); continue }
    }
    await pg.waitForTimeout(150);
    const done=await pg.evaluate(()=>view==="done");
    if(!done||ok!==total) warn(`${id}: played ${ok}/${total} correct, reached end: ${done}`);
    else console.log(`ok  ${id}  (${total} questions)`);
  }
  await b.close();
  if(pageErr.length) warn("page errors: "+pageErr.join(" | "));
  if(errs.length){ console.log("PROBLEMS:\n- "+errs.join("\n- ")); process.exit(1) }
  console.log("all checks passed");
})();

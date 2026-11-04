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
  if(!["lesson","probe"].includes(s.kind)) warn(`${where}: kind must be "lesson" or "probe"`);
  if(!spells.has(s.spell)) warn(`${where}: unknown spell "${s.spell}"`);
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
    const h=(s.hints||{})[q.id]; if(!Array.isArray(h)||!h.length) warn(`${w}: needs at least one hint`);
  }
  if(lv[1]<2||lv[2]<2||lv[3]<1) warn(`${where}: mix should have ≥2 level-1, ≥2 level-2, ≥1 level-3 (has ${JSON.stringify(lv)})`);
}
const cal=J("content/calendar.json");
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
  await pg.goto(url);
  const ids=await pg.evaluate(()=>SETS.map(s=>s.id));
  for(const id of ids){
    await pg.evaluate(id=>{ localStorage.removeItem("fieldnote.inprogress"); introSet=SETS.find(s=>s.id===id); view="intro"; render() }, id);
    await pg.click("#go");
    let ok=0, total=0;
    for(let i=0;i<40;i++){
      if(await pg.locator("#save").count()){ await pg.click('[data-r="พอดี"]'); await pg.click("#save"); break }
      if(await pg.locator(".opt:not([disabled])").count()){ const k=await pg.evaluate(()=>S.steps[S.i].q.a); await pg.locator(".opt").nth(k).click();
        total++; if(await pg.locator(".feedback b.ok").count()) ok++; await pg.click("#next"); continue }
      if(await pg.locator("#numin").count()){ const a=await pg.evaluate(()=>S.steps[S.i].q.answer); await pg.fill("#numin",String(a)); await pg.click("#check");
        total++; if(await pg.locator(".feedback b.ok").count()) ok++; await pg.click("#next"); continue }
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

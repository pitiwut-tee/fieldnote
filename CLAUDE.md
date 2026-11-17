# สมุดคาถา — project memory (read this first, in every session)

A daily science/math practice web app a Thai father built with Claude for his daughter (ม.2), to prepare for the
first-round exam of the shared science-school admission (วมว./MWIT/PCSHS), mid-November 2570 (2027).
The father talks to Claude in **Thai**. Reply to him in Thai.

This file is the long-term memory. Chats are disposable; this repo and the status doc are not.

## Hard rules (never break; they come from the father)
1. **This repo is public.** Never write her name or nickname, her school, her grades, photos or any personal detail
   into any file or commit message. Say "the student" / "her school". (Nickname is typed on her own device; texts use `{name}`.)
2. **Never copy copyrighted questions** (tutor books, textbooks, school workbooks, recalled past papers). Write own
   questions; topics and style only. Never put PDFs or scans in the repo. Recalled exam papers stay on the father's
   computer and are used only as a printed, timed external mock; only scores enter the system.
3. A chemistry book's watermark contains a registrant's name: never use that file's content. Never use real
   character, brand, game or band names (use the feel only).
4. Do not circumvent DRM or blocked sites. If a site is refused, say so and ask the father for the file.
5. **Every new question set gets an independent blind answer check** (a separate agent solves it before seeing the
   key) before it is committed. It caught a wrong key on 12 Nov; never skip it.
6. **Never present our own question-bank accuracy as exam readiness.** Be honest about what the system cannot yet
   measure (the father decides in February whether tutoring is also needed).
7. XP never buys random outcomes; no guilt mechanics; animals are welfare-safe; enemies are pollution monsters,
   nobody gets hurt. Never call her "หนู"; use `{name}` or "เธอ". Father approves missions and guests.
8. The correct option is written at index 0 (`"a":0`); the app shuffles. Never refer to an option by position.
9. Be detailed and honest with the father about capability, limits and needs. Warn before heavy usage; read
   books in portions and ask permission before big reads (scans cost ~10x a text PDF per page).

## Commands (repo root)
- Build: `python3 tools/build.py` (makes `index.html` and `dist/parent.html` from `src/app.html` + `content/`)
- Verify: `node tools/verify.js` (must print "all checks passed")
- Commit: author `pitiwut-tee <pitiwut-tee@users.noreply.github.com>`, add the Co-Authored-By trailer for the model used
  and the `Claude-Session:` trailer given in the session.
- Push: `git fetch -q origin main && (git rebase -q origin/main || (python3 tools/build.py && git add index.html dist && git -c core.editor=true rebase --continue)); git push -q origin HEAD:main`
- Publish parent page: Artifact publish of `dist/parent.html` to https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR
  (read it first in a new session; if refused because the nightly run published a newer version, check that our build
  contains its content, then publish again). Its db may only use the collections declared on the artifact
  (`attempts`, `feedback`, `parentlog` since 17 Nov): a new collection needs `declare_capabilities` first, or writes fail.
  A db query's `limit()` must be 1..1000: above that the listener dies silently with `invalid_argument` and the page
  shows no history (happened 17 Nov with `limit(2000)`; the data was safe). The parent page now reads the newest 1000
  live and pages older records in 1000s; never raise a single limit above 1000.

## Map of the repo
- `src/app.html` the app (only edit when the father asks for an app change; the nightly run never edits it)
- `content/` everything the app teaches: `sets/*.json` (lessons, sweeps, mixed, passages, probes), `vocab.json`,
  `phonics.json`, `challenges.json`, `variants.json` (twin questions), `calendar.json` (`lessonQueue`, exam dates),
  `curriculum.json` (51 spells, ~243 subtopics) + `qtags.json` (every question id → subtopic; keep complete),
  `reteach.json` (repeated-error loop cards by subtopic), `library.json` (สมุดคาถา reading cards by subtopic + extra
  glossary `terms`)
- `tools/` build and verify (nightly run never edits)
- `AUTOMATION.md` the lean nightly runbook; `docs/*.md` topic notes it points to (read only when needed)
- `content/school-plan.md`, `content/exam-analysis.md` what the school teaches now and what the real exam asks

## Where the live status is
- Father's status doc (Claude Docs, Thai): https://claude.ai/artifact/4kHsdKcNKfudfYGiyqbRQx
  (project id `1e56cbde-7272-43ad-9beb-270fb7f5f0dd`). Read it at the start of any session: it holds what the father
  must provide, decisions waiting, current numbers and the log of recent work. He edits it; his edits win.
  Tabs (17 Nov): **หน้าแรกของพ่อ** (first; his one-page dashboard, see "Father's front page" below) · สถานะและบันทึกงาน
  (needs table, numbers, decisions, log) · 10 นาทีกับพ่อ · ทดลองที่บ้าน N.
- Parent page (private artifact): https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR holds her results and his approvals.
- Student page: GitHub Pages of the repo `pitiwut-tee/fieldnote`.

## Starting a new chat (for any session that is not the nightly run)
1. Attach the repo (`add_repo pitiwut-tee/fieldnote`, access push), clone it, register it, read this file.
2. Read the status doc above. Do the task the father names. Do not re-explain the project to him.
   "ทำคิวที่ N ในหน้าแรกของพ่อ" = the row N of ② in tab หน้าแรกของพ่อ; its details are in "Build plan" below.
3. His folders on `D:\Krunee` and `D:\เตรียมม.ปลาย` are reachable only if the chat is linked to his computer.
   Most PDFs there are scans; view them as images. Staged copies are snapshots.
4. At the end: update the status doc (date chip, numbers, one row of "ทำเสร็จล่าสุด"), **and the front page**
   (rules below), and if you learned a new standing rule, write it into the right file here, not just into the chat.

## Father's front page (tab "หน้าแรกของพ่อ", made 17 Nov 2026 because he could no longer track work across chats)
One page he reads in ~2 minutes a day. Keep it short; history goes to the other tab, never here.
- ① สัปดาห์นี้พ่อทำ: checklist of what HE must do this week (≤ 5 items, each with a date and the tab to use).
- ② คิวงานที่พ่อสั่งผม: one table, the ORDER he should open chats in (คิว · งาน · model · เปิดจากคอม · เมื่อไร) and ONE
  standard opener ending "ทำคิวที่ 1 ในหน้าแรกของพ่อ"; he changes only the number. When a chat finishes its queue item:
  delete that row and renumber; new work found in a chat is added as a row where it belongs and said in the reply.
  Never leave work only in a chat. Plain questions/discussion chats need no queue item.
- ③ ประเด็นน้องรายวัน: table วันที่ · เกิดอะไร · ใครต้องทำ (one of: **พ่อควรทำ** / ผมจัดการแล้ว / แค่รู้ไว้), newest
  first, ≤ 3 points a day, keep 7 days. The nightly run writes it. "พ่อควรทำ" rows also add an item to ①.
- ④ รอพ่อตัดสินใจ (or "ไม่มีเรื่องค้าง") · ⑤ วันสำคัญข้างหน้า (drop past dates) · ⑥ ของที่พ่อหามาให้ (one line; the
  full needs table stays in the other tab).
- Every chat and every nightly run updates the date chip at the top.

## Figures in questions (father approved 16 Nov 2026)
- Plan, in this order: (1) add a declarative geometry `fig` kind to `src/app.html` (points by coordinates,
  segments, labels, equal-length ticks, angle arcs, right-angle marks, parallel arrows, dashed lines, "?" marker;
  the app places labels) and teach it to `tools/verify.js`; (2) add figures to sets 040–041 (congruence);
  (3) use it for IPST ม.2 เล่ม 2 ch.3–4 in round 2. Science: hand-written SVG for now (an `svg` fig kind, sanitised),
  a circuit/optics kind later when those chapters come. Do (1) in the same Opus session as round 2 when the
  father says "ทำรอบ 2 หนังสือ ม.2 เล่ม 2"; he does not need to repeat this plan.
- Standing rules for every figure: render it to an image (playwright screenshot) and look at it before
  committing; the independent blind check gets the rendered figures too; write "รูปไม่ได้วาดตามสเกล" when it is
  not to scale; every figure has a short text description for read-aloud. Never copy a figure from a book.
  Sample of the agreed style: father saw three samples on 16 Nov (bridge-over-pond, isosceles roof, parallel circuit).

## Assessment and the father's weekly talk (discussed 16–17 Nov 2026)
- Agreed: decide on tutoring from pre-set criteria, not from one February test. Read the problem by kind:
  low time + good retention = load/motivation (fix the schedule first) · enough time + cross-day retry accuracy
  under ~60% = teaching method (add a human explainer) · time and retention fine but exam-style points lost on
  taught topics = depth/technique (targeted tutoring). Split external-mock points into "not taught yet" vs
  "taught but wrong".
- Agreed: a minimum day of ~15 min that still counts. Built 17 Nov (she picks "วันนี้ขอแบบขั้นต่ำ 15 นาที" with a
  reason; a 6–8 question `mini` set lights the flame; the parent page lists minimum days).
- Agreed: "10 minutes with dad" once a week. Each week write a brief in the status doc tab "10 นาทีกับพ่อ":
  at most 3 error patterns (evidence from repeated cross-day mistakes and `optErr`, a hypothesis, a hands-on
  or ask-her-to-explain activity, one check question with its answer), plus what NOT to discuss (untaught topics,
  patterns already improving, our own unclear questions). After he records the talk, give twin questions on those
  patterns 2–3 days later. First brief: 17 Nov. Once he has tried it, add a Sunday step to AUTOMATION.md.
- Checkpoints (approved 17 Nov): short = 45–50 min, ~24 items (science 12 + math 12), on a Sunday in place of
  the lesson; our own unseen, timed, mixed questions on topics taught ≥ 7 days earlier, new contexts not new
  numbers, some "which reasoning is right" items. Full = a recalled paper, 90 min, printed. Dates (avoid school
  exam weeks; father's estimate: midterm 21–24 Dec, final 23–26 Feb): Sun 6 Dec short · Sat 2 Jan full math ·
  Sun 17 Jan short · Sun 31 Jan short · Sat 6 + Sun 7 Feb full science + math → decision ~8–10 Feb.
  Short checkpoints show trend, not readiness (hard rule 6). Science recalled papers: only 2; ask the father for
  more external science papers (O-NET ม.3 science re-send; commercial วมว./MWIT science mock books).
- Level names (approved 17 Nov): เริ่มแล้ว / เข้าใจ / **คงทน** (was "จำได้": understanding still there after
  ≥ 7 days) / ใช้เป็น / พร้อมสอบ. The goal is lasting understanding, never rote memory. Renamed in the app 17 Nov;
  the rule itself was NOT loosened (still checkpoint-right on 3 different days spanning ≥ 14 days, last 2 not missed).
- Understanding over drilling (approved 17 Nov, build all four): (1) "spot the friend's mistake" items built from
  her own wrong answers; (2) predict before computing ("bigger or smaller than before?"); (3) twin questions change
  the situation, not only the numbers; (4) the explain step becomes "pick the right reason from 3" plus a one-line
  own reason on some items only (data: she left the free-text box empty on almost every item).

## Build plan agreed 17 Nov 2026 (do in this order; each is one fresh Opus chat unless noted)
Also approved 17 Nov: (a) **repeated-error loop**: when she misses the same idea on 2 different days → a new
explanation in a different form (table/diagram/real situation, two contrasting cases side by side) → faded worked
examples (full, then last step blank, then two steps blank) → the item goes to the dad brief → she writes a player's
guide for it → "resolved" only after 2 correct answers in different situations ≥ 7 days apart with the right reason
picked. (b) a **misconception list** on the parent page (open / resolved, days open; > 3 weeks open = evidence for
the February decision). (c) the **ratio table** as one tool reused in science and math (scaling by amount, percent,
ratio sharing). (d) **"which method?" items** with no computing (GCD vs LCM, %w/w vs %w/v, mean vs median, …).
(e) a **monthly home experiment** sheet for the father (predict → try → explain), first: saturate salt in 50 g vs
100 g water, and density with a measuring jug.
1. **DONE 17 Nov — Chat "แชท 1" (app):** the four understanding-first changes, (a) loop logic, (b) list, 15-min minimum day,
   checkpoint mode (timed, no hints, results to the parent page), level rename จำได้ → คงทน. Roll out in two waves
   by a date in `calendar.json`: wave 1 at deploy (friend's-mistake, predict, situation-changing twins), wave 2 seven
   days later (pick-the-reason explain step). Update `tools/verify.js` for every new item field. Publish parent page.
   Built as: `calendar.json` `understand` {wave1 2026-11-17, wave2 2026-11-24}, `minDay`, `checkpoints` (setIds
   cp-1..cp-3); item fields `friend`, `predict`, `sit`, variant `change`/`sit`, `check` after wrong answers (wave 2);
   loop logic `miscState` (misses on 2 days, ignoring slip/read/misopt/calc/unclear) and the parent list (tab
   ความพร้อมสอบ); checkpoint mode (clock stops on pause, pauses recorded); parent form for printed-paper scores
   (db collection `parentlog`, kinds `mock`, `dadtalk`). Field reference: `docs/writing-content.md` "Understanding first".
   `tools/verify.js` now also plays each new feature on made-up test items in the browser (~4 min in total).
2. **DONE 17 Nov — Chat "แชท 2" (content):** built as: sets `044 tool-ratio-table-1` (ratio-table lesson, spell m3),
   `045 fix-sci-1`, `046 fix-math-1` (repair lessons: friend's-mistake, which-method, predict, 3-reason `check` with `sit`
   for every open subtopic), `047 cp-1` (checkpoint, 24 items, no `check`/hints so the loop never serves them early);
   `reteach.json` cards for the 9 subtopics open on 17 Nov (s4.2 s4.6 s4.1 s2.3 s2.2 s14.5 m22.7 m22.11 m15.2);
   12 situation twins (`added` 2026-11-17); home experiment sheet 1 = tab "ทดลองที่บ้าน 1" in the status doc (monthly
   sheets live there as new tabs, one per month). Original plan text: ratio-table concept card, friend's-mistake and which-method items from her current
   repeated errors, home experiment sheet 1, checkpoint 1 (24 items, Sun 6 Dec) — all with the blind answer check.
   Also, because the loop needs content to run: a `reteach.json` card for each open misconception on the parent page
   (they show "ยังไม่มีคำอธิบายแบบใหม่ในคลัง"), ≥ 2 questions with a 3-reason `check` in different situations (`sit`)
   for each open subtopic, situation twins (`change:"situation"`) for her repeated misses, a few `predict` items.
2b. **DONE 17 Nov — Chat "แชท 3" (app, from her feedback that day):** (i) **สมุดคาถา** library: "📖 ไปอ่านเรื่องนี้"
   on every wrong answer and a home entry; a card per subtopic in `content/library.json` (first: s3.3 Rf), fallback =
   the lesson's summary card; parent page logs what she opened and which subtopics still lack a card. (ii) "สอนใหม่อีกแบบ"
   shown one paragraph per screen with a tap per screen, then the whole card on one page. (iii) 2 **try-it** questions
   after every explanation (loop and library), score shown to her at once. Field reference: `docs/writing-content.md`.
   Agreed reasoning: chunk explanations (the goal is understanding), but never chunk exam-style questions or passages;
   train long reading separately and measure it (passage sets are still undone; item `len` is logged, so compare
   accuracy on long vs short items of the same topic before calling it a reading problem). Immediate try-it success
   is short-term; it never resolves a misconception (the ≥ 7-day checks still do).
2c. **Next content chat (Opus, no computer needed):** library cards for the subtopics she has missed (start from the
   parent page list "เรื่องที่น้องเปิดแต่ยังไม่มีการ์ดเฉพาะ" and the misconception list), `tap` on the paragraphs of the 9
   reteach cards, `opts` on every blank worked step, fix the glossary entry "ตำแหน่ง" (statistics meaning shows in
   science text); blind check for all of it.
2d. **Teaching audit, 17 Nov late (father asked after the Rf case; proposals WAIT for his choice in the status doc):**
   measured by scripts over `content/`: (1) the right option is the longest one in 92% of `check`
   reasons in sets and 95% in `variants.json` (chance 33%), 61% of text-option questions (chance 25%), 63% of reteach
   taps/blank steps, so "picked the right reason" (which the misconception "resolved" rule relies on) can be gamed by
   length; (2) 19 of 32 lessons (all written 4–12 Nov, no `hook`, no `more`) open with a formula or procedure before
   saying what the idea is for (e.g. 001 starts with "ตำแหน่งมัธยฐาน = (n+1)÷2"); density never had its own lesson;
   Rf was one clause of a 5-point card; (3) only ~1 in 10 question stems asks what a number means, why, or which
   method; (4) a reteach card (s2.2) was finished in 24 s with 3/3 blanks right: speed shows it was not read, and the
   blanks are recognisable. Proposed fixes (see the chat of 17 Nov late): balance option lengths + a verify.js rule;
   a "meaning" item and a "which method" item per formula subtopic, `ex` opens with what the number means; retrofit
   the 19 old lessons (hook, meaning point before the formula, `more`) by error priority; pair compute + meaning
   items so the parent page can flag "ใช้สูตรได้แต่ไม่เข้าใจ"; flag cards finished faster than they can be read;
   a "อธิบายโดยไม่ใช้สูตร" question in every dad brief. **Father approved all six, 17 Nov.** Mapped to the front-page
   queue: คิว 1 = (1) option lengths + verify rule, (2) meaning + which-method items, `ex` meaning-first, plus 2c ·
   คิว 2 = item 4 below (after his first dad talk; keep the "อธิบายโดยไม่ใช้สูตร" questions in every brief — week 1
   already has two) · คิว 3 = app: (3) compute/meaning pair flag + (5) too-fast card flag · คิว 4 = item 3 (รอบ 2) ·
   คิว 5 = (4) retrofit the 19 old lessons by error priority · คิว 6 = read checkpoint 1 results (6–7 Dec, Sonnet).
3. **Chat "รอบ 2" (needs the chat linked to his computer):** IPST ม.2 เล่ม 2 round 2 + geometry `fig` kind (plan above).
4. **Sonnet chat after his first dad talk (~Sun 22 Nov):** read his notes in the "10 นาทีกับพ่อ" tab, twin questions
   for those patterns, week-2 brief, then add the Sunday dad-brief step to AUTOMATION.md.

## Which model for which work (agreed with the father, 12 Nov 2026, Pro plan = limited usage)
- **Opus** (newest) for: writing new sets with keys and explanations, reading books to decide what the exam needs,
  large changes to `src/app.html`. A wrong key or wrong explanation teaches her something false.
- **Sonnet** for routine: build/verify, small fixes, file inventory, publishing, status doc, reading text PDFs,
  the nightly run, the independent blind check.
- Cost habits: open a fresh chat per work session (see below); do not re-read big files "just in case"; large
  reads and fan-outs need the father's OK first and a one-line cost warning.
- Check what a night cost: father's Settings > Usage. Anthropic publishes no per-model multiplier for Pro.

## When the father should open a new chat
Not by topic. Every chat here is the same project. Open a new one at a **handoff point**: the last thing he asked
for is finished, reported and committed, and the next thing is a new request. Rule of thumb: about one chat per
working session or per batch of requests, and always after the chat has been summarised once (the first lines of
the chat say "continued from a previous conversation"). Because state lives in this file and the status doc, a
fresh chat loses nothing. If a chat ever ends mid-task, the status doc's "งานถัดไปของผม" says where to resume.

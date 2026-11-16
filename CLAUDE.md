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
  contains its content, then publish again).

## Map of the repo
- `src/app.html` the app (only edit when the father asks for an app change; the nightly run never edits it)
- `content/` everything the app teaches: `sets/*.json` (lessons, sweeps, mixed, passages, probes), `vocab.json`,
  `phonics.json`, `challenges.json`, `variants.json` (twin questions), `calendar.json` (`lessonQueue`, exam dates),
  `curriculum.json` (51 spells, ~243 subtopics) + `qtags.json` (every question id → subtopic; keep complete)
- `tools/` build and verify (nightly run never edits)
- `AUTOMATION.md` the lean nightly runbook; `docs/*.md` topic notes it points to (read only when needed)
- `content/school-plan.md`, `content/exam-analysis.md` what the school teaches now and what the real exam asks

## Where the live status is
- Father's status doc (Claude Docs, Thai): https://claude.ai/artifact/4kHsdKcNKfudfYGiyqbRQx
  (project id `1e56cbde-7272-43ad-9beb-270fb7f5f0dd`). Read it at the start of any session: it holds what the father
  must provide, decisions waiting, current numbers and the log of recent work. He edits it; his edits win.
- Parent page (private artifact): https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR holds her results and his approvals.
- Student page: GitHub Pages of the repo `pitiwut-tee/fieldnote`.

## Starting a new chat (for any session that is not the nightly run)
1. Attach the repo (`add_repo pitiwut-tee/fieldnote`, access push), clone it, register it, read this file.
2. Read the status doc above. Do the task the father names. Do not re-explain the project to him.
3. His folders on `D:\Krunee` and `D:\เตรียมม.ปลาย` are reachable only if the chat is linked to his computer.
   Most PDFs there are scans; view them as images. Staged copies are snapshots.
4. At the end: update the status doc (date chip, numbers, one row of "ทำเสร็จล่าสุด"), and if you learned a new
   standing rule, write it into the right file here, not just into the chat.

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
- Agreed: a minimum day of ~15 min that still counts (app change; not built yet, needs an Opus session).
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
  ≥ 7 days) / ใช้เป็น / พร้อมสอบ. The goal is lasting understanding, never rote memory.
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
1. **Chat "แชท 1" (app):** the four understanding-first changes, (a) loop logic, (b) list, 15-min minimum day,
   checkpoint mode (timed, no hints, results to the parent page), level rename จำได้ → คงทน. Roll out in two waves
   by a date in `calendar.json`: wave 1 at deploy (friend's-mistake, predict, situation-changing twins), wave 2 seven
   days later (pick-the-reason explain step). Update `tools/verify.js` for every new item field. Publish parent page.
2. **Chat "แชท 2" (content):** ratio-table concept card, friend's-mistake and which-method items from her current
   repeated errors, home experiment sheet 1, checkpoint 1 (24 items, Sun 6 Dec) — all with the blind answer check.
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

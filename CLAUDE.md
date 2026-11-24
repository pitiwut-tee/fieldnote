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
3. The chemistry e-books (ID-Book 3121/3122/3123, from a course the student took) carry the student's name as a diagonal
   watermark. Father clarified 19 Nov 2026: reading these files is ALLOWED (topics, problem styles, difficulty); what is
   forbidden is writing that name, or any trace of it, into the public repo, a commit or a figure. Rule 2 still applies
   (no copied questions). Never use real character, brand, game or band names (use the feel only).
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

## Focus until 31 Dec 2026 (father, 24 Nov 2026) — check EVERY decision against this, and warn him when a request drifts
Do not plan for the entrance exam yet. December is a trial to decide, in a first pass, whether this system really helps her learn.
Only two goals count until then:
- **G1 midterm:** she walks into the school midterm (**Mon 14 – Thu 17 Dec 2026**, school schedule the father got 24 Nov evening;
  was estimated 21–25 Dec) ready and confident, on the school's scope (content/midterm-plan.md, section "24 Nov: midterm moved").
  Final exam Tue 23 – Fri 26 Feb 2027.
  **Father chose plan ก (24 Nov 19:33):** lessons run to Tue 8 Dec, prep week Wed 9 – Sun 13 Dec (`prepDays` 5 on the midterm),
  cp-1 Sun 6 Dec, mock Thu 10 Dec (holiday), repair 11–13 Dec; construction lesson ~8 Dec if the school tests it, else
  math-parallel-2; meaning-sci-1, meaning-math-1, tool-ratio-table-1 after the midterm.
- **G2 real understanding:** find, by trying and measuring, how she learns well with the app, and adapt it so that understanding
  actually comes from using it (talk cards, worksheet page, level-1 gate, her taps and ratings, her own words).
Decision filter for any new work, request or nightly writing: does it serve G1 or G2 before 31 Dec? If not, it goes to the backup
tab "คิวสำรอง (หลัง ธ.ค.)" in the status doc, not into the queue. If the father asks for something exam-oriented, do it if he insists,
but first say in one line that it is outside the December focus. Evidence for G2 is her behaviour and words (ratings, taps, peeks,
cross-day retries on taught midterm topics, what she says), not our bank accuracy alone (hard rule 6); the school midterm is the
only outside measure. End-of-December first decision (queue row, ~26–31 Dec): go on / adapt / change method, judged against
criteria agreed in advance (draft on the front page ④, 24 Nov; once he approves, copy them here).
Backed up on 24 Nov (in the backup tab, with reasons): exam-source readings, ID-Books 3121/3123, post-midterm lesson writing, IPST
round 2 part 2, checkpoints 2–3, sweep low-data picking, second lesson a day, the final-term documents deadline, external exam
papers, P6 reading track, P7 voice, the Cloudflare move. **The weekly "10 minutes with dad" is paused** (father: she should first
learn through the new explanations); the tab stays. Fallback: if she rates a talk card "ยังงง" twice in a row, the nightly run asks
the father (front page ③ "พ่อควรทำ") to explain that one point aloud, since a person explaining is the channel she says works.
Six already-written post-midterm lessons stay at the end of `lessonQueue` (ratio ×3, number theory, motion, body), so a
"go on" decision in late December has ~6 school days of lessons before new writing is needed.
**Father's decisions 24 Nov 08:30.** (ก) APPROVED, front-page queue 1 (Opus): a "📖 อ่านคำอธิบาย" button that opens the
spoken-style `talk` card of the lesson teaching the item's subtopic (fallback: the current library/concept card) in carried
warm-ups, daily mistake review, repair sets and sweeps; shown after a wrong answer AND after a right answer that was guessed,
unsure, or had a wrong/own reason; before answering only on carried "ต่อจากบทก่อน" items (counted like `peek`: no คงทน credit);
sweeps and the mistake review stay answer-first (the unaided answer is the G2 evidence). Log the open and whether the next item
of the same subtopic is right. Also write `talk` cards backwards for the ~10 taught midterm lessons (math-dotplot-1,
sci-solution-1, math-stats-4, sci-solution-2, math-stats-3, sci-separation-1, sci-solution-7, math-stats-1, sci-separation-3,
math-parallel-1), most-missed subtopics first: 3–4 in that chat, then the nightly run one a night after its next-3 rule.
(ข) APPROVED end-of-December criteria, "go on" if most hold: (1) she says herself the new cards/system help her understand and
does not ask to go back to the book alone; (2) talk-card ratings in December: "เข้าใจ" ≥ half, "ยังงง" ≤ 1 in 5, new chosen over
old more often; (3) lesson level 2–3 accuracy since 23 Nov above the old 62/54% (aim ~70%); (4) midterm-topic items answered
≥ 7 days after teaching (cp-1, the mock, warm-ups/sweeps) right ≥ ~65%; (5) she says she walked into the midterm confident, plus
the real score when known (may come after December). Mixed reading: 3–4 pass but 1–2 fail = practice works but first teaching
should come from the book or a person (adapt toward P1/P3); 3–4 fail = change method or add a human explainer. Numbers 2–4 come
from our own questions: a learning trend, never exam readiness (hard rule 6).
**APPROVED 24 Nov 08:37 (front page ④ ง, จ; father: "ลุยเลย", then watch her feedback):** ง = one job per mission: lesson mission keeps only its own 2–3 warm items; carried items
become their own mission "ฝึกต่อจากบทก่อน"; the warm-up's retry-mistake and loop-check items move to the mistake review; the
warm-up's spaced/checkpoint items move into the sweep, which in December draws unseen items from midterm subtopics taught
≥ 7 days earlier (pool = lesson items the gate deferred/dropped, twins; no new writing at first). Answers the father's worry
that a midterm sweep repeats the mistake review: the review re-asks the exact missed items (fix), the sweep asks unseen items
(does understanding last). จ = keep the sweep lock; in December drop the time-gap size for a fixed size (school 6, holiday 10)
so weeks compare; days under 45 min are then reported as facts, alert only on < 25 min 3 days running. Build ก+ง+จ in ONE
chat = front-page queue 1 (Opus, no computer). Build notes: switch on by a date in `calendar.json` (a school day she has not
started; never mid-day), so verify.js can test both sides; keep each moved item's flags (`_chk`, `_loop`, `_retry`, `carry`)
so `spellStats`, `miscState`, `checkPlan`, `reviewPool` and the parent cards keep reading them; new mission key for the carried
items (home card, expedition stop, resume slot, flame/map-piece counting); the December sweep pool = midterm subtopics
(`currentSpells`) whose lesson she did ≥ 7 days ago, items she has never answered (gate-dropped/deferred lesson items, twins),
one per subtopic, oldest-taught first, fall back to the old sweep bank when short; the explanation button logs opens and the
next same-subtopic result; parent page shows both; publish the parent page; tell the father what she will see (one line for ③).
**BUILT 24 Nov 09:00 (front-page queue 1; father asked to switch on the SAME day, 24 Nov, because she only uses the app in the
evening):** `calendar.json` "december" {from 2026-11-24, to 2026-12-31, sweepSchool 6, minAge 7}; app.html `DEC`, `splitOn`, `decOn`.
(ง) `startSet` serves no due/chk/retry/loop/carry warm-up items from `DEC.from`; `startCarry` = mission key `carry` (record type
`carry`, in LESSON_TYPES, resume slot `carry`, home card `#carry-go`, expedition stop 🧩, flame via `carryOk`, not a lesson unit);
`startReview` (daily + repair) adds 1 `loopChecks` item; `reviewDueToday` also counts a due loop check. (จ) `sweepPlan` fixed size
in December (`fixed`, record `sweepFixed`, `sweepMid`); `decSweepSteps` = `checkPlan` ≤ 2 (chk) + `dueQuestions` 1 (due) +
`decSweepPool` (unseen items of lessons in `currentSpells` done ≥ minAge days ago, never her seen items or still-carried items,
one per subtopic, least recently swept then oldest taught, level 2 → 3 → 1; items `mid:true`) + old bank. (ก) `explSource`
(own lesson's talk card → a done lesson teaching the subtopic with a talk card → library → own lesson card), `explOn`
(review modes except comp, and carried steps), `explAfterHtml` (after wrong / guessed / unsure / wrong or own reason),
`explBefore` (carried items only, counts as `peek`), item fields `expl`, `explWhen`, `explSrc`. Parent card `decCard`
("ระบบ ธ.ค."): per day minutes (⚠ < 25), carried, loop checks, sweep (mid / chk), criterion 4, 📖 opens and the next
same-subtopic result vs wrong-without-opening. verify.js test "December: carried items are their own mission ...".
Talk cards written the same chat (most-missed midterm lessons from the parent db): sci-separation-3 (Rf, tower, steam, still),
sci-solution-1 (solvent: state first, then amount), sci-solution-2 (saturated, scaling by water, crystals in two steps),
math-parallel-1 (Z / C / F with 62°/118° figures, zigzag); remaining six are nightly, one a night (AUTOMATION.md).

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
  Since 24 Nov also **คิวสำรอง (หลัง ธ.ค.)** (tab id `3eeff4a8-2539`): work parked by the December focus, with why and when.
- Parent page (private artifact): https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR holds her results and his approvals.
- Student page: GitHub Pages of the repo `pitiwut-tee/fieldnote`.

## Starting a new chat (for any session that is not the nightly run)
1. Attach the repo (`add_repo pitiwut-tee/fieldnote`, access push), clone it, register it, read this file.
2. Read the status doc above. Do the task the father names. Do not re-explain the project to him.
   "ทำคิวที่ N ในหน้าแรกของพ่อ" = the row N of ② in tab หน้าแรกของพ่อ; its details are in "Build plan" below.
3. His folders on `D:\Krunee` and `D:\เตรียมม.ปลาย` are reachable only if the chat is linked to his computer.
   Most PDFs there are scans; view them as images. Staged copies are snapshots. Cheapest readable way (tested 19 Nov
   on ID-Book 3122): `pdftoppm -scale-to 1100 -jpeg`, paste two pages side by side into one image (~1550×1100), one
   Read per spread = half the images of page-by-page; Thai body text and tables stay readable. Keep working notes
   outside the repo (/home/claude/work), then write only the summary into the repo.
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

## Letters answer questions the student can still see (rule from 22 Nov 2026)
She does not remember which question she typed about (sweeps are 10–15 items, the letter comes the next day), so a
letter that only explains the idea leaves her unable to follow it. Every answer in a letter must carry, in the letter
text itself: the question stem (copy our own question text), her typed words in quotes, then the answer. Give the
final answer of a "try it yourself" item at the end of the letter. Find her questions in the parent db
(`attempts` docs, field `confused[]`: `qid`, `prompt`, `ask`) and answer every one; answer the typed `ask`, not a
nearby note (the first 22 Nov letter answered the "solvent" note from 20 Nov and missed the typed "ไม่รู้คำอังกฤษ" on
sepp5~v1). **Father approved 22 Nov ("ทำ") → front-page queue 3 (Opus, no computer, before 29 Nov):**
(1) letters may carry `replies:[{qid, ask?, text}]`; the app shows, per reply, the question stem + its figure (existing
`geo`/`svg` renderers) + her typed words above the answer (qid is looked up in sets, `variants.json`, sweeps; if not
found fall back to the plain `text`); keep the plain `text` field working for old letters. (2) a "คำถามของฉัน" page
(home entry like the library): lists every `confused[]` entry with an `ask` from her own progress, each with the
question, her words and the letter reply when one exists (match by qid + ask). **BUILT 24 Nov (queue 2):** `letterBody`/`replyHtml`
(`replies`, `end`; options shown in hashed order, never stored order), `renderMyQ` (view "myq"; entry on home under the library
line and inside the library list), matching by qid + ask (`replyFor`); letter 24 Nov rewritten in the new form; format rules in
docs/features-and-companion.md "Letters"; verify.js tests "letter replies ..." and "คำถามของฉัน ...". Parent page shows the
letters with their replies (no open-logging added).
**Tap-through fix 24 Nov (queue 2b):** after any sheet closes, clicks outside a sheet are ignored for 600 ms (`tapGuardUntil`,
`SHEET_GUARD_MS`); a sheet's backdrop ignores taps in its first 600 ms; "🤔 ยังคิดไม่ออก ดูเฉลย" tapped within 4 s of a question
appearing asks once more (`DK_CONFIRM_MS`, item `dkAsk`). verify.js sets `window.__noTapGuard` for the generic player and has its
own guard test. The 📖 / hints / "ยังคิดไม่ออก" are hidden during a predict step **by design** (predict = a gut guess before any
help); a line under the predict options now tells her they appear after she guesses. Add `tools/verify.js` checks (a reply with a qid renders the stem and figure;
unknown qid falls back); parent page change only if the page logs opens (optional).
**Added 22 Nov (father: the Z/C words alone were not visualisable, he and she were both lost):** a letter reply must be
able to carry a figure too (`fig` in the reply, same `geo`/`svg` kinds). Sample for the ladder question (fxmp6): `docs/zc-ladder.svg`
(Z = equal 65°/65°, C = 115° + 65° = 180°; Thai labels, rendered and looked at). Rule for letters: whenever an answer
says "imagine a shape" (Z, C, angle pairs, graphs), give a figure, never words alone; until queue 3 exists, send the
figure to the father as an image in the chat so he can show it to her.

## Student feedback 22 Nov 2026: "สมุดคาถา understands less than a textbook + exercises" (father: very important)
Said by the student unprompted; the father drew out two reasons. Treat as design evidence, not as a mood.
(1) **Too few basic items before the jump.** A new lesson = one concept card + ~3 level-1 items, then level 2 starts at
item 4 and level 3 by item 7–8 (measured 22 Nov over 37 lessons: median 8 practice items, median 3 level-1, level 2 at
item 4; even the 13–14-item retrofits kept 3 level-1 and added level 2–3). Her accuracy L1/L2/L3 = 85/62/54%. A book
gives a worked example then many graded drill items of one kind; we gave retrieval/spacing/understanding checks on top of
a thin first learning, and the retrieval layer has little to retrieve. Design error on our side (mine), not her effort.
(2) **No way back to the explanation while working.** In a question she has only hints; "📖 ไปอ่านเรื่องนี้" appears only
after a wrong answer, and only through the subtopic library card (fallback: lesson summary). She cannot open the formula or
the lesson card before answering, as she would flip back a page in a book.
Fixes proposed to the father (front page ④, waiting for his choice; do not build the big parts before he chooses):
(A) a "📖 ดูเนื้อหา/สูตร" button on every lesson question that opens the lesson's concept card as an overlay without
leaving the question, logs `peek`, never blocks; a peeked item still counts as practice but, like a hint, cannot resolve a
misconception or count toward "คงทน"; checkpoints and spaced checks keep it off. (B) acquisition before retrieval: every
lesson = concept card → 1–2 fully worked examples → **≥ 6 graded level-1 items of the same kind, answered with the card
one tap away** → level 2 → level 3, so level 2 starts at item ~8, not 4; the extra minutes (~4–6 per lesson) also close the
daily-time gap, so this replaces the "second lesson a day" idea (use depth, not breadth). (C) optional later: a mastery gate
("4 of the last 5 right") instead of a fixed count. Spacing, loop, sweep and checkpoints stay as the retention layer.
Interim rule (AUTOMATION.md, 22 Nov): until he chooses, the nightly run adds level-1 items first. This is also a data point
for the February "teaching method vs depth" decision: log what changes after (B).

**Father's decision 22 Nov 23:56 and the learning-science basis.** He agreed A+B and asked whether 6 level-1 items are enough and
whether level 2-3 should come on day 1. Research (Sweller/Kalyuga worked-example + expertise reversal; Rosenshine ~80% success in guided
practice; Wilson 2019 "85% rule", derived for machines/perception so only a hint for a child; Bjork desirable difficulties; mastery learning ~7
opportunities per skill on average, 3 in a row as a usual threshold) says: novices need examples and many successful easy items first; difficulty only
helps if she can overcome it (her L2/L3 = 62/54% is below the ~80-85% range); interleaving/spacing come after acquisition. So 6 is a floor, not a constant:
target = a mastery gate ("4 of the last 5 right", cap ~12 level-1 items), day 1 only 2-3 level-2 items as a readiness check, level 3 on later days
(spaced / sweeps / checkpoints). **Content side starts 23 Nov** (nightly writes level-1 first, see AUTOMATION.md; fix-sci-1 and math-congruence-1 already
have 6); **app side** (peek button, mastery gate) is a front-page queue row, not tied to 27 Nov. Measure after: level-1 items needed to reach the gate,
L2/L3 accuracy vs 62/54%, and whether peeks fall over time.
**App side BUILT 23 Nov (front-page queue 2, commit after 9d4b828):** settings in `calendar.json` `gate` (read as `GATE` in app.html).
(A) "📖 ดูเนื้อหา/สูตร" (`canPeek`, `peekCard`): only on a lesson's own practice items (phase "ฝึกทำ") before answering; overlay of the
concept summary (points + figs + formulas + vocab); item gets `peek:n`, record gets `peeks`; `chkOk`, `spellStats` and the
misconception check ignore peeked answers (no คงทน / tier / resolve credit); it still counts as practice and toward the gate.
(B) gate (`gateEligible`, `gateApply`): applies from 2026-11-23 to a lesson she has never done that has **>= 6 level-1 items**
(fewer → old behaviour; the nightly run is filling them in queue order). Practice is served level 1 first (stable sort); after each
level-1 answer: pass = >= 6 answered and 4 of the last 5 right (right = correct, not guessed, not full hint, not "don't know"); stop
also at 12 (cap) or when level 1 runs out. Then 3 level-2 items stay (2 if not passed); unused level-1 items are dropped; the other
level-2, every level-3 and a level-3 challenge are trimmed (`gated`) and listed in the record's `gate.deferred`. A moved explain step
goes to the last kept level-2 item. She sees one short note (no guilt). Deferred items come back as lesson warm-up "ต่อจากบทก่อน"
(`carryQuestions`, `dueIds` prefix `g:`, item `carry:true`, no peek), up to 6 a lesson day, oldest lesson first, lower level first,
dropped after 14 days (a lesson like fix-sci-1 defers 12, so not all come back: they stay in the bank for twins/sweeps).
Resume keeps the trimming. Parent page card "บทเรียนแบบพื้นฐานก่อน" (tab with the readiness pane): per lesson level-1 used,
result, day-1 level-2, peeks, deferred; level-2/3 accuracy since 23 Nov vs 62/54%; carried items done. verify.js test
"level-1 gate, carried items and the 📖 peek button". **Effect on time:** a gated day-1 lesson is shorter than the old full
lesson (e.g. fix-sci-1: 9 practice items instead of 20) while carried items add up to 6 to the next lessons' warm-ups; the nightly
time report must watch whether weekday minutes drop, and say so on the front page. Worked examples (B's "1–2 fully worked
examples") are content: not built in the app; the concept card/`ex` carry them for now.

## Student feedback 23 Nov 2026 (second round): "can I read the book and use the app only for exercises?" (WAITING for father)
She could not say why on her own; the father drew it out with yes/no questions, so treat each reason as a lead, not a finding.
Teaching text: (1) no pictures, she cannot see it in her head; (2) our wording "feels like AI" and is hard to read alone;
(3) she understands when a person explains aloud; read-aloud (TTS) does not help (not a human voice, just the text read out);
(4) long text on an iPad screen tires her more than a paper book. Practice: (5) 6 level-1 items still do not feel like
understanding; (6) a book shows the whole page of exercises and she chooses the order; the app forces one item at a time.
Father's dilemma: adapting fully may weaken reading further; not adapting leaves the system unfit.
Measured 23 Nov: concept `points` median 134 characters (max 319), several facts per point joined by "·"; median 4 `more`
analogies per card, each a different picture; 8 of 42 lessons have any concept figure, 2 of 17 science lessons.
Proposed principle (sent to the father in chat 23 Nov night): **adapt how we teach, not what she must read in the exam**.
First learning goes through her strong channel (paper book + spoken-style text with a figure, or the father/school);
exam-style stems stay long; reading is trained as its own measured track on paper. Proposals (none built, he chooses):
P1 book-first lessons: the lesson card points to pages of HER school book (page numbers only, never copied text) + a short
spoken-style summary with a figure; P2 worksheet view for lesson practice (whole page visible, any order, skip and come back,
level-2 section opens after the level-1 gate); P3 "ทำจากหนังสือ" log card (book, pages, done, wrong, the item she could not do
typed in her words → letter answers it; counts toward the day); P4 writing rule for every teaching text (one idea per screen,
short sentences, example before rule, one analogy not five, figure whenever she must imagine something, read it aloud: if
the father would say it differently, rewrite); P5 "แตะประโยคที่งง" on explanation screens so "AI language" becomes data;
P6 a separate reading track (10 min a day of a paper book she chooses, read aloud to him sometimes); P7 better voice later
(spoken-style script + the iPad's best Thai voice), low priority. Suggested first step: show her two versions of one card
(current vs rewritten with a figure) and let her choose: comparing is easier for her than explaining.
**Father's decision 24 Nov 00:16:** no big rebuild; adapt step by step and collect her feedback daily (she agreed: if the
adapted system still does not help, then switch method). Start with the two-version card + tap-to-mark (P5), P4 and P2.
**BUILT 24 Nov (commit 17ee09b, parent page published):** `concept.talk` spoken-style cards (`renderTalk`, rules in
docs/writing-content.md "Spoken-style cards"): hook → one screen per tap, every line tappable "งง" (`talk.marks`) → rating
screen (เข้าใจ/เข้าใจบางส่วน/ยังงง, open the old card, which is easier, optional note) → formulas + vocab; 📖 peek shows the talk
card; record `talk`; parent card "การ์ดอธิบายแบบภาษาพูด". Written for math-congruence-1 (24 Nov) and sci-separation-4 (25 Nov,
new crystallisation + distillation svg figures). Worksheet page (`renderWorksheet`, `wsPick`, `wsSkip`, `CAL.worksheet.from`
default 2026-11-24): practice items of a lesson as a page, pick any, "📄 ดูทั้งหน้า / ข้ามข้อนี้ไปก่อน" on each item, level 2
locked until the gate; picking swaps steps so gate/legs/explain still work; resume keeps `ord`, perms saved by `_k`; record `ws`.
verify.js tests for both. Nightly run (AUTOMATION.md, end): keep the next 3 lessons with `talk`, rewrite tapped sentences, report
the ratings in ③. Not built yet: P1 (book pages), P3 (book log), P6 reading track, P7 voice; P5 only on talk cards so far
(not yet on reteach/library cards).

## Father's feedback round 24 Nov 2026 night (first evening of the new system; BUILT the same night)
What she and he reported, and what was done (app.html; verify.js test "feedback 24 Nov night" + the rewritten worksheet/library tests):
- **Worksheet = one page.** Tapping into an item and back out felt odd, and item order moved after coming back (picking swapped steps).
  Now the lesson practice is ONE page in fixed order (ข้อ 1, 2, 3 … by `_n`): the current item is the full card in place, other items
  show stem/figure/options read-only (tap to do one next; an unanswered current item is logged in `ws.skips`), done items stay with
  their result and a folded explanation, level 2 locked until the gate (`wsPageHtml`, `bindWsPage`, `wsAll`; handlers scoped by `QA`).
- **Re-reading = a book, not a lesson.** In the carried mission she opened 📖 five times on one item (fxsp7, 6.5 min) and the library
  stepped her through the whole card each time; and the library showed the OLD summary even where a talk card exists (cg1p4/cg1p5 →
  concept:math-congruence-1). Now every re-read (📖 peek, 📖 อ่านคำอธิบาย, library from a question or the list) is one scrollable page:
  formula box, headings to jump to, numbered section boxes (`bookOf`, `bookHtml`, `bookSheet`, library mode "book"; try-it is an
  optional button). `libSource` prefers a talk card over the old summary. A library source from a question opens as an overlay
  and saves a `lib` record with `book:true` on close. First learning (lesson talk card) keeps its screen-per-tap flow (her taps and
  rating there are G2 evidence) but now shows each screen's heading `h`. Headings added to all 35 talk screens and 21 library steps.
- **Structured text** (`richText`) and worked solutions with every step visible at once (she opened all steps anyway; `exLeft` is off).
- **Dark theme** (she always uses iPad dark mode): the tapped-sentence mark was light yellow under white text (unreadable); now theme
  colours. SVG figures with fixed white/#333 paint are drawn on a light panel (`figlight`). Check every new colour in dark mode.
- **Small fixes:** own-reason button removed after a WRONG answer (it duplicated "พลาดเพราะอะไร → อื่นๆ"; kept after a right answer);
  "ขวด P: …" stem lines keep their label (`qLines`); vocab "sound is not playing" false alarm (short word ended before the 2.5 s check,
  iPad does not always fire onstart: any sign of life counts, help needs 2 misses; the new word is read out on entry and counts as heard);
  review: pd10 opened every review since 8 Nov (right 5 times, always by a fast uncover, so never cleared, and oldest first) → plainly
  right on 3 different days clears an item, and items served in the last review go to the back; parent page tab bars wrap instead of
  scrolling off-screen; a `lib` record no longer counts as the day's lesson unit (it did).
- **Daily volume:** 24 Nov (school day) was ~87 active min (lesson 43 incl. 16 on the card, carried 13, review 10, sweep 11.5, vocab 5.5,
  library ~4) against 45–60. calendar.json `december`: school days carry 4 (was 6), review 4 + 1 loop check (was 6), sweep 5 (was 6);
  holidays unchanged. Starting point, not final: judge with the first week's minutes (front-page queue 1).

## Reason check: "none of these fits" (22 Nov 2026, built)
After a right or wrong answer on an item with `check`, she can tap "✍️ วิธีคิดของฉันไม่ตรงกับข้อไหนเลย" and write her own
reason BEFORE the explanation shows (so it is not contaminated). Stored on the item as `checkNone:true` and `checkOwn`
(≤ 300 chars); never scored as a right/wrong option (`checkOk` stays unset), so it cannot resolve a misconception, and
the item comes back like a guess. The parent page shows her last three own reasons. Read them in every weekly brief and
nightly run: a recurring own reason means our option set is missing a real way of thinking, so add it to `check.opts`.

## Unfinished sessions (fixed 22 Nov 2026)
Only mode "set" (lessons, mixed, passages) was saved; sweep, daily review, repair, recall and mini (mode "review")
restarted from item 1 after a reload or a phone killing the tab. Now each kind has its own localStorage slot
(`fieldnote.inprogress.rv.<kind>`, same day only), a home card "ทำ … ค้างไว้" with ทำต่อ / เริ่มใหม่แทน, and starting that
mission again resumes it. The clock resumes from the time already spent, so hours away do not count as study time.
**Study time = active time (fixed 22 Nov 2026, father's request).** Wall-clock `now-start` counted hours when she swiped
Safari away or left a tab open. Now `ACT` clock in app.html: time counts only while the page is visible and was touched
(gaps capped at 5 min); `sessSec()`/`actNow()` replace wall-clock; resume restores elapsed active time (`el`);
new records carry `actSec`. Old records are wall-clock: `recSec(a)` uses `actSec`, else trims records whose duration
exceeds 2x the answered-items estimate (+180 s). Always read minutes through `recSec`, never raw `durationSec`.
Test: verify.js "study time is active time".

## Figures in questions (father approved 16 Nov 2026)
- **(1) DONE 18 Nov:** `geo` and `svg` fig kinds in `src/app.html` (`geoFig`, `svgFig`), `concept.figs` (a figure
  under a lesson point), checks in `tools/verify.js`; field reference in docs/writing-content.md "Figures".
  **(3) DONE 18 Nov:** sets 050–052 from IPST ม.2 เล่ม 2 ch.3–4, every question with a figure.
  **(2) DONE 18 Nov (front-page queue 1):** sets 040–041 have a figure on 19 questions and concept figs on 8 lesson
  points, plus a new trap-pair item `cg2p9` ("เท่ากันจริงไหม": equal-looking triangles, 7 cm side not corresponding;
  midterm-plan impact (4)). Generator kept outside the repo; approach = compute points, assert the stated angles.
  A circuit/optics kind may come later when those chapters come; until then science uses `svg`.
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
  Brief-writing rules (father, 21 Nov): (i) never ask him or her to recall something from the data: quote her own
  words in the brief (player's guides are `type:"studio"`, `act:"rewrite"`, `answer`), with the date and question;
  (ii) "explain without the formula" questions are concrete situations she answers aloud ("pour 70 g into 100 g of
  water that holds 60 g at most: what do you see?"), never "what does the number 60 tell us?" (too open: he could
  not answer it himself); give the good answer and what a wrong answer reveals.
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
   a "อธิบายโดยไม่ใช้สูตร" question in every dad brief. **Father approved all six, 17 Nov.**
   **DONE 17 Nov late (old คิว 1):** (1) option lengths rebalanced in all content + verify rule (docs/writing-content.md
   "Option length"); (2) `ask:"meaning"|"method"` items, sets 048 `meaning-sci-1` and 049 `meaning-math-1` (in
   `lessonQueue` after fix-math-1 and math-congruence-1); 2c: library cards for the 9 open subtopics, a `tap` on every
   reteach paragraph (blank steps already had `opts`), glossary "ตำแหน่ง" overridden in `library.json` terms.
   **DONE 18 Nov (old คิว 2, app):** (3) compute/meaning pair flag and (5) too-fast card flag; details in
   docs/writing-content.md ("ask" section and "Reading floor for cards"). Old reteach/library records are judged on
   their whole duration, so the 24 s s2.2 card of 17 Nov no longer counts (that episode is back at "reteach").
   **DONE 18 Nov (father's question about "คิดแล้ว ขอดูตัวเลือก"):** hidden options are the weakest review path (she
   can uncover at once; most past uncovers took 1–4 s), so an uncover faster than `coverFloor` no longer clears the
   mistake, she sees one neutral line, the parent page counts fast uncovers; and 15 situation twins were written for
   every question that had reached that path without a twin (blind-checked). Keep twins complete so the path is rare.
   Front-page queue after that (renumbered 18 Nov: คิว 1 dad-talk follow-up · คิว 2 รอบ 2 (since 18 Nov afternoon: part 2, see item 3 below) · คิว 3 retrofit · คิว 4 checkpoint 1 results).
   Old numbering, 17 Nov: คิว 1 = item 4 below (after his first dad talk; keep the
   "อธิบายโดยไม่ใช้สูตร" questions in every brief) · คิว 2 = app: (3) compute/meaning pair flag (pair by `sub`, meaning
   items carry `ask`) + (5) too-fast card flag · คิว 3 = item 3 (รอบ 2) · คิว 4 = (4) retrofit the 19 old lessons by
   error priority, adding meaning/method items for the formula subtopics still without them · คิว 5 = read
   checkpoint 1 results (6–7 Dec, Sonnet).
2e. **Midterm plan, 18 Nov (read `content/midterm-plan.md` first; it overrides the queue numbering above):** midterm 21–25 Dec,
   scope = school math booklet (statistics 2, congruence, geometric reasoning 1 incl. constructions and parallelogram proofs)
   + science solutions and separation. `lessonQueue` re-sorted so midterm lessons finish by 8 Dec; ratio / number theory /
   motion / body lessons come after. New front-page queue (18 Nov): 1 figures for sets 040–041 (before 22 Nov) · 2 dad-talk
   follow-up · 3 meaning-first retrofit of sci-solution-3/4/5, sci-separation-2, math-stats-5 (+ histogram figures) before they
   are served (**19 Nov: sci-solution-3 and math-stats-5 DONE**, blind-checked; sci-solution-4, sci-separation-2, sci-solution-5
   were front-page queue 2, **DONE 20 Nov** (13/13/14 practice items, blind-checked, plus 5 Rf/distillation twins for separation 3–4); recipe in docs/writing-content.md "Retrofitting an old lesson") · 4 construction-reasoning lesson + proof sheets (before 3 Dec) · 5 read checkpoint 1 · 6 mock-midterm set of
   ~28 items for 12 Dec (before 10 Dec) · 7 read the mock · 8 "รอบ 2 ส่วนที่ 2" in prep week 14–18 Dec · 9 retrofit the rest
   after the midterm · 10 the father's check of the missing science unit 2. Every new set still needs the blind check.
2f. **Sweep plan, 18 Nov (read the last section of `content/midterm-plan.md`):** sweep size follows the day's time gap (5/8/10,
   holiday up to 15), sweep locked until the other missions are done, items picked for information, bank refilled in 4 rounds
   (r1 ~60 new by 30 Nov, r2 twins + 30 by 20 Dec, r3 ~60 by 10 Jan, r4 30–50 by 31 Jan), each blind-checked. Front-page queue
   (18 Nov, final; คิว 1 figures 040–041 DONE 18 Nov, so every number below moves up by one on the front page): 1 figures 040–041 · 2 dad-talk follow-up · 3 retrofit · 4 refill r1 · 5 construction lesson + proof sheets ·
   6 app: adaptive sweep + lock + info-based picking · 7 read cp-1 · 8 mock-midterm set · 9 read mock · 10 รอบ 2 ส่วนที่ 2 ·
   11 refill r2 · 12 retrofit the rest · 13 refill r3 · 14 refill r4 · 15 father's science unit 2 check.
2g. **Father's three questions, 19 Nov evening (answered in chat; his choices go to the front page ④):**
   (1) **The sweep is not locked yet.** The lock is part of front-page queue 8 (adaptive sweep + lock + info picking,
   "before 5 Dec", after refill r1). The father thought it was already built; it is not. On 19 Nov she still did the
   sweep last (lesson 12:53–13:05, vocab, then sweep 13:10). Proposed: build the lock alone now (small app change, no
   bank needed); the adaptive size stays in queue 8 because it needs refill r1.
   (2) **math-stats-1 was served again on 19 Nov by mistake, not by design.** She did it on 4 Nov (the trial day, 7/10);
   the 5 Nov fresh start (`calendar.startDay`, START_DAY in app.html) cleared 4 Nov from her device, so `pickLesson`
   thought it was never done. The parent db still has the 4 Nov record, which is why the 18 Nov midterm plan dated
   fix-math-1 on 19 Nov. Only one lesson record predates 5 Nov, so nothing else will repeat. Effect: same 13 items,
   13/13 "ง่าย" in 11 min (a 15-day retest of identical items, so weak evidence); every queued lesson moves one day
   later (fix-math-1 20 Nov … meaning-sci-1 5 Dec); spare days 9–11 Dec absorb it; cp-1 still covers only topics taught
   ≥ 7 days earlier. **Rule:** when planning from the parent db, records before `calendar.startDay` are not on her device.
   (3) **Daily time runs short of the 45–60 min target.** Facts: lessons are labelled "30–40 นาที" but take her ~11–13 min
   (sep-1 12.6, sol-7 12.5, stats-1 11.4; only the first day was 25 min); vocab ~5, sweep 5 items ~3. A complete school day
   is ~20–25 min, so the target cannot be reached by the mission as built: our sizing error, not her slacking. The
   agreed adaptive sweep (queue 8) adds only ~3–6 min, so it does not close the gap. No earlier "collect data until date X"
   decision was recorded. Two kinds of "fast" must be told apart: fast-and-right (too easy / already known) vs
   fast-and-wrong on level 2–3 (rushing or giving up; e.g. 16 Nov sol-7: 3 wrong answers in 5–9 s). Proposed decision
   point: cp-1 (Sun 6 Dec, timed, unseen) read in queue 9 together with a fast-right / fast-wrong count over all records
   since 5 Nov. Outcomes: cp-1 good → speed is efficiency: lower the target to what the mission really takes and spend
   extra time on new subtopics (breadth: 114/243 covered), e.g. a second lesson as a holiday mission, not optional;
   cp-1 weak + many fast-wrong → rushing: wave 2 reason step (24 Nov) and the dad talk first; weak without rushing →
   teaching/content. More lessons per day also means a faster Opus writing pace (usage): say so before choosing.
   **Father's answer, 19 Nov 21:02:** do the lock now, and raise the daily volume now (not after cp-1); usage is fine;
   re-plan the whole queue. **DONE 19 Nov (commit 53f7bc4, parent page published):** lock + time-gap sweep size + daily
   mistake review, rules from 20 Nov (`DAY_RULES_FROM` in app.html; details in content/midterm-plan.md last section;
   verify.js has a test). cp-1 (queue 9) now decides only a second lesson a day. Queue re-planned the same evening
   (front page ②, 25 rows): sweep refills are weekly now (~60 items each), 1A first (by 22 Nov) because ~35 unseen
   items were left; AUTOMATION.md threshold raised to 70 unseen.
   **Same evening, second round (father agreed):** (a) lessons get +4–5 level 2–3 items each (target ≥ 12 practice; lessons
   had only 7–10 practice items and took ~12 min; her accuracy L1/L2/L3 = 85/62/54%); vocabulary stays as is (spelling
   5/10 on 19 Nov, spaced system); second lesson a day still waits for cp-1. (b) The daily review now counts toward the
   flame by itself (commit e982d9b). (c) Queue re-ranked by WHEN each output is used (front page ②, 30 rows): daily
   supply first (sweep 1A, lesson-items batch 1), then midterm quality (chemistry ID-Book 3122 = solutions/concentration,
   before the sol-4/sep-2/sol-5 retrofit; **3122 DONE 19 Nov late**, skill map + gaps + what each retrofit lesson takes in
   content/exam-analysis.md "Chemistry e-book ID-Book 3122"; 3121 = classification, before sweep 1B), midterm events, then the
   **post-midterm lesson pipeline** (the queue's lessons run out ~27 Dec: รอบ 2 part 2 moved up to before 5 Dec, two
   writing batches of ~8 lessons by 13 and 20 Dec; the father must supply the final-term math booklet and science
   documents by 5 Dec, front page ①), and only then the exam-source readings (Mock, 2569 folders 6–7, math books,
   past papers: they shape exam style, most useful once the midterm is past); ID-Book 3123 (chemical reactions, ม.3
   term 2) in Feb. cp-2/cp-3 writing rows added (by 10 / 24 Jan). (d) Nightly run: daily time report with alert rules
   and stock floors (AUTOMATION.md "Daily time and supply check"); it writes lesson items and big sweep top-ups only if
   it runs on Opus. **Father approved 19 Nov 22:21: the nightly scheduled task now runs on Opus** (model and prompt updated the same
   evening); it is the main daily supplier (sweep top-ups to 70, the next 4 lessons extended to ≥ 12 practice items,
   twins, vocabulary; up to 30 items a night, 60 while a floor is unmet). The queue rows for sweep refills and lesson-item
   batches were removed; the front-page queue is now 23 rows (reading, retrofit, new lessons, checkpoints, app).
2h. **Friday gap, 21 Nov (father asked why Fri 20 Nov was still ~20 min):** on a school Friday `repairToday` replaces
   the lesson with an 8-item repair set and drops the daily review, so Friday = repair ~7.5 + vocab ~4 + sweep 10 items
   (school cap) ~7.5 = 19 min. The 19 Nov "30–35 min" estimate forgot Fridays; she was not rushing (0 fast-wrong, own
   reasons typed on every miss). Options put to him (front page ④): A (recommended) Friday repair 14 items + Friday
   sweep cap 15 · B a lesson on Fridays too, repair replaces the review (queue runs out ~5 days sooner) · C keep it.
   Data note: her records reach the parent db only when the father imports her file, so a nightly run before the
   import sees "0 min" (20 Nov run did); judge a day only after its import.
   **Father's decision 21 Nov 02:07:** wait for real Sat/Sun 21–22 Nov numbers before choosing. Estimates (±5 min, from
   5–20 Nov records): Mon–Thu 30–35 (target 45) · Fri ~19 · Sat/Sun ~45–50 (target 75). Set A (no lesson cost): Fri
   repair+lesson, review 10/12, sweep 15 → ~38–42 / 43–47 / 50–55. Set B = A + 2nd lesson Sat/Sun (→ 65–70; queue of 22
   lessons then ends ~8–9 Dec, so lesson writing and the father's final-term documents are needed ~1 Dec). The
   "40–45 min" he remembered is NOT recorded in the repo (it says 30–35); Fridays were never counted. Next chat: import
   his file, then summarise the week (minutes per mission, skipped/light days) and propose A or B.
2i. **Midterm strategy, 21 Nov (father decided; supersedes any older "extra time" idea):** (1) coverage first: until ~8 Dec
   every midterm topic taught once, by lessons as queued; (2) from ~9 Dec to the exam (21–25 Dec) NO new lessons, the extra
   time goes to repair (open misconceptions, daily mistake review, mock 12 Dec, hand-written proof sheets marked by the
   father). Lessons for post-midterm topics (ratio, motion, body, ...) are NOT needed to be earlier, so Set B (2nd lesson
   Sat/Sun) is not needed for the midterm; the father leans to **Set A** (Friday repair 14 + sweep 15), final choice
   after the real Sat/Sun 21–22 Nov numbers (front-page queue 1). (3) The school announces exam scope only near the exam,
   and tests what has been taught, so scope = the school's textbooks/booklet. We have NOT read every page: front-page queue 4
   reads only the midterm parts, compares with `qtags.json`, fills thin subtopics (m22.9, s3.4, s3.7, s4.8); ask the father
   before the read (scan cost, hard rule 9). Do not claim "covered" before that check. (4) Twins are not made on the fly:
   they are written ahead (nightly Opus run, one per recent wrong question, `variants.json`) and served by the app when the
   question returns; they are scored like any answer by the loop (resolved only after the ≥ 7-day checks). Telling her:
   repair lessons "come back because we have not cleared this point yet", never guilt (hard rule 7).
   Queue after this decision (front page ②, 24 rows): 1 week summary + choose A/B · 2 app for the choice (before Fri 27 Nov)
   · 3 dad-talk follow-up · **4 midterm coverage check (new, before 29 Nov)** · 5 construction lesson · 6 รอบ 2 part 2
   · 7 after cp-1 (cut the 2nd-lesson idea to post-midterm only; plan repair for 9–20 Dec) · 8 mock-midterm · 9–11 …
   ID-Book 3121 moved to 26–31 Dec (midterm separation content already used 3122).
   **Queue 4 part 1 DONE 21 Nov:** coverage table from the notes + 12 gap items (blind-checked) in math-stats-6, math-georeason-1,
   sci-separation-4, sci-separation-2, sci-solution-3; details in content/midterm-plan.md "Midterm coverage check". Part 2 (re-read the
   five science text PDFs to confirm) needs the father to add `D:\เตรียมม.ปลาย` via the desktop app's "Add folder"
   (device_request_folder_access was refused in that chat; do not retry it, ask him).
   **Science unit 2 closed 23 Nov:** the father checked: the school has no science unit 2 (numbering skips it), so nothing is missing
   (old queue 24 / "15 father's science unit 2 check" done, no extra reading).
   **Father's clarification, 21 Nov 09:00 (read the old chat):** he had thought the 19 Nov volume increase already covered
   Fridays; it did not. What he wants for Friday is ONLY option ก (more items, NO lesson on Fridays, wait for cp-1 before any
   second lesson). My "Set A" lines above wrongly said "Fri repair+lesson": correct Set A = Friday repair 14 + Friday sweep
   up to 15, no lesson (≈ 28–30 min); Set B (extra lessons) stays undecided until cp-1. **DONE 21 Nov (app):** `REPAIR_FRIDAY=14`
   (was 8) and a school Friday with a repair set gets the holiday-style sweep size (15/12/base); verify passes. Sat/Sun numbers
   are still read after her 22 Nov file (queue 1) but no longer gate the Friday fix.
3. **Chat "รอบ 2" (needs the chat linked to his computer):** IPST ม.2 เล่ม 2 round 2 + geometry `fig` kind (plan above).
   **Part 1 DONE 18 Nov:** fig kinds + ch.3 เส้นขนาน + ch.4 ให้เหตุผลทางเรขาคณิต read (50 pp.) → sets 050–052 (blind-checked).
   **Part 2 = front-page queue item "รอบ 2 ส่วนที่ 2" (Opus, computer):** ch.5 แยกตัวประกอบ (13 pp.) + science unit 5
   งานและพลังงาน (26 pp.) + the school's "หน่วย 3 การเคลื่อนที่" contents/exercise pages, then figures for 040–041.
   Notes of what part 1 found: content/school-plan.md "Round 2".
4. **Sonnet chat after his first dad talk (~Sun 22 Nov):** read his notes in the "10 นาทีกับพ่อ" tab, twin questions
   for those patterns, week-2 brief, then add the Sunday dad-brief step to AUTOMATION.md.

## Which model for which work (agreed with the father, 12 Nov 2026, Pro plan = limited usage)
- **Opus** (newest) for: writing new sets with keys and explanations, reading books to decide what the exam needs,
  large changes to `src/app.html`. A wrong key or wrong explanation teaches her something false.
- **Sonnet** for routine: build/verify, small fixes, file inventory, publishing, status doc, reading text PDFs,
  the independent blind check. (The nightly run moved to Opus on 19 Nov 2026, father's decision, because it now writes
  the daily sweep items and lesson extensions.)
- Cost habits: open a fresh chat per work session (see below); do not re-read big files "just in case"; large
  reads and fan-outs need the father's OK first and a one-line cost warning.
- Check what a night cost: father's Settings > Usage. Anthropic publishes no per-model multiplier for Pro.

## Claude Project (made 18 Nov 2026)
The father's chats live in the Claude Project "สมุดคาถา" (https://claude.ai/project/01a1ee49-16dc-7164-99ce-2c3c844c6f72).
Its instructions only say: reply in Thai, attach the repo, read this file and the status doc, do the queue item.
It is for grouping chats, not for memory: **this file and the status doc stay the only source of truth**. Do not
upload copies of repo files into the project's knowledge (they go stale), and do not use the project's GitHub
sync (it copies a snapshot); every chat attaches the repo itself with `add_repo`. The nightly scheduled task
("สมุดคาถา: เตรียมเนื้อหาทุกเย็น", 22:57 Bangkok) is an account-level task that starts a fresh session and attaches
the repo itself; it was NOT moved into the project and does not depend on it. Its prompt lives in the scheduled
task, not in this repo. Since 18 Nov (night) its step 1 says: if `add_repo` is unavailable or a clone already exists,
use that clone but first `git fetch origin main` and make sure HEAD matches origin/main (never write on a stale
checkout), and report which case happened (the 18 Nov run said "add_repo not found, repo already cloned"; it was a
quiet run that wrote nothing). If the task is ever recreated, keep that sentence.

## When the father should open a new chat
Not by topic. Every chat here is the same project, so open new chats from the Project page. Open a new one at a **handoff point**: the last thing he asked
for is finished, reported and committed, and the next thing is a new request. Rule of thumb: about one chat per
working session or per batch of requests, and always after the chat has been summarised once (the first lines of
the chat say "continued from a previous conversation"). Because state lives in this file and the status doc, a
fresh chat loses nothing. If a chat ever ends mid-task, the status doc's "งานถัดไปของผม" says where to resume.

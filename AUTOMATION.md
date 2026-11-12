# Daily content run (every evening)

Runs every evening since 2026-11-08 (it used to be Wed/Sun). Most evenings are **small**: import nothing new, check
stock, answer her questions, maybe write a letter. Only write new sets when the stock for the next 3 days is short.
Keep each run as light as the day needs: the father is watching how much usage this costs. End your message with
one line `ขนาดงานรอบนี้: เล็ก / กลาง / ใหญ่` (small = no new sets, medium = 1–2 sets, large = 3+ sets or sweep bank).

You are preparing the next days of practice for a Thai ม.2 student who is
aiming for the shared first-round science-school exam (วมว. > จุฬาภรณ์, run by MWIT) in mid-November 2570.
Her father set this up. You only add **content**. You never change how the app works.

## Where the rest lives (read a file only when the day's work needs it)

| File | Read it when |
|---|---|
| `CLAUDE.md` | always (short: hard rules, commands, file map) |
| `docs/writing-content.md` | you are about to WRITE any set, lesson, twin or reading: learning principles, contexts, reading, review twins, reason check, optErr, honest-answer signals, how to address her, lesson structure |
| `docs/features-and-companion.md` | you answer her messages or write a letter, goal, guest or mission; or touch anything about the companion, island, museum, genetics lab, elements, game studio, adventure map, weekly guest, monthly mission, vocabulary phonics |
| `docs/school-exams-readiness.md` | you pick WHAT to write: school exam dates, the exam format, curriculum map, readiness levels and checkpoints, exam analysis, the school's current term scope, the IPST chapter-reading rule |

**Quiet-night fast path (most evenings):** read CLAUDE.md and this file only. If nothing new was imported and stock for
the next 3 days is enough, do just the small tasks (apply approvals, answer new questions in a letter: that one needs
`docs/features-and-companion.md`, the status doc update) and finish. Do not read the docs/ files "just in case".

## 0. Ground rules

- This repository is public. Never write her name, her school's name, grades, photos, or personal details into
  any file here (content, letters, commit messages). Refer to her as "the student" and to the school as "her school".

- Edit by hand only `content/` (sets, vocab, readings, calendar, missions, letters, decisions); commit the files that
  `tools/build.py` generates (`index.html`, `dist/parent.html`). Never edit `src/app.html` or `tools/`.
  If you think the app itself needs a change, do not make it: put it in the message to the father.
- Everything the student reads is Thai, plain and friendly, with light humour. English appears only in
  "English corner" questions and vocabulary.
- Contexts she likes: drawing, anime-style fantasy (mages, apprentices, guilds), a 5v5 online battle game,
  pocket-monster-style creatures, a swordsman fighting demons, a robot alone on an island, a girl dance group.
  Use the *feel* only. Never use names, characters or logos from real games, anime, films or bands.
- The correct option is always written at index 0 (`"a":0`). The app shuffles options.
- Stop and message the father instead of publishing if: a verification problem cannot be fixed, or a
  decision is needed that is not content (school schedule unclear, app behaviour, anything risky).



## 1. Get the repo and the data

1. Attach and clone `pitiwut-tee/fieldnote` with push access (add_repo, then clone as instructed).
   Commit with `git -c user.name="pitiwut-tee" -c user.email="pitiwut-tee@users.noreply.github.com"`.
2. Read results from the parent page's database (ArtifactData, url
   `https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR`, collection `attempts`, list with `out_dir`).
   Ignore documents with `test: true` or `example: true`.
   Also list collection `feedback`: her free messages (`text`), and docs with `kind` "mission", "goal", "buddy"
   (dad's approvals and answers, and the companion's name).
   Record types: practice `set`, `probe`, `mixed`, `passage`, `review`; `vocab`; `skip` (one day or `leave`
   range); `daymode`; `goal`, `goaldone`, `teach`, `mission`; `recall` (daily 3-question recall of the last
   lesson day, from memory; not a lesson, not in `isLesson`); `shop` (companion home).
   Item fields worth reading: `due:true` (spaced-review question: accuracy here = long-term memory), `retry:true`
   (an earlier mistake tried again), `listen`, `listenEx`, `parts`, `len` (question length), `conf`
   ("sure"/"unsure", trial), `explain`/`ownWhy`/`ownWhyPad` (her written reason, trial), `checkOk`, `exSec`,
   `timeSec` (question shown → answer, includes listening).
   Record fields: `reflect`, `readSec`/`readChars` (passages), `trial:{on, vote}`, `rating`, `memo`, `confused`.


## 2. Look at the data (write short notes for yourself)

- Per spell (`items[].spell`, or look up the question id in content): accuracy by level 1/2/3.
- Mistake reasons (`items[].errorTypes`): concept / forgot / read / misopt / unclear / calc / guess / dontknow.
  Many `concept` or `dontknow` on a spell → next lesson for that spell re-teaches with a slower concept card.
  Many `read` / `misopt` → add longer, carefully worded questions. `unclear` → rewrite that question
  (edit its JSON, keep the same id) and mention it to the father.
- Her own questions (`confused[].ask`): answer them in the letter, and the idea inside the next relevant concept card.
- Time: lessons should take ~25–30 min, vocabulary ~10 min. Ratings "ยาก/ยากมาก" two or more times in a row
  on a spell → keep the next set at level 1–2 heavier.
- Probes (`type: "probe"`): spells under 60% → add a lesson set for that spell soon (Friday repair and the
  warm-up retry use her wrong answers automatically; you do not write repair sets).
- Spaced review (`due:true` items): accuracy under 60% on a spell means it is fading; give it a lesson soon.
- Trials (`calendar.trials`): count her votes; read `ownWhy` texts. A wrong answer with a sensible reason is a
  slip; a wrong reason is a misconception: re-teach that idea in the next concept card. "Sure but wrong" items
  are the most valuable misconceptions to address. Report votes to the father; he decides whether a trial stays.
- Also: reading data (see "Reading"), `reflect`, `teach` records rated "ยังงงอยู่บ้าง", `mission` results,
  `feedback` docs with `kind`.
- Vocabulary: words wrong on spelling repeatedly.


## 3. Decide what to write

Keep about 3–4 days ready ahead (runs are daily now), using `content/calendar.json` (holidays, `schoolOff`,
`schoolBreaks`) and weekends. Daily time the father set (2026-11-07): **school day 45–60 min, holiday 75–90 min**.
Check it against real durations (`durationSec`) every few days and tell him if days run short or long. What each day uses:

- School day: 1 lesson (topics in `calendar.currentSpells` first, in `calendar.lessonQueue` order) + vocabulary +
  **old-topic sweep 5 questions** (`ย้อนคาถาเก่า`). Fridays may be a repair set instead of the lesson (automatic).
- Holiday (full level): 1 lesson + slot 3 + vocabulary + **sweep 10 questions**. Slot 3 = the weekly mixed set on
  the first holiday of the week, the weekly passage on the next holiday, otherwise a probe. A second lesson is
  offered after the mission is done but is not required.
- **Sweep bank** (`kind:"sweep"`, files `content/sets/03x-sweep-N.json`, shape of `030-sweep-1.json`): questions
  from ม.1–2 topics she has already learned (spells whose grade is ม.1/ม.2 and school status done/maybe/part, never
  `currentSpells`, never ม.3). Level 1–2, quick (under ~1.5 min each), every one with `optErr`, `ctx`, a near-peer
  `ex`. The app shows each question once, one per spell per day, the spell checked longest ago first. Keep **at
  least 50 unseen** sweep questions spread over at least 15 spells; when below, add a new sweep file (counts as one
  set). Use sweep results (items in `type:"sweep"` records) to see what she has forgotten: a spell under 60% after
  ≥4 sweep questions goes into `school-plan.md` "to review Jan–Mar" and may get a probe sooner.
- Keep ready (unused = no non-test attempt has its `setId`): lessons for the planned days, at least 1 mixed set
  (2 from 2027-09-01, and set `calendar.mixedPerWeek` to 2 then), at least 1 passage, at least 2 probes.

**At most 3 new sets per run** (daily runs; a sweep file counts as one) (mixed sets and passages count). If that is not enough to cover every planned day,
cover school days and slot 3 first; the app reuses older lessons for the rest, and say so to the father.

Probe order (skip ones that already exist in `content/sets`): m3 อัตราส่วน, m17 พีทาโกรัส, m16 ความเท่ากันทุกประการ,
m5 ทฤษฎีจำนวน, m6 แบบรูป, m7 สมการเชิงเส้น, m4 จำนวนจริง, m15 เส้นขนาน, m19 พื้นที่ผิวและปริมาตร, m8 กราฟเชิงเส้น,
m1 จำนวนเต็ม, s1 อนุภาค, s7 เซลล์, s8 พืช, s12 ความร้อน, s13 แรง, s14 ความดันและแรงลอยตัว, s9 ร่างกายมนุษย์,
s19 บรรยากาศ, s3 การแยกสาร, s22 ตัวแปร, s23 อ่านกราฟ.

Read `content/school-plan.md` every run: it holds the science weighting estimate, the usual topic order, and
known gaps. Follow its balance when choosing non-current topics. If it ever contains the school's own outline,
use that for `currentSpells` and update `calendar.json` when the school moves to a new topic.


## 4. Write the content (all of it before verifying)

Copy the shape of an existing file exactly. Lesson: `content/sets/001-math-stats-2.json`. Probe:
`content/sets/006-probe-exponents.json`. Mixed: `020-mixed-1.json`. Passage: `021-passage-1.json`. Name new files
with the next unused number (highest number in `content/sets` + 1, e.g. `022-<id>.json`). Every new set has
`subject`, `topic`, `grade`, `mins`, `added` = today, and every question has `ctx`, hints, and (level 3) `parts`.

Lesson rules:
- `kind:"lesson"`, `spell` from `content/spells.json`.
- `warm`: 2 level-1 questions from the spells she has not practised for the longest time, each with its own `spell`.
- `concept`: title, 3–5 points, 1–2 formulas, 3–4 vocabulary pairs, `use` (where it is used in real life),
  `alts` with two alternative explanations ("อธิบายแบบช้าๆ", "ทำให้ดูทีละบรรทัด").
- `practice`: 8 questions = 3 level-1, 3 level-2 (one is `"en":true` English corner with Thai glosses in
  brackets), 2 level-3 (long real-life situation, data to interpret, or reasoning like the science-school exam).
- `challenge`: one numeric question (`num:true, answer, tol, unit`), level 3, with `parts`.
- `hints`: 1–2 hints for every question id. `ex`: explain why the answer is right **and** why the common
  wrong option is wrong, in the companion voice (see "Companion, voice, letters, goals").
- Distractors must be the mistakes students really make (forgot to sort, used the wrong total, etc.).

Mixed set rules (`020-mixed-1.json` is the model; it predates the context mix, follow the numbers above):
`kind:"mixed"`, no `spell` on the set, no warm, no concept, `challenge:null`. 12 questions (10–15 allowed), every
question has its own `spell`, at least 4 different spells, only topics she has already learned at school or
practised in the app. About 3 level-1, 6 level-2, 3 level-3. Include pairs that look alike but need different
methods (resultant force vs Pythagoras, "percent of new price" vs "percent of old price"). New questions only.

Probe rules: `kind:"probe"`, no warm, `challenge:null`, 10 practice questions (4 level-1, 4 level-2 with one
English corner, 2 level-3), a concept card (with `use`) used as the summary after the probe.

Passage rules: see "Reading".

Also in this step:
- **Letter**: write one letter into `content/letters.json` (see `docs/features-and-companion.md`, "Companion, voice, letters, goals").
- **Twins**: one twin per recent wrong question into `content/variants.json` (see "Review that makes her think").
- **Goals**: copy dad's `feedback` answers (kind "goal") into `content/decisions.json`.
- **Missions**: apply dad's `feedback` (kind "mission"): approve → `status:"approved"`; change → revise the draft.
  If the next month starts within 10 days and has no mission, write a draft.
- **Calendar**: `currentSpells`, new holidays or school days off the father mentioned, `mixedPerWeek` from 2027-09-01.
- **Vocabulary**: words introduced so far ≈ 5 × days since 2026-11-05. If `content/vocab.json` has fewer than that
  + 25 words, add 20–30 words: mix general academic, science/math, and story/art words; each with Thai meaning, a
  short example sentence and its Thai translation (`exTh`).
- **English readings** (`content/readings.json`, used on Wed/Sat/Sun in the vocabulary step): keep at least 4
  more readings than the number of weeks since 2026-11-05.


## 5. Verify before publishing (all must pass)

1. `python3 tools/build.py` then `node tools/verify.js --since=<today>` (checks content rules for every set and
   plays only the sets added today in the browser; `npm i playwright` if missing; Chromium is pre-installed).
   Fix every problem it lists.
2. Re-solve every new question yourself from scratch, in code where there is arithmetic, and compare with
   the stored answer. Check that exactly one option is right. Check real-data facts with web search (at most
   about 5 per run; otherwise phrase numbers as "สมมติว่า").
3. Ask one separate subagent that has not seen your reasoning to review only the new JSON files (and the letter)
   for: wrong answers, more than one defensible answer, ambiguous Thai wording, content outside ม.1–ม.3, `parts`
   that give away the method or answer, real character or brand names, and personal details. Fix what it finds and
   run step 1 once more. If it still fails, do not publish: stop and tell the father.


## 6. Publish

1. Commit and push to `main` (`git fetch origin main && git push origin HEAD:main`). GitHub Pages serves
   `index.html` to the student.
2. Read the parent artifact once (Artifact `read`, url above), then publish `dist/parent.html` to that same
   `url`. Do not create a new artifact.


## 7. Tell the father (in Thai, short)

Your final reply in this run is the message to him (the scheduled task notifies him). Include: what was added for
which days and why (one line each), what the data showed (2–4 bullets, with numbers, including reading and trial
results when present), the letter's main point in one line, goal/mission decisions you applied, anything you
rewrote because she marked it unclear, and anything you need from him (school schedule, codes not imported since
the last run, a mission draft waiting for approval). If no new results were imported since the last run, say so
and that the content followed the calendar only.


## Honesty and needs (father, 11 Nov — this is a standing rule)
- The father decides by Feb 2570 whether this system is enough or the student also needs tutoring. Give him the truth needed for that decision.
- In every evening message, if anything limits how well the system can teach or measure her (a topic with too few questions, no real exam items for a subject, a book you have not read, a doubt about a question), say it plainly in one short section "สิ่งที่ระบบยังขาด" and say what he could provide. Do not hide weaknesses to look good.
- Our own accuracy numbers are measured on our own questions. Never present them as exam readiness on their own; say so when you report progress.
- Every new set must pass an independent answer check (a separate agent that solves the questions blind before seeing the key) before it is published. Fix or drop any question it disputes.
- Reading the father's books costs usage. Run OCR in the workspace, then read only the chapters needed for the next 1–2 weeks of content, and tell the father which chapters you read.
- **Never refer to an option by its position** ("ข้อสุดท้าย", "ลำดับที่สอง", "ตัวเลือกแรก") in explanations: the app shuffles options. Quote the option's content instead. (Found by the independent check of 11 Nov.)
- Independent check of all 386 questions (11 Nov): 0 wrong keys, 0 ambiguous; 4 explanation errors and 11 minor issues, all fixed. Term: use "แรงพยุง" (not "แรงลอยตัว") as in the current curriculum.


## Father's status doc (living note, 11 Nov 2026)
- Doc: https://claude.ai/artifact/4kHsdKcNKfudfYGiyqbRQx ("สมุดคาถา · สิ่งที่ต้องการจากพ่อ และสถานะล่าสุด"), Claude Docs project id 1e56cbde-7272-43ad-9beb-270fb7f5f0dd. Written in Thai.
- Sections: สิ่งที่ต้องการจากพ่อ (table with a สถานะ dropdown the father changes himself) · รอพ่อตัดสินใจ (checklist) · สถานะระบบตอนนี้ (numbers table) · งานถัดไปของผม · ทำเสร็จล่าสุด (newest first).
- Every run, if the Claude Docs tools are available: read the doc first with sinceRev (the father edits it — his edits win), update the as-of date chip, the numbers table (bank size, subtopics with questions, with L3, spells without questions, her status counts) and add one row to ทำเสร็จล่าสุด. Add a row to the needs table only when a new need appears; never flip a status the father set.
- If the Docs tools are not available in the run, say so in the evening report instead of skipping silently.

# How to write content (read before writing any set)

Split out of AUTOMATION.md on 12 Nov 2026, text unchanged. The nightly runbook is `AUTOMATION.md`; hard rules are in `CLAUDE.md`.

## Learning principles (follow these in every choice you make)

The app is built on these research results. Write and choose content so they keep working.

1. **Retrieval practice** (Roediger & Karpicke 2006; Dunlosky et al. 2013). She learns by answering, not by
   reading. Concept cards stay short (3–5 points); the questions do the teaching.
2. **Spacing** (Cepeda et al. 2006). The app brings back spells that are due (`SPACING` 3/4/7/14 days by tier)
   in lesson warm-ups and the Friday repair set, using questions she has already seen. You help by writing
   `warm` questions from spells she has *not* practised for the longest time (look at the last date per spell),
   not just any older topic.
3. **Interleaving** (Rohrer & Taylor 2007; Rohrer et al. 2015). Exam papers mix topics, so she must learn to
   recognise which method a question needs. Mixed sets (below) do this. Inside a lesson, at least one level-3
   question should look like another topic at first glance (e.g. a ratio question in a science context).
4. **Pretesting** (Richland, Kornell & Kao 2009). Probes come before teaching; that is intended, keep it.
5. **Elaborated feedback** (Shute 2008). Every `ex` says why the answer is right *and* names the most likely
   wrong option and the exact mistake behind it. Never just restate the answer.
6. **Worked examples and cognitive load** (Sweller). `alts` include one step-by-step worked example. One new
   idea per question at level 1; combine ideas only at level 3. Keep wording short; numbers friendly at level 1.
7. **Diagnostic distractors.** Each wrong option must come from a real misconception or slip (forgot to sort,
   used the wrong total, added instead of multiplied exponents, subtracted lengths instead of using
   Pythagoras). If you cannot name the mistake behind an option, replace the option.
8. **Mastery before moving on** (Bloom 1984). If a spell is under 60% at level 1, its next lesson is a slower
   re-teaching lesson, not a new sub-topic.
9. **Motivation without bribery** (Self-Determination Theory; Hanus & Fox 2015). Never add rewards for speed or
   volume alone, never shame. Contexts follow her interests (see ground rules) so the questions feel like hers.

Rules of thumb in this guide (60%, "hard twice in a row", 7 days ahead) are practical estimates, not research
values. With one student and few answers per spell, prefer simple rules and say in the message to the father
when the data is too thin to conclude anything.


## Contexts: why we learn this (follow in every set)

Her father wants her to see what each topic is *for*. Research: utility value raises interest (Hulleman &
Harackiewicz 2009), but only when the context is part of the problem; decorative stories hurt learning
(seductive details, Harp & Mayer 1998). Self-generated connections beat being told "this is important"
(Canning & Harackiewicz 2015).

- Every question has `ctx`: `life` (money, bills, food, travel, phone, home, school life), `earth` (environment
  and sustainability: PM2.5, floods, heat, energy, water, waste and recycling, ecosystems), `fun` (her interests,
  see ground rules), `pure` (no story, or lab only). Old sets carry `ctxAuto:true` (tagged by keywords; may be off).
- Lesson practice (8): about 3 `life`, 2 `earth`, 2 `fun`, 1 `pure`. Mixed set (12): about 4 life, 3 earth,
  3 fun, 2 pure. Passage: mostly `earth`/`life`. Probe (10): about 4 life, 2 earth, 2 fun, 2 pure.
  `verify.js` checks every set with `added` on or after 2026-11-05 (probes included): every question has `ctx`;
  lessons, mixed sets and passages need at least half life+earth and at least 1 earth in `practice`.
- The context must change the thinking: the numbers decide something real (which bulb saves more, is the deal
  real, which day is safer to go out). If the story could be deleted without changing the question, rewrite it.
- Real data: when a question says something is real (PM2.5 standard, electricity price, rainfall, a statistic),
  look it up with web search, use an official or reputable source, and name the source briefly at the end of
  `ex` ("ข้อมูล: กรมควบคุมมลพิษ"). If you make numbers up, say "สมมติว่า". Never present invented numbers as real.
- Environment framing: choices and agency, not doom. Compare options, measure, decide. No guilt, no scare
  statistics without a "what can we do" angle. Keep to facts in ม.1–3 science; no political positions.
- Lesson concept cards have `use`: one or two sentences, a concrete real place this idea is used (not "it is
  important"). Thai, specific, checkable.


## Reading (she understands spoken explanations better than long text)

Goal: build her stamina for long written questions, because the exam is a silent paper test.
Research: reading-while-listening with eyes on the text builds fluency; listening instead of reading does not
(Gough & Tunmer 1986 Simple View of Reading; Wood et al. 2018 on text-to-speech).

- The app reads Thai aloud phrase by phrase with highlighting. Questions: only after `calendar.listenDelaySec`
  (20 s) of trying to read; never in mixed sets or English corner. Concept cards and explanations: any time.
  Write questions so they read well aloud: avoid unusual symbols; units as in other sets.
- Every level-3 question has `parts`: `{"given":[2–4 short facts in question order], "ask":"what is asked",
  "watch":"a READING trap (optional)"}`. Parts restate the question only: no method, no calculation, no hint
  at the answer. `verify.js` requires parts on level-3 questions in new sets.
- Gradually longer questions: keep level-3 questions 3–5 lines; level 2 may be 2–3 lines. Do not shorten
  questions to make them easier to read; long questions are the skill being trained.
- Weekly passage (`kind:"passage"`, model `content/sets/021-passage-1.json`, `calendar.passagePerWeek`): a Thai
  science text with a title, 2–4 paragraphs and an optional table, then 6 questions (copy the top-level fields of
  021; every question needs `ctx`, hints, and `parts` on the two level-3 ones) (2 L1 main idea / find in
  text, 2 L2 data or vocabulary in context, 2 L3 conclusion supported by evidence, design a fair test). Spell
  `s24` on the set; questions may carry s22/s23 or a content spell. Length: start ~600 Thai characters, add
  about 100 characters per month, up to ~1,500 by the exam. Mostly `earth` or `life` contexts. Made-up data must
  say "ข้อมูลสมมติ"; real data must name its source. Keep 1 unused passage ready.
- Data to read each run: per week, share of questions with `listen` > 0, accuracy of listened vs not, accuracy
  and time for long questions (`len` > 180) vs short (≤ 90), `read` mistakes, passage `readSec`/`readChars`
  (characters per minute, compare only with her own earlier passages). Report the trend to the father in one
  line. If long questions are much weaker than short ones on the same spells, add more medium-length questions
  and mention it. From 2027-08 (ม.3 term 1, three months before the exam) suggest to the father setting `listenQuestions` to false.


## Weekly reflection

From `calendar.reflectFrom`, the mixed-set rating screen asks (optional) which topic this week she can use in
her life and how. Records have `reflect`. Read them: if she connects a topic to something, use that context in a
later question; mention one good one to her father.


## Review that makes her think (twins, typed answers, hidden options)

Repeating the same question with the same options only tests whether she remembers the answer letter. When a
question comes back (Friday repair, review button, warm-up retry, spaced review) the app uses, in order: an unseen
twin from `content/variants.json`; else the original as a typed answer when all options are numbers; else the
original with options hidden until she has thought ("คิดแล้ว ขอดูตัวเลือก").

- **Every run, write one twin for each question she got wrong since the last run** (at most 12 per run, newest
  first; skip ones that already have an unseen twin). Key = original id; twin id = `<orig>~v1`, `~v2`, ...
  Same idea and level, new numbers and a new situation (follow the context mix), new distractors from real
  mistakes, `ex` in the companion voice, `hints`, `ctx`, and `parts` if level 3. Re-solve twins in code and include
  them in the subagent review. Twins do not count toward the 6-set cap.
- Hidden options are the weakest of the three (she can uncover at once), so the twin rule below matters. Since 18 Nov
  an uncover faster than `coverFloor` (stem read at 25 chars/s + 8 s to think, at least 10 s) is "fast": a right
  answer then does not clear the mistake from the review pool, she sees one neutral line saying it will come back,
  and the parent page counts fast uncovers over 7 days.
- Item fields: `of` (answered a twin of this id), `recall:true` (typed answer), `cover:true` + `coverSec` + `coverFloor`.
  A wrong answer on a twin means the idea, not the memory of one question, is still weak: give that spell a lesson.
- Mistake reason `forgot` ("เข้าใจ แต่จำสูตรหรือวิธีคิดไม่ได้"): the idea is fine, recall is weak. Do not re-teach;
  add the formula or method to the letter as a short memory tip and rely on spacing.
- `calendar.voidRecords`: endedAt values of records the father says were only button tests. The app ignores them;
  ignore them in analysis too.


## Reason check (right answer, wrong reasoning)

She often skips the explanation when she is right, so a lucky or wrong-method right answer goes unnoticed.
- Give **every level-3 question** (and any level-2 question where a wrong method can still land on the right
  option) a `check`: `{"q"?: "…", "opts": [right reason, 1–2 tempting wrong reasons], "a": 0, "ex": "one line"}`.
  Wrong reasons are real shortcuts that happen to work here (guessing the middle value, averaging without weights,
  "the longest option", reading a number off the table). The app shuffles them, shows the check after a right
  answer (and from wave 2, 24 Nov, also after a wrong one), gives +5 XP for the right reason on a right answer, and a
  wrong reason sends the question back to review. From 17 Nov write exactly 3 reasons.
- Item fields: `checkOk` (true/false). A `checkOk:false` counts like a mistake when you pick twins and plan.
- `exSec` = seconds from answering to the next question (time on the explanation). Below 3 s on a right answer
  means she did not read it.


## Understanding first: new item fields (built 17 Nov 2026, chat "แชท 1"; content comes in chat 2)

Rolled out in two waves by `calendar.json` `understand` (wave1 2026-11-17, wave2 2026-11-24). `tools/verify.js`
checks every field below.
- **Spot the friend's mistake** (`friend`): `{"who"?: "สมุดทดของเพื่อน", "work": ["line 1", "line 2", ...]}` on a
  choice question. The app shows the friend's working in a dashed box; `q` asks where/why it went wrong and the
  options describe the mistake (right one first, `a:0`). Build them from **her own** wrong answers (`typed`,
  `optErr`, `orig` in her records): the friend makes the mistake she made, in a new situation. Item field: `friend:true`.
- **Predict before computing** (`predict`): `{"q": "มากขึ้นหรือน้อยลงกว่าเดิม", "opts": [right, ...], "a": 0, "ex"?: "one line"}`.
  Shown before the options from wave 1; she taps a guess, then solves. Use it where a sense of direction or size
  catches the error (scaling by amount, density, dilution, mean vs median after adding a value). Item fields:
  `predict` (index in file order), `predictOk`.
- **Twins change the situation, not only the numbers**: in `variants.json` add `"change": "situation"` and
  `"sit": "short label of the new situation"` (e.g. "ทำน้ำเชื่อม", "ตู้ปลา"); `"change": "numbers"` only when a new
  situation is impossible. Twins written from 17 Nov carry `"added": "YYYY-MM-DD"` and must say `change`. From
  wave 1 the app brings back situation twins first. Lesson questions may also carry `sit`.
- **Pick the right reason** (`check`, wave 2): from 24 Nov the reason step also appears **after a wrong answer**
  (before the explanation: "which reason leads to the right answer?"), so every new level-2/3 question that has a
  real tempting shortcut needs `check` with **exactly 3 reasons, right one first** (`a:0`). Item fields: `checkOk`,
  `checkAfterWrong:true` when it followed a wrong answer (XP for the reason only on right answers). One question per
  lesson (level 3 without `check` first) gets an optional one-line own reason (`explain:true`, `ownWhy`).
- **Repeated-error loop cards** (`content/reteach.json`, keyed by subtopic id): when she misses the same subtopic on
  2 different days (not slips, misreads, calculation or unclear-question misses), the parent page lists it and the
  app offers "สอนใหม่อีกแบบ" once a card exists. A card = `title`, `form` (table | diagram | real | contrast: a
  different form from the lesson), `text` [paras], optional `table`, `contrast` (2 cases side by side), `fig`, and
  exactly 3 `worked` examples (≥ 3 steps each; example 2 hides its last step, example 3 its last two, so give those
  steps `opts` = [the step's own text, 2 wrong steps from real mistakes]). Blind-check every card (hard rule 5).
  Records: `type:"loop"`, `act:"reteach"` (`steps` with ok per blank) and `act:"guide"` (`text` = her player's guide).
  **Resolved** only after 2 right answers with the right reason picked, in different situations (`sit`, else the
  question root), ≥ 7 days apart; the app serves those checks itself in the lesson warm-up, so each open subtopic
  needs at least 2 questions with `check` in different situations. The parent page flags "ไม่มีข้อที่มีตัวเลือกเหตุผล".
  Since 17 Nov 2026 (chat 3) the card is shown **one paragraph per screen** (then the table, the contrast, the fig,
  each on its own screen) and ends with the whole card on one page. A paragraph may be `{t, tap}` instead of a string:
  `tap` = `{q, opts:[right one FIRST, 1–3 wrong], ex}`, a quick check at the end of that screen (without one she gets
  "เข้าใจแล้ว / ยังงงตรงนี้"). Add a tap to every paragraph that carries the idea. Every blank worked step should have
  `opts` (she asked for something to do, not more reading). After the worked examples the app gives 2 **try-it**
  questions from the bank on that subtopic (`tryPick`: prefers no `check`, unseen, not a twin) and shows her the
  score at once: record `type:"loop"`, `act:"try"`, `tries:[{qid,ok}]`. So each open subtopic also needs ≥ 2 plain
  bank questions besides the `check` ones.
- **สมุดคาถา cards** (`content/library.json`, keyed by subtopic id; built 17 Nov 2026, chat 3): opened from every
  wrong answer ("📖 ไปอ่านเรื่องนี้") and from home. A card = `title`, `what` (what it is and what it is for, in 1–2
  plain sentences, BEFORE any formula; this was the gap: she knew the Rf formula but not what Rf means), `steps`
  (≤ 8; string or `{t, tap?, fig?}`, one idea each), optional `formula` [lines], `trap` (the mistakes she really
  makes), `whatTap`/`trapTap`. Taps as above; tap questions are shown as plain text (no glossary), so they must not
  give away a bank question. Without a card the app falls back to the summary card of the lesson with the most
  questions on that subtopic, and the parent page lists "เรื่องที่น้องเปิดแต่ยังไม่มีการ์ดเฉพาะ" = what to write next.
  `terms` adds glossary words (tap a dotted word anywhere); check that a term's meaning fits every place it appears
  (the old "ตำแหน่ง" entry is the statistics meaning). Blind-check every card: the checker answers the taps without
  the key and fact-checks every sentence. Record: `type:"lib"` (`sub`, `src` lib | concept:setId | reteach, `from` =
  the question she missed, `read`, `reached`/`screens`, `taps`, `stuck`, `tries`); items she missed and then opened
  the card for carry `lib: n`.
- **Not chunked on purpose:** exam-style questions and the reading passages stay long. Chunking is for learning an
  idea; reading stamina is trained separately (passages, timed). Father and Claude agreed this on 17 Nov 2026.
- **Checkpoint sets** (`kind: "checkpoint"`, id = `calendar.checkpoints[].setId`, e.g. `cp-1`): 24 items (science
  12 + math 12), every item with its own `spell`, no warm-up, no challenge, no hints needed; unseen questions on
  topics taught ≥ 7 days earlier, new contexts not new numbers, some "which reasoning is right" items. Timed
  (`mins`, default 50), no hints and no explanation until the end. Record `type:"checkpoint"` (`timedOut`, `pauses`,
  `timeLimitSec`, items with `timeout`/`dontknow`). Scores show trend, never readiness (hard rule 6).
  Never give checkpoint items a `check`: the loop serves any question with `check` on an open subtopic (`loopPool`),
  so a checkpoint item with one could appear in a warm-up before the checkpoint day. Put "which reasoning is right"
  inside the options instead (as in `047-checkpoint-1.json`).
- Minimum day: `daymode` record with `level:"min"`; the day's mission is one `type:"mini"` set (6–8 questions).


## Option length gives nothing away (teaching audit, 17 Nov 2026)

The audit found the right reason was the longest option in 92–95% of `check`s, so "pick the longest" scored
without understanding (and the misconception "resolved" rule relies on picking the right reason). Rebalanced late on
17 Nov (queue 1); `tools/verify.js` now enforces, over every choice in `content/` (questions, `check`, `predict`,
reteach taps and blank steps, library taps):
- per item: a right option of 20+ characters may not be more than 15% longer than the longest wrong one;
- per kind: the right option may be the strictly longest in at most 40% of items and the strictly shortest in at
  most 45% (so "pick the shortest" does not work either). The verify output prints the current counts.
How to write so it passes: write the right option plainly and give each wrong option its own full (wrong) reason
("…เพราะ…"), so all options read like real reasoning of similar length. Vary which one is longest. Never write a
distractor about test-taking ("เลือกข้อที่ยาวที่สุด"); every wrong option is a real mistake in the subject.

## "What does this number mean" and "which method" items (`ask`, 17 Nov 2026)

Most of the bank asks to compute; she can follow a formula without knowing what the result means (the Rf case).
Every formula subtopic gets at least one `ask:"meaning"` item (what the number/result tells us, what the unit
says, which statement must be true) and one `ask:"method"` item ("ยังไม่ต้องคำนวณ": which formula, which base, which
steps). Both need `sub`. Their `ex` opens with what the quantity means, before any formula, then names the most
tempting wrong option and the mistake behind it. They are excluded from the "half of level-2/3 math answerable as a
number" rule. First sets: `048-meaning-sci-1` (s2.3 s14.5 s4.4 s4.2 s4.6 s3.3 s14.3 s16.1) and `049-meaning-math-1`
(m22.6 m22.7 m22.9 m22.11 m3.4 m3.5 m17.1 m5.2 m8.2). Still without: s4.5 ppm, s12.2 Q = mcΔt, m2.4, m3.3, m4.2,
m19.3 — write them when those lessons are retrofitted (queue "retrofit the 19 old lessons"). The app change that
pairs a compute item with a meaning item on the same `sub` ("ใช้สูตรได้แต่ไม่เข้าใจ") reads `ask` (built 18 Nov: parent page tab
ความพร้อมสอบ, `meaningPairs` in `src/app.html`; last 8 answers of each kind, flag = compute ≥ 70% on ≥ 3 and meaning
< 60%). So a meaning/method item must carry the same `sub` as the compute items it pairs with; a subtopic with meaning
items but fewer than 3 compute items shows "ข้อคำนวณยังน้อย". Put every flagged subtopic into the next dad brief.

## Reading floor for cards (built 18 Nov 2026)

Library and reteach cards are timed: finishing faster than `READ_CPS` (25) Thai characters a second, with a floor of
at least 10 s, is "too fast". She gets one neutral sheet ("อ่านอีกรอบ" / "ไปต่อ"); a fast reteach does not move the
loop on (it comes back another day) and earns no reading XP; a fast library read earns only its try-it XP. Long cards
therefore cost her more time; keep each paragraph to what the idea needs.

## Why she chose a wrong option (optErr)

Her own "why I got it wrong" taps are often unreliable, so the content itself says what each wrong option means.
- Give every new multiple-choice question `optErr`: an array the same length as `opts`, `null` at the answer and a
  short kebab-case code for each wrong option naming the misconception it catches (e.g. `mode-as-frequency`,
  `threshold-inclusive`, `forgot-to-scale`, `average-without-weights`). Reuse codes across sets so they add up.
  Example: `content/sets/022-math-dotplot-1.json`.
- Items record `optErr` (code of the wrong option she chose) and `orig` (chosen option index in the file's order).
  When planning, count `optErr` codes over the last 2 weeks: a code that repeats is a misconception to teach
  directly (lesson concept point + twins), whatever she tapped as the reason. Compare with her tapped reason to see
  how well she judges her own mistakes, and mention it kindly in the letter now and then.


## Honest-answer signals on items (from 9 Nov 2026)
- `errorTypes` may include `slip`, meaning "I thought it right but tapped or typed wrong".
  - It still counts as wrong.
  - Do not write a twin for a single slip. Mention it only if slips recur.
- `errorTypes` may include `other`. Then `whyOther` holds her own words: read them, and add a new reason category to the
  father's notes if one keeps coming up.
- `guessed:true`: she said she guessed a right answer, either through the 🎲 button or the reason-check option.
  - The app does not count it toward mastery and puts it back into review.
  - Treat it like a mistake for twins, never as blame. Being honest about guessing is what we want.
- `notTaught:true`: in a mixed set, probe or sweep, she said she has not learned the topic yet.
  - It is not counted at all.
  - Check `content/school-plan.md` and her history for that spell.
    - If she has app attempts on it, she has forgotten it: give it a short review.
    - If not, it has probably not been taught yet. Keep it out of mixed sets until the plan reaches it, and tell the father which.
- **Mixed sets:** keep both math and science in every mixed set, about 55/45. The real first round has two separate papers with
  equal weight, and each paper mixes topics.


## How to address her (father, 9 Nov 2026)
- **Never call her "หนู"** in student-facing text. It feels too childish for her.
- **Use `{name}` where her name belongs.** The app replaces it with the nickname she typed on her device, or "เธอ" if none.
  Supported in studio.json texts and letters.
- **Never write her real name into any file.** The repo is public.
- Elsewhere, use "เธอ" or no pronoun at all.


## Lessons: why first, then one idea at a time

The father noticed she follows formulas without knowing what a topic is for ("มัธยฐานใช้ตอนไหน"). Every new lesson:
- `concept.hook`: `{text, q?, opts?, reveal}` — a short real situation where the old tool fails or the answer is
  surprising, a question, 2–3 guesses (no right/wrong, not scored), and `reveal` that explains why this topic
  exists. The app shows it before anything else. For central tendency, the hook must answer when to use the
  median (e.g. salaries with one huge outlier).
- `concept.points`: one idea per point (the app shows them one per screen with "เข้าใจแล้ว / ขออธิบายอีกแบบ").
  Keep each point to 1–2 sentences; formulas come after the idea.
- `concept.more`: one alternative explanation per point (same length as `points`): an analogy or a tiny worked
  example, not a repeat. Records keep `conceptHelp` (which points she asked to have explained again) and
  `hookPick`. If she asked for help on the same kind of point twice, rewrite that point in the next lesson.
- Daily check-in: `type:"mood"` records (`ready` / `ok` / `tired`). Two "tired" in three days → lighter content
  (more level 1–2, shorter sets) and tell the father.

## Figures (`geo` and `svg`, built 18 Nov 2026, queue 2 "รอบ 2")

Any `fig` (question, reteach/library step, or `concept.figs[i]` = a figure under lesson point i, same length as
`points` or shorter, `null` for none) may now be a geometry figure. Never copy a figure from a book.
- `{"kind":"geo","pts":{"A":[x,y],...},"seg":[["A","B"] | {"p":["A","B"],"dash","ext":[px,px]|true,"tick":1-3,"par":1-3,"label","lpos":0-1,"side":1|-1,"w"}],
  "ang":[{"v":"B","a":"A","b":"C","label","arcs":1-3,"right":true}],"txt":[{"at":[x,y],"t"}],"hide":["P"],"at":{"A":"ne"},"lab":{"A":"text"},
  "nodot":true,"scale":false|"scaleOk":true,"desc":"…","caption"}`. Coordinates are maths coordinates (y up); the app
  scales them, places point labels away from their lines, and draws equal-length ticks (`tick`), parallel arrows
  (`par`), angle arcs (the smaller angle between rays v→a and v→b), right-angle marks, dashed and extended lines.
  A label starting with "?" is drawn in the accent colour (the asked quantity). `lpos` moves a side label off a
  midpoint dot.
- `{"kind":"svg","svg":"<svg …>","desc":"…"}` for science pictures: only drawing tags survive (no script, image,
  foreignObject, event handlers or links; verify.js refuses them and the app strips them).
- Rules (verify.js): every geo/svg figure has `desc` (one sentence, read aloud after the question); a geo figure says
  `"scale":false` (shows "รูปไม่ได้วาดตามสเกล") unless you computed it to scale and set `"scaleOk":true`.
- Build coordinates in code (trig, intersections; see the generator approach used for sets 050–052: compute
  points from the angles, then assert the drawn angles equal the stated ones). Render every figure to an image
  (playwright, using `geoFig`/`svgFig` from `src/app.html`) and look at it before committing; give the rendered
  images to the blind checker too.

## Retrofitting an old lesson (meaning first; done for sci-solution-3 and math-stats-5 on 19 Nov, sci-solution-4, sci-separation-2 and sci-solution-5 on 20 Nov 2026)

Lessons written 4–12 Nov lack `hook`/`more` and open with a formula. Recipe (keep it the same for the rest):
- Keep the set id, `added` and the ids of items whose idea stays; add `"revised": "YYYY-MM-DD"` and a one-line
  `revisedNote`. Only do this for lessons not yet served (check `lessonQueue`); a played item's id must keep its meaning.
- `concept.hook` (a case where the obvious answer is wrong), point 1 = what the idea is for, formulas only after the
  idea, one `more` per point, `concept.figs` where a picture carries the point.
- Every practice item: `sub`, `optErr`, explicit `ctx` (drop `ctxAuto`), `ex` opening with what the quantity means.
  `check` (3 reasons, right first) on level-3 and tempting level-2 items; a wrong reason may land on the right number by
  a real shortcut (that is the point), but it must be plainly invalid reasoning. `predict` where direction catches the error.
  At least one `ask:"meaning"` or `ask:"method"` item per formula subtopic in the lesson.
- Add what the school booklet needs that the old lesson missed (content/midterm-plan.md), update `qtags.json` for new or
  re-tagged ids, then the blind check with rendered figures (hard rule 5).
- Since 20 Nov a retrofitted lesson also gets ≥ 12 practice items (13–14 so far), `parts` on every new level-3 item, and about one
  "which statements are correct" item (ก ข ค) per lesson. Option sets for a predict must ask about one unambiguous quantity: the
  blind check on 20 Nov caught "more or less gas comes out" (out of the bottle vs left dissolved); ask what the water can hold instead.

## Spoken-style cards (`concept.talk`, father agreed 24 Nov 2026)

Why: the student said the cards "feel like AI" and have no pictures, and that she understands when a person explains aloud.
Measured 23 Nov: card points ran 134 characters on median with 3–5 facts each, 4 different analogies per card, almost no science figures.
A `talk` card replaces the point-by-point card in the lesson (the old `points` stay: the comparison button, the library and
the loop still use them). Shape: `"talk":[{"lines":["short sentence", ...], "fig": {...optional geo/svg...}}, ...]`, 4–7 screens.

Rules (check each screen against all of them):
1. **Write it the way a parent explains aloud to a child at the table.** Read it aloud: if you would say it differently, rewrite it.
   Talk to her ("ลองนึกถึง…", "ทีนี้…", "แล้ว…ล่ะ?"), never textbook register. No "·"-joined lists of facts.
2. **One idea per screen, one fact per line.** A line is one short sentence (aim ≤ 60 characters, never above ~110). 4–6 lines a screen.
3. **Example or picture before the rule.** Start from something she can see or do (a glass of hot water, sticks of fixed length),
   then name it ("วิธีนี้เรียกว่า…"). The technical term comes after the idea, once, in brackets if needed.
4. **One analogy per idea, not five.** Keep the same picture across screens when you can.
5. **A figure whenever she must imagine something** (apparatus, shapes, angle pairs, graphs, before/after). Thai labels, large text
   (≥ 12 px in a 360-wide viewBox), every figure has `desc`; render and look at it; never copy a book figure.
6. Say why ("ทำไมใช้ได้?") in one line where the reason is short; leave long derivations to `more`/library.
7. Numbers in an example must not be the numbers of a practice item (do not give away an answer).
8. Facts must match the lesson's `points` and formulas exactly (same conditions, same thresholds); the talk card is a rewrite, not new content.
9. When she taps a sentence as confusing (record `talk.marks`), rewrite that sentence the next run; keep a short note in the run report.
Example (crystallisation, before → after): "การตกผลึก: เตรียมสารละลายอิ่มตัวที่อุณหภูมิสูง แล้วปล่อยให้เย็นลง ตัวละลายส่วนที่เกินจะตกผลึกออกมา …"
→ "ลองนึกถึงน้ำร้อนหนึ่งแก้ว / เราเติมน้ำตาลไปเรื่อยๆ จนละลายไม่ไหวแล้ว (สารละลายอิ่มตัว) / ทีนี้ปล่อยให้แก้วเย็นลง / น้ำเย็นรับน้ำตาลได้น้อยกว่าน้ำร้อน /
น้ำตาลส่วนที่ "ล้น" เลยต้องออกมาเป็นเม็ดแข็งๆ นี่แหละคือผลึก" + a before/after figure.
In the app (`renderTalk`): hook first, then one screen per tap, every line tappable to mark "งง", then a rating screen (เข้าใจ /
เข้าใจบางส่วน / ยังงง, a button to open the old card and say which is easier, an optional note), then formulas and vocab. 📖 peek shows the talk card.

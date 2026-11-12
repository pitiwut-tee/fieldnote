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
- Item fields: `of` (answered a twin of this id), `recall:true` (typed answer), `cover:true` + `coverSec`.
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
  "the longest option", reading a number off the table). The app shuffles them, shows the check only after a right
  answer, gives +5 XP for the right reason, and a wrong reason sends the question back to review.
- Item fields: `checkOk` (true/false). A `checkOk:false` counts like a mistake when you pick twins and plan.
- `exSec` = seconds from answering to the next question (time on the explanation). Below 3 s on a right answer
  means she did not read it.


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

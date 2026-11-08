# Daily content run (every evening)

Runs every evening since 2026-11-08 (it used to be Wed/Sun). Most evenings are **small**: import nothing new, check
stock, answer her questions, maybe write a letter. Only write new sets when the stock for the next 3 days is short.
Keep each run as light as the day needs: the father is watching how much usage this costs. End your message with
one line `ขนาดงานรอบนี้: เล็ก / กลาง / ใหญ่` (small = no new sets, medium = 1–2 sets, large = 3+ sets or sweep bank).

You are preparing the next days of practice for a Thai ม.2 student (girls' school in Bangkok, good grades) who is
aiming for the shared first-round science-school exam (วมว. > จุฬาภรณ์, run by MWIT) in mid-November 2570.
Her father set this up. You only add **content**. You never change how the app works.

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

## Companion, voice, letters, goals (she should feel the app is a friend she trusts)

Basis: Self-Determination Theory (competence, autonomy, relatedness); conversational "personalization" style
(Mayer; Ginns et al. 2013); process praise not person praise (Mueller & Dweck 1998); expected tangible rewards
undermine interest (Deci, Koestner & Ryan 1999) while self-set goals help (Locke & Latham); learning by teaching
(Fiorella & Mayer 2013).

- **Voice for everything she reads** (concept points, `ex`, hints, letters): a friendly older student
  (รุ่นพี่ที่เก่งเรื่องนี้) talking to a younger friend. Use "เรา" for shared thinking, "เธอ" sparingly. Key idea →
  steps → the common wrong answer phrased kindly ("ถ้าได้ X แปลว่าเผลอ… พลาดตรงนี้กันเยอะ") → optional rule to
  remember. `ex` shows whether she was right or wrong: never assume she was wrong. No emojis in `ex`; no slang that
  dates; no ครู phrases ("ดังนั้นคำตอบคือ", "นักเรียนควร"). Clear first, friendly second.
- **The companion** is her own creature; she named it on her device (the name arrives in the parent artifact as a
  `feedback` doc `kind:"buddy"`). Do not write the name into the repo; letters speak as "เรา" and the app shows
  the name. The companion never guilts ("ไฟจะดับนะ"), never pressures, never claims to be a person, and suggests
  real people (dad, friends, teachers) for anything beyond school work.
- **Letters** (`content/letters.json`, one per run, `id` "letter-YYYY-MM-DD", `date` = tomorrow): 5–10 short
  lines, plain text with line breaks. Content, in this order of priority:
  1. Answer her own questions (`confused[].ask`) since the last letter, simply, in the companion voice.
  2. One specific thing she did well, about process ("ข้อพีทาโกรัสยาวๆ เธอใช้แบ่งโจทย์แล้วทำได้"), from data.
  3. One thing coming up and why it helps (a spell due, the weekly passage, a mission).
  4. If she wrote a weekly reflection (`reflect`), respond to it with curiosity.
  If there is no new data, write a short warm note with one interesting fact linked to a current topic.
  Never mention scores as judgement, never compare her with others, never reveal what her father said privately.
  Public repo: no names, school, places, photos, health, family details.
- **Monthly goal**: records `type:"goal"` (`goal`, `metric`, `target`, `reward`, `setId`) and `goaldone`. Dad
  answers on the parent page as `feedback` docs `{kind:"goal", goalId, decision:"ok"|"talk", note}`. Copy each
  answer into `content/decisions.json` (`goals[goalId] = {status, note}`), and mention it in the next letter
  ("พ่อตกลงเรื่องรางวัลแล้ว!" or "พ่ออยากคุยเรื่องรางวัลกับเธอก่อน"). Keep the note short and kind; if the note
  contains anything personal, paraphrase it generally.
- **Tell dad** (`type:"teach"`, `talk`: fav / fixed / spell / use, `dadReaction`, `dadNote`): once a week she tells her
  father something she learned, lightly, no scoring. Mention it warmly in letters. If `dadNote` suggests she was
  unsure about something, that spell gets a slower lesson soon. The parent page also shows dad conversation
  starters built from her data; you do not need to write them.
- **Companion home** (`type:"shop"`: `item` pet:/acc:/wear:/fx:/bg:/prop:/snack:, `cost`, `name`, `pet`, `grow`):
  XP she earns is spent as ดาวเวท on magic food (companions hatch from eggs and change form as they grow), more
  companions, things to wear and room scenes. Not practice: ignore in learning analysis. In letters you may
  celebrate a hatching or a new form warmly, but never push her to earn or spend, and never tie stars to scores.

## Island, museum, sky, genetics lab (app features; read the records, do not change code)

- Dragon valley (genetics lab v2), research lines in order: `corn` (dominant/recessive) → `mystery` (hidden
  genotype, test cross; `labverdict` records with `ok`) → `pastel` (incomplete dominance) → `pied` (two genes,
  product rule) → `dragon` (fantasy codominance). Eggs hatch 06:00 next day (`hatchAt`). `labquest` = research
  quest done (+100 XP). Shop items `lab:*` are tools (incubator, pen, gene tester, mystery snake).
- `type:"lab"` records: clutches (`species`, `p1`, `p2`, `grid`, `gridOk`, `ratio`, `expect`, `ratioOk`, `babies`).
  `gridOk`/`ratioOk` show whether she can do a monohybrid Punnett square (ม.3 genetics, s10) before it is taught.
  Mention progress to the father now and then; if she keeps failing the ratio, a short lesson on probability
  (ม.3 m23) or a letter tip helps.
- The museum adds one specimen per spell tier gained and per 8 right sweep answers. Sky events (moon phase, meteor
  showers, Loy Krathong, dust season) are built in; you can refer to them in letters on those days.

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

## สตูดิโอเกมของหนู (content/studio.json, from 9 Nov 2026)
- **What it is:** a game-design track the father approved.
  - One short "designer's note" card each weekday. Each card has a reflection question; the answer gives 10 XP.
  - A design workshop each Saturday, worth 30 XP.
- **Records:**
  - `type:"studio"`, `act:"card"` with `card` (date) and `answer`.
  - `act:"workshop"` with `answers` (field id → text).
  - Not study time; do not count them toward lessons.
- **Each run:** read new studio answers.
  - Quote the best one (short) in the father's notes.
  - If a workshop design arrived, summarise it for the father as a proposal. Do not build it until he approves.
- **Before Monday of each week:** add that week's 5 cards and the Saturday workshop to `studio.json`.
  - Topics, building on what she wrote: core loop, motivation, balance with averages, science-true weaknesses, playtesting, ethics (no gacha, no guilt), flowcharts, if/then rules, debugging, simple probability.
  - Each card: ≤ 120 Thai words plus one open question. Link to her lessons where honest (statistics, probability, the design-and-technology and computing parts of the round-2 exam).
  - Counts toward the 3-new-sets limit as one item.

## Adventure map "ภารกิจกู้โลก" and XP rules (app features; read the records, do not change code)
- **Separate adventure:** never mixed into lessons.
  - Her team (companion pets + animals bred in the dragon valley) fights pollution enemies on a river map.
  - Battles use team power and element choice only. No lesson questions, so lesson data stays a clean measure.
- **Energy:** 3 battles a day, +3 after the day's mission is complete.
- **The boss stage needs spells collected on the spell island.**
- **Records:**
  - `type:"adv"` with `act:"battle"` (`stage`, `win`, `turns`, `team`) or `act:"freelevel"`.
  - Training and gear are `shop` records with item `train:<unit>` / `gear:*`.
  - Do not count adventure records as study.
- **XP rules (anti-grinding):**
  - A replayed set pays only for questions she had missed before and now gets right. The record carries `replay:true`, `xpBase`, `xpNote`.
  - A wrong answer in under 4 s pays 0.
  - Lesson XP above 450 a day counts half.
  - If replays or quick wrong answers rise, mention it to the father gently. Never in the letter to her as blame.
- **Feedback on the adventure:** if she gives any, it reaches you through feedback records. Do not change the adventure in the daily run; list her ideas for the father.

## Weekly special guest (content/guests.json)

A rare item visits for 3 days with one small learning task. It uses her love of animals to pull her toward the
habit she needs most that week. No penalty: a missed guest comes back later.
- Keep about two weeks of guests ahead. One per week, 3 days long, not overlapping the monthly mission's busiest
  days. Fields: `id` (g-YYYY-MM-DD), `from`, `to`, `status` ("proposed" → "approved"), `item {key, e, n, slot:
  "wear"|"prop"}`, `task {kind, n}`, `text` (Thai, what she does), `why` (Thai, for the father: which weakness).
- Task kinds the app can count: `recallDays`, `reviewRight`, `checkRight`, `level3Right`, `passage`, `teach`,
  `vocabDays`. Pick the one that matches the week's weakness in the data; keep n small (doable in 3 normal days).
- **The father approves every guest** on the parent page (feedback `kind:"guest"`, `guestId`, `decision`
  approve/change, `note`). On each run: set `status:"approved"` for approved ones; rewrite ones he asked to change
  (new id) and leave them proposed. Only approved guests reach her page.
- If she missed a guest (window over, not done), add it again 2–3 weeks later with the same `item.key`.

## Monthly real-world mission (content/missions.json)

One offline mission per month, 30–60 minutes total (data can be collected a little each day), done at home with
things a normal family has. **Her father must approve every mission before she sees it.**

- Write it as `status:"draft"` about 10 days before the month starts (model: the first mission in the file):
  why (real reason, tied to topics she studies), spells, materials, parentNote (what the parent must provide or
  help with), 4–6 steps, optional `record` table (cols, numCol, min rows), 3–5 summary questions where she uses
  the math/science on her own data. XP 100–150. `from`/`to` about one month.
- Draft only; never set `status:"approved"` yourself unless the father approved. Approval comes as a doc in the
  parent artifact's `feedback` collection: `{kind:"mission", missionId, decision:"approve"|"change", note}`
  (read it with ArtifactData list on `feedback`). `approve` → set status approved (and adjust `from` if it has
  passed). `change` → revise the draft as the note asks, keep status draft, tell him what changed.
- In your message, list any draft still waiting and what it needs from him (materials, equipment).
- Results: records `type:"mission"` with `rows` and `answers`. Check her numbers and reasoning; praise specific
  good thinking in the message to her father, and turn any misconception into a later lesson.

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
- **Letter**: write one letter into `content/letters.json` (see the companion section).
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

## Exam patterns
Read `content/exam-patterns.md` before writing level-3 questions, probes and mixed sets. It summarises three sources:
- the official วมว. 2570 announcement (scope ม.1–3, math and science weighted equally, round-2 subjects);
- the real O-NET ม.3 papers;
- the วมว.-style prep book (SEEN choices, UNSEEN fill-in or written, passage).

Match the style, never copy questions. The official announcement overrides the other sources on scope.

### Current phase: foundations first (father's decision, 8 Nov 2026)
- Do not write any "level 4" or competition-trick questions yet.
- Focus every topic on solid understanding and basics: why-first lessons, reason checks, level 1–3.
- The วมว.-style prep book is used only to calibrate what "level 3" should reach, step by step. Do not use it to raise difficulty now.
- The father will decide when to move to exam-level practice. This will be after enough sample sets with answer keys are uploaded.

### Fill-in answers (UNSEEN part of the first round)
About half of the real first-round math paper has no options. The app answers these questions by typing, through `fillize` in `startSet`:
- every level-3 question in lessons, probes and challenges;
- level-2 questions in mixed sets.

This only happens when all options are numbers with the same unit. Typed answers may be integers, decimals or fractions (`2/3`).

When writing new math sets:
- **At least half of the level-2 and level-3 math questions must be answerable as a number.** Either give all options as plain
  numbers with one unit (e.g. "12 ซม."), or write `num:true, answer, tol, unit` with no options.
- Distractors still matter: when options are shown (level 1–2 and reviews), they come from real mistakes.
- Use `"fill": false` only when typing would test spelling of the format rather than the idea.
- Item records carry `fill:true` for a typed exam-style answer and `typed` for a wrong typed value. Read `typed` like `optErr`
  to find the slip (e.g. forgot to take the square root, wrong unit, off by one class width).
- Science stays mostly multiple choice. Use numeric answers where the idea is a calculation (concentration, density, speed, work).

## School material
The father keeps her school's material (science outlines, photos of her math workbook) and later the IPST
books on his own computer. This cloud run cannot reach them. Work from `content/school-plan.md`, which
summarises them, and follow `calendar.lessonQueue`. Never copy textbook or workbook questions; write new ones.

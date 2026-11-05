# Twice-weekly content run (Wed and Sun evening)

You are preparing the next days of practice for a Thai ม.2 student (Assumption Convent, GPA ~3.5) who is
aiming for the shared first-round science-school exam (วมว. > จุฬาภรณ์, run by MWIT) in mid-November 2570.
Her father set this up. You only add **content**. You never change how the app works.

## 0. Ground rules

- Edit only `content/` (sets, vocab, readings, calendar). Never edit `src/app.html` or `tools/`.
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
8. **Mastery before moving on** (Bloom 1984). Do not add new topics for a spell that is under 60% at level 1;
   write a slower re-teaching lesson for it first.
9. **Motivation without bribery** (Self-Determination Theory; Hanus & Fox 2015). Never add rewards for speed or
   volume alone, never shame. Contexts follow her interests (see ground rules) so the questions feel like hers.

Rules of thumb in this guide (60%, "hard twice in a row", 7 days ahead) are practical estimates, not research
values. With one student and few answers per spell, prefer simple rules and say in the message to the father
when the data is too thin to conclude anything.

## 1. Get the repo and the data

1. Attach and clone `pitiwut-tee/fieldnote` with push access (add_repo, then clone as instructed).
   Commit with `git -c user.name="pitiwut-tee" -c user.email="pitiwut-tee@users.noreply.github.com"`.
2. Read results from the parent page's database (ArtifactData, url
   `https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR`, collection `attempts`, list with `out_dir`).
   Ignore documents with `test: true` or `example: true`.
   Record types: `set`, `probe`, `mixed`, `review` (practice), `vocab`, `skip` (one day or `leave` range), `daymode`.
   Item fields worth reading: `due:true` (a spaced-review question: accuracy here = long-term memory),
   `conf` ("sure"/"unsure", trial), `explain`/`ownWhy`/`ownWhyPad` (her written reason before the answer, trial).
   Records may have `trial:{on:[...],vote:{confidence|explain: "good"|"ok"|"bad"}}`.

## 2. Look at the data (write short notes for yourself)

- Per spell (`items[].spell`, or look up the question id in content): accuracy by level 1/2/3.
- Mistake reasons (`items[].errorTypes`): concept / read / misopt / unclear / calc / guess / dontknow.
  Many `concept` or `dontknow` on a spell → next lesson for that spell re-teaches with a slower concept card.
  Many `read` / `misopt` → add longer, carefully worded questions. `unclear` → rewrite that question
  (edit its JSON, keep the same id) and mention it to the father.
- Her own questions (`confused[].ask`): answer the idea inside the next relevant concept card or glossary-style
  point, in simple words.
- Time: lessons should take ~25–30 min, vocabulary ~10 min. Ratings "ยาก/ยากมาก" two or more times in a row
  on a spell → keep the next set at level 1–2 heavier.
- Probes (`type: "probe"`): spells under 60% → add a lesson set for that spell soon (Friday repair uses
  her wrong answers automatically; you do not write repair sets).
- Spaced review (`due:true` items): accuracy under 60% on a spell means it is fading; give it a lesson soon.
- Trials (`calendar.trials`): count her votes; read `ownWhy` texts. A wrong answer with a sensible reason is a
  slip; a wrong reason is a misconception: re-teach that idea in the next concept card. "Sure but wrong" items
  are the most valuable misconceptions to address. Report votes to the father; he decides whether a trial stays.
- Vocabulary: words wrong on spelling repeatedly; how many fresh words remain in `content/vocab.json`.

## 3. Decide what to write

Count forward 10 days from tomorrow using `content/calendar.json` (holidays, `schoolOff`, `schoolBreaks`)
and weekends:

- School day needs 1 lesson (topics in `calendar.currentSpells` first).
- Holiday needs 1 lesson + 1 probe + 1 extra lesson (full level).

Weekly mixed set: the app offers one unused `kind:"mixed"` set per week (`calendar.mixedPerWeek`, default 1) on
a holiday, in the probe slot. Keep at least 1 unused mixed set ready. From 2027-09-01 (about 2.5 months before
the exam) set `mixedPerWeek` to 2 and keep 2 ready.

A set counts as "unused" if no non-test attempt has its `setId`. Keep **at least 7 days** of unused
content ahead. Usually that means per run: 2–4 lesson sets for current school topics, 1–2 lesson sets for
older or weak topics, 1–2 probes. Do not write more than 8 sets in one run.

Probe order (skip ones that already exist in `content/sets`): m3 อัตราส่วน, m17 พีทาโกรัส, m16 ความเท่ากันทุกประการ,
m5 ทฤษฎีจำนวน, m6 แบบรูป, m7 สมการเชิงเส้น, m4 จำนวนจริง, m15 เส้นขนาน, m19 พื้นที่ผิวและปริมาตร, m8 กราฟเชิงเส้น,
m1 จำนวนเต็ม, s1 อนุภาค, s7 เซลล์, s8 พืช, s12 ความร้อน, s13 แรง, s14 ความดันและแรงลอยตัว, s9 ร่างกายมนุษย์,
s19 บรรยากาศ, s3 การแยกสาร, s22 ตัวแปร, s23 อ่านกราฟ.

Read `content/school-plan.md` every run: it holds the science weighting estimate, the usual topic order, and
known gaps. Follow its balance when choosing non-current topics. If it ever contains the school's own outline,
use that for `currentSpells` and update `calendar.json` when the school moves to a new topic.

## 4. Write the content

Copy the shape of an existing file exactly. Lesson: `content/sets/001-math-stats-2.json`.
Probe: `content/sets/006-probe-exponents.json`. Name new files with the next number: `008-<id>.json`.

Lesson rules:
- `kind:"lesson"`, `spell` from `content/spells.json`, `added` = today's date.
- `warm`: 2 level-1 questions from **older** topics, each with its own `spell`.
- `concept`: title, 3–5 points, 1–2 formulas, 3–4 vocabulary pairs, `alts` with two alternative
  explanations ("อธิบายแบบช้าๆ", "ทำให้ดูทีละบรรทัด").
- `practice`: 8 questions = 3 level-1, 3 level-2 (one is `"en":true` English corner with Thai glosses in
  brackets), 2 level-3 (long real-life situation, data to interpret, or reasoning like the science-school exam).
- `challenge`: one numeric question (`num:true, answer, tol, unit`), level 3.
- `hints`: 1–2 hints for every question id. `ex`: explain why the answer is right **and** why the common
  wrong option is wrong.
- Distractors must be the mistakes students really make (forgot to sort, used the wrong total, etc.).

Mixed set rules (`content/sets/020-mixed-1.json` is the model): `kind:"mixed"`, no `spell` on the set, no warm,
no concept, `challenge:null`. 12 questions (10–15 allowed), every question has its own `spell`, at least 4
different spells, only topics she has already learned at school or practised in the app. About 3 level-1,
6 level-2, 3 level-3. Include pairs that look alike but need different methods (resultant force vs Pythagoras,
"percent of new price" vs "percent of old price"), because telling them apart is the skill being trained.
Questions are new (do not copy existing ones). Hints for every question.

Probe rules: `kind:"probe"`, no warm, `challenge:null`, 10 practice questions (4 level-1, 4 level-2 with one
English corner, 2 level-3), a concept card used as the summary after the probe.

Vocabulary: when fewer than 15 words in `content/vocab.json` have never been used (cannot know per device —
just keep at least 25 words beyond what has been introduced at 5 per day since 2026-11-05), add 20–30 words:
mix general academic, science/math, and story/art words; each with Thai meaning, a short example sentence and
its Thai translation (`exTh`). Readings: add 1–2 when there are fewer than 4 unseen weeks' worth.

## 5. Verify before publishing (all must pass)

1. `python3 tools/build.py` then `node tools/verify.js` (installs: `npm i playwright` if missing; Chromium
   is pre-installed). Fix every problem it lists.
2. Re-solve every new question yourself from scratch, in code where there is arithmetic, and compare with
   the stored answer. Check that exactly one option is right.
3. Ask a separate subagent that has not seen your reasoning to review only the new JSON files for: wrong
   answers, more than one defensible answer, ambiguous Thai wording, content outside ม.1–ม.3, and real
   character or brand names. Fix what it finds and run step 1 again.

## 6. Publish

1. Commit and push to `main` (`git fetch origin main && git push origin HEAD:main`). GitHub Pages serves
   `index.html` to the student.
2. Read the parent artifact once (Artifact `read`, url above), then publish `dist/parent.html` to that same
   `url`. Do not create a new artifact.

## 7. Tell the father (in Thai, short)

Send one message (and a push notification) with: what was added for which days and why (one line each),
what the data showed (2–4 bullets, with numbers), anything you rewrote because she marked it unclear,
anything you were unsure about or need from him (e.g. school schedule, codes not imported since last run).
If no new results were imported since the last run, say so and that the content followed the calendar only.

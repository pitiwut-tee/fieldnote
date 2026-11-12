# School exams, exam format, curriculum map and readiness (read when deciding what to write)

Split out of AUTOMATION.md on 12 Nov 2026, text unchanged.

## School exams (calendar.schoolExams)
- **Dates:** estimated from last year (midterm 14–18 Dec 2026, final 22–26 Feb 2027) and marked `estimated`.
  When the father sends the real dates, replace them and drop the flag.
- **Prep week (7 days before):** slot 1 becomes "ทบทวนก่อนสอบ…". It holds 10 questions from the exam spells, weighted to past mistakes.
  - There are no new lessons, probes or mixed sets.
  - Do not add new-topic lessons to `lessonQueue` that week. Twin questions for her mistakes on exam spells are the best use of the daily run.
- **During exam days:** only vocab is required.
- **Exam spells:** keep the `spells` list in line with `content/school-plan.md`.


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


## Curriculum map and readiness (11 Nov 2026)
- `content/curriculum.json` = 51 spells → 238 subtopics (`{id,n,g}`), draft built from the MWIT 2570 topic list. Items marked "confirm" still need checking against the real textbooks.
- `content/qtags.json` maps every qid → one subtopic id. **Every new question must be added to qtags.json** (verify that all QBANK ids are tagged before committing).
- When choosing what to write next, prefer subtopics with no questions, then subtopics with no level-3 questions (the parent page's readiness section shows both). Current-term content first.
- Readiness status rules (parent page) — REPLACED 11 Nov by the father-approved 5-level scheme below.


## Readiness levels, checkpoints, competition challenges (father approved 11 Nov 2026)
- Practice only proves "เข้าใจ" (L1–2 ≥6 items, ≥80%). Higher levels need CHECKPOINT evidence: a question she has never seen, met mixed (the "ด่านตรวจความจำ" steps in a lesson warm-up — max 2, item flag `chk:1` — or a first-time question in sweep/mixed/probe) on a later day than she first practised that subtopic. Checkpoint "correct" = correct, no hints, not guessed, not "unsure".
- จำได้ = checkpoints correct on 3 different days, last ≥14 days after the first, last two checkpoints not wrong. ใช้เป็น = จำได้ + ≥5 L3 checkpoints at ≥70%. Levels drop when checkpoints fail.
- พร้อมสอบ is per spell: every subtopic ≥ จำได้ + a timed mixed set of that spell (≥20 items, ≥80%; not built yet) + an external mock exam. Never report a spell as exam-ready before all three exist.
- `checkPlan()` schedules checks (1 day after practice, then +3, then to reach 14 days; after a wrong one +2; maintenance 21 days) and needs UNSEEN questions per subtopic. The parent page shows "ถึงรอบแล้วแต่ไม่มีข้อใหม่ให้ตรวจ N เรื่อง": **filling those is the top content priority** — write fresh twins (content/variants.json, key = original id) or new questions tagged in qtags.json. Then subtopics with no questions at all, current term first.
- Competition challenges: `content/challenges.json` (items with spell, sub, level 3, hints, stepped ex). One a day on the secret path, only for spells where a subtopic is at "เข้าใจ"; type "comp"; XP 10 if the explanation was read through (4 if not) + 5 if correct; NOT counted in readiness. Keep at least ~5 unseen items per open spell; every new item goes through an independent blind answer check before it is committed. Own wording only, never copied from tutor books or past papers.


## Textbook alignment and exam format notes (11 Nov 2026)
- Every subtopic in content/curriculum.json now has `b` = its place in the IPST basic textbooks (taken from the official chapter lists at proj14.ipst.ac.th, ม.1–3 science and math, 2 books each). `b` containing "นอกหนังสือ" = on the exam list or common in entrance exams but not in the basic books; those need extra care in explanations (she has not met them at school).
- Added: s2.6 atomic structure (ม.1), s18.6 total internal reflection / dispersion (ม.3), m19.7 pyramid/cone/sphere (ม.3, NOT on the 2570 round-1 list — do not prioritise).
- MWIT round-1 math format (tutor article, not official): ≤35 questions, 90 points, 90 minutes; SEEN = 4-choice; UNSEEN = written answers, sometimes a ~2-page passage introducing a new idea (e.g. number bases) with several questions. Consider short "unseen" math passages later (own writing), like the science passage sets.
- Recalled past papers (MWIT/จภ./วมว. math 2552–2569) are indexed at roonpii.com/papers/m4-mwit-math; the files sit on Google Drive, which this environment cannot open. Never copy them into the repo. Their use is as a timed external mock the father prints; only the score goes into the system.
- (11 Nov) Stem-and-leaf data must always be a `fig` {kind:"stem"} table, never inline text like "2 | 2 6 · 3 | 0 x 8" — the father found the inline form hard to read. Notes about the data (key, "x is the missing digit") go in the question sentence or the fig key, not glued after the last data row.


## Exam analysis from recalled papers (12 Nov 2026) — READ content/exam-analysis.md before writing new sets
- The father supplied student-recalled MWIT round-1 papers (science sat 2565 and 2567; math sat 2566–2568). They stay on his computer. Never copy items; own wording only. content/examfreq.json feeds the "เทียบกับข้อสอบรอบแรกจริง" box on the parent page (update `spells` counts only when new papers are analysed).
- Content priority now = (1) checkpoint shortages, (2) current school term, (3) the exam-gap list on the parent page: science s9 human body, s8 plants, s16 motion/energy, s20 earth; math m5 number theory, m6 patterns, m19 volumes incl. cone/pyramid, counting & logic, m13 systems.
- Style rules for every new science set: most items hang on a figure/table/graph/experiment; include at least one "which statements are correct" item and one experiment-logic item. For math level 3: prefer written-answer (fill) items; statistics as "condition" problems.
- Still to build (tell the father when done): math unseen-passage sets (number bases, binary-like codes, a new distance/operation definition; 1 page + 5 graded items), physics/biology unseen passages, a minority "pick 2" item type, a counting & logic strand in the curriculum map.
- The recalled papers are the external mock exams. Plan: father prints one, she sits it timed (90 min) after ม.2 term ends; only per-item right/wrong goes into the system. Do not use them before then, and do not expose her to their items through the app.


## New fig kind, gap sets, math unseen passage (12 Nov 2026, evening)
- `fig` kind `"line"`: {pts:[[x,y],...] or series:[{name,pts}], xl, yl, xmax, ymax, xstep, ystep, caption}. Use it for distance–time / speed–time graphs and any "read the graph" item. verify.js accepts it.
- New sets: math-numtheory-1 (m5), sci-motion-1 (s16), sci-body-1 (s9), passage-math-1 (first math Unseen passage, spell t3, binary code idea). All 40 new items passed an independent blind check (40/40 keys agreed; wording fixes applied).
- Set-level `oneContext` (string reason) waives ONLY the "at least 1 earth context" rule, for single-story passages. Do not use it on ordinary lessons.
- The father decided (12 Nov): math this term is trained at IPST textbook level and above; the school workbook level is the floor, not the target.
- IPST math ม.1 เล่ม 2 บทที่ 2 file on the father's computer has only 1 page (end-of-chapter exercises); its problem STYLES (inverse proportion with workers, scale drawing -> real area -> cost, currency exchange) informed sw-m3-4/5/6 in sweep-3. No text was copied.
- Next gap sets to write: plants s8, earth s20, volumes m19 (incl. cone/pyramid), counting & logic, a second math unseen passage (new operation definition), physics/biology unseen passages.


## School midterm scope read in full + IPST chapter pilot (12 Nov 2026, evening)
- Read the school's five science midterm PDFs (82 pages, text-extractable). Full scope is now in
  content/school-plan.md under "Science midterm (Nov–Dec)". Re-read them cheaply whenever a สารละลาย or
  การแยกสารผสม item is being written; do not guess the scope.
- Curriculum additions: s3.7 การกลั่นลำดับส่วนและการแยกน้ำมันดิบ, s4.9 สารละลายของแข็งและแก๊ส โลหะเจือ
  และความเข้มข้นที่ใช้จริง. Both came straight from the school documents and had zero questions before.
- New sets: sci-separation-3 (s3, fractional distillation + crude-oil tower + Rf), sci-solution-7 (s4, solid and
  gas solutions, the two solvent/solute rules, solubility table incl. the lithium-carbonate trap, real-world
  concentrations), math-ratio-2 (m3, three-term and chained ratios, inverse proportion). All three inserted into
  calendar.lessonQueue right after sci-separation-1, ahead of the exam-gap lessons, because the school midterm
  is in December.
- The IPST-chapter pilot verdict and the rule for when to read a chapter in full are in school-plan.md.
- Blind check on the 31 items: 30/31 agreed. It caught ONE WRONG KEY (math-ratio-2 challenge: the worked
  solution derived 186 g but the stored answer index pointed at 150 g) and one ambiguous item (two options were
  the same ratio in different terms). Both fixed, plus 6 wording/explanation fixes. This is the second time the
  blind check has paid for itself — keep running it on every new set, no exceptions.

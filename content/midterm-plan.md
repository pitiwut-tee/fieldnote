# Midterm plan (school midterm 21–25 Dec 2026, given by the father on 18 Nov; the school has not confirmed)

Made 18 Nov 2026. The father's status doc has the same plan in Thai (tab "แผนสู่กลางภาค") and keeps the queue rows.

## Scope (confirmed by the father and by the school booklet's cover/pages seen 18 Nov)
- **Math:** the school's booklet "statistics 2 + congruence + geometric reasoning (1)". Statistics is already taught at
  school; congruence is being taught now. The booklet also has (a) written proofs in the given / to prove / reason
  format (AAS, isosceles triangles), (b) compass-and-straightedge constructions each followed by a "why it works" column
  (copy an angle, bisect an angle), (c) parallelogram proofs (diagonals bisect each other; a midpoint-built quadrilateral
  is a parallelogram). The booklet photos stop at the midterm; the Jan–Feb part has not been supplied.
- **Science:** the school's five midterm documents, solutions then separation of mixtures (read 12 Nov).
- Exam spells in `calendar.json`: m22, m16, m15, s4, s3.

## What the bank has (lesson sets only, counted by qtags on 18 Nov)
m22 (excluding m22.1, m22.2, m22.10) 73 items · m16 21 · m15 32 · s4 72 · s3 37. Thin: m22.9 range 3, s3.4 extraction and
steam distillation 3, s3.7 3, s4.8 3. Missing: construction-reasoning items; figures in sets 040–041 and in math-stats-3/5.

## Lesson order (calendar.lessonQueue, one lesson a day, math and science alternating)
19 Nov fix-math-1 · 20 sci-separation-3 · 21 math-parallel-1 · 22 fix-sci-1 · 23 math-congruence-1 · 24 sci-separation-4 ·
25 math-congruence-2 · 26 sci-solution-3 · 27 math-stats-5 · 28 sci-solution-4 · 29 math-stats-6 · 30 sci-separation-2 ·
1 Dec math-georeason-1 · 2 sci-solution-5 · 3 math-parallel-2 · 4 meaning-sci-1 · 5 construction-reasoning lesson (TO WRITE,
insert before meaning-math-1) · 6 Dec checkpoint cp-1 (replaces the lesson) · 7 meaning-math-1 · 8 tool-ratio-table-1 ·
9–11 spare days for lessons she missed · 12 Dec mock-midterm checkpoint (TO WRITE) · 13 Dec read results and repair ·
14–20 Dec prep week (the app already turns slot 1 into a 10-question review; no new lessons) · 21–25 Dec exams.
Exam-gap lessons (ratio, number theory, motion, body) are queued after the midterm.
**19 Nov shift:** math-stats-1 was served again on 19 Nov (its 4 Nov record was wiped from her device at the 5 Nov fresh
start), so every lesson above moves one day later: 20 fix-math-1 · 21 sci-separation-3 · … · 5 Dec meaning-sci-1; the
construction lesson and meaning-math-1 / tool-ratio-table-1 take 7–9 Dec; spare day 10–11 Dec.
If she falls behind, drop in this order: tool-ratio-table-1, meaning-math-1, math-parallel-2, sci-solution-5.

## Why this order
- Lessons not yet rewritten "meaning first" (sci-solution-3/4/5, sci-separation-2, math-stats-5) sit late so they can be
  retrofitted before they are served (deadlines in the father's front-page queue). math-congruence-1/2 got their figures on 18 Nov (plus trap-pair item cg2p9).
- Everything the Dec 6 checkpoint covers is taught by 29 Nov (7 days earlier); everything the 12 Dec mock covers is taught by 5 Dec.

## Work to write (each needs the independent blind check, hard rule 5)
1. Figures for 040–041 by 22 Nov (DONE 18 Nov). 2. Retrofit sci-solution-3 (by 25 Nov; DONE 19 Nov), sci-solution-4 (27 Nov; DONE 20 Nov), math-stats-5 with
histogram/table figures (26 Nov; DONE 19 Nov, incl. class boundaries/width/midpoint, missing value from a mean, combine group
means), sci-separation-2 (29 Nov; DONE 20 Nov), sci-solution-5 (1 Dec; DONE 20 Nov). 3. Construction-reasoning lesson
(choose the reason, never draw) + two printed proof sheets, by 3 Dec. 4. Mock-midterm set (~28 items, school style, tags
"taught / not taught", fill-in proofs as pick-the-reason), by 10 Dec.

## Limits to say out loud (hard rule 6)
The mock is our own question set: it shows a trend, not readiness for the school's paper. The app cannot check
handwritten proofs or real compass work; two printed proof sheets a week, marked by the father in the "10 minutes" talk,
cover that. The school's real paper style is unseen: ask the teacher for the scope sheet and last year's midterm.

## Old-topic sweep ("ย้อนคาถาเก่า"): decisions of 18 Nov (father approved)
Why: 5 a day (10 on holidays) gives a trend, not per-spell readiness (~13 items per spell by 6 Feb), and the optional-button
idea was rejected because the student does not press optional things (e.g. secret missions). So no opt-in.
- **Size is set by the day, not by a button.** App change (queue item, Opus): when she starts the sweep, sum the time she spent
  that day on the other missions (record start–end) and compare with the day's target. Gap > 10 min → 10 items; gap 5–10 → 8;
  else 5. Holiday base 10, up to 15. Min-day stays 0. Numbers are tunable (father said "ตามนี้").
- **Locked until the other daily missions are done** (lesson, vocab, probe, extra; use the existing `noVocabToday`-style guards
  so a mission with nothing to serve never blocks it). Shown as "ปลดล็อกหลังภารกิจอื่นเสร็จ". Check the sheet at src/app.html
  "ไม่มีข้อค้างให้ทบทวน" (offers startSweep) so it cannot bypass the lock. Prep-week behaviour must be written down in the same change.
- Never tell her it grew because of low time (hard rule 7, no guilt). The parent page shows base size, served size and the time gap.
- **Pick items for information:** prefer spells with the fewest answers or an unclear record; skip spells already right on
  several days; spells in the repeated-error loop are not re-measured.
- Expected ~7–8 items a day → ~450–550 served by 6 Feb across 26 spells (≈17–21 per spell). Still a trend (hard rule 6).
- **Bank refill (each blind-checked; warn the father about usage before every round):** now 82 items. Round 1 by 30 Nov: ~60
  new items (spells the exam asks most often first). Round 2 by 20 Dec: situation twins of the 82 originals (reuse only
  after ≥ 3 weeks) + ~30 new. Round 3 by 10 Jan: ~60 new. Round 4 by 31 Jan: 30–50 new, sized by what is left. Round 1 must
  precede the app change so the bank does not run dry in week one. After round 1 the father reads Settings > Usage and we resize.
- Per-spell old-knowledge coverage also rides on cp-2 / cp-3 and the full papers (2–3 items per old spell per checkpoint).
- 13 Dec: per-spell readiness summary from sweep data with the item count per spell shown; trend only.

## School math booklet read in full, 18 Nov (34 photos in the folder, not 37; booklet pp. 1–25 + 3 proof/construction chapters)
Booklet = "สถิติ 2 · ความเท่ากันทุกประการ · การให้เหตุผลทางเรขาคณิต (1)". Nothing contradicts the plan; what it adds:
- **Statistics (6 practice sheets + end-of-chapter):** dot plot, stem-and-leaf (incl. back-to-back for two groups), frequency table with
  tally, **class boundaries (ขอบล่าง–ขอบบน), class width, class midpoint**, histogram read/drawn, percent of the class, range, mean from
  a list and from a frequency table, **a missing value from a given mean (also mean = median)**, combining group means (6 boys + 4 girls →
  total → the girls' mean), mean of 5 semesters' GPA with credits shown, median (odd/even N, frequency table, with an unknown x),
  mode (none / more than one), "equal 5 classes" histogram of 45 scores. Bank check: the words ขอบบน/ขอบชั้น/class midpoint appear in
  no set and อันตรภาคชั้น in only 2 places → **math-stats-5 must carry class boundaries, width and midpoint** (retrofit item).
- **Congruence:** naming corresponding parts, proofs written as *given / to prove / steps with a reason in brackets* and "with the
  relation ด-ม-ด / ม-ด-ม / ด-ด-ด / ม-ม-ด / ฉาก-ด-ด"; end-of-chapter: square diagonal, kite, "are these two triangles congruent, and
  why?" (a trap pair that may NOT be congruent), overlapping triangles ART/PIC. The school writes the criterion names as relation names:
  our proof items must show the same layout (pick the reason from 3 for the bracket).
- **Geometric reasoning (1):** proofs with parallel lines (angle sums, three parallel lines), the **six basic constructions with the
  reasoning table** (copy a segment, bisect a segment, copy an angle, bisect an angle, perpendicular from an outside point, perpendicular
  at a point on the line), "analyse the problem" (given / to prove) for isosceles pairs, equal altitudes (CD = BE, AD = AE), and
  **parallelogram proofs** (diagonals bisect each other; midpoints of two sides make DFBE a parallelogram).
- Impact on the plan: (1) the construction-reasoning lesson (queue 5) must cover all six constructions, each with "why it works" as
  congruent triangles; (2) the mock-midterm (queue 8) uses this booklet's layout: ~8 proof-completion items, ~4 construction-reason items,
  ~8 statistics items, the rest congruence; (3) the retrofit of math-stats-5 adds class boundaries/midpoint/width and the
  "missing value from a mean" and "combine group means" items; (4) add one "not necessarily congruent" trap pair to the congruence sets.
- The photos contain the student's handwriting and name: never copied into the repo; nothing personal is stored.

## 19 Nov evening: built early, and the volume raised (father's decision)
The father saw the sweep unlocked and the days running short (lessons take her ~12 min, a full school day was ~20–25 min
against 45–60) and asked to raise daily volume now, not after cp-1. Built in `src/app.html` (rules from 20 Nov,
`DAY_RULES_FROM`): the lock, the time-gap size (school 5/8/10 vs 45 min; full holiday 10/12/15 vs 75 min; mid/light
holiday 5/8/10), and a **daily mistake review** of 6 items (holiday 8) from `reviewPool` when it has ≥ 3, not on Friday
repair days, exam weeks, checkpoint/paper or minimum days. Expected school day ≈ 30–35 min. Prep week: no sweep and no
daily review (slot 1 is the 10-question exam review). Still open: info-based picking (queue 22, after the midterm).
**Bank consequence:** at up to 10–15 a day the sweep needs ~60 new items a week, so refills become weekly (front-page
queue 1 = 1A by 22 Nov, 7 = 1B by 30 Nov, 10 = round 2 with situation twins by 7 Dec, 14 = round 3 by 20 Dec, then
weekly from 28 Dec). On 19 Nov about 35 unseen items were left over 25 spells. A day where the bank runs short serves
fewer items; the parent page shows "served" next to the planned size.
cp-1 (6 Dec, queue 9) now decides only whether to add a second lesson a day, using two weeks of the new mission.

## Midterm coverage check, 21 Nov (front-page queue 4, part 1 of 2)
Done from the notes of the full reads already made (school math booklet 18 Nov, the five science documents 12 Nov,
IPST ch.1–4) against every set item (`sub` or `qtags`) plus a keyword scan of question text. The chat could not open the
father's folders (folder access was refused in that chat), so no school file was re-read; part 2 = re-read the five
science documents (text PDFs, cheap) to confirm, once he adds the folder in the desktop app. Items per subtopic (lesson
sets / checkpoint / twins), 21 Nov before the fill: m22.3 8 · m22.4 9 · m22.5 11 · m22.6 14 · m22.7 20 · m22.8 11 · m22.9 4 ·
m22.11 14 · m16.1–4 6/8/8/6 · m15.1 1 · m15.2 17 · m15.3 10 · m15.4 12 · s4.1 13 · s4.2 25 · s4.3 9 · s4.4 17 · s4.5 3 · s4.6 24 ·
s4.7 2 · s4.8 4 · s4.9 0 (solid/gas items of sci-solution-7 are tagged s4.1) · s3.1 6 · s3.2 8 · s3.3 9 (+6 twins) · s3.4 6 ·
s3.5 7 · s3.6 10 · s3.7 4.
**Gaps found (school scope, 0–1 questions) and filled the same day, 12 items, blind-checked 12/12 main + 6/6 reasons:**
tally into a frequency table (st6p9), mode with two values / no mode (st6p10, her marked "mode = frequency" error is a
distractor), back-to-back stem-and-leaf (st6p11), what a range says (st6p12, `ask:meaning`) → math-stats-6 now 12 practice;
proof "diagonals of a parallelogram bisect each other" in the booklet's given / to prove / reason layout (gr1p10),
"midpoints of opposite sides make a parallelogram" (gr1p11), three parallel lines with a bent path (gr1p12) →
math-georeason-1 now 12; simple distillation needs a large boiling-point gap, ~30 °C as the school's rough rule (sp4p13),
why a crude-oil column separates (sp4p14, `ask:meaning`) → sci-separation-4 14; hexane extraction, why the solvent is easy
to remove (sp2p14) → sci-separation-2 14; brass as a solid solution (ss3p10) and the two solvent rules for gas/liquid
solutions (ss3p11) → sci-solution-3 11 (still under 12; the nightly run may extend it).
**Still thin but left on purpose:** s4.5 ppm (3) and s4.7 energy of dissolving (2) are not in the school's midterm documents as
recorded (they come from ID-Book 3122); m22.1/m22.2/m22.10 are not in the booklet; compass constructions (m14) wait for
queue 5. Not checkable from the notes: the exact drill types of the school's nine concentration problems and nothing else
(the "missing" science unit 2 does not exist: father checked 23 Nov).

## Midterm coverage check, 22 Nov (front-page queue 4, part 2 of 2)
Re-read the five science midterm documents from the father's folder (text of the three short ones; the 110-page
"หน่วย 1 สารละลาย ม.2" by contact sheets plus full-size pages 78–81; the two handwritten pages at its end were not
read or recorded). They match the 12 Nov notes. Findings:
- **sci-solution-6 (ppm, energy of dissolving, preparing) was NOT in `lessonQueue`**, so it would have been served only
  after the queue ran out (~end of Dec), yet the school document has ppm (a worked example with 0.05 mg in 100 g and a
  practice item) and preparation. Fixed: `sci-solution-6` now follows `sci-solution-5` in `lessonQueue`
  (everything after it moves one day later; spare days 9–11 Dec absorb it). Correction to part 1: ppm IS in the school's documents.
- Gaps filled in sci-solution-6 (now 14 practice items, blind-checked 6/6): ppm when the sample is not 1 kg (ss6p9),
  what "3 ppm" means (ss6p10, `ask:meaning`), solubility level by g per 100 g with the school's thresholds
  (>1 good · 0.1–1 slight · <0.1 insoluble) and scaling a 10 g sample to 100 g (ss6p11, ss6p12), organic vs inorganic
  solvent (ss6p13), supersaturated (ss6p14).
- Textbook error to avoid: the school's page lists น้ำมันเบนซิน as an inorganic solvent; petrol is organic. Do not write
  items on that example; tell the father if she asks.
- Already covered, no gap: solute/solvent rules and tables, alloys and gas mixtures, saturated/unsaturated, factors
  (temperature, pressure, particle size, stirring), %v/v, %w/w, %w/v with density, dilution, evaporation, solubility
  curves, separation methods and Rf. Daily-life uses (thinner, pesticide dilution) are only a few items; left on purpose.
- Still not checkable: the exact exam wording.
- **Science unit 2, closed 23 Nov 2026:** the father checked the school's documents and there is no unit 2 (the numbering
  skips it); nothing is missing from what we read, so no extra reading (front-page queue 24 removed).

## 24 Nov: midterm moved to Mon 14 – Thu 17 Dec (school schedule; final Tue 23 – Fri 26 Feb 2027)
`calendar.json` updated the same evening (`estimated:false`). With `examPrepDays` 7 the prep week now starts **Mon 7 Dec**,
so the old buffer (spare days 9–11 Dec, mock 12 Dec, prep 14–20 Dec) is gone.
**Lesson slots left** after math-congruence-1 (24 Nov): school Fridays 27 Nov and 4 Dec are repair days (no lesson),
Sun 6 Dec is cp-1, so with prep from 7 Dec only **9 slots**: 25, 26, 28, 29, 30 Nov, 1, 2, 3, 5 Dec.
**Lessons still queued for the midterm:** 11 written (sci-separation-4, math-congruence-2, sci-solution-3, math-stats-5,
sci-solution-4, math-stats-6, sci-separation-2, math-georeason-1, sci-solution-5, sci-solution-6, math-parallel-2) + the
construction lesson (not written) + meaning-sci-1, meaning-math-1, tool-ratio-table-1. Short by 3 (core) to 6 (all).
Options put to the father (front page ④ ฉ, waiting):
- **ก (recommended): prep week 5 days (`examPrepDays` 5 → prep Wed 9 – Sun 13 Dec)** → +2 slots (Mon 7 holiday, Tue 8) = 11:
  25 sep-4 · 26 cong-2 · 28 sol-3 · 29 stats-5 · 30 sol-4 · 1 stats-6 · 2 sep-2 · 3 georeason-1 · 5 sol-5 · 7 sol-6 ·
  8 construction (only if the school teaches it before the exam; otherwise math-parallel-2 takes the slot).
  math-parallel-2 (if not used), meaning-sci-1, meaning-math-1, tool-ratio-table-1 move after the midterm.
  cp-1 stays Sun 6 Dec; the mock moves to **Thu 10 Dec** (Constitution Day holiday), repair Fri 11 – Sun 13 Dec.
  Queue deadlines: construction lesson before 6 Dec; mock written before 8 Dec; mock read 10–11 Dec.
  Cost: lessons of 7–8 Dec get only 5–6 days before the exam and no ≥ 7-day check; no spare day (if she misses a day,
  drop in this order: math-parallel-2/construction, sci-solution-5).
- **ข: keep 7 prep days** (prep 7–13 Dec) → 9 slots: drop construction and math-parallel-2 (and one more if she misses a
  day); mock Thu 10 Dec inside the prep week. More review time, fewer topics taught by the app.
- **ค: a second lesson on Sat/Sun** (28–29 Nov, 5 Dec): fits everything, but it is the parked "second lesson a day" and
  goes against her 22–23 Nov feedback (too fast, too thin) and G2. Not recommended.
Nothing changes before Mon 7 Dec under any option (the first 9 lessons are the same), so the choice is needed only by ~1 Dec
(the construction lesson must be written before 6 Dec if kept). Unknown that decides construction: whether the school
reaches constructions / parallelogram proofs before 14 Dec (ask the teacher for the scope sheet).
Note: the verify.js December test fails on "no 📖 อ่านคำอธิบาย after a wrong sweep answer" on the unchanged 8a4b98a too
(not caused by the date change); check in the next app chat whether the real sweep shows the button.

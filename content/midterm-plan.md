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
If she falls behind, drop in this order: tool-ratio-table-1, meaning-math-1, math-parallel-2, sci-solution-5.

## Why this order
- Lessons not yet rewritten "meaning first" (sci-solution-3/4/5, sci-separation-2, math-stats-5) sit late so they can be
  retrofitted before they are served (deadlines in the father's front-page queue). math-congruence-1/2 wait for figures.
- Everything the Dec 6 checkpoint covers is taught by 29 Nov (7 days earlier); everything the 12 Dec mock covers is taught by 5 Dec.

## Work to write (each needs the independent blind check, hard rule 5)
1. Figures for 040–041 by 22 Nov. 2. Retrofit sci-solution-3 (by 25 Nov), sci-solution-4 (27 Nov), math-stats-5 with
histogram/table figures (26 Nov), sci-separation-2 (29 Nov), sci-solution-5 (1 Dec). 3. Construction-reasoning lesson
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

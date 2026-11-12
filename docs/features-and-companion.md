# App features, companion and records (read when answering her or writing letters, goals, guests, missions)

Split out of AUTOMATION.md on 12 Nov 2026, text unchanged. Read the records, do not change code.

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


## ภูตธาตุ: elements practice (app feature, from 9 Nov 2026)
- **What it is:** 31 common elements, practised 2–3 minutes a day with spaced repetition.
  - Question types: symbol↔name, type, use, and placing the element in an empty periodic table.
  - "ห้องปรุงสาร" adds ionic formula questions once 8 ion-forming elements are known.
- **Records:** `type:"elem"`, `act:"practice"`, items `{z, mode, correct}`, with `f` set on formula items. Not a lesson; not part of the daily mission.
- **In the father's notes:** say how many elements are collected and placed, and which ones keep failing.
  - If formula items keep failing, write one short why-first lesson on ion charges and formulas.
  - The father recalls she met formula writing in ม.2 term 1, but it was not in the ม.2 term-1 file he gave. Ask him for that worksheet before building a full lesson.


## Game studio (content/studio.json, from 9 Nov 2026)
- **What it is:** a game-design track the father approved.
  - One short "designer's note" card each day Mon–Sat. Each card has a reflection question; the answer gives 10 XP.
  - A design workshop each **Sunday**, worth 30 XP. The father moved it so he can watch.
- **Records:**
  - `type:"studio"`, `act:"card"` with `card` (date) and `answer`.
  - `act:"workshop"` with `answers` (field id → text).
  - Not study time; do not count them toward lessons.
- **Each run:** read new studio answers.
  - Quote the best one (short) in the father's notes.
  - If a workshop design arrived, summarise it for the father as a proposal. Do not build it until he approves.
- **Before Monday of each week:** add that week's 6 cards (Mon–Sat; Saturday's card prepares for the workshop) and the Sunday workshop to `studio.json`.
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


## Feedback of 9 Nov (hints, explanations, daily cards, hands-on studio, adventure regions)
- **Daily knowledge cards** (`content/cards.json`): keep at least 3 days of cards ahead. One card a day, tied to a topic she studied in the last week or will study next (science or math in real life, accurate facts, 4–6 sentences, no brand or character names). Each card has `q` with 3 options, `a` = index of the right one (the app shuffles). Do not repeat a topic within 14 days. Records `type:"card"` (correct 0/1) show whether she remembered yesterday's card; if she misses two in a row, make the next cards shorter and more concrete.
- **Hints**: a question may have a third hint `step1` = the first step of the worked solution, written so it does NOT reveal the answer. Add `step1` to new level 2–3 questions. Typed-number questions get one automatically when the first explanation step does not contain the answer. Item fields: `hintStep:true` (she needed the worked first step → counts as review, not mastery), `hintKnown:[i]` (hints she said she already knew → rewrite those hints to be more specific next time, e.g. point at the exact number or relationship to use).
- **Explanations** open step by step for wrong, don't-know and guessed answers (`exSteps` = how many steps she opened). Write explanations as short clauses separated by spaces, starting new steps with words such as ดังนั้น / ระวัง / ถ้า / จำไว้, so they split well. Do not shorten them; keep the full reasoning.
- **Studio hands-on**: `studio.labs` (balance-lab challenges; record `act:"lab"` with settings, result and her reasoning) and `studio.rewrite` (daily "player guide": she rewrites the explanation of a question she missed; record `act:"rewrite"` with `qid` and text). Read her rewrites: if a rewrite shows a misconception, add that question back as a due review and mention it in the parent summary. You may add new lab challenges (check fields: winMin, winMax, meanMin, meanMax, luckMin, skewMin) tied to what she is studying in statistics.
- **Adventure regions**: `ADV_REGIONS` now has region 2 "ขั้วโลกที่กำลังละลาย" (c1–c5), opened by beating r5. Stage index, par and boss bonus are generic. A region 3 will come from her Sunday workshop design, after the father approves.
- **Wish quest** (replaces the wish jar, father chose option ก on 9 Nov): records `type:"wish"` with `act` set / goals / claim / cancel. Pressing "อยากได้" starts a quest: stars earned after that moment (= the item's price, wallet untouched) plus 1–3 behaviour goals from `WISH_GOALS` (exread, rewrite, days, recall, review = any finished 🧠 ทบทวนวันนี้ / 🔁 ข้อที่เคยพลาด / ย้อนคาถาเก่า round: record types review, recall, sweep), picked automatically from her recent weak habits. When done, the item is given free (`shop` record with cost 0, `wish:true`). The father can swap a goal on the parent page (`act:"goals"`, `by:"parent"`). Goals must stay effort/habit based: never accuracy, speed or unbroken streaks. Old `save` (jar) records are ignored, so jar stars returned to her wallet. Mention wish progress briefly in the parent summary when a goal is stuck for a week.
- **ห้องปรุงสาร** (10 Nov): 6 levels of formula writing/naming inside ภูตธาตุ (records `type:"chem"`, `level`, items with `fx`, `f`). Questions are generated in the app from ion data. A level opens with ≥6/8. Passed levels appear 2 items/day in the element practice. In the parent summary, say which level she is on and which kind of mistake repeats (e.g. missing brackets, Roman numeral read as atom count). Next step after level 6 is balancing equations (ม.3, later phase).
- **Body systems and forces review** (school-plan.md "Reference material"): when making review twins for s9 (body systems) and s13–s16 (force, work, machines, energy), use the topic map from the tutor packets: write your own questions covering the same sub-topics and question styles (graphs, experiments, equations for gas transport), never copy. One or two per day, not a flood.
- **นักสืบยีน** (10 Nov rework): a hatched litter no longer reveals a mystery snake's gene; she judges it herself after there is evidence, choosing a verdict AND a reason (`labverdict` fields `why`: amel / none / guess, `evidence`, `sound`). XP: sound reasoning 20, right but guessed or reason not matching evidence 8, wrong 5. `calendar.voidRules` drops every old-style verdict (no `why`) — the father asked to reset the 10 Nov blind clicks so she can play again; do not re-import or count them.
- **10 Nov fixes**: data lists in question text written as `a → b · c → d` are shown one item per line (keep using " · " between data items, put the data after a colon, and start the actual question with a question word such as ข้อใด / ถ้า / จง so the app can separate it). Body font is now Sarabun (looped). The 🧠 recall tile (type `recall`) no longer counts as a lesson unit of the daily mission. `voidRules` can match `setId` too.
- **Expedition mission + battle questions** (father approved 10 Nov, "แนวทาง ก + ข"): the home "ภารกิจวันนี้" shows the day's missions as a route with a 🗝️ secret path (the optional extra) that opens when all are done. Inside a set, steps are grouped into legs (lesson: warm-up / new lesson / challenge; mixed, probe, passage: two halves) with a checkpoint between legs; items carry `leg`. Team power per item: right and not guessed 2, explanation read to the last step 2, honest don't-know 1; today's total gives rescue-team battles up to +30% (`boost` on battle records). Content is unchanged: keep writing sets exactly as before. Each adventure stage has one science question in `ADV_SQ` asked in round 2 (`sq`: right / wrong / skip on the battle record; no XP). When the father approves new regions, add one `ADV_SQ` question per stage: real science of that stage, correct option first.
- **Home expedition map** (10 Nov evening): the day's missions are drawn as a map card at the top of the home page with a big "ออกเดินทางต่อ" button; team power also counts ⚡10 per finished mission stop, battle boost = power × 0.5 %, max 40%.
- **Team power & difficulty** (10 Nov late): "พลังทีม ⚡" now means only battle charges: 2 + 1 per finished mission stop + 1 when the day is complete (the % damage boost was dropped). Enemies scale with team strength (base ×1.7, partial scaling) and each cleared stage can be replayed at ยาก / ตำนาน (`diff` 1/2 on battle records, EXP +2 / +4). In the parent summary report adventure win rate and rounds weekly; if she wins every first attempt again or loses more than half, tell the father so the numbers can be tuned.
- **Daily boss** (from 11 Nov): one boss per day, health = sum of mission-stop shares (lesson 30, vocab 15, probe 20, sweep 12). Hits are derived from item records: right 3 (self-reported guess 2), don't know + explanation read 2, wrong + explanation read 1, fast wrong / explanation skipped 0, vocab right 1 (max 15). Finishing every stop with no skipped explanation always wins. Each win = 1 map piece; 7 pieces = a new rescue-team region. When she reaches 7 pieces, tell the father and prepare the next region (from her workshop design if he approved it).


## Adventure: how stages open (11 Nov 2026)
- The adventure page now always shows "🗝️ ด่านใหม่เปิดอย่างไร" with the next stage and its condition, plus a locked "เขต 3 · ชิ้นส่วนแผนที่ x/7" tab.
- PROMISE TO KEEP: region 3 opens at 7 daily-boss map pieces (bossPieces). It does NOT exist yet. It must be built from her Sunday studio-workshop design (studio type "studio", the workshop submission) before she can reach 7 pieces (earliest ~17–18 Nov 2026). Check bossPieces every run; when ≥5 and no region 3 exists, build it (from her design if submitted, otherwise a default pollution-monster region in the same style) and tell the father in the evening report. Region 3 = ADV_REGIONS entry with needPieces:7 (add that check to regOpen), 5 stages, ADV_FOES, ADV_SQ questions, facts; boss needSpells ~9.


## Vocabulary phonics (father approved 11 Nov 2026)
- content/vocab.json words carry `syl` (spelling chunks joined by "·", must rebuild the word exactly) and optional `parts` [[part, Thai meaning]] — only for real, well-known prefixes/suffixes/roots; when unsure, leave `parts` out. Every new word needs `syl`.
- content/phonics.json: `cards` (one shown per day at the start of the vocab session; `re` links a misspelling to a card; TIP_ORDER in app.html decides which card wins) and `probe` (20 held-out words for the monthly transfer check, halves A/B alternate by month, answers never shown). NEVER add a probe word (or a derivative like predict→prediction) to vocab.json.
- New words: spelling is typed chunk by chunk; review words have a "แบ่งเป็นส่วนให้ดู" hint (recorded as hintLv). Wrong spellings show highlighted letters + the matching card tip.
- Parent page (ผลละเอียด › คำศัพท์อังกฤษ) shows the monthly probe score. Compare A with A, B with B (every 2 months). Report it honestly in the February evaluation.

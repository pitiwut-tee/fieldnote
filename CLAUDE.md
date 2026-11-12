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
3. A chemistry book's watermark contains a registrant's name: never use that file's content. Never use real
   character, brand, game or band names (use the feel only).
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

## Commands (repo root)
- Build: `python3 tools/build.py` (makes `index.html` and `dist/parent.html` from `src/app.html` + `content/`)
- Verify: `node tools/verify.js` (must print "all checks passed")
- Commit: author `pitiwut-tee <pitiwut-tee@users.noreply.github.com>`, add the Co-Authored-By trailer for the model used
  and the `Claude-Session:` trailer given in the session.
- Push: `git fetch -q origin main && (git rebase -q origin/main || (python3 tools/build.py && git add index.html dist && git -c core.editor=true rebase --continue)); git push -q origin HEAD:main`
- Publish parent page: Artifact publish of `dist/parent.html` to https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR
  (read it first in a new session; if refused because the nightly run published a newer version, check that our build
  contains its content, then publish again).

## Map of the repo
- `src/app.html` the app (only edit when the father asks for an app change; the nightly run never edits it)
- `content/` everything the app teaches: `sets/*.json` (lessons, sweeps, mixed, passages, probes), `vocab.json`,
  `phonics.json`, `challenges.json`, `variants.json` (twin questions), `calendar.json` (`lessonQueue`, exam dates),
  `curriculum.json` (51 spells, ~243 subtopics) + `qtags.json` (every question id → subtopic; keep complete)
- `tools/` build and verify (nightly run never edits)
- `AUTOMATION.md` the lean nightly runbook; `docs/*.md` topic notes it points to (read only when needed)
- `content/school-plan.md`, `content/exam-analysis.md` what the school teaches now and what the real exam asks

## Where the live status is
- Father's status doc (Claude Docs, Thai): https://claude.ai/artifact/4kHsdKcNKfudfYGiyqbRQx
  (project id `1e56cbde-7272-43ad-9beb-270fb7f5f0dd`). Read it at the start of any session: it holds what the father
  must provide, decisions waiting, current numbers and the log of recent work. He edits it; his edits win.
- Parent page (private artifact): https://claude.ai/artifact/59fiBfcRgbyEEC7mhXwqVR holds her results and his approvals.
- Student page: GitHub Pages of the repo `pitiwut-tee/fieldnote`.

## Starting a new chat (for any session that is not the nightly run)
1. Attach the repo (`add_repo pitiwut-tee/fieldnote`, access push), clone it, register it, read this file.
2. Read the status doc above. Do the task the father names. Do not re-explain the project to him.
3. His folders on `D:\Krunee` and `D:\เตรียมม.ปลาย` are reachable only if the chat is linked to his computer.
   Most PDFs there are scans; view them as images. Staged copies are snapshots.
4. At the end: update the status doc (date chip, numbers, one row of "ทำเสร็จล่าสุด"), and if you learned a new
   standing rule, write it into the right file here, not just into the chat.

## Which model for which work (agreed with the father, 12 Nov 2026, Pro plan = limited usage)
- **Opus** (newest) for: writing new sets with keys and explanations, reading books to decide what the exam needs,
  large changes to `src/app.html`. A wrong key or wrong explanation teaches her something false.
- **Sonnet** for routine: build/verify, small fixes, file inventory, publishing, status doc, reading text PDFs,
  the nightly run, the independent blind check.
- Cost habits: open a fresh chat per work session (see below); do not re-read big files "just in case"; large
  reads and fan-outs need the father's OK first and a one-line cost warning.
- Check what a night cost: father's Settings > Usage. Anthropic publishes no per-model multiplier for Pro.

## When the father should open a new chat
Not by topic. Every chat here is the same project. Open a new one at a **handoff point**: the last thing he asked
for is finished, reported and committed, and the next thing is a new request. Rule of thumb: about one chat per
working session or per batch of requests, and always after the chat has been summarised once (the first lines of
the chat say "continued from a previous conversation"). Because state lives in this file and the status doc, a
fresh chat loses nothing. If a chat ever ends mid-task, the status doc's "งานถัดไปของผม" says where to resume.

# STRATEGY.md — War Room

This is my operating manual. Every tactic, every outcome, every lesson. Updated by date. Read it every session before I do anything else.

## How this works

- **Tactics** are individual moves (a title change, a redirect, a pricing update)
- **Campaigns** are groups of tactics aimed at a single outcome (e.g. "fix Tier 1 CTR")
- **Results** are measured in cold hard numbers — impressions, CTR, signups, paid users
- **Lessons** are what I take forward. If something didn't work, I write why.

---

## Active Campaigns

| Campaign | Target | Start Date | Status | Revenue Impact |
|----------|--------|------------|--------|----------------|
| Tier 1 Money Page Redesign | Increase CTR from ~0.6% → 2%+ on practice questions + mock exam | 2026-07-05 | 🔄 In Progress | TBD |
| Blog Conversion Funnel | Add CTAs/internal links on blog → money pages | TBD | ⏳ Queued | TBD |
| Paid User Reactivation | 4 paid users, 0 active — recover them | TBD | ⏳ Queued | £100+ |
| Tier 3 Waste Cleanup | Redirect/kill ~20 pages with zero traffic | TBD | ⏳ Queued | Indirect (quality signals) |

---

## Tactics Log

### 2026-07-05 — Tier 1 Money Page Redesign

**Title & Meta Update (v2 — removed "free" from titles)**

Dropped "free" from title tags to attract buying-intent traffic, not freeloaders. Kept "free" in meta descriptions as a secondary signal so Google knows it's available, but the title fights for commercial intent.

**Changes applied:**

1. **`/cfa-level-1-practice-questions`**
   - Title: `CFA Level 1 Practice Questions 2026 | 2,500+ Qbank by Charterholders`
   - Meta: `2,500+ CFA Level 1 practice questions written by charterholders. Covers all 10 topics with detailed explanations. Try a sample question instantly — no signup needed.`
   - Rationale: Competes with Schweser ("SchweserPro QBank") and AnalystPrep framing. "By Charterholders" is unique differentiator.

2. **`/cfa-level-1-mock-exam`**
   - Title: `CFA Level 1 Mock Exam 2026 | 180 Questions, Timed & Scored`
   - Meta: `Full-length CFA Level 1 mock exam with 180 timed questions. Instant scoring and detailed explanations for every answer. Try 5 questions now — no signup required.`

3. **`/` (root layout default)**
   - Title: `CFA Level 1 Exam Prep 2026 | 2,500+ Questions & Mock Exams | AnalystTrainer`
   - Meta: `Prepare for CFA Level 1 with 2,500+ practice questions, mock exams, and flashcards. Written by charterholders. Instant feedback, detailed explanations. Start free — no credit card required.`

**Status:** Edits applied to codebase. Needs GitHub push and Vercel deploy. After deploy, request Google reindexing via GSC for the three changed pages.

**Pages changed:**
1. `/cfa-level-1-practice-questions` — Complete rewrite: interactive DemoQuestion hero, homepage-style cream bg, vertical stack layout, real pricing tiers
2. `/cfa-level-1-mock-exam` — Same treatment with MockPreview in hero
3. `/free-cfa-questions` — Same treatment, added DemoQuestion, fixed pricing from made-up tiers
4. `/try-free` — Added SEO layout (title, description, canonical)
5. `/pricing` — Updated hero to homepage style, removed fake aggregateRating from schema, added SEO layout
6. `/cfa-level-1-books` — 301 redirect to practice questions (was wasting 2,850 impressions at pos 46, 0.1% CTR)

**Pricing fix:** Removed fake "Basic £50 / Premium £75" from free-cfa-questions and mock exam pages. Replaced with actual tiers: 2 Month £25, 6 Month £40 (Most Popular), Lifetime £70.

**SEO fixes:**
- `/pricing` — Added to sitemap
- `/try-free` + `/pricing` — Added layout.tsx with proper title, description, canonical
- `aggregateRating` removed from pricing schema (500 fake reviews)
- "upgrade from Basic to Premium" → "upgrade" in FAQ schema
- `/try-free` — Added product JSON-LD schema

**Expected impact:** CTR on these two pages (85% of all impressions) should improve. Current: ~0.6% overall. Target: 2%+. Will measure after 2 weeks.

---

### 2026-07-04 — Initial Findings

**First GSC deep dive** (sc-domain:analysttrainer.com, Apr 1 - Jul 5 2026):
- Impressions growing 5x (Feb 3.3K → Jun 14.3K/mo)
- CTR stuck at ~0.6%
- Two Tier 1 pages = 85% of all impressions (17K combined per quarter)
- Both at positions 21-22 → need on-page conversion to make those listings work
- `/cfa-level-1-books` at 2,850 impressions, position 46, 0.1% CTR → content mismatch, redirected

---

## Metrics Dashboard (Updated: )

| Metric | Current | Target | Change | Last Checked |
|--------|---------|--------|--------|--------------|
| Monthly Impressions | ~14.3K | 50K+ | Up 5x since Feb | 2026-07-04 |
| Overall CTR | ~0.6% | 2%+ | — | 2026-07-04 |
| Tier 1 CTR | — | 2%+ | — | TBD |
| Registered Users | 94 | 500+ | — | 2026-07-03 |
| Paid Users | 4 | 20+ | — | 2026-07-03 |
| Active Paid Users | 0 | 10+ | — | 2026-07-03 |
| Total Question Attempts | 929 | 10K+ | — | 2026-07-03 |
| Questions in Bank | 2,370 | 2,500+ (done) | — | 2026-07-03 |

---

## Lessons Learned

1. **Made-up pricing is dangerous.** I wrote "Basic £50 / Premium £75" on the free-cfa-questions and mock exam pages without checking the real pricing. That could have caused confusion if a user saw £40 then came to the site and saw £25. Always verify pricing against the live pages.
2. **Fake schema can get you penalised.** 500 aggregateRating reviews with no real reviews. Removed it.
3. **Turbopack doesn't like JSX fragments.** `<></>` inside conditional returns breaks the build. Use single root `<div>` instead.
4. **Layout metadata overrides `document.title`** in client components. For client pages, use a sibling `layout.tsx` that exports `Metadata`.
5. **Service account needs both scopes.** Indexing API works (separate scope), but Search Console sitemap submission needs `webmasters` scope + site owner permission.

---

## Next Moves (Priority Order)

1. [ ] **Wait 2 weeks** → run GSC again, measure CTR change on Tier 1 pages
2. [ ] **Paid user reactivation** — 4 users paid and never attempted a question. Need a re-engagement email or in-app prompt
3. [ ] **Blog conversion funnel** — Blog gets decent rankings (pos 4-15) but zero conversion path. Add CTAs to money pages
4. [ ] **Tier 3 cleanup** — ~20+ pages with zero traffic. Audit, redirect or kill
5. [ ] **Voice channel setup** — Abdul mentioned wanting real-time convos. Need gateway config changes for Discord voice
6. [ ] **SEO meta content** — Write actual page content for FAQ and topic pages so they rank for long-tail

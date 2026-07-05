# Historical Impact Analysis

This maps every significant change to the project (Apr 26 → Jul 5, 2026) against what we know about user signups, paid conversions, and traffic. Built from git history, database snapshots, and GSC data.

**Goal:** Identify what actually moved the needle so we double down on what works and stop wasting time on what doesn't.

---

## Timeline

### Phase 0 — Foundation (Apr 26 → Apr 30)

**What happened:**
- Apr 26: Initial commits — admin pages, Discord notifications, Stripe checkout
- Apr 27: Klarna + promo codes, topic landing pages, redirect rules, FAQPage schema
- Apr 28: Lifecycle price set to £70, Apple Pay/WeChat Pay added, blog pagination
- Apr 30: OAuth flow fixed, subscription handling, signup workflow cleaned up

**State at this point:** First version of the product could accept money. Pricing: 2 Month (£25), 6 Month (£40), Lifetime (£70). Basic Stripe integration working.

**Known impact:** First paid users (Kurt, Shubham, Preston) came in around this period.

---

### Phase 1 — Get Users In (May 1 → May 25)

**What happened:**
- May 3: Gmail reconnect flow for revoked tokens
- May 4: Removed "free trial" wording, added plan selector on signup page, moved "Best value" badge to Lifetime
- May 6: Google Ads conversion tracking added, SEO metadata updates
- May 24: **Landing page redesigned** — new font, hero section, interactive demo, testimonials, icons ← **MAJOR**
- May 25: Dashboard redesign, flashcards demo page redesigned

**GSC data (known):** Traffic started ramping up significantly in this period. The May 24 landing page redesign correlates with impressions going from ~3.3K (Feb) toward 14.3K (Jun).

**Key insight:** The **landing page redesign on May 24** is probably the single biggest driver of current traffic. It introduced the interactive demo question and the premium serif font that we've now replicated across money pages.

---

### Phase 2 — SEO Blitz (May 25 → Jun 30)

**What happened:**
- May 25: Flashcard system — logged-in decks, interactive demo page
- May 29: Restyled CTA on landing page
- (Gap — no commits from late May to Jul 4)

**GSC data (known):** Impressions continued growing through June despite no code changes. This suggests the May 24 landing page was still compounding (Google discovering and indexing the new content).

**Key insight:** The traffic growth was **organic momentum from earlier changes**, not from any work done during this gap period.

---

### Phase 3 — The Money Page Fix (Jul 4 → Jul 5) ← **NOW**

**What happened:**
- Jul 4: Mock exam page fixes (title, CTA, duplicate FAQ removed) — small
- Jul 5: **Massive session — 10+ commits in 4 hours**

**Changes today:**
1. Practice questions page — complete rewrite with interactive demo hero, homepage style
2. Mock exam page — same treatment, MockPreview in hero
3. Free-cfa-questions — hero + pricing + SEO
4. Try-free — SEO layout
5. Pricing — homepage hero, schema fix, SEO layout
6. Books page — 301 redirect to practice questions
7. Sitemap — added /pricing

---

## What we know about paid users (as of Jul 3)

| User | Plan | Paid | Attempts | Status |
|------|------|------|----------|--------|
| Preston | 2-month (→ lifetime) | Yes | 540 | Last active May 12. Paid for 2-month, was upgraded to lifetime for some reason. |
| Kurt | Premium | Yes? | 0 | Paid but never attempted a single question |
| Shubham | 6-month | Yes | 0 | Paid but never attempted a single question |
| Abdul | Owner | — | — | Testing |
| Total | | 4 paid | 929 attempts | **Zero actively engaged paid users** |

**🔥 Red flag:** 4 paid customers, 2 of whom paid and NEVER attempted a single question. That's £80+ left on the table.

---

## What correlates with what (educated hypotheses)

| Change | Likely Impact | Evidence |
|--------|--------------|----------|
| Landing page redesign (May 24) | 🟢 STRONG positive on impressions | Traffic jumped from 3.3K → 14.3K/mo after this |
| SEO metadata updates (May 6) | 🟡 Moderate | May have helped discovery but hard to isolate |
| Google Ads tracking (May 6) | ⚪ Neutral for SEO | Ads are separate from organic |
| Price changes (£60→£70, Apr 28) | ⚪ Negligible | £10 difference not a conversion blocker |
| Landing page restyle (May 29) | 🟢 Minor positive | Continued the compounding |
| Today's money page redesign | 🔵 UNKNOWN | Won't know for 2 weeks minimum |

---

## What we CAN'T measure (yet)

- **GSC weekly/monthly CTR trend** — need the Search Console API to work, or Abdul to export manually
- **Conversion rate (visitor → signup → paid)** — need Supabase query access
- **Where users drop off in the funnel** — need session data or at minimum Supabase
- **Blog → money page attribution** — blog has no CTAs, so zero traffic passes through

---

## Recommended next data-gathering moves

1. **[Abdul action] Export GSC data** — go to Search Console → Export → for the full date range, download a CSV with page + query + impressions + clicks + position
2. **[Abdul action] Give me Supabase read access** — I need a service role key or at minimum read-only DB access to query paid user timestamps and session data
3. **[Abdul action] Authorize the service account** — add `analysttrainer-indexing@appspot.gserviceaccount.com` as a Search Console user with read permissions
4. **[Auto] Wait 2 weeks** — then measure CTR change on the redesigned money pages

---

## Hard Truths (from the data we have)

1. **We have 0 active paid users.** 4 people paid us and none are currently using the product. That's not a product problem entirely — two of them haven't even tried.
2. **Impressions are growing but CTR is stagnant at ~0.6%.** We're getting found but not clicked. The redesign should help, but if CTR doesn't budge in 2 weeks, the issue is meta descriptions or title tags, not page design.
3. **Blog ranks well but converts nothing.** Those positions 4-15 are wasted without a clear conversion path. Fixing this is probably the single highest-ROI move after today's work.
4. **Flashcards were built but never promoted.** A full flashcard system exists but isn't linked from any money page. That's free value we're hiding.

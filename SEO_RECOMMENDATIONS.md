# SEO Action Plan Based on Search Console Analysis

## 📊 Current Situation (as of Feb 2026)

### The Good ✅
- **Impressions growing**: 2/day (Nov) → 100-160/day (Feb)
- **Blog posts performing well**: Ranking positions 6-10 and getting clicks
- **Strong CTR in top 10**: 7-11% CTR when ranking well
- **Content indexed**: Google finding your content

### The Critical Issues ❌
- **Zero clicks** despite 100+ daily impressions
- **Poor rankings on money pages**:
  - `/cfa-level-1-practice-questions`: Position 46 (880 impressions, 2 clicks)
  - `/cfa-level-1-mock-exam`: Position 23 (701 impressions, 1 click)
- **Ranking decline**: Position 5-7 (Jan) → Position 20-30 (Feb)
- **Overall CTR**: 0-2% (should be 10-30% for top positions)

---

## ✅ COMPLETED - Metadata Optimization

### What I Fixed:

**Homepage (layout.tsx)**
- ❌ Old: "CFA Level 1 Question Bank (2026) - 2,500+ Questions"
- ✅ New: "Free CFA Level 1 Practice Questions & Mock Exams 2026 - Sample Questions with Answers"
- **Why**: Targets "free" + "sample questions" keywords (top searches)

**Practice Questions Page**
- ❌ Old: "CFA Level 1 Practice Questions (2026) - 2,500+ With Answers"
- ✅ New: "Free CFA Level 1 Practice Questions 2026 - Sample Questions with Answers"
- **Why**: Matches exact queries: "free cfa level 1 practice questions" (38 impressions)

**Mock Exam Page**
- ❌ Old: "CFA Level 1 Mock Exam (2026) - Full 180 Questions"
- ✅ New: "Free CFA Level 1 Mock Exam 2026 - Full 180 Question Practice Test"
- **Why**: Targets "free cfa level 1 mock exam" (30 impressions, position 34)

---

## 🎯 PRIORITY ACTIONS (Do These Next)

### 1. Content Optimization (High Impact)

**Add H1/H2 with Target Keywords**
Current pages likely have generic headings. Update to:

```
Homepage H1: "Free CFA Level 1 Practice Questions & Mock Exams"
Practice Page H1: "2,500+ Free CFA Level 1 Sample Questions with Answers"
Mock Exam H1: "Free CFA Level 1 Mock Exam - 180 Questions"
```

**Add FAQ Schema** (Easy wins for position 0)
Top questions from GSC:
- "How many questions on CFA Level 1?" (3 impressions)
- "How to access CFA mock exam?" (1 impression)
- "CFA Level 1 exam format 180 questions" (multiple searches)

### 2. Internal Linking (Quick Win)

**Problem**: Pages may not be well-connected
**Solution**: Add contextual internal links

From homepage → Practice Questions:
```
"Start with our <a>free CFA Level 1 practice questions</a> featuring 2,500+ sample questions"
```

From blog posts → Money pages:
All blog posts should link to:
- Practice questions page
- Mock exam page
With anchor text: "free practice questions" or "free mock exam"

### 3. Technical SEO

**Page Speed** (Check Google PageSpeed Insights)
- Target: 90+ score on mobile
- If below 80, optimize images and reduce JavaScript

**Mobile Usability** (Check Search Console)
- Verify all pages mobile-friendly
- Check for tap target issues

**Structured Data** (Already have some, expand it)
Add:
- FAQ Schema for common questions
- Course Schema for study guides
- HowTo Schema for preparation guides

---

## 🚀 MEDIUM PRIORITY (Next 2-4 Weeks)

### 4. Create Landing Pages for High-Intent Queries

Based on GSC, create these exact-match pages:

**"Example CFA Level 1 Questions" (58 impressions)**
- URL: `/example-cfa-level-1-questions`
- Content: 50 example questions with detailed solutions
- Target position: Top 3

**"CFA Level 1 Practice Test Free" (22 impressions)**
- URL: `/cfa-level-1-practice-test-free`
- Content: Free full practice test
- Target position: Top 5

**"CFA Level 1 Sample Questions with Answers" (36 impressions)**
- URL: `/cfa-level-1-sample-questions-with-answers`
- Content: 100 sample questions categorized by topic
- Target position: Top 3

### 5. Content Expansion on Existing Pages

**Add to Practice Questions Page**:
- Section: "What You Get in Our Free CFA Level 1 Question Bank"
- Section: "Example Questions from Each Topic"
- Section: "How to Use Practice Questions Effectively"
- FAQ section answering all common questions

**Add to Mock Exam Page**:
- Section: "What's Included in Your Free Mock Exam"
- Section: "How CFA Mock Exams Help You Pass"
- Section: "Mock Exam Format Explained"
- Comparison table: "Our Mock vs. CFA Institute Mock"

---

## 📈 LONG-TERM STRATEGY (Next 3-6 Months)

### 6. Backlink Building

**Current**: Likely few/no quality backlinks
**Goal**: 10-20 high-quality backlinks

**Where to get them**:
1. **CFA Forums** - AnalystForum, Reddit r/CFA
   - Share helpful content
   - Link to free resources

2. **Finance Blogs** - Guest posts
   - "How I Passed CFA Level 1 Using Free Resources"
   - Link to your free trial

3. **YouTube** - Create free video content
   - "Free CFA Level 1 Practice Questions Walkthrough"
   - Link in description

4. **Quora/Reddit** - Answer CFA questions
   - Link to relevant free resources

### 7. Topical Authority

**Create hub pages** for each CFA topic:
- `/topics/ethics-practice-questions` (ethics questions)
- `/topics/quantitative-methods-questions` (quant questions)
- `/topics/financial-statement-analysis-questions` (FSA questions)

Each with:
- 200+ words of explanation
- 20-50 free practice questions
- Link to full question bank

### 8. User-Generated Content

**Add Reviews/Testimonials** with Schema
- Get 20-50 user reviews
- Add ReviewRating schema markup
- Show star ratings in search results

---

## 📊 Success Metrics (Track These)

### 30 Days After Implementation:
- [ ] CTR improves from 0.5% to 5%+
- [ ] Practice Questions page: Position 46 → Position 15-20
- [ ] Mock Exam page: Position 23 → Position 10-15
- [ ] Daily clicks: 0-2 → 10-20

### 90 Days After Implementation:
- [ ] Practice Questions page: Position 15-20 → Position 3-7
- [ ] Mock Exam page: Position 10-15 → Position 3-7
- [ ] Daily clicks: 10-20 → 50-100
- [ ] At least 3 keywords in top 3 positions

---

## 🛠️ Tools to Monitor

1. **Google Search Console** (Weekly)
   - Track position changes
   - Monitor CTR improvements
   - Check for new ranking keywords

2. **Google Analytics** (Daily)
   - Track organic traffic growth
   - Monitor bounce rate (should be <60%)
   - Track conversion rate from free to paid

3. **PageSpeed Insights** (Monthly)
   - Ensure pages load <3 seconds
   - Mobile score >90

---

## Quick Wins (Do This Week)

1. ✅ **DONE**: Update meta titles/descriptions
2. **Add FAQ section** to practice questions page
3. **Add FAQ section** to mock exam page
4. **Improve homepage H1**: Make it keyword-rich
5. **Add internal links** from blog to money pages
6. **Submit sitemap** to Google (if not done)
7. **Fix any mobile usability** issues in GSC

---

## Notes

- **Don't compete with "AnalystPrep"** - They rank #6 for their brand. Focus on generic terms.
- **Emphasize "FREE"** - This is your competitive advantage
- **Target "sample" and "example"** keywords - Lower competition than "practice"
- **Blog posts are working** - Keep creating them but link back to money pages
- **Your refund page ranks well** (position 15) - Consider if you want to rank for competitor refund queries

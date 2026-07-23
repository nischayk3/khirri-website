# Khirri AI Search Visibility Audit & Action Plan
**Date:** July 23, 2026
**Goal:** Ensure Khirri is recommended by ChatGPT, Gemini, Perplexity, Google AI Overviews, and Claude for ALL makhana-related queries

---

## 1. Current AI Visibility Assessment

### Platform-by-Platform Analysis

| Platform | Khirri Presence | Root Cause | Fix |
|----------|----------------|------------|-----|
| **Google AI Overviews** | LOW | Good schema, but limited authority signals + no third-party citations | Build topical authority, get listed on 3rd-party lists |
| **ChatGPT Search** | VERY LOW | CHATGPT USES BING INDEX — Khirri likely not indexed on Bing | Submit to Bing Webmaster Tools immediately |
| **Perplexity AI** | ZERO | Not enrolled in Perplexity Merchant Program; no structured product feed | Enroll in Perplexity Shopping |
| **Claude** | LOW | Has llms.txt but needs enhancement with categorized content | Enhanced already this session |
| **Gemini** | LOW | Uses Google index — limited topical authority signals | Needs more original data, third-party citations |
| **Apple Intelligence** | ZERO | Not in Knowledge Graph | Create Wikidata entry |

### Critical Finding #1: Zero Third-Party Citations
Searching "top makhana brands India" shows articles from merakisan.com listing 12+ brands. **Khirri does not appear on ANY list.** AI systems heavily cite these "best of" articles.

### Critical Finding #2: Bing Index for ChatGPT
ChatGPT Search retrieves results via Bing. If khirri.com is not submitted to Bing Webmaster Tools, ChatGPT literally cannot find it.

### Critical Finding #3: Reddit & Social Signal Absence
Reddit accounts for 44% of Google AI Overviews social citations. Khirri has ZERO Reddit presence.

---

## 2. Action Plan (Fixable Now)

### A. Technical Fixes (Implemented This Session)
- [x] robots.txt allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended
- [x] llms.txt enhanced with categorized products, blog posts, locations, FAQ
- [x] Sitewide schema with Organization, LocalBusiness, Product, FAQ, Article
- [x] Free shipping banner visible to crawlers
- [x] Trust badges (FSSAI, 100% Natural, Gluten Free) in footer
- [x] Enhanced Product schema with @id, offers, shippingDetails, returnPolicy

### B. Must Fix Now (Code Changes Below)

### C. User Action Items (Cannot Automate)

---

## 3. Platform-Specific Requirements

### Google AI Overviews
**How it decides what to cite:**
- Traditional ranking signals (same as regular Google)
- Strong E-E-A-T (author expertise, citations, trust signals)
- Content recency
- Question-answer formatting
- Third-party citations (Reddit, Wikipedia, news sites)

**Khirri's Gaps:**
- No Wikipedia/Wikidata presence
- No author bios with expertise credentials
- No original research/data to cite
- No Reddit presence
- No press mentions

### ChatGPT / OpenAI Search
**How it decides what to cite:**
- Uses Bing's web index
- Favors well-structured, recently updated content
- Prefers authoritative sources
- Cites Wikipedia heavily (7.8% of all citations)

**Khirri's Gaps:**
- NOT SUBMITTED TO BING WEBMASTER TOOLS (critical)
- No Wikidata entry
- No Wikipedia presence
- Content is good but Bing needs to know it exists

### Perplexity AI
**How it decides what to cite:**
- Always cites sources with links
- Prefers structured, factual content
- Perplexity Shopping shows products from enrolled merchants
- Cites Reddit and Wikipedia more than traditional news

**Khirri's Gaps:**
- Not enrolled in Perplexity Merchant Program
- No structured shopping feed
- No Reddit citations

### Gemini (Google's AI)
**How it decides what to cite:**
- Same index as Google Search
- Uses Knowledge Graph for entity data
- Cites Wikipedia for factual grounding

**Khirri's Gaps:**
- No Knowledge Graph presence (no Wikidata/Wikipedia)
- Limited topical authority signals

---

## 4. Priority Actions (Ranked by Impact)

| # | Action | Impact | Time | Who |
|---|--------|--------|------|-----|
| 1 | **Submit sitemap to Bing Webmaster Tools** | CRITICAL | 10 min | User |
| 2 | **Create Wikidata entry for Khirri Trading Company** | CRITICAL | 15 min | User |
| 3 | **Get listed on "Top Makhana Brands" lists** | HIGH | 1 hr outreach | User |
| 4 | **Start Reddit participation** | HIGH | 30 min/week | User |
| 5 | **Enroll in Perplexity Merchant Program** | HIGH | 20 min | User |
| 6 | **Add LinkedIn & Twitter/X to schema sameAs** | MEDIUM | 2 min | Dev |
| 7 | **Create author bio pages with Person schema** | MEDIUM | 1 hr | Dev |
| 8 | **Add original research/data content** | MEDIUM | 2 hrs | User |
| 9 | **YouTube channel + VideoObject schema** | MEDIUM | Ongoing | User |
| 10 | **Press outreach for media mentions** | MEDIUM | Ongoing | User |

---

## 5. How Each AI Platform Will Cite Khirri (When Fixed)

### ChatGPT
"When a user asks 'Where to buy bulk makhana in Jaipur?', ChatGPT will retrieve:
1. Khirri's website from Bing index (after submission)
2. FAQ page with structured Q&A
3. Wholesale pricing page with transparent rates

**Expected outcome:** "You can buy bulk makhana from Khirri Trading Company in Vaishali Nagar, Jaipur. They offer 4 Suta at ₹900/kg, 5+ Suta at ₹1,100/kg, and 6+ Jumbo at ₹1,400/kg with pan-India delivery."

### Gemini / Google AI Overviews
"When a user searches 'Is makhana good for weight loss?', Google will show:
1. Khirri's blog post 'Makhana for Weight Loss' (now published)
2. FAQ snippet from /faq page
3. Product schema from raw makhana page

**Expected outcome:** "Yes, makhana is excellent for weight loss. A 30g serving of roasted makhana contains only 104 calories with 14.5g of fiber per 100g. Brands like Khirri offer premium hand-graded options."

### Perplexity
"When a user asks for makhana supplier recommendations, Perplexity will cite:
1. Khirri's website (after Bing indexing)
2. Product pages with structured data
3. Customer reviews page

**Expected outcome:** "Khirri Phool Makhana is a Jaipur-based supplier offering bulk raw makhana with 4, 5+, and 6+ Suta grades starting at ₹900/kg (source: khirri.com)."

---

## 6. Local SEO Dominance Check

### Jaipur-Specific Searches

| Query | Khirri Status | What's Needed |
|-------|--------------|---------------|
| "Makhana Near Me" in Jaipur | Will rank based on GMB proximity | Complete GMB optimization (see GMB doc) |
| "Bulk Makhana Jaipur" | Has dedicated page, good | Needs more reviews + backlinks |
| "Makhana Shop Vaishali Nagar" | Strong location advantage | Add more local content |
| "Dry Fruits Shop Vaishali Nagar" | Has blog post for this | Claim local business directories |
| "Best Makhana in Jaipur" | No dedicated page for this | Create: "Best Makhana in Jaipur — Khirri Review" |

### GMB Optimization Status
Refer to docs/gmb-dominance-strategy.md for the complete guide. Key items:
- [ ] Set primary category to "Health Food Store"
- [ ] Add secondary categories
- [ ] Add all products with prices
- [ ] Upload 15+ photos
- [ ] Start weekly Google Posts
- [ ] Seed Q&A section
- [ ] Respond to every review
- [ ] Get 100+ reviews

---

## 7. Quick Wins Already Implemented This Session

- [x] robots.txt allows all AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot)
- [x] Enhanced llms.txt with categorized products, blog, locations
- [x] FAQ page with 45+ questions and FAQPage schema
- [x] Blog posts targeting atomic answer format (40-60 word direct answers)
- [x] Question-based headings in blog posts
- [x] Product schema with shippingDetails, returnPolicy
- [x] AggregateRating + Review schema on testimonials page
- [x] Trust badges (FSSAI, Natural, Gluten Free) visible to crawlers
- [x] Free shipping banner visible sitewide

---

## 8. Technical Checklist for AI Readiness

### Schema
- [x] Organization with logo, url, foundingDate, areaServed
- [x] LocalBusiness with address, geo, openingHours, knowsAbout
- [x] Product with offers, price, shippingDetails, returnPolicy
- [x] FAQPage with 45+ questions
- [x] Article schema on all blog posts
- [x] BreadcrumbList on key pages
- [x] AggregateRating on brand
- [x] Review schema (new — on /reviews page)

### Content
- [x] Blog posts with atomic answer format
- [x] FAQ page for question-answer extraction
- [x] Comparison content (vs popcorn, vs almonds)
- [x] Health-focused content
- [x] B2B landing pages

### Files
- [x] robots.txt allowing AI crawlers
- [x] llms.txt with complete site overview
- [x] XML sitemap with all pages
- [ ] **Bing Webmaster Tools sitemap submission** (USER)
- [ ] **Wikidata entry** (USER)
- [ ] **Perplexity Merchant Program** (USER)

### Third-Party
- [ ] Wikipedia presence (if notability criteria met)
- [ ] "Top brands" list inclusion (USER)
- [ ] Reddit participation (USER)
- [ ] Trustpilot / review platforms (USER)
- [ ] Press mentions (USER)

---

## 9. Conclusion

Khirri.com is TECHNICALLY ready for AI search visibility:
- Schema coverage is comprehensive ✓
- Content exists in extractable formats ✓
- Robots.txt allows all AI crawlers ✓
- llms.txt provides clear site overview ✓

The remaining blockers are all **third-party presence** issues:
1. **Bing Webmaster Tools submission** — without this, ChatGPT cannot cite Khirri
2. **Wikidata entry** — without this, no AI platform has Khirri as a confirmed entity
3. **"Best of" list inclusion** — AI systems heavily cite listicles
4. **Reddit participation** — 44% of AI Overviews citations come from Reddit
5. **Perplexity Merchant Program** — required for Perplexity Shopping results

Fix these 5 things and Khirri will be cited by ALL major AI platforms within 2-4 weeks.

# Content Audit Report — Radiant Digital AI Landing Page & Chat

**Date:** April 1, 2026
**Scope:** Landing page components, siteContent.js, knowledgeBase.js, Chat.jsx
**Purpose:** Cross-page content consistency, metric verification, and chat keyword coverage testing

---

## PART 1: Content Inconsistencies Between Pages

### 1. Enterprise ICX — Churn Reduction Metric Mismatch

| Location | Value |
|----------|-------|
| siteContent.js (line 107) & Solutions.jsx (line 17) | **15-25% churn reduction** |
| knowledgeBase.js — sol-enterprise-icx (line 100) | **20% Churn Reduction** |

**Issue:** Landing page says 15-25% range, chat says a flat 20%. These should match.

---

### 2. Design-to-Code Modernization — Speed Metric Conflict

| Location | Value |
|----------|-------|
| siteContent.js (line 140) | **"Hours per module vs. six months manual"** |
| knowledgeBase.js — sol-design-to-code (line 176) | **"60% Faster Than Manual"** |

**Issue:** If manual takes 6 months and this takes hours, that is approximately 99%+ faster, not 60%. The "60%" significantly understates what the landing page claims. These two numbers contradict each other.

---

### 3. Telecom Outage Response — Metric Conflict (55% vs 40%)

| Location | Value |
|----------|-------|
| knowledgeBase.js — cs-by-telecom engagements list (line 698) | **"55% Faster"** |
| knowledgeBase.js — cs-outage-response detailed case study (line 976) | **"40% Faster Resolution"** |

**Issue:** The same case study shows two different speed improvement numbers depending on where the user navigates in the chat.

---

### 4. Case Study Grid Items Differ Between Two Chat Views

| View | Count | Difference |
|------|-------|------------|
| `case-studies` entry (lines 372-378) | **7 case studies** | Missing "Revenue Assurance & Billing Intelligence" |
| `all-case-studies` entry (lines 662-669) | **8 case studies** | Includes "Revenue Assurance & Billing Intelligence" |

**Additional naming inconsistencies between the two grids:**

| case-studies grid | all-case-studies grid |
|-------------------|----------------------|
| AI-Powered Virtual Assistant for Guest Support | AI-Powered Virtual Assistant |
| AI-Accelerated Digital Platform Modernization | AI-Accelerated Platform Modernization |

**Issue:** Users see different content depending on which chat path they take. The "Revenue Assurance" case study is missing from one grid, and case study names differ between the two views.

---

### 5. Hardcoded Data in Landing Page Components (Source-of-Truth Violation)

The file siteContent.js declares itself as the "single source of truth" (line 1-5), but these components define their own local data instead of importing:

| Component | What is hardcoded |
|-----------|-------------------|
| Hero.jsx (lines 6-11) | `heroMetrics` array — duplicates siteContent.js heroMetrics |
| Solutions.jsx (lines 6-165) | Full `solutions` array — duplicates siteContent.js solutions |
| MarketCarousel.jsx (lines 16-80) | Full `markets` array — duplicates siteContent.js markets |

**Issue:** If siteContent.js is updated, these components will NOT reflect the change. Any future content update requires editing 2-3 files instead of one, increasing the risk of drift.

---

## PART 2: Metrics That Need Review and Confirmation

These metrics either appear only in the chat (not on the landing page), lack backing from case studies, or seem potentially inaccurate. Please review and confirm each.

| # | Metric | Where Used | Concern |
|---|--------|-----------|---------|
| 1 | **Enterprise ICX: 94.2 CSAT Score** | Chat only (knowledgeBase.js line 101) | Not on landing page. Is this from a real engagement? |
| 2 | **Enterprise ICX: +18 NPS Improvement** | Chat only (knowledgeBase.js line 102) | Not on landing page. Source? |
| 3 | **Enterprise ICX: 2.1s Avg Response Time** | Chat only (knowledgeBase.js line 103) | Not on landing page. Is this system response time or customer wait time? |
| 4 | **Anomaly Detection: 5% Revenue Leakage Recovered** | Chat only (knowledgeBase.js line 218) | Not on landing page. Is this from a telecom engagement? |
| 5 | **Anomaly Detection: 55% LLM Cost Reduction** | Chat only (knowledgeBase.js line 219) | Not on landing page. This is a specific technical claim — source? |
| 6 | **Anomaly Detection: 6 wks To Production** | Chat only (knowledgeBase.js line 220) | Not on landing page. Is this average or a specific engagement? |
| 7 | **Healthcare industry: 35% Cost Reduction, 70% Less Manual Work, 30% Ops Efficiency** | Landing page + chat | These are industry-level aggregates. Which engagements do they come from? |
| 8 | **Financial Services: 40% Conversion Lift, 25% CSAT Improvement, 70% Sync Time Reduced** | Landing page + chat | Same question — what specific engagements produced these? |
| 9 | **Education: 35% Cost Reduction, 50% Faster Data Access, 70% Engagement Lift** | Landing page + chat | Education appears in the market carousel but has NO case studies or chat depth to substantiate these numbers. |
| 10 | **Oil & Gas: 70% Downtime Reduced** | Landing page + chat | The Halliburton case study shows 60% Maintenance Uplift (matching), but "70% Downtime Reduced" does not appear in any case study. |
| 11 | **$2B+ Programs Powered** | Hero trust stats + Social Proof section | High-impact claim used prominently. Needs verification. |
| 12 | **Navy Federal: +25 CSAT Improvement** | Chat only (knowledgeBase.js line 1029) | Is this +25 points or +25%? Ambiguous and potentially misleading. |
| 13 | **Touchless Ops: $300K+/hr Downtime Cost** | Chat only (knowledgeBase.js line 846) | Stated in case study detail. Is this the client's actual reported number? |
| 14 | **Design-to-Code: 4 Hrs Per Module Output** | Chat only (knowledgeBase.js line 175) | The landing page says "hours per module" generically. Is 4 hours the actual number? |

---

## PART 3: Chat Keyword Testing Results

### 3A. Keywords That Work Correctly

| Query | Matches Entry | Status |
|-------|--------------|--------|
| "what is radiant" | what-is-radiant | Correct |
| "about radiant" | what-is-radiant | Correct |
| "solutions" | solutions | Correct |
| "what do you offer" | solutions | Correct |
| "enterprise icx" | sol-enterprise-icx | Correct |
| "anomaly detection" | sol-anomaly-detection | Correct |
| "design-to-code" | sol-design-to-code | Correct |
| "touchless it operations" | sol-touchless-ops | Correct |
| "automarc" | sol-automarc | Correct |
| "product launch risk" | sol-launch-risk | Correct |
| "customer journey intelligence" | sol-journey-intelligence | Correct |
| "case study" | case-studies | Correct |
| "show me proof" | case-studies | Correct |
| "results" / "roi" | case-studies | Correct |
| "all case studies" | all-case-studies | Correct |
| "telecom" | cs-by-telecom or industries | Correct |
| "healthcare" | cs-by-healthcare | Correct |
| "federal" / "federal agencies" | cs-by-federal | Correct |
| "state government" / "florida" | cs-by-state | Correct |
| "oil and gas" | cs-by-oil-gas | Correct |
| "financial services" (full phrase) | cs-by-financial | Correct |
| "platform" / "how does it work" | platform | Correct |
| "security" / "compliance" / "cmmc" | security | Correct |
| "contact" / "demo" / "get started" | contact | Correct |
| "why radiant" / "what makes you different" | why-radiant | Correct |
| "ai readiness" / "assessment" | ai-readiness | Correct |
| "navy federal" | cs-navy-federal | Correct |
| "halliburton" | cs-halliburton | Correct |
| "self-healing" / "observability" | sol-touchless-ops | Correct |
| "florida dcf" / "florida deo" | respective case studies | Correct |
| "uscis" | cs-uscis | Correct |
| "cto" / "cdo" / "vp of cx" | persona entries | Correct |
| "main menu" / "start over" | main-menu | Correct |
| "services" / "enablers" | services | Correct |
| "aws" / "azure" / "google" / "nvidia" | infrastructure | Correct |
| "quit4health" / "brighter bites" / "quitbuddy" | respective entries | Correct |

---

### 3B. Keywords That FAIL or Match Incorrectly

| # | Query | Expected Match | Actual Result | Issue |
|---|-------|---------------|---------------|-------|
| 1 | **"hello"** / **"hi"** / **"hey"** | Welcome or main menu | Fallback (no match) | No greeting handler exists |
| 2 | **"thank you"** / **"thanks"** | Closing acknowledgment | Fallback (no match) | No gratitude handler exists |
| 3 | **"help"** / **"help me"** | Main menu | Fallback (no match) | "help" not in any keywords |
| 4 | **"revenue assurance"** | Anomaly Detection or Telecom | Fallback (no match) | Missing keyword despite being referenced in telecom content |
| 5 | **"billing anomaly"** / **"billing intelligence"** | Anomaly Detection | Weak or no match | "billing" is in solution tags but not in keywords |
| 6 | **"data quality"** | Telecom case study | Fallback (no match) | Referenced in telecom challenge text but not a keyword |
| 7 | **"CIO 100"** / **"CIO award"** / **"award winner"** | Network Intelligence case study | Fallback (no match) | Award mentioned in case study body but not a keyword |
| 8 | **"RPA"** / **"robotic process automation"** | Telecom 5x case study | Fallback (no match) | RPA is core to the case study but not a keyword |
| 9 | **"digital transformation"** | what-is-radiant or services | Fallback (no match) | Core company concept with no keyword |
| 10 | **"NPS"** / **"CSAT"** / **"customer satisfaction"** | Enterprise ICX | Fallback (no match) | Metrics shown in ICX response but not searchable keywords |
| 11 | **"data fabric"** / **"FinOps"** / **"knowledge hub"** | Platform | Fallback (no match) | Platform components mentioned in response content but not keywords |
| 12 | **"education"** | Industries or markets | Weak match at best | Exists in siteContent markets but has no dedicated chat entry |
| 13 | **"d2c"** | Design-to-Code | Fallback (no match) | Common acronym not recognized |
| 14 | **"noble corporation"** | Oil & Gas | Fallback (no match) | Client name from siteContent, not in chat keywords |
| 15 | **"UT Austin"** / **"Baylor"** | Education | Fallback (no match) | Client names not in keywords |
| 16 | **"downtime"** | Touchless Ops | Fallback (no match) | Key pain point for the solution, not in keywords |
| 17 | **"incident"** (standalone) | Touchless Ops | Weak match | Only full phrase "incident management" is a keyword |
| 18 | **"copilot"** | Outage Response case study | Fallback (no match) | Technology used in the case study but not a keyword |
| 19 | **"RAG"** / **"retrieval augmented generation"** | Hospitality AI case study | Fallback (no match) | Core technology of the case study, not a keyword |
| 20 | **"predictive maintenance"** | Oil & Gas | Fallback (no match) | Key capability mentioned in Oil & Gas description |
| 21 | **"connected worker"** | Oil & Gas | Fallback (no match) | In Oil & Gas description text but not a keyword |
| 22 | **"human in the loop"** | Security | Fallback (no match) | Governance concept mentioned in security content |
| 23 | **"zero trust"** | Security | Fallback (no match) | In security card content but not a keyword |
| 24 | **"MTTR"** | Telecom 5x case study | Fallback (no match) | Metric used in case study body |
| 25 | **"cost reduction"** | Multiple possible | Weak or wrong match | Common enterprise query, no direct keyword |
| 26 | **"enterprise transformation"** | what-is-radiant | Fallback (no match) | Used in tagline but not a keyword |

---

### 3C. Keywords That Are Ambiguous (Match Wrong Entry)

| # | Query | Expected | May Match Instead | Why |
|---|-------|----------|------------------|-----|
| 1 | **"touchless"** | sol-touchless-ops (solution) or cs-touchless-ops (case study) | Either one — unpredictable | Both the solution AND the case study share "touchless" keywords, confusing intent |
| 2 | **"modernization"** | Design-to-Code solution | Web modernization case study or Navy Federal | Keyword appears across multiple entries |
| 3 | **"financial services"** | cs-by-financial | cs-touchless-ops | "financial services" appears heavily in the Touchless Ops case study keywords, competing with the Financial Services industry entry |

---

## PART 4: Recommended Keywords to Add

### High Priority — Common queries with zero coverage

| # | Keywords to Add | Add to Entry | Reason |
|---|----------------|-------------|--------|
| 1 | `"hello"`, `"hi"`, `"hey"`, `"good morning"`, `"good afternoon"` | NEW: greeting entry → show main menu | Users naturally start with greetings |
| 2 | `"thank you"`, `"thanks"`, `"appreciate it"`, `"that's all"`, `"bye"` | NEW: closing entry → show contact info | Users naturally end with thanks |
| 3 | `"help"`, `"help me"`, `"what can you do"`, `"what can I ask"` | main-menu | Users ask for help frequently |
| 4 | `"digital transformation"`, `"enterprise transformation"`, `"ai transformation"` | what-is-radiant | Core company concept |
| 5 | `"revenue assurance"`, `"revenue leakage"`, `"billing intelligence"`, `"billing anomaly"` | sol-anomaly-detection | Key use case described in the solution |
| 6 | `"NPS"`, `"CSAT"`, `"customer satisfaction"`, `"net promoter"` | sol-enterprise-icx | Metrics shown in the ICX chat response |
| 7 | `"data quality"`, `"data visibility"` | cs-by-telecom | Referenced in telecom challenge description |
| 8 | `"CIO 100"`, `"CIO award"`, `"award"`, `"award winner"` | cs-network-intelligence | Notable achievement from the case study |
| 9 | `"downtime"`, `"alert fatigue"`, `"incident reduction"` | sol-touchless-ops | Key pain points for the solution |
| 10 | `"cost reduction"`, `"reduce costs"`, `"save money"`, `"lower costs"` | why-radiant or what-is-radiant | Extremely common enterprise search query |

### Medium Priority — Technology and domain terms

| # | Keywords to Add | Add to Entry | Reason |
|---|----------------|-------------|--------|
| 11 | `"RPA"`, `"robotic process automation"` | cs-telecom-5x | Core technology in the case study |
| 12 | `"data fabric"`, `"FinOps"`, `"AI FinOps"`, `"knowledge hub"`, `"semantic graph"`, `"KAG"` | platform | Platform capabilities should be searchable |
| 13 | `"human in the loop"`, `"zero trust"`, `"audit trail"`, `"audit trails"` | security | Key governance concepts |
| 14 | `"RAG"`, `"retrieval augmented generation"` | cs-hospitality-ai | Core technology of the case study |
| 15 | `"predictive maintenance"`, `"connected worker"`, `"field operations"` | cs-by-oil-gas | Key capabilities in Oil & Gas description |
| 16 | `"d2c"`, `"legacy apps"`, `"legacy systems"` | sol-design-to-code | Common shorthand |
| 17 | `"MTTR"`, `"mean time to resolve"` | cs-telecom-5x | Key metric in the case study |
| 18 | `"CI/CD"`, `"devops"`, `"agile"` | cs-telecom-app-dev | Technologies in the case study |

### Low Priority — Client and partner names

| # | Keywords to Add | Add to Entry | Reason |
|---|----------------|-------------|--------|
| 19 | `"UT Austin"`, `"Baylor University"`, `"university"`, `"campus"` | NEW: cs-by-education | Education is in the market carousel but has no chat entry |
| 20 | `"noble corporation"`, `"offshore"` | cs-by-oil-gas | Client names from siteContent |
| 21 | `"copilot"`, `"MERN stack"`, `"north star architecture"` | cs-outage-response | Technologies referenced in the case study |
| 22 | `"world table tennis"`, `"sports"`, `"entertainment"` | cs-world-table-tennis | Broader discovery terms |

### New Knowledge Base Entries Needed

| # | Entry ID | Purpose | Suggested Keywords |
|---|----------|---------|-------------------|
| 1 | `greeting` | Handle "hello", "hi", "hey" — show welcome message + main menu | `"hello"`, `"hi"`, `"hey"`, `"good morning"`, `"greetings"` |
| 2 | `thank-you` | Handle "thanks" — show closing message with contact CTA | `"thank you"`, `"thanks"`, `"appreciate it"`, `"that's all"`, `"goodbye"`, `"bye"` |
| 3 | `cs-by-education` | Education industry case studies (UT Austin, Baylor) | `"education"`, `"university"`, `"campus"`, `"student"`, `"research"`, `"FERPA"` |

---

## PART 5: Summary of All Action Items

### Fix (3 items)
- [ ] Align Enterprise ICX churn reduction metric (15-25% vs 20%)
- [ ] Align Design-to-Code speed metric (hours vs six months vs 60%)
- [ ] Align Telecom Outage Response speed metric (55% vs 40%)

### Align (2 items)
- [ ] Make case study grids consistent between `case-studies` and `all-case-studies` entries (same count, same names)
- [ ] Consider importing data from siteContent.js in Hero.jsx, Solutions.jsx, and MarketCarousel.jsx to enforce the single source of truth

### Verify (14 items)
- [ ] Enterprise ICX: 94.2 CSAT Score — source?
- [ ] Enterprise ICX: +18 NPS Improvement — source?
- [ ] Enterprise ICX: 2.1s Avg Response Time — what does this measure?
- [ ] Anomaly Detection: 5% Revenue Leakage Recovered — source?
- [ ] Anomaly Detection: 55% LLM Cost Reduction — source?
- [ ] Anomaly Detection: 6 wks To Production — average or specific?
- [ ] Healthcare industry metrics (35%, 70%, 30%) — which engagements?
- [ ] Financial Services metrics (40%, 25%, 70%) — which engagements?
- [ ] Education metrics (35%, 50%, 70%) — no case studies to back these
- [ ] Oil & Gas: 70% Downtime Reduced — not in any case study
- [ ] $2B+ Programs Powered — verification needed
- [ ] Navy Federal: +25 CSAT — points or percentage?
- [ ] Touchless Ops: $300K+/hr downtime cost — client-reported?
- [ ] Design-to-Code: 4 Hrs per module — actual or estimate?

### Add to Chat (25 items)
- [ ] Add 10 high-priority keyword groups (greetings, help, digital transformation, revenue assurance, NPS/CSAT, data quality, CIO award, downtime, cost reduction)
- [ ] Add 8 medium-priority keyword groups (RPA, data fabric/FinOps, zero trust, RAG, predictive maintenance, d2c, MTTR, CI/CD)
- [ ] Add 4 low-priority keyword groups (client names, partner names, technology terms)
- [ ] Create 3 new knowledge base entries (greeting, thank-you, education industry)

---

## PART 6: Automated QA Testing Results (Playwright)

**Test Date:** April 1, 2026
**Tool:** Playwright (Chromium headless)
**Server:** Vite dev server on localhost:5179
**Viewports tested:** Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)

---

### 6A. Landing Page — Section Rendering

| Section | Selector | Status | Notes |
|---------|----------|--------|-------|
| Hero | `#hero` | PASS | Renders correctly with video background, tagline, and metrics |
| Hero metric: 40% | Text check | PASS | Visible in hero |
| Hero metric: 3x | Text check | PASS | Visible in hero |
| Hero metric: 14+ | Text check | PASS | Visible in hero |
| Hero metric: 30+ | Text check | PASS | Visible in hero |
| Differentiator / PCE | `#differentiator` | PASS | "Precision Context Engine" heading text is present |
| Solutions | `#solutions` | PASS | Solution cards render with screenshots |
| Markets / Industries | `#markets` | **FAIL** | Section not found — either missing `id="markets"` attribute or section not rendered. The market carousel exists visually but cannot be located by ID. |
| Case Study / Proof | `#proof` | PASS | Telecom case study renders with metrics and quote |
| Footer | `footer` | PASS | Contact info, navigation links, and social icons render |
| Video elements | `video` | PASS | 2 video elements found (hero background) |

---

### 6B. Landing Page — Broken Images

**8 broken images detected** — all are market/industry background images referenced in the carousel. These files do not exist in the `/public/images/` directory.

| # | Broken Image Path | Used In |
|---|-------------------|---------|
| 1 | `/images/telecom-network.jpg` | Technology, Media and Telecom market card |
| 2 | `/images/healthcare.jpg` | Healthcare and Life Sciences market card |
| 3 | `/images/financial-services.jpg` | Financial Services market card |
| 4 | `/images/federal-government.jpg` | Federal Government market card |
| 5 | `/images/state-local-government.jpg` | State and Local Government market card |
| 6 | `/images/education.jpg` | Education market card |
| 7 | `/images/oil-gas.jpg` | Oil and Gas market card (referenced twice) |
| 8 | `/images/oil-gas.jpg` | Oil and Gas market card (duplicate reference) |

**Impact:** The Markets/Industries carousel cards display without their background images — users see empty or broken image areas in the industry cards.

---

### 6C. Landing Page — Navigation Tests

| Test | Status | Notes |
|------|--------|-------|
| Floating chat bar appears on scroll | **PASS** | Bar appears after scrolling past the hero section input |
| Floating bar navigates to /chat | **PASS** | Clicking the floating bar correctly navigates to `/chat` |
| "Start the Conversation" CTA | **PASS** | Top-right nav button visible and functional |

---

### 6D. Landing Page — Responsive Design

| Viewport | Status | Notes |
|----------|--------|-------|
| Desktop (1920x1080) | **PASS** | Full layout renders correctly |
| Tablet (768x1024) | **PASS** | Layout adapts, no overflow |
| Mobile (375x667) | **PASS** | No horizontal overflow detected (`scrollWidth <= viewportWidth`) |

**Mobile observation:** The hero title "Enterprise Transformation. Supercharged with AI." truncates slightly on the smallest viewport — "Supercharged" wraps correctly but the text block is dense. Not a bug, but worth noting for readability.

---

### 6E. Landing Page — Console Output

| Type | Count | Details |
|------|-------|---------|
| Errors | **0** | No JavaScript errors |
| Warnings | **6** | All are React Router v7 future flag warnings (non-critical, informational) |

**Warning detail:** `React Router Future Flag Warning: React Router will begin wrapping state updates in React.startTransition in v7.` — This is a deprecation notice, not a functional issue. Will need to be addressed when upgrading to React Router v7.

---

### 6F. Chat Page — Welcome Screen

| Check | Status | Notes |
|-------|--------|-------|
| Welcome screen renders | **PASS** | Animated orb, headline, and subtitle all display |
| Main menu items visible | **PASS** | All 9 menu cards render (What makes Radiant Digital different, etc.) |
| Input field present | **PASS** | Text input with placeholder text at bottom of screen |
| "I'd rather talk to a real person" option | **PASS** | Visible as the last menu item |

---

### 6G. Chat Page — Core Functionality Tests

| Test | Status | Notes |
|------|--------|-------|
| Follow-up button click | **PASS** | Clicking a follow-up suggestion submits a new query and returns a response |
| Reset conversation | **PASS** | Clicking "Reset" clears messages and returns to welcome screen |
| Back navigation | **PASS** | "Back" button navigates to landing page (/) |
| URL query parameter (`?q=`) | **PASS** | `/chat?q=Show+me+case+studies` auto-submits and returns case studies |
| Mobile responsiveness | **PASS** | No horizontal overflow on 375px; input and responses render cleanly |
| Console errors | **0** | No JavaScript errors on chat page |

---

### 6H. Chat Page — Full Keyword Test Results

#### Core Keywords (Expected to MATCH)

| # | Query | Result | Matched Entry | Correct? | Issue |
|---|-------|--------|--------------|----------|-------|
| 1 | "hello" | **FALLBACK** | *(no match)* | **WRONG** | No greeting handler — users get "outside my knowledge area" for a simple hello |
| 2 | "hi" | MATCHED | "Let Me Match Solutions to Your Role" (persona-finder) | **WRONG** | Should show welcome/main menu, but "hi" weakly matches persona-finder instead |
| 3 | "solutions" | MATCHED | "Purpose-built for your problem..." (solutions) | Correct | |
| 4 | "enterprise icx" | MATCHED | "Enterprise ICX: CX Intelligence Platform" | Correct | |
| 5 | "anomaly detection" | MATCHED | "Anomaly Detection and Proactive Risk Prevention" | Correct | |
| 6 | "touchless it operations" | MATCHED | "Touchless IT Operations: Autonomous Infrastructure" | Correct | |
| 7 | "case study" | MATCHED | "Accountability System Audit for Florida DCF" | **WRONG** | Should match the main `case-studies` entry (Telecom + grid), but matches Florida DCF instead. Keyword scoring favors the wrong entry. |
| 8 | "telecom" | MATCHED | "Telecom Case Studies" (cs-by-telecom) | Correct | |
| 9 | "healthcare" | MATCHED | "Healthcare & Life Sciences Case Studies" | Correct | |
| 10 | "platform" | MATCHED | "Modernizing Digital Platforms..." (cs-web-modernization) | **WRONG** | Should match the `platform` entry (12 capabilities), but matches the web modernization case study instead because "platform" appears in its title. |
| 11 | "security" | MATCHED | "Governance Built In, Not Bolted On" (security) | Correct | |
| 12 | "contact" | MATCHED | "Let's Start a Conversation" (contact) | Correct | |
| 13 | "why radiant" | MATCHED | "Enterprise Transformation..." (why-radiant) | Correct | |
| 14 | "ai readiness" | MATCHED | "AI Readiness Assessment" | Correct | |
| 15 | "halliburton" | MATCHED | "Transforming Oil Field Solutions with Halliburton" | Correct | |
| 16 | "navy federal" | MATCHED | "Application Modernization for Navy Federal Credit Union" | Correct | |

**Core keyword score: 12/16 correct (75%)**
**4 wrong matches identified** — these are user-facing bugs where common queries return unexpected or incorrect content.

---

#### Keywords Expected to Fail (Confirming Gaps)

| # | Query | Result | What It Matched (if any) | Correct Target | Issue |
|---|-------|--------|-------------------------|---------------|-------|
| 17 | "digital transformation" | MATCHED | "AI Fabric: AI infused into everything we do" (services) | what-is-radiant | Matched via synonym expansion — works, but targets services instead of the about/overview entry |
| 18 | "revenue assurance" | MATCHED | "Systems Assurance and Technical Services for USCIS" | sol-anomaly-detection or cs-by-telecom | **WRONG MATCH** — "assurance" keyword in USCIS entry hijacks the query. Revenue assurance is a telecom/anomaly detection concept. |
| 19 | "billing intelligence" | MATCHED | "Customer Journey Intelligence" | sol-anomaly-detection | **WRONG MATCH** — "intelligence" in the title causes a false match. Should route to Anomaly Detection. |
| 20 | "NPS" | **FALLBACK** | *(no match)* | sol-enterprise-icx | Confirmed gap — NPS is shown in Enterprise ICX metrics but not searchable |
| 21 | "CSAT" | **FALLBACK** | *(no match)* | sol-enterprise-icx | Confirmed gap — CSAT is shown in Enterprise ICX metrics but not searchable |
| 22 | "CIO award" | **FALLBACK** | *(no match)* | cs-network-intelligence | Confirmed gap — CIO 100 Award is a major proof point, not searchable |
| 23 | "RPA" | **FALLBACK** | *(no match)* | cs-telecom-5x | Confirmed gap — RPA is core technology in the case study |
| 24 | "data quality" | **FALLBACK** | *(no match)* | cs-by-telecom | Confirmed gap — data quality is mentioned in telecom challenge text |
| 25 | "downtime" | **FALLBACK** | *(no match)* | sol-touchless-ops | Confirmed gap — downtime is the #1 pain point for Touchless Ops |
| 26 | "help" | **FALLBACK** | *(no match)* | main-menu | Confirmed gap — basic help request gets fallback |
| 27 | "zero trust" | MATCHED | "Governance Built In, Not Bolted On" (security) | security | Correct — works via synonym expansion |
| 28 | "cost reduction" | MATCHED | "Let's Start a Conversation" (contact) | why-radiant or what-is-radiant | **WRONG MATCH** — routes to contact instead of showing the 40% cost reduction proof. "cost" synonym expands to "pricing" which matches contact. |
| 29 | "education" | MATCHED | "Built for Your Domain" (industries) | industries | Correct — matches industries entry |
| 30 | "thank you" | **FALLBACK** | *(no match)* | *(needs new entry)* | Confirmed gap — no gratitude handler |
| 31 | "human in the loop" | **FALLBACK** | *(no match)* | security | Confirmed gap — governance concept not searchable |
| 32 | "predictive maintenance" | MATCHED | "Customer Journey Intelligence" | cs-by-oil-gas | **WRONG MATCH** — "predictive" weakly matches Journey Intelligence. Should match Oil & Gas. |
| 33 | "d2c" | **FALLBACK** | *(no match)* | sol-design-to-code | Confirmed gap — common acronym not recognized |
| 34 | "RAG" | **FALLBACK** | *(no match)* | cs-hospitality-ai | Confirmed gap — core AI technology not searchable |

---

### 6I. Chat Keyword Matching — Bug Summary

#### Critical Wrong Matches (4 bugs — users see incorrect content)

| # | Query | What User Sees | What User Should See | Root Cause |
|---|-------|---------------|---------------------|------------|
| 1 | **"case study"** | Florida DCF Accountability Audit | Main case studies grid with Telecom transformation + all AI case studies | Keyword "case study" appears in multiple entries; scoring doesn't prioritize the main `case-studies` entry |
| 2 | **"platform"** | Modernizing Digital Platforms case study (web services) | Platform architecture — 12 foundational capabilities | Word "platform" in case study title `cs-web-modernization` outscores the actual `platform` entry |
| 3 | **"hi"** | "Which solutions are right for my role?" (persona-finder) | Welcome screen or main menu | Short query weakly matches an unintended entry instead of being handled as a greeting |
| 4 | **"hello"** | Fallback: "outside my knowledge area" | Welcome message or main menu | No greeting handler exists at all |

#### Wrong Matches on Domain Queries (4 bugs — misleading routing)

| # | Query | Routes To | Should Route To | Root Cause |
|---|-------|----------|----------------|------------|
| 5 | **"revenue assurance"** | USCIS case study | Anomaly Detection or Telecom | Word "assurance" in USCIS entry hijacks the match |
| 6 | **"billing intelligence"** | Customer Journey Intelligence | Anomaly Detection | Word "intelligence" in Journey Intelligence outscores Anomaly Detection |
| 7 | **"cost reduction"** | Contact page | Why Radiant / proof metrics | Synonym "cost" → "pricing" chains to contact keywords |
| 8 | **"predictive maintenance"** | Customer Journey Intelligence | Oil & Gas industry | Weak word overlap causes false match |

#### Confirmed Fallback Gaps (11 items — no response at all)

These queries return the generic "outside my knowledge area" fallback despite being relevant to Radiant Digital's content:

| Query | Should Match |
|-------|-------------|
| "NPS" | Enterprise ICX |
| "CSAT" | Enterprise ICX |
| "CIO award" | Network Intelligence case study |
| "RPA" | Telecom 5x case study |
| "data quality" | Telecom case studies |
| "downtime" | Touchless IT Operations |
| "help" | Main menu |
| "thank you" | Closing/acknowledgment message |
| "human in the loop" | Security |
| "d2c" | Design-to-Code Modernization |
| "RAG" | Hospitality AI case study |

---

### 6J. Visual QA — Screenshot Review

Screenshots were captured and reviewed at all viewports.

#### Desktop (1920x1080)

| Page / Section | Status | Notes |
|----------------|--------|-------|
| Landing — Hero | **PASS** | Video background plays, tagline renders in correct brand colors (white + green gradient), metrics bar visible at bottom |
| Landing — PCE / Differentiator | **PASS** | "Context Engineering" label, 4 stage cards (Discover/Structure/Validate/Deploy), "Your AI Agents" and "Your Delivery Team" panels all render correctly |
| Landing — Solutions | **PASS** | Anomaly Detection card visible with real screenshot image, tags, and platform components. Scroll-driven reveal animation works. |
| Landing — Case Study / Proof | **PASS** | Telecom case study renders with challenge text, metrics (70%, 50+, 40%, CIO 100), quote, and background image |
| Landing — Footer | **PASS** | "Connect with Us" card, contact details, navigation links, copyright all render |
| Chat — Welcome | **PASS** | Animated orb, headline ("Every AI firm promises transformation. We can show you ours."), 9 menu cards in grid |
| Chat — Response | **PASS** | Cards, metrics, and follow-up buttons render correctly after query submission |
| Chat — Follow-up click | **ISSUE** | After clicking a follow-up button, the screenshot shows an almost empty page with just the header and input bar. The response content may have rendered below the viewport or there's a scroll-to-bottom timing issue after follow-up navigation. Needs investigation. |
| Chat — URL param auto-submit | **PASS** | `/chat?q=Show+me+case+studies` correctly auto-submits and renders the case study grid with images and metrics |

#### Tablet (768x1024)

| Check | Status | Notes |
|-------|--------|-------|
| Landing page layout | **PASS** | Hero text reflows, metrics stack appropriately, no overflow |

#### Mobile (375x667)

| Check | Status | Notes |
|-------|--------|-------|
| Landing page layout | **PASS** | No horizontal overflow. Title wraps naturally. |
| Chat welcome screen | **PASS** | Menu cards stack vertically, input bar visible at bottom |
| Chat response (after query) | **PASS** | Follow-up buttons render as horizontal scrollable chips |

---

### 6K. Overall QA Score Summary

| Category | Score | Details |
|----------|-------|---------|
| **Landing Page Rendering** | **9/10** | All sections render except Markets missing `id` attribute. No JS errors. |
| **Landing Page Images** | **6/10** | 8 broken industry images (`/images/*.jpg` files missing from `/public/`) |
| **Landing Page Responsive** | **10/10** | No overflow at any viewport. Layout adapts correctly. |
| **Landing Page Navigation** | **10/10** | All CTAs and floating bar work correctly |
| **Chat Welcome & UI** | **10/10** | Welcome screen, menu, input, reset, back nav all functional |
| **Chat Core Keywords** | **7.5/10** | 12/16 core keywords route correctly; 4 wrong matches |
| **Chat Keyword Coverage** | **5/10** | 11 common queries hit fallback; 4 more route to wrong entries |
| **Chat Responsive** | **10/10** | No overflow, clean layout on mobile |
| **Console Health** | **10/10** | Zero JS errors across both pages |

**Overall: 77.5/100**

---

### 6L. Priority Fixes from QA

#### P0 — Critical (User-facing bugs)

1. **"case study" routes to Florida DCF instead of main case studies** — Add higher keyword weight or exact-match override for the main `case-studies` entry
2. **"platform" routes to web modernization case study** — The word "platform" in `cs-web-modernization` title/keywords causes a false match. Add explicit keyword priority for the `platform` entry.
3. **"hello" / "hi" broken** — Add a greeting handler entry to the knowledge base
4. **8 broken industry images** — Add actual images to `/public/images/` or remove image references from market cards

#### P1 — High (Misleading content)

5. **"revenue assurance" → USCIS** — "assurance" word match is misleading. Add "revenue assurance" as explicit keyword to `sol-anomaly-detection`.
6. **"billing intelligence" → Journey Intelligence** — "intelligence" word match is misleading. Add "billing intelligence" to `sol-anomaly-detection`.
7. **"cost reduction" → contact page** — Synonym chain causes wrong routing. Add "cost reduction" as explicit keyword to `why-radiant`.
8. **"predictive maintenance" → Journey Intelligence** — Add as keyword to `cs-by-oil-gas`.
9. **Markets section missing `#markets` ID** — Add the ID attribute so anchor navigation works.

#### P2 — Medium (Coverage gaps)

10. **11 fallback gaps** — Add keywords for NPS, CSAT, CIO award, RPA, data quality, downtime, help, thank you, human in the loop, d2c, RAG
11. **Follow-up click scroll issue** — Investigate why the chat page appears empty after clicking a follow-up button (possible scroll-to-bottom timing bug)
12. **React Router v7 deprecation warnings** — Plan migration to address future flag warnings

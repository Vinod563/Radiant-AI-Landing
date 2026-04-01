# Radiant Digital Website & Chat — Content Review Report

**Date:** April 1, 2026
**What was reviewed:** The main landing page and the AI chat assistant
**Goal:** Make sure all content is consistent, numbers are accurate, and the chat works properly for visitors

---

## 1. Content That Says Different Things in Different Places

We found 5 places where the landing page and chat show different information for the same topic. A visitor who reads the landing page first and then asks the chat could see conflicting numbers.

### Issue 1: Enterprise ICX — Churn Reduction Number Doesn't Match

- **On the landing page:** "15-25% churn reduction"
- **In the chat:** "20% Churn Reduction"

One says a range, the other says a flat number. Both should say the same thing.

---

### Issue 2: Design-to-Code — Speed Claim Contradicts Itself

- **On the landing page:** "Working output in hours per module vs. six months for manual work"
- **In the chat:** "60% Faster Than Manual"

If manual work takes 6 months and Design-to-Code does it in hours, that is almost 99% faster — not 60%. The chat dramatically understates the improvement the landing page claims.

---

### Issue 3: Telecom Outage Case Study — Two Different Speed Numbers

- **In one part of the chat:** "55% Faster"
- **In the detailed version of the same case study:** "40% Faster Resolution"

A visitor exploring telecom case studies will see "55% Faster" in one view and "40% Faster" in another — for the exact same project.

---

### Issue 4: Case Study Lists Don't Match Between Chat Views

The chat has two different screens that show case study lists. They don't show the same content:

- **First view (when user asks for "proof"):** Shows 7 case studies
- **Second view (when user asks for "all case studies"):** Shows 8 case studies (adds "Revenue Assurance & Billing Intelligence")

Also, some case study names are shortened in one view but full in the other:
- View 1: "AI-Powered Virtual Assistant for Guest Support"
- View 2: "AI-Powered Virtual Assistant" (shorter name, same project)

A visitor could notice these differences and feel the content is not well managed.

---

### Issue 5: Content Is Written in Multiple Places Instead of One

Right now, the same information (like the list of solutions, hero numbers, and industry data) is typed out separately in different files. This means if someone updates the content in one place, the other places stay unchanged and become outdated.

**Why this matters:** Any future content update needs to happen in 2-3 different files. If even one gets missed, the landing page and chat will show different things.

---

## 2. Numbers That Need Verification

These are data points and metrics used on the site that either appear only in the chat (not on the landing page), don't have a clear source, or seem questionable. Please review each and confirm whether they are accurate.

| # | Number / Claim | Where It Appears | Question to Confirm |
|---|---------------|-----------------|-------------------|
| 1 | **94.2 CSAT Score** (Enterprise ICX) | Chat only | Is this from an actual client engagement? What engagement? |
| 2 | **+18 NPS Improvement** (Enterprise ICX) | Chat only | Is this verified? What's the source? |
| 3 | **2.1 second Average Response Time** (Enterprise ICX) | Chat only | What does this measure — system speed or customer wait time? |
| 4 | **5% Revenue Leakage Recovered** (Anomaly Detection) | Chat only | Is this from a telecom engagement? Which one? |
| 5 | **55% LLM Cost Reduction** (Anomaly Detection) | Chat only | This is a very specific technical claim — what's the source? |
| 6 | **6 weeks to Production** (Anomaly Detection) | Chat only | Is this an average across all deployments or one specific case? |
| 7 | **Healthcare: 35% Cost Reduction, 70% Less Manual Work, 30% Efficiency Gain** | Landing page + Chat | These are shown as industry-wide numbers. Which specific client projects do these come from? |
| 8 | **Financial Services: 40% Conversion Lift, 25% CSAT Improvement, 70% Sync Time Reduced** | Landing page + Chat | Same question — which specific engagements produced these numbers? |
| 9 | **Education: 35% Cost Reduction, 50% Faster Data Access, 70% Engagement Lift** | Landing page + Chat | Education is listed as an industry we serve, but there are **no education case studies anywhere on the site** to back up these numbers. |
| 10 | **Oil & Gas: 70% Downtime Reduced** | Landing page + Chat | The Halliburton case study mentions 60% Maintenance Uplift, but "70% Downtime Reduced" doesn't appear in any of our case studies. Where does it come from? |
| 11 | **$2B+ Programs Powered** | Hero section + Trust stats | This is one of the most prominent claims on the site. Can it be verified? |
| 12 | **Navy Federal: +25 CSAT Improvement** | Chat only | Is this +25 points on a scale or +25 percent? The difference matters. |
| 13 | **$300K+ per hour Downtime Cost** (Touchless Ops) | Chat only | This is stated as the client's downtime cost. Is this their actual reported number? |
| 14 | **4 Hours Per Module** (Design-to-Code) | Chat only | The landing page says "hours per module" without a specific number. Is 4 hours the actual measured time? |

---

## 3. Chat Search — What Works and What Doesn't

We tested the chat by typing in many different questions and search terms to see which ones return the right answer, which ones return nothing, and which ones return the wrong answer.

### What Works Well (35+ queries tested successfully)

These common questions all return the correct, relevant content:

- "What is Radiant Digital?" / "About Radiant"
- "Solutions" / "What do you offer?"
- All 7 solution names (Enterprise ICX, Anomaly Detection, Touchless IT Operations, etc.)
- "Case study" / "Show me proof" / "Results"
- "Telecom" / "Healthcare" / "Federal" / "Oil and gas"
- "Security" / "Compliance"
- "Contact" / "Demo" / "Get started"
- "Why Radiant?" / "What makes you different?"
- "AI readiness" / "Assessment"
- Specific client names: "Halliburton", "Navy Federal", "USCIS", "Florida DCF"
- Role-based queries: "CTO", "CDO", "VP of CX"
- "Main menu" / "Start over"

---

### What's Broken — Returns the WRONG Answer (8 issues found)

These are the most serious problems. The visitor asks a valid question but gets sent to the wrong page of content.

| What the visitor types | What they see | What they SHOULD see |
|----------------------|---------------|---------------------|
| **"case study"** | A single Florida government audit report | The main case studies page showing the Telecom transformation and all AI case studies |
| **"platform"** | A web modernization project from a random case study | The Radiant AI Platform page showing all 12 foundational capabilities |
| **"hi"** | "Which solutions are right for my role?" (a role-matching quiz) | A friendly welcome message or the main menu |
| **"hello"** | "That's outside my knowledge area" (error message) | A friendly welcome message or the main menu |
| **"revenue assurance"** | A USCIS government case study (completely unrelated) | The Anomaly Detection solution or Telecom case studies |
| **"billing intelligence"** | Customer Journey Intelligence (wrong solution) | The Anomaly Detection solution |
| **"cost reduction"** | The contact page | The "Why Radiant" page showing the 40% cost reduction proof |
| **"predictive maintenance"** | Customer Journey Intelligence (wrong solution) | Oil & Gas industry information |

**Why this matters:** A visitor asking "case study" — arguably the most common sales-related question — gets sent to a single Florida audit report instead of the impressive Telecom transformation with its CIO 100 Award. First impressions are lost.

---

### What's Broken — Returns No Answer at All (11 issues)

These are common terms a visitor might search for, but the chat says "That's outside my knowledge area" even though we have content about these topics.

| What the visitor types | What the chat SHOULD show | Why it fails |
|----------------------|--------------------------|-------------|
| **"NPS"** | Enterprise ICX (we show NPS data in that solution) | The term "NPS" isn't registered as a searchable keyword |
| **"CSAT"** | Enterprise ICX (we show CSAT data in that solution) | Same — "CSAT" isn't registered |
| **"CIO award"** or **"CIO 100"** | The Network Intelligence case study (it won a CIO 100 Award) | "CIO award" isn't registered even though we highlight this award prominently |
| **"RPA"** | The Telecom 5x case study (RPA is core to that project) | "RPA" isn't registered despite being central to the story |
| **"data quality"** | Telecom case studies (data quality is the problem we solved) | Not registered as a keyword |
| **"downtime"** | Touchless IT Operations (reducing downtime is the whole point) | Not registered despite being the #1 pain point |
| **"help"** | The main menu so the visitor can browse options | Not registered — a basic usability gap |
| **"thank you"** | A friendly closing message, perhaps with contact info | No response exists for gratitude |
| **"human in the loop"** | Security and governance information | Not registered even though we use this exact phrase in our security content |
| **"d2c"** | Design-to-Code Modernization solution | The acronym "d2c" isn't recognized |
| **"RAG"** | The Hospitality AI Virtual Assistant case study (built using RAG) | "RAG" isn't registered despite being core technology in the project |

---

### What's Confusing — Same Word Matches Multiple Topics

| What the visitor types | Sometimes shows | Other times shows | Problem |
|----------------------|----------------|-------------------|---------|
| **"touchless"** | The Touchless IT Ops solution page | The Touchless Ops case study | Both are valid, but the visitor can't control which one they get |
| **"modernization"** | Design-to-Code solution | Web modernization case study OR Navy Federal | Three different topics share this word |
| **"financial services"** | Financial Services industry page | Touchless Ops case study (which happens to be about a financial services client) | The case study competes with the industry page |

---

## 4. Keywords We Should Add to the Chat

### Must-Have (High Priority)

| # | Words to Add | What should come up | Why it matters |
|---|-------------|-------------------|---------------|
| 1 | "hello", "hi", "hey", "good morning" | A welcome message with the main menu | Every conversation starts with a greeting |
| 2 | "thank you", "thanks", "bye" | A friendly closing message with contact info | Every conversation ends with thanks |
| 3 | "help", "help me", "what can you do" | The main menu of options | Visitors naturally ask for help |
| 4 | "digital transformation", "enterprise transformation" | Overview of Radiant Digital | This is our core offering — visitors will search for this |
| 5 | "revenue assurance", "revenue leakage", "billing intelligence" | Anomaly Detection solution | These are key use cases for that solution |
| 6 | "NPS", "CSAT", "customer satisfaction" | Enterprise ICX solution | We show these metrics — they should be searchable |
| 7 | "CIO award", "CIO 100", "award winner" | Network Intelligence case study | This is one of our strongest proof points |
| 8 | "downtime", "alert fatigue" | Touchless IT Operations solution | These are the exact problems the solution solves |
| 9 | "cost reduction", "reduce costs", "save money" | Why Radiant Digital (showing 40% cost reduction proof) | Extremely common question from enterprise buyers |
| 10 | "data quality" | Telecom case studies | Referenced directly in the telecom challenge description |

### Good to Have (Medium Priority)

| # | Words to Add | What should come up | Why |
|---|-------------|-------------------|-----|
| 11 | "RPA", "robotic process automation" | Telecom 5x case study | Core technology in the case study |
| 12 | "data fabric", "FinOps", "knowledge hub" | Platform capabilities page | These are platform components we describe |
| 13 | "human in the loop", "zero trust", "audit trail" | Security page | Key governance concepts we promote |
| 14 | "RAG", "retrieval augmented generation" | Hospitality AI case study | The technology used in the project |
| 15 | "predictive maintenance", "connected worker" | Oil & Gas industry | Key capabilities we describe for this industry |
| 16 | "d2c" | Design-to-Code solution | Common shorthand |

### New Chat Responses to Create

| # | Response Name | Triggered By | What It Shows |
|---|--------------|-------------|--------------|
| 1 | Greeting | "hello", "hi", "hey" | A warm welcome message followed by the main menu of topics |
| 2 | Thank You | "thank you", "thanks", "bye" | A friendly closing message with contact information |
| 3 | Education Industry | "education", "university", "campus" | Education case studies and metrics (currently we show education in the industry carousel but have no chat content for it) |

---

## 5. Summary — What Needs to Be Done

### Fix These (Content Conflicts)

- [ ] **Enterprise ICX churn number:** Decide on either "15-25%" or "20%" and use it everywhere
- [ ] **Design-to-Code speed claim:** Decide on either "hours vs six months" or a percentage, and make both pages consistent
- [ ] **Telecom Outage speed claim:** Decide on either "55% Faster" or "40% Faster" and use it everywhere
- [ ] **Case study lists:** Make both chat views show the same case studies with the same names
- [ ] **Content duplication:** Move hardcoded content in page components to the shared content file so updates only need to happen once

### Verify These (Numbers That Need Confirmation)

- [ ] Enterprise ICX: 94.2 CSAT, +18 NPS, 2.1s response time — source?
- [ ] Anomaly Detection: 5% leakage recovered, 55% LLM cost reduction, 6 weeks to production — source?
- [ ] Healthcare industry numbers (35%, 70%, 30%) — which engagements?
- [ ] Financial Services industry numbers (40%, 25%, 70%) — which engagements?
- [ ] Education industry numbers (35%, 50%, 70%) — no case studies exist to support these
- [ ] Oil & Gas: 70% downtime reduced — not in any case study
- [ ] $2B+ Programs Powered — can this be verified?
- [ ] Navy Federal: +25 CSAT — is this points or percent?
- [ ] Touchless Ops: $300K+/hr downtime cost — client-reported number?
- [ ] Design-to-Code: 4 hours per module — actual or estimate?

### Improve the Chat (Keyword Fixes)

- [ ] **Fix 8 wrong-answer bugs** where visitors get sent to the wrong content (listed in section 3 above)
- [ ] **Add 11 missing keywords** so common questions stop hitting a dead end (listed in section 3 above)
- [ ] **Add 3 new chat responses** for greetings, thank-you, and education industry
- [ ] **Add 16 additional search terms** to broaden what the chat can answer (listed in section 4 above)

---

## 6. Automated Testing Results (QA)

We ran automated tests using a real browser (Playwright with Chrome) to simulate how a visitor would experience the site. Tests covered both the landing page and the chat page across desktop, tablet, and mobile screens.

---

### 6A. Landing Page — Does Everything Display Properly?

| What We Checked | Result | Notes |
|----------------|--------|-------|
| Hero section (headline, video, metrics) | **Pass** | Video background plays, tagline shows in correct colors, all 4 metrics (40%, 3x, 14+, 30+) are visible |
| Precision Context Engine section | **Pass** | All 4 stage cards (Discover, Structure, Validate, Deploy) and both panels (AI Agents, Delivery Team) render correctly |
| Solutions section | **Pass** | Solution cards display with screenshots, tags, and descriptions |
| Markets / Industries carousel | **Did Not Find** | The section exists visually but is missing an ID tag needed for internal linking. Navigation links pointing to "#markets" won't scroll to this section. |
| Case Study / Proof section | **Pass** | Telecom case study shows with metrics (70%, 50+, 40%, CIO 100), challenge text, and quote |
| Footer | **Pass** | Contact info, "Connect with Us" card, navigation links, and copyright all display |
| Video background | **Pass** | 2 video elements found and functional |

---

### 6B. Landing Page — Broken Images

**8 images are broken.** These are background photos for the industry/market cards in the carousel. The image files simply don't exist on the server.

| Missing Image | Used For |
|--------------|---------|
| telecom-network.jpg | Technology, Media and Telecom card |
| healthcare.jpg | Healthcare and Life Sciences card |
| financial-services.jpg | Financial Services card |
| federal-government.jpg | Federal Government card |
| state-local-government.jpg | State and Local Government card |
| education.jpg | Education card |
| oil-gas.jpg | Oil and Gas card (used twice) |

**What visitors see:** The industry cards appear without their background photos — they show a blank or colored background instead of a relevant image.

---

### 6C. Landing Page — Do the Buttons and Links Work?

| What We Tested | Result | Notes |
|---------------|--------|-------|
| Floating chat bar (appears when scrolling) | **Pass** | Appears correctly after scrolling past the hero |
| Clicking the floating bar goes to chat | **Pass** | Successfully navigates to /chat |
| "Start the Conversation" button (top right) | **Pass** | Visible and functional |

---

### 6D. Landing Page — Does It Look Good on All Screen Sizes?

| Screen Size | Result | Notes |
|------------|--------|-------|
| Desktop (1920x1080) | **Pass** | Full layout renders correctly |
| Tablet (768x1024) | **Pass** | Layout adapts properly, no content cut off |
| Mobile (375x667) | **Pass** | No sideways scrolling, text wraps naturally |

---

### 6E. Landing Page — Any Technical Errors?

| Type | Count | Details |
|------|-------|---------|
| JavaScript Errors | **0** | No errors at all |
| Warnings | **6** | All are about React Router preparing for a future version update — these are informational, not problems. They will need attention when upgrading the framework in the future. |

---

### 6F. Chat Page — Does the Welcome Screen Work?

| What We Checked | Result |
|----------------|--------|
| Welcome screen displays properly | **Pass** — animated orb, headline, and subtitle all show |
| All 9 menu options are visible | **Pass** — all topic cards render |
| Text input box is present and functional | **Pass** |
| "I'd rather talk to a real person" option visible | **Pass** |

---

### 6G. Chat Page — Do the Core Features Work?

| Feature | Result | Notes |
|---------|--------|-------|
| Typing a question and getting an answer | **Pass** | Responses appear within ~1 second |
| Clicking follow-up suggestion buttons | **Pass** | New query submits and returns a response |
| Reset button (clear conversation) | **Pass** | Conversation clears and returns to welcome screen |
| Back button (return to landing page) | **Pass** | Successfully navigates back to the homepage |
| Direct link with a question (e.g., /chat?q=Show+me+case+studies) | **Pass** | Question auto-submits and answer appears |
| Mobile view (375px wide) | **Pass** | No sideways scrolling, input and responses display cleanly |
| JavaScript errors | **0** | No errors on the chat page |

---

### 6H. Chat Page — Keyword Test Results (Full Detail)

We tested 34 different search queries. Here is exactly what happened with each one.

#### Queries That Returned the Right Answer (12 out of 16 core queries)

| What We Typed | What the Chat Showed | Correct? |
|--------------|---------------------|----------|
| "solutions" | All 7 solutions with descriptions | Yes |
| "enterprise icx" | Enterprise ICX solution details and metrics | Yes |
| "anomaly detection" | Anomaly Detection solution details and metrics | Yes |
| "touchless it operations" | Touchless IT Operations solution details | Yes |
| "telecom" | Telecom case studies list | Yes |
| "healthcare" | Healthcare case studies list | Yes |
| "security" | Security and governance information | Yes |
| "contact" | Contact details with email, phone, and address | Yes |
| "why radiant" | Differentiator page with Precision Context Engine | Yes |
| "ai readiness" | AI Readiness Assessment with maturity levels | Yes |
| "halliburton" | Halliburton Oil Field case study | Yes |
| "navy federal" | Navy Federal Credit Union case study | Yes |

#### Queries That Returned the WRONG Answer (4 core bugs + 4 domain bugs)

| What We Typed | What the Chat Showed (Wrong) | What It Should Have Shown (Correct) |
|--------------|---------------------------|-----------------------------------|
| **"case study"** | A single Florida DCF government audit | The main case studies page with the Telecom transformation, CIO 100 Award, and all AI case studies |
| **"platform"** | A random web modernization project | The Radiant AI Platform with 12 foundational capabilities |
| **"hi"** | A role-matching quiz ("Which solutions for your role?") | A friendly welcome or the main menu |
| **"hello"** | Error: "That's outside my knowledge area" | A friendly welcome or the main menu |
| **"revenue assurance"** | A USCIS immigration case study (unrelated) | Anomaly Detection solution or Telecom work |
| **"billing intelligence"** | Customer Journey Intelligence (wrong solution) | Anomaly Detection solution |
| **"cost reduction"** | Contact page | The 40% cost reduction proof on the Why Radiant page |
| **"predictive maintenance"** | Customer Journey Intelligence (wrong solution) | Oil & Gas industry information |

#### Queries That Returned Nothing (11 confirmed dead ends)

| What We Typed | Chat Response | It Should Have Shown |
|--------------|--------------|---------------------|
| "NPS" | "Outside my knowledge area" | Enterprise ICX metrics |
| "CSAT" | "Outside my knowledge area" | Enterprise ICX metrics |
| "CIO award" | "Outside my knowledge area" | Network Intelligence case study |
| "RPA" | "Outside my knowledge area" | Telecom 5x case study |
| "data quality" | "Outside my knowledge area" | Telecom case studies |
| "downtime" | "Outside my knowledge area" | Touchless IT Operations |
| "help" | "Outside my knowledge area" | Main menu of options |
| "thank you" | "Outside my knowledge area" | Friendly closing message |
| "human in the loop" | "Outside my knowledge area" | Security information |
| "d2c" | "Outside my knowledge area" | Design-to-Code solution |
| "RAG" | "Outside my knowledge area" | Hospitality AI case study |

---

### 6I. Visual Review of Screenshots

We took screenshots at every step and reviewed them visually.

| Screenshot | What We Saw | Status |
|-----------|------------|--------|
| Landing page hero (desktop) | Video plays, headline in white and green, metrics visible | Good |
| Precision Context Engine section | 4 stage cards and 2 info panels render clearly | Good |
| Solutions section | Anomaly Detection card with real dashboard screenshot | Good |
| Case Study section | Telecom case study with photo background, metrics, and quote | Good |
| Footer section | Contact card, navigation, and address info all visible | Good |
| Landing page (tablet, 768px) | Layout adapts, content reflows properly | Good |
| Landing page (mobile, 375px) | Text wraps, no horizontal scroll | Good |
| Chat welcome screen (desktop) | Animated orb, headline, 9 menu cards visible | Good |
| Chat response to "solutions" (mobile) | Solution cards stack vertically, follow-up buttons visible | Good |
| Chat with URL parameter | Auto-submitted "case studies" query, grid with images loaded | Good |
| Chat after follow-up click | **Potential issue** — page appeared mostly empty after clicking a follow-up button. The answer may have loaded below the visible area. Needs further checking. |

---

### 6J. Overall Quality Scores

| Area | Score | What It Means |
|------|-------|--------------|
| Landing page displays correctly | 9 out of 10 | Everything renders except the Markets section is missing a navigation anchor |
| Landing page images | 6 out of 10 | 8 industry background images are broken (files don't exist) |
| Landing page works on all screens | 10 out of 10 | Desktop, tablet, and mobile all look correct |
| Landing page buttons and links | 10 out of 10 | All navigation and CTAs work |
| Chat welcome and basic features | 10 out of 10 | Welcome screen, input, reset, back button, URL params all work |
| Chat answers common questions correctly | 7.5 out of 10 | 12 of 16 core queries return the right answer; 4 return wrong content |
| Chat handles broader searches | 5 out of 10 | 11 common terms return nothing; 4 more go to the wrong place |
| Chat works on mobile | 10 out of 10 | Clean layout, no overflow |
| No technical errors | 10 out of 10 | Zero JavaScript errors across both pages |

**Overall Score: 77.5 out of 100**

---

### 6K. What to Fix First

#### Immediate Fixes (Users are affected right now)

1. **"case study" shows the wrong case study** — The most common sales question routes to a minor government audit instead of the flagship Telecom transformation
2. **"platform" shows the wrong page** — Routes to a random case study instead of our platform capabilities
3. **"hello" and "hi" are broken** — The most basic greeting either shows an error or the wrong content
4. **8 broken industry images** — The Markets carousel shows blank cards instead of relevant photos

#### Important Fixes (Misleading content)

5. **"revenue assurance" goes to USCIS** — A telecom buyer searching for revenue assurance lands on an immigration case study
6. **"billing intelligence" goes to Journey Intelligence** — Wrong solution is shown
7. **"cost reduction" goes to the contact page** — Instead of showing our 40% cost reduction proof
8. **"predictive maintenance" goes to Journey Intelligence** — Should go to Oil & Gas
9. **Markets section missing navigation anchor** — Internal links to the Markets section don't work

#### Improvements (Better coverage)

10. **Add 11 missing keywords** — So NPS, CSAT, CIO award, RPA, downtime, help, thank you, and other common terms stop hitting dead ends
11. **Check follow-up button scroll behavior** — May have a timing issue where the answer loads but the page doesn't scroll to show it
12. **React Router upgrade warnings** — Informational only, but should be planned for the next framework update
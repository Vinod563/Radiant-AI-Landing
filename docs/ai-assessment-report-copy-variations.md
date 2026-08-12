# AI Adoption Assessment — Executive Edition PDF
## Complete Copy & Variation Catalogue (for content review)

**Prepared for:** Radiant Digital content team
**Report version:** v2.0 — Content QA revision
**Regenerated from build:** working tree on branch `ai-test-integration`, parent commit `14294c5`
**Date:** 2026-08-11 (supersedes 2026-08-03)

**Source of truth (the files this catalogue is generated from):**

| File | What it holds |
|---|---|
| `outputs/ai-landing-v1/src/utils/aiReportPdf.jsx` | **The delivered PDF.** Layout, section order, and all PDF-only copy |
| `outputs/ai-landing-v1/src/data/reportEditorial.js` | Shared editorial copy: Radiant's Read, next steps, 60-day plans, sector blocks, score-interpretation sentences |
| `outputs/ai-landing-v1/src/data/aiAssessment.js` | Questions, scoring, stage findings, strength/gap library |
| `outputs/ai-landing-v1/src/components/assessment/WhatAILeadersDo.jsx` | Section 08 playbooks (shared with the on-screen report) |

**Delivery path:** `AssessmentResults.jsx` → `getReportPdfBase64()` → `aiReportPdf.jsx`. That is the only path that produces a customer PDF.

**Surfaces and where copy differs:**

| Surface | Renderer | Notes |
|---|---|---|
| **Emailed PDF** (this document) | `aiReportPdf.jsx` | The customer-facing deliverable |
| On-screen results | React components + `WhatAILeadersDo.jsx` | **Web-only:** the 5 benchmark stat badges (see Part 6, item 12). Everything else is shared |
| Emailed HTML summary | `emailSafeReport.js` | Shorter summary of the same content, no PDF-only copy |
| `aiExecutiveReport.js` (jsPDF) | — | ⚠️ **Not reachable.** Legacy duplicate of this report, superseded by `aiReportPdf.jsx`. It is not reviewed here and should be deleted to prevent drift |

---

## 0. How to read this document

The PDF is **not AI-generated**. There is no LLM call anywhere in the report path. Every sentence in the report is either:

- **FIXED** — always identical, in every report ever produced, or
- **SLOT** — a template sentence with the respondent's numbers/names dropped in, or
- **VARIANT** — one of a set of pre-written blocks, selected by a rule.

The same response set for the selected role produces the same PDF. Reviewing this document = reviewing 100% of the copy a customer can ever receive.

Notation used below:

| Marker | Meaning |
|---|---|
| `{slot}` | a value injected at render time (name, score, dimension label) |
| **FIXED** | never changes |
| **VARIANT (n)** | one of n pre-written blocks; the selection rule is stated |
| ⚠️ | something the content team should decide on — collected in Part 6 |

---

# PART 1 — What the respondent gives us

## 1.1 Profile form (before the questions)

| Field | Type | Options |
|---|---|---|
| Full name | free text | — |
| Work email | free text | personal domains blocked (gmail, yahoo, hotmail, outlook, live, msn, aol, icloud, protonmail, proton, zoho, gmx, fastmail, tutanota, hey) |
| Company name | free text | — |
| **Role** | choice of 4 | Executive · Technology Leader · Business Leader · AI Practitioner |
| **Sector** | choice of 8 | Financial Services · Healthcare · Technology · Federal Government · State & Local Government · Manufacturing · Retail & Consumer · Energy & Utilities |
| Org size | choice of 5 | Under 500 · 500–2,000 · 2,000–10,000 · 10,000–50,000 · 50,000+ |
| Department | choice of 7 | Enterprise / Cross-functional · IT / Technology · Data & Analytics · Operations · Finance · HR / People · Risk & Compliance |

**Only two profile fields change report *copy*:**

1. **Role** → changes which questions are asked, the "Track" label, and one of the three recommended steps.
2. **Sector** → three regulated sector families are tailored, each with the same three blocks (a Card 3 clause, an extra consideration, and a section 08 callout):
   - `Financial Services` (`/financ/i`)
   - `Healthcare` (`/health/i`)
   - `Federal Government` and `State & Local Government` (`/government|public sector/i`)

   Technology, Manufacturing, Retail & Consumer, and Energy & Utilities add nothing — tailoring is limited to sectors where a regulatory framing is defensible.

Name / company / org size / department appear only as **labels** (cover page, "Scope" card, filename). They never change a sentence of the analysis.

## 1.2 Question count

| Role | Questions asked |
|---|---|
| Executive | **12** |
| Technology Leader | **12** |
| Business Leader | **12** |
| AI Practitioner | **16** |

Every question is a single-select with 5 options scoring 1→5. Full question text is in **Appendix A**.

Questions served, by role:

| Section | Executive | Technology Leader | Business Leader | AI Practitioner |
|---|---|---|---|---|
| Strategy & Leadership | Q1, Q2, Q3 | Q1, Q6, Q7 | Q1, Q4, Q7 | Q1, Q2, Q3, Q4 |
| Data & Technology | Q8, Q9, Q12 | Q8, Q9, Q10 | Q8, Q12, Q14 | Q8, Q9, Q10, Q11 |
| People & Governance | Q15, Q16, Q17 | Q15, Q21, Q22 | Q15, Q17, Q18 | Q15, Q16, Q17, Q18 |
| Adoption & Value | Q23, Q24, Q25 | Q23, Q26, Q27 | Q23, Q24, Q25 | Q23, Q24, Q25, Q26 |

**Retired questions.** Q5 (AI Roadmap), Q13 (MLOps Maturity), Q19 (Regulatory Compliance) and Q20 (Change Management) sat past the per-section cap for every role, so no respondent was ever asked them. They are now marked `active: false` and excluded from the served bank, so the assessment no longer appears to cover topics it never asks about. The written copy is retained in the bank (and in Appendix A) so it can be promoted into a role's set later without being rewritten.

**Served bank:** 23 active questions of 27 written.

---

# PART 2 — How answers become the report

Three numbers drive everything.

### Step 1 — Four dimension scores (1.0–5.0)
Plain average of the answers in each section.

- **Strategy & Leadership**
- **Data & Technology**
- **People & Governance**
- **Adoption & Value**

Each score gets a band label used in the scorecard:

| Score | Band label |
|---|---|
| 0 | No data |
| < 2.0 | Needs attention |
| 2.0 – 2.99 | Below target |
| 3.0 – 3.99 | On track |
| 4.0 – 5.0 | Strong |

### Step 2 — Overall stage (1–6)
Average of **all** answers, mapped to the six-stage Autonomy ladder:

| Overall average | Stage |
|---|---|
| < 1.67 | 1 — Zero Autonomy |
| 1.67 – 2.32 | 2 — Guided Autonomy |
| 2.33 – 2.99 | 3 — Insight Autonomy |
| 3.00 – 3.66 | 4 — Operational Autonomy |
| 3.67 – 4.32 | 5 — Proactive Autonomy |
| ≥ 4.33 | 6 — Full Autonomy |

### Step 3 — Two composite indices (0–100)
- **Execution Readiness** = (Data + Adoption) ÷ 2 ÷ 5 × 100
- **Strategic Maturity** = (Strategy + People) ÷ 2 ÷ 5 × 100

These place the dot on the positioning quadrant.

### Step 4 — Derived switches
Everything else in the report is chosen by these:

| Switch | Values | Rule |
|---|---|---|
| `stage` | 1–6 | from overall average |
| `band` / `groupLabel` | Early Movers (1–2) · Progressing (3–4) · AI Leaders (5–6) | from stage |
| `topDim` | 1 of 4 | highest-scoring dimension |
| `lowDim` | 1 of 4 | lowest-scoring dimension (ties → Strategy, Data, People, Adoption order) |
| `balanced` | true / false | (highest − lowest) ≤ 0.8 |
| `adoptionLive` | 3 variants | Adoption ≥ 4 / ≥ 3 / < 3 |
| `tilt` | 3 variants | Strategic Maturity vs Execution Readiness gap > 0.15 either way |
| `isFin` | true / false | sector matches `/financ/i` |
| `strengths` | 0–2 blocks | dimensions scoring ≥ 3.5, highest first |
| `gaps` | 0–2 blocks shown | dimensions scoring < 3.0, lowest first |
| `currentPhase` | Assess / Train / Adopt / Scale / Sustain | stage 1→Assess, 2→Train, 3→Adopt, 4→Adopt, 5→Scale, 6→Sustain |

---

# PART 3 — The report skeleton

Order is fixed. Every report has all 12 sections, always in this order, plus a cover and a contents page.

| Page | Section | How much varies |
|---|---|---|
| 1 | Cover + maturity ladder (Exhibit 1) + "Your Assessment Finding" | Name/company/date/stage + 1 of 6 stage blocks |
| 2 | Contents | Fixed. **No page numbers:** sections flow continuously, so entries are clickable links to the section, not numbered references |
| 3+ | **01 Executive Summary & Recommendations** | Heavily templated |
| | **02 About This Assessment** | Mostly fixed |
| | **03 Scores by Dimension** | Headline varies, bars are data |
| | **04 Maturity Positioning** | Templated intro + chart |
| | **05 What We See** (Leading area / Considerations) | Most variable section |
| | **06 Your Recommended Next Step** | 1 of 4 priorities + that dimension's 60-day plan |
| | **07 Radiant's Read** | 1 of 6 blocks |
| | **08 What AI Leaders Do** | 1 of 6 blocks (4 actions each) |
| | **09 Your Next Move** + CTA | 1 of 2 headlines, CTA fixed |
| | **10 Assessment Methodology** | **Fully fixed** |
| | **11 Conclusion** | Templated |
| | **12 Get in Touch** | **Fully fixed** (2 named leaders) |

**Pagination rules in force:** tables never split across pages, and each table travels with its own heading and column labels. Word breaking (hyphenation) is disabled, so long words wrap whole instead of splitting mid-word.

---

# PART 4 — Full copy catalogue

## COVER

**FIXED — eyebrow, headline, subline**

> AN EXECUTIVE BRIEFING ON ENTERPRISE AI MATURITY
>
> # AI Adoption Assessment Report
>
> A structured assessment of your organization's AI maturity, execution readiness, and priority actions for progressing to the next stage.

**FIXED — top-right stamp:** `CONFIDENTIAL, EXECUTIVE BRIEFING`

**SLOT — identity block**
```
Prepared for {Full Name}  ·  {Company Name}
{Sector}  ·  {Org Size} employees  ·  {Department}  ·  {Role} Track
{Month D, YYYY}
YOUR CURRENT STAGE: {N} OF 6
```
Role labels used: `Executive` · `Technology Leader` · `Business Leader` · `AI Practitioner`.

**FIXED — the six-stage ladder graphic** (bars ascend; the respondent's stage is filled green and tagged `YOU ARE HERE`)

| # | Name | Sub-label |
|---|---|---|
| 1 | Zero | AI assists, humans act |
| 2 | Guided | AI recommends, humans approve |
| 3 | Insight | AI infers unprompted |
| 4 | Operational | AI acts, humans supervise |
| 5 | Proactive | AI predicts, humans steer |
| 6 | Full | AI self-governs, humans guide |

**Caption — FIXED:** `EXHIBIT 1, THE SIX-STAGE AI AUTONOMY LADDER`

### VARIANT (6) — "Your Assessment Finding" callout

Label is fixed: `YOUR ASSESSMENT FINDING`. Title = the stage tagline, body = the stage description.

Every description was rewritten in this revision to state only what a stage-from-average calculation supports. It names the stage the responses produce and the priority that follows; it does not assert specific integrations, tooling, or operating practices the assessment never asked about.

**Stage 1 — Zero Autonomy**
> **AI assists. Humans decide and act on everything.**
> Your responses place the organization at Stage 1, Zero Autonomy. AI is used to capture, structure, and digitize work, while decisions stay with your people. The priority is to get the foundations right: clean inputs, standardized processes, and the data quality that every stage above this one depends on.

**Stage 2 — Guided Autonomy**
> **AI recommends in real time. Humans approve every action.**
> Your responses place the organization at Stage 2, Guided Autonomy. AI prompts, suggests, and alerts in real time, and people approve actions before they execute. The priority is to build the evidence and approval paths that let AI act, not only advise, in the cases where it has been shown to perform reliably.

**Stage 3 — Insight Autonomy**
> **AI generates intelligence on its own. Humans consume and act.**
> Your responses place the organization at Stage 3, Insight Autonomy. AI surfaces insights, trends, and anomalies without being asked, and teams consume that intelligence rather than producing it. The priority is to connect that insight to action, with clear ownership of the decisions it informs.

**Stage 4 — Operational Autonomy**
> **AI insight drives workflows. Humans oversee the exceptions.**
> Your responses place the organization at Stage 4, Operational Autonomy. AI-enabled insights are beginning to support selected decisions and workflows, with people retaining oversight at key checkpoints. The priority is to strengthen governance, approval paths, and exception handling before scaling further.

**Stage 5 — Proactive Autonomy**
> **AI anticipates and prescribes before humans see the need.**
> Your responses place the organization at Stage 5, Proactive Autonomy. AI is used to anticipate outcomes and prescribe action ahead of a request, while people set strategy and guardrails. The priority is to keep prediction inside well-governed workflows, with confidence thresholds, override paths, and audit trails that make acting on a forecast reviewable.

**Stage 6 — Full Autonomy**
> **AI executes, learns, and self-improves. Humans govern.**
> Your responses place the organization at Stage 6, Full Autonomy. AI executes multi-step work, learns from outcomes, and improves with limited manual intervention, while people define guardrails and approve high-risk exceptions. Stage 6 is the final stage on this ladder, so the priority is to sustain it: continuous evaluation, current governance, and measured business value.

---

## 01 — EXECUTIVE SUMMARY & RECOMMENDATIONS

### SLOT — "Bottom Line" callout (one template, always used)

> **BOTTOM LINE**
> Your organization is assessed at Stage `{stage}`, placing you `{bandPhrase}`, with an Execution Readiness score of `{exec}`/100 and a Strategic Maturity score of `{strat}`/100. `{adoptionLive}`. Your most important next step is to `{first recommended step, first letter lowercased}`, because `{lowDim}` is the dimension most likely to limit further progress `{toward Stage {stage+1} | from here}`.

The final clause reads *toward Stage `{stage+1}`* at stages 1–5 and *from here* at Stage 6, which has no next stage.

**`{bandPhrase}` — VARIANT (3)**
- `in the Early Movers group` (stage 1–2)
- `in the Progressing group` (stage 3–4)
- `in or near the AI Leaders band` (stage 5–6)

**`{adoptionLive}` — VARIANT (3)**, on the Adoption & Value score:
- Adoption ≥ 4.0 → *AI is live, executive backed, and generating tracked value*
- Adoption 3.0–3.99 → *AI is in production in selected areas and is beginning to demonstrate measurable value*
- Adoption < 3.0 → *AI is early, with the first use cases still proving their value*

### Key takeaways — always exactly 3 numbered cards

**Card 1 — VARIANT (2, with a gated headline)**

*If `balanced` (spread ≤ 0.8)* — the headline is gated on the absolute score level as well as the spread, so a narrow spread of low scores is never described as strong:

| Condition | Headline |
|---|---|
| lowest ≥ 3.5 | **Strong, balanced profile** |
| highest < 3.0 | **Closely balanced, and below target across the board** |
| otherwise | **Closely balanced profile** |

Body — generated from the actual band distribution, never a single band label for the whole set:

> Scores range from `{low}` to `{high}` out of 5. `{band breakdown}`.

`{band breakdown}` states each band and how many dimensions are in it, highest band first, naming the dimension when a band holds only one. It appends *and requires / require focused attention* when the lowest band is Below target or Needs attention. Worked examples:

- *Three dimensions are On track, while People & Governance is Below target and requires focused attention.*
- *Two dimensions are On track, while two dimensions are Below target and require focused attention.*
- *All four dimensions are On track.*

*If not balanced:*
> **1. Your results show clear strengths and priority areas** *(headline becomes* **Your results show a clear priority area** *when no dimension reaches 3.5)*
> `{topDim}` leads at `{high}`, while `{lowDim}` is at `{low}` out of 5. This difference shows where focused effort can deliver the greatest impact.

**Card 2 — SLOT (neutral top-versus-low; no inference about which dimension leads)**
> **2. `{topDim}` leads, `{lowDim}` is the priority**
> `{topDim}` is your leading dimension at `{high}`, compared with `{low}` for `{lowDim}`. This difference identifies `{lowDim}` as the clearest area for focused improvement.

*Tie case (gap < 0.05):* > Your dimension scores are effectively level at `{score}` out of 5, so no single dimension stands out as the constraint. The priority is to raise all four together.

**Card 3 — SLOT + sector insert**
> **3. Progress to Stage `{stage+1}` runs through `{lowDim}`** *(at Stage 6:* **Sustaining Stage 6 runs through `{lowDim}`**)
> Your path forward depends on strengthening `{lowDim}`[**`{sector clause}`**] — including governance, guardrails, and readiness — not on deploying more models.

`{sector clause}` — VARIANT (3, or absent):
- Financial Services → *, especially given the regulated Financial Services setting*
- Healthcare → *, especially given the regulated healthcare setting*
- Federal / State & Local Government → *, especially given the public sector setting*

### Table — "Recommended sequence" (always 3 rows)

Columns: **Step · Action · Why now**. "Why now" is the **first sentence** of each step's detail paragraph. The three rows are always drawn from the three slots below, in this order.

#### Row 1 — VARIANT (4): the weakest dimension

Each detail paragraph now opens with the score-anchored finding, so the "Why now" cell states the respondent's own number rather than a general claim about organizations.

| Weakest dimension | Action (title) | Why now (first sentence of detail) |
|---|---|---|
| Strategy & Leadership | Align leadership around a written AI strategy with a named owner | Strategy & Leadership is your lowest-scoring dimension at `{low}` out of 5. |
| Data & Technology | Run a data readiness audit before the next deployment | Data & Technology is your lowest-scoring dimension at `{low}` out of 5. |
| People & Governance | Stand up governance and role-based AI literacy | People & Governance is your lowest-scoring dimension at `{low}` out of 5. |
| Adoption & Value | Move pilots into measured production | Adoption & Value is your lowest-scoring dimension at `{low}` out of 5. |

Full detail paragraphs (used in full in section 06):

- **Strategy & Leadership** — *Strategy & Leadership is your lowest-scoring dimension at `{low}` out of 5. The result indicates a need to put a written AI strategy in place, define three specific outcomes, name an accountable owner for each, and agree the timelines investment decisions will be measured against.*
- **Data & Technology** — *Data & Technology is your lowest-scoring dimension at `{low}` out of 5. The result indicates a need to record what data exists, what is clean enough to use, and what needs work, so the next deployment starts from a documented baseline.*
- **People & Governance** — *People & Governance is your lowest-scoring dimension at `{low}` out of 5. The result indicates a need to formalize governance, broaden role-based AI literacy, clarify accountability, and establish consistent oversight.*
- **Adoption & Value** — *Adoption & Value is your lowest-scoring dimension at `{low}` out of 5. The result indicates a need to move selected pilots into production with a named process owner, change support, and an agreed measure of business value.*

#### Row 2 — VARIANT (5): advance to the next delivery phase

| Current phase (from stage) | Action | Why now (first sentence) |
|---|---|---|
| Assess (stage 1) | Launch role-based AI training and curated learning paths | With the foundations mapped, the next unlock is capability. |
| Train (stage 2) | Design your first governed pilot | Pick a few low-risk, high-volume decisions and let AI handle them start to finish under supervision. |
| Adopt (stages 3–4) | Scale proven use cases into production | Wire AI-generated insight directly into the workflows where decisions get made, and design the checkpoints that keep speed and oversight in balance as volume grows. |
| Scale (stage 5) | Institutionalize governance and learning loops | Build the guardrails and feedback loops that let AI initiate, not just recommend. |
| Sustain (stage 6) | Compound advantage with proprietary learning loops | Durable advantage now comes from proprietary models, learning loops competitors cannot replicate, and governance rigorous enough to keep an autonomous system accountable. |

Full details:

- **Assess → Train** — *With the foundations mapped, the next unlock is capability. Give each function a learning path matched to how it will actually use AI, so adoption is not gated on a handful of specialists.*
- **Train → Adopt** — *Pick a few low-risk, high-volume decisions and let AI handle them start to finish under supervision. Measured pilots are what turn training into trust and build the case for the next investment.*
- **Adopt → Scale** — *Wire AI-generated insight directly into the workflows where decisions get made, and design the checkpoints that keep speed and oversight in balance as volume grows.*
- **Scale → Sustain** — *Build the guardrails and feedback loops that let AI initiate, not just recommend. This is where advantage compounds, for organizations whose governance is mature enough to trust prediction with action.*
- **Sustain → Sustain** — *Durable advantage now comes from proprietary models, learning loops competitors cannot replicate, and governance rigorous enough to keep an autonomous system accountable.*

#### Row 3 — VARIANT (4): the respondent's role

| Role | Action | Detail |
|---|---|---|
| Executive | Name a single accountable AI owner with budget authority | AI is often everyone's priority and no one's job. Naming one C-level owner, measured on outcomes, not just interested, is the change that unblocks every stage above. |
| Technology Leader | Harden data pipelines and MLOps for production | The constraint on scaling is rarely the model: it is reproducible pipelines, monitoring, and deployment discipline. Getting MLOps right is what lets proven use cases run reliably at enterprise volume. |
| Business Leader | Pick one high-volume workflow to automate start to finish | Choose a single operational workflow you own, and measure what happens when AI handles it start to finish. One visible, measured win does more for adoption than a portfolio of stalled pilots. |
| AI Practitioner | Build curated learning paths for the teams you advise | As an AI Practitioner, your impact is enablement. Curated, role-based learning paths give client teams a repeatable way to move from awareness to applied capability. |

> **4 × 5 × 4 = 80 possible sequences**, all built from these 13 blocks. The three slots never collide, so the table always has exactly 3 rows.

---

## 02 — ABOUT THIS ASSESSMENT

**FIXED**
> This executive briefing presents the findings, scores, and recommendations from your AI Adoption Assessment responses.

**FIXED labels, SLOT values — three cards**

| Card | Value | Sub-line |
|---|---|---|
| SCOPE | `{Department}` (or *Enterprise / Cross-functional*) | `{Sector}, {Org Size} employees` |
| TRACK | `{Role} Track` | Leadership-level readout and roadmap |
| PREPARED | `{Month D, YYYY}` | Radiant Digital, AI Adoption Assessment |

---

## 03 — SCORES BY DIMENSION

**Eyebrow — FIXED:** `SCORES BY DIMENSION`

**Headline — VARIANT (2)**
- `balanced` → **A well-rounded profile**
- otherwise → **Your AI maturity profile has room for greater balance**

**Four score bars — FIXED labels, data-driven values**
```
Strategy & Leadership     {x.x} / 5   ·   {band label}
Data & Technology         {x.x} / 5   ·   {band label}
People & Governance       {x.x} / 5   ·   {band label}
Adoption & Value          {x.x} / 5   ·   {band label}
```
Band labels: *No data · Needs attention · Below target · On track · Strong*

**Caption — FIXED:** `EXHIBIT 2, DIMENSION SCORECARD` *(Exhibit 1 is the maturity ladder on the cover)*

---

## 04 — MATURITY POSITIONING

**Eyebrow — FIXED:** `MATURITY POSITIONING`
**Headline — FIXED:** **Where your assessment scores place you**

The section was renamed in this revision: the chart plots the respondent's own self-assessment scores, so "Competitive Positioning" and "relative to AI Leaders" claimed an external benchmark the assessment does not run.

**SLOT — intro (one template)**
> Based on your assessment scores, `{topDim}` leads at `{high}`, while `{lowDim}` at `{low}` is the area most likely to limit further progress. This aligns with the `{lowDim}` recommendation later in this report.

**FIXED — chart furniture:** bubbles labelled `Early Movers`, `Progressing`, `AI Leaders` (these are the model's own maturity bands, not peer data); axes `Strategic Maturity (higher)` and `Execution Readiness (higher)`; respondent dot labelled `Your organization`.

**Caption — FIXED:** `EXHIBIT 3, EXECUTION READINESS VERSUS STRATEGIC MATURITY`

---

## 05 — WHAT WE SEE

### Stat cards — FIXED labels
```
EXECUTION READINESS   {n} / 100
STRATEGIC MATURITY    {n} / 100
```

### Band callout — VARIANT (3 × 3 = 9 combinations)

Label: `{groupLabel} · {stageRange}` — e.g. `PROGRESSING · STAGE 3-4`.
Body = one band sentence + one tilt sentence.

**Band sentence — VARIANT (3)**
- **Early Movers (stage 1–2):** *You're in the Early Movers group (Stage 1-2), where most organizations begin. The priority is a written AI strategy and clean data foundations before scaling execution.*
- **Progressing (stage 3–4):** *You're in the Progressing group (Stage 3-4). Your move toward AI Leadership now depends on strengthening `{lowest dimension}` and scaling proven AI initiatives into production.*
- **AI Leaders (stage 5–6):** *You're in or near the AI Leaders group (Stage 5-6). The focus shifts to compounding the advantage: governance systems, portfolio ROI, and organizational learning loops.*

**Tilt sentence — VARIANT (3)**
- Strategy ahead of execution by > 0.15 → *Your strategy is ahead of your execution: turn planning into deployed, production use cases.*
- Execution ahead of strategy by > 0.15 → *Your execution is ahead of your strategy: add governance and a scalable framework so you build the right things.*
- Within 0.15 → *Your strategy and execution scores are closely balanced.*

### Leading area / Strengths — 0, 1 or 2 blocks

**Heading — VARIANT (3):** `Strengths` (2 blocks) · `Strength` (1 block) · **`Leading area`** (no dimension reaches 3.5). The heading can no longer say "Strengths" when nothing meets the strength threshold.

**Rule:** every dimension scoring **≥ 3.5**, highest first, maximum 2.

| Dimension ≥ 3.5 | Heading shown | Body |
|---|---|---|
| Strategy & Leadership | **Strategy & Leadership: Executive alignment is real** | Leadership has committed to AI and the direction is clear. That's the starting condition for everything else, and a lot of organizations still don't have it. |
| Data & Technology | **Data & Technology: Data infrastructure is ahead of the curve** | Quality standards and the underlying platform are in better shape than most organizations at your stage. That removes one of the most common blockers. |
| People & Governance | **People & Governance: Governance and literacy are in place** | Your responses indicate that a framework for responsible deployment is in place and that your employees have the training to use AI tools. This provides a foundation for scaling AI without compounding risk. |
| Adoption & Value | **Adoption & Value: AI is live and generating measurable value** | Production deployments are running and impact is being tracked. That's evidence of real execution capability, not just ambition. |

**Fallback — VARIANT (1), used when NO dimension reaches 3.5:**
> **`{topDim}`: your leading dimension**
> At `{high}` out of 5, `{topDim}` is your highest-scoring dimension and provides the strongest current base for the roadmap.

### Considerations to watch — 1 to 3 blocks

**Intro — VARIANT (2 paths).** The "pairs every strength with a risk" framing is only used when the report actually showed a strength:

*If at least one strength block was shown:*
> A rigorous diagnostic pairs every strength with a corresponding risk. `{count sentence}`

- If exactly 1 consideration: *One consideration is particularly relevant for organizations at Stage `{n}` and is worth tracking deliberately:*
- If 2+: *`{Two|Three|Four}` considerations are typical for organizations at Stage `{n}` and worth tracking deliberately:*

*If no strength block was shown (fallback path):*
- If exactly 1 consideration: *One priority area requires focused attention.*
- If 2+: *The assessment identifies the following `{two|three|four}` priority areas for focused attention:*

**Blocks — up to 2 from the gap library** (dimensions scoring **< 3.0**, lowest first). Two severity tiers:

#### Severe gaps (score < 2.0)

| Dimension | Heading | Body |
|---|---|---|
| Strategy & Leadership | **Strategy & Leadership: No real AI strategy or ownership** | Investment decisions are being made without a shared framework, so priorities follow whoever requests them rather than documented value and ownership. |
| Data & Technology | **Data & Technology: Data isn't ready to support AI** | Siloed, inconsistent, unreliable. You can build models on it. You won't be able to trust what comes out, and neither will the people using it. |
| People & Governance | **People & Governance: No governance and no literacy program** | Every deployment is ungoverned. Most employees have no framework for using AI tools responsibly. The exposure compounds with each new tool that goes live. |
| Adoption & Value | **Adoption & Value: AI isn't in production yet** | The investment so far is in exploration, not outcomes. Until something is live and measured, the business case for the next investment is guesswork. |

#### Moderate gaps (score 2.0 – 2.99)

| Dimension | Heading | Body |
|---|---|---|
| Strategy & Leadership | **Strategy & Leadership: AI strategy exists but isn't driving decisions** | There's a document. Priorities still shift and ownership is unclear. Without enforcement and accountability, a strategy is just a starting point. |
| Data & Technology | **Data & Technology: Data quality is inconsistent** | Every new AI project starts with cleanup work before it can begin. That's a constant tax on velocity and a hard ceiling on how fast you can move. |
| People & Governance | **People & Governance: Governance is informal and literacy is uneven** | Governance practices are in place informally rather than formally, and AI literacy varies by role. Clear accountability, documented approval paths, and role-based training are what allow use cases to spread beyond the teams that built them. |
| Adoption & Value | **Adoption & Value: Pilots aren't scaling** | Pilots are running, but there is no repeatable route into production. Without one, each new use case restarts the same work on process ownership, change support, and measurement. |

**Fallback — used when NO dimension scores below 3.0:**
> **Prediction accuracy without adequate monitoring**
> As AI moves from recommending to prescribing, the cost of an unmonitored bad prediction rises. Model drift and edge-case monitoring become governance requirements, not optional data science practices.

**Sector-specific — appended as an extra consideration (1 of 3, or none):**

*Financial Services*
> **Explainability and stakeholder trust**
> In Financial Services specifically, AI-driven decisions that affect customers or capital typically need to be explainable to regulators, auditors, and customers themselves, not just accurate.

*Healthcare*
> **Clinical accountability and patient data**
> In healthcare specifically, AI that informs clinical or patient-facing decisions typically needs documented human accountability, auditable records, and clear controls over how patient data is accessed, used, and retained.

*Federal / State & Local Government*
> **Transparency and public accountability**
> In the public sector specifically, AI-supported decisions that affect citizens or public funds typically need documented decision records, clear human accountability, and security and procurement controls that can be evidenced on request.

---

## 06 — YOUR RECOMMENDED NEXT STEP

**Eyebrow — FIXED:** `YOUR RECOMMENDED NEXT STEP`
**Headline — VARIANT (4):** `Priority: {lowest dimension}` → *Priority: Strategy & Leadership · Priority: Data & Technology · Priority: People & Governance · Priority: Adoption & Value*

**Body — the full detail paragraph from Row 1 above.** The previous fixed tail ("The result will be a foundation that makes your future projects faster and your AI outputs more trustworthy") was removed: it was written for Data and promised an outcome for every dimension.

**Table — "Illustrative 60-day breakdown" — VARIANT (4): one separately written plan per dimension.** No dimension name is injected into shared wording, and the report contains only this single 60-day timeline (the previous "30-day sprint" phrasing in the People step is gone).

*Priority: Strategy & Leadership*

| Phase | Weeks | Focus |
|---|---|---|
| Document | 1 to 2 | Document current AI objectives, funded initiatives, decision rights, and who owns each one today. |
| Assess | 3 to 6 | Assess each initiative against business outcomes, resourcing, and leadership alignment, and record where direction or ownership is unclear. |
| Approve | 7 to 8 | Approve a written AI strategy with named outcomes, an accountable owner, timelines, and scheduled review points. |

*Priority: Data & Technology*

| Phase | Weeks | Focus |
|---|---|---|
| Inventory | 1 to 2 | Inventory the data sets, platforms, and pipelines the next AI use cases will depend on, and who owns each one. |
| Assess | 3 to 6 | Assess quality, access, lineage, and security for each priority data set, and record the gaps that would block deployment. |
| Approve | 7 to 8 | Approve a remediation plan with owners, sequencing, and a go/no-go decision for the next deployment. |

*Priority: People & Governance*

| Phase | Weeks | Focus |
|---|---|---|
| Document | 1 to 2 | Document current AI policies, decision rights, owners, training provision, and controls. |
| Assess | 3 to 6 | Assess governance coverage, role-based literacy, accountability, approval paths, and oversight practices. |
| Approve | 7 to 8 | Approve a governance roadmap with owners, timelines, training priorities, and the measures used to track it. |

*Priority: Adoption & Value*

| Phase | Weeks | Focus |
|---|---|---|
| Review | 1 to 2 | Review pilots and production use cases already running, their owners, and how value is measured today. |
| Assess | 3 to 6 | Assess what is holding selected pilots short of production: process ownership, change support, integration, or measurement. |
| Approve | 7 to 8 | Approve a scaling plan for the highest-value use cases, with owners, timelines, and agreed business measures. |

---

## 07 — RADIANT'S READ — VARIANT (6)

**Eyebrow — FIXED:** `RADIANT'S READ`
**Headline — SLOT:** `Our perspective on Stage {n} organizations`

**Stage 1**
> At Zero Autonomy, AI is helping people work but isn't making any decisions, and that's the right place to start. The organizations that climb fastest from here don't rush to automate; they get the foundations right first. Clean, structured data and standardized processes are what make every later stage of autonomy possible. The biggest risk now is delegating decisions before the inputs underneath them are trustworthy.

**Stage 2**
> Guided Autonomy is a common enterprise position: AI recommends in real time, but a human still approves every action. The value is already real, faster, better-informed decisions, but the ceiling is trust. The pattern we see is leaders waiting for proof before letting AI act on its own. That proof comes from picking a few low-risk, high-volume decisions and measuring what happens when AI handles them start to finish.

**Stage 3**
> At Insight Autonomy, AI stops waiting to be asked: it surfaces trends, risks, and anomalies on its own, and your people consume that intelligence instead of building reports. That is a meaningful milestone. The challenge now is no longer generating insight; it is connecting it to action. The unlock is wiring AI-generated intelligence directly into the workflows where decisions actually get made.

**Stage 4**
> Operational Autonomy is the governance-as-advantage phase. AI-enabled insight is beginning to support cross-functional decisions and workflows, with people retaining oversight at key checkpoints. The immediate priority is to strengthen governance, oversight, and role-based readiness. Once these foundations are in place, the organization can introduce prediction more proactively in selected, well-governed workflows.

*(Stage 4 was rewritten so it no longer tells a respondent to move to prediction while every other section of the same report names governance as the immediate priority.)*

**Stage 5**
> At Proactive Autonomy, AI predicts and prescribes before your team sees the need, and people move up to strategy and governance. This is where the advantage compounds, but only for organizations whose governance is mature enough to trust prediction with action. The work here is building the guardrails and feedback loops that let AI initiate, not just recommend, with confidence.

**Stage 6**
> Full Autonomy is a self-governing system: AI executes multi-step work, learns from outcomes, and improves without manual retraining, while humans define guardrails and approve high-risk exceptions. The conversation shifts from 'how do we deploy AI' to 'how do we govern a system that runs itself.' Durable advantage at this stage comes from proprietary models, learning loops competitors can't replicate, and governance rigorous enough to keep an autonomous system accountable.

---

## 08 — WHAT AI LEADERS DO — VARIANT (6 sets of 4 actions)

**Eyebrow — FIXED:** `WHAT AI LEADERS DO`

### Stage 1 respondents see:
**What Guided Autonomy organizations do to move forward**
> Organizations that climbed out of Zero Autonomy did one thing consistently: once their data and processes were clean, they let AI start recommending in real time, with a human approving every action, instead of leaving it stuck at data capture.

1. **Deploy real-time assist where decisions actually happen** — Live agent-assist, next-best-action prompts, and in-the-moment alerts that suggest the move while there's still time to make it. AI advises; the human still approves. Faster, better-informed decisions without surrendering control.
2. **Standardize data capture so recommendations can be trusted** — Auto-transcription, structured data capture, and consistent tagging across every interaction. Recommendations are only as good as the inputs, so they locked the inputs down first.
3. **Define explicit approval gates for AI suggestions** — A clear rule for every AI prompt: who reviews it, what they're checking, and what "approved" means. That turned ad-hoc acceptance into a repeatable, auditable decision step.
4. **Train frontline teams to work alongside an AI co-pilot** — Not a vendor demo, but a working session on when to trust the prompt, when to override it, and how to give feedback that makes the next suggestion better.

### Stage 2 respondents see:
**What Insight Autonomy organizations do to break through**
> The Guided Autonomy ceiling is trust: AI recommends, but a human approves everything. Organizations break through by letting AI generate intelligence on its own, surfacing insight without being asked, and teaching people to consume it.

1. **Automate reporting so no one runs reports by hand** — Real-time CSAT and root-cause reporting, performance dashboards that update themselves, and trend detection across every interaction. People consume intelligence instead of assembling it.
2. **Turn on proactive risk and anomaly flagging** — AI watches continuously and raises churn risk, emerging issues, and outliers before a human would have noticed. The shift is from "pull a report" to "the system tells you."
3. **Build trust in machine-generated insight** — Showed the work behind each insight, the signals, the confidence, the source, so leaders learned to act on AI intelligence instead of re-deriving it themselves.
4. **Pick low-risk decisions to let AI act start to finish** — A handful of high-volume, low-risk calls where AI executes and humans audit after the fact. The measured results became the business case for delegating more.

### Stage 3 respondents see:
**What Operational Autonomy organizations do to connect insight to action**
> At Insight Autonomy, AI generates intelligence, but humans still carry it across the organization by hand. The breakthrough is wiring insight directly into cross-functional workflows, with humans supervising the exceptions, not the routine.

1. **Auto-sync AI insight into CRM, product, and finance** — Contact center and operational intelligence flowed straight into the systems where work happens, CRM records, product roadmaps, revenue models, without a human re-keying it.
2. **Design human checkpoints for exceptions only** — Defined which actions run automatically and which pause for a supervisor. People spend their attention on the edge cases that matter, not the routine that doesn't.
3. **Stand up cross-team KPI dashboards driven by AI** — Shared, real-time scorecards fed by AI so sales, service, product, and finance worked from the same numbers, and acted on them automatically.
4. **Build a governance layer to keep speed and oversight in balance** — Clear standards for what triggers a human override, who owns each automated workflow, and how exceptions get reviewed, so automation never outran accountability.

### Stage 4 respondents see:
**How Proactive Autonomy organizations anticipate needs**
> Operational Autonomy reacts well. Proactive Autonomy anticipates: AI predicts outcomes and prescribes action before humans identify the need, while people move up to strategy and governance.

1. **Let predictions trigger action automatically** — Predicted churn launches proactive outreach; a forecasted volume spike adjusts staffing; a detected upsell moment surfaces the offer, all before a human flags it. AI manages the execution triggers.
2. **Shift people from execution to strategy and governance** — With AI handling prediction and triggering, leaders can spend more time on decisions requiring human judgment: guardrails, priorities, and the calls that carry real consequence.
3. **Build governance for prediction-driven action** — Confidence thresholds, override paths, and audit trails that make it safe for AI to act on a forecast. The advantage compounds only when governance is mature enough to allow it.
4. **Close the loop so predictions get sharper over time** — Feed every predicted-versus-actual outcome back into the models so that accuracy can improve with each cycle.

### Stage 5 respondents see:
**What Full Autonomy organizations do to self-govern at scale**
> The last step is from prediction to self-governance: AI executes start to finish, learns from outcomes, and improves without manual retraining, while humans define guardrails and approve only high-risk exceptions.

1. **Let AI resolve issues start to finish across systems** — Autonomous workflows that span CRM, billing, and ticketing, resolving the whole issue, not a step of it, with humans involved only when risk crosses a defined threshold.
2. **Deploy self-improving models that adapt on their own** — QA and decision models that learn from new patterns and retrain themselves, so performance improves continuously without a manual rebuild cycle.
3. **Narrow human approval to high-risk exceptions only** — Guardrails define what the system may do unattended and what must stop for sign-off. Humans govern the boundaries instead of operating inside them.
4. **Make governance the core human job** — Autonomous scheduling, real-time workforce rebalancing, and self-running operations mean leadership's highest-impact work becomes setting strategy and keeping an autonomous system accountable.

### Stage 6 respondents see:
**You're at Full Autonomy: the self-governing tier**
> At Full Autonomy the playbook shifts from building capability to governing it. The organizations that sustain the lead treat AI as a self-improving operating system and put their human effort into guardrails, trust, and strategy.

1. **Build proprietary AI assets competitors can't replicate** — Models fine-tuned on your data, knowledge graphs from your institutional memory, and learning loops that compound over time. Generic models are table stakes; proprietary, self-improving AI is the moat.
2. **Make governance a visible competitive differentiator** — External audits, transparent guardrails, and clear accountability for autonomous decisions. In trust-driven markets, healthcare, financial services, government, that governance is itself a reason to buy.
3. **Orchestrate agents across the whole enterprise** — Coordinate fleets of autonomous agents across functions and systems, with a control plane that monitors, constrains, and improves them as one estate rather than many point solutions.
4. **Keep humans firmly on the guardrails** — Continuous evaluation, drift detection, and high-risk exception review so a system that runs itself stays aligned, safe, and accountable as it learns.

### Sector-specific — extra callout at the end of section 08 (1 of 3, or none)

*Financial Services*
> **WHY THIS MATTERS IN FINANCIAL SERVICES**
> Autonomous, end-to-end resolution is more consequential in a regulated industry: every workflow AI is allowed to run unattended is also one your compliance and audit functions need to be able to explain after the fact.

*Healthcare*
> **WHY THIS MATTERS IN HEALTHCARE**
> Any workflow AI is allowed to run with limited supervision is also one your clinical governance, privacy, and audit functions need to be able to review and explain afterwards.

*Federal / State & Local Government*
> **WHY THIS MATTERS IN THE PUBLIC SECTOR**
> Workflows AI is allowed to run with limited supervision also need to be explainable to oversight bodies, auditors, and the people affected by the decision, not only accurate.

⚠️ **Open item — the only unresolved QA point.** Each stage set also has a benchmark stat written for it (*"67% of organizations that standardize data capture reach Guided Autonomy within 12 months"*, *"3× faster issue detection"*, *"40% reduction in decision-to-action time"*, *"2.4× higher returns"*, *"Top 8%"*). These are **web-only** — excluded from the PDF, and no source has been supplied. They need either an approved citation or removal from the on-screen report. See Part 6, item 12.

---

## 09 — YOUR NEXT MOVE

**Eyebrow — FIXED:** `YOUR NEXT MOVE`

**Headline — VARIANT (2)**
- stage 1–5 → **Ready to move to Stage `{stage+1}`?**
- stage 6 → **Sustaining Full Autonomy**

**Body — VARIANT (2)**
- stage 1–5 → *A 30-minute conversation with Radiant Digital can help you identify the right starting point for your next stage of AI maturity.*
- stage 6 → *A 30-minute conversation with Radiant Digital can help you identify where to focus next in sustaining your current stage of AI maturity.* (Stage 6 has no next stage, so the CTA no longer offers one.)

The unsourced "14+ industries" claim was removed here and from the on-screen and emailed HTML reports, so all three surfaces now carry this copy.

**CTA panel — FIXED**
```
SCHEDULE 30 MINUTES WITH RADIANT DIGITAL
hello@radiant.digital
radiant.digital
[ SCHEDULE A CALL ]
```

---

## 10 — ASSESSMENT METHODOLOGY — 100% FIXED

> This report is based on a self-assessment. Your responses to the question set for your role are averaged by dimension, and each dimension is scored on a 5-point scale.
>
> Those dimension scores produce the rest of the report. Execution Readiness combines Data & Technology with Adoption & Value. Strategic Maturity combines Strategy & Leadership with People & Governance. Your overall stage on the six-stage maturity ladder is the average of all your responses. Because each role track answers a different question set, scores are best compared within the same track over time rather than across tracks.
>
> Results are directional. They reflect what your responses report, and they are not an audit, an external benchmark, or a comparison against verified data from other organizations.

**Table — Scoring dimensions**

| Dimension | What it measures |
|---|---|
| Strategy & Leadership | Executive alignment, stated direction, and resourcing behind the AI agenda |
| Data & Technology | Data readiness, tooling, and infrastructure available to support deployment |
| People & Governance | Skills, change management, and the guardrails that govern AI decisions |
| Adoption & Value | Breadth of live deployments and evidence of tracked, measurable impact |

**Table — 1 to 5 scale**

| Score | Interpretation |
|---|---|
| 1 to 2 | Nascent, informal, or absent |
| 3 | Developing, present but inconsistent |
| 4 | Strong, consistent, and reasonably mature |
| 5 | Leading, aligned with best practices, and enterprise-wide |

---

## 11 — CONCLUSION

**Callout — SLOT**
> **IN ONE LINE**
> You are a Stage `{n}` organization `{bandPhrase}`. `{Reaching the next stage | Sustaining this stage}` depends on strengthening `{lowDim}`, not simply deploying more models.

**Paragraph 1 — SLOT**
> Your organization is at Stage `{n}` of 6, placing you `{bandPhrase}`. Your Execution Readiness score is `{exec}`/100, and your Strategic Maturity score is `{strat}`/100. Your dimension scores range from `{low}` to `{high}` out of 5. `{adoptionLive}`.

**Paragraph 2 — SLOT (rewritten: states the gap and its band, draws no capability-versus-foundations inference)**
> `{topDim}` is your leading dimension at `{high}`, while `{lowDim}` is `{band label}` at `{low}`. This makes `{lowDim}` the clearest constraint on further progress and the priority for focused improvement.

*Tie case (gap < 0.05):* > Your dimension scores are effectively level at `{score}` out of 5. No single dimension stands out as the constraint, so progress depends on raising all four together rather than on one focused correction.

**Paragraph 3 — SLOT**
> The recommended sequence follows directly: 1) `{step 1 title, lowercased}`, 2) `{step 2 title, lowercased}`, 3) `{step 3 title, lowercased}`. Radiant Digital's Assess, Train, Adopt, Scale, and Sustain model can support sustained progress `{toward the next stage | at this stage}`.

**Paragraph 4 — VARIANT (5 + 1): stage-gated, dimension-aware**

*Stages 1–5:*
> These actions provide a practical path toward Stage `{n+1}`. Progress should be validated through `{validation clause}`.

`{validation clause}`, by lowest-scoring dimension:

| Lowest dimension | Clause |
|---|---|
| Strategy & Leadership | an approved written strategy, named owners for each outcome, funded priorities, and measurable business outcomes |
| Data & Technology | documented data quality standards, governed access to the data AI depends on, and measurable business outcomes |
| People & Governance | stronger governance, broader role-based literacy, accountable ownership, and measurable business outcomes |
| Adoption & Value | use cases running in production, defined process ownership, and measurable business outcomes |

*Stage 6:*
> Stage 6 is the final stage on this ladder, so the work now is to sustain it: keep governance and evaluation current, keep measuring the business value AI delivers, and continue to raise your lowest-scoring dimension, `{lowDim}` at `{low}` out of 5.

The previous fixed closing ("Your organization is close") has been removed: it was sent to every respondent, including Stage 1.

---

## 12 — GET IN TOUCH — 100% FIXED

> Speak directly with the Radiant Digital experts behind your assessment. They can help you identify where to start and what the next stage could look like for your organization.

| | |
|---|---|
| **Prafull Khare** | Executive Director \| Global Head of AI Strategy, Solution Engineering, & New Technology Enablement · Radiant Digital · prafull.khare@radiant.digital · LinkedIn |
| **Srinivas Chamarthi** | SVP & Business Head · Radiant Digital · srinivas.chamarthi@radiant.digital · LinkedIn |

> Reach either of us directly, or email hello@radiant.digital to schedule a 30-minute conversation.

## PAGE FURNITURE — 100% FIXED
- Leaf-green accent bar across the top of every page
- Navy footer on every page except the cover: `© {year} Radiant Digital · hello@radiant.digital` · `Page {n}` · `www.radiant.digital`
- Filename: `AI-Adoption-Assessment-Executive-{Company or Name}.pdf`

---

# PART 5 — Worked example (end to end)

Using the built-in sample: **Jordan Avery, Meridian Financial, Financial Services, 10,000–50,000, Enterprise / Cross-functional, Executive track.**

**Answers (12 questions):** Q1:4 Q2:4 Q3:3 · Q8:3 Q9:3 Q12:2 · Q15:2 Q16:2 Q17:2 · Q23:4 Q24:4 Q25:3

**Computed:**

| | |
|---|---|
| Strategy & Leadership | 3.7 (On track) |
| Data & Technology | 2.7 (Below target) |
| People & Governance | 2.0 (Below target) |
| Adoption & Value | 3.7 (On track) |
| Overall | 3.0 → **Stage 4, Operational Autonomy** |
| Execution Readiness | **63** / 100 |
| Strategic Maturity | **57** / 100 |
| Band | Progressing (Stage 3-4) |
| Top / low dimension | Strategy & Leadership / People & Governance |
| balanced? | No (spread 1.7) |
| Financial Services? | Yes |

**What the PDF says** (verbatim from a render of the current build, 11 pages):

*Cover finding* → Stage 4 block: "AI insight drives workflows. Humans oversee the exceptions." + the Stage 4 description. Ladder captioned `EXHIBIT 1`.

*Bottom Line* →
> Your organization is assessed at Stage 4, placing you in the Progressing group, with an Execution Readiness score of 63/100 and a Strategic Maturity score of 57/100. AI is in production in selected areas and is beginning to demonstrate measurable value. Your most important next step is to stand up governance and role-based AI literacy, because People & Governance is the dimension most likely to limit further progress toward Stage 5.

*Key takeaways* →
1. **Your results show clear strengths and priority areas** — Strategy & Leadership leads at 3.7, while People & Governance is at 2.0 out of 5. This difference shows where focused effort can deliver the greatest impact.
2. **Strategy & Leadership leads, People & Governance is the priority** — Strategy & Leadership is your leading dimension at 3.7, compared with 2.0 for People & Governance. This difference identifies People & Governance as the clearest area for focused improvement.
3. **Progress to Stage 5 runs through People & Governance** — …*especially given the regulated Financial Services setting*…

*Recommended sequence* →
| 1 | Stand up governance and role-based AI literacy | People & Governance is your lowest-scoring dimension at 2.0 out of 5. |
| 2 | Scale proven use cases into production | Wire AI-generated insight directly into the workflows where decisions get made… |
| 3 | Name a single accountable AI owner with budget authority | AI is often everyone's priority and no one's job. |

*Scores headline* → "Your AI maturity profile has room for greater balance" (spread 1.7, so not balanced)

*Band callout* → Progressing text (naming People & Governance) + "Your strategy and execution scores are closely balanced."

*Section 05 heading* → "Strengths" (2 dimensions at 3.7 clear the 3.5 threshold): Strategy & Leadership, Adoption & Value
*Considerations* → 3 blocks: People & Governance (moderate), Data & Technology (moderate), + the Financial Services explainability block. Intro takes the strengths path: *"A rigorous diagnostic pairs every strength with a corresponding risk. Three considerations are typical for organizations at Stage 4 and worth tracking deliberately:"*

*Section 06* → "Priority: People & Governance" + the People & Governance 60-day plan (Document / Assess / Approve)
*Section 07* → Stage 4 Radiant's Read (governance-first)
*Section 08* → "How Proactive Autonomy organizations anticipate needs" + Financial Services callout
*Section 09* → "Ready to move to Stage 5?" · CTA button `SCHEDULE A CALL`
*Conclusion* → "You are a Stage 4 organization in the Progressing group…", closing with *"These actions provide a practical path toward Stage 5. Progress should be validated through stronger governance, broader role-based literacy, accountable ownership, and measurable business outcomes."*

### Second worked example — balanced profile, Healthcare, Technology Leader track

Scores Strategy 3.0 · Data 3.3 · People 2.7 · Adoption 3.0 → spread 0.6, so `balanced` is true, and the report takes the gated path:

*Key takeaway 1* →
> **Closely balanced profile**
> Scores range from 2.7 to 3.3 out of 5. Three dimensions are On track, while People & Governance is Below target and requires focused attention.

*Section 05 heading* → **Leading area** (no dimension reaches 3.5), with the fallback block: *"At 3.3 out of 5, Data & Technology is your highest-scoring dimension and provides the strongest current base for the roadmap."*
*Considerations intro* → fallback path: *"The assessment identifies the following two priority areas for focused attention:"*
*Sector blocks* → the Healthcare consideration and callout.

---

# PART 6 — Decisions log

## A. Closed in this revision (Content QA, 2026-08-11)

Every item raised in *AI Adoption Assessment — Content QA* is listed here with what was changed.

### Page-by-page

| # | Issue raised | Resolution |
|---|---|---|
| P1 | Stage 4 finding asserted CRM/product/finance integration and exception-only working | All six stage findings rewritten to state only what a stage-from-average calculation supports |
| P1 | "priority actions for the next stage progression" | Cover subline now reads "priority actions for progressing to the next stage" |
| P2 | Contents claimed automatic page numbers | Catalogue corrected: the Contents carries clickable section links and no page numbers, which is what the PDF renders |
| P3 | Key Takeaway 1 called all four dimensions "Below target" | Card 1 now generates the real band distribution and score range; headline gated on absolute level as well as spread |
| P3 | Key Takeaway 2 asserted capability ahead of foundations | Card 2 rewritten as a neutral top-versus-low read, valid for any dimension pair, with a tie case |
| P3 | "AI is in production in places"; unsupported People & Governance claim | Adoption sentence rewritten; the People & Governance step now leads with the score and names governance, literacy, accountability, and oversight |
| P3–4 | Third row of Recommended Sequence orphaned from its header | Tables never split, and each table now travels with its heading and column labels |
| P4 | "A well rounded profile"; exhibits started at 2 | Hyphenated; the cover ladder is now `EXHIBIT 1`, scorecard 2, positioning chart 3 |
| P5 | "Competitive Positioning" implied external benchmarking | Section renamed **Maturity Positioning / Where your assessment scores place you**; intro opens "Based on your assessment scores"; chart dot reads "Your organization" |
| P6 | "Strengths" heading with no dimension at strength level | Heading now Strengths / Strength / **Leading area** by count; fallback block rewritten; considerations intro has a no-strengths path |
| P6 | People & Governance "technical teams are ahead" claim | Removed from both the recommended step and the moderate-gap block |
| P6–7 | 30-day sprint conflicting with a generic 60-day table | One 60-day plan, separately written for each of the four dimensions |
| P7 | Radiant's Read pointed to prediction while the report prioritized governance | Stage 4 read rewritten to governance first, prediction once foundations are in place |
| P7 | Awkward or absolute section 08 wording | Heading, action 2 body, and action 3 title rewritten as requested |
| P8 | Undocumented "14+ industries"; CTA copy differed from catalogue | Claim removed from PDF, on-screen report, and email; catalogue CTA copy is now used everywhere |
| P8 | Methodology did not explain self-assessment or scoring | Methodology now states the averaging, both composites, the overall stage, cross-track comparability, and that results are directional, not an audit or external benchmark |
| P8 | "LET'S EMBARK" CTA | Now `SCHEDULE A CALL` |
| P9 | Conclusion called the low dimension a constraint, then "not a weakness today" | Paragraph 2 rewritten: states the leading dimension, the low dimension with its band, and the constraint, with no contradiction |
| P9 | Arrow punctuation and "durable, compounding advantage" | Model rendered as "Assess, Train, Adopt, Scale, and Sustain"; outcome claim softened |
| P9 | Fixed closing "Your organization is close" | Replaced with a stage-gated, dimension-aware closing (Stage 6 sustains rather than advances) |
| P10 | Word splitting such as "En-ablement" | Hyphenation disabled; words wrap whole. **Contact titles and LinkedIn URLs still need production validation — see item 3 below** |

### System-wide

| # | Issue raised | Resolution |
|---|---|---|
| S1 | "the same 12 answers" wording | Now "the same response set for the selected role produces the same PDF" |
| S2 | Stage 6 implied a nonexistent Stage 7 | Stage 6 branches added to the Bottom Line, Card 3, Next Move body, In One Line, and both closing paragraphs |
| S3 | Balanced reports used one band label for the whole range | Band distribution and score range are stated; headline gated on absolute level |
| S4 | Top-versus-low always read as capability vs foundation | Neutral wording in both the Executive Summary and the Conclusion |
| S5 | One generic 60-day table | Four separately written plans |
| S6 | Considerations intro assumed a strength existed | Fallback intro added |
| S7 | Catalogue and PDF had diverged | This document regenerated from the current build, with version, commit, date, surface map, and PDF-only / web-only copy identified |
| S8 | Q5, Q13, Q19, Q20 written but never served | Marked `active: false` and excluded from the served bank; copy retained for future promotion |
| S9 | Role tracks answer different questions | Comparability note added to the methodology section |
| S10 | Unsourced "every"/"most"/benchmark claims | Absolute claims rewritten in neutral language across report copy and question context lines. **The five web-only stat badges remain open — see item 1 below** |
| S11 | Only Financial Services had sector copy | Healthcare and Government variants written; all three sectors now carry the same three blocks |
| S12 | Rendering of word breaks, dashes, arrows, quotes | Hyphenation off; ASCII-safe substitution retained; arrows removed from body copy and chart axes; tables keep their headers |

## B. Still open

1. **Five benchmark stats shown on screen have no source** — `67%`, `3×`, `40%`, `2.4×`, `Top 8%`. They are already excluded from the PDF. They need an approved citation, or removal from the on-screen report. This is a content decision and has deliberately not been made in code.
2. **Org size, department, and email are collected but never change a sentence.** Either use them or reconsider asking.
3. **Contact block needs production validation:** both leaders' titles and the two LinkedIn URLs (`linkedin.com/in/prafull-khare`, `linkedin.com/in/srinivaschamarthi`).
4. **Written but unused in the PDF:** the "Suggested next steps" intro line, the recommended-services lists per band (12 service names), and the per-step phase and service tags. All are computed and dropped. Decide whether the PDF should surface a "Recommended Radiant services" block.
5. **Some questions are effectively single-role:** Q6 and Q27 (Technology Leader), Q11 (AI Practitioner), Q14 (Business Leader), Q21/Q22 (Technology Leader). Worth confirming this is intended.
6. **Section numbering is inconsistent in the body.** The Contents lists 01–12, but only 01, 02, 10, 11 and 12 print their number in the body heading; 03–09 use an eyebrow instead. Cosmetic, but visible.
7. **`aiExecutiveReport.js` is an unreachable duplicate** of this report. It should be deleted so a future edit cannot revive an unreviewed variant.

## C. Rendering constraints to write within

The PDF font covers WinAnsi only, so these are substituted at render time: `—`/`–` → `-`, curly quotes → straight quotes, `→` → `->`, `…` → `...`. Body copy is now written ASCII-safe, so no substitution is visible in the delivered report. Hyphenation is disabled, so a very long unbroken word will push to the next line rather than split.

---

# APPENDIX A — Question bank as respondents see it

Each question has a title, a one-line context note (shown above the question), and 5 options scoring 1–5 in the order listed.

**Legend:** `E` Executive · `T` Technology Leader · `B` Business Leader · `P` AI Practitioner · `RETIRED` written but not in the served bank (`active: false`)

## Section 1 — Strategy & Leadership

### Q1 · AI Strategy · `E T B P`
*Context:* A written strategy is different from a stated priority, and the gap between the two is often the first one to surface.
**Has your organization produced a written AI strategy, approved by leadership and actively in use to guide investment decisions?**
1. No. There is no formal AI strategy.
2. There's a shared vision, but nothing is written down or approved.
3. A draft is in progress. It hasn't been approved or acted on yet.
4. Yes. Leadership has approved it and it's guiding our priorities.
5. Yes, board-endorsed, publicly communicated, and reviewed at least annually.

### Q2 · Executive Accountability · `E P`
*Context:* The constraint we see most often: AI is everyone's priority and no one's job.
**Is there a named C-level executive who is accountable for AI transformation, not just interested in it but measured on it?**
1. No. Accountability is unclear or distributed.
2. IT leadership handles it informally alongside other responsibilities.
3. Our CDO or CTO has a partial AI mandate.
4. A dedicated CAIO or AI VP has a clear charter and budget ownership.
5. CEO-led, with a CAIO and a cross-functional AI Steering Committee that has authority to act.

### Q3 · AI Investment · `E P`
*Context:* Budget tells you what an organization actually believes, not what it says.
**Does your organization have a dedicated AI budget, separate from general IT spend, with accountability for how it's used?**
1. No dedicated AI budget.
2. AI is funded opportunistically from IT project budgets.
3. An informal AI fund exists, but there's no formal tracking.
4. A formal AI budget line exists with a clear owner and reporting.
5. Multi-year AI investment portfolio with defined ROI targets and board-level visibility.

### Q4 · Business Alignment · `B P`
*Context:* AI that isn't tied to a specific business outcome is a technology project. Tie it to a number, and an owner, and it becomes a strategy.
**Are your AI initiatives tied to specific business outcomes, not just technology milestones?**
1. No. AI is still primarily a technology initiative.
2. There's a loose connection to business goals, but nothing formal.
3. Some use cases have business targets attached.
4. Most AI investments have measurable KPIs defined at the start.
5. AI KPIs are embedded in executive scorecards and reported to the board.

### Q5 · AI Roadmap · `RETIRED`
*Context:* A roadmap that's never been funded isn't a roadmap. It's a wishlist.
**Does your organization have a phased AI transformation roadmap, with milestones, owners, and realistic resource plans?**
1. No roadmap. Decisions are made case by case.
2. There's an informal list of ideas without owners or timelines.
3. A high-level roadmap exists but lacks budget or accountable owners.
4. A detailed 18-24 month roadmap with owners and funding is in place.
5. A rolling 3-5 year roadmap, reviewed quarterly, tied to business planning cycles.

### Q6 · GenAI Strategy · `T`
*Context:* Most organizations are reacting to GenAI rather than designing their approach to it. The ones ahead aren't doing more, they're doing it on purpose.
**Does your organization have a deliberate Generative AI strategy, distinct from your general AI strategy?**
1. GenAI hasn't been addressed in strategy.
2. We're exploring reactively, following what vendors and competitors are doing.
3. An informal GenAI working group or task force is in place.
4. A GenAI strategy exists with a use-case roadmap and governance framework.
5. Enterprise GenAI strategy with a deployment plan, governed access, and ROI framework.

### Q7 · AI Use Case Prioritization · `T B`
*Context:* Most organizations have more AI ideas than capacity to execute them. Without a defined selection process, resources go to whoever asks loudest, not the highest-value problem.
**Does your organization have a defined process for identifying, prioritizing, and selecting which AI use cases to pursue, based on business value and feasibility?**
1. No process. Use cases are chosen informally based on whoever requests them.
2. Informal criteria exist but nothing is documented or applied consistently.
3. A framework exists but is used inconsistently across teams and initiatives.
4. A formal prioritization process guides most AI portfolio decisions.
5. A governed AI portfolio process with value tracking, risk scoring, and regular leadership review.

## Section 2 — Data & Technology

### Q8 · Data Readiness · `E T B P`
*Context:* The bottleneck is rarely compute. It's almost always data.
**How ready is your data to support AI, in terms of quality, accessibility, and trust?**
1. Not ready. Data is siloed, inconsistent, and unreliable.
2. Below average. Significant cleansing and preparation are needed for every project.
3. Acceptable, but requires substantial effort each time we start something new.
4. Good. Validated datasets with documented quality standards are in place.
5. AI-ready by default. Continuously validated, governed, and accessible to the teams who need it.

### Q9 · Data Governance · `E T P`
*Context:* You can build a model on messy data. What you can't do is trust the output. Governance is how you know what you're actually working with.
**Does your organization have formal data governance: clear ownership, quality standards, and a catalog teams can actually use?**
1. No governance. Data ownership and standards are undefined.
2. IT informally owns data. There are no enforced standards.
3. A governance program has started but is only partially implemented.
4. A formal program is in place with stewards, a catalog, and monitored quality metrics.
5. Enterprise governance with lineage tracking, automated quality, and federated ownership across domains.

### Q10 · Cloud & AI Infrastructure · `T P`
*Context:* Cloud maturity determines what you can build, how fast, and at what cost.
**Does your cloud infrastructure support AI workloads, including scalable compute, GPU access, and managed AI services?**
1. On-premise only. No cloud AI capability exists.
2. We've moved to cloud but haven't optimized for AI workloads.
3. Cloud-first for new projects, but AI-specific optimization is limited.
4. Hybrid cloud with AI workload optimization and managed AI services in place.
5. Multi-cloud, AI-optimized, with reserved GPU/TPU capacity and AI cost governance.

### Q11 · AI Platform · `P`
*Context:* Platform fragmentation kills velocity. Every team reinventing the stack is waste.
**Does your organization have a standardized, governed AI development platform used consistently across teams?**
1. No standard. Every team uses different tools.
2. Individual teams have preferences, but there's no organizational standard.
3. An informal toolset has been agreed on, but adoption is inconsistent.
4. A managed AI platform with approved tooling and governance is in use.
5. Enterprise AI platform with experiment tracking, a model registry, MLOps pipelines, and access controls.

### Q12 · GenAI Access & Governance · `E B`
*Context:* Shadow GenAI is already happening in most organizations. The question is whether it's governed.
**Does your organization have governed access to Generative AI tools for enterprise use, not just personal or informal access?**
1. No GenAI tools available and no policy in place.
2. Employees are using public GenAI tools with no oversight or policy.
3. Some teams have access, but guidance is informal and inconsistent.
4. Managed enterprise GenAI access with an acceptable use policy and oversight.
5. Governed enterprise GenAI platform with approved tools, prompt governance, audit logging, and ongoing training.

### Q13 · MLOps Maturity · `RETIRED`
*Context:* Manual deployment is the bottleneck between a working model and a working product.
**Are your AI model deployment, monitoring, and retraining processes automated and governed, or still largely manual?**
1. Fully manual. Deployment and monitoring are done by hand.
2. Some scripts exist, but the process is still largely manual.
3. CI pipelines are in place; deployment and monitoring are still manual.
4. Full CI/CD for AI with automated testing, deployment, and performance alerting.
5. Autonomous MLOps: automated drift detection, retraining triggers, and performance governance.

### Q14 · Business Access to Data and Insights · `B`
*Context:* Self-service data access is the gap between AI that helps a few analysts and AI that changes how the whole organization decides. Most organizations underestimate how far they are from the latter.
**Do business teams have access to the data and AI-generated insights they need to make decisions, without depending on IT or data teams for every request?**
1. No. Business teams rely entirely on IT or data teams for any data or AI output.
2. Some teams have basic reporting but AI-generated insights require IT involvement.
3. Self-service reporting exists but AI-driven insights are still centralized and slow to access.
4. Most business teams can access data and AI insights independently for common decisions.
5. Fully self-service data and AI insights with governed access, embedded in everyday workflows.

## Section 3 — People & Governance

### Q15 · AI Literacy · `E T B P`
*Context:* This is a common stall point at Stage 2: the builders are building, and the rest of the organization has no framework for using what they build.
**Do employees across your organization have access to AI literacy training appropriate to their role, not just technical training for technical staff?**
1. No AI training exists. Awareness is entirely self-directed.
2. Training exists for technical staff. That's where it stops.
3. Optional AI learning is available for people who seek it out.
4. Mandatory foundational AI literacy training is required for all staff.
5. Role-differentiated AI curriculum is embedded in onboarding and career development across the organization.

### Q16 · AI Governance Policy · `E P`
*Context:* Governance is easier to put in place before the next deployment than to retrofit afterwards.
**Does your organization have a formal AI governance policy, covering model lifecycle, responsible use, and deployment standards?**
1. No AI governance policy of any kind.
2. General IT policy loosely covers AI as a footnote.
3. A draft AI governance policy is in development.
4. An approved AI governance policy has been communicated to leaders.
5. A full governance framework is in place with enforcement mechanisms and board-level oversight.

### Q17 · Responsible AI · `E B P`
*Context:* Governance gaps, rather than model quality, sit behind many of the AI failures that become public. This question maps your exposure.
**Has your organization formally adopted a Responsible AI framework, covering fairness, transparency, explainability, and accountability?**
1. No framework. No formal position.
2. General ethics principles that loosely mention AI.
3. Draft Responsible AI principles exist but haven't been operationalized.
4. A published framework with operational guidance and training is in place.
5. Embedded in all AI project approvals, with external review and public reporting.

### Q18 · AI Talent · `B P`
*Context:* The scarce profile isn't the engineer who can build. It's the engineer who can build and navigate a messy institution.
**Does your organization have the AI talent needed to execute your strategy, across data science, engineering, and AI product management?**
1. No dedicated AI talent. General IT staff are covering it.
2. One or two individuals, severely understaffed relative to ambition.
3. A small team is in place, with significant gaps for anything beyond pilots.
4. A well-staffed core team exists with a clear hiring and development roadmap.
5. Full AI talent strategy: hiring, development, university partnerships, and competitive market positioning.

### Q19 · Regulatory Compliance · `RETIRED`
*Context:* The regulatory environment shifted materially in 2025-26. Most organizations are behind on mapping their exposure.
**Is your organization actively tracking and managing AI regulatory compliance, including the EU AI Act, NIST AI RMF, and sector-specific rules?**
1. No tracking. No awareness of applicable AI regulations.
2. Legal has general awareness. There is no action plan.
3. The regulatory landscape has been mapped, but obligations are unclear.
4. Compliance obligations have been identified and assigned to owners.
5. Real-time regulatory monitoring with gap analysis, legal review, and board-level reporting.

### Q20 · Change Management · `RETIRED`
*Context:* The people problem is almost always bigger than the technology problem. And it shows up last.
**Is there a structured change management program helping employees adopt AI tools and adapt to AI-driven changes in how work gets done?**
1. No change management. Adoption is self-driven.
2. Ad hoc communications happen when major AI tools launch.
3. Change management is used reactively for large AI projects.
4. A structured OCM program with champions, communications, and adoption tracking is in place.
5. Enterprise AI change management capability with dedicated resources and measurable outcomes.

### Q21 · Technical AI Governance · `T`
*Context:* Governance at the technical level is what keeps AI systems from becoming liabilities. Without it, teams ship fast and create problems that are expensive to fix later.
**Do your technical teams follow documented standards for AI model development, including bias evaluation, explainability requirements, and approval gates before production deployment?**
1. No standards exist. Each team builds however they choose.
2. Some informal guidelines exist but they are not documented or enforced.
3. We have documentation but it is not consistently followed across teams.
4. Documented standards are in place and most teams follow them.
5. Standards are enforced, audited, and include automated checks in the deployment pipeline.

### Q22 · AI Technical Skills · `T`
*Context:* A small number of people who know what they are doing does not scale. Skill gaps at the practitioner level are the most common reason AI stays in pilots.
**Does your technical team have sufficient depth in AI and ML engineering, MLOps, and data science to build and maintain production AI systems without heavy external dependency?**
1. No. We lack the internal skills to build or maintain AI systems.
2. We have a few capable individuals but not a reliable team.
3. We have a core team but meaningful gaps exist in specific areas.
4. We have a capable team covering most of what we need.
5. Deep skills across ML engineering, MLOps, and data science with a clear plan for remaining gaps.

## Section 4 — Adoption & Value

### Q23 · Production Use Cases · `E T B P`
*Context:* Pilots are evidence of interest. Production use cases are evidence of capability.
**How many AI use cases does your organization have actively running in production today?**
1. None. No AI in production.
2. 1-2 pilots being explored or in very limited testing.
3. 3-10 use cases in active production.
4. 11-50 production use cases across multiple functions.
5. 50+ use cases with portfolio governance, scaling playbooks, and active ROI tracking.

### Q24 · ROI Measurement · `E B P`
*Context:* If you can't measure it, you can't fund the next one.
**Does your organization systematically measure and report the business impact of AI investments, not just the technical metrics?**
1. No measurement. Impact is assumed but never tracked.
2. Rough informal estimates. No methodology.
3. Post-project ROI estimation happens for some initiatives.
4. Pre and post measurement with defined KPIs is standard for all major investments.
5. Real-time ROI dashboards per initiative, linked to financial reporting and executive reviews.

### Q25 · Employee Adoption · `E B P`
*Context:* Deployed isn't adopted. The gap between them is where most ROI gets lost.
**How broadly are AI tools and AI-assisted processes being actively used by employees in their day-to-day work?**
1. Not used. Tools exist but real adoption is near zero.
2. Used by isolated technical teams only.
3. Adopted in select departments or functions.
4. Broadly adopted across most business functions.
5. Organization-wide. AI is the standard way of working, embedded in all key processes.

### Q26 · Scaling AI · `T P`
*Context:* A first AI use case can be scaled by brute force, but the second one then starts from scratch. A repeatable process is what separates momentum from permanent pilot mode.
**Does your organization have a proven, repeatable process for scaling successful AI pilots to enterprise production?**
1. Pilots never scale. They stay as pilots indefinitely.
2. Some pilots scale, but it happens ad hoc without a defined process.
3. A scaling process exists on paper but isn't consistently applied.
4. A systematic scale-up playbook is used for all qualifying pilots.
5. Factory model. AI scales consistently, fast, and with measurable outcomes every time.

### Q27 · Business Value · `T`
*Context:* Stage is a proxy. Value is what actually matters.
**Has AI contributed measurable, attributable improvements to revenue, cost efficiency, or customer experience in your organization?**
1. No measurable business impact from AI to date.
2. Marginal or anecdotal improvements. Nothing quantified.
3. Moderate improvements have been documented in select areas.
4. Significant attributable business value has been delivered across multiple functions.
5. AI is a primary driver of competitive advantage, revenue growth, and business model innovation.

---

# APPENDIX B — Variation count at a glance

| Element | Distinct authored blocks |
|---|---|
| Stage finding (tagline + description) | 6 |
| Radiant's Read | 6 |
| What AI Leaders Do — heading + context | 6 + 6 |
| What AI Leaders Do — actions | 24 (4 per stage) |
| Strength blocks | 4 (+ 1 fallback) |
| Gap blocks | 8 (4 severe + 4 moderate) + 1 fallback |
| Recommended step — weakest dimension | 4 |
| Recommended step — phase progression | 5 |
| Recommended step — role | 4 |
| 60-day plans | 4 plans × 3 rows |
| Positioning band sentences | 3 |
| Positioning tilt sentences | 3 |
| Adoption status sentences | 3 |
| Band phrase | 3 |
| Scores headline (balanced / not) | 2 |
| Card 1 balanced headline (level-gated) | 3 |
| Card 1 band-breakdown sentence | generated from the band distribution |
| Card 2 / Conclusion top-vs-low reads | 2 each (standard + tie case) |
| Section 05 heading (Strengths / Strength / Leading area) | 3 |
| Considerations intro | 4 (2 with strengths, 2 without) |
| Sector extras (FS · Healthcare · Government) | 3 × 3 = 9 |
| Conclusion closing | 4 validation clauses + 1 Stage 6 variant |
| Stage 6 branches (Bottom Line, Card 3, Next Move, In One Line, closings) | 5 |
| Benchmark stats (**web only**, excluded from the PDF, unsourced) | 5 |
| **Total authored blocks that vary** | **~135** |
| Sections that never vary | 02 (body), 10, 12, page furniture, CTA panel |

Sentence-level combinations run into the thousands, but every one is assembled from the blocks above. There is nothing in a delivered PDF that is not in this document.

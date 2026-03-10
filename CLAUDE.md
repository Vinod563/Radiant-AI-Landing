# Radiant Automation System v2.0 - Claude Code Instructions

## Project Overview
This is the Radiant Digital automated website generation workspace. It uses a 12-layer automation system to create React-based pages with security checks and visual verification.

## Workspace Root
`/Users/vinodkumarmourya/Downloads/files/`

## Directory Structure
```
content/current-website/                     - 18 Radiant Digital website pages (MD)
content/reference-websites/
  devblock/                                  - 12 DevBlock pages (DESIGN: UI, layout, styling, animations)
  onixnet/                                   - 12 Onixnet pages (CONTENT: metrics, storytelling, Minto, BCG)
content/master-context/                      - Master context (radiant-digital-context.md)
screenshots/{desktop,tablet,mobile,archive}/ - Visual verification
logs/                                        - PROJECT_LOG.md, security/audit reports
templates/{pages,components,sections}/       - Reusable templates
outputs/                                     - Generated React apps
scripts/                                     - Helper scripts
docs/                                        - Documentation
```

## Content Sources
- **Main Website:** https://stage.radiant.digital/ (18 pages)
- **Design Reference:** https://devblock.net/ (12 pages) — UI, layout, styling, animations
- **Content Reference:** https://www.onixnet.com/ (12 pages) — metrics-driven content, storytelling, Minto framework
- **Strategy Reference:** BCG Agentic AI Insights — market positioning, value pools, enterprise demand data
- **Master Context:** content/master-context/radiant-digital-context.md

---

## Custom Commands

When the user types any of these commands, execute the corresponding workflow:

### `/fetch main`
Fetch all 18 pages from Radiant Digital's website and save as markdown:
1. Use WebFetch to fetch each of these URLs:
   - https://stage.radiant.digital/
   - https://stage.radiant.digital/what-we-do/
   - https://stage.radiant.digital/markets/
   - https://stage.radiant.digital/contact-us/
   - https://stage.radiant.digital/insights/
   - https://stage.radiant.digital/events/
   - https://stage.radiant.digital/careers/
   - https://stage.radiant.digital/digital-strategy-and-experience/
   - https://stage.radiant.digital/analytics-data-science-and-ai/
   - https://stage.radiant.digital/cloud-transformation/
   - https://stage.radiant.digital/product-development-and-integration/
   - https://stage.radiant.digital/skilled-workforce-solutions/
   - https://stage.radiant.digital/who-we-are/
   - https://stage.radiant.digital/cx-accelerator/
   - https://stage.radiant.digital/product-accelerator/
   - https://stage.radiant.digital/sales-accelerator/
   - https://stage.radiant.digital/tracklynk/
   - https://stage.radiant.digital/privly/
2. For each page, extract key content (headings, text, CTAs, features, metrics)
3. Save each as a structured markdown file in `content/current-website/`
4. Update `content/master-context/radiant-digital-context.md` with any changes
5. Report summary of what was fetched and any changes detected

### `/fetch ref design`
Fetch all key pages from the DevBlock DESIGN reference website and save as markdown:
1. Use WebFetch to fetch each of these URLs:
   - https://devblock.net/
   - https://devblock.net/about
   - https://devblock.net/services/capabilities-overview
   - https://devblock.net/services/product-design
   - https://devblock.net/services/ai
   - https://devblock.net/services/devops
   - https://devblock.net/services/spatial-design
   - https://devblock.net/work
   - https://devblock.net/products/cad-lite
   - https://devblock.net/blog
   - https://devblock.net/careers
   - https://devblock.net/contact
2. Extract design patterns, colors, typography, layout structures
3. Save each as a structured markdown file in `content/reference-websites/devblock/`
4. Report design insights extracted

### `/fetch ref content`
Fetch all key pages from the Onixnet CONTENT reference website and save as markdown:
1. Use WebFetch to fetch each of these URLs:
   - https://www.onixnet.com/
   - https://www.onixnet.com/about
   - https://www.onixnet.com/solutions
   - https://www.onixnet.com/solutions/ai-ml-artificial-intelligence-machine-learning/
   - https://www.onixnet.com/data-analytics
   - https://www.onixnet.com/google-cloud
   - https://www.onixnet.com/google-workspace
   - https://www.onixnet.com/managed-services
   - https://www.onixnet.com/customer-stories
   - https://www.onixnet.com/partners
   - https://www.onixnet.com/blog
   - https://www.onixnet.com/contact
2. Extract content writing patterns, metrics presentation, headline formulas, storytelling structure
3. Save each as a structured markdown file in `content/reference-websites/onixnet/`
4. Report content strategy insights extracted

### `/fetch ref`
Execute `/fetch ref design` and `/fetch ref content` sequentially.

### `/refresh`
Execute `/fetch main`, `/fetch ref design`, and `/fetch ref content` sequentially, then regenerate master context.

### `/update [page-type] [section-name]`
Add a new section to or update an existing section in an already-generated page. Follows the same 12-layer process as `/create`:

**Layer 1 - Context Analysis:** Read `content/master-context/radiant-digital-context.md`
**Layer 2 - Business Requirements:** Extract goals, audience, messaging relevant to the section
**Layer 3 - Reference Analysis:**
  - Read `content/reference-websites/devblock/*.md` for DESIGN patterns (UI, layout, styling, animations)
  - Read `content/reference-websites/onixnet/*.md` for CONTENT patterns (metrics-driven copy, Minto structure, storytelling)
  - Read `content/reference-websites/onixnet/bcg-agentic-ai-insights.md` for strategic positioning and market data
**Layer 4 - Skill Activation:** Apply frontend design principles, Minto Pyramid content strategy, metrics-driven writing, React best practices
**Layer 5 - Planning:** Determine where the section fits in the component hierarchy, plan content using SCQA framework and design using DevBlock patterns
**Layer 6 - React Generation:** Generate or update the React component:
  - If adding: Create new component file in `src/components/[PageName]/`
  - If updating: Edit the existing component file
  - Register the component in the page file (`src/pages/[PageName].jsx`)
  - Ensure consistent styling with existing sections (Tailwind, Framer Motion, Lucide icons)
**Layer 7 - Security Checks:** Scan modified/new files for XSS, validate inputs, check imports
**Layer 8 - Server Launch:** `npm run dev` (rebuild and verify)
**Layer 9 - Screenshot Capture:** Use Playwright for desktop (1920x1080), tablet (768x1024), mobile (375x667)
**Layer 10 - Visual Analysis:** Verify the new/updated section integrates correctly with the rest of the page
**Layer 11 - Auto Revision:** Fix issues if found (max 3 iterations)
**Layer 12 - Delivery:** Update docs, update PROJECT_LOG.md

Usage examples:
- `/update home testimonials` — Add or update the Testimonials section on the homepage
- `/update home hero` — Redesign the Hero section on the homepage
- `/update about leadership` — Add a Leadership Team section to the about page

If the user describes the change conversationally (e.g., "add a partners section to the homepage" or "update the hero on the about page"), treat it as an `/update` command and follow this same workflow.

### `/create [page-type]`
Generate a complete React application following ALL 12 LAYERS defined in ENHANCED_AUTOMATION_SYSTEM_v2.md:

**Layer 1 - Context Analysis:** Read `content/master-context/radiant-digital-context.md`
**Layer 2 - Business Requirements:** Extract goals, audience, messaging from context
**Layer 3 - Reference Analysis:**
  - Read `content/reference-websites/devblock/*.md` for DESIGN patterns (UI, layout, styling, animations)
  - Read `content/reference-websites/onixnet/*.md` for CONTENT patterns (metrics-driven copy, Minto structure, storytelling)
  - Read `content/reference-websites/onixnet/bcg-agentic-ai-insights.md` for strategic positioning and market data
**Layer 4 - Skill Activation:** Apply frontend design principles, Minto Pyramid content strategy, metrics-driven writing, React best practices
**Layer 5 - Planning:** Create component hierarchy, content plan using SCQA framework, design system using DevBlock patterns
**Layer 6 - React Generation:** Generate functional React components with:
  - Vite + React setup
  - Tailwind CSS styling
  - Framer Motion animations
  - Lucide React icons
  - Component-based architecture (functional components, hooks, props)
  - Output to: `outputs/[page-name]/`
**Layer 7 - Security Checks:** Scan for XSS, validate inputs, check dependencies
**Layer 8 - Server Launch:** `npm install && npm run dev`
**Layer 9 - Screenshot Capture:** Use Playwright for desktop (1920x1080), tablet (768x1024), mobile (375x667)
**Layer 10 - Visual Analysis:** Verify layout, design quality, content display, accessibility
**Layer 11 - Auto Revision:** Fix issues if found (max 3 iterations)
**Layer 12 - Delivery:** Copy to outputs/, generate docs, update PROJECT_LOG.md

Page types: home, about, services, contact, or any custom name.

### `/clear screenshots`
Remove all .png/.jpg files from screenshots/desktop/, screenshots/tablet/, screenshots/mobile/. Keep folder structure. Report space freed.

### `/clear old`
Remove screenshots older than 7 days. Archive them first to screenshots/archive/.

### `/archive screenshots`
Zip all screenshots, save to screenshots/archive/, then clear originals.

### `/status`
Show current project status including:
- Content fetch status (dates, page counts)
- Pages created (list outputs/)
- Screenshot count and storage
- Last security audit date
- Suggested next actions

### `/logs`
Show last 10 entries from logs/PROJECT_LOG.md.

### `/audit`
Run comprehensive quality audit: brand consistency, design coherence, security, performance, accessibility, code quality, SEO. Generate audit-report in logs/.

### `/help`
Show all available commands with descriptions.

---

## React Component Standards

Every generated page MUST use:
- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Architecture:** Functional components with hooks
- **Structure:**
```
outputs/[page-name]/
├── src/
│   ├── components/[PageName]/ (section components)
│   ├── components/ui/ (reusable: Button, Card, Input)
│   ├── pages/[PageName].jsx
│   ├── styles/globals.css
│   ├── utils/{cn.js, animations.js}
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Security Requirements
- Sanitize user inputs (DOMPurify)
- Validate forms (Zod schemas)
- No console.logs in production
- Clean unused imports
- Protected routes where needed
- Environment variables for secrets

## Brand Voice
- Professional yet approachable
- AI-first and innovation-forward
- Outcome-focused with quantified results
- Partnership-oriented ("guide," "embark," "together")
- Agentic AI leadership — beyond pilots to enterprise-scale deployment
- Outcome-linked engagement — commercial models aligned to client success
- Governance built-in — audit trails, compliance, human-in-the-loop by default
- Key phrases: "Let's embark", "Customer centric to the core", "AI-first digital transformation partner", "We don't bill hours — we deliver outcomes", "Beyond pilots — scaling agentic AI", "The proof is in the numbers"

## Content Writing Framework
All content follows the **Minto Pyramid Principle** (see `content/reference-websites/onixnet/minto-framework-guide.md`):
- **Answer first:** Headlines state the conclusion, body provides reasoning, metrics provide proof
- **SCQA pattern:** Situation → Complication → Question → Answer for every section
- **Group in threes:** 3 value propositions, 3 service pillars, 3 proof points per claim
- **Metrics-driven:** Lead every section with a number or outcome (Onixnet model)
- **Content formula:** `[Business Problem] → [Solution Approach] → [Quantified Outcome] → [Trust Signal]`

## Reference System
- **DevBlock** (`content/reference-websites/devblock/`) → How it should LOOK (UI, layout, animations, styling)
- **Onixnet** (`content/reference-websites/onixnet/`) → How it should READ (metrics-first, outcome-driven copy, storytelling)
- **Minto Framework** (`content/reference-websites/onixnet/minto-framework-guide.md`) → How it should be STRUCTURED (answer first, SCQA, groups of 3)
- **BCG Insights** (`content/reference-websites/onixnet/bcg-agentic-ai-insights.md`) → What it should SAY (agentic AI positioning, market proof points)

## Logging
Every action must append to `logs/PROJECT_LOG.md` with timestamp, action, files affected, and result status.

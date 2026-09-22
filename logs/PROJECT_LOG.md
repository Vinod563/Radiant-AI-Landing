# Project Log - Radiant Automation v2.0

---

### 2026-08-12 - Added hello@radiant.digital to Report Email Recipients
**Action:** Added the shared inbox to the team copy list for all assessment-report and contact-form mail.

**Files:**
- `outputs/radiant-chat-api/.env` — `MAIL_CC` now: lam.huynh@, alek.nedelkovski@, vinod.mourya@, hello@radiant.digital (backup written as `.env.bak.<timestamp>`)
- `outputs/radiant-chat-api/utils/mailer.js` — same address added to the hardcoded `TEAM_CC` fallback
- `outputs/radiant-chat-api/.env.example` — documented `MAIL_CC` with the full list

**Effect:** hello@ is BCC'd on the lead-facing report email and CC'd on internal lead notifications + contact-form submissions.
**Status:** ✅ SUCCESS (restart the `radiant-chat-api` server to load the new .env)

---

### 2026-06-24 - Assessment Megamenu, Lead-Gate Redesign, 6-Stage Model, Email CC, Nav & Hero Updates
**Action:** Multiple UX, content, and backend changes across the `ai-landing-v1` app and `radiant-chat-api`.

**Assessment megamenu (Navbar) — later removed:**
- Split into LEFT (title/desc/links) + RIGHT (stacked tiles); rebalanced widths; polished tiles (time pill, hover lift, kicker badge).
- Cleaned copy: badge "Free Assessments" → "Assessments", removed "Ask us" link and per-tile "Start assessment".
- Hub "Start" buttons now deep-link with `?start=1` to skip the intro/description step (AiAssessment.jsx, CxAssessment.jsx, AssessmentHub.jsx).

**Results page:**
- Stage description now full-width (StageReveal.jsx — removed `max-w-2xl`).
- Competitive Positioning chart reworked to a wide rectangle, larger fonts, fixed overlapping axis labels (GartnerPositioningView.jsx).

**Lead-capture gate (LockedReport.jsx):**
- Replaced blur+button+modal with a full-bleed PDF-preview background + inline lead form (no box); form bare via new `bare` prop on AssessmentLeadForm.jsx.
- Preview shows the 3 gated sections; switched preview to dark mode; overlay tuned (clear top/bottom reveal bands, ~70%→90% opacity per iterations).

**6-Stage Enterprise AI Autonomy model (replaces 5-stage Assess→Train→Adopt→Govern→Scale):**
- New stages: Zero / Guided / Insight / Operational / Proactive / Full Autonomy (with human roles), per leadership doc AI_Autonomy_Maturity_Model_Sirini.docx.
- Updated scoring bands + stage copy (aiAssessment.js), staircase (MaturityStaircase.jsx, StageReveal.jsx), Radiant's Read (reportEditorial.js), playbooks (WhatAILeadersDo.jsx), PDF/HTML/email reports (generateReportPdf.js, emailSafeReport.js, HTMLReportViewer.jsx), chat KB (knowledgeBase.js), and all "5 stages / of 5" labels (Navbar, AssessmentHub, AiAssessment, ReportPreviewTeaser, assessmentContent, GartnerPositioningView).

**Navbar:**
- Header CTA "Connect with Us" → "Assess AI Readiness" → `/assessment/ai`.
- Removed the Assessments megamenu/dropdown (desktop + mobile) and its dead state/imports.
- "Contact" nav item now links to `/chat?q=Connect with our team` (opens the connect form).

**Hero (Hero.jsx):**
- Added 2 chips above the chat input with hover tooltips: "Find Your AI Readiness Gaps" → `/assessment/ai`, "Find Your CX Maturity" → `/assessment/cx`.

**Homepage (Index.jsx):**
- Moved the Free Assessment section (AssessmentEntry) directly below the hero; added "Assessment" to SectionNav order.

**Backend (radiant-chat-api):**
- All mail from `connect@radiant.digital` now copies the team — BCC on the lead-facing report, CC on internal notifications/contact (utils/mailer.js, `TEAM_CC` / `MAIL_CC`): lam.huynh@, alek.nedelkovski@, vinod.mourya@radiant.digital.
- Diagnosed SMTP `535 5.7.139` as M365 auth (not code); updated `SMTP_PASS` to a new app password — verified `AUTH OK`.

**Status:** ✅ SUCCESS (all `ai-landing-v1` builds pass; SMTP auth verified)

---

### 2026-03-10 - Reference Websites Reorganized + Onixnet Pages Fetched
**Action:** Reorganized reference-websites into devblock/ and onixnet/ subfolders; fetched 12 Onixnet pages; updated all root MD files

**Folder Structure:**
- `content/reference-websites/devblock/` — 12 DevBlock files (DESIGN reference)
- `content/reference-websites/onixnet/` — 14 Onixnet files (CONTENT reference: 12 pages + minto + bcg)

**New Onixnet Files (10):** onixnet-about.md, onixnet-solutions.md, onixnet-ai-ml.md, onixnet-data-analytics.md, onixnet-google-cloud.md, onixnet-google-workspace.md, onixnet-managed-services.md, onixnet-customer-stories.md, onixnet-partners.md, onixnet-blog.md

**Root Files Updated:** CLAUDE.md, ENHANCED_AUTOMATION_SYSTEM_v2.md, radiant-digital-context.md
**Commands Updated:** `/fetch ref` split into `/fetch ref design` + `/fetch ref content`

---

### 2026-03-10 - Content References Expanded (Onixnet + BCG + Minto Framework)
**Action:** Added content strategy references alongside existing DevBlock design references
**Command:** Manual update

**New Reference Files Created (4):**
- `content/reference-websites/onixnet-homepage.md` — Metrics-driven content patterns, headline formulas, CTA strategy from Onixnet
- `content/reference-websites/onixnet-content-strategy.md` — Storytelling framework, case study structure, metrics display patterns
- `content/reference-websites/minto-framework-guide.md` — Minto Pyramid Principle applied to web content (SCQA, answer-first, grouping in threes)
- `content/reference-websites/bcg-agentic-ai-insights.md` — BCG's 3 net-new value pools, 4 expectation gaps, 5 winning imperatives mapped to Radiant services

**Master Context Updated:**
- `content/master-context/radiant-digital-context.md` — Added sections 20-23:
  - §20 Content Writing Framework (Minto Pyramid)
  - §21 Metrics-Driven Content Strategy (Onixnet Model)
  - §22 Agentic AI Strategic Positioning (BCG-Aligned)
  - §23 Reference Website Index (design refs + content refs)
- Updated brand voice with new messaging themes and phrases
- Added BCG market metrics for content use

**Reference Strategy:**
- DevBlock = Design, UI, layout, styling, animation reference
- Onixnet = Content writing, metrics presentation, storytelling reference
- Minto Framework = Content structure methodology (SCQA, answer-first)
- BCG Research = Strategic positioning, market data, agentic AI themes

---

### 2026-03-06 - Reference Website Updated to DevBlock
**Action:** Reference website changed from Nerova (https://nerova.webflow.io/) to DevBlock (https://devblock.net/)
**Command:** Manual update
**Details:**
- Fetched 12 pages from devblock.net (homepage, about, services/capabilities, services/product-design, services/ai, services/devops, services/spatial-design, work, products/cad-lite, blog, careers, contact)
- All nerova-*.md files deleted from content/reference-websites/
- 12 new devblock-*.md files created in content/reference-websites/
- CLAUDE.md updated: `/fetch ref` URLs, reference analysis glob patterns, page counts
- ENHANCED_AUTOMATION_SYSTEM_v2.md updated: Layer 3 references, `/fetch ref` URLs/file list, status section, example output
- README.md updated: folder structure, reference website info, command descriptions, page counts
- QUICK_START.md updated: reference website info, file listings, command descriptions
- .claude/settings.json updated: WebFetch domain permission changed to devblock.net

**Files Deleted (12):**
- content/reference-websites/nerova-homepage.md
- content/reference-websites/nerova-about.md
- content/reference-websites/nerova-services.md
- content/reference-websites/nerova-projects.md
- content/reference-websites/nerova-case-studies.md
- content/reference-websites/nerova-blog.md
- content/reference-websites/nerova-contact.md
- content/reference-websites/nerova-project-brightnest.md
- content/reference-websites/nerova-project-stellarworks.md
- content/reference-websites/nerova-case-study-hyperion.md
- content/reference-websites/nerova-case-study-boldmoves.md
- content/reference-websites/nerova-style-guide.md

**Files Created (12):**
- content/reference-websites/devblock-homepage.md
- content/reference-websites/devblock-about.md
- content/reference-websites/devblock-services.md
- content/reference-websites/devblock-work.md
- content/reference-websites/devblock-contact.md
- content/reference-websites/devblock-blog.md
- content/reference-websites/devblock-careers.md
- content/reference-websites/devblock-service-product-design.md
- content/reference-websites/devblock-service-ai.md
- content/reference-websites/devblock-service-devops.md
- content/reference-websites/devblock-service-spatial-design.md
- content/reference-websites/devblock-product-cad-lite.md

**Design Insights Extracted:**
- Tagline: "Human-Driven, AI-Enhanced, Digital Solutions"
- Services: Product Design, AI, DevOps, Spatial Design
- AI Pricing: $10K / $25K / $50K transparent tiers
- Design: Clean modern corporate, animated backgrounds, light/dark mode CSS variables
- Layout: Hero-driven, card-based project showcases, hover-state interactions
- Page flow: Hero → Service Overview → Case Studies → Client Logos → Testimonials → CTA → Footer
- Clients: Elixr, BeautyTap, MINTX, LinkIt!
- Offices: Seattle WA, Ho Chi Minh City Vietnam

**Result:** ✅ SUCCESS — Reference website fully migrated from Nerova to DevBlock

---

### 2026-03-03 - Reference Website Updated to Nerova
**Action:** `/fetch ref` — Reference website swapped from Nerova to Nerova (https://nerova.webflow.io/)
**Command:** `/fetch ref`
**Details:**
- Fetched 15 pages from nerova.webflow.io (homepage, about, services, projects, case studies, blog, contact, 4 project details, 2 case study details, style guide)
- All nerova-*.md files created in content/reference-websites/
- CLAUDE.md `/fetch ref` URLs updated to actual Nerova site structure
- ENHANCED_AUTOMATION_SYSTEM_v2.md, QUICK_START.md, README.md file listings updated
- Design insights captured: dark/premium aesthetic, Figtree + Playfair Display fonts, purple-pink gradients

**Files Created (15):**
- content/reference-websites/nerova-homepage.md
- content/reference-websites/nerova-about.md
- content/reference-websites/nerova-services.md
- content/reference-websites/nerova-projects.md
- content/reference-websites/nerova-case-studies.md
- content/reference-websites/nerova-blog.md
- content/reference-websites/nerova-contact.md
- content/reference-websites/nerova-project-brightnest.md
- content/reference-websites/nerova-project-stellarworks.md
- content/reference-websites/nerova-case-study-hyperion.md
- content/reference-websites/nerova-case-study-boldmoves.md
- content/reference-websites/nerova-style-guide.md

**Design Insights Extracted:**
- Tagline: "Intelligence. Creativity. Momentum."
- Services: Creative Branding, SEO & Growth, Paid Media, Social Media
- Pricing: $99 / $999 / $2,500/month transparent tiers
- Design: Black bg, purple-pink gradients, Figtree + Playfair Display
- Animations: GSAP SplitType text reveals, scroll-triggered fade-ins
- Page flow: Hero → Social Proof → Services → Portfolio → Case Studies → Stats → Testimonials → Team → Blog → CTA

**Result:** ✅ SUCCESS — Reference content updated, ready to apply Nerova design patterns

---

### 2026-02-20 - System Initialized
**Action:** Full workspace setup and dependency installation
**Details:**
- Directory structure created (screenshots, logs, templates, outputs, scripts, docs)
- CLAUDE.md created with automation command definitions
- Master context placed at content/master-context/radiant-digital-context.md
- Base templates created (package.json, vite.config, tailwind.config, components)
- System dependencies verified (Node.js v22.21.0, npm v10.9.4)
- Playwright Chromium installed for screenshot capture

**Content Status:**
- Main website (Radiant Digital): 18 pages in content/current-website/
- Reference website (Nerova): 15 pages in content/reference-websites/
- Master context: content/master-context/radiant-digital-context.md

**Result:** System ready for page generation

---

### 2026-02-20 - Homepage Created (Full 12-Layer Automation)
**Action:** /create home
**Command:** Create homepage with full automation pipeline
**Details:**
- Layer 1: Master context analyzed (radiant-digital-context.md)
- Layer 2: Business requirements extracted — AI-first positioning, 6 enablers, 3 accelerators, enterprise/gov audience
- Layer 3: Nerova reference site patterns applied — editorial layout, numbered capabilities, testimonial cards
- Layer 4: frontend-design skill activated (distinctive aesthetics, Playfair Display + Plus Jakarta Sans)
- Layer 5: Component hierarchy planned — 9 sections, navy + gold design system
- Layer 6: React components generated (9 section components, 2 UI components)
- Layer 7: Security scan PASSED — 0 XSS, 0 secrets, 0 console.logs, 0 unused imports, 0 npm vulnerabilities
- Layer 8: Dev server launched on localhost:5173 (200 OK)
- Layer 9: Screenshots captured (desktop 1920x1080, tablet 768x1024, mobile 375x667)
- Layer 10: Visual analysis — all sections rendering, responsive layout verified
- Layer 11: Revision iteration 1 — fixed Playwright screenshot scroll to trigger whileInView animations
- Layer 12: Final delivery complete

**Result:** SUCCESS — Homepage v1 delivered

---

### 2026-02-20 - Homepage Rebuilt (Brand-Correct 12-Layer Automation)
**Action:** /create home (rebuild)
**Command:** Recreate homepage with correct Radiant Digital brand design system
**Issue Fixed:** Previous build used wrong fonts (Playfair Display / Plus Jakarta Sans) and wrong colors (navy/gold palette) instead of the mandated Radiant brand system.
**Details:**
- Layer 1-2: Master context re-analyzed — extracted brand voice, key phrases, service areas, metrics
- Layer 3: Nerova reference patterns re-applied — numbered service cards (01-06), alternating sections, hero-to-CTA flow, testimonial cards
- Layer 4: Brand Design System correctly applied:
  - Typography: Poppins (headings/body) + Inter (CTA/meta) + Raleway (fallback)
  - Primary: Brand Green #91C46B, Dark Teal #044862, Navy #09465D
  - Accents: Lime #C7DD75, Blue #6173DE, Orange #F0974E
  - Backgrounds: Alternating white / #F4F9FC (cyan) / #09465D (teal navy)
  - UI: Pill buttons (30px radius), Cards (16px radius, shadow-card), Sticky header
- Layer 5: Component hierarchy — 10 sections (added ClientLogos), 2 UI components
- Layer 6: All 18 source files rewritten with correct brand tokens via Tailwind config
- Layer 7: Security scan PASSED — 0 vulnerabilities, 0 console.logs, 0 XSS, 0 secrets, 0 unused imports
- Layer 8: npm install (0 vulnerabilities, 144 packages), vite build SUCCESS (9.07s), dev server on localhost:5175
- Layer 9: Screenshots captured with scroll-triggered animation script (3 devices)
- Layer 10: Visual analysis PASSED:
  - Desktop: 3-col service grid, stats row, 2-col framework, 3-col accelerators, testimonials, CTA, footer
  - Tablet: 2-col responsive grid, vertical stacking for framework section
  - Mobile: Single-column layout, properly sized text, full-width CTAs
- Layer 11: Revision 1 — updated capture script to scroll page before screenshot (fixes whileInView opacity)
- Layer 12: Final delivery

**Files Modified (18 files):**
- outputs/homepage/index.html (Google Fonts: Poppins, Inter, Raleway)
- outputs/homepage/tailwind.config.js (full brand color tokens, typography, shadows, radii)
- outputs/homepage/src/styles/globals.css (font-primary, brand selection color)
- outputs/homepage/src/utils/animations.js (fadeInUp, fadeInLeft, fadeInRight, stagger, scaleIn)
- outputs/homepage/src/components/ui/Button.jsx (brand-green, pill radius, Inter font)
- outputs/homepage/src/components/ui/Card.jsx (rounded-card, shadow-card, border-light)
- outputs/homepage/src/pages/HomePage.jsx (added ClientLogos section)
- outputs/homepage/src/components/HomePage/Navbar.jsx (sticky header, scroll-aware bg, brand colors)
- outputs/homepage/src/components/HomePage/Hero.jsx (teal-navy bg, brand-lime accents, trust indicators)
- outputs/homepage/src/components/HomePage/Services.jsx (numbered 01-06, tag pills, teal-dark icons)
- outputs/homepage/src/components/HomePage/Stats.jsx (50%, 40%, 30%, 20+ metrics)
- outputs/homepage/src/components/HomePage/TransformationFramework.jsx (teal bg, lime headings, numbered pillars)
- outputs/homepage/src/components/HomePage/Accelerators.jsx (brand icon colors, metrics per card)
- outputs/homepage/src/components/HomePage/Testimonials.jsx (surface-cyan bg, brand-green quotes)
- outputs/homepage/src/components/HomePage/CTA.jsx (teal-deep bg, brand-lime accent, dual CTAs)
- outputs/homepage/src/components/HomePage/Footer.jsx (teal-navy bg, lime links, contact info)
- outputs/homepage/capture-screenshots.mjs (updated port, increased animation wait)

**New File Created:**
- outputs/homepage/src/components/HomePage/ClientLogos.jsx (8 client names with hover state)

**Screenshots:**
- screenshots/desktop/homepage_desktop_20260220.png (1920x1080 full page)
- screenshots/tablet/homepage_tablet_20260220.png (768x1024 full page)
- screenshots/mobile/homepage_mobile_20260220.png (375x667 full page)

**Security Report:**
- npm audit: 0 vulnerabilities (144 packages)
- dangerouslySetInnerHTML: None
- Console statements: None
- XSS vectors: None
- Hardcoded secrets: None
- Unused imports: None

**Build Output:**
- dist/index.html: 1.05 KB
- dist/assets/index.css: 19.06 KB (gzip: 4.44 KB)
- dist/assets/index.js: 291.58 KB (gzip: 92.55 KB)

**Result:** SUCCESS — Brand-correct production-ready homepage delivered to outputs/homepage/

---

### 2026-02-20 - Case Studies Section Updated (12-Layer Automation)
**Action:** /update home case-studies
**Command:** Update the Case Studies section on the homepage

**Details:**
- Layer 1: Master context analyzed — extracted 12+ case studies from Section 11 (Commercial, Government, Health, Sports)
- Layer 2: Business requirements — showcase AI-first transformation across industries, quantified results, category filtering
- Layer 3: Nerova reference patterns applied — featured project spotlight (nerova-projects.md), problem-solution narrative (hyperion/boldmoves case studies), metrics-first presentation, card-based portfolio layout
- Layer 4-5: Planning — featured hero card + paginated grid, expanded from 6 to 12 case studies, added Government and Health & Nonprofit categories, dual-metric display per card
- Layer 6: CaseStudies.jsx completely rewritten with:
  - **Featured Case Study Hero Card:** Dark teal gradient, two-column layout with content + metrics panel, "AI-First Approach" badge, decorative dot pattern
  - **Expanded Data:** 12 case studies (up from 6) covering all master context entries
  - **7 Category Filters:** All, Customer, Infrastructure, Product & Services, Workforce, Government, Health & Nonprofit (with item counts)
  - **Enhanced Card Design:** Industry badges, dual metrics row (primary + secondary), ring-styled tags, gradient accent bars
  - **Pagination:** 6 cards per page with numbered pagination controls
  - **Empty State:** Graceful handling when no studies match a filter
  - **New Icons:** Added Shield, Building2, HeartPulse, Home, BarChart3, FileCheck, TrendingUp, ChevronLeft, ChevronRight
- Layer 7: Security scan PASSED — 0 XSS, 0 console.logs, 0 secrets, 0 unused imports, no dangerouslySetInnerHTML
- Layer 8: Vite build SUCCESS (2.68s), dev server on localhost:5178
- Layer 9: Screenshots captured at all 3 breakpoints
- Layer 10: Visual analysis PASSED:
  - Desktop: Featured hero card renders with 2-column layout, metrics panel with animated counters, 3-column card grid below with pagination
  - Tablet: Featured card stacks vertically, 2-column card grid
  - Mobile: Single-column layout, featured card fully responsive, cards stack vertically
- Layer 11: No revisions needed — visual quality verified on first pass
- Layer 12: Delivery complete

**Files Modified:**
- outputs/homepage/src/components/HomePage/CaseStudies.jsx (complete rewrite — 6 → 12 case studies, featured hero, pagination, expanded categories)

**Screenshots:**
- screenshots/desktop/case-studies-featured.png (featured card + header)
- screenshots/desktop/case-studies-grid.png (card grid + pagination)
- screenshots/tablet/case-studies.png (tablet responsive view)
- screenshots/mobile/case-studies.png (mobile responsive view)

**Security Report:**
- dangerouslySetInnerHTML: None
- Console statements: None
- XSS vectors: None
- Hardcoded secrets: None
- Unused imports: None
- All data is static/hardcoded — no user input injection vectors

**Build Output:**
- dist/index.html: 1.05 KB
- dist/assets/index.css: 48.12 KB (gzip: 8.20 KB)
- dist/assets/index.js: 329.13 KB (gzip: 101.09 KB)

**Result:** SUCCESS — Case Studies section updated with featured hero, 12 case studies, 7 categories, and pagination

---

### 2026-02-20 - Case Studies Section Simplified to Featured Only (12-Layer Automation)
**Action:** /update home case-studies
**Command:** Show only the Featured Case Study, remove all listings

**Details:**
- Layer 1: Master context analyzed
- Layer 2: Business requirement — simplify Case Studies section to spotlight a single featured case study; remove category filters, card grid, pagination, and empty state
- Layer 3: Nerova reference — featured project spotlight pattern retained
- Layer 4-5: Planning — keep section header + featured card + "View all" CTA links; remove all listing infrastructure
- Layer 6: CaseStudies.jsx rewritten:
  - Removed `useState` hook (no longer needed — no filters/pagination)
  - Removed `AnimatePresence` import (no list transitions)
  - Removed 18 unused Lucide icon imports (kept only ArrowRight, Bot, TrendingUp)
  - Removed `categories` array and `CaseStudyCard` component
  - Removed `FeaturedCard` wrapper — inlined featured card directly
  - Removed category filter pills, cards grid, pagination controls, empty state
  - Kept: section header, featured case study spotlight card, "View all case studies" CTA (desktop + mobile)
  - Converted `caseStudies` array (12 items) to single `featuredStudy` object
  - Component reduced from ~740 lines to ~220 lines
- Layer 7: Security scan PASSED — 0 XSS, 0 console.logs, 0 secrets, 0 unused imports
- Layer 8: Vite build SUCCESS (3.10s), dev server verified
- Layer 9: Screenshots captured (desktop, tablet, mobile)
- Layer 10: Visual analysis PASSED — featured card renders correctly, responsive on all breakpoints
- Layer 11: No revisions needed
- Layer 12: Delivery complete

**Files Modified:**
- outputs/homepage/src/components/HomePage/CaseStudies.jsx (simplified to featured-only)

**Screenshots:**
- screenshots/desktop/casestudies-focused.png
- screenshots/tablet/homepage-casestudies-update.png
- screenshots/mobile/casestudies-focused.png

**Build Output:**
- dist/assets/index.css: 41.96 KB (gzip: 7.34 KB)
- dist/assets/index.js: 314.30 KB (gzip: 97.63 KB)

**Result:** SUCCESS — Case Studies section now shows only the Featured Case Study spotlight card

---

### 2026-02-20 - Full Homepage Redesign with AI 3D Patterns (12-Layer Automation)
**Action:** /update home (full redesign)
**Command:** Revise landing page design for aesthetics, Nerova reference inspiration, AI 3D background patterns

**Details:**
- Layer 1: Master context analyzed
- Layer 2: Business requirement — make the homepage more aesthetically pleasing, draw inspiration from Nerova reference website, introduce AI 3D patterns throughout
- Layer 3: Nerova reference analysis (all 15 pages):
  - Bold hero sections with immersive backgrounds
  - Numbered service sections (01-06) with visual rhythm
  - High-contrast dark/light section alternation
  - Glassmorphism card effects
  - Geometric decorative elements
  - Whitespace-heavy, breathing-room layout
  - Strategic accent color usage
- Layer 4-5: Design system enhancements planned:
  - AI 3D perspective grid (CSS animated, 60deg rotateX)
  - Neural network floating nodes with connection lines
  - Pulsing orbs with blur effects
  - Hexagonal mesh pattern (SVG-based)
  - Diagonal scan line animation
  - Data stream lines for dark sections
  - Circuit-trace gradient borders between sections
  - Glass card effects (light and dark variants)
  - Gradient text treatments
  - Floating 3D geometric shapes
- Layer 6: All 11 component files rewritten + globals.css + animations.js:

  **globals.css** — Added 8 new AI pattern CSS classes:
  - `.ai-grid` — Animated perspective grid (rotateX 60deg, scrolling)
  - `.ai-nodes` / `.ai-node` — Neural network floating dots with gradient connection lines
  - `.ai-orb` — Pulsing blur orbs (6s pulse cycle)
  - `.ai-hex-mesh` — Hexagonal SVG mesh background
  - `.ai-scanline` — Diagonal scanning line animation
  - `.data-stream` — Vertical data flow lines
  - `.circuit-border` — Gradient circuit-trace section dividers
  - `.glass-card` / `.glass-card-dark` — Glassmorphism card effects

  **animations.js** — Added 4 new Framer Motion variants:
  - `floatAnimation` — Infinite vertical float
  - `pulseGlow` — Green glow pulse
  - `slideInFromBottom` — Smooth 60px slide-up
  - `rotateIn` — Rotate-scale entrance

  **Navbar.jsx** — Frosted glass navbar (`backdrop-blur-xl`), gradient logo, smoother mobile menu
  **Hero.jsx** — Full immersive redesign:
  - AI perspective grid + floating orbs + scan line + data streams
  - Floating 3D geometric shapes (cube, sphere, diamond)
  - Neural network nodes with connection lines
  - Gradient text on headline ("guide your")
  - Glass-card AI feature badges (Brain, Network, Cpu) with animated activity bars
  - Bottom gradient fade to white for smooth transition
  **Services.jsx** — Hex mesh background, glass-morphism cards, floating decorative orbs, enhanced hover glows
  **Stats.jsx** — Circuit-trace gradient borders, color-coded stat values, hover glow dots
  **TransformationFramework.jsx** — AI grid + orbs + data streams, glass-card-dark pillar cards, gradient text, left accent line on hover
  **Accelerators.jsx** — Hex mesh + gradient bg, glass cards with corner gradient overlays, live metric indicators
  **CaseStudies.jsx** — AI grid + orbs inside featured card, glass-card-dark tags/badges, circuit borders
  **ClientLogos.jsx** — Subtle gradient bg, glass-card client tiles, refined hover states
  **Testimonials.jsx** — Circuit borders, gradient author avatars, subtle green glow background
  **CTA.jsx** — Full AI immersive treatment (grid + orbs + scanline + data streams), gradient text
  **Footer.jsx** — Deep dark bg (#021620), hex mesh texture, gradient top border

- Layer 7: Security scan PASSED — 0 XSS, 0 console.logs, 0 secrets, 0 unused imports, no dangerouslySetInnerHTML
- Layer 8: Vite build SUCCESS (2.56s), dev server verified (200 OK)
- Layer 9: Screenshots captured at 3 breakpoints (desktop hero, services, case studies, CTA, full page; tablet full; mobile full)
- Layer 10: Visual analysis PASSED:
  - Desktop: Immersive hero with 3D grid + floating shapes, smooth white transition, glass service cards, dark transformation section with data streams, CTA with full AI treatment
  - Tablet: All sections responsive, grid collapses to 2-col, floating elements hidden on smaller screens
  - Mobile: Clean single-column layout, all content readable, animations graceful
- Layer 11: No revisions needed — visual quality verified on first pass
- Layer 12: Delivery complete

**Files Modified (13 files):**
- outputs/homepage/src/styles/globals.css (added 8 AI pattern CSS classes + glass effects)
- outputs/homepage/src/utils/animations.js (added 4 new Framer Motion variants)
- outputs/homepage/src/components/HomePage/Navbar.jsx (frosted glass, gradient logo)
- outputs/homepage/src/components/HomePage/Hero.jsx (full AI 3D immersive redesign)
- outputs/homepage/src/components/HomePage/Services.jsx (hex mesh, glass cards, orbs)
- outputs/homepage/src/components/HomePage/Stats.jsx (circuit borders, colored values)
- outputs/homepage/src/components/HomePage/TransformationFramework.jsx (AI grid, glass cards, data streams)
- outputs/homepage/src/components/HomePage/Accelerators.jsx (hex mesh, glass cards, gradient overlays)
- outputs/homepage/src/components/HomePage/CaseStudies.jsx (AI grid in featured card, glass tags)
- outputs/homepage/src/components/HomePage/ClientLogos.jsx (glass tiles, subtle gradients)
- outputs/homepage/src/components/HomePage/Testimonials.jsx (circuit borders, gradient avatars)
- outputs/homepage/src/components/HomePage/CTA.jsx (full AI treatment: grid + orbs + scanline + streams)
- outputs/homepage/src/components/HomePage/Footer.jsx (deep dark bg, hex mesh, gradient border)

**Screenshots:**
- screenshots/desktop/homepage-redesign-full.png (1920x1080 full page)
- screenshots/desktop/homepage-redesign-hero.png (hero viewport)
- screenshots/desktop/homepage-redesign-services.png (services viewport)
- screenshots/desktop/homepage-redesign-casestudies.png (case studies viewport)
- screenshots/desktop/homepage-redesign-cta.png (CTA + footer viewport)
- screenshots/tablet/homepage-redesign-full.png (768x1024 full page)
- screenshots/mobile/homepage-redesign-full.png (375x667 full page)

**Build Output:**
- dist/assets/index.css: 52.48 KB (gzip: 9.10 KB)
- dist/assets/index.js: 325.59 KB (gzip: 99.41 KB)

**Result:** SUCCESS — Full homepage redesign with AI 3D patterns, Nerova-inspired aesthetics, and immersive visual treatment

---

### 2026-03-03 - Homepage Fully Recreated (v2.0)
**Action:** `/create home` — Full 12-layer homepage recreation
**Command:** `recreate the homepage`

**Layers Executed:**
1. Context Analysis — Read radiant-digital-context.md + homepage.md
2. Business Requirements — Extracted brand voice, colors, typography, services, accelerators, case studies
3. Reference Analysis — Read nerova-homepage.md for design patterns (marquee, dual CTAs, stats counters)
4. Skill Activation — Applied frontend design principles, Framer Motion animations, Tailwind design system
5. Planning — 12-component hierarchy planned: Navbar, Hero, LogoMarquee, Stats, Services, TransformationFramework, Accelerators, CaseStudies, ClientLogos, Testimonials, CTA, Footer
6. React Generation — All 12 components recreated from scratch with elevated design
7. Security — No XSS vectors, no console.logs, no dangerous imports
8. Build — `npm run build` clean (338.5 kB JS, 50.98 kB CSS)
9. Screenshots — Desktop 1920x1080, Tablet 768x1024, Mobile 375x667
10. Visual Analysis — All viewports verified, responsive stacking correct
11. Auto-Revision — Case study card shadow refined
12. Delivery — PROJECT_LOG.md updated

**Key Design Improvements over v1:**
- Hero: Dynamic industry text ticker, floating stat cards (50% faster / 20+ clients / 3 regions), AI Fabric activity panel
- NEW: LogoMarquee — continuous scrolling trusted-partner ticker with hover-pause
- Stats: Animated count-up numbers with progress bars (useMotionValue + animate)
- Services: Hover-reveal metric line + animated top accent bar per card
- TransformationFramework: Hover-reveal outcome bullets with per-pillar accent colors
- Accelerators: 3-metric grid per card + pillar checklist
- CaseStudies: 6-card filterable grid (All/Customer/Workforce/Infrastructure/Product) replacing single featured card
- ClientLogos: 2-row grid layout with per-sector accent colors + 4-stat bottom bar
- Testimonials: Added star ratings + sector badge + 4th testimonial
- CTA: Dual action card layout (Let's Embark + Book Discovery Call) instead of single CTA block
- Footer: Added social icons (LinkedIn, YouTube), arrow-on-hover links, improved typography
- CSS: Fixed @import order, added dot-grid, text-gradient-green utilities, marquee keyframes

**Files Modified (14):**
- src/styles/globals.css
- src/pages/HomePage.jsx
- src/components/HomePage/Navbar.jsx
- src/components/HomePage/Hero.jsx
- src/components/HomePage/LogoMarquee.jsx (NEW)
- src/components/HomePage/Stats.jsx
- src/components/HomePage/Services.jsx
- src/components/HomePage/TransformationFramework.jsx
- src/components/HomePage/Accelerators.jsx
- src/components/HomePage/CaseStudies.jsx
- src/components/HomePage/ClientLogos.jsx
- src/components/HomePage/Testimonials.jsx
- src/components/HomePage/CTA.jsx
- src/components/HomePage/Footer.jsx

**Screenshots:**
- screenshots/desktop/homepage_desktop_20260303.png
- screenshots/tablet/homepage_tablet_20260303.png
- screenshots/mobile/homepage_mobile_20260303.png

**Status:** ✅ SUCCESS

---

### 2026-07-08 - Leadership Feedback: Role/Terminology Rename + Dynamic Suggested Next Steps
**Action:** Applied leadership feedback (items 12–21) to the `ai-landing-v1` AI assessment + report.

**Role renames (display labels only, internal keys unchanged — no scoring/routing breakage):**
- `Consultant` → `AI Practitioner` (+ `Consultant Track` → `AI Practitioner Track`).
- `Technical Lead` → `Technology Leader` (+ `Technical Track` → `Technology Track`).
- Files: data/aiAssessment.js, utils/generateReportPdf.js, components/assessment/HTMLReportViewer.jsx, pages/AssessmentHub.jsx.

**Report + assessment rename (items 14, 15 — "Adoption" out of the title, consistency):**
- Report `AI Adoption Report` → `AI Maturity Assessment` (8 spots).
- Whole assessment brand `AI Adoption Assessment`/`AI Adoption` → `AI Maturity` for consistency (PDF header, hub eyebrows, chat prompts, knowledgeBase, ContactForm comment).
- Navbar CTA `Assess AI Readiness` → `Assess AI Maturity`.
- Preserved: the `Adoption & Value` maturity dimension and lowercase "adoption" prose (only titles/labels changed).

**Dynamic Suggested Next Steps (items 16–19):**
- New `suggestedNextSteps({role, stageIndex, sectionAverages})` in data/reportEditorial.js.
- Personalized per role + autonomy stage + weakest dimension; each step tagged to Radiant's model (Assess → Train → Adopt → Scale → Sustain) with a matched service; recommended services gated by maturity band.
- Replaced the old static "Recommended Next Step" + generic CTA across all three renderers (PDF, email-safe HTML, in-app HTMLReportViewer) + AssessmentResults.

**Verification:** `npm run build` passes; engine confirmed dynamic across all 4 personas (distinct steps/phases/services each). Staged on branch `ai-test-integration` — NOT merged. Pending: leadership review (item 20) + market-leader pilot (item 21).

**Status:** ✅ SUCCESS

---

### 2026-07-09 - Homepage Hero: Persona/Maturity "Choose Your Path"
**Action:** Reworked the standalone AI site homepage hero per leadership review (Lam/Shankar) to guide visitors by AI maturity instead of pushing everyone to the assessment.

**Why:** Old hero + subhead targeted mature/expert buyers and pushed the Context Engine and the assessment together (they conflict). Target audience shifted to less-mature buyers (federal gov, credit unions, SMBs). Needed a maturity-based path built into the hero, not a modal.

**Changes (outputs/ai-landing-v1):**
- New `src/components/home/PersonaPaths.jsx` — data-driven 2-card path selector. Path A "Getting started" → routes to /assessment/ai. Path B "Scaling / hard problems (hallucinations, token cost, data integration)" → smooth-scrolls to the Context Engine section (#differentiator), skipping the assessment block. Reuses the AssessmentEntry card/motion/token recipe.
- `src/components/home/Hero.jsx` — replaced the two assessment chips with `<PersonaPaths />`; dropped now-unused ArrowRight/Brain/Target imports. Headline + chat input + metric strip unchanged.
- `src/data/siteContent.js` — generalized `brand.description` subhead ("every stage", emphasize "deploy"). Provisional copy.

**Verification:** `npm run build` clean; Playwright — 8/8 checks pass (both cards render, old chip gone, subhead generalized, Path A routes to /assessment/ai, Path B scrolls to #differentiator, no horizontal overflow @375px). Desktop + mobile screenshots reviewed.

**Handoffs:** All hero/card copy is PROVISIONAL — Deena reconciles final wording; Path B's hard-problem framing is net-new and needs sign-off. Two-vs-three paths kept switchable. Staged on branch `ai-test-integration`, NOT merged — mockup for Lam's review.

**Status:** ✅ SUCCESS

---

### 2026-07-14 - Landing Page Copy & Structure Overhaul (radiant-ai-landing-copy-spec)
**Action:** Implemented Lam's approved landing-page spec on the standalone AI site (outputs/ai-landing-v1), repositioning around the mid-market buyer (self-select by symptom, not maturity grade).

**Phase 1 - Nav + order:** Navbar → Problems We Solve · Results · Industries · How We Work · Contact + CTA "Assess Your AI Readiness" (dropped standalone Assessment + Platform). SectionNav relabeled/reordered. Index.jsx reordered per §7; Free Assessment block moved from position 2 to after Industries; AI Fabric now adjacent to the Context Engine. Contact keeps routing to /chat.
**Phase 2 - Hero:** approved subhead ("hard-won playbook…"); two journey cards (PLAN WITH CONFIDENCE / DEPLOY WITH DISCIPLINE, eyebrow-promises/headline-diagnoses); prompt placeholder → "Describe the problem you're trying to solve with AI." (Hero + Chat).
**Phase 3 - Problems We Solve accordion:** new ProblemsWeSolve.jsx replaces Solutions.jsx (deleted). Two-pane symptom-led tablist (role=tablist/tab/tabpanel, arrow-key roving, deep-link #slug via replaceState, keyed opacity cross-fade with reserved 16:10 slot = no layout shift); mobile = inline vertical accordion. solutions[] reordered to spec order with problemStatement + slug added to all 8; reused FloatingScreenshot + visualOverrides.
**Phase 4 - Sitewide voice sweep:** 0 em/en dashes in copy; AI-powered→AI-driven; leverage/comprehensive/robust/end-to-end/world-class rewritten; standalone "Radiant"→"Radiant Digital" (compounds preserved); infra band → "Powered by the infrastructure you already trust."

**Verification:** npm run build clean; grep gates 0; Playwright 18/18 (nav labels, hero copy+cards+placeholder, accordion default/click/keyboard/deep-link, page order, mobile no-overflow); desktop + mobile screenshots reviewed.

**Open items flagged (no unapproved copy invented):** trusted band mid-market rewrite (§9.1); exact solution tags[]; assistant stage-inference routing (backend); CX hero secondary link retention.

**Status:** ✅ SUCCESS — staged on branch ai-test-integration, NOT merged. Mockup for Lam's review.

---

## 2026-08-11 — AI Adoption Assessment report: Content QA revision (v2.0)

**Trigger:** `~/Downloads/AI Adoption Assessment_Content_QA.docx` (content team review) — 22 page-level items + 12 system-wide items.

**Target identified:** `src/utils/aiReportPdf.jsx` (@react-pdf/renderer). Delivery path is `AssessmentResults.jsx` → `getReportPdfBase64()` → `aiReportPdf.jsx`. Note: `src/utils/aiExecutiveReport.js` is an unreachable legacy duplicate of the same report and was left untouched — flagged for deletion.

**Files changed:**
- `src/utils/aiReportPdf.jsx` — hyphenation disabled; tables non-splitting and bound to their headings; Exhibit 1 caption; section 04 renamed Maturity Positioning; Key Takeaways 1–3 rewritten; Leading area / considerations intro gating; per-dimension 60-day plan; sector blocks generalized; CTA copy + `SCHEDULE A CALL`; methodology expanded; conclusion paragraphs 2–4 rewritten; Stage 6 branches.
- `src/data/reportEditorial.js` — Radiant's Read stage 2/3/4; score-anchored dimension steps; `SIXTY_DAY_PLAN` (4); `SECTOR_COPY` (FS + Healthcare + Government); `scoreSpreadSummary` / `balancedHeadline` / `topVsLowRead` / `conclusionComparison` / `conclusionClosing`; 14+ industries claim removed.
- `src/data/aiAssessment.js` — all six stage findings rewritten to evidence-bounded wording; gap/next-step copy; absolute claims in question contexts neutralized; Q5/Q13/Q19/Q20 marked `active: false` (served bank 23 of 27).
- `src/components/assessment/WhatAILeadersDo.jsx` — Stage 4 heading + actions 2 and 3.
- `src/utils/emailSafeReport.js`, `src/components/assessment/HTMLReportViewer.jsx` — same CTA copy + positioning rename, so web/email/PDF claims match.
- `docs/ai-assessment-report-copy-variations.md` — catalogue regenerated from this build (version, commit, date, surface map, decisions log).

**Verification:** `npm run build` clean. Three PDFs rendered from source and text-extracted: Stage 4 / Financial Services / Executive, balanced / Healthcare / Technology Leader, Stage 6 / Government / Business Leader. Confirmed no mid-word breaks, no orphaned table headings, no `->` or `...` artifacts, correct band-distribution and Stage 6 copy.

**Open (content team decision):** 5 unsourced web-only benchmark stat badges; leader titles + LinkedIn URLs need production validation.

**Status:** ✅ SUCCESS — on branch ai-test-integration, not committed.

## 2026-09-22 — Homepage: Leadership section (10 portraits)

**Trigger:** Leadership photos + titles supplied by Tushar Hande (email, 4 attachments + 6 pasted). Request: a cohesive leadership section on the homepage with uniform portraits, homepage-native styling, a weighted headline, and a micro-interaction.

**Placement:** `src/pages/Index.jsx` — between `WhatIsRadiantAI` (#differentiator) and `AssessmentEntry` (#assessment), so "why us" is immediately answered by "who us" before the assessment CTA. Registered in `SectionNav.jsx` and `Navbar.jsx` as `#leadership`.

**Files changed:**
- `public/images/leadership/*.jpg` (new, 10) — every source headshot normalised to 512×512 JPEG q88 via `sips`, so the asset set is uniform regardless of the 200–800px originals.
- `src/data/siteContent.js` — new `leadership` export (kicker, headline, body, ordered `people[]` with name / role / photo).
- `src/components/home/Leadership.jsx` (new) — header block reusing the `SocialProof` pattern (`kicker`, `grad-text` headline, `editorial-bg-num`), plus a `grid-cols-2 lg:grid-cols-5` portrait grid. 2 and 5 are the only divisors of 10, so no orphan row at any breakpoint. Framer Motion ripple stagger keyed off row/column index.
- `src/styles/globals.css` — `.portrait-*` component classes.
- `src/components/shared/SectionNav.jsx`, `src/components/shared/Navbar.jsx` — nav registration.

**Cohesion approach:** the source photos have unrelated backdrops (studio grey, office, Times Square at night, a blue circular crop). Rather than cut them out, the resting state applies `grayscale(1)` plus a `mix-blend-mode: color` duotone on a single brand ramp, a bottom fade into the card, and a radial vignette — which collapses ten different backdrops onto one value and one hue. Uniform 4:5 frame, 20px radius and card chrome do the rest.

**Micro-interaction:** hover dissolves the duotone to the true photograph (0.7s), lifts the card 8px, sweeps a diagonal sheen across the frame, scales the image to 1.055, and extends the gradient accent rule under the name from 28% to full width. Guarded by `prefers-reduced-motion` — the colour reveal stays, the movement and sheen drop.

**Verification:** `vite build` clean. Playwright screenshots at 1920×1080, 768×1024, 375×667 plus a desktop hover frame, archived under `screenshots/`. All 10 cards render; no console errors from this section; accent rules align across every row; no XSS sinks or unused imports in the new files.

**Open:** photo→name mapping follows the order the photos were pasted and needs a human check against the source email before this goes to production.

**Status:** ✅ SUCCESS — branch `leadership-imagery`.

## 2026-09-22 — Leadership section: photo→name mapping corrected

**Trigger:** Resolves the open item from the entry above. The original mapping followed the order the photos were supplied, which turned out not to match the table order; Raima re-sent each headshot captioned with its name.

**Corrections applied** (8 of 10 slots moved; every replacement re-normalised to 512×512 JPEG q88):
- Shankar Rachakonda ← photo previously on Nari Vemuru
- Srinivas Chamarthi ← photo previously on Shankar Rachakonda
- Srinivas Punnamaraju ← photo previously on Balaram Dandu
- Sandeep Sawhney ← photo previously on Gil Tadmor
- Prafull Kumar — unchanged, confirmed by hash
- Gil Tadmor ← photo previously on Srinivas Punnamaraju
- Nari Vemuru ← photo previously on Sandeep Sawhney
- Balaram Dandu ← photo previously on Srinivas Chamarthi
- Arun Srinivasan Thiruvengadam, Vish Tatavarthy — unchanged, correct by elimination

**Verification:** MD5 across `public/images/leadership/*.jpg` after each swap, to catch the transient duplicates a one-at-a-time reassignment creates. Final set: 10 files, all distinct. The eight confirmed names consumed eight distinct photos, leaving exactly the two already on slots 9 and 10 — which is what closes the mapping. Screenshots re-captured at all three breakpoints.

**Note for future photo drops:** don't infer identity from supply order. Ask for captioned photos, or verify against a named source file.

**Status:** ✅ SUCCESS — mapping confirmed, no open items.

## 2026-09-22 — Leadership section: Shankar Rachakonda photo upgraded

**Change:** `public/images/leadership/shankar-rachakonda.jpg` replaced with a 2048×2048 studio original (same subject, better source), re-normalised to 512×512 JPEG q88 like the rest of the set.

**Why it matters:** the previous file was a 500px headshot pre-cropped to a circle on a light blue field, so the circular edge showed as an arc in the top corners of the 4:5 frame. The new source is a full-bleed square on a white studio backdrop — the arc is gone and the duotone and vignette now render it as a clean edge-to-edge portrait.

**Verification:** set still 10 files, all distinct by MD5. Screenshots re-captured; the card reads at the same value as its neighbours rather than brighter.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Srinivas Chamarthi photo upgraded

**Change:** `public/images/leadership/srinivas-chamarthi.jpg` replaced with a 2048×2048 studio original (same subject), re-normalised to 512×512 JPEG q88.

**Why:** the previous file was a 400px LinkedIn-style crop and was visibly soft at desktop size. Same studio session as the new Shankar photo, so slots 1 and 2 now read as a matched pair at the head of the grid.

**Note:** this source is framed tighter than the rest — the head fills more of the 4:5 frame with less headroom. Nothing to fix in code (the crop is inherent to the source), but if a looser original exists it would sit more evenly beside its neighbours.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Sandeep Sawhney photo upgraded

**Change:** `public/images/leadership/sandeep-sawhney.jpg` replaced with a 1024×1024 studio original (same subject), re-normalised to 512×512 JPEG q88. Previous file was a 296px crop — the softest in the set.

**Effect:** three of the ten portraits (Shankar, Srinivas Chamarthi, Sandeep) are now studio shots on light backdrops, which anchors the top row. Nari's 200px file is now the weakest remaining source.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Srinivas Punnamaraju photo upgraded

**Change:** `public/images/leadership/srinivas-punnamaraju.jpg` replaced with a 1024×1024 studio original (same subject), re-normalised to 512×512 JPEG q88. Previous file was a 282px casual shot against a busy interior.

**Effect:** four of the top row's five portraits are now studio shots on light backdrops. The row reads as a commissioned set. The consequence is that the quality gap to row 2 (Gil 342px street photo, Nari 200px, Balaram 282px, Vish 347px) is now the most visible inconsistency in the section — worth closing before production.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Gil Tadmor photo upgraded

**Change:** `public/images/leadership/gil-tadmor.jpg` replaced with a 1024×1024 studio original, re-normalised to 512×512 JPEG q88.

**Why this one mattered most:** the previous file was a 342px casual street photo (green athletic top, Times Square at night). It was the only non-headshot in the set, so it read as out of place regardless of the duotone treatment — a resolution bump alone would not have fixed it. Now row 2 opens on a studio portrait.

**Remaining originals:** Nari 200px, Balaram 282px, Vish 347px, Arun 400px. Five of ten are now studio shots.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Nari Vemuru photo upgraded

**Change:** `public/images/leadership/nari-vemuru.jpg` replaced with a 1024×1024 studio original, re-normalised to 512×512 JPEG q88. Previous file was 200px — the lowest-resolution source in the set, and the one being upscaled hardest to reach 512.

**Remaining originals:** Balaram 282px, Vish 347px, Arun 400px. Six of ten are now studio shots; both rows open on one.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Prafull Kumar photo upgraded

**Change:** `public/images/leadership/prafull-kumar.jpg` replaced with a 1024×1024 studio original on a white backdrop, re-normalised to 512×512 JPEG q88.

**Why, given the old one was already decent:** the previous 800px file was sharp enough, but it was shot against a dark grey backdrop — the only one in row 1 that was. Under the duotone the whole card sat darker than its four neighbours. This was a consistency fix rather than a resolution fix, and row 1 is now five studio portraits on light backdrops.

**Remaining originals:** Balaram 282px, Vish 347px, Arun 400px. Seven of ten upgraded. Balaram is now the clear outlier — a darker, busier frame sitting between four light studio portraits in row 2.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS

## 2026-09-22 — Leadership section: Arun Srinivasan Thiruvengadam photo upgraded

**Change:** `public/images/leadership/arun-thiruvengadam.jpg` replaced with a 1024×1024 studio original, re-normalised to 512×512 JPEG q88.

**Open question — this was not just a resolution swap.** The previous file showed a different, visibly older man (grey hair, black suit, gold tie); the new one is a younger man with rimless glasses. So the original slot-9 photo was the wrong person, not merely a low-res version of the right one.

That matters because slots 9 and 10 (Arun, Vish) were the only two closed by elimination rather than direct confirmation — see the mapping-correction entry above. If slot 9 was wrong, slot 10 is unverified by the same reasoning. The new Arun photo also resembles the man currently on Vish's card, which is consistent with those two having been transposed in the original supply order.

**Displaced photo preserved** at `/tmp/displaced-arun-greyhair.jpg` pending a decision — it is not currently shown anywhere in the grid.

**Action needed:** confirm Vish Tatavarthy's photo directly. Do not close it by elimination a second time.

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ⚠️ SUCCESS with open item — Vish unconfirmed.

## 2026-09-22 — Leadership section: Vish Tatavarthy photo confirmed, slots 9/10 transposition resolved

**Change:** `public/images/leadership/vish-tatavarthy.jpg` replaced with a 1024×1024 studio original, re-normalised to 512×512 JPEG q88.

**Resolves the open item from the entry above.** The supplied photo is the same grey-haired man in pinstripe and gold tie that had been sitting on Arun's card — confirming slots 9 and 10 were transposed in the original supply order. Both are now directly confirmed rather than inferred, and `/tmp/displaced-arun-greyhair.jpg` is no longer orphaned: that person is Vish.

**Root cause, recorded so it is not repeated:** closing the last two slots by elimination was unsound. The argument assumed the eight confirmed names had consumed eight *correctly identified* photos, but a transposition inside the unconfirmed remainder is invisible to a uniqueness check — every file stays distinct, so the MD5 sweep that caught the earlier duplicates could not catch this. Elimination only works when the remaining set is known-good; here it was not.

**All ten photos now individually confirmed against a captioned source, and all ten are studio originals at ≥1024px except Balaram (282px).**

**Verification:** 10 files, all distinct by MD5; screenshots re-captured at all three breakpoints.

**Status:** ✅ SUCCESS — mapping fully confirmed; Balaram resolution is the only remaining item.

## 2026-09-22 — Leadership section: Balaram Dandu photo upgraded — photo set complete

**Change:** `public/images/leadership/balaram-dandu.jpg` replaced with a 1024×1024 studio original, re-normalised to 512×512 JPEG q88. This was the last remaining original (282px).

**All ten portraits are now studio headshots on light backdrops, at 1024px or better, each individually confirmed against a captioned source.**

**Design note worth revisiting:** the duotone layer was built to solve a problem that no longer exists. Its purpose was to collapse ten unrelated backdrops — studio grey, an office, Times Square at night, a circular crop on light blue — onto one hue and one value. Every source is now the same kind of shot on the same kind of background, so that justification is gone.

It is still worth keeping, for two reasons that are not the original one: it carries the hover micro-interaction (duotone dissolving to true colour), and ten full-colour portraits on white backdrops would sit very bright against the dark navy section. But if the section is ever restyled, the duotone should be re-argued on those grounds rather than inherited as a fix for a problem that has since been solved at the source.

**Verification:** `vite build` clean. 10 files, all distinct by MD5. Screenshots re-captured at 1920×1080, 768×1024, 375×667 plus desktop hover.

**Status:** ✅ COMPLETE — photo set final, mapping fully confirmed, no open items.

# QUICK START - v2.0

## ⚡ Get Started in 4 Steps

### Step 1: Fetch Content
```
/fetch main
```
Fetches 18 pages from https://stage.radiant.digital/ and saves to `content/current-website/`

### Step 2: Fetch Design Reference
```
/fetch ref design
```
Fetches 12 pages from https://devblock.net/ and saves to `content/reference-websites/devblock/`

### Step 3: Fetch Content Reference
```
/fetch ref content
```
Fetches 12 pages from https://www.onixnet.com/ and saves to `content/reference-websites/onixnet/`

### Step 4: Create Page
```
/create home
```
Generates a full React app using all content sources — DevBlock for DESIGN, Onixnet for CONTENT, BCG for STRATEGY.

**Done!** Check outputs/homepage/ for your React app.

**Shortcut:** `/fetch ref` runs both design + content in one go. `/refresh` runs all three fetches.

---

## 📊 Current Content Status

### Main Website (Radiant Digital) - 18 Pages
```
content/current-website/
├── homepage.md                          Main landing page
├── what-we-do.md                        Services overview
├── markets.md                           Americas market focus
├── contact-us.md                        Contact info & form
├── insights.md                          Articles & case studies
├── events.md                            Upcoming & past events
├── careers.md                           Job listings & culture
├── digital-strategy-and-experience.md   DSE service page
├── analytics-data-science-and-ai.md     Data & AI services
├── cloud-transformation.md              Cloud services
├── product-development-and-integration.md Dev & integration
├── skilled-workforce-solutions.md       Staffing & workforce
├── who-we-are.md                        About / mission / values
├── cx-accelerator.md                    CX Accelerator product
├── product-accelerator.md               Product Accelerator
├── sales-accelerator.md                 Sales Accelerator / CRO
├── tracklynk.md                         IoT tracking product
└── privly.md                            Data anonymization product
```
**Last Fetched:** 2026-02-20

### Design Reference (DevBlock) - 12 Pages
```
content/reference-websites/devblock/
├── devblock-homepage.md               Layout, animations, hero patterns
├── devblock-about.md                  About page patterns, team sections
├── devblock-services.md               Service page structure, card layouts
├── devblock-work.md                   Portfolio/case study presentation
├── devblock-contact.md                Contact form & office locations
├── devblock-blog.md                   Blog layout patterns
├── devblock-careers.md                Careers page structure
├── devblock-service-product-design.md Product design service detail
├── devblock-service-ai.md             AI service detail + pricing
├── devblock-service-devops.md         DevOps service detail
├── devblock-service-spatial-design.md Spatial design (Vision Pro)
└── devblock-product-cad-lite.md       CAD-LITE dispatch product
```
**Last Fetched:** 2026-03-06
**Purpose:** DESIGN reference — UI, layout, styling, animations

### Content Reference (Onixnet) - 14 Files
```
content/reference-websites/onixnet/
├── onixnet-homepage.md               Metrics-driven content, trust signals
├── onixnet-about.md                  Company storytelling patterns
├── onixnet-solutions.md              Service page content structure
├── onixnet-ai-ml.md                  AI service messaging patterns
├── onixnet-data-analytics.md         Data service content patterns
├── onixnet-google-cloud.md           Partnership page structure
├── onixnet-google-workspace.md       Product service page patterns
├── onixnet-managed-services.md       Ongoing service page patterns
├── onixnet-customer-stories.md       Case study presentation
├── onixnet-partners.md               Partner ecosystem page
├── onixnet-blog.md                   Thought leadership structure
├── onixnet-content-strategy.md       Deep storytelling & metrics patterns
├── minto-framework-guide.md          Minto Pyramid templates (SCQA)
└── bcg-agentic-ai-insights.md        BCG strategic positioning & market data
```
**Last Fetched:** 2026-03-10
**Purpose:** CONTENT reference — metrics-driven copy, storytelling, Minto framework, BCG agentic AI positioning

---

## 🔑 Reference System

| Reference | Purpose | Answers |
|-----------|---------|---------|
| **DevBlock** | DESIGN | How it should LOOK (UI, layout, animations) |
| **Onixnet** | CONTENT | How it should READ (metrics-first, outcome-driven) |
| **Minto Framework** | STRUCTURE | How it should be ORGANIZED (answer first, SCQA) |
| **BCG Insights** | STRATEGY | What it should SAY (agentic AI, market data) |

---

## 💡 Commands

```
/fetch main              Fetch 18 pages from stage.radiant.digital
/fetch ref design        Fetch 12 pages from devblock.net (DESIGN)
/fetch ref content       Fetch 12 pages from onixnet.com (CONTENT)
/fetch ref               Fetch both design + content references
/refresh                 Fetch all (main + design ref + content ref)
/create home             Create homepage
/create about            Create about page
/create services         Create services page
/create contact          Create contact page
/update home hero        Update a section on an existing page
/clear screenshots       Clear screenshots
/status                  Show status
/help                    All commands
```

See COMMAND_REFERENCE.md for complete list.

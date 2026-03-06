# QUICK START - v2.0

## ⚡ Get Started in 3 Steps

### Step 1: Fetch Content
```
/fetch main
```
Fetches 18 pages from https://stage.radiant.digital/ and saves to `content/current-website/`

### Step 2: Fetch Reference Design
```
/fetch ref
```
Fetches 15 pages from https://nerova.webflow.io/ and saves to `content/reference-websites/`

### Step 3: Create Page
```
/create home
```
Generates a full React app using both content sources.

**Done!** Check outputs/homepage/ for your React app.

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

### Reference Website (Nerova) - 15 Pages
```
content/reference-websites/
├── nerova-homepage.md                 Main landing page
├── nerova-about.md                    About / team / mission
├── nerova-services.md                 4 core services + pricing
├── nerova-projects.md                 Project portfolio index
├── nerova-case-studies.md             Case studies index
├── nerova-blog.md                     Blog posts
├── nerova-contact.md                  Contact form & details
├── nerova-project-brightnest.md       BrightNest project detail
├── nerova-project-stellarworks.md     StellarWorks project detail
├── nerova-project-novalaunch.md       NovaLaunch project detail
├── nerova-project-pixelwave.md        PixelWave project detail
├── nerova-case-study-hyperion.md      Hyperion 3d.io case study
├── nerova-case-study-boldmoves.md     BoldMoves.ai case study
├── nerova-case-study-studio-focus.md  Studio Focus case study
└── nerova-style-guide.md              Design system & style guide
```
**Last Fetched:** 2026-03-03

---

## 💡 Commands

```
/fetch main          Fetch 18 pages from stage.radiant.digital
/fetch ref           Fetch 15 pages from nerova.webflow.io
/refresh             Fetch both main + ref
/create home         Create homepage
/create about        Create about page
/create services     Create services page
/create contact      Create contact page
/clear screenshots   Clear screenshots
/status              Show status
/help                All commands
```

See COMMAND_REFERENCE.md for complete list.

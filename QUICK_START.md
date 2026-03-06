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
Fetches 12 pages from https://devblock.net/ and saves to `content/reference-websites/`

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

### Reference Website (DevBlock) - 12 Pages
```
content/reference-websites/
├── devblock-homepage.md               Main landing page
├── devblock-about.md                  About / team / mission / values
├── devblock-services.md               Capabilities overview
├── devblock-work.md                   Projects portfolio (Elixr, BeautyTap, MINTX, LinkIt!)
├── devblock-contact.md                Contact form & office locations
├── devblock-blog.md                   Blog posts (21 articles)
├── devblock-careers.md                Job listings & culture
├── devblock-service-product-design.md Product design service detail
├── devblock-service-ai.md             AI service detail + pricing
├── devblock-service-devops.md         DevOps service detail
├── devblock-service-spatial-design.md Spatial design (Vision Pro)
└── devblock-product-cad-lite.md       CAD-LITE dispatch product
```
**Last Fetched:** 2026-03-06

---

## 💡 Commands

```
/fetch main          Fetch 18 pages from stage.radiant.digital
/fetch ref           Fetch 12 pages from devblock.net
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

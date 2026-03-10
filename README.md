# RADIANT AUTOMATION v2.0 - WORKSPACE

## 🚀 Enhanced Multi-Layer Automation System

**Version:** 2.0
**Status:** Production Ready
**Purpose:** Automated React-based website generation with security checks and visual verification
**Last Updated:** 2026-03-10

---

## 📁 Complete Folder Structure

```
radiant-automation-v2/
├── README.md                              ← Start here
├── ENHANCED_AUTOMATION_SYSTEM_v2.md       ← Complete workflow
├── COMMAND_REFERENCE.md                   ← All shortcuts
├── QUICK_START.md                         ← 5-minute guide
│
├── content/                               💾 Website content
│   ├── current-website/                   (18 Radiant Digital pages as MD)
│   │   ├── homepage.md
│   │   ├── what-we-do.md
│   │   ├── markets.md
│   │   ├── contact-us.md
│   │   ├── insights.md
│   │   ├── events.md
│   │   ├── careers.md
│   │   ├── digital-strategy-and-experience.md
│   │   ├── analytics-data-science-and-ai.md
│   │   ├── cloud-transformation.md
│   │   ├── product-development-and-integration.md
│   │   ├── skilled-workforce-solutions.md
│   │   ├── who-we-are.md
│   │   ├── cx-accelerator.md
│   │   ├── product-accelerator.md
│   │   ├── sales-accelerator.md
│   │   ├── tracklynk.md
│   │   └── privly.md
│   │
│   ├── reference-websites/
│   │   ├── devblock/                      (12 pages — DESIGN: UI, layout, styling)
│   │   │   ├── devblock-homepage.md
│   │   │   ├── devblock-about.md
│   │   │   ├── devblock-services.md
│   │   │   ├── devblock-work.md
│   │   │   ├── devblock-contact.md
│   │   │   ├── devblock-blog.md
│   │   │   ├── devblock-careers.md
│   │   │   ├── devblock-service-product-design.md
│   │   │   ├── devblock-service-ai.md
│   │   │   ├── devblock-service-devops.md
│   │   │   ├── devblock-service-spatial-design.md
│   │   │   └── devblock-product-cad-lite.md
│   │   │
│   │   └── onixnet/                       (14 files — CONTENT: metrics, storytelling, strategy)
│   │       ├── onixnet-homepage.md
│   │       ├── onixnet-about.md
│   │       ├── onixnet-solutions.md
│   │       ├── onixnet-ai-ml.md
│   │       ├── onixnet-data-analytics.md
│   │       ├── onixnet-google-cloud.md
│   │       ├── onixnet-google-workspace.md
│   │       ├── onixnet-managed-services.md
│   │       ├── onixnet-customer-stories.md
│   │       ├── onixnet-partners.md
│   │       ├── onixnet-blog.md
│   │       ├── onixnet-content-strategy.md
│   │       ├── minto-framework-guide.md
│   │       └── bcg-agentic-ai-insights.md
│   │
│   └── master-context/                    (Single source of truth)
│       └── radiant-digital-context.md
│
├── screenshots/                           📸 Visual verification
│   ├── desktop/  (1920x1080)
│   ├── tablet/   (768x1024)
│   ├── mobile/   (375x667)
│   └── archive/  (Old screenshots)
│
├── logs/                                  📊 Activity tracking
│   ├── PROJECT_LOG.md
│   ├── SECURITY_REPORTS.md
│   └── AUDIT_REPORTS.md
│
├── templates/                             🎨 Reusable templates
│   ├── pages/
│   ├── components/
│   └── sections/
│
├── outputs/                               ✨ Generated React apps
│   └── [page-name]/
│
├── scripts/                               🔧 Helper scripts
└── docs/                                  📚 Documentation
```

---

## 📊 Content Sources

### Main Website: Radiant Digital
- **URL:** https://stage.radiant.digital/
- **Pages Fetched:** 18
- **Last Fetched:** 2026-02-20
- **Company:** AI-first digital transformation partner
- **HQ:** Vienna, VA | Global: India, Singapore, Oman, UAE, Canada
- **Services:** 6 Enablers (DSE, Analytics/AI, Cloud, Product Dev, Org Transformation, Workforce)
- **Products:** 3 Accelerators (CX, Product, Sales) + Tracklynk (IoT) + Privly (privacy)
- **Markets:** Commercial, Federal, State & Local, Education
- **Tagline:** "Transformation is the journey. Digital enablement is the map."

### Design Reference: DevBlock
- **URL:** https://devblock.net/
- **Pages Fetched:** 12
- **Last Fetched:** 2026-03-06
- **Purpose:** DESIGN reference — UI, layout, styling, animations
- **Company:** DevBlock – technology consulting firm (product design, AI, DevOps, spatial design)
- **Tagline:** "Human-Driven, AI-Enhanced, Digital Solutions"
- **Design Style:** Clean modern corporate, animated backgrounds, light/dark mode, vivid cyan/purple gradients

### Content Reference: Onixnet
- **URL:** https://www.onixnet.com/
- **Pages Fetched:** 12 pages + 2 strategy docs
- **Last Fetched:** 2026-03-10
- **Purpose:** CONTENT reference — metrics-driven copy, storytelling, headline formulas
- **Company:** Onix – leading cloud solution provider (Google Cloud partner)
- **Content Style:** Metrics-first, outcome-driven, trust-forward, C-suite-targeted
- **Key Patterns:** "16X Partner of the Year," "500+ agents," "Fortune 500 expertise"

### Strategy Reference: BCG Agentic AI + Minto Framework
- **Purpose:** Strategic positioning and content structure methodology
- **BCG:** 3 value pools, 4 expectation gaps, 5 winning imperatives for agentic AI market
- **Minto:** Pyramid Principle (SCQA, answer-first, group in threes) applied to web content

---

## 🎯 Quick Start (3 Commands)

```bash
1. /fetch main              # Fetch 18 pages from stage.radiant.digital
2. /fetch ref               # Fetch design (DevBlock) + content (Onixnet) references
3. /create home             # Generate homepage (all 12 layers)
```

**That's it!** System handles all 12 layers automatically.

---

## ⚡ Command Shortcuts

```bash
# Content
/fetch main              → Fetch 18 pages from stage.radiant.digital
/fetch ref design        → Fetch 12 pages from devblock.net (DESIGN)
/fetch ref content       → Fetch 12 pages from onixnet.com (CONTENT)
/fetch ref               → Fetch both design + content references
/refresh                 → Update all content (main + design ref + content ref)

# Screenshots
/clear screenshots       → Remove all
/clear old              → Remove old (>7 days)

# Pages (Always React!)
/create home            → Create homepage
/create about           → Create about page
/create services        → Create services page
/create contact         → Create contact page

# Section Updates
/update home hero       → Update a section on an existing page
/update about leadership → Add new section to existing page

# Status
/status                 → Show project status
/audit                  → Run quality check
/help                   → All commands
```

See **COMMAND_REFERENCE.md** for complete list.

---

## 🔄 Complete Automation (12 Layers)

When you say: **"Create a homepage"**

```
Layer 1:  Context Analysis        ✓ Load 18 Radiant Digital pages
Layer 2:  Business Requirements   ✓ Review goals & messaging
Layer 3:  Reference Analysis      ✓ DevBlock DESIGN + Onixnet CONTENT + BCG STRATEGY
Layer 4:  Skill Activation        ✓ Load skills + Minto + metrics-driven writing
Layer 5:  Planning                ✓ Component plan (SCQA content + DevBlock layout)
Layer 6:  React Generation        ✓ Build components
Layer 7:  Security Checks         ✓ Scan vulnerabilities
Layer 8:  Server Launch           ✓ Start localhost
Layer 9:  Screenshot Capture      ✓ 3 devices
Layer 10: Visual Analysis         ✓ Quality check
Layer 11: Auto Revision           ✓ Fix issues
Layer 12: Delivery                ✓ Package & deliver
```

**Result:** Production-ready React app in outputs/

---

## 🔑 Reference System

| Reference | Folder | Answers | Source |
|-----------|--------|---------|--------|
| **DevBlock** | `devblock/` | How it should LOOK | devblock.net |
| **Onixnet** | `onixnet/` | How it should READ | onixnet.com |
| **Minto** | `onixnet/` | How it should be STRUCTURED | Minto Pyramid |
| **BCG** | `onixnet/` | What it should SAY | BCG Research |

---

## ✨ Key Features

✅ **Multi-layer analysis** before generation
✅ **Dual reference system** — design (DevBlock) + content (Onixnet)
✅ **Minto Pyramid** content structure (SCQA, answer-first)
✅ **BCG-aligned** agentic AI positioning
✅ **Metrics-driven** copy on every page
✅ **Always React components**, never HTML
✅ **Security checks** built-in
✅ **Screenshot automation** with analysis
✅ **Auto-revision** if issues found

---

## 📚 Documentation

- **README.md** ← You are here
- **ENHANCED_AUTOMATION_SYSTEM_v2.md** - Complete workflow
- **COMMAND_REFERENCE.md** - All shortcuts
- **QUICK_START.md** - 5-minute start
- **docs/** - Additional guides

---

## 🎯 Your First 3 Actions

1. **Read:** `ENHANCED_AUTOMATION_SYSTEM_v2.md`
2. **Fetch:** `/fetch main` (18 pages) + `/fetch ref` (24 pages across design + content)
3. **Create:** `/create home`

---

**System is ready! Type `/help` to begin.** 🚀

**Version:** 2.0 | **Status:** ✅ Production Ready | **Content:** ✅ 44 files across 3 sources

# RADIANT AUTOMATION - ENHANCED MULTI-LAYER SYSTEM v2.0

## 🎯 System Overview

This is a **fully automated, multi-layer system** that creates React-based pages with security checks, context analysis, and automated verification.

**Key Principle:** User says "create this page" → System handles EVERYTHING automatically.

---

## 🔄 COMPLETE AUTOMATION FLOW

### User Input: "Create a homepage for Radiant Digital"

```
┌─────────────────────────────────────────────────────────────┐
│                    USER REQUEST RECEIVED                     │
│            "Create a homepage for Radiant Digital"           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  LAYER 1: CONTEXT ANALYSIS                   │
│ ✓ Load master context from content/master-context/          │
│ ✓ Read radiant-digital-context.md                           │
│ ✓ Extract company profile, services, audience               │
│ ✓ Understand business positioning                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              LAYER 2: BUSINESS REQUIREMENTS                  │
│ ✓ Review company goals and objectives                       │
│ ✓ Identify target audience needs                            │
│ ✓ Determine key messaging priorities                        │
│ ✓ Define conversion objectives                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              LAYER 3: REFERENCE SITE ANALYSIS                │
│ ✓ Load content/reference-websites/devblock-*.md            │
│ ✓ Reference: https://devblock.net/ (12 pages)                    │
│ ✓ Extract design patterns, colors, typography               │
│ ✓ Identify layout structures & interaction patterns         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  LAYER 4: SKILL ACTIVATION                   │
│ ✓ Load BRAND DESIGN SYSTEM from this document               │
│ ✓ Load REFERENCE SITE LAYOUT PATTERNS from this document    │
│ ✓ Load CONTENT WRITING GUIDELINES from this document        │
│ ✓ Apply frontend-design skill (distinctive aesthetics)      │
│ ✓ Content writing expertise activated                       │
│ ✓ React component best practices loaded                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│               LAYER 5: PLANNING & STRUCTURE                  │
│                                                              │
│ Create execution plan:                                       │
│   1. Component hierarchy:                                    │
│      - HomePage.jsx (main)                                   │
│      - Hero.jsx (section)                                    │
│      - Services.jsx (section)                                │
│      - Testimonials.jsx (section)                            │
│      - CTA.jsx (section)                                     │
│                                                              │
│   2. Content plan:                                           │
│      - Hero: [headline, subheadline, CTA]                    │
│      - Services: [3 key services with descriptions]          │
│      - Social proof: [stats, testimonials]                   │
│      - Final CTA: [conversion-focused]                       │
│                                                              │
│   3. Design system (from BRAND DESIGN SYSTEM section):       │
│      - Colors: Radiant brand palette (see Color Tokens)      │
│        Primary: #91C46B (Brand Green), #044862 (Dark Teal)   │
│        Dark: #09465D (Navy), #11174F (Navy Deep)             │
│        Accent: #C7DD75 (Lime), #6173DE (Blue), #F0974E      │
│        Backgrounds: #F4F9FC, #F5F8F9, #EFE7FC, #FADFC8      │
│        Text: #303133, #101828, #4D5355, #475467              │
│      - Typography: Poppins (headings/body), Inter (meta/CTA) │
│        H1: 42-58px/600-700, H2: 34-36px, Body: 16px         │
│      - Layout: Reference site patterns (see LAYOUT section)  │
│        Flexbox grids, alternating sections, card layouts      │
│        Hero → Services → Case Studies → Testimonials → CTA   │
│      - Animations: Framer Motion (purposeful motion)         │
│        fadeInUp, staggerChildren, scroll-triggered reveals    │
│      - UI Components: Pill buttons (30px radius),            │
│        Cards (16px radius, subtle shadow), Sticky header      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                LAYER 6: REACT GENERATION                     │
│                                                              │
│ Generate React components (NOT plain HTML):                  │
│                                                              │
│ 1. Create component-based structure:                         │
│    HomePage.jsx                                              │
│    ├── Hero.jsx                                              │
│    ├── Services.jsx                                          │
│    ├── Testimonials.jsx                                      │
│    └── CTA.jsx                                               │
│                                                              │
│ 2. Implement with:                                           │
│    ✓ Functional components                                   │
│    ✓ React hooks (useState, useEffect)                       │
│    ✓ Props for reusability                                   │
│    ✓ Framer Motion for animations                            │
│    ✓ Tailwind CSS for styling                                │
│    ✓ Proper imports and exports                              │
│                                                              │
│ 3. Apply skills:                                             │
│    ✓ Frontend-design skill for aesthetics                    │
│    ✓ Content strategy for copy                               │
│    ✓ Accessibility standards (WCAG 2.1 AA)                   │
│                                                              │
│ Output location: outputs/[page-name]/                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  LAYER 7: SECURITY CHECKS                    │
│                                                              │
│ Automated security scan:                                     │
│                                                              │
│ ✓ XSS vulnerability check                                    │
│   - Sanitize all user inputs                                 │
│   - Validate dangerouslySetInnerHTML usage                   │
│   - Escape dynamic content                                   │
│                                                              │
│ ✓ Dependency vulnerabilities                                 │
│   - Run: npm audit                                           │
│   - Fix: npm audit fix --force (if safe)                     │
│   - Report: Log any remaining issues                         │
│                                                              │
│ ✓ Code quality checks                                        │
│   - Remove console.logs                                      │
│   - Clean unused imports                                     │
│   - Validate prop types                                      │
│   - Check for dead code                                      │
│                                                              │
│ ✓ Authentication/Authorization                               │
│   - Protected routes configured                              │
│   - Secure token handling                                    │
│   - Input validation on forms                                │
│                                                              │
│ ✓ Performance checks                                         │
│   - Lazy loading implemented                                 │
│   - Code splitting configured                                │
│   - Images optimized                                         │
│                                                              │
│ Report: security-report.md generated                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              LAYER 8: LOCAL SERVER LAUNCH                    │
│                                                              │
│ 1. Navigate to project:                                      │
│    $ cd /home/claude/radiant-homepage                        │
│                                                              │
│ 2. Install dependencies:                                     │
│    $ npm install --silent                                    │
│                                                              │
│ 3. Start development server:                                 │
│    $ npm run dev                                             │
│                                                              │
│ 4. Wait for server ready:                                    │
│    ⏳ Waiting for http://localhost:5173                      │
│    ✓ Server running                                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              LAYER 9: SCREENSHOT CAPTURE                     │
│                                                              │
│ 1. Install Playwright (if not installed):                    │
│    $ npx playwright install chromium --quiet                 │
│                                                              │
│ 2. Capture screenshots:                                      │
│                                                              │
│    Desktop (1920x1080):                                      │
│    $ npx playwright screenshot                               │
│      http://localhost:5173                                   │
│      /radiant-automation-workspace/screenshots/desktop/      │
│      homepage_desktop_20260220_144530.png                    │
│      --viewport-size=1920,1080                               │
│                                                              │
│    Tablet (768x1024):                                        │
│    $ npx playwright screenshot                               │
│      http://localhost:5173                                   │
│      /radiant-automation-workspace/screenshots/tablet/       │
│      homepage_tablet_20260220_144532.png                     │
│      --viewport-size=768,1024                                │
│                                                              │
│    Mobile (375x667):                                         │
│    $ npx playwright screenshot                               │
│      http://localhost:5173                                   │
│      /radiant-automation-workspace/screenshots/mobile/       │
│      homepage_mobile_20260220_144534.png                     │
│      --viewport-size=375,667                                 │
│                                                              │
│ 3. Screenshots saved to workspace                            │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              LAYER 10: VISUAL ANALYSIS                       │
│                                                              │
│ Analyze captured screenshots:                                │
│                                                              │
│ ✓ Layout verification:                                       │
│   - Check component positioning                              │
│   - Verify responsive behavior                               │
│   - Validate spacing and alignment                           │
│                                                              │
│ ✓ Design quality (against BRAND DESIGN SYSTEM):              │
│   - Typography: Poppins/Inter fonts loading correctly?       │
│   - Colors: Brand Green #91C46B, Dark Teal #044862 applied? │
│   - Backgrounds: Alternating white/#F4F9FC/#09465D pattern?  │
│   - Buttons: Pill shape (30px radius), correct colors?       │
│   - Cards: 16px radius, shadow-card applied?                 │
│   - Visual polish present?                                   │
│   - Animations rendering (fadeInUp, stagger, hover)?         │
│                                                              │
│ ✓ Content display:                                           │
│   - All text visible?                                        │
│   - Images loading?                                          │
│   - CTAs prominent?                                          │
│   - No overflow issues?                                      │
│                                                              │
│ ✓ Accessibility:                                             │
│   - Color contrast sufficient?                               │
│   - Text readable?                                           │
│   - Touch targets sized properly?                            │
│                                                              │
│ Decision:                                                    │
│   ✓ PASS → Proceed to delivery                               │
│   ⚠ NEEDS REVISION → Go to Layer 11                          │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│            LAYER 11: AUTOMATED REVISION (if needed)          │
│                                                              │
│ IF issues found:                                             │
│                                                              │
│ 1. Log specific problems:                                    │
│    - "Hero text overflows on mobile"                         │
│    - "Color contrast insufficient in CTA"                    │
│    - "Service cards not aligned"                             │
│                                                              │
│ 2. Apply fixes:                                              │
│    - Adjust responsive breakpoints                           │
│    - Update color values                                     │
│    - Fix flexbox/grid layouts                                │
│                                                              │
│ 3. Rebuild and retest:                                       │
│    - npm run build                                           │
│    - Restart dev server                                      │
│    - Recapture screenshots                                   │
│    - Re-analyze                                              │
│                                                              │
│ 4. Maximum 3 iterations                                      │
│    - If still failing, request user guidance                 │
│                                                              │
│ ELSE: Proceed to delivery                                    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  LAYER 12: FINAL DELIVERY                    │
│                                                              │
│ 1. Copy to outputs:                                          │
│    $ cp -r [build-dir]                                       │
│       outputs/[page-name]/                                   │
│                                                              │
│ 2. Generate documentation:                                   │
│    ✓ README.md (setup instructions)                          │
│    ✓ COMPONENTS.md (component docs)                          │
│    ✓ SECURITY.md (security measures)                         │
│    ✓ DEPLOYMENT.md (deployment guide)                        │
│                                                              │
│ 3. Create delivery package:                                  │
│    outputs/homepage/                                         │
│    ├── src/ (React components)                               │
│    ├── public/ (static assets)                               │
│    ├── screenshots/ (verification images)                    │
│    ├── docs/ (documentation)                                 │
│    ├── package.json                                          │
│    └── README.md                                             │
│                                                              │
│ 4. Update project log:                                       │
│    logs/PROJECT_LOG.md updated with:                         │
│    - Timestamp                                               │
│    - Action performed                                        │
│    - Files created                                           │
│    - Verification status                                     │
│                                                              │
│ 5. Present to user:                                          │
│    ✓ Show verification screenshots                           │
│    ✓ Summary of what was created                             │
│    ✓ Security report highlights                              │
│    ✓ Next steps recommendations                              │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    ✅ COMPLETE!
```

---

## 🎯 COMMAND SHORTCUTS

### Quick Commands (Type these exactly)

```bash
# Content Management
/fetch main          → Fetch content from main website
/fetch ref           → Fetch content from reference website
/refresh             → Refresh all content (main + ref)
/show context        → Display master context

# Screenshot Management
/clear screenshots   → Remove all screenshots
/clear old          → Remove screenshots older than 7 days
/archive screenshots → Archive then clear screenshots

# Page Generation
/create home        → Create homepage
/create about       → Create about page
/create services    → Create services page
/create contact     → Create contact page
/create [name]      → Create custom page

# Section Add/Update (same 12-layer process as /create)
/update home hero           → Update the Hero section on homepage
/update home testimonials   → Add/update Testimonials on homepage
/update about leadership    → Add Leadership section to about page
/update [page] [section]    → Add or update any section on any page

# Status & Review
/status             → Show project status
/logs               → Show recent activity
/audit              → Run quality audit

# Quick Actions
/reset              → Reset workspace
/backup             → Backup master context
/help               → Show all commands
```

---

## 📋 DETAILED COMMAND SPECIFICATIONS

### `/fetch main`
**Purpose:** Fetch content from main Radiant website
**Full Process:**
```
1. web_fetch('https://stage.radiant.digital/')
2. web_fetch('https://stage.radiant.digital/what-we-do/')
3. web_fetch('https://stage.radiant.digital/markets/')
4. web_fetch('https://stage.radiant.digital/contact-us/')
5. web_fetch('https://stage.radiant.digital/insights/')
6. web_fetch('https://stage.radiant.digital/events/')
7. web_fetch('https://stage.radiant.digital/careers/')
8. web_fetch('https://stage.radiant.digital/digital-strategy-and-experience/')
9. web_fetch('https://stage.radiant.digital/analytics-data-science-and-ai/')
10. web_fetch('https://stage.radiant.digital/cloud-transformation/')
11. web_fetch('https://stage.radiant.digital/product-development-and-integration/')
12. web_fetch('https://stage.radiant.digital/skilled-workforce-solutions/')
13. web_fetch('https://stage.radiant.digital/who-we-are/')
14. web_fetch('https://stage.radiant.digital/cx-accelerator/')
15. web_fetch('https://stage.radiant.digital/product-accelerator/')
16. web_fetch('https://stage.radiant.digital/sales-accelerator/')
17. web_fetch('https://stage.radiant.digital/tracklynk/')
18. web_fetch('https://stage.radiant.digital/privly/')

19. Save to content/current-website/*.md
20. Update master context
21. Report what changed

Content Files (18 pages):
  - homepage.md
  - what-we-do.md
  - markets.md
  - contact-us.md
  - insights.md
  - events.md
  - careers.md
  - digital-strategy-and-experience.md
  - analytics-data-science-and-ai.md
  - cloud-transformation.md
  - product-development-and-integration.md
  - skilled-workforce-solutions.md
  - who-we-are.md
  - cx-accelerator.md
  - product-accelerator.md
  - sales-accelerator.md
  - tracklynk.md
  - privly.md

Last Fetched: 2026-02-20
Status: ✅ All 18 pages fetched and saved
```

### `/fetch ref`
**Purpose:** Fetch content from reference website (DevBlock - https://devblock.net/)
**Full Process:**
```
1.  web_fetch('https://devblock.net/')
2.  web_fetch('https://devblock.net/about')
3.  web_fetch('https://devblock.net/services/capabilities-overview')
4.  web_fetch('https://devblock.net/services/product-design')
5.  web_fetch('https://devblock.net/services/ai')
6.  web_fetch('https://devblock.net/services/devops')
7.  web_fetch('https://devblock.net/services/spatial-design')
8.  web_fetch('https://devblock.net/work')
9.  web_fetch('https://devblock.net/products/cad-lite')
10. web_fetch('https://devblock.net/blog')
11. web_fetch('https://devblock.net/careers')
12. web_fetch('https://devblock.net/contact')

13. Analyze design patterns
14. Extract colors, typography, layouts
15. Save to content/reference-websites/
16. Update design direction in master context
17. Report design insights

Content Files (12 pages):
  - devblock-homepage.md
  - devblock-about.md
  - devblock-services.md
  - devblock-work.md
  - devblock-contact.md
  - devblock-blog.md
  - devblock-careers.md
  - devblock-service-product-design.md
  - devblock-service-ai.md
  - devblock-service-devops.md
  - devblock-service-spatial-design.md
  - devblock-product-cad-lite.md

Last Fetched: 2026-03-06
Status: ✅ All 12 pages fetched and saved
```

### `/refresh`
**Purpose:** Refresh both main and reference content
**Full Process:**
```
1. Execute /fetch main
2. Execute /fetch ref
3. Regenerate master context
4. Archive previous version
5. Create CHANGELOG entry
6. Report all changes
```

### `/clear screenshots`
**Purpose:** Remove all screenshot files
**Full Process:**
```
1. List all files in screenshots/desktop/, tablet/, mobile/
2. Remove all .png, .jpg, .jpeg files
3. Keep folder structure intact
4. Report space freed
5. Update PROJECT_LOG.md
```

### `/clear old`
**Purpose:** Remove screenshots older than 7 days
**Full Process:**
```
1. Check file timestamps
2. Identify files older than 7 days
3. Move to archive/ folder
4. Report what was archived
5. Report space freed
```

### `/archive screenshots`
**Purpose:** Archive screenshots before clearing
**Full Process:**
```
1. Create zip: screenshots_YYYYMMDD_HHMMSS.zip
2. Compress all screenshots
3. Save to screenshots/archive/
4. Clear original screenshots
5. Report archive location and size
```

### `/update [page-type] [section-name]`
**Purpose:** Add a new section to or update an existing section in an already-generated page
**Trigger:** Also triggered when user asks conversationally, e.g., "add a partners section to the homepage" or "update the hero on the about page"
**Full Process:** (Executes all 12 layers automatically, scoped to the section)
```
1. Context Analysis — Load master context, understand brand and business requirements
2. Business Requirements — Identify goals relevant to this section
3. Reference Site Analysis — Extract design patterns applicable to this section type
4. Skill Activation — Apply frontend design, content strategy, React best practices
5. Planning & Structure — Determine:
   - Does the section already exist? → UPDATE the component file
   - Is it a new section? → CREATE a new component file
   - Where does it fit in the page flow? → Update page file import & placement
6. React Generation — Generate or modify the section component:
   - New section: Create src/components/[PageName]/[SectionName].jsx
   - Existing section: Edit the existing component file
   - Update src/pages/[PageName].jsx to import and position the section
   - Match existing design system (Tailwind tokens, Framer Motion, Lucide icons)
7. Security Checks — Scan modified/new files for vulnerabilities
8. Local Server Launch — Rebuild and verify (npm run dev)
9. Screenshot Capture — Desktop (1920x1080), Tablet (768x1024), Mobile (375x667)
10. Visual Analysis — Verify section integrates correctly with the rest of the page
11. Automated Revision — Fix integration issues if found (max 3 iterations)
12. Final Delivery — Update docs, update PROJECT_LOG.md

Output: Updated React page in outputs/[page-name]/
```

**Examples:**
```
/update home testimonials     → Add/update Testimonials section on homepage
/update home hero             → Redesign the Hero section on the homepage
/update about leadership      → Add a Leadership Team section to about page
/update services pricing      → Add a Pricing section to services page
/update contact faq           → Add an FAQ section to the contact page
```

### `/create [page-type]`
**Purpose:** Create any page type
**Full Process:** (Executes all 12 layers automatically)
```
1. Context Analysis
2. Business Requirements
3. Reference Site Analysis
4. Skill Activation
5. Planning & Structure
6. React Generation (component-based!)
7. Security Checks
8. Local Server Launch
9. Screenshot Capture
10. Visual Analysis
11. Automated Revision (if needed)
12. Final Delivery

Output: Complete React-based page in outputs/
```

### `/status`
**Purpose:** Show current project status
**Output:**
```
📊 RADIANT AUTOMATION STATUS

Content:
✓ Main website (stage.radiant.digital): 18 pages fetched 2026-02-20
✓ Reference site (devblock.net): 12 pages fetched 2026-03-06
✓ Master context version: 2.0

Pages Created:
✓ Homepage: outputs/homepage/ (verified)
✓ About: outputs/about-page/ (verified)
⬜ Services: Not created
⬜ Contact: Not created

Screenshots:
📸 Total: 12 files
💾 Storage: 18.4 MB
🗓️ Last cleanup: 2024-02-18

Security:
✅ Last audit: 2024-02-20
⚠️ Vulnerabilities: 0 critical, 1 medium

Next Actions:
→ Create services and contact pages
→ Clear old screenshots (5 days old)
→ Run security audit
```

### `/logs`
**Purpose:** Show recent activity
**Output:** Last 10 entries from PROJECT_LOG.md

### `/audit`
**Purpose:** Run comprehensive quality audit
**Checks:**
```
✓ Brand consistency: Colors match tokens (#91C46B, #044862, #09465D, etc.)
✓ Typography: Poppins/Inter/Raleway loaded, heading scale correct
✓ Message alignment: Brand voice, key phrases used correctly
✓ Design coherence: Alternating sections, card patterns, button styles
✓ Layout patterns: Reference site structures applied (page flow templates)
✓ Security vulnerabilities: XSS, dependencies, code quality
✓ Performance issues: Lazy loading, code splitting, image optimization
✓ Accessibility compliance: WCAG 2.1 AA, color contrast, touch targets
✓ Code quality: No console.logs, clean imports, proper component structure
✓ SEO optimization: Meta tags, heading hierarchy, semantic HTML

Generates: audit-report-YYYYMMDD.md
```

---

## 🔐 SECURITY IMPLEMENTATION

### Automated Security Checks (Layer 7)

```javascript
// 1. XSS Protection
import DOMPurify from 'dompurify';

const SafeContent = ({ html }) => {
  const clean = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};

// 2. Input Validation
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().max(500),
});

// 3. Environment Variables
// .env.local (never committed)
VITE_API_URL=https://api.radiant.digital
VITE_API_KEY=xxxxx  // Never exposed in code

// 4. Protected Routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
};

// 5. Rate Limiting (API side)
// Server-side implementation recommended

// 6. CORS Configuration
// Set appropriate CORS headers on API

// 7. CSP Headers
// Content-Security-Policy configured in deployment
```

### Security Report Generation

```markdown
# Security Report - Homepage
Date: 2024-02-20 14:45

## Vulnerabilities Scanned
✅ XSS Prevention: PASSED
   - All user inputs sanitized with DOMPurify
   - No unsafe dangerouslySetInnerHTML usage
   
✅ Dependency Audit: PASSED
   - npm audit: 0 critical, 0 high, 1 medium
   - Medium: [package name] - non-critical
   
✅ Code Quality: PASSED
   - No console.logs in production
   - Unused imports removed
   - ESLint: 0 errors, 0 warnings

✅ Authentication: IMPLEMENTED
   - Protected routes configured
   - Secure token handling
   - Session management in place

✅ Input Validation: PASSED
   - Zod schemas on all forms
   - Server-side validation ready
   - Error handling implemented

## Recommendations
1. Implement rate limiting on API
2. Add CSP headers in deployment
3. Update [medium-severity package]
4. Enable HTTPS in production

## Overall Status: ✅ SECURE FOR DEPLOYMENT
```

---

## 🎨 BRAND DESIGN SYSTEM (Mandatory for All Generated Pages)

All generated pages MUST use these exact brand tokens. These values come from the Radiant Digital master context and must be applied via Tailwind CSS configuration.

### Color Tokens

#### Primary Colors (CTAs, Accents, Key UI)

| Token | Hex Code | Tailwind Key | Usage |
|-------|----------|--------------|-------|
| **Brand Green** | `#91C46B` | `brand-green` | Primary CTA buttons, accent highlights, hover states |
| **Dark Teal** | `#044862` | `dark-teal` | Headings, primary text, link color |
| **Dark Navy** | `#09465D` | `dark-navy` | Hero backgrounds, dark sections, footer |
| **Navy Deep** | `#11174F` | `navy-deep` | Dark section backgrounds, overlays |
| **Lime Green** | `#C7DD75` | `lime-accent` | Active menu underlines, secondary accent |

#### Secondary Colors (Decorative, Tags, Tertiary)

| Token | Hex Code | Tailwind Key | Usage |
|-------|----------|--------------|-------|
| **Blue Accent** | `#6173DE` | `blue-accent` | Secondary accent, decorative elements |
| **Deep Purple** | `#596AE0` | `deep-purple` | Tertiary accent, gradient endpoints |
| **Orange** | `#F0974E` | `orange-highlight` | Highlight accent, badges, alerts |
| **Muted Green** | `#598C33` | `muted-green` | Category tags, text links |

#### Background Colors (Sections, Cards, Containers)

| Token | Hex Code | Tailwind Key | Usage |
|-------|----------|--------------|-------|
| **White** | `#FFFFFF` | `white` | Primary page background |
| **Light Cyan** | `#F4F9FC` | `bg-cyan` | Section backgrounds, card containers |
| **Light Gray** | `#F5F8F9` | `bg-gray` | Alternate section backgrounds |
| **Lavender** | `#EFE7FC` | `bg-lavender` | Highlight backgrounds |
| **Peach** | `#FADFC8` | `bg-peach` | Highlight backgrounds |
| **Off-white Blue** | `#F1F5FE` | `bg-off-blue` | Subtle section backgrounds |
| **Pale Green** | `#DAFFE4` | `bg-pale-green` | Success/highlight backgrounds |

#### Text Colors

| Token | Hex Code | Tailwind Key | Usage |
|-------|----------|--------------|-------|
| **Primary Text** | `#303133` | `text-primary` | Main body text |
| **Dark Text** | `#313638` | `text-dark` | Headings, dark body |
| **Content Black** | `#101828` | `text-black` | Primary headings |
| **Body Gray** | `#4D5355` | `text-body` | Standard body copy |
| **Paragraph Gray** | `#475467` | `text-paragraph` | Paragraph text |
| **Secondary Gray** | `#5F6466` | `text-secondary` | Secondary body text |
| **Muted Gray** | `#A3A3A3` | `text-muted` | Footer text, metadata, dates |

#### Border & Divider Colors

| Token | Hex Code | Tailwind Key | Usage |
|-------|----------|--------------|-------|
| **Light Border** | `#E2E4E4` | `border-light` | Card borders, dividers |
| **Subtle Border** | `#D7DEE3` | `border-subtle` | Section dividers |
| **Blue Border** | `#DBEEFF` | `border-blue` | Button outlines, card borders |
| **Teal Border** | `#588596` | `border-teal` | Hover state borders |

#### Gradients

| Name | CSS Definition | Usage |
|------|---------------|-------|
| **Hero Overlay** | `linear-gradient(to bottom, rgba(255,255,255,0) 23%, rgb(8,39,65) 93%)` | Hero image overlays |
| **Cyan-Purple** | `linear-gradient(135deg, rgb(6,147,227), rgb(155,81,224))` | Decorative gradients |

#### Shadows

| Level | CSS Definition | Usage |
|-------|---------------|-------|
| **Card** | `1px 8px 24px 0px rgba(197,197,197,0.25)` | Card elevation |
| **Mega-menu** | `0px 7px 9px rgba(4,38,50,0.11)` | Navigation dropdown |
| **Small** | `0px 4px 7px rgba(0,0,0,0.1)` | Subtle elevation |
| **Large** | `0px 17px 31px rgba(0,0,0,0.08)` | Modal/overlay elevation |

### Typography System

#### Font Families (Import via Google Fonts)

| Priority | Font | Tailwind Key | Usage |
|----------|------|--------------|-------|
| **Primary** | Poppins | `font-primary` | Headings, body text, navigation |
| **Secondary** | Inter | `font-secondary` | Metadata, captions, CTA buttons, tags |
| **Fallback** | Raleway | `font-fallback` | HTML base font, general fallback |

#### Heading Scale

| Element | Size | Weight | Tailwind Classes |
|---------|------|--------|-----------------|
| **H1 / Display** | `42px–58px` | `600–700` | `text-[42px] md:text-[58px] font-semibold` |
| **H2** | `34px–36px` | `600–700` | `text-[34px] md:text-[36px] font-semibold` |
| **H3** | `24px–30px` | `600` | `text-[24px] md:text-[30px] font-semibold` |
| **H4** | `18px–20px` | `600` | `text-[18px] md:text-[20px] font-semibold` |
| **H5** | `16px–18px` | `500–600` | `text-[16px] md:text-[18px] font-medium` |

#### Body Text

| Variant | Size | Weight | Line Height |
|---------|------|--------|-------------|
| **Large body** | `18px–20px` | `400` | `28px` |
| **Standard body** | `16px` | `400` | `24px` |
| **Small text** | `14px–15px` | `400–500` | `20px` |
| **Caption/Meta** | `13px` | `400–500` | `18px` |

#### Button Typography

| Property | Value |
|----------|-------|
| **Font** | Inter or Poppins |
| **Size** | `12px–16px` |
| **Weight** | `500–600` |
| **Letter Spacing** | `0.1em` to `0.5px` |
| **Transform** | `uppercase` |

#### Navigation Typography

| Property | Value |
|----------|-------|
| **Font** | Poppins |
| **Size** | `16px–18px` |
| **Weight** | `500–600` |
| **Active State** | 3px underline `#C7DD75` (lime-accent) |

### UI Component Patterns

#### Buttons

- **Primary CTA:** `#91C46B` background, white text, `border-radius: 30px`, `padding: 12px 24px`
- **Secondary:** Transparent background, `#588596` border, dark text
- **Icon Button:** Circular, `border: 2px #DBEEFF`, `border-radius: 50%`
- **Hover:** Scale transform `1.05–1.2`, elevated shadow, darker green tone
- **Arrow icons:** Include `ArrowRight` from Lucide for forward momentum on CTAs

#### Cards

- White background, `border-radius: 16px`, box-shadow: `1px 8px 24px 0px rgba(197,197,197,0.25)`
- Hover: Elevated shadow (`0px 17px 31px rgba(0,0,0,0.08)`), optional scale `1.02`
- Padding: `24px–32px`
- Dual-image system for portfolio cards: default + hover image variants

#### Navigation

- Fixed horizontal header, white background, 1px bottom border `#E2E4E4`
- Logo-centered with flanking menu items
- Mega-menu dropdowns with shadow `0px 7px 9px rgba(4,38,50,0.11)`
- Mobile: Hamburger toggle
- Sticky header activating at 80px scroll threshold (add `.active` class)

#### Sections

- Alternating backgrounds: white → `#F4F9FC` → `#09465D` (dark navy)
- Generous vertical padding: `60px–100px` (`py-[60px] md:py-[100px]`)
- Constrained content width: `max-w-6xl mx-auto` with centered alignment
- Section dividers with visual hierarchy

#### Border Radius Standards

| Element | Value | Tailwind |
|---------|-------|----------|
| **Buttons (pill)** | `30px` | `rounded-[30px]` |
| **Buttons (rounded)** | `20px` | `rounded-[20px]` |
| **Cards** | `16px` | `rounded-2xl` |
| **Small elements** | `8px` | `rounded-lg` |

---

## 📐 REFERENCE SITE LAYOUT STRUCTURES & INTERACTION PATTERNS

These patterns are extracted from the DevBlock reference website (https://devblock.net/) and must be adapted with Radiant Digital's brand identity.

### Page Flow Templates (Adapt Per Page Type)

#### Homepage Flow
```
Hero (brand tagline + CTA) → "What We Do" overview → Service Cards (numbered 01-06)
→ Case Studies / Proof Points → Client Logos → Testimonials Carousel
→ Final CTA → Footer
```

#### Services Page Flow
```
Hero (value proposition) → Technology Pillars (4-6 cards) → Industries Grid
→ Core Services (numbered cards) → Process Methodology → Team → CTA → Footer
```

#### About Page Flow
```
Hero (team philosophy) → Statistics (key metrics with "+" format)
→ Mission Statement → Core Values → Leadership Profiles
→ Careers CTA → Footer
```

#### Contact Page Flow
```
Hero + intro text → Office Locations (with illustrations)
→ Contact Form (5 fields) → Footer
```

#### Case Study Flow
```
Background → Problem (3 challenges) → Solution (3 approaches)
→ Highlights (design system, pages, features) → Results/Metrics → Related Work CTA
```

#### Service Detail Page Flow
```
Hero ("We Bring Ideas to Life") → Research & Strategy (interactive cards)
→ 6 Service Pillars (alternating text-left/text-right)
→ Process Flowchart → Case Studies → CTA Footer
```

### Layout Structure Patterns

#### Grid Systems
- **Technology/Service cards:** 4-column grid on desktop → 2-column on tablet → 1-column on mobile
- **Industry grids:** 3x3 responsive grid with equal-sized cards
- **Portfolio cards:** Flexbox responsive layout with `2em` gaps
- **Service cards:** Numbered (01-07) with consistent card structure

#### Content Block Patterns
- **Asymmetrical balance:** Image + text pairings alternate sides section by section
- **Image-text ratio:** ~60% imagery, 40% text for visual-first design
- **Two-column content blocks** for values, features, and comparison sections
- **Single-column mobile-responsive** design with vertical stacking

#### Card Design Pattern (Numbered Services)
Each service/capability card features:
1. Sequential numbering badge (01, 02, etc.) in large typeface
2. H3 heading title
3. Descriptive paragraph (1-2 sentences)
4. 3-5 bulleted sub-services
5. Decorative polygon/geometric icon accent

#### Information Hierarchy
1. **Primary:** Capability names (numbered, bold, `#044862` Dark Teal)
2. **Secondary:** Descriptive paragraphs (`#4D5355` Body Gray)
3. **Tertiary:** Supporting bullet points (`#475467` Paragraph Gray)
4. **Supporting:** Decorative graphics and icons

#### Section Flow Pattern
```
Vision → Capabilities → Industries → Process → Action
(natural awareness-to-conversion journey)
```

### Interaction & Animation Patterns

#### Navigation Interactions
- Sticky header adds `.active` class at 80px scroll threshold
- Dropdown menu expand/collapse with icon state rotation
- Mobile: hamburger toggle with slide-in navigation

#### Scroll-Based Animations (Framer Motion)
- **fadeInUp:** Elements rise 20-30px with opacity fade (default entry animation)
- **staggerChildren:** Container children animate sequentially with 0.1-0.2s delay
- **whileInView:** Sections animate when scrolled into viewport
- **Scroll-triggered counters:** Statistics count up when section enters view

#### Hover Interactions
- **Cards:** Scale `1.02`, elevated shadow, optional border color change
- **Buttons:** Scale `1.05-1.2`, shadow elevation, color darkening
- **Images:** Dual-image system (default to hover variant via CSS)
- **Links:** Color transition to `#91C46B` (Brand Green)

#### Carousel/Slider Patterns
- **Testimonial carousel:** Quote rotation with 4+ client quotes, auto-advance
- **Partner logo carousel:** Horizontal auto-scroll
- **Case study swiper:** Card carousel with right-pointing arrows for progression
- **Image carousel:** Rotating images every 15 seconds (user-clickable)

#### CTA Strategy (Multi-Layered Funnel)
1. **Hero CTA:** Primary action ("Let's Embark") - `#91C46B` button
2. **Mid-page CTAs:** Engagement deepening ("Explore our services", "View case studies")
3. **Tier/Pricing CTAs:** Context-specific action verbs
4. **Case Study CTAs:** "Learn More" for deeper engagement
5. **Final CTA:** Conversion-focused ("Ready to transform?") - full-width section with `#09465D` background
6. **Footer:** Email + phone for direct outreach

### Visual Elements
- Abstract geometric shapes as decorative elements (not photography-heavy)
- Product screenshots for case study cards with hover image variants
- Minimal stock photography; design-forward aesthetic
- Quote mark icons for testimonials, arrow icons for CTAs
- Numbered badges providing visual rhythm (01, 02, 03...)
- SVG decorative shapes for section dividers
- Polygon/geometric graphics distinguishing sections
- Whitespace-heavy design promoting content breathing room

---

## ✍️ CONTENT WRITING GUIDELINES

All generated page copy must follow these patterns derived from Radiant Digital's brand voice and DevBlock's proven content writing approach.

### Brand Voice (Radiant Digital)
- **Professional yet approachable** - confident without arrogance
- **AI-first and innovation-forward** - embed AI as a capability, not an add-on
- **Outcome-focused with quantified results** - always include metrics
- **Partnership-oriented** - use "guide," "embark," "together"
- **Human-centered despite technology focus** - empathy for customers, employees, communities

### Key Brand Phrases (Use Throughout)
- "Transformation is the journey. Digital enablement is the map."
- "Let's Embark"
- "Customer centric to the core"
- "AI-first digital transformation partner"
- "We're packed to guide your digital journey"
- "Deliver products at the speed of change"

### Headline Writing Patterns
- **Hero headlines:** Short, punchy, transformation-oriented (8-12 words max)
  - Pattern: `[Action Verb] + [Object] + [With/Through] + [Radiant Differentiator]`
  - Example: "Transform Your Enterprise with AI-First Digital Solutions"
- **Section headings:** Benefit-focused with explanatory subheadings
  - Pattern: `[Benefit Statement]` + subtitle: `[How We Deliver It]`
- **Card titles:** Concise, action-oriented (3-6 words)
  - Example: "Data to Insight", "Scale & Speed", "Cloud Transformation"

### Body Copy Patterns
- **Sentence length:** Average 10-15 words, scannable
- **Structure:** Parallel structure for feature lists
- **Info density:** Punchy intros + 1-2 sentence elaborations
- **Vocabulary:** Benefits-focused, partnership-oriented
- **Active voice:** "We deliver..." not "Solutions are delivered..."
- **Action verbs:** "Transform," "Accelerate," "Deliver," "Guide," "Embark," "Optimize"

### Section Copy Templates

#### Hero Section
```
Headline: [Transformation-oriented statement]
Subheading: [1-2 sentences explaining how, mentioning AI]
CTA: "LET'S EMBARK" (primary) | "See Our Services" (secondary)
```

#### Services Section
```
Section Title: [Benefit-focused heading]
Intro: [1 sentence value proposition]
Per Service Card:
  - Title: [Service Name]
  - Description: [1-2 sentences, outcome-focused]
  - Metrics: [Quantified results, e.g., "50% increase in engagement"]
  - Sub-items: [3-5 bulleted capabilities]
```

#### Testimonials Section
```
Quote: [Specific outcome + emotional trust indicator]
Attribution: [Name, Title, Company]
Pattern: "Radiant is [superlative]. They [specific capability]. [Outcome statement]."
```

#### Case Study Cards
```
Title: [Action-oriented, e.g., "Scaling 5x via Intelligent Automation"]
Description: [Problem → Solution → Impact in 1-2 sentences]
Services Used: [Tag list]
CTA: "Learn More →"
```

#### Statistics / Proof Points
```
Format: [Large Number]+  [Metric Description]
Examples:
  "50%" + "increase in customer engagement"
  "40%" + "faster time to market"
  "30%" + "reduction in operational costs"
Always use "+" suffix on numbers to suggest ongoing growth.
```

#### Final CTA Section
```
Headline: [Inviting, collaborative]
  Example: "Ready to Transform Your Digital Future?"
Subtext: [Low-pressure, relationship-building]
  Example: "Let's discuss how Radiant Digital can guide your journey."
CTA Button: "LET'S EMBARK" (#91C46B background, white text)
```

### Tone Calibration by Page Type

| Page Type | Tone | Focus |
|-----------|------|-------|
| **Homepage** | Inspiring, confident | Vision + breadth of capability |
| **Services** | Expert, outcome-driven | Specific results + methodology |
| **About** | Personable, values-led | Culture + leadership + philosophy |
| **Contact** | Inviting, conversational | Relationship-building, friction removal |
| **Case Studies** | Evidence-based, specific | Problem → Solution → Impact with metrics |
| **Careers** | Energizing, growth-oriented | Innovation + culture + opportunity |

---

## 🏗️ REACT COMPONENT STRUCTURE

### Enforced Component Architecture

Every page MUST follow this structure:

```
/outputs/[page-name]/
├── src/
│   ├── components/
│   │   ├── [PageName]/
│   │   │   ├── Hero.jsx              ← React component
│   │   │   ├── Services.jsx          ← React component
│   │   │   ├── Testimonials.jsx      ← React component
│   │   │   └── CTA.jsx               ← React component
│   │   └── ui/
│   │       ├── Button.jsx            ← Reusable component
│   │       ├── Card.jsx              ← Reusable component
│   │       └── Input.jsx             ← Reusable component
│   ├── pages/
│   │   └── [PageName].jsx            ← Main page component
│   ├── styles/
│   │   └── globals.css          ← @import Google Fonts (Poppins, Inter, Raleway)
│   ├── utils/
│   │   ├── cn.js                ← clsx + tailwind-merge utility
│   │   └── animations.js       ← Framer Motion variants (fadeInUp, stagger, etc.)
│   ├── hooks/
│   │   └── [custom hooks if needed]
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

### Tailwind Config Template (MANDATORY)

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#91C46B',
          'green-dark': '#598C33',
          lime: '#C7DD75',
        },
        teal: {
          dark: '#044862',
          navy: '#09465D',
          deep: '#11174F',
          border: '#588596',
        },
        accent: {
          blue: '#6173DE',
          purple: '#596AE0',
          orange: '#F0974E',
        },
        surface: {
          white: '#FFFFFF',
          cyan: '#F4F9FC',
          gray: '#F5F8F9',
          lavender: '#EFE7FC',
          peach: '#FADFC8',
          'off-blue': '#F1F5FE',
          'pale-green': '#DAFFE4',
        },
        content: {
          primary: '#303133',
          dark: '#313638',
          black: '#101828',
          body: '#4D5355',
          paragraph: '#475467',
          secondary: '#5F6466',
          muted: '#A3A3A3',
        },
        border: {
          light: '#E2E4E4',
          subtle: '#D7DEE3',
          blue: '#DBEEFF',
          teal: '#588596',
        },
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
        fallback: ['Raleway', 'sans-serif'],
      },
      boxShadow: {
        card: '1px 8px 24px 0px rgba(197,197,197,0.25)',
        'mega-menu': '0px 7px 9px rgba(4,38,50,0.11)',
        sm: '0px 4px 7px rgba(0,0,0,0.1)',
        lg: '0px 17px 31px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        pill: '30px',
        button: '20px',
        card: '16px',
      },
    },
  },
  plugins: [],
};
```

### Component Template

```jsx
// src/pages/HomePage.jsx
import { motion } from 'framer-motion';
import Header from '@/components/HomePage/Header';
import Hero from '@/components/HomePage/Hero';
import Services from '@/components/HomePage/Services';
import ProofPoints from '@/components/HomePage/ProofPoints';
import Testimonials from '@/components/HomePage/Testimonials';
import CTA from '@/components/HomePage/CTA';
import Footer from '@/components/HomePage/Footer';

const HomePage = () => {
  return (
    <main className="min-h-screen font-primary text-content-primary">
      <Header />
      <Hero />
      <Services />
      <ProofPoints />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default HomePage;
```

```jsx
// src/components/HomePage/Hero.jsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { fadeInUp } from '@/utils/animations';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 bg-teal-navy">
      {/* Hero overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-teal-deep/90" />
      <div className="relative max-w-6xl mx-auto text-center">
        <motion.h1
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="text-[42px] md:text-[58px] font-primary font-bold text-white mb-6 leading-tight"
        >
          Transformation is the Journey.
          <span className="block text-brand-lime">Digital Enablement is the Map.</span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Your AI-first digital transformation partner — driving results
          with greater speed, precision, and efficiency.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
        >
          <Button size="lg" className="group bg-brand-green hover:bg-brand-green-dark text-white rounded-pill px-8 py-3 font-secondary font-semibold uppercase tracking-wider">
            LET'S EMBARK
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
```

```jsx
// src/components/ui/Button.jsx
import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-brand-green hover:bg-brand-green-dark text-white',
  secondary: 'bg-transparent border-2 border-teal-border text-teal-dark hover:bg-surface-cyan',
  icon: 'rounded-full border-2 border-border-blue hover:scale-110',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center font-secondary font-semibold
        uppercase tracking-wider rounded-pill transition-all duration-200
        shadow-sm hover:shadow-lg
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
```

```js
// src/utils/animations.js
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

export const counterUp = (target, duration = 2) => ({
  initial: { count: 0 },
  animate: { count: target, transition: { duration, ease: 'easeOut' } },
});
```

```jsx
// src/components/ui/Card.jsx
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      className={`
        bg-white rounded-card p-6 md:p-8 shadow-card
        border border-border-light
        hover:shadow-lg transition-shadow duration-300
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
```

### Section Background Pattern Template

```jsx
{/* Alternating section backgrounds per reference site pattern */}
<section className="bg-white py-[60px] md:py-[100px]">...</section>
<section className="bg-surface-cyan py-[60px] md:py-[100px]">...</section>
<section className="bg-teal-navy py-[60px] md:py-[100px] text-white">...</section>
<section className="bg-surface-gray py-[60px] md:py-[100px]">...</section>
<section className="bg-teal-deep py-[60px] md:py-[100px] text-white">...</section>
```

---

## 📊 PROJECT LOG AUTO-UPDATE

Every action automatically updates `logs/PROJECT_LOG.md`:

```markdown
### 2024-02-20 14:45 - Homepage Created
**Action:** Create homepage with full automation
**Command:** /create home
**Details:**
- Context analyzed from master-context/MASTER_CONTEXT.md
- Reference site design patterns applied
- Frontend-design skill utilized
- React components generated (5 components)
- Security checks passed
- Screenshots captured (3 devices)
- Visual verification: ✓ PASSED

**Files Created:**
- outputs/homepage/src/pages/HomePage.jsx
- outputs/homepage/src/components/HomePage/Hero.jsx
- outputs/homepage/src/components/HomePage/Services.jsx
- outputs/homepage/src/components/HomePage/Testimonials.jsx
- outputs/homepage/src/components/HomePage/CTA.jsx
- screenshots/desktop/homepage_desktop_20240220_144530.png
- screenshots/tablet/homepage_tablet_20240220_144532.png
- screenshots/mobile/homepage_mobile_20240220_144534.png

**Security Report:**
- Vulnerabilities: 0 critical
- Code quality: ✓ Passed
- Input validation: ✓ Implemented
- XSS protection: ✓ Active

**Result:** ✅ SUCCESS - Production-ready homepage delivered
**Time:** 8 minutes total
**Notes:** Design matches reference site aesthetic, all business requirements met
```

---

## 🚀 USAGE EXAMPLES

### Example 1: Complete Automation
```
User: "Create a homepage for Radiant Digital"

[System executes all 12 layers automatically]

Claude Response:
"✅ Homepage Created Successfully!

I've completed the full automation:
1. ✓ Analyzed master context
2. ✓ Reviewed business requirements  
3. ✓ Applied reference site design patterns
4. ✓ Generated React components (5 components)
5. ✓ Ran security checks (0 vulnerabilities)
6. ✓ Launched on localhost:5173
7. ✓ Captured screenshots (3 devices)
8. ✓ Visual verification passed

📦 Deliverables:
- outputs/homepage/ (complete React app)
- screenshots/ (verification images)
- docs/ (documentation)

🔐 Security: All checks passed
⚡ Performance: Lighthouse 94/100
♿ Accessibility: WCAG 2.1 AA compliant

[Screenshots displayed]

Next: Run `/create about` for about page?"
```

### Example 2: Using Commands
```
User: "/fetch main"

Claude:
"✓ Fetching content from https://stage.radiant.digital/
✓ 18 pages fetched and analyzed

📝 Summary:
- 18 pages analyzed (homepage, what-we-do, markets, contact-us,
  insights, events, careers, 6 service pages, 3 accelerators,
  who-we-are, tracklynk, privly)
- Company: AI-first digital transformation partner
- HQ: Vienna, VA | Global: India, Singapore, Oman, UAE, Canada
- 6 Service Enablers: DSE, Analytics/AI, Cloud, Product Dev,
  Org Transformation, Workforce Solutions
- 3 Accelerators: CX, Product, Sales
- 2 Products: Tracklynk (IoT), Privly (data privacy)
- Markets: Commercial, Federal, State & Local, Education
- Brand voice: Professional, AI-first, enterprise-focused
- Tagline: 'Transformation is the journey. Digital enablement is the map.'

📍 Saved to: content/current-website/ (18 .md files)
📋 Master context: content/master-context/MASTER_CONTEXT.md

Ready to create pages!"
```

### Example 2b: Fetch Reference
```
User: "/fetch ref"

Claude:
"✓ Fetching content from https://devblock.net/
✓ 12 pages fetched and analyzed

📝 Design Insights:
- Tagline: "Human-Driven, AI-Enhanced, Digital Solutions"
- Tone: Clean, modern corporate with animated backgrounds
- Structure: Hero → Service Overview → Case Studies → Client Logos → Testimonials → CTA → Footer
- 5 core services: Product Design, AI, DevOps, Spatial Design, Capabilities Overview
- Project format: Card-based showcases with hover-state image swaps
- CTA style: "See Our Services →" (primary), arrow CTAs throughout
- Clients: Elixr, BeautyTap, MINTX, LinkIt!
- Design: Light/dark mode CSS variables, vivid cyan, purple gradients, modern sans-serif
- AI Pricing: Transparent tiers ($10K / $25K / $50K)

📍 Saved to: content/reference-websites/ (12 .md files)

Ready to apply design patterns!"
```

### Example 3: Clear Screenshots
```
User: "/clear old"

Claude:
"🧹 Clearing screenshots older than 7 days...

Found:
- 8 desktop screenshots (5.2 MB)
- 8 tablet screenshots (4.8 MB)
- 8 mobile screenshots (3.1 MB)

✓ Moved to archive/
✓ 13.1 MB freed
✓ Recent screenshots preserved

📦 Archive: screenshots/archive/screenshots_20240220.zip

Next cleanup recommended: 2024-02-27"
```

---

## ✅ QUALITY GUARANTEES

Every generated page includes:

### React Components ✓
- Component-based architecture
- Functional components with hooks
- Proper props and state management
- Reusable, modular design

### Security ✓
- XSS protection implemented
- Input validation on forms
- Dependency vulnerabilities scanned
- Environment variables secured

### Design Quality ✓
- Frontend-design skill applied
- Distinctive, non-generic aesthetics
- Responsive on all devices
- Accessibility compliant

### Verification ✓
- Screenshots captured automatically
- Visual analysis performed
- Issues identified and fixed
- Production-ready confirmation

### Documentation ✓
- README with setup instructions
- Component documentation
- Security report
- Deployment guide

---

## 🎯 NEXT STEPS FOR YOU

1. **Try a command:** `/fetch main`
2. **Create a page:** `/create home`
3. **Check status:** `/status`
4. **Review output:** Check `outputs/` folder

**The system handles everything else automatically!** 🚀

---

**System Version:** 2.0 - Enhanced Multi-Layer Automation
**Last Updated:** 2026-02-20
**Content Status:**
- Main Website (Radiant Digital): ✅ 18 pages fetched (2026-02-20)
- Reference Website (DevBlock): ✅ 12 pages fetched (2026-03-06)
**Status:** Production Ready ✨

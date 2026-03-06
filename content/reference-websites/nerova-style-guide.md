# Nerova – Design System / Style Guide

**URL:** https://nerova.webflow.io/template-info/style-guide
**Last Fetched:** 2026-03-03

---

## Typography

### Font Families

| Role | Font | Weights |
|------|------|---------|
| Primary / Body | Figtree | Regular, 500, 600, 700 |
| Accent / Display | Playfair Display | Regular, 500, 600, 700, Italic |

### Heading Scale

| Heading | Size |
|---------|------|
| H1 (hero) | 4.6875rem (75px) |
| H1 (alt) | 4rem (64px) |
| H2 | 4rem / 3.375rem (54px) |
| H3 | 3.375rem |
| Large text | 3rem / 2.8125rem |
| Medium text | 2.25rem |
| Small | Down to 0.75rem |

---

## Color Palette

| Role | Value |
|------|-------|
| Page Background | Black (`#000` / near-black) |
| Primary Text | White |
| Accent / Brand | Purple → Pink gradient (approx `#dc5adb` range) |
| Card Background | Dark charcoal with subtle gradient |
| Stroke / Border | Subtle light gray on dark |
| Button Primary BG | Purple/gradient |
| Button Text | White |
| Shadow | Inside and outside glow effects |

---

## Components

### Buttons

| Variant | Style |
|---------|-------|
| Primary ("Get Started") | Purple/gradient bg, white text, rounded pill |
| Secondary ("Meet The Team") | Outlined, ghost style |
| Tertiary ("View Showreel") | Text with icon |
| Card CTA ("View Live Case Study") | Ghost/outlined with arrow |

- Hover: gradient shift, shadow elevation
- All buttons: rounded-full pill shape

### Cards

- Dark background with subtle border/gradient edge
- Hover: slight scale up + shadow glow
- Consistent padding `24px–32px`
- Border radius: `16px`

### Navigation

- Fixed header, dark/transparent background
- Logo left-aligned
- Menu items center
- "Get Started" CTA pill button right-aligned
- Mobile: hamburger toggle with slide-in overlay

---

## Decorative Elements

- Curved crescent shapes (purple/pink gradient)
- Abstract rings and orbital shapes
- Glow/blur radial gradients in backgrounds
- Grid or dot pattern overlays on dark sections

---

## Animation Patterns

| Animation | Usage |
|-----------|-------|
| Scroll-triggered text splits | Section headings |
| Fade-in with translateY | Cards and content blocks |
| Blur filter transitions | Section reveals |
| 3D transform perspective | Hero components |
| Rotating elements | Logo/icon accents |
| Counter animation | Stats section |
| Auto-advance carousel | Testimonials |

---

## Layout Grid

- Max content width: `1200px–1400px`
- Section padding: `80px–120px` vertical
- Card gaps: `24px–32px`
- 3-column grid desktop → 2-col tablet → 1-col mobile

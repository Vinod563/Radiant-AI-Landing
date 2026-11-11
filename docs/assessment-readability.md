# Assessment readability (AI Maturity, CX Maturity, hub)

Dark mode only. There is no Light/Dark toggle; the full theme system is parked on branch `theme-light-dark`.

## What changed and why

The assessments felt too dark and hard to read. Most of the problem wasn't the page navy. It was low-contrast text and see-through surfaces whose real contrast depended on whatever sat behind them. Lowering opacity wouldn't fix that, so each text and background pair was measured and the colour values were adjusted.

| Area | Before | After |
|---|---|---|
| Page background | #010F1E (later #0B1A2C) | #0B1A2C, same navy family, one step lighter |
| Cards, answer options | white at 2.5% over the page (no fixed contrast) | opaque #11233A, one step above the page |
| Inputs, chips, callouts | white at 3–6% | opaque #182C44 |
| Headings and body white | #FFFFFF, 17.5:1 (glare) | #D6DEE8, 12.9:1 on page, 11.7:1 on cards (softened further after feedback that headlines felt too bright) |
| Secondary text | #94A3B8, 6.8:1 | #BAC6D4, 10.1:1 |
| Muted text (lowest allowed) | #8899AA, 6.0:1, plus some text at 1.6–3.5:1 | #9DACBE, 7.6:1. No text is dimmer |
| CX purple as text | #596AE0, 3.4–3.8:1 | #7C8FEB, 5.3–5.8:1 |
| Answer option and field borders | white at 7–8% (about 1.3:1) | #64778E, 3.4:1 on cards, 3.8:1 on page |
| Progress and score tracks | white at 6% | #26405C. Green fill on track 5.2:1 |
| Keyboard focus | browser default, often invisible | 2px #A9D88A ring, 2px offset, 9.7:1+ |

Glows, gradients, layouts, content, questions and scoring are unchanged.

## States (answer options)

- **Default:** surface-1 fill with a 3:1+ border.
- **Hover:** accent border with a 5% accent tint.
- **Selected** (`aria-checked`): 2px accent edge, 10% tint and a solid number badge. It doesn't rely on colour alone.
- **Focus:** a separate outline ring, so it's distinct from hover and selected.
- **Disabled** (Next, See results): 40% opacity with a not-allowed cursor. WCAG exempts disabled controls.
- **Error:** message text in #FF8A7A (6.9:1 on cards) beside the field, so it doesn't rely on colour alone.

## How it's built

- `src/styles/theme.css`: `:root` holds the site's original palette, so the homepage and Chat are unchanged. `.rd-assessment` (on the hub, AI and CX page wrappers) holds the readability palette, `.rd-option` and the focus ring.
- `tailwind.config.js`: brand and text colours are token-backed (`text-text-secondary`, `bg-surface`, `border-line-strong`, …).
- `src/theme/tokens.js`: `c()`, `tone()` and `alpha()` give JS styles the same tokens.

## Verification (2026-11-11)

- **Measured contrast:** every visible text node, using computed colour × opacity over composited backgrounds. Hub, profile, question (unselected and selected), results and unlock modal for AI and CX: 0 below AA. The previous build had 51 (hub 8, AI results 17, CX 26).
- **axe-core** (contrast, names, labels, ARIA): 0 violations on all screens and states, including dropdown open and form errors.
- **Viewports:** 1440, 768 and 375 px, with no horizontal overflow on profile, question or results.
- **Homepage and Chat:** pixel-identical to the previous build, apart from animation.

/**
 * JS access to the theme tokens defined in src/styles/theme.css.
 * See docs/theme-system.md (repo root) for the full token reference.
 *
 *   c('ink')             → 'rgb(var(--rd-ink))'
 *   c('ink', 0.5)        → 'rgb(var(--rd-ink) / 0.5)'
 *   c('border')          → 'var(--rd-border)'          (full-colour tokens ignore alpha)
 *   tone('#91C46B')      → 'rgb(var(--rd-green))'      (brand hex → theme-aware accent)
 *   alpha(accent, 12)    → 12% tint of any colour, including var() references
 *   shadow(0.4)          → theme-scaled shadow colour for box-shadow strings
 *   themeData(obj)       → deep copy with brand hex strings replaced by tokens
 *   resolveColor(color)  → '#rrggbb' for libraries that need literal colours (amCharts)
 *
 * Data files (siteContent, knowledgeBase, assessment data) and API responses
 * keep plain brand hex, because the PDF/email reports and the chat API use them
 * too. Components pass them through tone() or themeData() at render time.
 */

// Tokens stored as "r g b" triplets (support alpha)
const RGB_TOKENS = new Set([
  'bg', 'bg-alt', 'bg-deep', 'ink', 'text-primary', 'text-secondary', 'text-muted',
  'green', 'purple', 'orange', 'teal', 'red', 'slate', 'violet', 'indigo', 'pink', 'emerald',
  'on-accent', 'danger', 'focus', 'shadow',
])

export function c(name, a) {
  if (RGB_TOKENS.has(name)) return a == null ? `rgb(var(--rd-${name}))` : `rgb(var(--rd-${name}) / ${a})`
  return `var(--rd-${name})`
}

// Brand palette hex → token. Lower-case keys.
export const BRAND_TOKENS = {
  '#91c46b': 'green',
  '#596ae0': 'purple',
  '#7c8feb': 'purple',
  '#f0974e': 'orange',
  '#2dd4bf': 'teal',
  '#f05030': 'red',
  '#64748b': 'slate',
  '#a855f7': 'violet',
  '#818cf8': 'indigo',
  '#e05990': 'pink',
  '#34d399': 'emerald',
  '#00c87d': 'emerald',
  '#00a86b': 'emerald',
  '#010f1e': 'bg',
  '#051a30': 'bg-alt',
  '#000a14': 'bg-deep',
}

/** Resolve a brand hex to its theme-aware token. Unknown colours pass through. */
export function tone(color) {
  if (typeof color !== 'string') return color
  const key = BRAND_TOKENS[color.toLowerCase()]
  return key ? c(key) : color
}

/** A `pct`% tint of `color` over transparent. Works with hex and var() colours. */
export function alpha(color, pct) {
  return `color-mix(in srgb, ${color} ${pct}%, transparent)`
}

/** Shadow colour at `a` opacity: black in dark mode, softer navy in light mode. */
export function shadow(a) {
  return `rgb(var(--rd-shadow) / calc(${a} * var(--rd-shadow-k)))`
}

/**
 * Deep-map plain data (objects/arrays/strings) so every string that is exactly a
 * brand hex becomes its theme token. Other values (gradients of image art,
 * URLs, text) are untouched. Results are cached per object.
 */
const themedCache = new WeakMap()
export function themeData(value) {
  if (typeof value === 'string') return tone(value)
  if (!value || typeof value !== 'object') return value
  if (themedCache.has(value)) return themedCache.get(value)
  // Leave React elements, components and class instances alone
  if (value.$$typeof || (Object.getPrototypeOf(value) !== Object.prototype && !Array.isArray(value))) return value
  const out = Array.isArray(value) ? value.map(themeData) : Object.fromEntries(Object.entries(value).map(([k, v]) => [k, themeData(v)]))
  themedCache.set(value, out)
  return out
}

/** Computed '#rrggbb' for any CSS colour (including var()/color-mix) in the current theme. */
let probe
export function resolveColor(color) {
  if (typeof document === 'undefined') return color
  if (!probe) {
    probe = document.createElement('span')
    probe.style.display = 'none'
    document.body.appendChild(probe)
  }
  probe.style.color = ''
  probe.style.color = color
  const m = getComputedStyle(probe).color.match(/[\d.]+/g)
  if (!m) return color
  return '#' + m.slice(0, 3).map(n => Math.round(Number(n)).toString(16).padStart(2, '0')).join('')
}

/** Assessment accents. Use these instead of hard-coding the hex. */
export const ACCENTS = {
  ai: c('green'),
  cx: c('purple'),
}

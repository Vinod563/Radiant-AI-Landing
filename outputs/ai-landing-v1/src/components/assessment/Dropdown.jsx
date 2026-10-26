import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

const fieldStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
const baseCls = 'w-full rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-all duration-200 focus:border-white/30'
const PANEL_MAX = 240 // matches max-h-60
const GAP = 8

// Visible box the panel must fit in: the viewport, narrowed by every ancestor
// that clips its children (overflow other than visible), e.g. the locked-report
// card and the page <main>, both overflow-hidden.
function clipBounds(el) {
  let top = 0
  let bottom = window.innerHeight
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    const { overflow, overflowY } = getComputedStyle(node)
    if (/(hidden|auto|scroll|clip)/.test(overflow + overflowY)) {
      const r = node.getBoundingClientRect()
      top = Math.max(top, r.top)
      bottom = Math.min(bottom, r.bottom)
    }
  }
  return { top, bottom }
}

/**
 * Custom application-themed dropdown (replaces the native <select> so the open
 * panel matches the app). onChange receives the chosen value.
 */
export default function Dropdown({ value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState({ up: false, maxH: PANEL_MAX })
  const ref = useRef(null)

  // Open downward by default; flip up when the clipping container leaves too
  // little room below, and cap the height to whichever side has the space.
  useLayoutEffect(() => {
    if (!open || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const { top, bottom } = clipBounds(ref.current)
    const below = bottom - r.bottom - GAP * 2
    const above = r.top - top - GAP * 2
    const up = below < PANEL_MAX && above > below
    setPlacement({ up, maxH: Math.max(120, Math.min(PANEL_MAX, up ? above : below)) })
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox" aria-expanded={open}
        className={`${baseCls} flex items-center justify-between gap-2 text-left ${value ? '' : 'text-white/50'}`}
        style={fieldStyle}>
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown size={16} className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul role="listbox"
            initial={{ opacity: 0, y: placement.up ? 6 : -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: placement.up ? 6 : -6 }}
            transition={{ duration: 0.15 }}
            className={`absolute left-0 right-0 z-50 rounded-xl overflow-hidden overflow-y-auto list-none p-1 ${placement.up ? 'bottom-full mb-2' : 'top-full mt-2'}`}
            style={{ maxHeight: placement.maxH, background: 'rgba(8,20,34,0.98)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>
            {options.map(o => {
              const active = value === o
              return (
                <li key={o} role="option" aria-selected={active}>
                  <button type="button" onClick={() => { onChange(o); setOpen(false) }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm flex items-center justify-between gap-2 transition-colors ${active ? 'bg-brand-green/10 text-white' : 'text-text-secondary hover:bg-white/[0.06] hover:text-white'}`}>
                    <span>{o}</span>
                    {active && <Check size={14} className="text-brand-green flex-shrink-0" />}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

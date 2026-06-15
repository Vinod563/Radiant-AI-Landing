import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

const fieldStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
const baseCls = 'w-full rounded-xl px-4 py-3 text-sm text-white font-medium outline-none transition-all duration-200 focus:border-white/30'

/**
 * Custom application-themed dropdown (replaces the native <select> so the open
 * panel matches the app). onChange receives the chosen value.
 */
export default function Dropdown({ value, onChange, placeholder, options }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

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
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl overflow-hidden max-h-60 overflow-y-auto list-none p-1"
            style={{ background: 'rgba(8,20,34,0.98)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)' }}>
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

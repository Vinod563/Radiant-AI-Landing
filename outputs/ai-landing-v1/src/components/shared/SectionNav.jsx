import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'hero',           label: 'Hero' },
  { id: 'differentiator', label: 'Why Radiant' },
  { id: 'solutions',      label: 'Solutions' },
  { id: 'ai-fabric',      label: 'AI Fabric' },
  { id: 'proof',          label: 'Case Study' },
  { id: 'social-proof',   label: 'Customers' },
  { id: 'industries',     label: 'Industries' },
  { id: 'platform',       label: 'Platform' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'contact',        label: 'Contact' },
]

export default function SectionNav() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState(false)

  const activeIdx = useMemo(() => sections.findIndex(s => s.id === active), [active])
  const progress = ((activeIdx + 1) / sections.length) * 100

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY
    const viewportH = window.innerHeight
    setVisible(scrollY > 300)

    let current = sections[0].id
    for (const s of sections) {
      const el = document.getElementById(s.id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.top < viewportH * 0.55 && rect.bottom > viewportH * 0.3) {
        current = s.id
      }
    }
    setActive(current)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed right-6 top-0 bottom-0 z-50 hidden lg:flex items-center">
        <motion.nav
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center"
          aria-label="Section navigation"
        >
          {/* Glass backdrop pill */}
          <div
            className="relative flex flex-col items-center gap-[14px] py-5 px-3 rounded-full"
            style={{
              background: 'rgba(1, 15, 30, 0.55)',
              backdropFilter: 'blur(16px) saturate(1.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Animated progress track behind dots */}
            <div className="absolute left-1/2 -translate-x-1/2 top-5 bottom-5 w-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <motion.div
                className="w-full rounded-full origin-top"
                animate={{ height: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(180deg, #91C46B 0%, #596AE0 60%, #a855f7 100%)' }}
              />
            </div>

            {sections.map((s, i) => {
              const isActive = active === s.id
              const isHovered = hovered === s.id
              const isPast = i <= activeIdx
              const showLabel = isActive || isHovered

              return (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative flex items-center gap-0 outline-none cursor-pointer z-10"
                  aria-label={`Go to ${s.label}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {/* Label — slides in */}
                  <AnimatePresence mode="popLayout">
                    {showLabel && (
                      <motion.span
                        key={s.id + '-label'}
                        initial={{ opacity: 0, x: 6, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 6, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute right-full mr-3 whitespace-nowrap text-[11px] font-display font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                          background: isActive ? 'rgba(145,196,107,0.15)' : 'rgba(255,255,255,0.06)',
                          border: `1px solid ${isActive ? 'rgba(145,196,107,0.25)' : 'rgba(255,255,255,0.08)'}`,
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        {s.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Dot */}
                  <motion.div
                    className="relative rounded-full"
                    animate={{
                      width: isActive ? 12 : isHovered ? 10 : 8,
                      height: isActive ? 12 : isHovered ? 10 : 8,
                      background: isActive
                        ? '#91C46B'
                        : isPast
                          ? 'rgba(145,196,107,0.4)'
                          : isHovered
                            ? 'rgba(255,255,255,0.45)'
                            : 'rgba(255,255,255,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Active outer ring with glow */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-ring"
                        className="absolute -inset-[5px] rounded-full"
                        style={{
                          border: '1.5px solid rgba(145,196,107,0.35)',
                          boxShadow: '0 0 12px rgba(145,196,107,0.2), inset 0 0 6px rgba(145,196,107,0.1)',
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}

                    {/* Hover ring */}
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute -inset-[4px] rounded-full"
                        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                      />
                    )}
                  </motion.div>
                </button>
              )
            })}
          </div>

          {/* Section counter */}
          <motion.div
            className="mt-3 text-center w-full"
            animate={{ opacity: hovered ? 1 : 0.4 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-[9px] font-display font-bold tracking-widest text-white/60">
              {String(activeIdx + 1).padStart(2, '0')}/{String(sections.length).padStart(2, '0')}
            </span>
          </motion.div>
        </motion.nav>
        </div>
      )}
    </AnimatePresence>
  )
}

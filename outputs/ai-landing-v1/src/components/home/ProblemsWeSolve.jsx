import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, BarChart3, Layers, Code2, ShieldAlert, Rocket, FileText, Activity } from 'lucide-react'
import { Link } from 'react-router-dom'
import { solutions as solutionsData } from '../../data/siteContent.js'

/*
 * Problems We Solve: two-pane symptom-led accordion (radiant-ai-landing-copy-spec §5).
 * Left = 8 buyer-voice problem statements (role=tablist). Right = the matching
 * solution (role=tabpanel). Buyers self-select by symptom, never by a maturity grade.
 * Replaces the old stacked "AI Solutions" section; keeps <section id="solutions">.
 */

/* Component-only visual overrides, merged onto siteContent data (icon per num). */
const visualOverrides = {
  '01': { icon: BarChart3, screenshotGradient: 'linear-gradient(145deg, #021a0c 0%, #043d18 50%, #0a6b2a 100%)' },
  '02': { icon: Layers, screenshotGradient: 'linear-gradient(145deg, #1a0a00 0%, #3d1e00 50%, #7a3800 100%)' },
  '03': { icon: Code2, screenshotGradient: 'linear-gradient(145deg, #001208 0%, #003020 50%, #005838 100%)' },
  '04': { icon: Code2, screenshotGradient: 'linear-gradient(145deg, #001008 0%, #002e1e 50%, #005038 100%)' },
  '05': { icon: ShieldAlert, screenshotGradient: 'linear-gradient(145deg, #050818 0%, #0c1040 50%, #1a2270 100%)' },
  '06': { icon: Rocket, screenshotGradient: 'linear-gradient(145deg, #180400 0%, #3d0e00 50%, #6b1a00 100%)' },
  '07': { icon: FileText, screenshotGradient: 'linear-gradient(145deg, #080014 0%, #160038 50%, #2a0068 100%)' },
  '08': { icon: Activity, screenshotGradient: 'linear-gradient(145deg, #001a14 0%, #003d32 50%, #006b5a 100%)' },
}

const solutions = solutionsData.map(s => ({ ...s, ...visualOverrides[s.num] }))

/* Small media-query hook (no external dep). */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : true)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const on = () => setMatches(mql.matches)
    on()
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [query])
  return matches
}

/* ── Floating screenshot (ported from the old Solutions block) ───────────────── */
function FloatingScreenshot({ solution, isHovered }) {
  return (
    <motion.div
      className="relative"
      style={{ perspective: '1400px' }}
      animate={{ y: isHovered ? -12 : 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <motion.div
        className="absolute -bottom-8 left-[6%] right-[6%] h-20 rounded-[50%] z-0"
        style={{ background: `radial-gradient(ellipse, ${solution.accent}20 0%, transparent 70%)`, filter: 'blur(24px)' }}
        animate={{ scaleX: isHovered ? 0.82 : 0.95, opacity: isHovered ? 0.4 : 0.8 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      />
      <motion.div
        className="relative rounded-2xl lg:rounded-3xl overflow-hidden z-10"
        style={{
          aspectRatio: '16/10',
          background: '#0a0a0a',
          boxShadow: `0 60px 120px rgba(0,0,0,0.6), 0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08), 0 0 80px ${solution.accent}0a`,
        }}
        animate={{ rotateX: isHovered ? -1.5 : 1, rotateY: isHovered ? 1 : 0, scale: isHovered ? 1.015 : 1 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        <img
          src={solution.screenshot}
          alt={`${solution.title}: ${solution.problemStatement}`}
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <img
          src={solution.screenshot}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
          style={{ opacity: isHovered ? 1 : 0, filter: 'invert(0.88) hue-rotate(180deg) contrast(1.05) brightness(0.95)' }}
        />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ background: `linear-gradient(135deg, ${solution.accent}12 0%, transparent 60%)`, opacity: isHovered ? 1 : 0 }} />
        <div className="absolute inset-0 pointer-events-none mix-blend-soft-light transition-opacity duration-700"
          style={{ background: solution.accent, opacity: isHovered ? 0 : 0.1 }} />
        <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${solution.accent}25, transparent)` }} />
        <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)' }} />
      </motion.div>
    </motion.div>
  )
}

/* ── Right-pane / inline detail (shared desktop + mobile) ─────────────────────
   Order: practice label → title → (reduced) screenshot → description → tags →
   powered by → CTA. The screenshot sits between title and description and is
   width-constrained so the pane reads cleaner and balances the left rail. */
function SolutionDetail({ s }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="text-[0.6rem] font-display font-medium uppercase tracking-[0.15em] text-text-muted mb-2">
        {s.label}
      </div>
      <h3 className="font-display font-black text-white leading-[1.05] tracking-tight mb-6"
        style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)' }}>
        {s.title}
      </h3>

      <div className="aspect-[16/10] w-full max-w-md mb-7">
        <FloatingScreenshot solution={s} isHovered={hovered} />
      </div>

      <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl"
        style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)' }}>
        {s.desc}
      </p>

      <div className="flex items-center gap-2.5 mb-6 flex-wrap">
        {s.tags.map(t => (
          <span key={t}
            className="text-[0.65rem] font-display font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full"
            style={{ background: `${s.accent}0c`, color: `${s.accent}cc`, border: `1px solid ${s.accent}18` }}>
            {t}
          </span>
        ))}
        {s.proofStat && (
          <span className="text-[0.65rem] font-display font-bold uppercase tracking-wide px-3 py-1.5 rounded-full"
            style={{ background: `${s.accent}1a`, color: s.accent, border: `1px solid ${s.accent}33` }}>
            {s.proofStat}
          </span>
        )}
      </div>

      {s.platformComponents && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <span className="text-[0.6rem] font-display font-medium uppercase tracking-wider text-text-muted mr-1">
            Powered by:
          </span>
          {s.platformComponents.map(pc => (
            <span key={pc}
              className="text-[0.58rem] font-display font-medium px-2.5 py-1 rounded-md"
              style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {pc}
            </span>
          ))}
        </div>
      )}

      <Link to={`/chat?q=${encodeURIComponent('Tell me about ' + s.title)}`} className="btn-primary group/link">
        <span>Explore Solution</span>
        <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
      </Link>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────────────────────── */
export default function ProblemsWeSolve() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const tabRefs = useRef([])

  const slugIndex = useCallback(() => {
    const slug = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    const i = solutions.findIndex(s => s.slug === slug)
    return i >= 0 ? i : 0
  }, [])

  const [active, setActive] = useState(slugIndex)

  // Sync selection from browser back/forward hash changes.
  useEffect(() => {
    const onHash = () => setActive(slugIndex())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [slugIndex])

  const select = useCallback((i, { focus = false } = {}) => {
    setActive(i)
    // replaceState (not location.hash=) so we don't force-scroll or spam history.
    window.history.replaceState(null, '', `#${solutions[i].slug}`)
    if (focus) tabRefs.current[i]?.focus()
  }, [])

  const onKeyDown = (e) => {
    const last = solutions.length - 1
    let next = null
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = last
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(active, { focus: true }); return }
    if (next !== null) { e.preventDefault(); select(next, { focus: true }) }
  }

  const activeSolution = solutions[active]

  return (
    <section id="solutions" className="relative overflow-hidden bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-36">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14 lg:mb-16"
        >
          <span className="kicker">Problems We Solve</span>
          <h2 className="font-display font-black leading-[0.98] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
            You came with a problem. Start there.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Each one is a real engagement, grounded in the client's actual environment.
            Every solution is assembled from Radiant Digital AI Platform capabilities,
            so the AI knows your business before it runs a single process.
          </p>
        </motion.div>

        {/* Desktop: two-pane tablist */}
        {isDesktop ? (
          <div className="grid grid-cols-1 lg:grid-cols-[38%_62%] gap-8 lg:gap-14 items-stretch">
            {/* Left: problem statements — clickable cards that fill the column height */}
            <div role="tablist" aria-orientation="vertical" aria-label="Problems we solve"
              onKeyDown={onKeyDown} className="flex flex-col gap-2 h-full">
              {solutions.map((s, i) => {
                const selected = i === active
                return (
                  <button
                    key={s.slug}
                    ref={el => (tabRefs.current[i] = el)}
                    role="tab"
                    id={`tab-${s.slug}`}
                    aria-selected={selected}
                    aria-controls="problems-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    className="group flex-1 flex items-center gap-3 text-left rounded-xl border-l-2 pl-4 pr-3 py-3.5 cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                    style={{
                      borderLeftColor: selected ? s.accent : 'transparent',
                      background: selected ? `${s.accent}12` : 'rgba(255,255,255,0.02)',
                      boxShadow: selected ? `inset 0 0 0 1px ${s.accent}2e` : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.045)' }}
                    onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
                  >
                    <span className="flex-1 min-w-0">
                      <span className="block font-display font-semibold text-[1rem] leading-snug"
                        style={{ color: selected ? s.accent : undefined }}>
                        <span className={selected ? '' : 'text-text-secondary group-hover:text-white transition-colors'}>{s.problemStatement}</span>
                      </span>
                      {selected && (
                        <span className="block text-xs text-text-muted mt-1">{s.title} · {s.label}</span>
                      )}
                    </span>
                    <ArrowRight size={16} className="flex-shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                      style={{
                        color: selected ? s.accent : 'rgba(255,255,255,0.3)',
                        transform: selected ? 'translateX(2px)' : undefined,
                      }} />
                  </button>
                )
              })}
            </div>

            {/* Right: solution panel. Keyed opacity-only fade (no AnimatePresence
                exit gap) so the screenshot slot never collapses/jumps on switch. */}
            <div role="tabpanel" id="problems-panel" tabIndex={0}
              aria-labelledby={`tab-${activeSolution.slug}`} className="focus:outline-none">
              <motion.div
                key={activeSolution.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <SolutionDetail s={activeSolution} />
              </motion.div>
            </div>
          </div>
        ) : (
          /* Mobile: vertical accordion, one open at a time, content expands inline */
          <div className="flex flex-col divide-y divide-white/5">
            {solutions.map((s, i) => {
              const selected = i === active
              return (
                <div key={s.slug}>
                  <button
                    onClick={() => select(i)}
                    aria-expanded={selected}
                    className="w-full text-left py-4 flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                    style={{ color: selected ? s.accent : undefined }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: selected ? s.accent : 'rgba(255,255,255,0.2)' }} />
                    <span className="font-display font-semibold text-[0.98rem]">
                      <span className={selected ? '' : 'text-text-secondary'}>{s.problemStatement}</span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-2 pb-8">
                          <SolutionDetail s={s} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

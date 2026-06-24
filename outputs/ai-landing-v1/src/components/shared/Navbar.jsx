import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, Brain, Sparkles, ChevronDown } from 'lucide-react'
import RadiantLogo from './RadiantLogo'

const ASSESSMENTS = [
  {
    to: '/assessment/ai',
    icon: Brain,
    accent: '#91C46B',
    label: 'AI Adoption Assessment',
    desc: 'Find your stage across strategy, data, people & adoption.',
    time: '10–15 min',
    tags: ['Role-adaptive', '6 stages', '12–16 questions'],
    cta: 'Start assessment',
  },
  {
    to: '/assessment/cx',
    icon: Sparkles,
    accent: '#596AE0',
    label: 'CX Maturity Assessment',
    desc: 'Evaluate vision, governance & culture across your CX org.',
    time: '3–5 min',
    tags: ['3 dimensions', '3 levels', '9 questions'],
    cta: 'Start assessment',
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAssessOpen, setMobileAssessOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const [menuTop, setMenuTop] = useState(0)
  const dropRef = useRef(null)
  const headerRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Track the navbar's bottom edge so the full-width mega-menu anchors right below it
  useEffect(() => {
    const update = () => setMenuTop(headerRef.current?.getBoundingClientRect().bottom || 0)
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])
  useEffect(() => { if (dropOpen) setMenuTop(headerRef.current?.getBoundingClientRect().bottom || 0) }, [dropOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setDropOpen(false) }, [location.pathname])

  const isAssessmentActive = location.pathname.startsWith('/assessment')

  const links = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Proof', href: '#proof' },
    { label: 'Industries', href: '#industries' },
    { label: 'Platform', href: '#platform' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header ref={headerRef} className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-[rgba(1,15,30,0.96)] backdrop-blur-2xl border-b border-white/[0.07]' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <RadiantLogo height={22} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="font-body text-[0.8rem] font-medium text-text-muted hover:text-text-primary transition-colors no-underline tracking-wide">
                {l.label}
              </a>
            ))}

            {/* Assessments dropdown */}
            <div
              ref={dropRef}
              className="relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button
                onClick={() => setDropOpen(v => !v)}
                className={`flex items-center gap-1 font-body text-[0.8rem] font-semibold tracking-wide transition-colors no-underline cursor-pointer bg-transparent border-0 p-0 ${
                  isAssessmentActive ? 'text-brand-green' : 'text-brand-green hover:text-brand-green'
                }`}
                aria-expanded={dropOpen}
                aria-haspopup="true"
              >
                Assessments
                <ChevronDown size={13} className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Invisible hover bridge over the navbar's bottom padding so the
                  mouse can travel from the trigger down to the full-width panel
                  without crossing a dead zone (keeps the menu open). */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-40 h-6" aria-hidden="true" />

              {/* Full-width mega-menu — fixed, spans the viewport, anchored just
                  below the navbar. Content is constrained to the site container. */}
              <div
                style={{ top: menuTop }}
                className={`fixed left-0 right-0 z-40 transition-all duration-200 ${
                  dropOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
               <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-3">
                <div className="rounded-2xl overflow-hidden grid grid-cols-[minmax(320px,1.15fr)_1.55fr]"
                 style={{ background: 'rgba(5,26,48,0.98)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 28px 60px rgba(0,0,0,0.55)' }}
                >
                 {/* LEFT — intro + links */}
                 <div className="relative p-6 lg:p-7 flex flex-col border-r border-white/[0.06] overflow-hidden">
                   {/* soft brand glow */}
                   <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl opacity-40"
                     style={{ background: 'radial-gradient(circle, rgba(145,196,107,0.35), transparent 70%)' }} aria-hidden="true" />

                   <span className="relative inline-flex items-center gap-1.5 self-start text-[10px] font-display font-bold uppercase tracking-[0.16em] text-brand-green mb-3 px-2.5 py-1 rounded-full"
                     style={{ background: 'rgba(145,196,107,0.10)', border: '1px solid rgba(145,196,107,0.22)' }}>
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-green" /> Assessments
                   </span>
                   <h3 className="relative font-display font-black text-white text-2xl leading-[1.1] tracking-tight mb-2.5">
                     Know exactly <span className="grad-text">where you stand.</span>
                   </h3>
                   <p className="relative text-text-muted text-[13px] leading-relaxed">
                     Two self-serve diagnostics built for enterprise leaders. No signup, no sales call — answer a few questions and get an instant, tailored read on your maturity.
                   </p>
                   <p className="relative text-text-muted text-[13px] leading-relaxed mt-3">
                     You'll see your stage, how you compare to peers, and the highest-impact gaps to close next — with clear recommendations you can act on right away.
                   </p>

                   <div className="relative mt-auto pt-6 flex flex-col gap-1">
                     <Link to="/assessment"
                       className="group/link text-[13px] text-text-secondary hover:text-white transition-colors no-underline font-semibold inline-flex items-center justify-between gap-1.5 py-2 px-2.5 -mx-2.5 rounded-lg hover:bg-white/[0.04]">
                       View all assessments <ArrowRight size={13} className="group-hover/link:translate-x-0.5 transition-transform" />
                     </Link>
                   </div>
                 </div>

                 {/* RIGHT — assessment tiles (stacked) */}
                 <div className="flex flex-col gap-3.5 p-4">
                   {ASSESSMENTS.map(a => {
                     const Icon = a.icon
                     const isActive = location.pathname === a.to
                     return (
                       <Link key={a.to} to={a.to}
                         className="group relative flex flex-col gap-3 p-5 pt-4 rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
                         style={{
                           background: isActive ? `${a.accent}12` : 'rgba(255,255,255,0.02)',
                           border: `1px solid ${isActive ? a.accent + '40' : 'rgba(255,255,255,0.07)'}`,
                         }}
                         onMouseEnter={e => { e.currentTarget.style.background = `${a.accent}14`; e.currentTarget.style.borderColor = `${a.accent}55`; e.currentTarget.style.boxShadow = `0 12px 30px ${a.accent}1f` }}
                         onMouseLeave={e => { e.currentTarget.style.background = isActive ? `${a.accent}12` : 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = isActive ? a.accent + '40' : 'rgba(255,255,255,0.07)'; e.currentTarget.style.boxShadow = 'none' }}
                       >
                         {/* accent top bar */}
                         <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity"
                           style={{ background: `linear-gradient(90deg, ${a.accent}, transparent)` }} aria-hidden="true" />

                         <div className="flex items-start gap-3">
                           <div className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-105"
                             style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}30` }}>
                             <Icon size={20} style={{ color: a.accent }} />
                           </div>
                           <div className="flex-1 min-w-0">
                             <div className="flex items-center justify-between gap-2">
                               <span className="font-display font-bold text-white text-[15px] leading-tight">{a.label}</span>
                               <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform flex-shrink-0" style={{ color: a.accent }} />
                             </div>
                             <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold mt-1.5 px-2 py-0.5 rounded-full"
                               style={{ color: a.accent, background: `${a.accent}14`, border: `1px solid ${a.accent}26` }}>
                               <span className="w-1 h-1 rounded-full" style={{ background: a.accent }} /> {a.time}
                             </span>
                           </div>
                         </div>

                         <p className="text-text-muted text-[13px] leading-relaxed">{a.desc}</p>

                         <div className="flex flex-wrap gap-1.5">
                           {a.tags.map(t => (
                             <span key={t} className="text-[10px] font-medium px-2 py-1 rounded-md"
                               style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}>
                               {t}
                             </span>
                           ))}
                         </div>
                       </Link>
                     )
                   })}
                 </div>
                </div>
               </div>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/chat?q=Connect%20with%20our%20team"
              className="btn-primary !py-2.5 !px-5 !text-[0.78rem] flex items-center gap-1.5">
              Connect with Us <ArrowRight size={13} />
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-muted hover:text-text-primary p-1 transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/[0.07] mt-3 pt-5 pb-6 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                className="font-body text-sm font-medium text-text-secondary hover:text-text-primary transition-colors no-underline px-2 py-2.5 rounded-lg hover:bg-white/[0.04]">
                {l.label}
              </a>
            ))}

            {/* Mobile: Assessments accordion */}
            <button
              onClick={() => setMobileAssessOpen(v => !v)}
              className="flex items-center justify-between w-full text-left px-2 py-2.5 rounded-lg hover:bg-white/[0.04] bg-transparent border-0 cursor-pointer"
            >
              <span className="font-body text-sm font-semibold text-brand-green">Assessments</span>
              <ChevronDown size={14} className={`text-brand-green transition-transform ${mobileAssessOpen ? 'rotate-180' : ''}`} />
            </button>

            {mobileAssessOpen && (
              <div className="ml-2 mt-1 mb-2 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                {ASSESSMENTS.map(a => {
                  const Icon = a.icon
                  return (
                    <Link key={a.to} to={a.to} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 no-underline hover:bg-white/[0.04] transition-colors border-b border-white/[0.05] last:border-0">
                      <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ background: `${a.accent}18` }}>
                        <Icon size={14} style={{ color: a.accent }} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-white text-sm">{a.label}</div>
                        <div className="text-text-muted text-xs mt-0.5">{a.time}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}

            <Link to="/chat?q=Connect%20with%20our%20team"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-fit mt-3 !py-3 !px-6">
              Connect with Us
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

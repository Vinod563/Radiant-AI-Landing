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
  },
  {
    to: '/assessment/cx',
    icon: Sparkles,
    accent: '#596AE0',
    label: 'CX Maturity Assessment',
    desc: 'Evaluate vision, governance & culture across your CX org.',
    time: '3–5 min',
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileAssessOpen, setMobileAssessOpen] = useState(false)
  const [dropOpen, setDropOpen] = useState(false)
  const dropRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
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
            <div ref={dropRef} className="relative">
              <button
                onMouseEnter={() => setDropOpen(true)}
                onMouseLeave={() => setDropOpen(false)}
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

              {/* Dropdown panel */}
              <div
                onMouseEnter={() => setDropOpen(true)}
                onMouseLeave={() => setDropOpen(false)}
                className={`absolute top-full right-0 mt-3 w-80 rounded-2xl overflow-hidden transition-all duration-200 origin-top-right ${
                  dropOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
                style={{ background: 'rgba(5,26,48,0.98)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}
              >
                <div className="p-2">
                  {ASSESSMENTS.map(a => {
                    const Icon = a.icon
                    const isActive = location.pathname === a.to
                    return (
                      <Link key={a.to} to={a.to}
                        className="flex items-start gap-3 p-3 rounded-xl no-underline group transition-colors hover:bg-white/[0.05]"
                        style={isActive ? { background: `${a.accent}10` } : {}}>
                        <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                          style={{ background: `${a.accent}18`, border: `1px solid ${a.accent}30` }}>
                          <Icon size={16} style={{ color: a.accent }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-display font-bold text-white text-sm leading-tight">{a.label}</span>
                            <ArrowRight size={12} className="text-text-muted group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                          </div>
                          <p className="text-text-muted text-xs leading-snug mt-0.5">{a.desc}</p>
                          <span className="text-[10px] font-semibold mt-1.5 inline-block" style={{ color: a.accent }}>{a.time}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                <div className="px-4 py-3 border-t border-white/[0.06] flex items-center justify-between">
                  <Link to="/assessment"
                    className="text-xs text-text-muted hover:text-white transition-colors no-underline font-medium">
                    View all assessments →
                  </Link>
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
                    
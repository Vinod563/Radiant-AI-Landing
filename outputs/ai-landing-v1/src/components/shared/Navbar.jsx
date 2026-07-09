import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import RadiantLogo from './RadiantLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const CONNECT_CHAT = '/chat?q=Connect%20with%20our%20team'

  const links = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Proof', href: '#proof' },
    { label: 'Industries', href: '#industries' },
    { label: 'Platform', href: '#platform' },
    { label: 'Contact', to: CONNECT_CHAT },
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
              l.to ? (
                <Link key={l.label} to={l.to}
                  className="font-body text-[0.8rem] font-medium text-text-muted hover:text-text-primary transition-colors no-underline tracking-wide">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href}
                  className="font-body text-[0.8rem] font-medium text-text-muted hover:text-text-primary transition-colors no-underline tracking-wide">
                  {l.label}
                </a>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/assessment/ai"
              className="btn-primary !py-2.5 !px-5 !text-[0.78rem] flex items-center gap-1.5">
              Assess AI Maturity <ArrowRight size={13} />
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
              l.to ? (
                <Link key={l.label} to={l.to} onClick={() => setMobileOpen(false)}
                  className="font-body text-sm font-medium text-text-secondary hover:text-text-primary transition-colors no-underline px-2 py-2.5 rounded-lg hover:bg-white/[0.04]">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
                  className="font-body text-sm font-medium text-text-secondary hover:text-text-primary transition-colors no-underline px-2 py-2.5 rounded-lg hover:bg-white/[0.04]">
                  {l.label}
                </a>
              )
            ))}

            <Link to="/assessment/ai"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-fit mt-3 !py-3 !px-6">
              Assess AI Maturity
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

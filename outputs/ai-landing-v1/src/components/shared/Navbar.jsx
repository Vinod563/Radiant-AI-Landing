import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import RadiantLogo from './RadiantLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Proof', href: '#proof' },
    { label: 'Industries', href: '#industries' },
    { label: 'Platform', href: '#platform' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 bg-[rgba(1,15,30,0.94)] backdrop-blur-2xl border-b border-white/[0.07]' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center no-underline">
            <RadiantLogo height={22} />
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {links.map(l => (
              <a key={l.label} href={l.href}
                className="font-body text-[0.8rem] font-medium text-text-muted hover:text-text-primary transition-colors no-underline tracking-wide">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/chat?q=Connect%20with%20our%20team" className="btn-primary !py-2.5 !px-5 !text-[0.78rem] flex items-center gap-1.5">Connect with Us <ArrowRight size={13} /></Link>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden text-text-muted hover:text-text-primary p-1 transition-colors">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/[0.07] mt-3 pt-5 pb-6 flex flex-col gap-4">
            {links.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="font-body text-sm font-medium text-text-secondary hover:text-text-primary transition-colors no-underline">
                {l.label}
              </a>
            ))}
            <Link to="/chat?q=Connect%20with%20our%20team" onClick={() => setOpen(false)} className="btn-primary w-fit mt-2 !py-3 !px-6">
              Connect with Us
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

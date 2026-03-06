import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import RadiantLogo from './RadiantLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isICX = pathname === '/icx-solution'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const homeLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Platform', href: '#platform' },
    { label: 'AI Labs', href: '#ai-labs' },
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
  ]
  const icxLinks = [
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Platform', href: '#platform' },
    { label: 'Case Studies', href: '#case-study' },
    { label: 'Contact', href: '#contact' },
  ]
  const links = isICX ? icxLinks : homeLinks

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
            {isICX ? (
              <>
                <a href="/#contact" className="btn-ghost !py-2.5 !px-5 !text-[0.78rem]">Learn More</a>
                <a href="#contact" className="btn-primary !py-2.5 !px-5 !text-[0.78rem]">Book a Demo</a>
              </>
            ) : (
              <a href="#contact" className="btn-primary !py-2.5 !px-5 !text-[0.78rem]">Let's Talk</a>
            )}
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
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary w-fit mt-2 !py-3 !px-6">
              {isICX ? 'Book a Demo' : "Let's Talk"}
            </a>
          </div>
        )}
      </div>
    </header>
  )
}

import { Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import RadiantLogo from './RadiantLogo'

export default function Footer({ variant = 'home' }) {
  const isICX = variant === 'icx'

  const navLinks = isICX
    ? ['Enterprise ICX', 'Customer Journey Intelligence', 'Billing Anomaly Detection', 'Product Launch Risk Intelligence', 'Design-to-Code Modernization', 'Automarc AI']
    : ['Solutions', 'Industries', 'Platform', 'Case Studies', 'Contact']

  const company = isICX
    ? ['Case Studies', 'Whitepapers', 'Documentation', 'Blog & Insights', 'Events']
    : ['About Us', 'Careers', 'Insights', 'Events', 'Contact']

  return (
    <footer className="bg-[#000A14] border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top bar */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="block mb-5 no-underline">
              <RadiantLogo height={24} />
            </Link>
            <p className="text-white/70 text-sm font-semibold mb-2">
              Enterprise transformation. Supercharged with AI.
            </p>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs mb-6">
              Radiant Digital built its operating model on AI.
              Now it brings that same transformation to your enterprise.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#"
                  className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-text-muted hover:text-brand-green hover:border-brand-green/30 transition-all">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-text-muted mb-5">
              {isICX ? 'Solutions' : 'Navigation'}
            </h4>
            <ul className="space-y-3 list-none">
              {navLinks.map(item => (
                <li key={item}>
                  <a href="#" className="text-text-muted text-sm hover:text-brand-green transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-text-muted mb-5">
              {isICX ? 'Resources' : 'Company'}
            </h4>
            <ul className="space-y-3 list-none">
              {company.map(item => (
                <li key={item}>
                  <a href="#" className="text-text-muted text-sm hover:text-brand-green transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display text-[0.65rem] font-bold tracking-[0.15em] uppercase text-text-muted mb-5">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-text-muted">
                <MapPin size={13} className="mt-0.5 text-brand-green flex-shrink-0" />
                <span>8229 Boone Blvd, Suite 325<br />Vienna, VA 22182</span>
              </div>
              <a href="mailto:hello@radiant.digital" className="flex items-center gap-3 text-sm text-text-muted hover:text-brand-green transition-colors no-underline">
                <Mail size={13} className="text-brand-green flex-shrink-0" />
                hello@radiant.digital
              </a>
              <a href="tel:+13013065102" className="flex items-center gap-3 text-sm text-text-muted hover:text-brand-green transition-colors no-underline">
                <Phone size={13} className="text-brand-green flex-shrink-0" />
                301.306.5102
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-text-muted text-xs font-display">
            &copy; 2026 Radiant Digital. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(l => (
              <a key={l} href="#" className="text-text-muted text-xs hover:text-text-primary transition-colors no-underline">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

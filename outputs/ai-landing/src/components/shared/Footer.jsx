import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import RadiantLogo from './RadiantLogo'

export default function Footer({ variant = 'home' }) {
  const isICX = variant === 'icx'
  const solutions = isICX
    ? ['Enterprise ICX', 'CX Workbench', 'AI Fabric', 'Anomaly Detection', 'Rapid AI', 'DocuFlow']
    : ['Digital Strategy', 'Cloud Transformations', 'Analytics', 'Product Development', 'Solutions']
  const company = isICX
    ? ['Case Studies', 'Whitepapers', 'Documentation', 'Blog & Insights', 'Events']
    : ['About Us', 'Careers', 'Insights', 'Events', 'Contact']

  return (
    <footer className="bg-mag-black border-t border-white/[0.07]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Top bar */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="block mb-5 no-underline">
              <RadiantLogo height={24} dark />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs mb-6">
              {isICX
                ? 'Building intelligent CX foundations for the world\'s leading enterprises. AI-first. Outcome-focused.'
                : 'Building digital foundations for intelligent enterprises. AI-first transformation partners.'}
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white/60 hover:text-brand-green hover:border-brand-green/30 transition-all">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div className="md:col-span-2">
            <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60 mb-5">
              {isICX ? 'Solutions' : 'What We Do'}
            </h4>
            <ul className="space-y-3 list-none">
              {solutions.map(item => (
                <li key={item}>
                  <a href="#" className="text-white/70 text-sm hover:text-brand-green transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60 mb-5">
              {isICX ? 'Resources' : 'Company'}
            </h4>
            <ul className="space-y-3 list-none">
              {company.map(item => (
                <li key={item}>
                  <a href="#" className="text-white/70 text-sm hover:text-brand-green transition-colors no-underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/60 mb-5">Get in Touch</h4>
            <div className="space-y-4">
              {isICX && (
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin size={13} className="mt-0.5 text-brand-green flex-shrink-0" />
                  <span>1800 Tysons Blvd, Suite 900<br />McLean, VA 22102</span>
                </div>
              )}
              <a href="mailto:hello@radiant.digital" className="flex items-center gap-3 text-sm text-white/70 hover:text-brand-green transition-colors no-underline">
                <Mail size={13} className="text-brand-green flex-shrink-0" />
                hello@radiant.digital
              </a>
              <a href="tel:+17034371600" className="flex items-center gap-3 text-sm text-white/70 hover:text-brand-green transition-colors no-underline">
                <Phone size={13} className="text-brand-green flex-shrink-0" />
                {isICX ? '+1 (703) 437-1600' : '+1 (800) 555-0190'}
              </a>
              {!isICX && <p className="text-sm text-white/70 pl-6">New York, NY · San Francisco, CA</p>}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-white/60 text-xs font-sans">
            © 2026 Radiant Digital. All rights reserved.
          </span>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', ...(isICX ? ['Cookie Policy', 'Accessibility'] : [])].map(l => (
              <a key={l} href="#" className="text-white/60 text-xs hover:text-white/90 transition-colors no-underline">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

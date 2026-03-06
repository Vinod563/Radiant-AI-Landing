import { MapPin, Phone, Mail, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Services: [
    'Digital Strategy & Experience',
    'Analytics & AI',
    'Cloud Transformation',
    'Product Development',
    'Workforce Solutions',
  ],
  Company: ['Who We Are', 'Markets', 'Careers', 'Insights', 'Events'],
  Solutions: ['CX Accelerator', 'Product Accelerator', 'Sales Accelerator', 'Tracklynk', 'Privly'],
};

const Footer = () => {
  return (
    <footer className="bg-[#010f16] relative overflow-hidden">
      <div className="ai-hex-mesh" style={{ opacity: 0.015 }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8 relative">
        <div className="grid lg:grid-cols-5 gap-12 pb-12 border-b border-white/[0.05]">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <span className="font-primary font-extrabold text-[20px] text-white tracking-tight">
                Radiant<span className="text-brand-green">.</span>
              </span>
              <span className="text-[10px] font-secondary font-semibold uppercase tracking-[0.15em] text-white/30">Digital</span>
            </div>
            <p className="text-white/35 leading-relaxed mb-7 max-w-sm text-[13px]">
              AI-first digital transformation partner helping enterprises, governments, and institutions achieve better outcomes through applied AI and deep digital expertise.
            </p>

            <div className="flex flex-col gap-2.5 text-white/35 text-[13px] mb-7">
              <div className="flex items-start gap-2.5 hover:text-white/55 transition-colors duration-200">
                <MapPin size={13} className="text-brand-green/50 shrink-0 mt-0.5" />
                <span>8229 Boone Blvd, Suite 325, Vienna, VA 22182</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-white/55 transition-colors duration-200">
                <Phone size={13} className="text-brand-green/50 shrink-0" />
                <span>301.306.5102</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-white/55 transition-colors duration-200">
                <Mail size={13} className="text-brand-green/50 shrink-0" />
                <span>hello@radiant.digital</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-200">
                <Linkedin size={15} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all duration-200">
                <Youtube size={15} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white/70 font-primary font-semibold text-[12px] mb-5 uppercase tracking-[0.15em]">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group inline-flex items-center gap-1 text-white/30 hover:text-brand-lime text-[13px] transition-colors duration-200"
                    >
                      {link}
                      <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-[12px]">
            &copy; {new Date().getFullYear()} Radiant Digital. All rights reserved.
          </p>
          <div className="flex gap-5 text-white/20 text-[12px]">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((l) => (
              <a key={l} href="#" className="hover:text-brand-lime/60 transition-colors duration-200">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

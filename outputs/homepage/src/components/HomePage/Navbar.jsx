import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';

const navLinks = [
  {
    label: 'What We Do',
    href: '#services',
    dropdown: ['Digital Strategy', 'Analytics & AI', 'Cloud Transformation', 'Product Dev', 'Workforce Solutions'],
  },
  { label: 'Who We Are', href: '#about' },
  { label: 'Markets', href: '#markets' },
  { label: 'Insights', href: '#insights' },
  { label: 'Careers', href: '#careers' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(4,72,98,0.08)] border-b border-border-light/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className={`font-primary font-extrabold text-[20px] tracking-tight leading-none transition-colors duration-300 ${scrolled ? 'text-teal-dark' : 'text-white'}`}>
              Radiant<span className="text-brand-green">.</span>
            </div>
            <span className={`text-[10px] font-secondary font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${scrolled ? 'text-content-muted' : 'text-white/50'}`}>
              Digital
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2.5 text-[14px] font-primary font-medium rounded-lg transition-all duration-200 ${
                    scrolled
                      ? 'text-content-body hover:text-teal-dark hover:bg-surface-cyan'
                      : 'text-white/80 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </a>

                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-[0_8px_32px_rgba(4,72,98,0.12)] border border-border-light/60 py-2 overflow-hidden"
                    >
                      {link.dropdown.map((item) => (
                        <a
                          key={item}
                          href="#services"
                          className="block px-4 py-2.5 text-[13px] font-primary text-content-body hover:text-teal-dark hover:bg-surface-cyan transition-colors duration-150"
                        >
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className={`text-[13px] font-secondary font-semibold transition-colors duration-200 ${scrolled ? 'text-teal-dark hover:text-brand-green-dark' : 'text-white/75 hover:text-white'}`}
            >
              Contact
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-green text-white font-secondary font-semibold text-[13px] uppercase tracking-wide hover:bg-brand-green-dark transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              {"Let's Embark"}
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors duration-200 ${scrolled ? 'text-teal-dark hover:bg-surface-cyan' : 'text-white hover:bg-white/10'}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-border-light/40 shadow-lg"
          >
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-content-body hover:text-teal-dark text-[15px] font-primary font-medium py-3 px-3 rounded-lg hover:bg-surface-cyan transition-all duration-200"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                className="mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-green text-white font-secondary font-semibold text-sm uppercase tracking-wider"
              >
                {"Let's Embark"}
                <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

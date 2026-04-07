import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const chips = [
  'Live demo tailored to your industry',
  'No sales scripts — just real product',
  'ROI estimate in your first call',
  'Start in 6 weeks, not 6 months',
]

export default function ICXCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-36 bg-brand-secondary relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(145,196,107,0.1) 0%, transparent 60%)' }} />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/25 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="kicker" style={{ justifyContent: 'center' }}>Get Started</span>

          <h2 className="font-display font-black leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)' }}>
            See ICX AI<br />
            Live — in <span className="grad-text">30 Minutes.</span>
          </h2>

          <p className="text-text-secondary text-xl leading-relaxed mb-10 max-w-lg mx-auto">
            Join global enterprise leaders using ICX to transform fragmented CX signals into competitive advantage. Our team will walk you through a live demo tailored to your industry.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {chips.map(c => (
              <div key={c} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle size={14} className="text-brand-green flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="mailto:hello@radiant.digital" className="btn-primary text-base !px-10 !py-5 shadow-[0_0_60px_rgba(145,196,107,0.25)]">
              Book a Demo <ArrowRight size={17} />
            </a>
            <a href="mailto:hello@radiant.digital" className="btn-ghost text-base !px-10 !py-5">
              Get Started
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

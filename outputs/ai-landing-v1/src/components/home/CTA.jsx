import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const chips = [
  'Secure AI Deployment',
  'Enterprise Governance',
  'Rapid Time-to-Value',
  'Dedicated Success Team',
]

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-36 bg-brand-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />
      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="kicker justify-center" style={{ justifyContent: 'center' }}>Get Started</span>
          <h2 className="font-display font-black leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}>
            Your AI Future<br />
            <span className="grad-text">Starts Today.</span>
          </h2>
          <p className="text-text-secondary text-xl leading-relaxed mb-10 max-w-lg mx-auto">
            Let's build enterprise AI that delivers measurable ROI — in weeks, not months.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {chips.map(c => (
              <div key={c} className="flex items-center gap-2 text-sm text-text-secondary">
                <CheckCircle size={14} className="text-brand-green" />
                {c}
              </div>
            ))}
          </div>

          <a href="mailto:hello@radiant.digital" className="btn-primary text-base !px-10 !py-5 shadow-[0_0_60px_rgba(145,196,107,0.25)]">
            Book a Consultation <ArrowRight size={17} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

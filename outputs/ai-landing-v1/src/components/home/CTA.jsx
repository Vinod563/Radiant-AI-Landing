import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, BarChart3, Target, TrendingUp, Shield } from 'lucide-react'

const levels = [
  { label: 'Reactive', desc: 'Manual processes, siloed data', color: '#F05030' },
  { label: 'Emerging', desc: 'Basic analytics, some automation', color: '#F0974E' },
  { label: 'Defined', desc: 'Unified data, journey mapping', color: '#596AE0' },
  { label: 'Optimized', desc: 'AI-driven, proactive CX', color: '#91C46B' },
  { label: 'Leading', desc: 'Agentic AI, outcome-linked', color: '#00c87d' },
]

const benefits = [
  { icon: BarChart3, text: 'Benchmark against industry leaders' },
  { icon: Target, text: 'Identify your biggest CX gaps' },
  { icon: TrendingUp, text: 'Get a prioritized AI roadmap' },
  { icon: Shield, text: 'Receive your score in minutes' },
]

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-36 bg-brand-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(145,196,107,0.08) 0%, transparent 60%)' }} />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="kicker justify-center" style={{ justifyContent: 'center' }}>CX Maturity Assessment</span>
          <h2 className="font-display font-black leading-[0.92] tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)' }}>
            Where Does Your<br />
            <span className="grad-text">CX Maturity Stand?</span>
          </h2>
          <p className="text-text-secondary text-xl leading-relaxed mb-12 max-w-lg mx-auto">
            Take our 5-minute assessment to uncover where you are on the CX maturity curve — and get a custom roadmap to close the gap.
          </p>

          {/* Maturity scale visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="flex items-end justify-between gap-1.5 sm:gap-2 mb-3">
              {levels.map((l, i) => (
                <motion.div
                  key={l.label}
                  className="flex-1 flex flex-col items-center"
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${28 + i * 16}px`,
                      background: `linear-gradient(180deg, ${l.color} 0%, ${l.color}40 100%)`,
                      boxShadow: `0 0 20px ${l.color}20`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between gap-1.5 sm:gap-2">
              {levels.map(l => (
                <div key={l.label} className="flex-1 text-center">
                  <div className="text-[0.6rem] sm:text-xs font-display font-semibold" style={{ color: l.color }}>
                    {l.label}
                  </div>
                  <div className="text-[0.5rem] sm:text-[0.6rem] text-text-muted mt-0.5 hidden sm:block">
                    {l.desc}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
          >
            {benefits.map(b => (
              <div key={b.text} className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(145,196,107,0.08)', border: '1px solid rgba(145,196,107,0.15)' }}>
                  <b.icon size={18} className="text-brand-green" />
                </div>
                <span className="text-text-secondary text-xs leading-snug">{b.text}</span>
              </div>
            ))}
          </motion.div>

          <a href="#assessment" className="btn-primary text-base !px-10 !py-5 shadow-[0_0_60px_rgba(145,196,107,0.25)]">
            Take the Assessment <ArrowRight size={17} />
          </a>

          <p className="text-text-muted text-xs mt-5">
            Free &bull; No signup required &bull; Results in under 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}

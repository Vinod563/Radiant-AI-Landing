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
    <section id="contact" className="relative overflow-hidden">
      {/* Dark editorial CTA */}
      <div className="bg-mag-black relative">
        {/* Subtle gradient accent */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(145,196,107,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

            {/* Left — big typography */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="py-32 lg:py-40"
            >
              <span className="label label-dark">Get Started</span>
              <h2 className="font-heading font-extrabold text-white leading-[0.90] tracking-tight mb-8"
                style={{ fontSize: 'clamp(4rem, 8vw, 7.5rem)' }}>
                Your AI Future<br />
                <span className="text-brand-green">Starts Today.</span>
              </h2>
              <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-md">
                Let's build enterprise AI that delivers measurable ROI — in weeks, not months.
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {chips.map(c => (
                  <div key={c} className="flex items-center gap-2 text-sm text-white/70">
                    <CheckCircle size={14} className="text-brand-green" />
                    {c}
                  </div>
                ))}
              </div>

              <a href="mailto:hello@radiant.digital" className="btn-primary-light text-base !px-10 !py-5 group">
                Book a Consultation
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Right — abstract visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center py-20"
            >
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden"
                style={{
                  background: 'linear-gradient(160deg, #1a2a1e 0%, #2a5030 40%, #5a9a50 80%, #91C46B 100%)',
                }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500"
                  preserveAspectRatio="xMidYMid slice" fill="none">
                  <path d="M-30 350 Q130 150 260 280 Q390 410 540 200"
                    stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                  <path d="M-30 400 Q160 200 300 330 Q440 460 580 250"
                    stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <ellipse cx="380" cy="120" rx="150" ry="150" fill="rgba(255,255,255,0.03)" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-display text-white/10 select-none"
                    style={{ fontSize: 'clamp(12rem, 30vw, 18rem)', lineHeight: 0.8 }}>
                    AI
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

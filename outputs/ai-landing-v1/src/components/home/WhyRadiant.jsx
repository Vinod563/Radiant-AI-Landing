import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const proofPoints = [
  { val: '40%', label: 'Average cost reduction across enterprise deployments', accent: '#91C46B' },
  { val: '6 Weeks', label: 'From kickoff to production: not proof-of-concept', accent: '#F0974E' },
  { val: '29', label: 'Telecom AI use cases mapped across a single carrier\'s full operating model', accent: '#596AE0' },
]

export default function WhyRadiant() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="py-32 lg:py-40 bg-brand-dark relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(89,106,224,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(145,196,107,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12"
        >
          <p className="text-brand-green font-body text-sm font-semibold tracking-widest uppercase mb-5">
            Why Radiant Digital
          </p>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
            Radiant deploys AI.<br />
            We do not build models.<br />
            <span className="grad-text">We build the context that makes models perform.</span>
          </h2>
        </motion.div>

        {/* Body copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <p className="text-text-secondary text-lg leading-relaxed">
              Most firms arrive at your door with the same tools.
              The difference is what happens before deployment.
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-base leading-relaxed mb-4">
              Radiant constructs a precision context environment:
              built from your systems, your domain, your constraints:
              so that AI produces accurate, auditable, client-specific outputs
              on the first pass. Not after months of calibration.
            </p>
            <p className="text-white/80 text-base font-semibold leading-relaxed">
              That is the Precision Context Engine.
              And it is why the organizations that have deployed with Radiant
              do not run pilots. They run production.
            </p>
          </div>
        </motion.div>

        {/* Three proof stat cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {proofPoints.map((p, i) => (
            <motion.div
              key={p.val}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="group relative rounded-2xl p-8 lg:p-10 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${p.accent}10 0%, transparent 70%)`,
                }}
              />

              <div className="font-display font-black leading-none mb-4 relative z-10"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: p.accent }}>
                {p.val}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed relative z-10">
                {p.label}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${p.accent}40, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

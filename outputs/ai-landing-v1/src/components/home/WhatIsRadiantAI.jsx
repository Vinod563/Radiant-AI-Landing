import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass, Rocket, Building2 } from 'lucide-react'

const pillars = [
  {
    icon: Compass,
    label: 'Context Engineering',
    copy: 'We define your problem the right way and structure the knowledge environment your AI needs to produce accurate results: before deployment begins.',
    accent: '#91C46B',
    gradient: 'linear-gradient(145deg, #010F1E 0%, #032d14 40%, #065c22 100%)',
  },
  {
    icon: Rocket,
    label: 'Forward Deployment',
    copy: "Radiant's goal is to use the world's best AI tools and deploy them in your environment, producing the biggest results in the shortest possible time. Weeks, not months.",
    accent: '#F0974E',
    gradient: 'linear-gradient(145deg, #010F1E 0%, #2d1200 40%, #6b2d00 100%)',
  },
  {
    icon: Building2,
    label: 'Enterprise Transformation',
    copy: 'The same transformation imperatives your organization has always had. Now achievable faster, at greater scale, with AI embedded at every layer of how we deliver.',
    accent: '#596AE0',
    gradient: 'linear-gradient(145deg, #010F1E 0%, #080d2e 40%, #131a5c 100%)',
  },
]

export default function WhatIsRadiantAI() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="differentiator" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute -right-8 top-8 select-none">PCE</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <span className="kicker">What Makes Radiant Different</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
            Every AI firm brings models.<br />
            <span className="grad-text">Radiant brings context.</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed max-w-3xl">
            Most AI deployments fail not because the models are wrong:
            but because the models know nothing about your business
            before they start working.
          </p>
        </motion.div>

        {/* PCE narrative block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl p-8 lg:p-12 mb-16 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Subtle accent glow */}
          <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(145,196,107,0.04) 0%, transparent 70%)' }} />

          <p className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-3xl relative z-10">
            Radiant solves that. Before any solution is deployed,
            we construct a precision context environment built from
            your systems, your domain vocabulary, your operational constraints,
            and your target outcomes.
          </p>
          <p className="text-text-secondary text-base lg:text-lg leading-relaxed max-w-3xl mt-4 relative z-10">
            That is what the <span className="text-white font-semibold">Precision Context Engine</span> does.
            It is not a product you buy. It is the methodology
            that makes every Radiant deployment accurate,
            auditable, and specific to your environment:
            not a generic output that could belong to any enterprise.
          </p>
          <p className="text-white/80 text-lg lg:text-xl font-display font-bold mt-6 relative z-10">
            The result: AI that already knows your business before it runs a single process.
          </p>
        </motion.div>

        {/* Three pillar cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={p.label}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.12 }}
                className="rounded-2xl overflow-hidden border group cursor-default"
                style={{
                  background: p.gradient,
                  borderColor: `${p.accent}20`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                }}
                whileHover={{ y: -6, boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${p.accent}10` }}
              >
                <div className="p-7 lg:p-8 flex flex-col min-h-[280px]">
                  {/* Icon */}
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{
                      background: `${p.accent}12`,
                      border: `1px solid ${p.accent}30`,
                    }}
                  >
                    <Icon size={22} style={{ color: p.accent }} />
                  </motion.div>

                  {/* Label */}
                  <h3 className="font-display font-black text-xl mb-3" style={{ color: p.accent }}>
                    {p.label}
                  </h3>

                  {/* Copy */}
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">
                    {p.copy}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

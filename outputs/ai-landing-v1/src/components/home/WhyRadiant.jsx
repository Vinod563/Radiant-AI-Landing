import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Cpu, Users, TrendingUp, Globe } from 'lucide-react'

const pillars = [
  {
    icon: Cpu,
    title: 'Expertise & Specialization',
    desc: 'We\u2019ve developed 100 agents across 3 domains allowing enterprises to automate development, streamline data operations, and optimize intelligent system management at scale.',
    accent: '#596AE0',
  },
  {
    icon: Users,
    title: 'Our People',
    desc: 'Our team of engineers, architects, and AI specialists brings deep expertise across leading technology ecosystems.',
    accent: '#a855f7',
  },
  {
    icon: TrendingUp,
    title: 'Enterprise Impact at Scale',
    desc: 'AI-driven automation delivering up to 40% productivity improvement across IT operations, enterprise applications, and data workflows.',
    accent: '#91C46B',
  },
  {
    icon: Globe,
    title: 'Longstanding History',
    desc: '500+ employees, 50+ customers, and 7 global offices supporting enterprise digital transformation initiatives worldwide.',
    accent: '#F0974E',
  },
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
          className="text-center mb-20"
        >
          <p className="text-brand-green font-body text-sm font-semibold tracking-widest uppercase mb-5">
            Why Radiant Digital
          </p>
          <h2 className="font-display font-bold text-display-xl text-text-primary mb-5">
            Built to Deliver{' '}
            <span className="text-brand-green">Outcomes</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
            We don't just build AI — we engineer measurable business impact backed by deep domain expertise and a proven track record.
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="group relative rounded-2xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${pillar.accent}10 0%, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative z-10"
                  style={{
                    background: `${pillar.accent}15`,
                    border: `1.5px solid ${pillar.accent}30`,
                  }}
                >
                  <Icon size={26} style={{ color: pillar.accent }} />
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-white text-lg leading-snug mb-3 relative z-10">
                  {pillar.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed relative z-10">
                  {pillar.desc}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${pillar.accent}40, transparent)` }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

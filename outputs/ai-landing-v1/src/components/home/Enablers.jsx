import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass, BarChart3, Cloud, Blocks, RefreshCw, Users } from 'lucide-react'

const enablers = [
  {
    icon: Compass,
    title: 'Digital Strategy & Experience',
    promise: 'Discover improved customer experience, productivity, and ROI.',
    capabilities: ['Enterprise UX', 'CX/UX Research', 'Service Design', 'Digital Strategy'],
    metric: '50%',
    metricLabel: 'increase in customer engagement',
    accent: '#91C46B',
  },
  {
    icon: BarChart3,
    title: 'Analytics, Data Science & AI',
    promise: 'A steady stream of insights through transparent, accessible data.',
    capabilities: ['Data Engineering', 'Business Intelligence', 'AI Adoption', 'ML Pipelines'],
    metric: '70%',
    metricLabel: 'increase in operational efficiency',
    accent: '#F0974E',
  },
  {
    icon: Cloud,
    title: 'Cloud Transformation',
    promise: 'Scalable, secure, and agile cloud infrastructure at enterprise scale.',
    capabilities: ['Cloud Migration', 'Hybrid Cloud', 'Infrastructure Automation', 'Cloud Computing'],
    metric: '99.9%',
    metricLabel: 'uptime and availability',
    accent: '#596AE0',
  },
  {
    icon: Blocks,
    title: 'Product Development & Integration',
    promise: 'Deliver products at the speed of change.',
    capabilities: ['System Modernization', 'Dev & Integration', 'RPA', 'Platform Development'],
    metric: '40%',
    metricLabel: 'faster deployment times',
    accent: '#2DD4BF',
  },
  {
    icon: RefreshCw,
    title: 'Organizational Transformation',
    promise: 'Upskill, motivate, and inspire your workforce.',
    capabilities: ['Change Management', 'Workforce Upskilling', 'Process Optimization', 'Culture Alignment'],
    metric: '3x',
    metricLabel: 'faster adoption of new processes',
    accent: '#E06492',
  },
  {
    icon: Users,
    title: 'Skilled Workforce Solutions',
    promise: 'A skilled, scalable workforce for present and future growth.',
    capabilities: ['Onshore/Offshore Teams', 'Full-Stack Engineers', 'Cloud Architects', 'AI/ML Specialists'],
    metric: '5+',
    metricLabel: 'global delivery centers',
    accent: '#D4A72D',
  },
]

export default function Enablers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="enablers" className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute -right-8 top-8 select-none opacity-[0.03]"
        style={{ fontSize: 'clamp(18rem, 30vw, 28rem)' }}>E</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 items-end mb-20"
        >
          <div>
            <span className="kicker">Enablers</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
              Six Pillars That<br />
              <span className="grad-text">Power Every Initiative.</span>
            </h2>
          </div>
          <div>
            <p className="text-text-secondary text-lg leading-relaxed">
              From digital strategy to skilled workforce delivery — our six core enablers provide the foundation, expertise, and operational muscle behind every AI transformation we deliver.
            </p>
          </div>
        </motion.div>

        {/* 3×2 card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enablers.map((e, i) => {
            const Icon = e.icon
            return (
              <motion.div key={e.title}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl p-7 group cursor-default relative overflow-hidden"
                style={{
                  background: 'rgba(5, 26, 48, 0.6)',
                  border: `1px solid ${e.accent}18`,
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                }}
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${e.accent}, transparent)` }} />

                {/* Icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${e.accent}15`, border: `1px solid ${e.accent}30` }}>
                  <Icon size={20} style={{ color: e.accent }} />
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-text-primary mb-2 leading-tight">
                  {e.title}
                </h3>

                {/* Promise */}
                <p className="text-text-secondary text-sm leading-relaxed mb-5">
                  {e.promise}
                </p>

                {/* Capabilities */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {e.capabilities.map(c => (
                    <span key={c}
                      className="text-[0.65rem] font-display font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        color: `${e.accent}cc`,
                        background: `${e.accent}0a`,
                        border: `1px solid ${e.accent}20`,
                      }}>
                      {c}
                    </span>
                  ))}
                </div>

                {/* Metric */}
                <div className="pt-4 border-t border-white/[0.06] flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl" style={{ color: e.accent }}>
                    {e.metric}
                  </span>
                  <span className="text-text-muted text-xs">
                    {e.metricLabel}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

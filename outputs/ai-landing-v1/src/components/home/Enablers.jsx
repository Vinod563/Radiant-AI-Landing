import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Compass, BarChart3, Cloud, Blocks, RefreshCw, Users, ArrowUpRight } from 'lucide-react'

const enablers = [
  {
    icon: Compass,
    num: '01',
    title: 'Digital Strategy & Experience',
    desc: 'Discover improved customer experience, productivity, and ROI through research-driven design and enterprise UX.',
    capabilities: ['Enterprise UX', 'CX/UX Research', 'Service Design', 'Digital Strategy'],
    metric: '50%',
    metricLabel: 'engagement lift',
    accent: '#91C46B',
  },
  {
    icon: BarChart3,
    num: '02',
    title: 'Analytics, Data Science & AI',
    desc: 'A steady stream of insights through transparent, accessible data and intelligent ML pipelines.',
    capabilities: ['Data Engineering', 'Business Intelligence', 'AI Adoption', 'ML Pipelines'],
    metric: '70%',
    metricLabel: 'efficiency gain',
    accent: '#F0974E',
  },
  {
    icon: Cloud,
    num: '03',
    title: 'Cloud Transformation',
    desc: 'Scalable, secure, and agile cloud infrastructure built for enterprise-grade performance.',
    capabilities: ['Cloud Migration', 'Hybrid Cloud', 'Infra Automation', 'Cloud Computing'],
    metric: '99.9%',
    metricLabel: 'uptime SLA',
    accent: '#596AE0',
  },
  {
    icon: Blocks,
    num: '04',
    title: 'Product Development & Integration',
    desc: 'Deliver products at the speed of change with modern architecture and rapid deployment.',
    capabilities: ['System Modernization', 'Dev & Integration', 'RPA', 'Platform Dev'],
    metric: '40%',
    metricLabel: 'faster deploys',
    accent: '#2DD4BF',
  },
  {
    icon: RefreshCw,
    num: '05',
    title: 'Organizational Transformation',
    desc: 'Upskill, motivate, and align your workforce for lasting operational change.',
    capabilities: ['Change Management', 'Workforce Upskilling', 'Process Optimization', 'Culture Alignment'],
    metric: '3x',
    metricLabel: 'adoption rate',
    accent: '#E06492',
  },
  {
    icon: Users,
    num: '06',
    title: 'Skilled Workforce Solutions',
    desc: 'A skilled, scalable workforce with global delivery centers for present and future growth.',
    capabilities: ['Onshore/Offshore', 'Full-Stack Engineers', 'Cloud Architects', 'AI/ML Specialists'],
    metric: '5+',
    metricLabel: 'delivery centers',
    accent: '#D4A72D',
  },
]

export default function Enablers() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="enablers" className="py-32 lg:py-40 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A1628 0%, #051A30 50%, #0A1628 100%)' }}>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header — split layout */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20"
        >
          <div className="max-w-2xl">
            <span className="kicker">What We Do</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4.2rem)' }}>
              Six Pillars That{' '}
              <span className="grad-text">Power Every Initiative.</span>
            </h2>
          </div>
          <p className="text-text-secondary text-base lg:text-lg max-w-md leading-relaxed lg:text-right">
            From digital strategy to skilled workforce delivery — the foundation behind every AI transformation.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}>
          {enablers.map((e, i) => {
            const Icon = e.icon
            return (
              <motion.div key={e.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group relative cursor-default"
                style={{ background: '#0A1628' }}
              >
                {/* Card inner */}
                <div className="relative h-full p-7 lg:p-8 transition-colors duration-500 group-hover:bg-white/[0.02]">

                  {/* Number + Icon row */}
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-display font-black text-[2.5rem] leading-none tracking-tight transition-colors duration-500"
                      style={{ color: 'rgba(255,255,255,0.04)' }}>
                      <span className="group-hover:opacity-0 transition-opacity duration-500">{e.num}</span>
                      <span className="absolute top-7 lg:top-8 left-7 lg:left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ color: `${e.accent}30` }}>{e.num}</span>
                    </span>
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-500 border border-transparent group-hover:border-current/10"
                      style={{
                        background: `${e.accent}08`,
                        borderColor: `${e.accent}12`,
                      }}>
                      <Icon size={20} style={{ color: e.accent }} className="transition-transform duration-500 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white/90 mb-3 leading-snug group-hover:text-white transition-colors duration-300">
                    {e.title}
                  </h3>

                  {/* Description */}
                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {e.desc}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {e.capabilities.map(c => (
                      <span key={c}
                        className="text-[0.68rem] font-medium px-2.5 py-1 rounded-md transition-all duration-300"
                        style={{
                          color: 'rgba(255,255,255,0.45)',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Bottom: metric + arrow */}
                  <div className="flex items-end justify-between pt-5 mt-auto"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                      <span className="font-display font-black text-2xl leading-none transition-colors duration-500 group-hover:opacity-100"
                        style={{ color: e.accent, opacity: 0.7 }}>
                        {e.metric}
                      </span>
                      <span className="text-text-muted text-[0.65rem] ml-2">{e.metricLabel}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                      style={{ background: `${e.accent}15`, border: `1px solid ${e.accent}25` }}>
                      <ArrowUpRight size={14} style={{ color: e.accent }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Inbox, Brain, RefreshCcw, Sparkles, Settings, Radio } from 'lucide-react'

const cards = [
  { num: '01', icon: Inbox,       color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Omnichannel Input',              desc: 'Universal connectors for 50+ CX data sources — surveys, social, support, behavioral, and transactional — with real-time and batch ingestion at enterprise scale.' },
  { num: '02', icon: Brain,       color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Experience Intelligence Engine',  desc: 'Core AI layer powered by fine-tuned LLMs, NLP models, and proprietary CX reasoning algorithms for deep, contextual signal understanding.' },
  { num: '03', icon: RefreshCcw,  color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'Data Transformation',            desc: 'Real-time ETL pipeline that normalizes, enriches, and resolves entities across disparate sources into a unified, query-ready CX graph.' },
  { num: '04', icon: Sparkles,    color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Predictive Modeling',           desc: 'ML models trained on your historical CX data to forecast churn risk, escalation probability, and satisfaction trends before they materialize.' },
  { num: '05', icon: Settings,    color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Process Automation',            desc: 'Workflow orchestration engine that connects insights to actions — routing, escalating, and resolving CX issues across your enterprise systems automatically.' },
  { num: '06', icon: Radio,       color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'Monitoring System',              desc: 'Continuous CX health monitoring with configurable alerting, anomaly detection, and SLA tracking across every customer touchpoint, 24/7.' },
]

export default function ICXArchitecture() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute -left-4 top-8 opacity-[0.02]">06</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="kicker">Under the Hood</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Six Battle-Tested Components.<br />
            <span className="grad-text">One Unbreakable</span><br />
            CX Architecture.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Every component is purpose-built for enterprise CX intelligence — and hardened for the security, scale, and compliance demands of the world's most regulated industries.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div key={c.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                className={`mag-card p-7 border ${c.border}`}
              >
                <div className={`font-display font-black text-4xl leading-none mb-5 opacity-15 ${c.color}`}>{c.num}</div>
                <div className={`w-10 h-10 rounded-2xl ${c.bg} flex items-center justify-center mb-4`}>
                  <Icon size={17} className={c.color} />
                </div>
                <h3 className="font-display font-bold text-base text-text-primary mb-3">{c.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

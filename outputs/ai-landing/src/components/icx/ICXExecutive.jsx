import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Telescope, Shield, Settings, BarChart2, CalendarDays, Target } from 'lucide-react'

const caps = [
  { num:'01', icon: Telescope,    color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Unified Intelligence',   headline: 'One view. No silos.',               desc: 'A single view of CX health across all business units, geographies, and customer segments — no fragmented reporting from disconnected tools.' },
  { num:'02', icon: Shield,       color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Risk Management',        headline: 'Catch problems before they cost you.', desc: 'Early warning systems that flag at-risk accounts, deteriorating satisfaction trends, and compliance gaps before they escalate to revenue impact.' },
  { num:'03', icon: Settings,     color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'Process Automation',     headline: 'Strategy over firefighting.',        desc: 'End-to-end workflow automation that routes, resolves, and tracks CX issues — freeing your teams to focus on strategic work, not manual effort.' },
  { num:'04', icon: BarChart2,    color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Self-Serve Insights',    headline: 'Answers in plain language.',        desc: 'Executives and managers query, explore, and share CX insights naturally — no SQL, no waiting on data teams, no dependency backlogs.' },
  { num:'05', icon: CalendarDays, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Long-term Optimization', headline: 'Fix the root, not the symptom.',   desc: 'Longitudinal CX trend analysis that identifies structural improvements — turning short-term fixes into sustained competitive advantage over time.' },
  { num:'06', icon: Target,       color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'KPI Traceability',       headline: 'From signal to board-level KPI.',  desc: 'Full traceability from individual CX signals to board-level KPIs — connecting team actions directly to NPS, CSAT, revenue, and retention outcomes.' },
]

export default function ICXExecutive() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute right-0 top-8 opacity-[0.02]">CXO</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-12 items-end mb-16"
        >
          <div>
            <span className="kicker">For Leadership</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Built for Leaders Who<br />
              Need <span className="grad-text">Clarity,</span><br />
              Not More Dashboards.
            </h2>
          </div>
          <p className="text-text-secondary text-lg leading-relaxed">
            Purpose-built for CX executives, operations leaders, and board-level stakeholders who need to act on CX data — not just view it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caps.map((c, i) => {
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
                <h3 className="font-display font-bold text-base text-text-primary mb-1">{c.title}</h3>
                <p className={`font-display font-semibold text-sm mb-3 ${c.color}`}>{c.headline}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Unplug, Clock, TrendingDown, Settings } from 'lucide-react'

const pains = [
  { icon: Unplug,       color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Disconnected Data Sources',    desc: 'CX data trapped across 10+ siloed tools with no unified view — every team sees a different truth.' },
  { icon: Clock,        color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Manual, Outdated Analysis',     desc: 'Analysts spending weeks building reports that are outdated by the time they\'re presented.' },
  { icon: TrendingDown, color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Delayed Insights',               desc: 'Critical issues surface days or weeks after the damage is done and customers have churned.' },
  { icon: Settings,     color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Operational Inefficiency',       desc: 'Teams duplicating effort with no systematic way to act on CX signals — just firefighting.' },
]

const signalGroups = [
  { title: 'Voice of Customer', pills: ['NPS Surveys', 'CSAT Forms', 'In-app Feedback'] },
  { title: 'Digital Channels',  pills: ['App Reviews', 'Social Media', 'Community Forums'] },
  { title: 'Support Ops',       pills: ['Support Tickets', 'Call Transcripts', 'Chat Logs'] },
  { title: 'Behavioral Data',   pills: ['Product Usage', 'Web Analytics', 'Purchase Data'] },
]

export default function ICXProblem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute -right-4 top-8 opacity-[0.02]">CX</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <motion.div ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="kicker">The Challenge</span>
            <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              Fragmented CX Is Costing You<br />
              <span className="grad-text">More Than You Think.</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              Enterprise CX teams are drowning in disconnected data — surveys, reviews, support tickets, call transcripts, social signals — each living in a different tool, each telling a different story. The result: slow decisions, missed patterns, and customers who leave.
            </p>

            <div className="space-y-4">
              {pains.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.div key={p.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.09 }}
                    className={`mag-card p-5 border ${p.border} flex items-start gap-4`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${p.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={17} className={p.color} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-text-primary mb-1">{p.title}</h4>
                      <p className="text-text-muted text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right – Signal chaos visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="pt-16"
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              {signalGroups.map(g => (
                <div key={g.title} className="mag-card p-4">
                  <div className="font-display text-[0.62rem] font-bold tracking-[0.14em] uppercase text-text-muted mb-3">{g.title}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.pills.map(pill => (
                      <span key={pill} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-[0.66rem] text-text-secondary">
                        <span className="w-1 h-1 rounded-full bg-text-muted" />
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Warning banner */}
            <div className="p-4 rounded-2xl border border-dashed border-brand-orange/40 bg-brand-orange/[0.04]">
              <div className="flex items-start gap-3">
                <span className="text-brand-orange text-lg">&#9888;</span>
                <div>
                  <div className="font-display font-bold text-sm text-brand-orange mb-1">No Unified Intelligence Layer</div>
                  <p className="text-text-muted text-xs leading-relaxed">Signals are siloed, unactionable, and reactive — the status quo is costing you customer loyalty every day.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

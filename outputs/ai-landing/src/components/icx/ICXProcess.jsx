import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Radio, Link2, Brain, Target, Zap, TrendingUp } from 'lucide-react'

const steps = [
  { num: '01', icon: Radio,       color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Capture Signals',    headline: 'Every signal, every source.', desc: 'Ingest omnichannel CX data from surveys, reviews, support, chat, and behavioral sources in real time.' },
  { num: '02', icon: Link2,       color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Unify Data',         headline: 'One truth, not ten opinions.', desc: 'Normalize and connect signals into a single unified CX data layer with entity resolution across all touchpoints.' },
  { num: '03', icon: Brain,       color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'Analyze with AI',    headline: 'Patterns humans can\'t see.', desc: 'Apply NLP, sentiment analysis, and predictive models to surface hidden patterns and root causes at enterprise scale.' },
  { num: '04', icon: Target,      color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Prioritize Actions', headline: 'Focus where it matters most.', desc: 'AI-ranked action queue surfaces the highest-impact CX issues for immediate, targeted attention by the right team.' },
  { num: '05', icon: Zap,         color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Execute Workflows',  headline: 'Insights that act, automatically.', desc: 'Trigger automated or human-assisted workflows to resolve issues across teams and systems — no manual routing.' },
  { num: '06', icon: TrendingUp,  color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Measure Impact',     headline: 'ROI you can show the board.', desc: 'Track resolution outcomes, business metrics, and CX improvements in real-time dashboards with full traceability.' },
]

export default function ICXProcess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="kicker">How It Works</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            Six Steps That Turn<br />
            <span className="grad-text">Any Signal Into</span><br />
            Business Outcomes.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            A deterministic, AI-powered pipeline — from the first raw customer signal to a fully measured business outcome. No gaps. No guesswork.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                className={`mag-card p-7 border ${s.border} relative`}
              >
                <div className={`font-display font-black text-5xl leading-none absolute top-5 right-6 opacity-[0.08] ${s.color}`}>{s.num}</div>
                <div className={`w-10 h-10 rounded-2xl ${s.bg} flex items-center justify-center mb-5`}>
                  <Icon size={18} className={s.color} />
                </div>
                <h3 className="font-display font-bold text-base text-text-primary mb-1">{s.title}</h3>
                <p className={`font-display font-semibold text-sm mb-3 ${s.color}`}>{s.headline}</p>
                <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

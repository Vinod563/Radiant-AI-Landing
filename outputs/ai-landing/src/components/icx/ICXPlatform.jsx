import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Search, Zap, BarChart3 } from 'lucide-react'

const pillars = [
  { num: '01', icon: Sparkles,  color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Predictive Insights',    headline: 'Know what will go wrong before it does.',    desc: 'ML models trained on your CX data anticipate dissatisfaction, churn risk, and friction — before they become crises.' },
  { num: '02', icon: Search,    color: 'text-brand-orange', bg: 'bg-brand-orange/10', border: 'border-brand-orange/20', title: 'Root-Cause Intelligence', headline: 'Stop treating symptoms. Fix the disease.',    desc: 'AI automatically surfaces the underlying drivers behind CX drops — product, process, or people issues — with precision.' },
  { num: '03', icon: Zap,       color: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', title: 'Automated Workflows',    headline: 'Insights that act, not just inform.',         desc: 'Pre-built and customizable automation workflows trigger the right response, to the right team, at the right time.' },
  { num: '04', icon: BarChart3, color: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20',  title: 'Impact Reporting',       headline: 'Connect CX actions to business outcomes.',   desc: 'Executive-ready reports that link NPS, CSAT, revenue, and retention — in real time, always board-ready.' },
]

export default function ICXPlatform() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="platform" className="py-32 bg-brand-secondary relative overflow-hidden">
      <div className="editorial-bg-num absolute -left-4 bottom-0 opacity-[0.02]">04</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-16"
        >
          <span className="kicker">The Platform</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            From Signal Chaos<br />
            to <span className="grad-text">CX Clarity</span> —<br />
            In One Platform.
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Enterprise ICX centralizes every customer signal into a single AI-driven intelligence layer — giving your teams the predictive power, root-cause clarity, and automated workflows to act decisively at scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div key={p.num}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`mag-card p-7 border ${p.border} flex flex-col`}
              >
                <div className={`font-display font-black text-4xl leading-none mb-5 opacity-15 ${p.color}`}>{p.num}</div>
                <div className={`w-10 h-10 rounded-2xl ${p.bg} flex items-center justify-center mb-4`}>
                  <Icon size={18} className={p.color} />
                </div>
                <h3 className="font-display font-bold text-sm text-text-primary mb-1">{p.title}</h3>
                <p className={`font-display font-semibold text-sm mb-3 ${p.color}`}>{p.headline}</p>
                <p className="text-text-secondary text-xs leading-relaxed flex-1">{p.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const metrics = [
  { val: '41%',  style: 'grad-text',          label: 'First-contact resolution improvement',         tag: 'Operational Efficiency' },
  { val: '20%',  style: 'text-brand-green',    label: 'Reduction in churn and support costs',         tag: 'Retention & Cost' },
  { val: '66%',  style: 'grad-text',          label: 'Increase in customer satisfaction scores',      tag: 'CSAT Engagement' },
  { val: '+18',  style: 'text-brand-orange',  label: 'NPS point improvement in first quarter',        tag: 'NPS Impact' },
  { val: '15%',  style: 'text-brand-green',   label: 'Agent productivity via AI-assisted workflows',  tag: 'Productivity' },
  { val: '3.4×', style: 'grad-text',          label: 'Average ROI within 12 months of deployment',   tag: 'Return on Investment' },
]

export default function ICXMetrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-32 bg-brand-dark relative overflow-hidden">
      <div className="editorial-bg-num absolute right-0 top-4 opacity-[0.015]">ROI</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="kicker">Business Impact</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            The Numbers Prove It —<br />
            <span className="grad-text">ICX Delivers Measurable ROI.</span>
          </h2>
        </motion.div>

        {/* Large metric grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
          {metrics.map((m, i) => (
            <motion.div key={m.tag}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="mag-card p-8 relative overflow-hidden"
            >
              <div className="editorial-bg-num absolute -bottom-6 -right-2 text-[6rem] opacity-[0.03]">{m.val}</div>
              <div className={`font-display font-black leading-none mb-4 ${m.style}`}
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
                {m.val}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{m.label}</p>
              <span className="tag">{m.tag}</span>
            </motion.div>
          ))}
        </div>

        {/* Source note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-muted text-xs text-center"
        >
          Quantified outcomes across global enterprise ICX deployments · 90-day measurement window
        </motion.p>
      </div>
    </section>
  )
}

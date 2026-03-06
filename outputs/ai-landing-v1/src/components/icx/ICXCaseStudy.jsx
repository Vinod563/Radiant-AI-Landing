import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const steps = [
  { label: 'Business Challenge', desc: 'Fragmented CX data across retail, digital, and support channels created blind spots during peak demand — unresolved friction points and escalating churn risk at massive scale.' },
  { label: 'ICX Deployment',     desc: 'Deployed unified signal ingestion across 50+ data sources, activated predictive churn models, and automated tier-1 resolution workflows — live in 6 weeks.' },
  { label: 'Quantified Results', desc: 'Measurable improvements across all CX KPIs within 90 days. Full ROI validation delivered to the executive team by quarter-end.' },
]

const resultMetrics = [
  { val: '66%',  style: 'grad-text',          label: 'CSAT improvement (90 days)',  span: '' },
  { val: '10K+', style: 'text-brand-green',   label: 'Support tickets auto-resolved', span: '' },
  { val: '+18',  style: 'text-brand-orange',  label: 'NPS point improvement',       span: '' },
  { val: '6 wks',style: 'text-brand-purple',  label: 'Full platform deployment',    span: '' },
  { val: '3.4×', style: 'grad-text',          label: 'ROI within first year',       span: 'col-span-2' },
]

export default function ICXCaseStudy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="case-study" className="py-32 bg-brand-secondary relative overflow-hidden">
      <div className="editorial-bg-num absolute -left-4 top-0 opacity-[0.02]">$2B</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left */}
          <motion.div ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="kicker">Featured Case Study</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20 mb-5">
              <span className="text-base">&#128241;</span>
              <span className="text-brand-green font-display text-xs font-semibold">iPhone Launch Campaign</span>
            </div>

            <h2 className="font-display font-black leading-[0.95] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
              $2B Launch.<br />
              Six Weeks.<br />
              <span className="grad-text">3.4× ROI.</span>
            </h2>

            <p className="text-text-secondary text-lg leading-relaxed mb-10">
              A leading global carrier deployed Enterprise ICX for a high-stakes iPhone launch — coordinating signals from 40M+ customers, 2,000+ retail locations, and 12 digital channels simultaneously.
            </p>

            {/* Steps */}
            <div className="space-y-6 mb-10">
              {steps.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-brand-green/15 border border-brand-green/30 flex items-center justify-center font-display font-black text-xs text-brand-green">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="w-px flex-1 mt-2 bg-white/[0.07]" />}
                  </div>
                  <div className="pb-4">
                    <h4 className="font-display font-bold text-sm text-text-primary mb-1.5">{s.label}</h4>
                    <p className="text-text-secondary text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a href="#contact" className="btn-primary text-sm">
              Explore This Case Study <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Right – metric grid */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="pt-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {resultMetrics.map(m => (
                <div key={m.val + m.label} className={`mag-card p-7 ${m.span}`}>
                  <div className={`font-display font-black leading-none mb-3 ${m.style}`}
                    style={{ fontSize: m.span ? 'clamp(3.5rem, 6vw, 5rem)' : 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                    {m.val}
                  </div>
                  <div className="text-text-secondary text-sm">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

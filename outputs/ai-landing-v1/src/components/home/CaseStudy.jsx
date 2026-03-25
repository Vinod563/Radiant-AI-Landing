import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const metrics = [
  { val: '3-7%',  label: 'Revenue Leakage Recovered',   color: 'grad-text' },
  { val: '98%',   label: 'Billing Accuracy Achieved',    color: 'text-brand-green' },
  { val: '40-70%',label: 'LLM Cost Reduction via AI FinOps', color: 'grad-text' },
  { val: '6 wks', label: 'From Kickoff to Production',   color: 'text-brand-orange' },
]

export default function CaseStudy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proof" className="py-32 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(1,15,30,0.97) 0%, rgba(1,15,30,0.92) 30%, rgba(1,15,30,0.75) 50%, rgba(1,15,30,0.35) 70%, rgba(1,15,30,0.05) 100%)' }} />
      </div>

      {/* Editorial bg number */}
      <div className="editorial-bg-num absolute -left-4 top-0 opacity-[0.02]">T</div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Top headline */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="kicker">Proof, Not Promises</span>
          <h2 className="font-display font-black leading-[0.95] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}>
            Not a pilot.<br />
            <span className="grad-text">A different operating model.</span>
          </h2>
        </motion.div>

        {/* Row 1: Client info + Quote + Metrics */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Left — client + quote */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.12 }}
          >
            {/* Client callout */}
            <div className="flex items-center gap-5 p-6 mag-card border border-white/[0.08] mb-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-green flex items-center justify-center font-display font-black text-2xl text-brand-dark flex-shrink-0">T</div>
              <div>
                <div className="font-display font-bold text-text-primary">Leading Telecom Company</div>
                <div className="text-text-muted text-sm">Telecommunications</div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/20">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span className="text-brand-green font-display text-[0.65rem] font-semibold">Case Study</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-white/70 text-xs font-display font-semibold uppercase tracking-widest mb-3">Challenge</h4>
              <p className="text-text-secondary text-base leading-relaxed">
                A tier-1 telecom carrier needed AI that produced measurable operational
                results: not a proof-of-concept that stalled after 90 days.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-white/70 text-xs font-display font-semibold uppercase tracking-widest mb-3">What Radiant Digital Did</h4>
              <p className="text-text-secondary text-base leading-relaxed">
                Radiant Digital built a precision context environment grounded in the carrier's
                billing systems, operational data, and domain vocabulary. Then deployed
                AI workflows across revenue assurance, billing intelligence, and
                customer operations: live in six weeks.
              </p>
            </div>

            {/* Pull quote */}
            <div className="relative pl-6 border-l-2 border-brand-green/40">
              <Quote size={20} className="absolute -top-1 -left-2.5 text-brand-green" />
              <p className="text-text-primary text-base italic font-light leading-relaxed">
                "We expected efficiency gains. What we got was a fundamental shift:
                our operations team now focuses on strategy, not firefighting."
              </p>
              <span className="text-text-muted text-xs mt-2 block">: Operations Director, Leading Telecom Company</span>
            </div>
          </motion.div>

          {/* Right — metrics */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4 h-full content-center">
              {metrics.map((m, i) => (
                <motion.div key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 + i * 0.08 }}
                  className="mag-card p-8"
                  style={{ background: 'rgba(1,15,30,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className={`font-display font-black leading-none mb-3 ${m.color}`}
                    style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
                    {m.val}
                  </div>
                  <div className="text-text-muted text-sm leading-snug">{m.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* View more CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mt-12">
        <Link to="/chat?q=Show+me+all+case+studies" className="btn-primary w-fit group/link">
          <span>View More Case Studies</span>
          <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
